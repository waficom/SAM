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

        Ext.define('SalesOrderPopupModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'so_num',type: 'string'},
                {name: 'cust_id',type: 'string'},
                {name: 'tanggal',type: 'date'}
                // {name: 'timeedit',type: 'date'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: DeliveryOrder.getSOpopup

                }
            }
        });
        me.SOpopupStore = Ext.create('Ext.data.Store', {
            model: 'SalesOrderPopupModel',
            autoLoad: true
        });

        Ext.define('VendorPopupModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'vend_id',type: 'string'},
                {name: 'vend_nama',type: 'string'},
                {name: 'contact',type: 'string'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: DeliveryOrder.getVEpopup

                }
            }
        });
        me.VEpopupStore = Ext.create('Ext.data.Store', {
            model: 'VendorPopupModel',
            autoLoad: true
        });

        Ext.define('SatuanPopup', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'satuan_id',type: 'string'},
                {name: 'satuan_nama',type: 'string'},
                {name: 'timeedit',type: 'date'}
                // {name: 'timeedit',type: 'date'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read:  Satuan.getsatuan

                }
            }
        });
        me.SatuanPopupStore = Ext.create('Ext.data.Store', {
            model: 'SatuanPopup',
            autoLoad: true
        });

        Ext.define('ProdPopup', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'prod_id',type: 'string'},
                {name: 'prod_nama',type: 'string'},
                {name: 'timeedit',type: 'date'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read:  Items.getitems

                }
            }
        });
        me.ProdPopupStore = Ext.create('Ext.data.Store', {
            model: 'ProdPopup',
            autoLoad: true
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
                {text: 'Police_no', width:150, sortable: false,dataIndex: 'police_no'},
                {text: 'Surat Jalan', width:200, sortable: false,dataIndex: 'suratjalan'},
                {text: 'Vessel', width:200, sortable: false,dataIndex: 'vessel'},
                {text: 'Delivery Date', sortable : false, dataIndex: 'deliverydate', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'Origin', width:200, sortable: false,dataIndex: 'origin'},
                {text: 'Destination', width:200, sortable: false,dataIndex: 'destination'},
                {text: 'Qty', width:100, sortable: false,dataIndex: 'qty'},
                {text: 'satuan_id', width:100, sortable: false,dataIndex: 'satuan_id'},
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
        me.SOpopupGrid = Ext.create('App.ux.GridPanel', {
            store: me.SOpopupStore,
            itemId: 'SOpopupGrid',
            //height: 300,
            margin: '0 0 3 0',
            region: 'north',
            enablePaging: true,
            columns: [
                {text: 'so_num', sortable: false, dataIndex: 'so_num'},
                {text: 'cust_id', width:200, sortable: false,dataIndex: 'cust_id'},
                {text: 'Tanggal', width : 80, sortable: true, dataIndex: 'tanggal', renderer:Ext.util.Format.dateRenderer('d-m-Y')}

            ],
            listeners: {
                scope: me,
                select: me.onItemGridClick
            },

            features:[searching]
        });
        me.VEpopupGrid = Ext.create('App.ux.GridPanel', {
            store: me.VEpopupStore,
            itemId: 'VEpopupGrid',
            //height: 300,
            margin: '0 0 3 0',
            region: 'north',
            enablePaging: true,
            columns: [
                {text: 'vend_id', sortable: false, dataIndex: 'vend_id'},
                {text: 'Vendor Name', width:200, sortable: false,dataIndex: 'vend_nama'},
                {text: 'Contact', width : 80, sortable: true, dataIndex: 'contact'}

            ],
            listeners: {
                scope: me,
                select: me.onItemGridClick
            },

            features:[searching]
        });
        me.SatpopupGrid = Ext.create('App.ux.GridPanel', {
            store: me.SatuanPopupStore,
            itemId: 'SatpopupGrid',
            //height: 300,
            margin: '0 0 3 0',
            region: 'north',
            enablePaging: true,
            columns: [
                {text: 'Satuan  ID', sortable: false, dataIndex: 'satuan_id'},
                {text: 'Satuan Nama', width:200, sortable: false,dataIndex: 'satuan_nama'}

            ],
            listeners: {
                scope: me,
                select: me.onItemGridClick
            },

            features:[searching]
        });
        me.ProdpopupGrid = Ext.create('App.ux.GridPanel', {
            store: me.ProdPopupStore,
            itemId: 'ProdpopupGrid',
            //height: 300,
            margin: '0 0 3 0',
            region: 'north',
            enablePaging: true,
            columns: [
                {text: 'Produk  ID', sortable: false, dataIndex: 'prod_id'},
                {text: 'Produk Nama', width:200, sortable: false,dataIndex: 'prod_nama'}

            ],
            listeners: {
                scope: me,
                select: me.onItemGridClick
            },

            features:[searching]
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
                                    width: 100,
                                    xtype: 'textfield',
                                    id:'so_num_do',
                                    name: 'so_num'
                                    // disabled: true
                                },
                                {
                                    xtype: 'button',
                                    text :'...',
                                    handler: function(){
                                        //me.myWinChooseItem.show();
                                        me.ShowGridPopup(me.SOpopupStore,'Sales Order',me.SOpopupGrid);
                                    }
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
            width: 400,
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
                                    width: 100,
                                    xtype: 'textfield',
                                    id:'prod_id_do',
                                    // disabled: true,
                                    name: 'prod_id'
                                },
                                {
                                    xtype: 'button',
                                    text :'...',
                                    handler: function(){
                                        //me.myFormulaChooseItem.showAt(400,200);
                                        me.ShowGridPopup(me.ProdPopupStore, 'Produk',me.ProdpopupGrid);

                                    }
                                },
                                {
                                    width: 200,
                                    xtype: 'displayfield',
                                    value: '',
                                    id: 'Prod_desc_do'
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
                                    width: 100,
                                    xtype: 'textfield',
                                    id:'vend_id_do',
                                    // disabled: true,
                                    name: 'vend_id'
                                },
                                {
                                    xtype: 'button',
                                    text :'...',
                                    handler: function(){
                                        //me.myFormulaChooseItem.showAt(400,200);
                                        me.ShowGridPopup(me.VEpopupStore, 'Vendor',me.VEpopupGrid);

                                    }
                                },
                                {
                                    width: 200,
                                    xtype: 'displayfield',
                                    value: '',
                                    id: 'vend_desc_do'
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
                                    value: 'Sat  ID :'
                                },
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    id:'sat_id_do',
                                    // disabled: true,
                                    name: 'satuan_id'
                                },
                                {
                                    xtype: 'button',
                                    text :'...',
                                    handler: function(){
                                        //me.myFormulaChooseItem.showAt(400,200);
                                        me.ShowGridPopup(me.SatuanPopupStore, 'Satuan',me.SatpopupGrid);

                                    }
                                },
                                {
                                    width: 200,
                                    xtype: 'displayfield',
                                    value: '',
                                    id: 'satuan_desc_do'
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
    onItemGridClick: function(grid,selected){ //
        var me = this;
        //var getso_num = grid.getSelectionModel().getSelection()[0].get('so_num');
        var getso_num= selected.data.so_num;
        var vend_id= selected.data.vend_id;
        var sat_id= selected.data.satuan_id;

        if(selected.data.so_num != null){
            Ext.getCmp('so_num_do').setValue(getso_num);
        }else if(selected.data.vend_id != null){
            Ext.getCmp('vend_id_do').setValue(vend_id);
            Ext.getCmp('vend_desc_do').setValue(selected.data.vend_nama);
        }else if(selected.data.satuan_id != null){
            Ext.getCmp('sat_id_do').setValue(sat_id);
            Ext.getCmp('satuan_desc_do').setValue(selected.data.satuan_nama);
        }else if(selected.data.prod_id != null){
            Ext.getCmp('prod_id_do').setValue(selected.data.prod_id);
            Ext.getCmp('prod_desc_do').setValue(selected.data.prod_nama);
        }
        me.myWinChooseItem.close();
    },

    ShowGridPopup: function(store, title, grid){
        this.myWinChooseItem= Ext.create('App.ux.window.Window',{
            layout: 'fit',
            title: title,
            width: 400,
            height: 300,
            items:[grid],
            modal:true

        });
        this.myWinChooseItem.show();
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
