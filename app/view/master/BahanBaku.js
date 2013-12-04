Ext.define('App.view.master.BahanBaku', {
    extend:'App.ux.RenderPanel',
    id:'panelBahanBaku',
    pageTitle:'Bahan / Barang',

    initComponent : function()
    {
        var me = this;

        Ext.define('BahanBakuModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'co_id', type : 'string'},
                { name : 'bb_id', type : 'string'},
                { name : 'bb_nama', type : 'string'},
                { name : 'sat_id', type : 'string'},
                { name : 'keterangan', type : 'string'},
                { name : 'kategoristock', type : 'string'},
                { name : 'account', type : 'string'},
                { name : 'aktif', type : 'bool'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: BahanBaku.getbb,
                    create: BahanBaku.addbb,
                    update: BahanBaku.updatebb,
                    destroy : BahanBaku.deletebb
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            }

        });

        me.BahanBakuStore = Ext.create('Ext.data.Store', {
            storeId : 'BahanBakuStore1',
            model : 'BahanBakuModel',
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


        me.BahanBakuGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('BahanBakuStore1'),
            border:false,
            frame:false,
            viewConfig:{
                stripeRows:true
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
                                            name:'bb_id',
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Bahan / Barang',
                                            name:'bb_nama',
                                            width:385
                                        },
                                        {
                                            xtype : 'xtSatuanPopup',
                                            fieldLabel : 'Satuan',
                                            name:'sat_id',
                                            width:200
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Keterangan',
                                            name:'keterangan',
                                            width:385
                                        }

                                    ]
                                },{
                                    xtype:'container',
                                    width:300,
                                    layout:'anchor',
                                    items:[
                                        {
                                            width: 385,
                                            xtype: "radiogroup",
                                            fieldLabel: "Stok ",
                                            defaults: {xtype: "radio", name:'kategoristock'
                                            },
                                            items: [
                                                {
                                                    boxLabel: "Y",
                                                    inputValue:'Y',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#akun_bb')[0].setDisabled(true);
                                                        }
                                                    }

                                                },
                                                {
                                                    boxLabel: "N",
                                                    inputValue:'N',
                                                    checked: true,
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#akun_bb')[0].setDisabled(false);
                                                        }
                                                    }

                                                }
                                            ]
                                        },
                                        {
                                            xtype : 'xtCoaPopup',
                                            fieldLabel : 'Akun',
                                            name:'account',
                                            itemId:'akun_bb',
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
                    header:'Company',
                    dataIndex:'co_id',
                    hidden:true
                },
                {
                    header:'Kode',
                    dataIndex:'bb_id'
                },
                {
                    header:'Bahan / Barang',
                    dataIndex:'bb_nama',
                    flex:1
                },
                {
                    header:'Satuan',
                    dataIndex:'sat_id'
                },
                {
                    header:'Akun',
                    dataIndex:'account'
                },
                {
                    header : 'Keterangan',
                    dataIndex : 'keterangan',
                    flex:1
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
                    action:'BahanBakuModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'BahanBakuModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });

        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.BahanBakuGrid]
        });

        me.pageBody = [/*me.FormulirPanel*/me.BahanBakuGrid];
        me.callParent(arguments);

    }, // end of initComponent

    onNewRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
//        plugin.cancelEdit();
        newModel = Ext.ModelManager.create({ co_id : globals.site }, model);
        store.insert(0, newModel);
        plugin.startEdit(0, 0);
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
        this.BahanBakuStore.load();
        callback(true);
    }
});
//ens LogPage class