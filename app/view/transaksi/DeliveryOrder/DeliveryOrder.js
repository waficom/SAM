Ext.define('App.view.transaksi.DeliveryOrder.DeliveryOrder', {
    extend: 'App.ux.RenderPanel',
    id: 'panelDeliveryOrder',
    pageTitle: 'Pengiriman Barang Jadi',
    uses: ['App.ux.GridPanel'],
    initComponent : function()
    {
        var me = this;
        me.do_num=null;
        me.cust_id=null;

        Ext.define('DOModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'do_num',type: 'string'},
                {name: 'so_num',type: 'string'},
                {name: 'route',type: 'string'},
                {name: 'deliverydate',type: 'date'},
                {name: 'cust_nama',type: 'string'},
                {name: 'qty',type: 'float'},
                {name: 'qty_do',type: 'float'},
                {name: 'timeedit',type: 'date'},
                {name: 'status',type: 'string'},
                {name: 'prod_id',type: 'string'},
                {name: 'prod_nama',type: 'string'},
                {name: 'darigudang',type: 'string'},
                {name: 'for_do_num',type: 'string'},
                {name: 'do_type',type: 'string'},
                {name: 'cust_id',type: 'string'},
                {name: 'keterangan',type: 'string'},
                {name: 'sp_kirim',type: 'string'},
                {name: 'posted_date',type: 'date'},
            ],
            proxy:{
                type:'direct',
                api:{
                    read: DeliveryOrder.getDeliveryOrder,
                    create: DeliveryOrder.addDeliveryOrder,
                    update: DeliveryOrder.updateDeliveryOrder,
                    destroy: DeliveryOrder.deleteDeliveryOrder
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            }

        });
        Ext.define('DOLocModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'co_id', type : 'string'},
                { name : 'do_num', type : 'string'},
                { name : 'cust_id',type : 'string'},
                { name : 'custloc_id',type : 'string'},
                { name : 'custloc_nama',type : 'string'},
                { name : 'alamat',type : 'string'},
                { name : 'keterangan',type : 'string'},
                {name: 'status',type: 'string'},
                { name : 'qty', type : 'float'},
                { name : 'qty_do', type : 'float'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: DeliveryOrder.getDOLoc,
                    update: DeliveryOrder.updateDOLoc
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            }

        });
        Ext.define('DORouteModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'do_num',type: 'string'}
                ,{name: 'sequence_no',type: 'string'}
                ,{name: 'ordersource',type: 'string'}
                ,{name: 'vend_id',type: 'string'}
                ,{name: 'vend_nama',type: 'string'}
                ,{name: 'police_no',type: 'string'}
                ,{name: 'suratjalan',type: 'string'}
                ,{name: 'vessel',type: 'string'}
                ,{name: 'container_name',type: 'string'}
                ,{name: 'container_no',type: 'string'}
                ,{name: 'seal_no',type: 'string'}
                ,{name: 'origin',type: 'string'}
                ,{name: 'destination',type: 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: DeliveryOrder.getDeliveryOrder1,
                    create: DeliveryOrder.addDeliveryOrder1,
                    update: DeliveryOrder.updateDeliveryOrder1,
                    destroy: DeliveryOrder.deleteDeliveryOrder1
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            }

        });

        me.DOStore = Ext.create('Ext.data.Store', {
            storeId : 'DOStore1',
            model : 'DOModel',
            remoteSort : false,
            pageSize : 10,
            autoLoad: false
        });
        me.DOLocStore = Ext.create('Ext.data.Store', {
            storeId : 'DOLocStore1',
            model : 'DOLocModel',
            remoteSort : false,
            pageSize : 10,
            autoLoad: false
        });
        me.DORouteStore = Ext.create('Ext.data.Store', {
            storeId : 'DORouteModel',
            model : 'DORouteModel',
            remoteSort : false,
            pageSize : 10,
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
        var searching = {
            ftype: 'searching',
            mode: 'local',
            width: 200
        };


        me.DOGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('DOStore1'),
            title:'Delivery Order',
            border:false,
            frame:false,
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            listeners: {
                scope: me,
                select: me.onGridClick
            },
            features:[searching],
            plugins:[
                Ext.create('App.ux.grid.RowFormEditing', {
                    autoCancel:false,
                    errorSummary:false,
                    clicksToEdit:1,
                    formItems:[
                        {
                            xtype:'container',
                            layout:'hbox',
                            flex:1,
                            items:[
                                {
                                    xtype:'container',
                                    flex:1,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode DO',
                                            name:'do_num',
                                            readOnly:true,
                                            width:300
                                        },
                                        {
                                            fieldLabel : 'Tanggal',
                                            xtype : 'datefield',
                                            width : 200,
                                            name : 'deliverydate',
                                            format : 'd-m-Y',
                                            readOnly: true,
                                            itemId:'tgl_input_do'
                                        },
                                        {
                                            xtype: "radiogroup",
                                            width : 300,
                                            fieldLabel: "Jenis ",
                                            defaults: {xtype: "radio", name:'do_type'
                                            },
                                            items: [
                                                {
                                                    boxLabel:'Kirim',
                                                    checked: true,
                                                    inputValue:'N',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#do_retur')[0].setDisabled(true);
                                                            Ext.ComponentQuery.query('#so_num_do')[0].setReadOnly(false);
                                                        }
                                                    }

                                                },
                                                {
                                                    boxLabel:'Retur',
                                                    inputValue:'R',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#do_retur')[0].setDisabled(false);
                                                            Ext.ComponentQuery.query('#so_num_do')[0].setReadOnly(true);
                                                        }
                                                    }

                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'xtDOPopup',
                                            fieldLabel : 'DO Retur',
                                            name:'for_do_num',
                                            itemId:'do_retur',
                                            disabled: true,
                                            allowBlank:false,
                                            width:300
                                        },
                                        {
                                            xtype: 'xtSODeliveryPopup',
                                            fieldLabel : 'Kode SO',
                                            name:'so_num',
                                            itemId:'so_num_do',
                                            width:300
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Kode Produk',
                                            name:'prod_id',
                                            itemId:'prod_id_do',
                                            readOnly: true,
                                            width:385
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Kode Customer',
                                            name:'cust_id',
                                            itemId:'cust_id_do',
                                            readOnly: true,
                                            width:200
                                        }
                                    ]
                                }, {
                                    xtype:'container',
                                    flex:1,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype : 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel : 'Qty Kirim',
                                            name:'qty_do',
                                            itemId:'qty_do',
                                            readOnly:true,
                                            width:250
                                        },
                                        {
                                            xtype: 'xtRoutePopup',
                                            name: 'route',
                                            fieldLabel : 'Route',
                                            width:200
                                        },
                                        {
                                            xtype: 'xtSPKirimPopup',
                                            fieldLabel : 'Surat P. Kirim',
                                            name: 'sp_kirim',
                                            allowBlank:false,
                                            width:200
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Keterangan',
                                            name:'keterangan',
                                            width:385
                                        },
                                        {
                                            xtype : 'mitos.checkbox',
                                            fieldLabel : 'Posting',
                                            name:'status',
                                            width:150,
                                            handler: function(field, value) {
                                                if (value== true) {
                                                    Ext.ComponentQuery.query('#tgl_post_do')[0].setDisabled(false);
                                                    Ext.ComponentQuery.query('#tgl_post_do')[0].setValue(new Date());
                                                }else{
                                                    Ext.ComponentQuery.query('#tgl_post_do')[0].setDisabled(true);
                                                }

                                            }
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tgl Posting',
                                            format : 'd-m-Y',
                                            maxValue : new Date(),
                                            name:'posted_date',
                                            disabled:true,
                                            width:200,
                                            itemId:'tgl_post_do'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                })
            ],
            columns:[
                {text: 'Kode DO',sortable: true,dataIndex: 'do_num'},
                {text: 'Tgl Input', width : 80, sortable: true, dataIndex: 'deliverydate', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'Kode SO', sortable: false, dataIndex: 'so_num'},
                {text: 'Nama Produk', sortable: false, dataIndex: 'prod_nama'},
                {text: 'Route', sortable: false, dataIndex: 'route'},
                {text: 'Customer', flex:1, sortable: false,dataIndex: 'cust_nama'},
                {text: 'Kode Gudang', flex:1, sortable: false,dataIndex: 'darigudang'},
                {text: 'Qty SO', sortable: false,dataIndex: 'qty'},
                {text: 'Qty DO', sortable: false,dataIndex: 'qty_do'},
                {
                    text: 'Posting',
                    sortable: true,
                    dataIndex: 'status',
                    renderer: authCk
                },
                {text: 'LastUpdate', dataIndex: 'timeedit',width: 80,renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'DOModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'DOModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });
        me.DOLocGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('DOLocStore1'),
            title:'Lokasi Kirim',
            border:false,
            frame:false,
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            plugins:[
                Ext.create('App.ux.grid.RowFormEditing2', {
                    autoCancel:false,
                    errorSummary:false,
                    clicksToEdit:1,
                    formItems:[
                        {
                            xtype:'container',
                            layout:'hbox',
                            flex:1,
                            items:[
                                {
                                    xtype:'container',
                                    flex:1,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode Sub Customer',
                                            name:'custloc_id',
                                            readOnly: true,
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Customer',
                                            name:'custloc_nama',
                                            width:385,
                                            readOnly:true
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Alamat',
                                            name:'alamat',
                                            readOnly: true,
                                            width:250
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel : 'Qty',
                                            name:'qty',
                                            readOnly:true,
                                            width:250
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel : 'Qty DO',
                                            name:'qty_do',
                                            allowBlank:false,
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Keterangan',
                                            name:'keterangan',
                                            width:385
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                })
            ],
            columns:[
                {
                    header:'Company',
                    hidden:true,
                    dataIndex:'co_id'
                },
                {
                    header : 'Kode Sub Customer',
                    dataIndex : 'custloc_id'
                },
                {
                    header : 'Customer',
                    dataIndex : 'custloc_nama',
                    flex:1
                },
                {
                    header : 'Alamat',
                    dataIndex : 'alamat',
                    flex:1,
                    summaryRenderer: function(){
                    return '<b>Total</b>';}
                },
                {
                    header : 'Est Qty SO',
                    dataIndex : 'qty',
                    width : 200,
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),  summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')
                },
                {
                    header : 'Qty DO',
                    dataIndex : 'qty_do',
                    width : 200,
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),  summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')
                },
                {
                    header : 'Keterangan',
                    dataIndex : 'keterangan',
                    flex:1
                }
            ], tbar:[
                {
                    text:'Refresh',
                    iconCls:'icoGreen',
                    scope:me,
                    handler: function(){
                        var qty_do =0;
                        me.DOLocStore.each(function(record){
                            if(record.get('do_num') == me.do_num ) {
                                qty_do += record.get('qty_do');
                            }
                        });
                        Ext.ComponentQuery.query('#qty_do')[0].setValue(qty_do);
                    }
                }

            ],features: [{
                ftype: 'summary'
            }]
        });
        me.DORouteGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('DORouteModel'),
            title:'Route Kirim',
            border:false,
            frame:false,
            plugins:[
                Ext.create('App.ux.grid.RowFormEditing2', {
                    autoCancel:false,
                    errorSummary:false,
                    clicksToEdit:1,
                    formItems:[
                        {
                            xtype:'container',
                            layout:'hbox',
                            flex:1,
                            items:[
                                {
                                    xtype:'container',
                                    flex:1,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode DO',
                                            name:'do_route',
                                            hidden:true,
                                            width:300
                                        },
                                        {
                                            xtype: "radiogroup",
                                            width:300,
                                            fieldLabel: "Jenis Angkutan",
                                            defaults: {xtype: "radio",name: "ordersource"},
                                            items: [
                                                {
                                                    boxLabel: "Darat",
                                                    inputValue: "Land",
                                                    checked: true
                                                },
                                                {
                                                    boxLabel: "Laut",
                                                    inputValue: "Sea"
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel : 'Surat Jalan',
                                            name:'suratjalan',
                                            width:300
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Plat Nomor',
                                            name:'police_no',
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Nama Angkutan',
                                            name:'vessel',
                                            width:385
                                        },
                                        {
                                            xtype: "radiogroup",
                                            fieldLabel: "Finish",
                                            width:250,
                                            defaults: {xtype: "radio",name: "status"},
                                            items: [
                                                {
                                                    boxLabel: "Y",
                                                    inputValue: "Y"
                                                },
                                                {
                                                    boxLabel: "N",
                                                    inputValue: "N",
                                                    checked: true
                                                }
                                            ]
                                        }

                                    ]
                                }, {
                                    xtype:'container',
                                    flex:1,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype: 'textfield',
                                            fieldLabel : 'Nama Container',
                                            name: 'container_name',
                                            width:385
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'container_no',
                                            fieldLabel : 'No Container',
                                            width:300
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'seal_no',
                                            fieldLabel : 'No Segel',
                                            width:300
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'origin',
                                            fieldLabel : 'Dari Lokasi',
                                            width:385
                                        },
                                        {
                                            xtype: 'textfield',
                                            name: 'destination',
                                            fieldLabel : 'Ke Lokasi',
                                            width:385
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                })
            ],
            columns:[
                {text: 'No.', sortable: false, dataIndex: 'sequence_no'},
                {text: 'Plat No.', sortable: false,dataIndex: 'police_no'},
                {text: 'Surat Jalan', sortable: false,dataIndex: 'suratjalan'},
                {text: 'Angkutan', sortable: false,dataIndex: 'vessel'},
                {text: 'Nama Container',  sortable: false,dataIndex: 'container_name', flex:1},
                {text: 'No. Container', sortable: false,dataIndex: 'container_no'},
                {text: 'No. Seal', sortable: false,dataIndex: 'seal_no'},
                {text: 'Status Tiba', sortable: false,dataIndex: 'status'},
                {text: 'Dari Lokasi', sortable: false,dataIndex: 'origin', flex:1},
                {text: 'Sampai Lokasi', sortable: false,dataIndex: 'destination', flex:1},
                {text: 'LastUpdate', width : 80, sortable: false, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'DORouteModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete002',
                    action:'DORouteModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });

        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.DOGrid, me.DOLocGrid, me.DORouteGrid]
        });

        me.pageBody = [me.FormulirPanel];
        me.callParent(arguments);

    }, // end of initComponent
    onGridClick:function(grid,selected){
        var me = this;
        me.do_num = selected.data.do_num;
        me.cust_id = selected.data.cust_id;
        me.DOLocStore.load({params:{do_num:me.do_num, cust_id:me.cust_id}});
        me.DORouteStore.load({params:{do_num:me.do_num}});

    },
    onNewRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
//        plugin.cancelEdit();
        newModel = Ext.ModelManager.create({ co_id : globals.site }, model);
        store.insert(0, newModel);
        plugin.startEdit(0, 0);
        if(Ext.ComponentQuery.query('#tgl_input_do')[0]){
            Ext.ComponentQuery.query('#tgl_input_do')[0].setValue(new Date());
        }
    },

    onDeleteRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin,
            sm = grid.getSelectionModel(),
            selection = grid.getView().getSelectionModel().getSelection()[0];

        plugin.cancelEdit();
        if (selection) {
            Ext.Msg.show({
                title: 'Please Confirm' + '...',
                msg: 'Are you sure want to delete' + ' ?',
                icon: Ext.MessageBox.QUESTION,
                buttons: Ext.Msg.YESNO,
                fn: function(btn){
                    if(btn == 'yes'){
                        store.remove(selection);
                        store.sync();
                        if (store.getCount() > 0) {
                            sm.select(0);
                        }
                    }
                }
            });

        }

    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive : function(callback)
    {
        this.DOStore.load();
        this.DOLocStore.load();
        this.DORouteStore.load();
        callback(true);
    }
});
//ens LogPage class