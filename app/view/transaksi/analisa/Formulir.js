Ext.define('App.view.transaksi.analisa.Formulir', {
    extend:'App.ux.RenderPanel',
    id:'panelFormulir',
    pageTitle:'Formulir Sampling',

    initComponent : function()
    {
        var me = this;

        Ext.define('AnalisaBJModel', {
                extend : 'Ext.data.Model',
                fields : [
                    { name : 'co_id', type : 'string'},
                    { name : 'no_doc', type : 'string'},
                    { name : 'urut', type : 'int'},
                    { name : 'tglmasuk',type : 'date'},
                    { name : 'tglmulai',type : 'date'},
                    { name : 'tglselesai',type : 'date'},
                    { name : 'sample', type : 'string'},
                    { name : 'spesifikasi', type : 'string'},
                    { name : 'n', type : 'float'},
                    { name : 'p2o5', type : 'float'},
                    { name : 'k2o', type : 'float'},
                    { name : 'air', type : 'float'}
                    /*                        ,
                     { name : 'old_no_doc', type : 'string'}
                     */
                ],
                proxy:{
                    type:'direct',
                    api:{
                        read:Formulir.getAnalisaBJ,
                        create:Formulir.addAnalisaBJ,
                        update:Formulir.updateAnalisaBJ,
                        destroy:Formulir.deleteAnalisaBJ
                    }
                }

        });

        Ext.define('AnalisaBBModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'co_id', type : 'string'},
                { name : 'no_doc', type : 'string'},
                { name : 'urut', type : 'int'},
                { name : 'petugas',type : 'string'},
                { name : 'tgldatang',type : 'date'},
                { name : 'tglambil',type : 'date'},
                { name : 'jenis', type : 'string'},
                { name : 'merk', type : 'string'},
                { name : 'supplier', type : 'string'},
                { name : 'no_truck', type : 'string'},
                { name : 'hasil', type : 'float'},
                { name : 'air', type : 'float'}
                /*                        ,
                 { name : 'old_no_doc', type : 'string'}
                 */
            ],
            proxy:{
                type:'direct',
                api:{
                    read:Formulir.getAnalisaBB,
                    create:Formulir.addAnalisaBB,
                    update:Formulir.updateAnalisaBB,
                    destroy:Formulir.deleteAnalisaBB
                }
            }

        });

        Ext.define('AnalisaTBModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'co_id', type : 'string'},
                { name : 'no_doc', type : 'string'},
                { name : 'urut', type : 'int'},
                { name : 'tanggal',type : 'date'},
                { name : 'shift',type : 'int'},
                { name : 'petugas',type : 'string'},
                { name : 'produk', type : 'string'},
                { name : 'hasil1', type : 'float'},
                { name : 'hasil2', type : 'float'},
                { name : 'hasil3', type : 'float'},
                { name : 'hasil4', type : 'float'},
                { name : 'hasil5', type : 'float'},
                { name : 'keterangan', type : 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read:Formulir.getAnalisaTB,
                    create:Formulir.addAnalisaTB,
                    update:Formulir.updateAnalisaTB,
                    destroy:Formulir.deleteAnalisaTB
                }
            }

        });

        me.AnalisaBJstore = Ext.create('Ext.data.Store', {
            storeId : 'ABJstore',
            model : 'AnalisaBJModel',
            remoteSort : false
        });
        me.AnalisaBBstore = Ext.create('Ext.data.Store', {
            storeId : 'ABBstore',
            model : 'AnalisaBBModel',
            remoteSort : false
        });
        me.AnalisaTBstore = Ext.create('Ext.data.Store', {
            storeId : 'ATBstore',
            model : 'AnalisaTBModel',
            remoteSort : false
        });

        me.AnalisaBJGrid = Ext.create('Ext.grid.Panel', {
            title:'Bahan Jadi',
            store: Ext.data.StoreManager.lookup('ABJstore'),
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
                                            xtype:'textfield',
                                            hidden : true,
                                            name:'co_id'
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'No. Dokumen',
                                            name:'no_doc',
/*                                            enableKeyEvents : true,
                                            listeners: {
                                                specialkey: function(field, e){
                                                    // e.HOME, e.END, e.PAGE_UP, e.PAGE_DOWN,
                                                    // e.TAB, e.ESC, arrow keys: e.LEFT, e.RIGHT, e.UP, e.DOWN
                                                    if (e.getKey() == e.ENTER) {

                                                        var obj = Ext.ComponentQuery.query('#spesifikasi_i')[0];
                                                        obj.setValue(this.getValue());

                                                    //    var form = field.ownerCt.getForm();

                                                    }
                                                }
                                            },
*/
                                            width:385
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tanggal Masuk',
                                            format : 'd-m-Y',
                                            value : new Date(),
                                            name:'tglmasuk',
                                            width:250
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tanggal Mulai',
                                            format : 'd-m-Y',
                                            value : new Date(),
                                            name:'tglmulai',
                                            width:250
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tanggal Selesai',
                                            format : 'd-m-Y',
                                            value : new Date(),
                                            name:'tglselesai',
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Jenis Sample',
                                            name:'sample',
                                            width:385
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Spesifikasi',
                                            name:'spesifikasi',
                                            itemId : 'spesifikasi_i',
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
                                            xtype:'mitos.currency',
                                            fieldLabel:'Kadar % N',
                                            hideTrigger: true,
                                            name:'n',
                                            width:275
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel:'Kadar % P2O5',
                                            name:'p2o5',
                                            width:275
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel:'Kadar % K2O',
                                            name:'k2o',
                                            width:275
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel:'Kadar Air',
                                            name:'air',
                                            width:275
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
                    header:'No. Dokumen',
                    width:100,
                    dataIndex:'no_doc'
                },
                {
                    header:'Urut',
                    width:50,
                    dataIndex:'urut'
                },
                {
                    header : 'Masuk',
                    dataIndex : 'tglmasuk',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                },
                {
                    header : 'Mulai',
                    dataIndex : 'tglmulai',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                },
                {
                    header : 'Selesai',
                    dataIndex : 'tglselesai',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                },
                {
                    header : 'Jenis Sample',
                    dataIndex : 'sample',
                    width : 200
                },
                {
                    header : 'Standart Spesifikasi',
                    dataIndex : 'spesifikasi',
                    width : 200
                },
                {
                    header : '% N',
                    dataIndex : 'n',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    width : 50
                },
                {
                    header : '% P2O5',
                    dataIndex : 'p2o5',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    width : 50
                },
                {
                    header : '% K2O',
                    dataIndex : 'k2o',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    width : 50
                },
                {
                    header : 'Kadar Air %',
                    dataIndex : 'air',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    width : 80
                }
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'AnalisaBJModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'AnalisaBJModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });
        me.AnalisaBBGrid = Ext.create('Ext.grid.Panel', {
            title:'Bahan Baku',
            store: Ext.data.StoreManager.lookup('ABBstore'),
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
                                            xtype:'textfield',
                                            hidden : true,
                                            name:'co_id'
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'No. Dokumen',
                                            name:'no_doc',
                                            width:385
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Petugas',
                                            name:'petugas',
                                            width:385
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tanggal Datang',
                                            format : 'd-m-Y',
                                            value : new Date(),
                                            name:'tgldatang',
                                            width:250
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tgl/Jam Ambil',
                                            format : 'd-m-Y H:i',
                                            submitFormat: 'Y-m-d H:i',
                                            value : new Date(),
                                            name:'tglambil',
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Jenis',
                                            name:'jenis',
                                            width:385
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Merk',
                                            name:'merk',
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
                                            xtype : 'textfield',
                                            fieldLabel : 'Supplier',
                                            name:'supplier',
                                            width:385
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'No. Truck',
                                            name:'no_truck',
                                            width:385
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            fieldLabel:'Hasil %',
                                            hideTrigger: true,
                                            name:'hasil',
                                            width:275
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel:'Kadar Air %',
                                            name:'air',
                                            width:275
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
                    header:'No. Dokumen',
                    width:100,
                    dataIndex:'no_doc'
                },
                {
                    header:'Urut',
                    width:50,
                    dataIndex:'urut'
                },
                {
                    header:'Petugas',
                    width:100,
                    dataIndex:'petugas'
                },
                {
                    header : 'Tgl Datang',
                    dataIndex : 'tgldatang',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                },
                {
                    header : 'Tgl / Jam Ambil',
                    dataIndex : 'tglambil',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y H:i'),
                    width : 100
                },
                {
                    header : 'Jenis',
                    dataIndex : 'jenis',
                    width : 150
                },
                {
                    header : 'Merk',
                    dataIndex : 'merk',
                    width : 150
                },
                {
                    header : 'Supplier',
                    dataIndex : 'supplier',
                    width : 150
                },
                {
                    header : 'No Truck',
                    dataIndex : 'no_truck',
                    width : 100
                },
                {
                    header : '% Hasil',
                    dataIndex : 'hasil',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    width : 50
                },
                {
                    header : '% Air',
                    dataIndex : 'air',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    width : 50
                }
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'AnalisaBBModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'AnalisaBBModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });
        me.AnalisaTBGrid = Ext.create('Ext.grid.Panel', {
            title:'Timbangan',
            store: Ext.data.StoreManager.lookup('ATBstore'),
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
                                            xtype:'textfield',
                                            hidden : true,
                                            name:'co_id'
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'No. Dokumen',
                                            name:'no_doc',
                                            width:385
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tanggal',
                                            format : 'd-m-Y H:i',
                                            submitFormat: 'Y-m-d H:i',
                                            value : new Date(),
                                            name:'tanggal',
                                            width:250
                                        },
                                        {
                                            xtype:'numberfield',
                                            fieldLabel:'Shift',
                                            hideTrigger: true,
                                            name:'shift',
                                            width:200
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Petugas',
                                            name:'petugas',
                                            width:385
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Produk',
                                            name:'produk',
                                            width:385
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Keterangan',
                                            name:'keterangan',
                                            width:385
                                        }
                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:450,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'mitos.currency',
                                            fieldLabel:'Hasil Penimbangan 1',
                                            hideTrigger: true,
                                            name:'hasil1',
                                            width:250,
                                            labelWidth : 150
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            fieldLabel:'Hasil Penimbangan 2',
                                            hideTrigger: true,
                                            name:'hasil2',
                                            width:250,
                                            labelWidth : 150
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            fieldLabel:'Hasil Penimbangan 3',
                                            hideTrigger: true,
                                            name:'hasil3',
                                            width:250,
                                            labelWidth : 150
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            fieldLabel:'Hasil Penimbangan 4',
                                            hideTrigger: true,
                                            name:'hasil4',
                                            width:250,
                                            labelWidth : 150
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            fieldLabel:'Hasil Penimbangan 5',
                                            hideTrigger: true,
                                            name:'hasil5',
                                            width:250,
                                            labelWidth : 150
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
                    header:'No. Dokumen',
                    width:100,
                    dataIndex:'no_doc'
                },
                {
                    header:'Urut',
                    width:50,
                    dataIndex:'urut'
                },
                {
                    header : 'Tanggal',
                    dataIndex : 'tanggal',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y H:i'),
                    width : 100
                },
                {
                    header:'Shift',
                    width:100,
                    dataIndex:'shift'
                },
                {
                    header:'Petugas',
                    width:100,
                    dataIndex:'petugas'
                },
                {
                    header : 'Produk',
                    dataIndex : 'produk',
                    width : 200
                },
                {
                    header : '1',
                    dataIndex : 'hasil1',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    width : 50
                },
                {
                    header : '2',
                    dataIndex : 'hasil2',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    width : 50
                },
                {
                    header : '3',
                    dataIndex : 'hasil3',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    width : 50
                },
                {
                    header : '4',
                    dataIndex : 'hasil4',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    width : 50
                },
                {
                    header : '5',
                    dataIndex : 'hasil5',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    width : 50
                },
                {
                    header : 'Keterangan',
                    dataIndex : 'keterangan',
                    width : 300
                }
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'AnalisaTBModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'AnalisaTBModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });

        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.AnalisaBJGrid, me.AnalisaBBGrid, me.AnalisaTBGrid ]
        });

        me.pageBody = [me.FormulirPanel];
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
        this.AnalisaBJstore.load();
        this.AnalisaBBstore.load();
        this.AnalisaTBstore.load();
        callback(true);
    }
});
//ens LogPage class