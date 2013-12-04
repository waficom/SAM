Ext.define('App.view.master.Items', {
    extend:'App.ux.RenderPanel',
    id:'panelItems',
    pageTitle:'Produk',
    initComponent : function()
    {
        var me = this;
        me.prod_id = null;

        Ext.define('ItemsModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name: 'co_id', type: 'string'},
                { name: 'prod_id', type: 'string'},
                { name: 'prod_nama', type: 'string'},
                { name: 'jenis_id', type: 'string'},
                { name: 'jenis_nama', type: 'string'},
                { name: 'kemasan_id', type: 'string'},
                { name: 'kemasan_nama', type: 'string'},
                { name: 'kemasan_qty', type: 'float'},
                { name: 'satuan_id', type: 'string'},
                { name: 'satuan_nama', type: 'string'},
                { name: 'spesifikasi_id', type: 'string'},
                { name: 'spesifikasi_nama', type: 'string'},
                { name: 'bentuk_id', type: 'string'},
                { name: 'bentuk_nama', type: 'string'},
                { name: 'aktif', type: 'bool'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Items.getitems,
                    create: Items.additems,
                    update: Items.updateitems,
                    destroy: Items.deleteitems
                }
            }

        });

        Ext.define('PriceListModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name: 'co_id', type: 'string'},
                { name: 'sequence_no', type: 'string'},
                { name: 'prod_id', type: 'string'},
                { name: 'prod_nama', type: 'string'},
                { name: 'harga', type: 'float'},
                { name: 'ppn', type: 'bool'},
                { name: 'promosi', type: 'bool'},
                { name: 'puslit', type: 'bool'},
                { name: 'insentif', type: 'bool'},
                { name: 'tgl_efektif', type: 'date'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Items.getprice,
                    create: Items.addprice,
                    update: Items.updateprice,
                    destroy: Items.deleteprice
                }
            }

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

        me.ItemsStore = Ext.create('Ext.data.Store', {
            storeId : 'Itemstore',
            model : 'ItemsModel'
        });
        me.PriceListStore = Ext.create('Ext.data.Store', {
            storeId : 'PriceListstore',
            model : 'PriceListModel'
        });
        me.ItemsGrid = Ext.create('Ext.grid.Panel', {
            title:'Produk',
            store: Ext.data.StoreManager.lookup('Itemstore'),
            border:false,
            frame:false,
            viewConfig:{
                stripeRows:true
            },
            features:[searching],
            listeners: {
                scope: me,
                select: me.onGridClick
            },
            plugins:[
                Ext.create('App.ux.grid.RowFormEditing', {
                    autoCancel:false,
                    errorSummary:false,
                    clicksToEdit:1,
                    formItems:[
                        {
                            xtype:'container',
                            layout:'hbox',
                            width:900,
                            items:[
                                {
                                    xtype:'container',
                                    width:450,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode',
                                            name:'prod_id',
                                            width:300
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Produk',
                                            name:'prod_nama',
                                            width:385
                                        },
                                        {
                                            xtype:'xtJenisPopup',
                                            fieldLabel:'Kode Jenis',
                                            name:'jenis_id',
                                            width:250
                                        },
                                        {
                                            xtype:'xtKemasanPopup',
                                            fieldLabel:'Kode Kemasan',
                                            name:'kemasan_id',
                                            width:250
                                        }

                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:300,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'xtSpesifikasiPopup',
                                            fieldLabel:'Kode Spesifikasi',
                                            name:'spesifikasi_id',
                                            width:250
                                        },
                                        {
                                            xtype:'xtBentukPopup',
                                            fieldLabel:'Kode Bentuk',
                                            name:'bentuk_id',
                                            width:250
                                        },
                                        {
                                            xtype:'xtSatuanPopup',
                                            fieldLabel:'Satuan',
                                            name:'satuan_id',
                                            width:250
                                        },
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
                    ]
                })
            ],
            columns:[
                {
                    header:'Kode',
                    dataIndex:'prod_id'
                },
                {
                    header:'Produk',
                    flex:1,
                    dataIndex:'prod_nama'
                },
                {
                    header:'Jenis',
                    dataIndex:'jenis_nama'
                },
                {
                    header:'Kemasan',
                    dataIndex:'kemasan_nama'
                },
                {
                    header:'Jenis',
                    dataIndex:'jenis_nama'
                },
                {
                    header:'Spesifikasi',
                    dataIndex:'spesifikasi_nama'
                },
                {
                    header:'Bentuk',
                    dataIndex:'bentuk_nama'
                },
                {
                    text: 'Aktif',
                    sortable: true,
                    dataIndex: 'aktif',
                    renderer: authCk
                }
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'ItemsModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'ItemsModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });
        me.PriceListGrid = Ext.create('Ext.grid.Panel', {
            title:'Daftar Harga',
            store: Ext.data.StoreManager.lookup('PriceListstore'),
            border:false,
            frame:false,
            viewConfig:{
                stripeRows:true
            },
            features:[searching],
            plugins:[
                Ext.create('App.ux.grid.RowFormEditing2', {
                    autoCancel:false,
                    errorSummary:false,
                    clicksToEdit:1,
                    formItems:[
                        {
                            xtype:'container',
                            layout:'hbox',
                            width:900,
                            items:[
                                {
                                    xtype:'container',
                                    width:450,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'textfield',
                                            hidden : true,
                                            name:'prod_id',
                                            itemId:'prod_id'
                                        },
                                        {
                                            xtype:'numberfield',
                                            fieldLabel:'Harga',
                                            name:'harga',
                                            width:385
                                        },{
                                            width : 150,
                                            xtype: 'mitos.checkbox',
                                            fieldLabel: 'PPN',
                                            name: 'ppn'
                                        },
                                        {
                                            width : 150,
                                            xtype: 'mitos.checkbox',
                                            fieldLabel: 'Promosi',
                                            name: 'promosi'
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tanggal',
                                            format : 'd-m-Y',
                                            value : new Date(),
                                            name:'tgl_efektif',
                                            width:250
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
                    header:'No.Urut',
                    hidden:true,
                    dataIndex:'sequence_no'
                },
                {
                    header:'Kd Produk',
                    dataIndex:'prod_id',
                    flex:1
                },
                {
                    header:'Harga',
                    dataIndex:'harga'
                },
                {
                    header:'PPN',
                    dataIndex:'ppn',
                    renderer: authCk
                },
                {
                    header : 'Promisi',
                    dataIndex : 'promosi',
                    renderer: authCk
                },
                {
                    header : 'Tanggal Efektif',
                    dataIndex : 'tgl_efektif',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                }
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'PriceListModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'PriceListModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.ItemsGrid, me.PriceListGrid]
        });

        me.pageBody = [me.FormulirPanel];
        me.callParent(arguments);

    }, // end of initComponent
    onGridClick: function(grid, selected){
        var me = this;
        me.prod_id = selected.data.prod_id;
        me.PriceListStore.load({params:{prod_id: me.prod_id}});

    },
    onNewRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
//        plugin.cancelEdit();
        newModel = Ext.ModelManager.create({ co_id : globals.site }, model);
        store.insert(0, newModel);
        plugin.startEdit(0, 0);
        Ext.ComponentQuery.query('#prod_id')[0].setValue(me.prod_id);
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
        this.ItemsStore.load();
        this.PriceListStore.load();
        callback(true);
    }
});
//ens LogPage class