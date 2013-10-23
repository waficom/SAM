
Ext.define('App.view.transaksi.Closing_Transaction.Closing_transaction', {
    extend: 'App.ux.RenderPanel',
    id: 'panelCT',
    pageTitle: 'Tutup Pembukuan',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        Ext.define('CT_MonthModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id', type: 'string'},
                {name: 'periode_month', type: 'string'},
                {name: 'remaks', type: 'string'},
                {name: 'closing_date', type: 'date'},
                {name: 'userinput', type: 'string'},
                {name: 'useredit', type: 'string'},
                {name: 'status', type: 'string'}
            ]

        });
        Ext.define('CT_YearModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id', type: 'string'},
                {name: 'periode_year', type: 'string'},
                {name: 'remaks', type: 'string'},
                {name: 'closing_date', type: 'date'},
                {name: 'userinput', type: 'string'},
                {name: 'useredit', type: 'string'},
                {name: 'status', type: 'string'}
            ]

        });
        me.CT_MonthStore = Ext.create('Ext.data.Store', {
            model: 'CT_MonthModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Closing_transaction.getCT_month,
                    create: Closing_transaction.addCT_month,
                    update: Closing_transaction.updateCT_month,
                    destroy: Closing_transaction.deleteCT_month
                }
            },
            autoLoad: false
        });
        me.CT_YearStore = Ext.create('Ext.data.Store', {
            model: 'CT_YearModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Closing_transaction.getCT_year,
                    create: Closing_transaction.addCT_year,
                    update: Closing_transaction.updateCT_year,
                    destroy: Closing_transaction.deleteCT_year
                }
            },
            autoLoad: false
        });
        function authCk(val){
            if(val == '1'){
                return '<img src="resources/images/icons/yes.gif" />';
            }else if(val == '0'){
                return '<img src="resources/images/icons/no.gif" />';
            }
            return val;
        }

        // *************************************************************************************
        // Create the GridPanel
        // *************************************************************************************
        me.CT_MonthGrid = Ext.create('App.ux.GridPanel', {
            store: me.CT_MonthStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {header : 'co_id', dataIndex : 'co_id', hidden: true},
                {header : 'Periode', dataIndex : 'periode_month'},
                {text: 'Remarks',sortable: true,dataIndex: 'remaks', flex:1},
                {text: 'Aktif',sortable: true,dataIndex: 'status',renderer: authCk},
                {text: 'Closing Date', width : 80, sortable: true, dataIndex: 'closing_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            listeners: {
                scope: me,
                select: me.onGridClick,
                itemdblclick: function(view, record){
                    me.onItemdblclick(me.CT_MonthStore, record, 'Edit Closing Data');
                }
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Tambah Data',
                            iconCls: 'save',
                            handler: function(){
                                var form = me.win.down('form');
                                me.onNew(form, 'CT_MonthModel', 'Tambah Data');
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            id:'dlt_ct_month',
                            handler: function() {
                                me.deleteCT_Month(me.CT_MonthStore);
                            }
                        }
                    ]
                }
            ]
        });
        me.CT_YearGrid = Ext.create('App.ux.GridPanel', {
            store: me.CT_YearStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {header : 'co_id', dataIndex : 'co_id', hidden: true},
                {header : 'Periode', dataIndex : 'periode_year'},
                {text: 'Remarks',sortable: true,dataIndex: 'remaks', flex:1},
                {text: 'Aktif',sortable: true,dataIndex: 'status',renderer: authCk},
                {text: 'Closing Date', width : 80, sortable: true, dataIndex: 'closing_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            listeners: {
                scope: me,
                select: me.onGridClick1,
                itemdblclick: function(view, record){
                    me.onItemdblclick1(me.CT_YearStore, record, 'Edit Closing Data');
                }
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Tambah Data',
                            iconCls: 'save',
                            handler: function(){
                                var form = me.winform.down('form');
                                me.onNew1(form, 'CT_YearModel', 'Tambah Data');
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            id:'dlt_ct_year',
                            handler: function() {
                                me.deleteCT_Year(me.CT_YearStore);
                            }
                        }
                    ]
                }
            ]
        });
        // *************************************************************************************
        // Window User Form
        // *************************************************************************************
        me.win = Ext.create('App.ux.window.Window', {
            width: 500,
            items: [
                {
                    xtype: 'mitos.form',
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 100
                    },
                    defaultType: 'textfield',
                    //hideLabels      : true,
                    defaults: {
                        labelWidth: 89,
                        anchor: '100%',
                        layout: {
                            type: 'hbox',
                            defaultMargins: {
                                top: 0,
                                right: 5,
                                bottom: 0,
                                left: 0
                            }
                        }
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Periode : '
                                },
                                {
                                    xtype : 'textfield',
                                    name: 'periode_month',
                                    allowBlank:false
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Remarks :'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'remaks'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 150,
                                    xtype: 'mitos.checkbox',
                                    fieldLabel: 'Aktif',
                                    name: 'status',
                                    handler: function(field, value) {
                                        if (value== true) {
                                            Ext.getCmp('closingdate_month').setDisabled(false);
                                            Ext.getCmp('closingdate_month').setValue(new Date());

                                        }else{
                                            Ext.getCmp('closingdate_month').setDisabled(true);
                                        }

                                    }
                                },
                                {
                                    xtype : 'datefield',
                                    width : 100,
                                    name : 'closing_date',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s',
                                    disabled: true,
                                    maxValue: new Date(),
                                    allowBlank:false,
                                    id:'closingdate_month'
                                }]
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: i18n('save'),
                    cls: 'winSave',
                    handler: function(){
                        var form = me.win.down('form').getForm();
                        if(form.isValid()){
                            me.saveCT_Month(form, me.CT_MonthStore);
                        }
                    }
                },
                '-',
                {
                    text: i18n('cancel'),
                    scope: me,
                    handler: function(btn){
                        btn.up('window').close();
                    }
                }
            ],
            listeners: {
                scope: me,
                close: function(){
                    me.action('close');
                }
            }
        });
        me.winform = Ext.create('App.ux.window.Window', {
            width: 500,
            items: [
                {
                    xtype: 'mitos.form',
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 100
                    },
                    defaultType: 'textfield',
                    //hideLabels      : true,
                    defaults: {
                        labelWidth: 89,
                        anchor: '100%',
                        layout: {
                            type: 'hbox',
                            defaultMargins: {
                                top: 0,
                                right: 5,
                                bottom: 0,
                                left: 0
                            }
                        }
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Periode : '
                                },
                                {
                                    width: 40,
                                    xtype : 'textfield',
                                    name: 'periode_year',
                                    allowBlank:false
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Remarks :'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'remaks'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 150,
                                    xtype: 'mitos.checkbox',
                                    fieldLabel: 'Aktif',
                                    name: 'status',
                                    handler: function(field, value) {
                                        if (value== true) {
                                            Ext.getCmp('closingdate_year').setDisabled(false);
                                            Ext.getCmp('closingdate_year').setValue(new Date());

                                        }else{
                                            Ext.getCmp('closingdate_year').setDisabled(true);
                                        }

                                    }
                                },
                                {
                                    xtype : 'datefield',
                                    width : 100,
                                    name : 'closing_date',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s',
                                    disabled: true,
                                    maxValue: new Date(),
                                    allowBlank:false,
                                    id:'closingdate_year'
                                }]
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: i18n('save'),
                    cls: 'winSave',
                    handler: function(){
                        var form = me.winform.down('form').getForm();
                        if(form.isValid()){
                            me.saveCT_Year(form, me.CT_YearStore);
                        }
                    }
                },
                '-',
                {
                    text: i18n('cancel'),
                    scope: me,
                    handler: function(btn){
                        btn.up('window').close();
                    }
                }
            ],
            listeners: {
                scope: me,
                close: function(){
                    me.action1('close');
                }
            }
        });
        // END WINDOW
        me.pageBody = [me.CT_MonthGrid, me.CT_YearGrid];
        me.callParent(arguments);
    }, // end of initComponent

    onGridClick: function(grid, selected){
        if(selected.data.status == 1 || selected.data.status == 2){
            Ext.getCmp('dlt_ct_month').disable();
        }else{
            Ext.getCmp('dlt_ct_month').enable();
        }
    },
    onGridClick1: function(grid, selected){
        if(selected.data.status == 1 || selected.data.status == 2){
            Ext.getCmp('dlt_ct_year').disable();
        }else{
            Ext.getCmp('dlt_ct_year').enable();
        }
    },
    onNew: function(form, model, title){
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({
        }, model);
        form.getForm().loadRecord(newModel);
        this.action('new');
        this.win.show();
    },
    onNew1: function(form, model, title){
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({
        }, model);
        form.getForm().loadRecord(newModel);
        this.action1('new');
        this.winform.show();
    },

    saveCT_Month: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record);
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                me.win.close();
            },
            failure:function(){
                me.msg('Opps!', 'Error!!', true);
            }
        });
        store.load();
    },
    saveCT_Year: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record);
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                me.winform.close();
            },
            failure:function(){
                me.msg('Opps!', 'Error!!', true);
            }
        });
        store.load();
    },
    onItemdblclick: function(store, record, title){
        var form = this.win.down('form');
        this.setForm(form, title);
        form.getForm().loadRecord(record);
        this.action('old');
        this.win.show();
    },
    onItemdblclick1: function(store, record, title){
        var form = this.winform.down('form');
        this.setForm(form, title);
        form.getForm().loadRecord(record);
        this.action('old');
        this.winform.show();
    },
    setForm: function(form, title){
        form.up('window').setTitle(title);
    },
    openWin: function(){
        this.win.show();
    },
    action: function(action){
        var win = this.win, form = win.down('form');
        if(action == 'close'){
            form.getForm().reset();
        }
    },
    openWin1: function(){
        this.winform.show();
    },
    action1: function(action){
        var win = this.winform, form = win.down('form');
        if(action == 'close'){
            form.getForm().reset();
        }
    },
    deleteCT_Month: function(store){
        var me = this, grid = me.CT_MonthGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('periode_month');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Tax.deleteCT_Month(bid);
                    store.remove(sr);
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        });
//        store.load();
    },
    deleteCT_Year: function(store){
        var me = this, grid = me.CT_YearGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('periode_year');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Tax.deleteCT_Month(bid);
                    store.remove(sr);
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        });
//        store.load();
    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.CT_MonthStore.load();
        this.CT_YearStore.load();
        callback(true);
    }
});
//ens UserPage class