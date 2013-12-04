Ext.define('App.view.transaksi.workorder.WO_BB_Mix', {
    extend: 'App.ux.RenderPanel',
    id: 'panelWO_BB_Mix',
    pageTitle: 'WO Campuran',
    pageLayout: 'anchor',
    initComponent : function()
    {
        var me = this;
        me.wo_num = null;
        me.so_num = null;
        me.no_ppd = null;
        me.prod_id = null;

        Ext.define('WO_MixModel', {
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
                {name: 'userinput',type: 'string'},
                {name: 'useredit',type: 'string'},
                {name: 'timeinput',type: 'date'},
                {name: 'timeedit',type: 'date'},
                {name: 'qtybb',type: 'string'},
                {name: 'qtybj',type: 'string'},
                {name: 'qtybdp',type: 'string'},
                {name: 'qtyso',type: 'string'},
                {name: 'pabrik_produksi',type: 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: WO_BB_Formula.getWO_BB_Formula,
                    create: WO_BB_Formula.addWO_BB_Formula,
                    destroy: WO_BB_Formula.deleteWO_BB_Formula
                }
            }

        });
        Ext.define('WO_BBMixModel', {
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
                {name: 'darigudang',type: 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: WO_BB_Formula.getWO_BB_FormulaDetail,
                    create: WorkOrder1.addWO_NoFormula,
                    update: WorkOrder1.updateWO_NoFormula,
                    destroy: WorkOrder1.deleteWO_NoFormula
                }
            }

        });
        Ext.define('WO_BJMixModel', {
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
                {name: 'darigudang',type: 'string'}
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
        me.WO_MixStore = Ext.create('Ext.data.Store', {
            storeId : 'WO_MixStore',
            model : 'WO_MixModel',
            remoteSort : false
        });
        me.WO_BBMixStore = Ext.create('Ext.data.Store', {
            storeId : 'WO_BBMixStore',
            model : 'WO_BBMixModel',
            remoteSort : false
        });
        me.WO_BJMixStore = Ext.create('Ext.data.Store', {
            storeId : 'WO_BJMixStore',
            model : 'WO_BJMixModel',
            remoteSort : false
        });
        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit','tanggal']
        }
        me.WO_MixGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('WO_MixStore'),
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
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
                                    width:400,
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
                                            xtype: 'numberfield',
                                            hideTrigger: true,
                                            width: 200,
                                            name : 'shift',
                                            fieldLabel: 'Shift',
                                            value:1
                                        }
                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:400,
                                    layout:'anchor',
                                    items:[

                                        {
                                            xtype: 'textfield',
                                            width: 300,
                                            name : 'ka_shift',
                                            fieldLabel: 'KA Shift'
                                        },
                                        {
                                            xtype: 'textfield',
                                            width: 385,
                                            name : 'keterangan',
                                            fieldLabel: 'Keterangan'
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
                {header: 'Qty SO',sortable: true,dataIndex: 'qtyso',align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header: 'Qty BB',sortable: true,dataIndex: 'qtybb',align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header: 'Qty BDP',sortable: true,dataIndex: 'qtybdp',align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header: 'Qty BJ',sortable: true,dataIndex: 'qtybj',align:'right',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header: 'Formula',sortable: true,dataIndex: 'formula_id'},
                {header: 'KA Shift',sortable: true,dataIndex: 'ka_shift'},
                {header: 'Pabrik',sortable: true,dataIndex: 'pabrik_produksi', hidden:true},
                {header: 'status',sortable: true,dataIndex: 'status', hidden:true},
                {header: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'WO_MixModel',
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
        me.WO_BBMixGrid = Ext.create('Ext.grid.Panel', {
            title:'Bahan Baku',
            store: Ext.data.StoreManager.lookup('WO_BBMixStore'),
            height: 270,
            margin: '0 0 3 0',
            region: 'north',
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
                                            itemId:'wo_num_mix',
                                            hidden: true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode SO',
                                            name:'so_num',
                                            itemId:'so_num_mix',
                                            hidden: true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode PPD',
                                            name:'no_ppd',
                                            itemId:'no_ppd_mix',
                                            hidden: true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode Produk',
                                            name:'prod_id',
                                            itemId:'prod_id_mix',
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
                                            itemId:'sat_id_mix',
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
                {header : 'co_id', dataIndex : 'co_id',width : 200, hidden: true},
                {header : 'so_num', dataIndex : 'so_num',width : 150, hidden: true},
                {header : 'prod_id', dataIndex : 'prod_id',width : 150, hidden: true},
                {header : 'BB Id', dataIndex : 'bb_id'},
                {header : 'Bahan Baku', dataIndex : 'bb_nama',flex:1, summaryRenderer: function(){
                    return '<b>Total</b>';
                }},
                {header : 'qty_in', dataIndex : 'qty_in', hidden:true},
                {header : 'Paket', dataIndex : 'jml_paket', hidden:true},
                {header : 'Qty BB', dataIndex : 'total_qty_in',renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'satuan', dataIndex : 'sat_id'},
                {header : 'Darigudang', dataIndex : 'darigudang'}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'WO_BBMixModel',
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
        me.WO_BJMixGrid = Ext.create('Ext.grid.Panel', {
            title:'Barang Jadi',
            store: Ext.data.StoreManager.lookup('WO_BJMixStore'),
            height: 270,
            margin: '0 0 3 0',
            region: 'north',
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
                                            itemId:'wo_num_mix2',
                                            hidden: true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode SO',
                                            name:'so_num',
                                            itemId:'so_num_mix2',
                                            hidden: true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode PPD',
                                            name:'no_ppd',
                                            itemId:'no_ppd_mix2',
                                            hidden: true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode Produk',
                                            name:'for_prod_id',
                                            itemId:'prod_id_mix2',
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
                                            itemId:'sat_id_mix2',
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
                    action:'WO_BJMixModel',
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
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.WO_BBMixGrid,  me.WO_BJMixGrid]
        });
        me.pageBody = [me.WO_MixGrid, me.FormulirPanel];
        me.callParent(arguments);

    }, // end of initComponent

    onGridClick: function(grid, selected){
        var me = this;
        me.wo_num = selected.data.wo_num;
        me.so_num = selected.data.so_num;
        me.no_ppd = selected.data.no_ppd;
        me.prod_id = selected.data.prod_id;
        me.WO_BBMixStore.load({params:{wo_num: me.wo_num,so_num: me.so_num,no_ppd: me.no_ppd,prod_id: me.prod_id}});
        me.WO_BJMixStore.load({params:{wo_num: me.wo_num,so_num: me.so_num,no_ppd: me.no_ppd,for_prod_id: me.prod_id}});

        var  deletebtn = me.query('button[action="delete"]')[0],
            delete002btn = me.query('button[action="delete002"]')[0],
            delete003btn = me.query('button[action="delete003"]')[0],
            tambahbtn =  me.query('button[action="WO_BBMixModel"]')[0],
            tambah002btn =  me.query('button[action="WO_BJMixModel"]')[0];
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

        if(Ext.ComponentQuery.query('#wo_num_mix')[0]){
            Ext.ComponentQuery.query('#wo_num_mix')[0].setValue(me.wo_num);
            Ext.ComponentQuery.query('#so_num_mix')[0].setValue(me.so_num);
            Ext.ComponentQuery.query('#no_ppd_mix')[0].setValue(me.no_ppd);
            Ext.ComponentQuery.query('#prod_id_mix')[0].setValue(me.prod_id);
            Ext.ComponentQuery.query('#sat_id_mix')[0].setValue('KG');
        }
        if(Ext.ComponentQuery.query('#wo_num_mix2')[0]){
            Ext.ComponentQuery.query('#wo_num_mix2')[0].setValue(me.wo_num);
            Ext.ComponentQuery.query('#so_num_mix2')[0].setValue(me.so_num);
            Ext.ComponentQuery.query('#no_ppd_mix2')[0].setValue(me.no_ppd);
            Ext.ComponentQuery.query('#prod_id_mix2')[0].setValue(me.prod_id);
            Ext.ComponentQuery.query('#sat_id_mix2')[0].setValue('KG');
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
        this.WO_MixStore.load();
        this.WO_BBMixStore.load();
        this.WO_BJMixStore.load();
        callback(true);
    }
});
//ens LogPage class