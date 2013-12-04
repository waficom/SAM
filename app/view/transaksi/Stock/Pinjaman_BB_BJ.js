Ext.define('App.view.transaksi.Stock.Pinjaman_BB_BJ', {
    extend: 'App.ux.RenderPanel',
    id: 'panelPinjaman_BB_BJ',
    pageTitle: 'Pinjam Bahan Baku',
    pageLayout: 'anchor',
    uses: ['App.ux.GridPanel'],
    initComponent : function()
    {
        var me = this;
        me.kode = null;
        me.jkode = null;
        Ext.define('PinjamBBModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'dok_no',type: 'string'},
                {name: 'dok_type',type: 'string'},
                {name: 'bb_bj_type',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'posted_date',type: 'date'},
                {name: 'tgl_jt',type: 'date'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'status',type: 'string'},
                {name: 'remaks',type: 'string'},
                {name: 'vend_id',type: 'string'},
                {name: 'gudang_id',type: 'string'},
                {name: 'cust_id',type: 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Pinjaman_BB_BJ.getPinjam,
                    create: Pinjaman_BB_BJ.addPinjam_I,
                    update: Pinjaman_BB_BJ.updatePinjam,
                    destroy : Pinjaman_BB_BJ.deletePinjam
                }
            }

        });
        Ext.define('PinjamBBDModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'dok_no',type: 'string'},
                {name: 'bb_id',type: 'string'},
                {name: 'bb_nama',type: 'string'},
                {name: 'prod_id',type: 'string'},
                {name: 'prod_nama',type: 'string'},
                {name: 'qty',type: 'string'},
                {name: 'sequence_no',type: 'string'},
                {name: 'sat_id',type: 'string'},
                {name: 'hpp',type: 'float'},
                {name: 'total',type: 'float'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Pinjaman_BB_BJ.getPinjamDetail,
                    create: Pinjaman_BB_BJ.addPinjamDetail,
                    update: Pinjaman_BB_BJ.updatePinjamDetail,
                    destroy : Pinjaman_BB_BJ.deletePinjamDetail
                }
            }

        });
        Ext.define('JurnalModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'inv_date',type: 'date'},
                {name: 'inv_code',type: 'string'},
                {name: 'inv_code_link',type: 'string'},
                {name: 'vend_id',type: 'string'},
                {name: 'coa',type: 'string'},
                {name: 'coa_nama',type: 'string'},
                {name: 'debit',type: 'float'},
                {name: 'credit',type: 'float'},
                {name: 'sequence_no',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'remaks',type: 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Jurnal.getJurnal
                }
            }

        });
        me.PinjamBBStore = Ext.create('Ext.data.Store', {
            storeId : 'PinjamBBStore',
            model : 'PinjamBBModel',
            remoteSort : false
        });
        me.PinjamBBDStore = Ext.create('Ext.data.Store', {
            storeId : 'PinjamBBDStore',
            model : 'PinjamBBDModel',
            remoteSort : false
        });

        me.JurnalStore = Ext.create('Ext.data.Store', {
            storeId : 'JurnalStore',
            model : 'JurnalModel',
            remoteSort : false
        });
        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit','tanggal']
        }
        me.PinjamBBGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('PinjamBBStore'),
            title:'Pinjaman Stok',
            height: 370,
            margin: '0 0 3 0',
            region: 'north',
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
                            width:900,
                            items:[
                                {
                                    xtype:'container',
                                    width:400,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode Dokumen',
                                            name:'dok_no',
                                            readOnly: true,
                                            width:300
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tgl JT',
                                            format : 'd-m-Y',
                                            itemId:'tgl_jt_pj',
                                            name:'tgl_jt',
                                            allowBlank:false,
                                            width:200
                                        },
                                        {
                                            xtype: "radiogroup",
                                            fieldLabel: "Jenis ",
                                            width:250,
                                            defaults: {xtype: "radio", name:'dok_type'
                                            },
                                            items: [
                                                {
                                                    boxLabel: "Masuk",
                                                    checked: true,
                                                    inputValue:'I',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#vend_id_pj')[0].setDisabled(false);
                                                            Ext.ComponentQuery.query('#cust_id_pj')[0].setDisabled(true);
                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "Keluar",
                                                    inputValue:'O',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#vend_id_pj')[0].setDisabled(true);
                                                            Ext.ComponentQuery.query('#cust_id_pj')[0].setDisabled(false);
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype : 'xtVendorSuplierPopup',
                                            fieldLabel : 'Kode Suplier',
                                            name:'vend_id',
                                            itemId:'vend_id_pj',
                                            width:250
                                        },
                                        {
                                            xtype : 'xtCustomerPopup',
                                            fieldLabel : 'Kode Customer',
                                            name:'cust_id',
                                            itemId:'cust_id_pj',
                                            disabled: true,
                                            width:250
                                        }

                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:400,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype : 'xtGudangBMPopup',
                                            fieldLabel : 'Kode Gudang',
                                            name:'gudang_id',
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Keterangan',
                                            name:'remaks',
                                            width:385
                                        },
                                        {
                                            xtype : 'mitos.checkbox',
                                            fieldLabel : 'Posting',
                                            name:'status',
                                            width:150,
                                            handler: function(field, value) {
                                                if (value== true) {
                                                    Ext.ComponentQuery.query('#tgl_post_pj')[0].setDisabled(false);
                                                    Ext.ComponentQuery.query('#tgl_post_pj')[0].setValue(new Date());
                                                }else{
                                                    Ext.ComponentQuery.query('#tgl_post_pj')[0].setDisabled(true);
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
                                            itemId:'tgl_post_pj'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                })
            ],
            columns:[
                {text: 'Kode Dok',sortable: true,dataIndex: 'dok_no'},
                {text: 'Kode Suplier',sortable: true,dataIndex: 'vend_id'},
                {text: 'Kode Customer',sortable: true,dataIndex: 'cust_id'},
                {text: 'Kode Gudang',sortable: true,dataIndex: 'gudang_id'},
                {flex:1,text: 'Keterangan',sortable: true,dataIndex: 'remaks'},
                {text: 'Tgl Posting', width : 80, sortable: true, dataIndex: 'posted_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}],
            tbar:[
                {
                    text:'Stok Masuk',
                    iconCls:'save',
                    action:'PinjamBBModel',
                    scope:me,
                    handler:me.onNewRec
                },
                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'delete',
                    scope:me,
                    handler:me.onDeleteRec
                }
            ]
        });
        me.PinjamBB_DetailGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('PinjamBBDStore'),
            title:'Rincian Bahan Baku',
            height: 370,
            margin: '0 0 3 0',
            region: 'north',
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
                            width:900,
                            items:[
                                {
                                    xtype:'container',
                                    width:400,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode Dokumen',
                                            name:'dok_no',
                                            itemId:'kode_dok_pj',
                                            hidden: true,
                                            width:300
                                        },
                                        {
                                            xtype : 'xtBahanBakuPopup',
                                            fieldLabel : 'Kode BB',
                                            name:'bb_id',
                                            width:250
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel : 'Qty',
                                            name:'qty',
                                            width:250
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel : 'Harga',
                                            itemId:'hrg_pj',
                                            name:'hpp',
                                            readOnly: false,
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Satuan',
                                            name:'sat_id',
                                            itemId:'sat_id_pj',
                                            width:250,
                                            readOnly: true
                                        }

                                    ]
                                }
                            ]
                        }
                    ]
                })
            ],
            columns:[
                {text: 'BB ID',sortable: true,dataIndex: 'bb_id'},
                {text: 'Bahan Baku',sortable: true,dataIndex: 'bb_nama', flex:1},
                {text: 'Qty',sortable: true,dataIndex: 'qty'},
                {text: 'Satuan',sortable: true,dataIndex: 'sat_id'},
                {header : 'Hrg Rata2', dataIndex : 'hpp',renderer: Ext.util.Format.numberRenderer('0,000.00'),  summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'Total', dataIndex : 'total',renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'PinjamBBDModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'delete002',
                    scope:me,
                    handler:me.onDeleteRec
                },
                {
                    text:'Refresh',
                    iconCls:'icoGreen',
                    scope:me,
                    handler:me.onRefresh
                }
            ]
        });

        me.JurnalGrid = Ext.create('Ext.grid.Panel', {
            title:'Jurnal',
            store: Ext.data.StoreManager.lookup('JurnalStore'),
            region:'center',
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            columns:[
                {header : 'Company', dataIndex : 'co_id', hidden: true},
                {header : 'Tgl Dok',dataIndex : 'inv_date',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100},
                {header : 'Kode Dok', dataIndex : 'inv_code'},
                {header : 'Creditor', dataIndex : 'vend_id'},
                {header : 'Akun', dataIndex : 'coa'},
                {header : 'Deskripsi', dataIndex : 'coa_nama',flex:1, summaryRenderer: function(){
                    return '<b>Total</b>';
                }},
                {header : 'Debit', dataIndex : 'debit',width : 150,renderer: Ext.util.Format.numberRenderer('0,000.00'),  summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'Kredit', dataIndex : 'credit',width : 150,renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'Keterangan', dataIndex : 'remaks', flex:1},
                {header : 'LastUpdate',dataIndex : 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100}
            ],features: [{
                ftype: 'summary'
            }]
        });
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[  me.PinjamBBGrid, me.PinjamBB_DetailGrid ]
        });
        me.pageBody = [me.FormulirPanel, me.JurnalGrid];
        me.callParent(arguments);

    }, // end of initComponent

    onGridClick: function(grid, selected){
        var me = this;
        me.kode = selected.data.dok_no;
        me.jkode = selected.data.dok_type;
        me.PinjamBBDStore.load({params:{dok_no: me.kode}});
        me.JurnalStore.load({params:{inv_code: me.kode}});
        var  deletebtn = me.query('button[action="delete"]')[0],
            delete002btn = me.query('button[action="delete002"]')[0],
            tambahbtn =  me.query('button[action="PinjamBBDModel"]')[0];
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
    onRefresh: function(grid, selected){
        var me = this;
        me.PinjamBBDStore.load({params:{dok_no: me.kode}});

    },
    onNewRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
        newModel = Ext.ModelManager.create({
        }, model);
        store.insert(0, newModel);
        plugin.startEdit(0, 0);
        if(Ext.ComponentQuery.query('#tgl_jt_pj')[0]){
            Ext.ComponentQuery.query('#tgl_jt_pj')[0].setValue(new Date());
        }
        if(Ext.ComponentQuery.query('#kode_dok_pj')[0]){
            Ext.ComponentQuery.query('#kode_dok_pj')[0].setValue( me.kode);
        }
        if(Ext.ComponentQuery.query('#sat_id_pj')[0]){
            Ext.ComponentQuery.query('#sat_id_pj')[0].setValue('KG');
        }
        if(me.jkode=='I'){
            Ext.ComponentQuery.query('#hrg_pj')[0].setReadOnly(false);
        }else{
            Ext.ComponentQuery.query('#hrg_pj')[0].setReadOnly(true);
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
        this.PinjamBBStore.load();
        this.PinjamBBDStore.load();
        this.JurnalStore.load();
        callback(true);
    }
});
//ens LogPage class