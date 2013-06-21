/**
 GaiaEHR (Electronic Health Records)
 Copyright (C) 2013 Certun, inc.

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

Ext.define('App.view.Viewport', {
    extend: 'Ext.Viewport',
    // app settings
    requires: window.requires, // array is defined on _app.php
    user: window.user, // array defined on _app.php
    version: window.version, // string defined on _app.php
    minWidthToFullMode: 1585, // full mode = nav expanded
    currency: globals['gbl_currency_symbol'], // currency used
    activityMonitorInterval: 60, // in seconds - interval to check for mouse and keyboard activity
    activityMonitorMaxInactive: 20, // in minutes - Maximum time application can be inactive (no mouse or keyboard inputt)
    cronTaskInterval: 5, // in seconds - interval to run me.cronTask (check PHP session, refresh Patient Pool Areas, and PHP Cron Job)
    // end app settings
    initComponent: function(){
        Ext.tip.QuickTipManager.init();
        var me = this;
        me.lastCardNode = null;
        me.currCardCmp = null;
        me.fullMode = window.innerWidth >= me.minWidthToFullMode;
        /**
         * TaskScheduler
         * This will run all the procedures inside the checkSession
         */
        me.cronTask = {
            scope: me,
            run: function(){
                me.checkSession();
                CronJob.run();
            },
            interval: me.cronTaskInterval * 1000
        };
        /*
         * The store for the Navigation Tree menu.
         */
        me.storeTree = Ext.create('App.store.navigation.Navigation', {
            autoLoad: true,
            listeners: {
                scope: me,
                load: me.afterNavigationLoad
            }
        });
        /**
         * The panel definition for the the TreeMenu & the support button
         */
        me.navColumn = Ext.create('Ext.panel.Panel', {
            title: 'Navigation',
            stateId: 'navColumn',
            layout: 'border',
            region: globals['main_navigation_menu_left'],
            width: parseFloat(globals['gbl_nav_area_width']),
            split: true,
            collapsible: true,
            collapsed: false,
            items: [
                {
                    xtype: 'treepanel',
                    region: 'center',
                    cls: 'nav_tree',
                    hideHeaders: true,
                    rootVisible: false,
                    border: false,
                    store: me.storeTree,
                    width: parseFloat(globals['gbl_nav_area_width']),
                    plugins: [
                        {
                            ptype: 'nodedisabled'
                        }
                    ],
                    listeners: {
                        scope: me,
                        selectionchange: me.onNavigationNodeSelected
                    }
                }
            ],
            listeners: {
                scope: me,
                beforecollapse: me.navCollapsed,
                beforeexpand: me.navExpanded
            }
        });
        /**
         * MainPanel is where all the pages are displayed
         */
        me.MainPanel = Ext.create('Ext.container.Container', {
            region: 'center',
            layout: 'card',
            border: true,
            itemId: 'MainPanel',
            defaults: {
                layout: 'fit',
                xtype: 'container'
            },
            listeners: {
                scope: me
            }
        });
        /**
         * General Area
         */

