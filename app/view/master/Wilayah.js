Ext.define('App.view.master.Wilayah', {
    extend: 'App.ux.RenderPanel',
    id: 'panelWilayah',
    pageTitle: 'Wilayah',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.currWilayah = null;
        me.curr_coid = null;

        Ext.define('WilayahModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'wilayah_id',type: 'string'},
                {name: 'wilayah_nama',type: 'string'},
                {name: 'keterangan',type: 'string'},
                {name: 'old_wilayah_id',type: 'string'},
                {name: 'aktif',type: 'bool'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: Wilayah.getwilayah,
                    create: Wilayah.addwilayah,
                    update: Wilayah.updatewilayah,
                    destroy: Wilayah.deletewilayah
                }
            }
        });
        me.WilayahStore = Ext.create('Ext.data.Store', {
            model: 'WilayahModel',
            autoLoad: false
        });

        Ext.define('SalesmanModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'}
                ,{name: 'wilayah_id',type: 'string'}
                ,{name: 'sales_id',type: 'string'}
                ,{name: 'sales_nama',type: 'string'}
                ,{name: 'keterangan',type: 'string'}
                ,{name: 'old_sales_id',type: 'string'}
                ,{name: 'aktif',type: 'bool'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: Wilayah.getsaleswil,
                    create: Wilayah.addsaleswil,
                    update: Wilayah.updatesaleswil,
                    destroy: Wilayah.deletesaleswil
                }
            }
        });
        me.SalesmanStore = Ext.create('Ext.data.Store', {
            model: 'SalesmanModel',
            autoLoad: false
        });

        /**
         * Lists Grid
         */
        me.WilayahGrid = Ext.create('App.ux.GridPanel', {
            store: me.WilayahStore,
            itemId: 'WilayahGrid',
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {text: 'co_id', sortable: false, dataIndex: 'co_id', hidden : true},
                {text: 'Wilayah', width:70, sortable: false,dataIndex: 'wilayah_id'},
                {text: 'Nama Wilayah', flex: 1, sortable: true, dataIndex: 'wilayah_nama'},
                {text: 'Keterangan', width : 150, dataIndex: 'keterangan', sortable : true },
                {text: 'Aktif', width:55, sortable: false, dataIndex: 'aktif', renderer: me.boolRenderer }
            ],
            listeners: {
                scope: me,
                select: me.onWilayahGridClick,
                itemdblclick: function(view, record){
                    oldName = record.get('wilayah_id');
                    record.set("old_wilayah_id",oldName);
                    me.onItemdblclick(me.WilayahStore, record, 'Edit Wilayah');
                }
            },
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
                                me.onNewWilayah(form, 'WilayahModel', 'Tambah Data');
                            },
                            tooltip : 'Tambah Data'
                        },
                        '->',
                        {
                            text: 'Delete',
                            iconCls: 'icoDeleteBlack',
                            itemId: 'listDeleteBtn',
                            scope: me,
                            handler:function() {
                                me.onWilayahDelete(me.WilayahStore);
                            },
                            tooltip: 'Hapus Data'
                        }
                    ]
                }
            ]
        });
        /**
         * Options Grid
         */
        me.SalesmanGrid = Ext.create('App.ux.GridPanel', {
            store: me.SalesmanStore,
            itemId: 'SalesmanGrid',
            region: 'center',
            columns: [
                {text: 'co_id', sortable: false, dataIndex: 'co_id', hidden : true},
                {text: 'Wilayah', width:70, sortable: false,dataIndex: 'wilayah_id', hidden : true},
                {text: 'sales_id', sortable : true, dataIndex: 'sales_id', hidden : true},
                {text: 'Salesman', flex: 1, sortable : true, dataIndex: 'sales_nama'},
                {text: 'Keterangan', width: 200, sortable: true, dataIndex: 'keterangan'},
                {text: 'Aktif', width : 80, sortable: false, dataIndex: 'aktif',renderer: me.boolRenderer}
            ],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    oldName = record.get('sales_id');
                    record.set("old_sales_id",oldName);
                    me.onItemdblclick1(me.SalesmanStore, record, 'Edit Detail Salesman');
                }
            },
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
                            me.onNewSalesman(form1, 'SalesmanModel', 'Tambah Data');
                        }
                    },'->',
                    {
                        xtype: 'button',
                        text: 'Hapus Data',
                        iconCls: 'delete',
                        handler: function() {
                            me.deleteSalesman(me.SalesmanStore);
                        }
                    }]
                }
            ]
        });

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
                                    value: 'Wilayah ID ' + ': '
                                },
                                {
                                    width: 100,
                                    name: 'wilayah_id',
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
                                    value: 'Nama Wilayah :'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'wilayah_nama'
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
                                    value: 'Keterangan ' + ': '
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'keterangan'
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
                                    name: 'aktif'
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
                            me.onformulaSave(form, me.WilayahStore);
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
                            name: 'co_id'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'wilayah_id'
                        },
                        {
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    xtype : 'salesmanlivetsearch',
                                    fieldLabel : 'Salesman',
                                    hideLabel : false,
                                    itemId : 'sales_id',
                                    name : 'sales_id',
                                    anchor : null,
                                    labelWidth : 100,
                                    width : 400,
                                    margin : '0 0 0 0'
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
                                    value: 'Keterangan ' + ': '
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'keterangan'
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
                                    name: 'aktif'
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
                            me.onsalesmanSave(form, me.SalesmanStore);
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

        me.pageBody = [me.WilayahGrid, me.SalesmanGrid];
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

    /**
     * This wll load a new record to the grid
     * and start the rowEditor
     */
    onNewWilayah: function(form, model, title){
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({
        }, model);
        form.getForm().loadRecord(newModel);
        this.action('new');
        this.win.show();
    },
    onNewSalesman: function(form, model, title){
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
    onWilayahGridClick: function(grid, selected){
        var me = this;
        me.currWilayah = selected.data.wilayah_id;
        me.curr_coid = selected.data.co_id;
        me.SalesmanStore.load({params:{wilayah_id: me.currWilayah}});
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

    onformulaSave: function(form, store){
        var me = this;
        me.saveformula(form, store);
    },
    saveformula: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record);
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        console.log(values);
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

    onsalesmanSave: function(form, store){
        var me = this;
        me.savesalesman(form, store);
    },
    savesalesman: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record),
            f = me.win.down('form').getForm(), rec = f.getRecord();

        form.findField('wilayah_id').setValue(me.currWilayah);
        form.findField('co_id').setValue(me.curr_coid);
        values = form.getValues();
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        console.log(values);
        store.sync({
            success:function(){
                me.winform1.close();
            },
            failure:function(){
                me.msg('Opps!', 'Error!!', true);
            }
        });
        store.load();
    },
    onWilayahDelete: function(store){
        var me = this, grid = me.WilayahGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('wilayah_id');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Wilayah.deleteformula(bid);
                    store.remove(sm.getSelection());
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        });
//        store.load();
    },
    deleteSalesman: function(store){
        var me = this, grid = me.SalesmanGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('bb_id');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Wilayah.deletesaleswil(bid);
                    store.remove(sm.getSelection());
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
        var me = this;
        this.WilayahStore.load();
        this.SalesmanStore.load();
        callback(true);
    }
});
