Ext.define('App.view.transaksi.DeliveryOrder.DeliveryOrder', {
    extend: 'App.ux.RenderPanel',
    id: 'panelDeliveryOrder',
    pageTitle: 'DeliveryOrder',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.currDeliveryOrder = null;
        me.curr_coid = null;
        me.userinput =null;
        me.useredit=null;
        //me.myWinChooseItem=null;

        Ext.define('DeliveryOrderModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'do_num',type: 'string'},
                {name: 'so_num',type: 'string'},
                {name: 'route',type: 'string'},
                {name: 'deliverydate',type: 'date'},
                {name: 'cust_nama',type: 'string'},
                {name: 'qty',type: 'string'},
                {name: 'qty_delivery',type: 'string'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'timeinput',type: 'date'},
                {name: 'old_do_num',type: 'string'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: DeliveryOrder.getDeliveryOrder,
                    create: DeliveryOrder.addDeliveryOrder,
                    update: DeliveryOrder.updateDeliveryOrder,
                    destroy: DeliveryOrder.deleteDeliveryOrder
                }
            }
        });
        me.DeliveryOrderStore = Ext.create('Ext.data.Store', {
            model: 'DeliveryOrderModel',
            autoLoad: false
        });

        Ext.define('DeliveryOrder1Model', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'do_num',type: 'string'}
                ,{name: 'sequence_no',type: 'string'}
                ,{name: 'ordersource',type: 'string'}
                ,{name: 'deliverydate',type: 'date'}
                ,{name: 'vend_id',type: 'string'}
                ,{name: 'police_no',type: 'string'}
                ,{name: 'suratjalan',type: 'string'}
                ,{name: 'prod_id',type: 'string'}
                ,{name: 'prod_nama',type: 'string'}
                ,{name: 'vessel',type: 'string'}
                ,{name: 'container_name',type: 'string'}
                ,{name: 'container_no',type: 'string'}
                ,{name: 'seal_no',type: 'string'}
                ,{name: 'origin',type: 'string'}
                ,{name: 'destination',type: 'string'}
                ,{name: 'qty',type: 'string'}
                ,{name: 'satuan_id',type: 'string'}
                ,{name: 'status',type: 'string'}
                ,{name: 'timeedit',type: 'date'}
                ,{name: 'timeinput',type: 'date'}
                ,{name: 'useredit',type: 'string'}
                ,{name: 'userinput',type: 'string'}
                ,{name: 'old_sequence_no',type: 'string'}

            ],
            proxy: {
                type: 'direct',
                api: {
                    read: DeliveryOrder.getDeliveryOrder1,
                    create: DeliveryOrder.addDeliveryOrder1,
                    update: DeliveryOrder.updateDeliveryOrder1,
                    destroy: DeliveryOrder.deleteDeliveryOrder1
                }
            }
        });
        me.DeliveryOrder1Store = Ext.create('Ext.data.Store', {
            model: 'DeliveryOrder1Model',
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
        me.DeliveryOrderGrid = Ext.create('App.ux.GridPanel', {
            store: me.DeliveryOrderStore,
            itemId: 'DeliveryOrderGrid',
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            enablePaging: true,
            columns: [
                {text: 'Do_num', sortable: false, dataIndex: 'do_num'},
                {text: 'So_num', sortable: false, dataIndex: 'so_num'},
                {text: 'Route', width:100, sortable: false,flex: 1, dataIndex: 'route'},
                {text: 'Delivery Date', width : 80, sortable: true, dataIndex: 'deliverydate', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'Customer', width:200, sortable: false,flex: 1,dataIndex: 'cust_nama'},
                {text: 'Qty', width:200, sortable: false,dataIndex: 'qty'},
                {text: 'Qty Delivery', width:200, sortable: false,dataIndex: 'qty_delivery'},
                {text: 'LastUpdate', dataIndex: 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            listeners: {
                scope: me,
                select: me.onDeliveryOrderGridClick,
                itemdblclick: function(view, record){
                    oldName = record.get('do_num');
                    record.set("old_do_num",oldName);
                    me.onItemdblclick(me.DeliveryOrderStore, record, 'Edit DeliveryOrder');
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
                                me.onNewDeliveryOrder(form, 'DeliveryOrderModel', 'Tambah Data');
                            },
                            tooltip : 'Tambah Data'
                        },
                        {
                            text: 'Delete',
                            iconCls: 'icoDeleteBlack',
                            itemId: 'listDeleteBtn',
                            scope: me,
                            handler:function() {
                                me.onDeliveryOrderDelete(me.DeliveryOrderStore);
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
                    store: me.DeliveryOrderStore,
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
        me.DeliveryOrder1Grid = Ext.create('App.ux.GridPanel', {
            store: me.DeliveryOrder1Store,
            region: 'center',
            enablePaging: true,
            columns: [
                {text: 'do_num', sortable: false, dataIndex: 'do_num',  hidden : true},
                {text: 'prod_id', sortable: false, dataIndex: 'prod_id',  hidden : true},
                {text: 'sequence_no', sortable: false, dataIndex: 'sequence_no', hidden: true},
                {text: 'Produk', sortable: false, width:200, dataIndex: 'prod_nama'},
                {text: 'Vend_id', width:100, sortable: false,dataIndex: 'vend_id'},
                {text: 'Police_no', width:100, sortable: false,dataIndex: 'police_no'},
                {text: 'Surat Jalan', width:200, sortable: false,dataIndex: 'suratjalan'},
                {text: 'Vessel', width:200, sortable: false,dataIndex: 'vessel'},
                {text: 'Container Name', width:200, sortable: false,dataIndex: 'container_name'},
                {text: 'Container No', width:200, sortable: false,dataIndex: 'container_no'},
                {text: 'Seal No', width:200, sortable: false,dataIndex: 'seal_no'},
                {text: 'Delivery Date', sortable : false, dataIndex: 'deliverydate', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'Origin', width:200, sortable: false,dataIndex: 'origin'},
                {text: 'Destination', width:200, sortable: false,dataIndex: 'destination'},
                {text: 'Qty', width:100, sortable: false,dataIndex: 'qty'},
                {text: 'satuan_id', width:50, sortable: false,dataIndex: 'satuan_id'},
                {text: 'status', width:50, sortable: false,dataIndex: 'status'},
                {text: 'LastUpdate', width : 80, sortable: false, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            listeners: {
                scope: me,
                //select: me.onGridClick,
                itemdblclick: function(view, record){
                    oldName = record.get('sequence_no');
                    record.set("old_sequence_no",oldName);
                    me.onItemdblclick1(me.DeliveryOrder1Store, record, 'Edit Detail DeliveryOrder');
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
                            me.onNewDeliveryOrder1(form1, 'DeliveryOrder1Model', 'Tambah Data');
                        }
                    },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteDeliveryOrder1(me.DeliveryOrder1Store);
                            }
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.DeliveryOrder1Grid,
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
                            xtype: 'textfield',
                            hidden: true,
                            name: 'co_id'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'do_num'
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
                                    value: 'So_Num:'
                                },
                                {
                                    width: 200,
                                    xtype: 'xtSalesOrderPopup',
                                    name:'so_num'
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
                                    value: 'Route :'
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
                                    value: 'Delivery Date:'
                                },
                                {
                                    fieldLabel : 'Tanggal',
                                    xtype : 'datefield',
                                    width : 100,
                                    name : 'deliverydate',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s'
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
                            me.onDeliveryOrderSave(form, me.DeliveryOrderStore);
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
            width: 750,
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
                            name: 'sequence_no'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'do_num'
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
                                    value: 'Produk :'
                                },
                                {
                                    width: 200,
                                    xtype: 'xtlistproduct',
                                    name:'prod_id'
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
                                    value: 'Source :'
                                },
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    name: 'ordersource'
                                    // disabled: true
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
                                    value: 'deliverydate:'
                                },
                                {
                                    fieldLabel : 'Delivery Date',
                                    xtype : 'datefield',
                                    width : 100,
                                    name : 'deliverydate',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s'
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
                                    value: 'Vendor ID:'
                                },
                                {
                                    width: 200,
                                    xtype: 'xtVendorTransporterPopup',
                                    name:'vend_id'
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
                                    value: 'Police No:'
                                },
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    name: 'police_no'
                                    // disabled: true
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
                                    value: 'Surat jalan :'
                                },
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    name: 'suratjalan'
                                    // disabled: true
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
                                    value: 'Vessel:'
                                },
                                {
                                    width:200,
                                    xtype: 'textfield',
                                    name: 'vessel'
                                    // disabled: true
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
                                    value: 'Container Name:'
                                },
                                {
                                    width:150,
                                    xtype: 'textfield',
                                    name: 'container_name'
                                    // disabled: true
                                },
                                {
                                    width: 80,
                                    xtype: 'displayfield',
                                    value: 'Container No:'
                                },
                                {
                                    width:150,
                                    xtype: 'textfield',
                                    name: 'container_no'
                                    // disabled: true
                                },
                                {
                                    width: 50,
                                    xtype: 'displayfield',
                                    value: 'Seal No:'
                                },
                                {
                                    width:150,
                                    xtype: 'textfield',
                                    name: 'seal_no'
                                    // disabled: true
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
                                    value: 'Origin:'
                                },
                                {
                                    width: 200,
                                    xtype: 'textfield',
                                    name: 'origin'
                                    // disabled: true
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
                                    value: 'Destination:'
                                },
                                {
                                    width: 200,
                                    xtype: 'textfield',
                                    name: 'destination'
                                    // disabled: true
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
                                    value: 'Qty :'
                                },
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    name: 'qty'
                                    // disabled: true
                                },
                                {
                                    width: 50,
                                    xtype: 'displayfield',
                                    value: 'Satuan :'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtSatuanPopup',
                                    name:'satuan_id'
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
                            me.onDeliveryOrder1Save(form, me.DeliveryOrder1Store);
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

        me.pageBody = [me.DeliveryOrderGrid, me.DeliveryOrder1Grid];
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
    onNewDeliveryOrder: function(form, model, title){
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({
        }, model);
        form.getForm().loadRecord(newModel);
        this.action('new');
        this.win.show();

    },

    onNewDeliveryOrder1: function(form, model, title){
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
    onDeliveryOrderGridClick: function(grid, selected){
        var me = this;
        me.currDeliveryOrder = selected.data.do_num;
        var TopBarItems = this.DeliveryOrderGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);
        me.DeliveryOrder1Store.load({params:{do_num: me.currDeliveryOrder}});

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

    onDeliveryOrderSave: function(form, store){
        var me = this;
        me.saveDeliveryOrder(form, store);
    },
    saveDeliveryOrder: function(form, store){
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

    onDeliveryOrder1Save: function(form, store){
        var me = this;
        me.saveDeliveryOrder1(form, store);
    },
    saveDeliveryOrder1: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record),
            f = me.winform1.down('form').getForm(), rec = f.getRecord();

        form.findField('do_num').setValue(me.currDeliveryOrder);
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
        store.load({params:{do_num: me.currDeliveryOrder}});
        me.DeliveryOrderStore.load();
    },
    onDeliveryOrderDelete: function(store){
        var me = this, grid = me.DeliveryOrderGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('do_num');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    DeliveryOrder.deleteDeliveryOrder(bid);
                    store.remove(sm.getSelection());
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        });
    },
    deleteDeliveryOrder1: function(store){
        var me = this, grid = me.DeliveryOrder1Grid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('do_num');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    DeliveryOrder.deleteDeliveryOrder1(bid);
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
        this.DeliveryOrderStore.load({params:{start:0, limit:5}});
        this.DeliveryOrder1Store.load({params:{start:0, limit:5}});

        callback(true);
    }
});
