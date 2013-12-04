Ext.define('App.view.transaksi.Produksi.Produksi', {
    extend:'App.ux.RenderPanel',
    id:'panelProduksi',
    pageTitle:'Permintaan Produksi',
    pageLayout: 'border',
    initComponent : function()
    {
        var me = this;
        me.dok_no=null;

        Ext.define('PProduksiModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'no_pp',type: 'string'},
                {name: 'description',type: 'string'},
                {name: 'pabrik_sequence',type: 'string'},
                {name: 'gudang_id',type: 'string'},
                {name: 'factory',type: 'string'},
                {name: 'pp_date',type: 'date'},
                {name: 'status',type: 'string'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'timeedit',type: 'date'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Produksi.getProduksi,
                    create: Produksi.addProduksi,
                    update: Produksi.updateProduksi,
                    destroy: Produksi.deleteProduksi
                }
            }

        });
        Ext.define('PPDetailModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'no_pp',type: 'string'}
                ,{name: 'no_ppd',type: 'string'}
                ,{name: 'so_num',type: 'string'}
                ,{name: 'cust_nama',type: 'string'}
                ,{name: 'formula_id',type: 'string'}
                ,{name: 'prod_nama',type: 'string'}
                ,{name: 'est_finishdate',type: 'date'}
                ,{name: 'timeedit',type: 'date'}
                ,{name: 'status',type: 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Produksi.getProduksi1,
                    create: Produksi.addProduksi1,
                    update: Produksi.updateProduksi1,
                    destroy: Produksi.deleteProduksi1
                }
            }

        });
        
        me.PProduksiStore = Ext.create('Ext.data.Store', {
            storeId : 'PPStore',
            model : 'PProduksiModel',
            remoteSort : false
        });
        me.PPDetailStore = Ext.create('Ext.data.Store', {
            storeId : 'PPDetailStore',
            model : 'PPDetailModel',
            remoteSort : false
        });
        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit']
        }
        me.PProduksiGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('PPStore'),
            height: 330,
            region: 'north',
            features:[searching],
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
                                            fieldLabel:'Deskripsi',
                                            name:'description',
                                            allowBlank:false,
                                            width:385
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tanggal',
                                            format : 'd-m-Y',
                                            value : new Date(),
                                            maxValue : new Date(),
                                            name:'pp_date',
                                            itemId: 'tgl_produksi',
                                            width:200
                                        },
                                        {
                                            width: 150,
                                            xtype: 'mitos.checkbox',
                                            fieldLabel: 'Release',
                                            name: 'status'
                                        }
                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:350,
                                    layout:'anchor',
                                    items:[
                                        {
                                            width: 200,
                                            xtype: 'xtGudangBMPopup',
                                            fieldLabel: 'Gudang',
                                            name: 'gudang_id'
                                        },
                                        {
                                            xtype : 'xtFactoryPopup',
                                            fieldLabel : 'Kode Pabrik',
                                            name:'pabrik_sequence',
                                            itemId:'kode_pabrik',
                                            hidden: true,
                                            width:200
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Lokasi Pabrik',
                                            name:'factory',
                                            itemId:'factory',
                                            readOnly:true,
                                            width:300
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                })
            ],
            columns:[
                {header: 'Company',sortable: false, dataIndex: 'co_id', hidden:true},
                {header: 'No. Produksi',sortable: false, dataIndex: 'no_pp'},
                {header: 'Deskripsi', flex:1, sortable: false,dataIndex: 'description'},
                {header: 'sequence_no', width:200, sortable: false,dataIndex: 'pabrik_sequence', hidden: true},
                {header: 'Lokasi Pabrik',  sortable: false,dataIndex: 'factory'},
                {header: 'Kode Gudang', sortable: false,dataIndex: 'gudang_id'},
                {header: 'status',width:70, sortable: true, dataIndex: 'status',hidden:true},
                {header: 'Tanggal', width : 80, sortable: true, dataIndex: 'pp_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {header: 'LastUpdate', dataIndex: 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'PProduksiModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'delete',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });
        me.PPDetailGrid = Ext.create('Ext.grid.Panel', {
            title:'Rincian Order Produksi',
            store: Ext.data.StoreManager.lookup('PPDetailStore'),
            region: 'center',
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1'? 'child-row' : record.get('status') == '2'? 'adult-row' : '';
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
                            width:900,
                            items:[
                                {
                                    xtype:'container',
                                    width:450,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode Produksi',
                                            name:'no_pp',
                                            hidden:true,
                                            itemId:'no_pp',
                                            width:300
                                        },
                                        {
                                            xtype:'xtSOPPopup',
                                            fieldLabel:'Kode SO',
                                            name:'so_num',
                                            allowBlank:false,
                                            width:300
                                        },
                                        {
                                            xtype:'textfield',
                                            itemId:'cust_id_pp',
                                            hidden: true,
                                            width:300
                                        },
                                        {
                                            xtype : 'xtFormulaPopup',
                                            fieldLabel : 'Kode Formula',
                                            name:'formula_id',
                                            width:200
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tanggal Selesai',
                                            format : 'd-m-Y',
                                            value : new Date(),
                                            maxValue : new Date(),
                                            name:'est_finishdate',
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
                {text: 'Company',sortable: false, dataIndex: 'co_id', hidden:true},
                {text: 'NO PP', sortable: false, dataIndex: 'no_pp',  hidden : true},
                {text: 'Kode SO', sortable: false,dataIndex: 'so_num'},
                {text: 'Formula', flex:1,sortable: false,dataIndex: 'formula_nama'},
                {text: 'Produk', flex:1, sortable: false,dataIndex: 'prod_nama'},
                {text: 'Status',sortable: false, dataIndex: 'status', hidden:true},
                {text: 'LastUpdate', width : 80, sortable: false, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'PPDetailModel',
                    scope:me,
                    handler:me.onNewRec
                },
                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'delete002',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });

        me.pageBody = [ me.PProduksiGrid,me.PPDetailGrid];
        me.callParent(arguments);

    }, // end of initComponent
    onGridClick: function(grid, selected){
        var me = this;
        me.dok_no = selected.data.no_pp;
        me.PPDetailStore.load({params:{no_pp: me.dok_no}});
        var  deletebtn = me.query('button[action="delete"]')[0],
             delete002btn = me.query('button[action="delete002"]')[0],
             tambahbtn =  me.query('button[action="PPDetailModel"]')[0];
        if(selected.data.status==1 || selected.data.status==2){
            deletebtn.setDisabled(true);
            delete002btn.setDisabled(true);
            tambahbtn.setDisabled(true);
        }else{
            deletebtn.setDisabled(false);
            delete002btn.setDisabled(false);
            tambahbtn.setDisabled(false);
        }
    },

    onNewRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
        newModel = Ext.ModelManager.create({
        }, model);
        store.insert(0, newModel);
        plugin.startEdit(0, 0);
        if( Ext.ComponentQuery.query('#no_pp')[0]){
            Ext.ComponentQuery.query('#no_pp')[0].setValue(me.dok_no);
        }
        if( Ext.ComponentQuery.query('#tgl_produksi')[0]){
            Ext.ComponentQuery.query('#tgl_produksi')[0].setValue(new Date());
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
        this.PProduksiStore.load();
        this.PPDetailStore.load();
        callback(true);
    }
});
//ens LogPage class