//        if(acl['access_gloabal_settings']) me.MainPanel.add(Ext.create('App.view.administration.Globals'));
//        if(acl['access_users']) me.MainPanel.add(Ext.create('App.view.administration.Users'));

        me.Dashboard     = me.MainPanel.add(Ext.create('App.view.dashboard.Dashboard'));
        me.MainPanel.add(Ext.create('App.view.administration.Globals'));
        me.MainPanel.add(Ext.create('App.view.administration.Users'));
        me.MainPanel.add(Ext.create('App.view.miscellaneous.MyAccount'));
        me.MainPanel.add(Ext.create('App.view.administration.Modules'));

        me.MainPanel.add(Ext.create('App.view.master.Companies'));
        me.MainPanel.add(Ext.create('App.view.master.Bentuk'));
        me.MainPanel.add(Ext.create('App.view.master.BahanBaku'));
        me.MainPanel.add(Ext.create('App.view.master.Kemasan'));
        me.MainPanel.add(Ext.create('App.view.master.Jenis')) ;
        me.MainPanel.add(Ext.create('App.view.master.Satuan'));
        me.MainPanel.add(Ext.create('App.view.master.Customer'));
        me.MainPanel.add(Ext.create('App.view.master.Vendor'));
        me.MainPanel.add(Ext.create('App.view.master.Spesifikasi'));
        me.MainPanel.add(Ext.create('App.view.master.Items'));
        me.MainPanel.add(Ext.create('App.view.master.Formula'));
        me.MainPanel.add(Ext.create('App.view.master.Salesman'));
        me.MainPanel.add(Ext.create('App.view.master.Wilayah'));
        me.MainPanel.add(Ext.create('App.view.master.Route'));
        me.MainPanel.add(Ext.create('App.view.master.Factory_location'));
        me.MainPanel.add(Ext.create('App.view.master.Tax'));
        me.MainPanel.add(Ext.create('App.view.master.Bank'));

        me.MainPanel.add(Ext.create('App.view.transaksi.salesorder.SalesOrder'));
        me.MainPanel.add(Ext.create('App.view.transaksi.salesorder.ReleaseOrder'));
        me.MainPanel.add(Ext.create('App.view.transaksi.purchaseorder.PurchaseOrder'));
        me.MainPanel.add(Ext.create('App.view.transaksi.goodsreceived.GoodsReceived'));
       // me.MainPanel.add(Ext.create('App.view.transaksi.goodsissued.GoodsIssued'));
       // me.MainPanel.add(Ext.create('App.view.transaksi.workorder.WorkOrder'));
        me.MainPanel.add(Ext.create('App.view.transaksi.workorder.WorkOrder1'));
        me.MainPanel.add(Ext.create('App.view.transaksi.workorder.StockPeriode'));
        me.MainPanel.add(Ext.create('App.view.transaksi.Produksi.Produksi'));
        me.MainPanel.add(Ext.create('App.view.transaksi.DeliveryOrder.DeliveryOrder'));
        me.MainPanel.add(Ext.create('App.view.transaksi.OrderMonitoring.OrderMonitoring'));
        me.MainPanel.add(Ext.create('App.view.transaksi.Produksi.PengadaanBarang'));
        me.MainPanel.add(Ext.create('App.view.transaksi.AP-Invoice.AP_Invoice'));
        me.MainPanel.add(Ext.create('App.view.transaksi.AP-Invoice.AP_Invoice_Revisi'));
        me.MainPanel.add(Ext.create('App.view.transaksi.AP-Invoice.AP_Invoice_Pembayaran'));
        me.MainPanel.add(Ext.create('App.view.transaksi.AP-Invoice.AP_Invoice_Payment_Revisi'));
        me.MainPanel.add(Ext.create('App.view.transaksi.AP-Invoice.AP_Invoice_Manufaktur'));
        me.MainPanel.add(Ext.create('App.view.transaksi.AP-Invoice.AP_Invoice_Manufaktur_Revisi'));

        me.MainPanel.add(Ext.create('App.view.transaksi.AR.AR_Sale'));
        me.MainPanel.add(Ext.create('App.view.transaksi.AR.AR_Sale_Payment'));
        me.MainPanel.add(Ext.create('App.view.transaksi.AR.AR_Giro'));
        me.MainPanel.add(Ext.create('App.view.transaksi.CashBook.Cashbook_In'));
        me.MainPanel.add(Ext.create('App.view.transaksi.CashBook.Cashbook_Out'));
        me.MainPanel.add(Ext.create('App.view.transaksi.CashBook.Cashbon_Lebih'));
        me.MainPanel.add(Ext.create('App.view.transaksi.CashBook.Cashbon_Kurang'));
        me.MainPanel.add(Ext.create('App.view.transaksi.CashBook.Cashbook_Bank_In'));
        me.MainPanel.add(Ext.create('App.view.transaksi.CashBook.Cashbook_Bank_Out'));
       // me.MainPanel.add(Ext.create('App.view.transaksi.Report.Report'));



        /**
         * Footer Panel
         */
        me.Footer = Ext.create('Ext.container.Container', {
            height: me.fullMode ? 20 : 30,
            split: false,
            padding: '3 0',
            region: 'south',
            items: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            text: 'Copyright (C) 2013 Saraswanti |:| Kelompok Usaha Saraswanti |:| v' + me.version,
                            iconCls: 'icoGreen',
                            disabled: true,
                            action: 'http://saraswanti.com',
                            scope: me,
                            handler: me.showMiframe
                        },'->',
                        {
                            text: '<span style="color: #ff0000">LOGOUT</span>',
                            scope: me,
                            handler: me.appLogout
                        }
                    ]
                }
            ]
        });

        me.layout = {
            type: 'border',
            padding: 3
        };
        me.defaults = {
            split: true
        };
        me.items = [me.Header, me.navColumn, me.MainPanel, me.Footer];
        me.listeners = {
            render: me.appRender,
            beforerender: me.beforeAppRender
        };
        me.callParent(arguments);
    },
    navigateTo: function(id, callback){
        var tree = this.navColumn.down('treepanel'),
	        treeStore = tree.getStore(),
	        sm = tree.getSelectionModel(),
	        node = treeStore.getNodeById(id);

	    sm.select(node);
        if(typeof callback == 'function'){
            callback(true);
        }
    },
    navigateToDefault: function(){
        this.navigateTo('panelDashboard');
    },
    afterNavigationLoad: function(){
        this.fullMode ? this.navColumn.expand() : this.navColumn.collapse();
        this.navigateToDefault();
        this.removeAppMask();
        this.setTask(true);
    },
    onNavigationNodeSelected: function(model, selected){
        var me = this;
        if(0 < selected.length){
            if(selected[0].data.leaf){
                var tree = me.navColumn.down('treepanel'), sm = tree.getSelectionModel(), card = selected[0].data.id, layout = me.MainPanel.getLayout(), cardCmp = Ext.getCmp(card);
                me.currCardCmp = cardCmp;
                layout.setActiveItem(card);
                cardCmp.onActive(function(success){
                    (success) ? me.lastCardNode = sm.getLastSelected() : me.goBack();
                });
            }
        }
    },
    goBack: function(){
        var tree = this.navColumn.down('treepanel'), sm = tree.getSelectionModel();
        sm.select(this.lastCardNode);
    },
   navCollapsed: function(){
        var me = this, 
            foot = me.Footer;
        me.navColumn.isCollapsed = true;
    },
    navExpanded: function(){
        var me = this, 
        foot = me.Footer
        me.navColumn.isCollapsed = false;
    },
 
    /*
     * Function to get the current active panel.
     * NOTE: This may be used on all the application.
     */
    getActivePanel: function(){
        return this.MainPanel.getLayout().getActiveItem();
    },
    msg: function(title, format, error){
        var msgBgCls = (error === true) ? 'msg-red' : 'msg-green';
        if(!this.msgCt){
            this.msgCt = Ext.core.DomHelper.insertFirst(document.body, {
                    id: 'msg-div'
                }, true);
        }
        this.msgCt.alignTo(document, 't-t');
        var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1)), m = Ext.core.DomHelper.append(this.msgCt, {
                html: '<div class="msg ' + msgBgCls + '"><h3>' + title + '</h3><p>' + s + '</p></div>'
            }, true);
        m.slideIn('t').pause(3000).ghost('t', {
                remove: true
            });
    },
    checkSession: function(){
        authProcedures.ckAuth(function(provider, response){
            if(!response.result.authorized){
                window.location = './';
            }
        });
    },
    cancelAutoLogout: function(){
        var me = this;
        me.el.unmask();
        me.LogoutTask.stop(me.LogoutTaskTimer);
        me.logoutWarinigWindow.destroy();
        delete me.logoutWarinigWindow;
        App.ux.ActivityMonitor.start();
    },
    startAutoLogout: function(){
        var me = this;
        me.logoutWarinigWindow = Ext.create('Ext.Container', {
            floating: true,
            cls: 'logout-warning-window',
            html: 'Logging Out in...',
            seconds: 10
        }).show();
        app.el.mask();
        if(!me.LogoutTask)
            me.LogoutTask = new Ext.util.TaskRunner();
        if(!me.LogoutTaskTimer){
            me.LogoutTaskTimer = me.LogoutTask.start({
                scope: me,
                run: me.logoutCounter,
                interval: 1000
            });
        }else{
            me.LogoutTask.start(me.LogoutTaskTimer);
        }
    },
    logoutCounter: function(){
        var me = this, sec = me.logoutWarinigWindow.seconds - 1;
        if(sec <= 0){
            me.logoutWarinigWindow.update('Logging Out... Bye! Bye!');
            me.appLogout(true);
        }else{
            me.logoutWarinigWindow.update('Logging Out in ' + sec + 'sec');
            me.logoutWarinigWindow.seconds = sec;
            say('Logging Out in ' + sec + 'sec');
        }
    },
    appLogout: function(auto){
        var me = this;
        if(auto === true){
            me.setTask(false);
            authProcedures.unAuth(function(){
                window.location = './'
            });
        }else{
            Ext.Msg.show({
                title: 'Please Confirm' + '...',
                msg: 'Are you sure want to quit' + ' ?',
                icon: Ext.MessageBox.QUESTION,
                buttons: Ext.Msg.YESNO,
                fn: function(btn){
                    if(btn == 'yes'){
                        authProcedures.unAuth(function(){
                            me.setTask(false);
                            window.location = './'
                        });
                    }
                }
            });
        }
    },
    /*
     * When the application finishes loading all the GaiaEHR core.
     * Then it will load all the modules.
     */
    appRender: function(){
        this.loadModules();
    },
    /*
     * Load all the modules on the modules folder.
     * This folder will hold modules created by third-party.
     */
    loadModules: function(){
        say('Loading Modules');

        Modules.getEnabledModules(function(provider, response){
            var modules = response.result;
            for(var i = 0; i < modules.length; i++){
                say('Module ' + modules[i].dir + ' loaded!');
                Ext.create('Modules.' + modules[i].dir + '.Main');
            }
        });
    },
    removeAppMask: function(){
        Ext.get('mainapp-loading').remove();
        Ext.get('mainapp-loading-mask').fadeOut({
            remove: true
        });
    },
    beforeAppRender: function(){

    },
    getApp: function(){
        return this;
    },
    setTask: function(start){
        var me = this;
        if(start){
            App.ux.ActivityMonitor.init({
                interval: me.activityMonitorInterval * 1000,
                maxInactive: (1000 * 60 * me.activityMonitorMaxInactive),
                verbose: true,
                isInactive: function(){
                    me.startAutoLogout();
                }
            });
            Ext.TaskManager.start(me.cronTask);
            App.ux.ActivityMonitor.start();
        }else{
            Ext.TaskManager.stop(me.cronTask);
            App.ux.ActivityMonitor.stop();
        }
    },
    /*
     * Access denied massage.
     */
    accessDenied: function(){
        Ext.Msg.show({
            title: 'Oops!',
            msg: i18n('access_denied'),
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
        });
    },
    alert: function(msg, icon){
        if(icon == 'error'){
            icon = Ext.Msg.ERROR
        }else if(icon == 'warning'){
            icon = Ext.Msg.WARNING
        }else if(icon == 'question'){
            icon = Ext.Msg.QUESTION
        }else{
            icon = Ext.Msg.INFO
        }
        Ext.Msg.show({
            //title: 'Oops!',
            msg: msg,
            buttons: Ext.Msg.OK,
            icon: icon,
            width:800
        });
    }

});
