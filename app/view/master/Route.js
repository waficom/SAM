/**
 * Created with JetBrains PhpStorm.
 * User: dharma
 * Date: 5/7/13
 * Time: 10:08 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.view.master.Route', {
    extend: 'App.ux.RenderPanel',
    id: 'panelRoute',
    pageTitle: 'Route',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.currRoute = null;
        me.curr_coid = null;
        me.userinput =null;
        me.useredit=null;

        Ext.define('RouteModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'route_code',type: 'string'},
                {name: 'description',type: 'string'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'old_route_code',type: 'string'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: Route.getRoute,
                    create: Route.addRoute,
                    update: Route.updateRoute,
                    destroy: Route.deleteRoute
                }
            }
        });
        me.RouteStore = Ext.create('Ext.data.Store', {
            model: 'RouteModel',
            autoLoad: false
        });

        Ext.define('RouteDModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'route_code',type: 'string',  hidden : true}
                ,{name: 'sequence_no',type: 'string'}
                ,{name: 'route',type: 'string'}
                ,{name: 'fromcity',type: 'string'}
                ,{name: 'tocity',type: 'string'}
                ,{name: 'timeedit',type: 'date'}
                ,{name: 'useredit',type: 'string'}
                ,{name: 'userinput',type: 'string'}
                ,{name: 'old_sequence_no',type: 'string'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: Route.getRouteD,
                    create: Route.addRouteD,
                    update: Route.updateRouteD,
                    destroy: Route.deleteRouteD
                }
            }
        });
        me.RouteDStore = Ext.create('Ext.data.Store', {
            model: 'RouteDModel',
            autoLoad: false
        });

        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit']

        }

        /**
         * Lists Grid
         */
        me.RouteGrid = Ext.create('App.ux.GridPanel', {
            store: me.RouteStore,
            itemId: 'RouteGrid',
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            enablePaging: true,
            columns: [
                {text: 'No. Route', sortable: false, dataIndex: 'route_code'},
                {text: 'Description', width:200, sortable: false,dataIndex: 'description'},
                {text: 'LastUpdate', dataIndex: 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y')}

            ],
            listeners: {
                scope: me,
                select: me.onRouteGridClick,
                itemdblclick: function(view, record){
                    oldName = record.get('route_code');
                    record.set("old_route_code",oldName);
                    me.onItemdblclick(me.RouteStore, record, 'Edit Route');
                }
            },
            features:[searching],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Add',
                            iconCls: 'icoAddRecord',
                            scope: me,
                            handler: function(){
                                var form = me.win.down('form');
                                me.onNewRoute(form, 'RouteModel', 'Tambah Data');
                            },
                            tooltip : 'Tambah Data'
                        },
                        {
                            text: 'Delete',
                            iconCls: 'icoDeleteBlack',
                            itemId: 'listDeleteBtn',
                            scope: me,
                            handler:function() {
                                me.onRouteDelete(me.RouteStore);
                            },
                            tooltip: 'Hapus Data'
                        },'->',
                        {
                            xtype:'displayfield',
                            itemId:'itemuserinput',
                            margin : '0 5 0 0'
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.RouteStore,
                    beforePageText: 'Page',
                    afterPageText: 'of {0}',
                    displayMsg: 'Diplay {0} - {1} Of {2}',
                    emptyMsg: 'No Record Found',
                    dock: 'bottom',
                    displayInfo: true,
                    pageSize: 5

                }
            ]
        });
        /**
         * Options Grid
         */
        me.RouteDGrid = Ext.create('App.ux.GridPanel', {
            store: me.RouteDStore,
            region: 'center',
            enablePaging: true,
            requires: [
                'Ext.toolbar.Paging'
            ],
            columns: [
                {text: 'sequence_no', sortable: false, dataIndex: 'sequence_no'},
                {text: 'Route', sortable: false, dataIndex: 'route'},
                {text: 'From', width:100, sortable: false,dataIndex: 'fromcity'},
                {text: 'To', width:150, sortable: false,dataIndex: 'tocity'},
                {text: 'LastUpdate', width : 80, sortable: false, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
//flex: 1
            ],
            listeners: {
                scope: me,
                //select: me.onGridClick,
                itemdblclick: function(view, record){
                    oldName = record.get('sequence_no');
                    record.set("old_sequence_no",oldName);
                    me.onItemdblclick1(me.RouteDStore, record, 'Edit Detail Route');
                }
            },
            features:[searching],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        text: 'Add',
                        iconCls: 'icoAddRecord',
                        scope: me,
                        handler: function(){
                            var form1 = me.winform1.down('form');
                            me.onNewRouteD(form1, 'RouteDModel', 'Tambah Data');
                        }
                    },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteRouteD(me.RouteDStore);
                            }
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.RouteDGrid,
                    beforePageText: 'Page',
                    afterPageText: 'of {0}',
                    displayMsg: 'Diplay {0} - {1} Of {2}',
                    emptyMsg: 'No Record Found',
                    dock: 'bottom',
                    displayInfo: true,
                    pageSize: 5

                }
            ]
        });
        /* me.Popup = Ext.create('App.ux.GridPanel', {
         store: me.RouteStore,
         itemId: 'GridPopup',
         height: 300,
         margin: '0 0 3 0',
         region: 'center',
         enablePaging: true,
         loadMask: true,
         columns: [
         {text: 'No. Route', sortable: false, dataIndex: 'no_pp'},
         {text: 'Deskripsi', width:70, sortable: false,dataIndex: 'description'},
         {text: 'status',width:70, sortable: true, dataIndex: 'status'},
         {text: 'Tanggal', width : 80, sortable: true, dataIndex: 'pp_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
         {text: 'LastUpdate', dataIndex: 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y')}
         ],
         viewConfig: {
         forceFit: true
         },
         features:[searching]


         });*/
        // *************************************************************************************
        // Window User Form
        // *************************************************************************************
        me.win = Ext.create('App.ux.window.Window', {
            width: 600,
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
                                    value: 'Route code ' + ': '
                                },
                                {
                                    width: 100,
                                    name: 'route_code',
                                    xtype: 'mitos.UpperCaseTextField',
                                    allowBlank: false,
                                    stripCharsRe: /(^\s+|\s+$)/g
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
                                    value: 'Description :'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'description'
                                }
                            ]
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: 'Save',
                    cls: 'winSave',
                    handler: function(){
                        var form = me.win.down('form').getForm();
                        if(form.isValid()){
                            me.onRouteSave(form, me.RouteStore);
                        }
                    }
                },
                '-',
                {
                    text: 'Cancel',
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
        me.winform1 = Ext.create('App.ux.window.Window', {
            width: 600,
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
                            xtype: 'textfield',
                            hidden: true,
                            name: 'route_code'
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
                                    value: 'Sequence :'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'sequence_no'
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
                                    value: 'Route:'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'route'
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
                                    value: 'From City::'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'fromcity'
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
                                    value: 'To City::'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'tocity'
                                }
                            ]
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: i18n('save'),
                    cls: 'winSave',
                    handler: function(){
                        var form = me.winform1.down('form').getForm();
                        if(form.isValid()){
                            me.onRouteDSave(form, me.RouteDStore);
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
            features:[searching],
            listeners: {
                scope: me,
                close: function(){
                    me.action1('close');
                }
            }
        });
        /*  me.mywin = Ext.create('App.ux.window.Window', {
         layout: 'fit',
         title: 'Exception Detail',
         width: 400,
         height: 300,
         closable: false,
         buttonAlign: 'center',
         items: [GridPopup],
         modal: true

         });*/

        me.pageBody = [me.RouteGrid, me.RouteDGrid];
        me.callParent(arguments);
    },
    setForm: function(form, title){
        form.up('window').setTitle(title);
    },
    openWin: function(){
        this.win.show();
    },
    openWin1: function(){
        this.winform1.show();
    },

    action: function(action){
        var win = this.win, form = win.down('form');
        if(action == 'close'){
            form.getForm().reset();
        }
    },
    action1: function(action){
        var winf = this.winform1, form = winf.down('form');
        if(action == 'close'){
            form.getForm().reset();
        }
    },
    action2: function(action){
        var winview = this.winform1, form = winview.down('form');
        if(action == 'close'){
            form.getForm().reset();
        }
    },


    /**
     * This wll load a new record to the grid
     * and start the rowEditor
     */
    onNewRoute: function(form, model, title){
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({
        }, model);
        form.getForm().loadRecord(newModel);
        this.action('new');
        this.win.show();

    },
    onviewdetail: function(form, model,title){
        /*var myWin = new Ext.create('App.ux.window.Window', {
         layout: 'fit',
         title: 'Exception Detail',
         width: 400,
         height: 300,
         closable: false,
         buttonAlign: 'center',
         items: [GridPopup],
         modal: true
         });
         myWin.show();*/
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({
        }, model);
        form.getForm().loadRecord(newModel);
        record = form.getRecord()
        this.action1('new');
        this.winform1.show();



    },
    onNewRouteD: function(form, model, title){
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({
        }, model);
        form.getForm().loadRecord(newModel);
        record = form.getRecord()
        this.action1('new');
        this.winform1.show();
    },

    /**
     *
     * @param grid
     * @param selected
     */
    onRouteGridClick: function(grid, selected){
        var me = this;
        me.currRoute = selected.data.route_code;

        var TopBarItems = this.RouteGrid.getDockedItems('toolbar[dock="top"]')[0];

        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);

        me.RouteDStore.load({params:{route_code: me.currRoute}});


    },

    ReloadViewGridDetail : function(store, record, title){ //function(form, model, title){
        /*var me=this;
         record = me.RouteDGrid.getSelectionModel().getSelection();
         nppd=record[0].get('no_ppd');
         sonum=record[0].get('so_num');
         me.ViewRouteStore.load({params:{no_pp: nppd}});
         var newModel = Ext.ModelManager.create({
         }, 'ViewRouteModel');

         this.setForm(form, title);
         form.getForm().loadRecord(newModel);
         this.action('new');
         this.winformdetail.show();*/

        var form = this.winform1.down('form');
        this.setForm(form, title);
        //sonum=record[0].get('so_num');
        form.getForm().loadRecord(record);
        this.action2('old');
        this.winform1.show();



    },
    onItemdblclick: function(store, record, title){
        var form = this.win.down('form');
        this.setForm(form, title);
        form.getForm().loadRecord(record);
        this.action('old');
        this.win.show();
    },

    onItemdblclick1: function(store, record, title){
        var form = this.winform1.down('form');
        this.setForm(form, title);
        form.getForm().loadRecord(record);
        this.action1('old');
        this.winform1.show();
    },

    onRouteSave: function(form, store){
        var me = this;
        me.saveRoute(form, store);
    },
    saveRoute: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record);
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                me.win.close();
                store.load();
            },
            failure:function(){
                store.load();
                me.msg('Opps!', 'Error!!', true);
            }
        });
    },

    onRouteDSave: function(form, store){
        var me = this;
        me.saveRouteD(form, store);
    },
    saveRouteD: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record),
            f = me.win.down('form').getForm(), rec = f.getRecord();

        form.findField('route_code').setValue(me.currRoute);
        values = form.getValues();
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                me.winform1.close();
               // store.load();
            },
            failure:function(){
                //store.load();
                me.msg('Opps!', 'Error!!', true);
            }
        });
        store.load({params:{route_code: me.currRoute}});
    },
    onRouteDelete: function(store){
        var me = this, grid = me.RouteGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('ruote_code');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Route.deleteRoute(bid);
                    store.remove(sm.getSelection());
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        });
    },
    deleteRouteD: function(store){
        var me = this, grid = me.RouteDGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('sequence_no');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Route.deleteRouteD(bid);
                    store.remove(sm.getSelection());
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        })
    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        this.RouteStore.load({params:{start:5, limit:5}});
        this.RouteDStore.load();
        //    this.ViewRouteStore.load();
        callback(true);
    }
});
