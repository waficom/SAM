Ext.define('App.view.transaksi.Produksi.PengadaanBarang', {
    extend:'App.ux.RenderPanel',
    id:'panelPengadaanBarang',
    pageTitle:'Pengadaan Bahan',
    pageLayout: 'border',
    initComponent : function()
    {
        var me = this;
        me.kode = null;

        Ext.define('PengadaanModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                { name: 'pb_num',type: 'string'},
                {name: 'bagian',type: 'string'},
                {name: 'request_by',type: 'string'},
                {name: 'status',type: 'bool'},
                {name: 'tanggal',type: 'date'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'lokasi',type: 'string'},
                {name: 'gudang_id',type: 'string'},
                {name: 'factory',type: 'string'},
                {name: 'keterangan',type: 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: PengadaanBarang.getPB0,
                    create: PengadaanBarang.addPB0,
                    update: PengadaanBarang.updatePB0,
                    destroy : PengadaanBarang.deletePB0
                }
            }

        });
        Ext.define('PengadaanDetailModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                { name: 'pb_num',type: 'string'},
                {name: 'pb_type',type: 'string'},
                {name: 'qty',type: 'string'},
                {name: 'bb_id',type: 'string'},
                {name: 'bb_nama',type: 'string'},
                {name: 'sat_id',type: 'string'},
                {name: 'keterangan',type: 'string'},
                {name: 'status',type: 'bool'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: PengadaanBarang.getPB,
                    create: PengadaanBarang.addPB,
                    update: PengadaanBarang.updatePB,
                    destroy : PengadaanBarang.deletePB
                }
            }

        });


        me.PengadaanStore = Ext.create('Ext.data.Store', {
            storeId : 'PBStore',
            model : 'PengadaanModel',
            remoteSort : false
        });
        me.PengadaanDetailStore = Ext.create('Ext.data.Store', {
            storeId : 'PBDetailStore',
            model : 'PengadaanDetailModel',
            remoteSort : false
        });
        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit','tanggal','tgl_jt_kirim']
        }
        me.PengadaanGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('PBStore'),
            height: 330,
            margin: '0 0 3 0',
            region: 'north',
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1'? 'child-row' : record.get('status') == '2'? 'adult-row' : '';
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
                                            name:'pb_num',
                                            valueText:'otomatis',
                                            readOnly: true,
                                            width:385
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tanggal',
                                            format : 'd-m-Y',
                                            itemId:'tgl_input_pb',
                                            maxValue : new Date(),
                                            name:'tanggal',
                                            allowBlank:false,
                                            width:200
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Depertement',
                                            name:'bagian',
                                            width:385
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Pemohon',
                                            name:'request_by',
                                            allowBlank:false,
                                            width:385
                                        },
                                        {
                                            width: 150,
                                            xtype: 'mitos.checkbox',
                                            fieldLabel : 'Release',
                                            name : 'status'
                                        }
                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:450,
                                    layout:'anchor',
                                    items:[
                                        {
                                            width:350,
                                            xtype: "radiogroup",
                                            fieldLabel: "Lokasi",
                                            defaults: {xtype: "radio", name:'lokasi'
                                            },
                                            items: [
                                                {
                                                    boxLabel: "Gudang",
                                                    checked: true,
                                                    inputValue:'G',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#gudang_pb')[0].setDisabled(false);
                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "Non Gudang",
                                                    inputValue:'N',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#gudang_pb')[0].setDisabled(true);
                                                        }
                                                    }

                                                }
                                            ]
                                        },
                                        {
                                            xtype : 'xtGudangBMPopup',
                                            fieldLabel : 'Kode Gudang',
                                            name:'gudang_id',
                                            itemId:'gudang_pb',
                                            allowBlank:false,
                                            width:200
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Lokasi Pabrik',
                                            name:'factory',
                                            itemId:'factory_pb',
                                            readOnly: true,
                                            width:350
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Keterangan',
                                            name:'keterangan',
                                            width:400
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
                    header:'Kode',
                    width:100,
                    dataIndex:'pb_num'
                },
                {
                    header : 'Tanggal',
                    dataIndex : 'tanggal',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                },
                {
                    header : 'Departemen',
                    dataIndex : 'bagian',
                    flex:1
                },
                {
                    header : 'Pemohon',
                    dataIndex : 'request_by',
                    width : 200
                },
                {
                    header:'Status',
                    hidden:true,
                    dataIndex:'status'
                },
                {
                    header : 'Lastupdate',
                    dataIndex : 'timeedit',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                }

            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'PengadaanModel',
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
        me.PengadaanDetailGrid = Ext.create('Ext.grid.Panel', {
            title:'Rincian Detail',
            store: me.PengadaanDetailStore, //Ext.data.StoreManager.lookup('PBDetailStore'),
            region:'center',
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
                                            xtype : 'textfield',
                                            fieldLabel : 'pb_num',
                                            name:'pb_num',
                                            hidden:true,
                                            itemId:'pb_num',
                                            width:300
                                        },
                                        {
                                            xtype:'xtBahanBakuPopup',
                                            fieldLabel:'Kode BB',
                                            name:'bb_id',
                                            width:250
                                        },
                                        {
                                            xtype : 'numberfield',
                                            fieldLabel : 'Qty',
                                            align:'right',
                                            name:'qty',
                                            width:300
                                        }
                                     ]
                                },
                                {
                                    xtype:'container',
                                    width:450,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Satuan',
                                            name:'sat_id',
                                            readOnly:true,
                                            itemId:'sat_id_pb',
                                            width:300
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Keterangan',
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
                    header:'Kode',
                    dataIndex:'pb_num'
                },
                {
                    header : 'Kode BB',
                    dataIndex : 'bb_id'
                },
                {
                    header : 'Bahan Baku',
                    dataIndex : 'bb_nama',
                    flex:1
                },
                {
                    header : 'Qty',
                    dataIndex : 'qty'
                },
                {
                    header : 'Satuan',
                    dataIndex : 'sat_id'
                },
                {
                    header:'Status',
                    hidden:true,
                    dataIndex:'status'
                }

            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'PengadaanDetailModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'delete002',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });


        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.PengadaanGrid]
        });

        me.pageBody = [me.PengadaanGrid, me.PengadaanDetailGrid];
        me.callParent(arguments);

    }, // end of initComponent
    onGridClick: function(grid, selected){
        var me = this;
        me.kode = selected.data.pb_num;
        me.PengadaanDetailStore.load({params:{pb_num: me.kode}});

        var  deletebtn = me.query('button[action="delete"]')[0],
            delete002btn = me.query('button[action="delete002"]')[0],
            tambahbtn =  me.query('button[action="PengadaanDetailModel"]')[0];
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
        if(model=="PengadaanDetailModel"){
            Ext.ComponentQuery.query('#pb_num')[0].setValue(me.kode);
        }else{
            Ext.ComponentQuery.query('#tgl_input_pb')[0].setValue(new Date());
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

    onActive : function(callback)
    {
        this.PengadaanStore.load();
        this.PengadaanDetailStore.load();
        callback(true);
    }
});
//ens LogPage class