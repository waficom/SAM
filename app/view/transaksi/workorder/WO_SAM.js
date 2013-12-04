Ext.define('App.view.transaksi.workorder.WO_SAM', {
    extend: 'App.ux.RenderPanel',
    id: 'panelWO_SAM',
    pageTitle: 'Manufaktur SAM',
    initComponent : function()
    {
        var me = this;
        me.wo_num = null;
        me.so_num = null;
        me.no_ppd = null;
        me.prod_id = null;

        Ext.define('WO_SAMModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'wo_num',type: 'string'},
                {name: 'tgl',type: 'string'},
                {name: 'shift',type: 'integer'},
                {name: 'ka_shift',type: 'string'},
                {name: 'so_num',type: 'string'},
                {name: 'status',type: 'string'},
                {name: 'prod_id',type: 'string'},
                {name: 'no_ppd',type: 'string'},
                {name: 'formula_id',type: 'string'},
                {name: 'cust_nama',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'keterangan',type: 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: WO_SAM.getWO_SAM,
                    create: WO_SAM.addWO_SAM,
                    update: WO_SAM.updateWO_SAM,
                    destroy: WO_SAM.deleteWO_SAM
                }
            }

        });
        Ext.define('WOBB_SAMModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'wo_num',type: 'string'},
                {name: 'so_num',type: 'string'},
                {name: 'prod_id',type: 'string'},
                {name: 'no_ppd',type: 'string'},
                {name: 'bb_id',type: 'string'},
                {name: 'bb_nama',type: 'string'},
                {name: 'qty_in',type: 'float'},
                {name: 'sat_id',type: 'string'},
                {name: 'keterangan',type: 'string'},
                {name: 'jml_paket',type: 'string'},
                {name: 'total_qty_in',type: 'float'},
                {name: 'status',type: 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: WO_SAM.getWOBB_SAM,
                    create: WO_SAM.addWOBB_SAM,
                    update: WO_SAM.updateWOBB_SAM,
                    destroy: WO_SAM.deleteWOBB_SAM
                }
            }

        });
        Ext.define('WOBJ_SAMModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'wo_num',type: 'string'},
                {name: 'so_num',type: 'string'},
                {name: 'prod_id',type: 'string'},
                {name: 'no_ppd',type: 'string'},
                {name: 'for_prod_id',type: 'string'},
                {name: 'prod_nama',type: 'string'},
                {name: 'qty',type: 'float'},
                {name: 'sat_id',type: 'string'},
                {name: 'prod_id',type: 'string'},
                {name: 'darigudang',type: 'string'},
                {name: 'status',type: 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: WO_BB_Mix.getWO_BJ_Mix,
                    create: WO_BB_Mix.addWO_BJ_Mix,
                    update: WO_BB_Mix.updateWO_BJ_Mix,
                    destroy: WO_BB_Mix.deleteWO_BJ_Mix
                }
            }

        });
        Ext.define('WOBJM_SAMModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'wo_num',type: 'string'},
                {name: 'so_num',type: 'string'},
                {name: 'prod_id',type: 'string'},
                {name: 'no_ppd',type: 'string'},
                {name: 'qty',type: 'float'},
                {name: 'qty_pcs',type: 'float'},
                {name: 'sat_id',type: 'string'},
                {name: 'sequence_no',type: 'string'},
                {name: 'status',type: 'string'},
                {name: 'est_lembab_prs',type: 'float'},
                {name: 'real_lembab_prs',type: 'string'},
                {name: 'hpp_lembab',type: 'string'},
                {name: 'qty_sebelum_lembab',type: 'float'},
                {name: 'est_qty',type: 'float'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: WO_SAM.getWOBJM_SAM,
                    update: WO_SAM.updateWOBJM_SAM
                }
            }

        });
        Ext.define('WOBBPaket_SAMModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'wo_num',type: 'string'},
                {name: 'so_num',type: 'string'},
                {name: 'prod_id',type: 'string'},
                {name: 'no_ppd',type: 'string'},
                {name: 'bb_id',type: 'string'},
                {name: 'bb_nama',type: 'string'},
                {name: 'qty_in',type: 'float'},
                {name: 'sat_id',type: 'string'},
                {name: 'keterangan',type: 'string'},
                {name: 'jml_paket',type: 'string'},
                {name: 'total_qty_in',type: 'float'},
                {name: 'status',type: 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: WO_SAM.getWOBB_SAM,
                    create: WO_SAM.addWOBBPaket_SAM
                }
            }

        });
        me.WO_SAMStore = Ext.create('Ext.data.Store', {
            storeId : 'WO_SAMStore',
            model : 'WO_SAMModel',
            remoteSort : false
        });
        me.WOBB_SAMStore = Ext.create('Ext.data.Store', {
            storeId : 'WOBB_SAMStore',
            model : 'WOBB_SAMModel',
            remoteSort : false
        });
        me.WOBJ_SAMStore = Ext.create('Ext.data.Store', {
            storeId : 'WOBJ_SAMStore',
            model : 'WOBJ_SAMModel',
            remoteSort : false
        });
        me.WOBJM_SAMStore = Ext.create('Ext.data.Store', {
            storeId : 'WOBJM_SAMStore',
            model : 'WOBJM_SAMModel',
            remoteSort : false
        });
        me.WOBBPaket_SAMStore = Ext.create('Ext.data.Store', {
            storeId : 'WOBBPaket_SAMStore',
            model : 'WOBBPaket_SAMModel',
            remoteSort : false
        });
        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit','tanggal']
        }
        me.WO_SAMGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('WO_SAMStore'),
            title:'Shift',
            border:false,
            frame:false,
            viewConfig :
            {
                stripeRows: true,
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
                                    width:450,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'xtPPDPopup',
                                            fieldLabel:'Kode Dokumen',
                                            name:'no_ppd',
                                            width:300,
                                            allowBlank:false
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tgl Input',
                                            format : 'd-m-Y',
                                            itemId:'tgl_input_sam',
                                            name:'tgl',
                                            readOnly:true,
                                            width:200
                                        },
                                        {
                                            xtype: 'numberfield',
                                            hideTrigger: true,
                                            width: 200,
                                            name : 'shift',
                                            fieldLabel: 'Shift',
                                            value:1
                                        },
                                        {
                                            xtype: 'textfield',
                                            width: 300,
                                            name : 'ka_shift',
                                            fieldLabel: 'Petugas Shift'
                                        }
                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:450,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype: 'textfield',
                                            width: 385,
                                            name : 'keterangan',
                                            fieldLabel: 'Keterangan'
                                        },
                                        {
                                            xtype : 'mitos.checkbox',
                                            fieldLabel : 'Posting',
                                            name:'status',
                                            width:150,
                                            handler: function(field, value) {
                                                if (value== true) {
                                                    Ext.ComponentQuery.query('#tgl_post_sam')[0].setDisabled(false);
                                                    Ext.ComponentQuery.query('#tgl_post_sam')[0].setValue(new Date());
                                                }else{
                                                    Ext.ComponentQuery.query('#tgl_post_sam')[0].setDisabled(true);
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
                                            itemId:'tgl_post_sam',
                                            disabled:true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                })
            ],
            columns:[
                {header: 'No PPD',sortable: true,dataIndex: 'no_ppd', hidden:true},
                {header: 'SO Num',sortable: true,dataIndex: 'so_num'},
                {header: 'Shiff',sortable: true,dataIndex: 'shift'},
                {header: 'WO Num',sortable: true,dataIndex: 'wo_num', hidden:true},
                {header: 'Customer',sortable: true,dataIndex: 'cust_nama', flex:1},
                {header: 'Produk',sortable: true,dataIndex: 'prod_id'},
                {header: 'Formula',sortable: true,dataIndex: 'formula_id'},
                {header: 'Petugas Shift',sortable: true,dataIndex: 'ka_shift'},
                {header: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'WO_SAMModel',
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
        me.WOBB_SAMGrid = Ext.create('Ext.grid.Panel', {
            title:'Pemakaian Bahan Baku NF',
            store: Ext.data.StoreManager.lookup('WOBB_SAMStore'),
            border:false,
            frame:false,
            viewConfig :
            {
                stripeRows: true,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            features: [{
                ftype: 'summary'
            }],
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
                                            fieldLabel:'Kode WO',
                                            name:'wo_num',
                                            itemId:'wo_num_sam',
                                            hidden: true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode SO',
                                            name:'so_num',
                                            itemId:'so_num_sam',
                                            hidden: true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode PPD',
                                            name:'no_ppd',
                                            itemId:'no_ppd_sam',
                                            hidden: true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode Produk',
                                            name:'prod_id',
                                            itemId:'prod_id_sam',
                                            hidden: true
                                        },
                                        {
                                            xtype:'xtBahanBakuPopup',
                                            fieldLabel:'Kode BB',
                                            name:'bb_id',
                                            width:200
                                        },
                                        {
                                            xtype: 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel:'Qty',
                                            name:'total_qty_in',
                                            width:200
                                        },
                                        {
                                            xtype:'xtSatuanPopup',
                                            fieldLabel:'Satuan',
                                            name:'sat_id',
                                            itemId:'sat_id_sam',
                                            width:200,
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
                {header : 'Company', dataIndex : 'co_id',width : 200, hidden: true},
                {header : 'Kode BB', dataIndex : 'bb_id'},
                {header : 'Bahan Baku', dataIndex : 'bb_nama',flex:1, summaryRenderer: function(){
                    return '<b>Total</b>';
                }},
                {header : 'Qty BB', dataIndex : 'total_qty_in',renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'WOBB_SAMModel',
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
        me.WOBJ_SAMGrid = Ext.create('Ext.grid.Panel', {
            title:'Pemakaian Barang Jadi',
            store: Ext.data.StoreManager.lookup('WOBJ_SAMStore'),
            border:false,
            frame:false,
            viewConfig :
            {
                stripeRows: true,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            features: [{
                ftype: 'summary'
            }],
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
                                            fieldLabel:'Kode WO',
                                            name:'wo_num',
                                            itemId:'wo_num_sam2',
                                            hidden: true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode SO',
                                            name:'so_num',
                                            itemId:'so_num_sam2',
                                            hidden: true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode PPD',
                                            name:'no_ppd',
                                            itemId:'no_ppd_sam2',
                                            hidden: true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode Produk',
                                            name:'for_prod_id',
                                            itemId:'prod_id_sam2',
                                            hidden: true
                                        },
                                        {
                                            xtype:'xtlistproduct',
                                            fieldLabel:'Kode Produk',
                                            name:'prod_id',
                                            width:200
                                        },
                                        {
                                            xtype:'xtSatuanPopup',
                                            fieldLabel:'Satuan',
                                            name:'sat_id',
                                            itemId:'sat_id_sam2',
                                            width:200,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel:'Qty',
                                            name:'qty',
                                            width:200
                                        }
                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:400,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'xtGudangBJPopup',
                                            fieldLabel:'Kode Gudang',
                                            name:'darigudang',
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
                {header : 'co_id', dataIndex : 'co_id',width : 200, hidden: true},
                {header : 'so_num', dataIndex : 'so_num',width : 150, hidden: true},
                {header : 'wo_num', dataIndex : 'wo_num',width : 150, hidden: true},
                {header : 'prod_id', dataIndex : 'for_prod_id',width : 150, hidden: true},
                {header : 'Kode Produk', dataIndex : 'prod_id',width : 150},
                {header : 'Produk', dataIndex : 'prod_nama',flex:1, summaryRenderer: function(){
                    return '<b>Total</b>';
                }},
                {header : 'Qty', dataIndex : 'qty',renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'satuan', dataIndex : 'sat_id'},
                {header : 'Darigudang', dataIndex : 'darigudang'},
                {header : 'kegudang', dataIndex : 'kegudang'}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'WOBJ_SAMModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'delete003',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });
        me.WOBJM_SAMGrid = Ext.create('Ext.grid.Panel', {
            title:'Barang Jadi Masuk',
            store: Ext.data.StoreManager.lookup('WOBJM_SAMStore'),
            border:false,
            frame:false,
            viewConfig :
            {
                stripeRows: true,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            features: [{
                ftype: 'summary'
            }],
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
                                            xtype: 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel:'Total Qty',
                                            name:'qty',
                                            width:250,
                                            allowBlank: false
                                        },
                                        {
                                            xtype: 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel:'Qty SAK',
                                            name:'qty_pcs',
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
                {header : 'Company', dataIndex : 'co_id',width : 200, hidden: true},
                {header : 'Kode Produk', dataIndex : 'prod_id',flex:1, summaryRenderer: function(){
                    return '<b>Total</b>';
                }},
                {header : 'Total Qty', dataIndex : 'qty',renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'Qty SAK', dataIndex : 'qty_pcs',renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')}
            ]
        });
        me.WOBBPaket_SAMGrid = Ext.create('Ext.grid.Panel', {
            title:'Pemakaian Bahan Baku Paket',
            store: Ext.data.StoreManager.lookup('WOBBPaket_SAMStore'),
            border:false,
            frame:false,
            viewConfig :
            {
                stripeRows: true,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            features: [{
                ftype: 'summary'
            }],
            columns:[
                {header : 'Company', dataIndex : 'co_id',width : 200, hidden: true},
                {header : 'Kode BB', dataIndex : 'bb_id'},
                {header : 'Bahan Baku', dataIndex : 'bb_nama',flex:1, summaryRenderer: function(){
                    return '<b>Total</b>';
                }},
                {header : 'Qty Formula', dataIndex : 'qty_in',renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'Jml Paket', dataIndex : 'jml_paket',renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'Qty BB', dataIndex : 'total_qty_in',renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')}
            ],
            tbar:[
                {
                    xtype: 'mitos.currency',
                    hideTrigger: true,
                    fieldLabel:'Jumlah Paket',
                    name:'jml_paket',
                    value:1,
                    itemId:'jml_paket_wo_sam',
                    width:200
                },
                {
                    text:'Tambah Data',
                    iconCls:'icoArrowRightSmall',
                    action:'WOBBPaket_SAMModel',
                    scope:me,
                    handler:me.onNewPaket
                }

            ]
        });
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[me.WO_SAMGrid, me.WOBBPaket_SAMGrid,me.WOBB_SAMGrid,  me.WOBJ_SAMGrid, me.WOBJM_SAMGrid]
        });
        me.win = Ext.create('App.ux.window.Window', {
            width: 400,
            items: [
                {
                    xtype: 'mitos.form',
                    items: [
                        {xtype: 'textfield',hidden: true,name: 'wo_num'},
                        {xtype: 'textfield',hidden: true,name: 'no_ppd'},
                        {xtype: 'textfield',hidden: true,name: 'jml_paket'}
                    ]
                }

            ]
        });
        me.pageBody = [me.FormulirPanel];
        me.callParent(arguments);

    }, // end of initComponent

    onGridClick: function(grid, selected){
        var me = this;
        me.wo_num = selected.data.wo_num;
        me.so_num = selected.data.so_num;
        me.no_ppd = selected.data.no_ppd;
        me.prod_id = selected.data.prod_id;
        me.WOBB_SAMStore.load({params:{wo_num: me.wo_num,so_num: me.so_num,no_ppd: me.no_ppd,prod_id: me.prod_id}});
        me.WOBJ_SAMStore.load({params:{wo_num: me.wo_num,so_num: me.so_num,no_ppd: me.no_ppd,for_prod_id: me.prod_id}});
        me.WOBJM_SAMStore.load({params:{wo_num: me.wo_num,so_num: me.so_num,no_ppd: me.no_ppd}});
        me.WOBBPaket_SAMStore.load({params:{wo_num: me.wo_num,so_num: me.so_num,no_ppd: me.no_ppd,prod_id: me.prod_id}});

        var  deletebtn = me.query('button[action="delete"]')[0],
            delete002btn = me.query('button[action="delete002"]')[0],
            delete003btn = me.query('button[action="delete003"]')[0],
            tambahbtn =  me.query('button[action="WOBB_SAMModel"]')[0],
            tambah002btn =  me.query('button[action="WOBJ_SAMModel"]')[0];
        if(selected.data.status==1 || selected.data.status==2){
            deletebtn.setDisabled(true);
            delete002btn.setDisabled(true);
            delete003btn.setDisabled(true);
            tambahbtn.setDisabled(true);
            tambah002btn.setDisabled(true);
        }else{
            deletebtn.setDisabled(false);
            delete002btn.setDisabled(false);
            delete003btn.setDisabled(false);
            tambahbtn.setDisabled(false);
            tambah002btn.setDisabled(false);
        }

    },
    onNewRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
        newModel = Ext.ModelManager.create({
        }, model);
        store.insert(0, newModel);
        plugin.startEdit(0, 0);

        if(Ext.ComponentQuery.query('#wo_num_sam')[0]){
            Ext.ComponentQuery.query('#wo_num_sam')[0].setValue(me.wo_num);
            Ext.ComponentQuery.query('#so_num_sam')[0].setValue(me.so_num);
            Ext.ComponentQuery.query('#no_ppd_sam')[0].setValue(me.no_ppd);
            Ext.ComponentQuery.query('#prod_id_sam')[0].setValue(me.prod_id);
            Ext.ComponentQuery.query('#sat_id_sam')[0].setValue('KG');
        }
        if(Ext.ComponentQuery.query('#wo_num_sam2')[0]){
            Ext.ComponentQuery.query('#wo_num_sam2')[0].setValue(me.wo_num);
            Ext.ComponentQuery.query('#so_num_sam2')[0].setValue(me.so_num);
            Ext.ComponentQuery.query('#no_ppd_sam2')[0].setValue(me.no_ppd);
            Ext.ComponentQuery.query('#prod_id_sam2')[0].setValue(me.prod_id);
            Ext.ComponentQuery.query('#sat_id_sam2')[0].setValue('KG');
        }
        if(Ext.ComponentQuery.query('#tgl_input_sam')[0]){
            Ext.ComponentQuery.query('#tgl_input_sam')[0].setValue(new Date());
        }


    },
    onNewPaket:function(btn){
        var me = this;
        var form = me.win.down('form').getForm();
        if(form.isValid()){
            form.findField('wo_num').setValue(me.wo_num);
            form.findField('no_ppd').setValue(me.no_ppd);
            form.findField('jml_paket').setValue(Ext.ComponentQuery.query('#jml_paket_wo_sam')[0].getValue());
            var values = form.getValues();
            WO_SAM.addWOBBPaket_SAM(values,function(provider, response){
                if (response.type == 'exception'){
                    Ext.MessageBox.alert('Error', response.message);
                }
            });
        }
        me.WOBBPaket_SAMStore.load({params:{wo_num: me.wo_num,so_num: me.so_num,no_ppd: me.no_ppd,prod_id: me.prod_id}});


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
        this.WO_SAMStore.load();
        this.WOBBPaket_SAMStore.load();
        this.WOBB_SAMStore.load();
        this.WOBJ_SAMStore.load();
        this.WOBJM_SAMStore.load();
        callback(true);
    }
});
//ens LogPage class