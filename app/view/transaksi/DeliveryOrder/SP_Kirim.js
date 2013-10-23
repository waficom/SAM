Ext.define('App.view.transaksi.DeliveryOrder.SP_Kirim', {
    extend:'App.ux.RenderPanel',
    id:'panelSPKirim',
    pageTitle:'Surat Perintah Kirim',

    initComponent : function()
    {
        var me = this;
        me.sequence_no=null;

        Ext.define('SP_KirimModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'co_id', type : 'string'},
                { name : 'sequence_no', type : 'string'},
                { name : 'nosurat',type : 'string'},
                { name : 'tanggal',type : 'date'},
                { name : 'ekspedisi_kapal',type : 'string'},
                { name : 'ekspedisi_truk', type : 'string'},
                { name : 'pelabuhan_muat', type : 'string'},
                { name : 'perkiraan_muat', type : 'date'},
                { name : 'vessel_id', type : 'string'},
                { name : 'tujuan', type : 'string'},
                { name : 'timeedit', type : 'date'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read:SP_Kirim.getSP_Kirim,
                    create:SP_Kirim.addSP_Kirim,
                    update:SP_Kirim.updateSP_Kirim,
                    destroy:SP_Kirim.deleteSP_Kirim
                }
            }

        });

        Ext.define('SP_Kirim_DetailModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'co_id', type : 'string'},
                { name : 'sequence_no', type : 'string'},
                { name : 'no_urut',type : 'string'},
                { name : 'cust_id',type : 'string'},
                { name : 'prod_id',type : 'string'},
                { name : 'qty', type : 'string'},
                { name : 'keterangan', type : 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read:SP_Kirim.getSP_Kirim_Detail,
                    create:SP_Kirim.addSP_Kirim_Detail,
                    update:SP_Kirim.updateSP_Kirim_Detail,
                    destroy:SP_Kirim.deleteSP_Kirim_Detail
                }
            }

        });


        me.SP_KirimStore = Ext.create('Ext.data.Store', {
            storeId : 'SPKirim',
            model : 'SP_KirimModel',
            remoteSort : false
        });
        me.SP_Kirim_DetailStore = Ext.create('Ext.data.Store', {
            storeId : 'SPKirimDetail',
            model : 'SP_Kirim_DetailModel',
            remoteSort : false
        });
        
        me.SP_KirimGrid = Ext.create('Ext.grid.Panel', {
            title:'SP Kirim',
            store: Ext.data.StoreManager.lookup('SPKirim'),
            border:false,
            frame:false,
            viewConfig:{
                stripeRows:true
            },
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
                                            fieldLabel:'No. Surat',
                                            name:'nosurat',
                                            width:385
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tanggal',
                                            format : 'd-m-Y',
                                            value : new Date(),
                                            maxValue : new Date(),
                                            name:'tanggal',
                                            width:250
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Ekspedisi Kapal',
                                            name:'ekspedisi_kapal',
                                            width:385
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Ekspedisi Truk',
                                            name:'ekspedisi_truk',
                                            width:385
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Pelabuhan Muat',
                                            name:'pelabuhan_muat',
                                            width:385
                                        }

                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:300,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Perkiraan Muat',
                                            format : 'd-m-Y',
                                            value : new Date(),
                                            maxValue : new Date(),
                                            name:'perkiraan_muat',
                                            width:250
                                        },
                                        {
                                            xtype : 'xtKapalPopup',
                                            fieldLabel : 'Kapal',
                                            name:'vessel_id',
                                            width:385
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Tujuan',
                                            name:'tujuan',
                                            width:385
                                        },{
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
                    header:'Sequence_No',
                    hidden:true,
                    dataIndex:'sequence_no'
                },
                {
                    header:'No. Surat',
                    width:100,
                    dataIndex:'nosurat'
                },
                {
                    header : 'Tanggal',
                    dataIndex : 'tanggal',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                },
                {
                    header : 'Ekspedisi Kapal',
                    dataIndex : 'ekspedisi_kapal', flex:1
                },
                {
                    header : 'Ekspedisi Truk',
                    dataIndex : 'ekspedisi_truk', flex:1
                },
                {
                    header : 'Pelabuhan Muat',
                    dataIndex : 'pelabuhan_muat', flex:1
                },
                {
                    header : 'Perkiraan Muat',
                    dataIndex : 'perkiraan_muat',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                },
                {
                    header : 'Kapal',
                    dataIndex : 'vesel_id'
                },
                {
                    header : 'Tujuan',
                    dataIndex : 'tujuan'
                }
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'SP_KirimModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'SP_KirimModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });
        me.SP_Kirim_DetailGrid = Ext.create('Ext.grid.Panel', {
            title:'Detail',
            store: Ext.data.StoreManager.lookup('SPKirimDetail').load({params:{sequence_no: me.sequence_no}}),
            border:false,
            frame:false,
            viewConfig:{
                stripeRows:true
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
                                            xtype : 'numberfield',
                                            hidden:true,
                                            name:'sequence_no',
                                            itemId:'sequence_no_spk'
                                        },
                                        {
                                            xtype:'xtCustomerPopup',
                                            fieldLabel:'Cust ID',
                                            name:'cust_id',
                                            width:385
                                        },
                                        {
                                            xtype:'xtlistproduct',
                                            fieldLabel:'Produk ID',
                                            name:'prod_id',
                                            width:385
                                        },
                                        {
                                            xtype : 'numberfield',
                                            fieldLabel : 'Qty',
                                            name:'qty',
                                            width:385
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
                    header:'Sequence_No',
                    hidden:true,
                    dataIndex:'sequence_no'
                },
                {
                    header:'No Urut',
                    hidden:true,
                    dataIndex:'no_urut'
                },
                {
                    header:'co_id',
                    hidden:true,
                    dataIndex:'co_id'
                },
                {
                    header:'Customer',
                    width:100,
                    dataIndex:'cust_id'
                },
                {
                    header:'Produk',
                    width:100,
                    dataIndex:'prod_id'
                },
                {
                    header:'Qty',
                    dataIndex:'qty'
                },
                {
                    header:'Keterangan',
                    flex:1,
                    dataIndex:'keterangan'
                }
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'SP_Kirim_DetailModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'SP_Kirim_DetailModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });

        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.SP_KirimGrid, me.SP_Kirim_DetailGrid]

        });

        me.pageBody = [me.FormulirPanel];
        me.callParent(arguments);

    }, // end of initComponent

    onGridClick: function(grid, selected){
        var me = this;
        me.sequence_no = selected.data.sequence_no;
    },
    onNewRec:function(btn){
        var me = this;
        var grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
        say(grid);
        say(plugin);
        say(model);
//        plugin.cancelEdit();
        newModel = Ext.ModelManager.create({
        }, model);
        say(newModel);
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
        this.SP_KirimStore.load();
        this.SP_Kirim_DetailStore.load();
        callback(true);
    }
});
//ens LogPage class