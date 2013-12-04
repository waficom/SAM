Ext.define('App.view.master.Wilayah', {
    extend: 'App.ux.RenderPanel',
    id: 'panelWilayah',
    pageTitle: 'Wilayah',
    uses: ['App.ux.GridPanel'],
    initComponent : function()
    {
        var me = this;
        me.wil_id = null;

        Ext.define('WilModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'wilayah_id',type: 'string'},
                {name: 'wilayah_nama',type: 'string'},
                {name: 'keterangan',type: 'string'},
                {name: 'aktif',type: 'bool'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Wilayah.getwilayah,
                    create: Wilayah.addwilayah,
                    update: Wilayah.updatewilayah,
                    destroy: Wilayah.deletewilayah
                }
            }

        });

        Ext.define('SalesWilModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'}
                ,{name: 'wilayah_id',type: 'string'}
                ,{name: 'sales_id',type: 'string'}
                ,{name: 'sales_nama',type: 'string'}
                ,{name: 'keterangan',type: 'string'}
                ,{name: 'aktif',type: 'bool'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Wilayah.getsaleswil,
                    create: Wilayah.addsaleswil,
                    update: Wilayah.updatesaleswil,
                    destroy: Wilayah.deletesaleswil
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

        me.WilStore = Ext.create('Ext.data.Store', {
            storeId : 'WilStore',
            model : 'WilModel'
        });
        me.SalesWilStore = Ext.create('Ext.data.Store', {
            storeId : 'SalesWilStore',
            model : 'SalesWilModel'
        });
        me.WilGrid = Ext.create('Ext.grid.Panel', {
            title:'Wilayah',
            store: Ext.data.StoreManager.lookup('WilStore'),
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
                                            name:'wilayah_id',
                                            width:300
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Wilayah',
                                            name:'wilayah_nama',
                                            width:385
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Keterangan',
                                            name:'keterangan',
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
                    dataIndex:'wilayah_id'
                },
                {
                    header:'Wilayah',
                    flex:1,
                    dataIndex:'wilayah_nama'
                },
                {
                    header:'Keterangan',
                    dataIndex:'keterangan',
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
                    action:'WilModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'WilModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });
        me.SalesWilGrid = Ext.create('Ext.grid.Panel', {
            title:'Rincian Sales',
            store: Ext.data.StoreManager.lookup('SalesWilStore'),
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
                                            name: 'wilayah_id',
                                            itemId:'wil_id'
                                        },
                                        {
                                            xtype:'xtSalesPopup',
                                            width:250,
                                            name:'sales_id',
                                            fieldLabel:'Kode Sales'
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Keterangan',
                                            width:385,
                                            name:'keterangan'
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
                    header:'Kd wil',
                    dataIndex:'wilayah_id',
                    hidden:true
                },
                {
                    header:'Kode Sales',
                    dataIndex:'sales_id'
                },
                {
                    header:'Sales',
                    dataIndex:'sales_nama',
                    flex:1
                },
                {
                    header:'Keterangan',
                    dataIndex:'keterangan',
                    flex:1
                }
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'SalesWilModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'SalesWilModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.WilGrid, me.SalesWilGrid]
        });

        me.pageBody = [me.FormulirPanel];
        me.callParent(arguments);

    }, // end of initComponent
    onGridClick: function(grid, selected){
        var me = this;
        me.wil_id = selected.data.wilayah_id;
        me.SalesWilStore.load({params:{wilayah_id: me.wil_id}});

    },
    onNewRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
//        plugin.cancelEdit();
        newModel = Ext.ModelManager.create({ co_id : globals.site }, model);
        store.insert(0, newModel);
        plugin.startEdit(0, 0);
        if(Ext.ComponentQuery.query('#wil_id')[0]){
            Ext.ComponentQuery.query('#wil_id')[0].setValue(me.wil_id);
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
        this.WilStore.load();
        this.SalesWilStore.load();
        callback(true);
    }
});
//ens LogPage class