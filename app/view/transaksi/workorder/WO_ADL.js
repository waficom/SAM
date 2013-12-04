Ext.define('App.view.transaksi.workorder.WO_ADL', {
    extend: 'App.ux.RenderPanel',
    id: 'panelWO_ADL',
    pageTitle: 'Manufaktur ADL',
    initComponent : function()
    {
        var me = this;
        me.wo_num = null;
        me.so_num = null;
        me.no_ppd = null;
        me.prod_id = null;

        Ext.define('WO_ADLModel', {
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
                    read: WO_ADL.getWO_ADL,
                    create: WO_ADL.addWO_ADL,
                    update: WO_ADL.updateWO_ADL,
                    destroy: WO_ADL.deleteWO_ADL
                }
            }

        });
        Ext.define('WOBB_ADLModel', {
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
                    read: WO_ADL.getWOBB_ADL,
                    create: WO_ADL.addWOBB_ADL,
                    update: WO_ADL.updateWOBB_ADL,
                    destroy: WO_ADL.deleteWOBB_ADL
                }
            }

        });
        Ext.define('WOBJ_ADLModel', {
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
        Ext.define('WOBJM_ADLModel', {
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
                    read: WO_ADL.getWOBJM_ADL,
                    update: WO_ADL.updateWOBJM_ADL
                }
            }

        });
        me.WO_ADLStore = Ext.create('Ext.data.Store', {
            storeId : 'WO_ADLStore',
            model : 'WO_ADLModel',
            remoteSort : false
        });
        me.WOBB_ADLStore = Ext.create('Ext.data.Store', {
            storeId : 'WOBB_ADLStore',
            model : 'WOBB_ADLModel',
            remoteSort : false
        });
        me.WOBJ_ADLStore = Ext.create('Ext.data.Store', {
            storeId : 'WOBJ_ADLStore',
            model : 'WOBJ_ADLModel',
            remoteSort : false
        });
        me.WOBJM_ADLStore = Ext.create('Ext.data.Store', {
            storeId : 'WOBJM_ADLStore',
            model : 'WOBJM_ADLModel',
            remoteSort : false
        });
        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit','tanggal']
        }
        me.WO_ADLGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('WO_ADLStore'),
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
                                            itemId:'tgl_input_adl',
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
                                                    Ext.ComponentQuery.query('#tgl_post_adl')[0].setDisabled(false);
                                                    Ext.ComponentQuery.query('#tgl_post_adl')[0].setValue(new Date());
                                                }else{
                                                    Ext.ComponentQuery.query('#tgl_post_adl')[0].setDisabled(true);
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
                                            itemId:'tgl_post_adl',
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
                    action:'WO_ADLModel',
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
        me.WOBB_ADLGrid = Ext.create('Ext.grid.Panel', {
            title:'Pemakaian Bahan Baku',
            store: Ext.data.StoreManager.lookup('WOBB_ADLStore'),
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
                                            itemId:'wo_num_adl',
                                            hidden: true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode SO',
                                            name:'so_num',
                                            itemId:'so_num_adl',
                                            hidden: true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode PPD',
                                            name:'no_ppd',
                                            itemId:'no_ppd_adl',
                                            hidden: true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode Produk',
                                            name:'prod_id',
                                            itemId:'prod_id_adl',
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
                                            itemId:'sat_id_adl',
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
                    action:'WOBB_ADLModel',
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
        me.WOBJ_ADLGrid = Ext.create('Ext.grid.Panel', {
            title:'Pemakaian Barang Jadi',
            store: Ext.data.StoreManager.lookup('WOBJ_ADLStore'),
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
                                            itemId:'wo_num_adl2',
                                            hidden: true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode SO',
                                            name:'so_num',
                                            itemId:'so_num_adl2',
                                            hidden: true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode PPD',
                                            name:'no_ppd',
                                            itemId:'no_ppd_adl2',
                                            hidden: true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode Produk',
                                            name:'for_prod_id',
                                            itemId:'prod_id_adl2',
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
                                            itemId:'sat_id_adl2',
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
                    action:'WOBJ_ADLModel',
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
        me.WOBJM_ADLGrid = Ext.create('Ext.grid.Panel', {
            title:'Barang Jadi Masuk',
            store: Ext.data.StoreManager.lookup('WOBJM_ADLStore'),
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
                                            fieldLabel:'Qty',
                                            name:'qty_sebelum_lembab',
                                            itemId:'qty_sebelum_lembab',
                                            width:200,
                                            enableKeyEvents: true,
                                            listeners: {
                                                'keyup':function(field, event){
                                                    var lembab_prs = Ext.ComponentQuery.query('#real_lembab_prs')[0].getValue(),
                                                        est_lembab_prs = Ext.ComponentQuery.query('#est_lembab_prs')[0].getValue();
                                                    Ext.ComponentQuery.query('#qty_adl')[0].setValue((field.value  * (lembab_prs/100) ) + field.value  );
                                                    Ext.ComponentQuery.query('#est_qty_adl')[0].setValue((field.value  * (est_lembab_prs/100) ) + field.value  );
                                                 }
                                            }
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel:'Kelembapan %',
                                            name:'real_lembab_prs',
                                            itemId:'real_lembab_prs',
                                            width:200,
                                            enableKeyEvents: true,
                                            listeners: {
                                                'keyup':function(field, event){
                                                    var qty_lembab = Ext.ComponentQuery.query('#qty_sebelum_lembab')[0].getValue();
                                                    Ext.ComponentQuery.query('#qty_adl')[0].setValue(((field.value/100) * qty_lembab ) + qty_lembab );
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel:'Total Qty',
                                            name:'qty',
                                            width:200,
                                            itemId:'qty_adl',
                                            readOnly: true
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
                                            hideTrigger: true,
                                            fieldLabel:'Est. Kelembapan %',
                                            name:'est_lembab_prs',
                                            itemId:'est_lembab_prs',
                                            width:200,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel:'Est. Total Qty',
                                            name:'est_qty',
                                            width:200,
                                            itemId:'est_qty_adl',
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
                {header : 'Kode Produk', dataIndex : 'prod_id',flex:1, summaryRenderer: function(){
                    return '<b>Total</b>';
                }},
                {header : 'Qty', dataIndex : 'qty_sebelum_lembab',renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'Total Qty', dataIndex : 'qty',renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'kelembapan %', dataIndex : 'real_lembab_prs',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'Est Total Qty', dataIndex : 'est_qty',renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'Est kelembapan %', dataIndex : 'est_lembab_prs',renderer: Ext.util.Format.numberRenderer('0,000.00')}

            ]
        });
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[me.WO_ADLGrid, me.WOBB_ADLGrid,  me.WOBJ_ADLGrid, me.WOBJM_ADLGrid]
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
        me.WOBB_ADLStore.load({params:{wo_num: me.wo_num,so_num: me.so_num,no_ppd: me.no_ppd,prod_id: me.prod_id}});
        me.WOBJ_ADLStore.load({params:{wo_num: me.wo_num,so_num: me.so_num,no_ppd: me.no_ppd,for_prod_id: me.prod_id}});
        me.WOBJM_ADLStore.load({params:{wo_num: me.wo_num,so_num: me.so_num,no_ppd: me.no_ppd}});

        var  deletebtn = me.query('button[action="delete"]')[0],
            delete002btn = me.query('button[action="delete002"]')[0],
            delete003btn = me.query('button[action="delete003"]')[0],
            tambahbtn =  me.query('button[action="WOBB_ADLModel"]')[0],
            tambah002btn =  me.query('button[action="WOBJ_ADLModel"]')[0];
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

        if(Ext.ComponentQuery.query('#wo_num_adl')[0]){
            Ext.ComponentQuery.query('#wo_num_adl')[0].setValue(me.wo_num);
            Ext.ComponentQuery.query('#so_num_adl')[0].setValue(me.so_num);
            Ext.ComponentQuery.query('#no_ppd_adl')[0].setValue(me.no_ppd);
            Ext.ComponentQuery.query('#prod_id_adl')[0].setValue(me.prod_id);
            Ext.ComponentQuery.query('#sat_id_adl')[0].setValue('KG');
        }
        if(Ext.ComponentQuery.query('#wo_num_adl2')[0]){
            Ext.ComponentQuery.query('#wo_num_adl2')[0].setValue(me.wo_num);
            Ext.ComponentQuery.query('#so_num_adl2')[0].setValue(me.so_num);
            Ext.ComponentQuery.query('#no_ppd_adl2')[0].setValue(me.no_ppd);
            Ext.ComponentQuery.query('#prod_id_adl2')[0].setValue(me.prod_id);
            Ext.ComponentQuery.query('#sat_id_adl2')[0].setValue('KG');
        }
        if(Ext.ComponentQuery.query('#tgl_input_adl')[0]){
            Ext.ComponentQuery.query('#tgl_input_adl')[0].setValue(new Date());
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
        this.WO_ADLStore.load();
        this.WOBB_ADLStore.load();
        this.WOBJ_ADLStore.load();
        this.WOBJM_ADLStore.load();
        callback(true);
    }
});
//ens LogPage class