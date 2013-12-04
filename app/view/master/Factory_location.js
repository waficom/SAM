Ext.define('App.view.master.Factory_location', {
    extend: 'App.ux.RenderPanel',
    id: 'panelFactlocation',
    pageTitle: 'Pabrik',
    uses: ['App.ux.GridPanel'],
    initComponent : function()
    {
        var me = this;
        me.factory_id = null;

        Ext.define('factoryModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'pabrik_sequence',type: 'string'},
                {name: 'description',type: 'string'},
                {name: 'factory_id',type: 'string'},
                {name: 'location',type: 'string'},
                {name: 'remarks',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'useredit',type: 'string'},
                {name: 'timeinput',type: 'date'},
                {name: 'timeedit',type: 'date'},
                {name: 'aktif',type: 'bool'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Factory_location.getFactorylocation,
                    create: Factory_location.addFactorylocation,
                    update: Factory_location.updateFactorylocation,
                    destroy: Factory_location.deleteFactorylocation
                }
            }

        });

        Ext.define('RincianfactoryModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'pabrik_sequence',type: 'string'},
                {name: 'gudang_id',type: 'string'},
                {name: 'gudang_nama',type: 'string'},
                {name: 'gdg_type',type: 'string'},
                {name: 'remarks',type: 'string'},
                {name: 'coa',type: 'string'},
                {name: 'coa_grn',type: 'string'},
                {name: 'coa_stock_pll',type: 'string'},
                {name: 'coa_stock_bya',type: 'string'},
                {name: 'coa_hpp',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'useredit',type: 'string'},
                {name: 'timeinput',type: 'date'},
                {name: 'timeedit',type: 'date'},
                {name: 'aktif',type: 'bool'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Factory_location.getGudanglocation,
                    create: Factory_location.addGudanglocation,
                    update: Factory_location.updateGudanglocation,
                    destroy: Factory_location.deleteGudanglocation
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

        me.factoryStore = Ext.create('Ext.data.Store', {
            storeId : 'factoryStore',
            model : 'factoryModel'
        });
        me.RincianfactoryStore = Ext.create('Ext.data.Store', {
            storeId : 'RincianfactoryStore',
            model : 'RincianfactoryModel'
        });
        me.FactoryGrid = Ext.create('Ext.grid.Panel', {
            title:'Pabrik',
            store: Ext.data.StoreManager.lookup('factoryStore'),
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
                                            name:'factory_id',
                                            width:300
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Pabrik',
                                            name:'description',
                                            width:385
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Lokasi',
                                            name:'location',
                                            width:385
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Keterangan',
                                            name:'remarks',
                                            width:385
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
                    header:'Company',
                    dataIndex:'co_id',
                    hidden:true
                },
                {
                    header:'Kode',
                    dataIndex:'factory_id'
                },
                {
                    header:'Pabrik',
                    flex:1,
                    dataIndex:'description'
                },
                {
                    header:'Lokasi',
                    flex:1,
                    dataIndex:'location'
                },
                {
                    header:'Keterangan',
                    flex:1,
                    dataIndex:'remarks'
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
                    action:'factoryModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'factoryModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });
        me.RincianFactoryGrid = Ext.create('Ext.grid.Panel', {
            title:'Gudang',
            store: Ext.data.StoreManager.lookup('RincianfactoryStore'),
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
                                            xtype: 'textfield',
                                            hidden: true,
                                            name: 'co_id'
                                        },
                                        {
                                            xtype: 'textfield',
                                            hidden: true,
                                            name: 'pabrik_sequence',
                                            itemId:'factory_id'
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel:'Kode',
                                            name: 'gudang_id',
                                            width:250
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel:'Gudang',
                                            name: 'gudang_nama',
                                            width:385
                                        },
                                        {
                                            xtype: "radiogroup",
                                            width:385,
                                            fieldLabel: "Jenis",
                                            defaults: {xtype: "radio",name: "gdg_type"},
                                            items: [
                                                {
                                                    boxLabel: "Bahan Mentah",
                                                    inputValue: "BM",
                                                    checked: true
                                                },
                                                {
                                                    boxLabel: "BDP",
                                                    inputValue: "BDP"
                                                },
                                                {
                                                    boxLabel: "Barang Jadi",
                                                    inputValue: "BJ"
                                                }
                                            ]
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Keterangan',
                                            width:385,
                                            name:'remarks'
                                        }

                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:450,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype: 'xtCoaPopup',
                                            fieldLabel:'Akun Persediaan',
                                            name: 'coa',
                                            width:200
                                        },
                                        {
                                            xtype: 'xtCoaPopup',
                                            fieldLabel:'Akun GRN/HPP',
                                            name: 'coa_grn',
                                            width:200
                                        },
                                        {
                                            xtype: 'xtCoaPopup',
                                            fieldLabel:'Akun Stok Lebih',
                                            name: 'coa_stock_pll',
                                            width:200
                                        },
                                        {
                                            xtype: 'xtCoaPopup',
                                            fieldLabel:'Akun Stok Kurang',
                                            name: 'coa_hpp',
                                            width:200
                                        },
                                        {
                                            xtype: 'xtCoaPopup',
                                            fieldLabel:'Akun Pinj Stok',
                                            name: 'coa_stock_bya',
                                            width:200
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
                    dataIndex:'co_id',
                    hidden:true
                },
                {
                    header:'Kode ',
                    dataIndex:'gudang_id'
                },
                {
                    header:'Gudang',
                    dataIndex:'gudang_nama',
                    flex:1
                },
                {
                    header:'Keterangan',
                    dataIndex:'remarks',
                    flex:1
                },
                {
                    header: 'LastUpdate',
                    width : 80,
                    dataIndex: 'timeedit',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'RincianfactoryModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'RincianfactoryModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.FactoryGrid, me.RincianFactoryGrid]
        });

        me.pageBody = [me.FormulirPanel];
        me.callParent(arguments);

    }, // end of initComponent
    onGridClick: function(grid, selected){
        var me = this;
        me.factory_id = selected.data.pabrik_sequence;
        me.RincianfactoryStore.load({params:{pabrik_sequence: me.factory_id}});

    },
    onNewRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
//        plugin.cancelEdit();
        newModel = Ext.ModelManager.create({ co_id : globals.site }, model);
        store.insert(0, newModel);
        plugin.startEdit(0, 0);
        if(Ext.ComponentQuery.query('#factory_id')[0]){
            Ext.ComponentQuery.query('#factory_id')[0].setValue(me.factory_id);
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
        this.factoryStore.load();
        this.RincianfactoryStore.load();
        callback(true);
    }
});
//ens LogPage class