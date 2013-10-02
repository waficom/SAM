Ext.define('App.view.transaksi.workorder.WO_NoFormula', {
    extend: 'App.ux.RenderPanel',
    id: 'panelWO_NoFormula',
    pageTitle: 'WorkOrder Tanpa Formula',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.currProduksi = null;
        me.currSo_num = null;
        me.currProd_id = null;
        me.currFormula = null;
        me.currWo_num = null;

        Ext.define('Wo1Model', {
            extend: 'Ext.data.Model',
            fields: [
                 {name: 'no_pp',type: 'string'}
                ,{name: 'no_ppd',type: 'string'}
                ,{name: 'so_num',type: 'string'}
                ,{name: 'cust_nama',type: 'string'}
                ,{name: 'qty_produksi',type: 'string'}
                ,{name: 'qty',type: 'string'}
                ,{name: 'formula_nama',type: 'string'}
                ,{name: 'formula_id',type: 'string'}
                ,{name: 'prod_nama',type: 'string'}
                ,{name: 'prod_id',type: 'string'}
                ,{name: 'kemasan_nama',type: 'string'}
                ,{name: 'spesifikasi_nama',type: 'string'}
                ,{name: 'est_finishdate',type: 'date'}
                ,{name: 'timeedit',type: 'date'}
                ,{name: 'useredit',type: 'string'}
                ,{name: 'userinput',type: 'string'}

            ],
            proxy: {
                type: 'direct',
                api: {
                    read: WorkOrder1.getWorkOrder1
                }
            }
        });
        me.Wo1Store = Ext.create('Ext.data.Store', {
            model: 'Wo1Model',
            autoLoad: false
        });

        Ext.define('Wo1DModel', {
            extend: 'Ext.data.Model',
            fields: [
                { name : 'co_id', type : 'string'},
                { name : 'no_ppd', type : 'string'},
                { name : 'wo_num', type : 'string'},
                { name : 'tgl',	type : 'date'},
                { name : 'shift', type : 'string'},
                { name : 'ka_shift', type : 'string'},
                { name : 'userinput', type : 'string'},
                { name : 'useredit', type : 'string'},
                { name : 'timeinput', type : 'date'},
                { name : 'timeedit', type : 'date'},
                { name : 'keterangan', type : 'string'},
                { name : 'prod_id', type : 'string'},
                { name : 'so_num', type : 'string'},
                { name : 'qty_bb', type : 'float'},
                { name : 'qty_bj', type : 'float'},
                { name : 'qty_susut', type : 'float'},
                { name : 'status', type : 'string'},
                { name : 'posted_date', type : 'date'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: WorkOrder1.getWorkOrder1Detail,
                    create: WorkOrder1.addWorkOrder1Detail,
                    update: WorkOrder1.updateWorkOrder1Detail,
                    destroy: WorkOrder1.deleteWorkOrder1Detail

                }
            }
        });
        me.Wo1DStore = Ext.create('Ext.data.Store', {
            model: 'Wo1DModel',
            autoLoad: false
        });

        Ext.define('Wo1DBahanJadiModel', {
            extend: 'Ext.data.Model',
            fields: [
                { name : 'co_id', type : 'string'},
                { name : 'wo_num', type : 'string'},
                { name : 'so_num', type : 'string'},
                { name : 'prod_id', type : 'string'},
                { name : 'qty', type : 'float'},
                { name : 'qty_pcs', type : 'float'},
                { name : 'gudang_id', type : 'string'},
                { name : 'keterangan', type : 'string'},
                { name : 'userinput', type : 'string'},
                { name : 'useredit', type : 'string'},
                { name : 'timeinput', type : 'date'},
                { name : 'timeedit', type : 'date'},
                { name : 'kegudang', type : 'string'},
                { name : 'no_ppd', type : 'string'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: WorkOrder1.getWorkOrder1DetailBJadi,
                    create: WorkOrder1.addWorkOrder1DetailBJadi,
                    update: WorkOrder1.updateWorkOrder1DetailBJadi,
                    destroy: WorkOrder1.deleteWorkOrder1DetailBJadi

                }
            }
        });
        me.Wo1DBahanJadiStore = Ext.create('Ext.data.Store', {
            model: 'Wo1DBahanJadiModel',
            autoLoad: false
        });

        Ext.define('Wo1DBahanBakuModel', {
            extend: 'Ext.data.Model',
            fields: [
                { name : 'co_id', type : 'string'},
                { name : 'wo_num', type : 'string'},
                { name : 'so_num', type : 'string'},
                { name : 'prod_id', type : 'string'},
                { name : 'formula_id', type : 'string'},
                { name : 'no_pp', type : 'string'},
                { name : 'no_ppd', type : 'string'},
                { name : 'bb_id', type : 'string'},
                { name : 'bb_nama', type : 'string'},
                { name : 'total_qty_in', type : 'integer'},
                { name : 'qty_in', type : 'integer'},
                { name : 'sat_id', type : 'string'},
                { name : 'darigudang', type : 'string'},
                { name : 'kegudang', type : 'string'}


            ],
            proxy: {
                type: 'direct',
                api: {
                    read: WorkOrder1.getWorkOrder1DetailBBaku,
                    create: WorkOrder1.addWO_NoFormula,
                    destroy: WorkOrder1.deleteWO_NoFormula

                }
            }
        });
        me.Wo1DBahanBakuStore = Ext.create('Ext.data.Store', {
            model: 'Wo1DBahanBakuModel',
            autoLoad: false
        });

        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit']

        }

        /**
         * Lists Grid
         */
        me.Wo1Grid = Ext.create('App.ux.GridPanel', {
            store: me.Wo1Store,
            itemId: 'Wo1Grid',
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            enablePaging: true,
            columns: [
                {text: 'No. Produksi', sortable: false, dataIndex: 'no_pp', hidden: true},
                {text: 'Dp Num', sortable: false, dataIndex: 'no_ppd'},
                {text: 'So Num', sortable: false,dataIndex: 'so_num'},
                {text: 'Customer', sortable: false,dataIndex: 'cust_nama', flex:1},
                {text: 'Qty SO', sortable: false,dataIndex: 'qty'},
                {text: 'Formula ID', sortable: false,dataIndex: 'formula_id', hidden:true},
                {text: 'Formula', sortable: false,dataIndex: 'formula_nama'},
                {text: 'Produk Id', sortable: false,dataIndex: 'prod_id', hidden:true},
                {text: 'Produk', sortable: false,dataIndex: 'prod_nama'},
                {text: 'Kemasan', sortable: false,dataIndex: 'kemasan_nama'},
                {text: 'Spesifikasi', sortable: false,dataIndex: 'spesifikasi_nama'},
                {text: 'status',sortable: false,dataIndex: 'status', hidden: true},
                {text: 'Est. Selesai', width:70, sortable: true, dataIndex: 'est_finishdate', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'LastUpdate', width : 80, sortable: false, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            listeners: {
                scope: me,
                select: me.onProduksiGridClick
            },
            features:[searching],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange1',
                            items : [
                                {
                                    xtype : 'datefield',
                                    itemId : 'datefrom',
                                    fieldLabel : 'Dari',
                                    labelWidth : 35,
                                    width : 150,
                                    format : 'd-m-Y',
                                    value : new Date()
                                }]
                        },'-',{
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange',
                            items : [

                                {
                                    xtype : 'datefield',
                                    itemId : 'dateto',
                                    fieldLabel : ' / ',
                                    labelWidth : 10,
                                    width : 150,
                                    format : 'd-m-Y',
                                    value : new Date()
                                }]
                        },{
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerSearch',
                            layout : 'vbox',
                            items : [
                                {
                                    xtype : 'button',
                                    width : 80,
                                    margin : '0 0 3 0',
                                    text : 'Cari',
                                    listeners :
                                    {
                                        scope : me,
                                        click : me.ReloadGrid
                                    }
                                }]
                        },'->',
                        {
                            xtype:'displayfield',
                            itemId:'itemuserinput',
                            margin : '0 5 0 0'
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.ProduksiStore,
                    beforePageText: 'Page',
                    afterPageText: 'of {0}',
                    displayMsg: 'Diplay {0} - {1} Of {2}',
                    emptyMsg: 'No Record Found',
                    dock: 'bottom',
                    displayInfo: true,
                    pageSize: 5

                }
            ]

        });
        /**
         * Options Grid
         */
        me.Wo1DGrid = Ext.create('App.ux.GridPanel', {
            store: me.Wo1DStore,
            region: 'center',
            enablePaging: true,
            columns: [
                {header : 'co_id', dataIndex : 'co_id',width : 200, hidden: true},
                {header : 'ppd', dataIndex : 'no_ppd',width : 200, hidden: true},
                {header : 'so_num', dataIndex : 'so_num',width : 200, hidden: true},
                {header : 'prod_id', dataIndex : 'prod_id',width : 200, hidden: true},
                {header : 'Wo Num', dataIndex : 'wo_num',width : 100},
                {header : 'Tanggal',dataIndex : 'tgl',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100},
                {header : 'Shift#',dataIndex : 'shift'},
                {header : 'Kepala Shift',dataIndex : 'ka_shift',flex : 1},
                {header : 'Qty BB',dataIndex : 'qty_bb'},
                {header : 'Qty BJ',dataIndex : 'qty_bj'},
                {header : 'Qty Susut',dataIndex : 'qty_susut'},
                {header : 'Keterangan',dataIndex : 'keterangan',flex : 1},
                {text: 'status', width:100, sortable: false,dataIndex: 'status', hidden: true},
                {header : 'LastUpdate',dataIndex : 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100}
            ],
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1'? 'child-row' : record.get('status') == '2'? 'adult-row' : '';
                }
            },
            listeners: {
                scope: me,
                select: me.onProduksiGridClick2,
                itemdblclick: function(view, record){
                    var form = this.winform1.down('form');
                    if(me.currStatus != 1){
                        me.onItemdblclick1(me.Wo1DStore, record, 'Edit Detail Work Order', me.winform1, form);
                        Ext.getCmp('post_wo_noformula').enable();
                    }

                }
            },
            features:[searching],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        text: 'Add',
                        iconCls: 'icoAddRecord',
                        scope: me,
                        handler: function(){
                            var form1 = me.winform1.down('form');
                            me.onNewProduksi1(form1, 'Wo1DModel', 'Tambah Data', me.winform1);
                            Ext.getCmp('post_wo_noformula').disable();
                        }
                    },
                        {
                            xtype: 'button',
                            text: 'Delete',
                            iconCls: 'delete',
                            id:'dlt_wo_noformula',
                            handler: function() {
                                me.deleteProduksi1(me.Wo1DStore, me.Wo1DGrid);
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'BAHAN BAKU',
                            itemId:'BahanBaku',
                            id:'addBB_noformula',
                            disabled:true,
                            scope: me,
                            handler: function(){

                                me.ShowGridPopup(me.Wo1DBahanBakuStore, 'Bahan Baku',me.Wo1DBahanBakuGrid);

                            }
                        },
                        {
                            xtype: 'button',
                            text: 'BARANG JADI',
                            id:'addBJ_noformula',
                            disabled:true,
                            scope: me,
                            handler: function(){
                                me.ShowGridPopup(me.Wo1DBahanJadiStore, 'Barang Jadi',me.Wo1DBahanJadiGrid);

                            }
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.Wo1DGrid,
                    beforePageText: 'Page',
                    afterPageText: 'of {0}',
                    displayMsg: 'Diplay {0} - {1} Of {2}',
                    emptyMsg: 'No Record Found',
                    dock: 'bottom',
                    displayInfo: true,
                    pageSize: 5

                }
            ]
        });

        me.Wo1DBahanBakuGrid = Ext.create('App.ux.GridPanel', {
            store: me.Wo1DBahanBakuStore,
            region: 'center',
            enablePaging: true,
            columns: [
                {header : 'co_id', dataIndex : 'co_id',width : 200, hidden: true},
                {header : 'wo_num', dataIndex : 'wo_num',width : 150, hidden: true},
                {header : 'so_num', dataIndex : 'so_num',width : 150, hidden: true},
                {header : 'prod_id', dataIndex : 'prod_id',width : 150, hidden: true},
                {header : 'BB ID', dataIndex : 'bb_id'},
                {header : 'Bahan Baku', dataIndex : 'bb_nama',flex:1},
                {header : 'Sat', dataIndex : 'sat_id'},
                {header : 'Qty', dataIndex : 'total_qty_in'},
                {header : 'Dari Gdg', dataIndex : 'darigudang'},
                {header : 'Ke Gdg', dataIndex : 'kegudang'}
            ],
            features:[searching],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype : 'fieldcontainer',
                            items : [
                                {
                                    xtype: 'xtBahanBakuPopup',
                                    width: 150,
                                    name : 'bb_id',
                                    fieldLabel: 'BB',
                                    labelWidth : 30,
                                    id:'bb_id_noformula'
                                }]
                        },
                        {
                            xtype : 'fieldcontainer',
                            items : [
                                {
                                    xtype: 'textfield',
                                    width: 100,
                                    name : 'total_qty_in',
                                    fieldLabel: 'Qty',
                                    id:'qty_bb_noformula',
                                    labelWidth : 30
                                }]
                        },{
                            xtype : 'fieldcontainer',
                            items : [
                                {
                                    xtype: 'xtSatuanPopup',
                                    width: 100,
                                    name : 'sat_id',
                                    fieldLabel: 'Sat',
                                    id:'sat_bb_noformula',
                                    labelWidth : 30
                                }]
                        },{
                            xtype : 'fieldcontainer',
                            items : [
                                {
                                    xtype: 'xtGudangBMPopup',
                                    width: 150,
                                    name : 'darigudang',
                                    fieldLabel: 'Dari Gdg',
                                    id:'drgdg_bb_noformula',
                                    labelWidth : 50
                                }]
                        },{
                            xtype : 'fieldcontainer',
                            items : [
                                {
                                    xtype: 'xtGudangBJPopup',
                                    width: 150,
                                    name : 'kegudang',
                                    fieldLabel: 'Ke Gdg',
                                    id:'kegdg_bb_noformula',
                                    labelWidth : 50
                                }]
                        },{
                        text: 'Add',
                        iconCls: 'icoAddRecord',
                        scope: me,
                        handler: function(){
                            var form =me.winformBahanBaku.down('form').getForm();
                            if(form.isValid()){
                                form.findField('wo_num').setValue(me.currWo_num);
                                form.findField('no_ppd').setValue(me.currProduksi);
                                form.findField('prod_id').setValue(me.currProd_id);
                                form.findField('so_num').setValue(me.currSo_num);
                                form.findField('bb_id').setValue(Ext.getCmp('bb_id_noformula').getValue());
                                form.findField('total_qty_in').setValue(Ext.getCmp('qty_bb_noformula').getValue());
                                form.findField('sat_id').setValue(Ext.getCmp('sat_bb_noformula').getValue());
                                form.findField('darigudang').setValue(Ext.getCmp('drgdg_bb_noformula').getValue());
                                form.findField('kegudang').setValue(Ext.getCmp('kegdg_bb_noformula').getValue());
                                var values = form.getValues();
                                WorkOrder1.addWO_NoFormula(values,function(provider, response){
                                });
                                me.Wo1DBahanBakuStore.load({params:{so_num: me.currSo_num ,wo_num: me.currWo_num, prod_id: me.currProd_id}});
                            }
                        }
                    }, {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            id:'dlt_dt_noformula',
                            handler:function() {
                                me.deleteDetailBB_NoFormula(me.Wo1DBahanBakuStore);
                            }
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.Wo1DBahanBakuGrid,
                    beforePageText: 'Page',
                    afterPageText: 'of {0}',
                    displayMsg: 'Diplay {0} - {1} Of {2}',
                    emptyMsg: 'No Record Found',
                    dock: 'bottom',
                    displayInfo: true,
                    pageSize: 5

                }
            ]
        });
        me.Wo1DBahanJadiGrid = Ext.create('App.ux.GridPanel', {
            store: me.Wo1DBahanJadiStore,
            region: 'center',
            enablePaging: true,
            columns: [
                {header : 'co_id', dataIndex : 'co_id',width : 200, hidden: true},
                {header : 'so_num', dataIndex : 'so_num',width : 200, hidden: true},
                {header : 'prod_id', dataIndex : 'prod_id',flex:1},
                {header : 'no_ppd', dataIndex : 'no_ppd',width : 200, hidden: true},
                {header : 'Wo Num', dataIndex : 'wo_num', hidden:true},
                {header : 'Qty',dataIndex : 'qty'},
                {header : 'Qty/Sak',dataIndex : 'qty_pcs'},
                {header : 'Dari Gdg',dataIndex : 'gudang_id'},
                {header : 'Ke Gdg',dataIndex : 'kegudang'},
                {header : 'LastUpdate',dataIndex : 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100}
            ],
            features:[searching],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype : 'fieldcontainer',
                            items : [
                                {
                                    xtype: 'textfield',
                                    width: 100,
                                    name : 'qty',
                                    fieldLabel: 'Qty',
                                    id:'qty_bj_noformula',
                                    labelWidth : 30
                                }]
                        },{
                            xtype : 'fieldcontainer',
                            items : [
                                {
                                    xtype: 'xtSatuanPopup',
                                    width: 100,
                                    name : 'sat_id',
                                    fieldLabel: 'Sat',
                                    id:'sat_bj_noformula',
                                    labelWidth : 30
                                }]
                        },{
                            xtype : 'fieldcontainer',
                            items : [
                                {
                                    xtype: 'textfield',
                                    width: 100,
                                    name : 'qty_pcs',
                                    fieldLabel: 'Qty/Sak',
                                    id:'qtypcs_bj_noformula',
                                    labelWidth : 50
                                }]
                        },{
                            xtype : 'fieldcontainer',
                            items : [
                                {
                                    xtype: 'xtGudangBMPopup',
                                    width: 150,
                                    name : 'darigudang',
                                    fieldLabel: 'Dari Gdg',
                                    id:'drgdg_bj_noformula',
                                    labelWidth : 50
                                }]
                        },{
                            xtype : 'fieldcontainer',
                            items : [
                                {
                                    xtype: 'xtGudangBJPopup',
                                    width: 150,
                                    name : 'kegudang',
                                    fieldLabel: 'Ke Gdg',
                                    id:'kegdg_bj_noformula',
                                    labelWidth : 50
                                }]
                        },
                        {
                        text: 'Add',
                        iconCls: 'icoAddRecord',
                        scope: me,
                        handler: function(){
                            var form = me.winformBahanJadi.down('form').getForm();;
                            if(form.isValid()){
                                form.findField('wo_num').setValue(me.currWo_num);
                                form.findField('no_ppd').setValue(me.currProduksi);
                                form.findField('prod_id').setValue(me.currProd_id);
                                form.findField('so_num').setValue(me.currSo_num);
                                form.findField('qty').setValue(Ext.getCmp('qty_bj_noformula').getValue());
                                form.findField('qty_pcs').setValue(Ext.getCmp('qtypcs_bj_noformula').getValue());
                                form.findField('sat_id').setValue(Ext.getCmp('sat_bj_noformula').getValue());
                                form.findField('gudang_id').setValue(Ext.getCmp('drgdg_bj_noformula').getValue());
                                form.findField('kegudang').setValue(Ext.getCmp('kegdg_bj_noformula').getValue());
                                var values = form.getValues();
                                WorkOrder1.addWorkOrder1DetailBJadi(values,function(provider, response){
                                });
                                me.Wo1DBahanJadiStore.load({params:{so_num: me.currSo_num ,wo_num: me.currWo_num, prod_id: me.currProd_id}});
                            }
                        }
                    },
                        {
                            xtype: 'button',
                            text: 'Delete',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteDetailBJ_NoFormula(me.Wo1DBahanJadiStore, me.Wo1DBahanJadiGrid);
                            }
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.Wo1DBahanJadiGrid,
                    beforePageText: 'Page',
                    afterPageText: 'of {0}',
                    displayMsg: 'Diplay {0} - {1} Of {2}',
                    emptyMsg: 'No Record Found',
                    dock: 'bottom',
                    displayInfo: true,
                    pageSize: 5

                }
            ]
        });

        // *************************************************************************************
        // Window User Form
        // *************************************************************************************
        me.winform1 = Ext.create('App.ux.window.Window', {
            width: 400,
            items: [
                {
                    xtype: 'mitos.form',
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 100
                    },
                    defaultType: 'textfield',
                    //hideLabels      : true,
                    defaults: {
                        labelWidth: 89,
                        anchor: '100%',
                        layout: {
                            type: 'hbox',
                            defaultMargins: {
                                top: 0,
                                right: 5,
                                bottom: 0,
                                left: 0
                            }
                        }
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'no_ppd'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'prod_id'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'so_num'
                        },
                        {
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Tanggal :'
                                },
                                {
                                    fieldLabel : 'Tanggal',
                                    xtype : 'datefield',
                                    width : 100,
                                    name : 'tgl',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s',
                                    value: new Date(),
                                    maxValue: new Date(),
                                    allowBlank:false
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'shiff :'
                                },
                                {
                                    fieldLabel : 'Shift',
                                    labelAlign : 'right',
                                    xtype: 'mitos.UpperCaseTextField',
                                    name: 'shift'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'kepala shiff # :'
                                },
                                {
                                    fieldLabel : 'Shift',
                                    labelAlign : 'right',
                                    xtype: 'mitos.UpperCaseTextField',
                                    name: 'ka_shift'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'keterangan:'
                                },
                                {
                                    fieldLabel : 'Ketarangan',
                                    labelAlign : 'right',
                                    name: 'keterangan',
                                    xtype: 'textfield'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [

                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Posting'
                                },
                                {
                                    xtype: 'mitos.checkbox',
                                    name : 'status',
                                    id:'post_wo',
                                    handler: function(field, value) {
                                        if (value== true) {
                                            Ext.getCmp('posted_date_wo_noformula').setDisabled(false);
                                            Ext.getCmp('posted_date_wo_noformula').setValue(new Date());
                                        }else{
                                            Ext.getCmp('posted_date_wo_noformula').setDisabled(true);
                                        }

                                    }

                                },
                                {
                                    xtype : 'datefield',
                                    width : 100,
                                    name : 'posted_date',
                                    format : 'd-m-Y',
                                    disabled: true,
                                    maxValue: new Date(),
                                    allowBlank:false,
                                    id:'posted_date_wo_noformula'
                                }
                            ]
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: i18n('save'),
                    cls: 'winSave',
                    handler: function(){
                        var form = me.winform1.down('form').getForm();
                        if(form.isValid()){
                            me.onProduksi1Save(form, me.Wo1DStore, me.winform1);
                        }
                    }
                },
                '-',
                {
                    text: i18n('cancel'),
                    scope: me,
                    handler: function(btn){
                        btn.up('window').close();
                    }
                }
            ],
            features:[searching],
            listeners: {
                scope: me,
                close: function(){
                    me.action1('close', me.winform1);
                }
            }
        });
        me.winformBahanBaku = Ext.create('App.ux.window.Window', {
            width: 400,
            items: [
                {
                    xtype: 'mitos.form',
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 100
                    },
                    defaultType: 'textfield',
                    items: [
                        {xtype: 'textfield',hidden: true,name: 'wo_num'},
                        {xtype: 'textfield',hidden: true,name: 'so_num'},
                        {xtype: 'textfield',hidden: true,name: 'prod_id'},
                        {xtype: 'textfield',hidden: true,name: 'no_ppd'},
                        {xtype: 'textfield',hidden: true,name: 'bb_id'},
                        {xtype: 'textfield', hidden: true,name: 'total_qty_in'},
                        {xtype: 'textfield',hidden: true,name: 'sat_id' },
                        {xtype: 'textfield',hidden: true,name: 'darigudang' },
                        {xtype: 'textfield', hidden: true,name: 'kegudang'}
                    ]
                }

            ]
        });

        me.winformBahanJadi = Ext.create('App.ux.window.Window', {
            width: 400,
            items: [
                {
                    xtype: 'mitos.form',
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 100
                    },
                    defaultType: 'textfield',
                    items: [
                        {xtype: 'textfield',hidden: true,name: 'wo_num'},
                        {xtype: 'textfield',hidden: true,name: 'so_num'},
                        {xtype: 'textfield',hidden: true,name: 'prod_id'},
                        {xtype: 'textfield',hidden: true,name: 'no_ppd'},
                        {xtype: 'textfield', hidden: true,name: 'qty'},
                        {xtype: 'textfield', hidden: true,name: 'qty_pcs'},
                        {xtype: 'textfield',hidden: true,name: 'sat_id' },
                        {xtype: 'textfield',hidden: true,name: 'gudang_id' },
                        {xtype: 'textfield', hidden: true,name: 'kegudang'}
                    ]
                }
            ]
        });



        me.pageBody = [me.Wo1Grid, me.Wo1DGrid];
        me.callParent(arguments);
    },
    ShowGridPopup: function(store, title, grid){
        var me=this;
        this.myWinChooseItem= Ext.create('App.ux.window.Window',{
            layout: 'fit',
            title: title,
            width: 800,
            height: 400,
            items:[grid],
            modal:true

        });
        store.load({params:{so_num: me.currSo_num, wo_num:me.currWo_num, prod_id:me.currProd_id}});
        this.myWinChooseItem.show();
    },

    setForm: function(form, title){
        form.up('window').setTitle(title);
    },
    openWin1: function(){
        this.winform1.show();
    },

    action1: function(action, window){
        var winf = window, form = winf.down('form');
        if(action == 'close'){
            form.getForm().reset();
        }
    },

    onItemdblclick1: function(store, record, title, window, form){

        this.setForm(form, title);
        form.getForm().loadRecord(record);
        this.action1('old',window);
        window.show();
    },

    /**
     *
     * @param grid
     * @param selected
     */

    onProduksiGridClick: function(grid, selected){
        var me = this;
        me.currProduksi = selected.data.no_ppd;
        me.currFormula = selected.data.formula_id;
        me.currProd_id = selected.data.prod_id;
        me.currSo_num = selected.data.so_num;
        me.Wo1DStore.load({params:{so_num: me.currSo_num, no_ppd: me.currProduksi, prod_id: me.currProd_id}});

    },
    onProduksiGridClick2: function(grid, selected){
        var me = this;
        me.currWo_num = selected.data.wo_num;
        me.currSo_num = selected.data.so_num;
        me.currProd_id = selected.data.prod_id;
        me.currStatus = selected.data.status;
        me.CountBB = selected.data.qty_bb;
        me.CountDP = 0;
        me.CountBJ = selected.data.qty_bj;
        Ext.getCmp('addBB_noformula').setDisabled(false);
        Ext.getCmp('addBJ_noformula').setDisabled(false);
        Ext.getCmp('addbbproses').setDisabled(false);
        if(me.currStatus == 1 || me.currStatus == 2){
            Ext.getCmp('dlt_wo_noformula').setDisabled(true);
            Ext.getCmp('addBB_noformula').setDisabled(true);
            Ext.getCmp('addBJ_noformula').setDisabled(true);

        }else{
            Ext.getCmp('dlt_wo_noformula').setDisabled(false);
            Ext.getCmp('addBB_noformula').setDisabled(false);
            Ext.getCmp('addBJ_noformula').setDisabled(false);
        }


    },

    onProduksi1Save: function(form, store, window){
        var me = this;
        me.saveProduksi1(form, store, window);
    },
    saveProduksi1: function(form, store, window){
        var me = this;
        var StatusPosting = form.findField('status').getValue();

        if(StatusPosting){
            me.CallFunctionSave(form, store, window);

        }else{
            me.CallFunctionSave(form, store, window);
        }
    },
    CallFunctionSave: function(form, store, window){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record),
            f = me.winform1.down('form').getForm(), rec = f.getRecord();
        form.findField('no_ppd').setValue(me.currProduksi);
        form.findField('prod_id').setValue(me.currProd_id);
        form.findField('so_num').setValue(me.currSo_num);
        values = form.getValues();
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                window.close();
                store.load({params:{so_num: me.currSo_num ,no_ppd: me.currProduksi, prod_id: me.currProd_id}});
            },
            failure:function(){
                Ext.MessageBox.alert('Opps', 'Error..!!');
                //me.msg('Opps!', 'Error!!', true);
            }
        });

    },

    onProduksi3Save: function(form, store, window){
        var me = this;
        me.saveProduksi3(form, store, window);
    },


    deleteProduksi1: function(store, grid){
        var me = this,
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('wo_num');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
                    store.remove(sm.getSelection());
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        })
    },

    deleteDetailBJ_NoFormula: function(store, grid){
        var me = this,
            sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('prod_id');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
                    store.remove(sm.getSelection());
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        })
    },
    deleteDetailBB_NoFormula: function(store){
        var me = this, grid = me.Wo1DBahanBakuGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('bb_id');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
                    store.remove(sm.getSelection());
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        });
    },
    ReloadGrid : function(btn)
    {
        // Declare some variables
        var topBarItems = this.Wo1Grid.getDockedItems('toolbar[dock="top"]')[0],
            datefrom = topBarItems.getComponent( 'fieldContainerDateRange1' ).getComponent( 'datefrom' ).getValue( ),
            dateto = topBarItems.getComponent( 'fieldContainerDateRange' ).getComponent( 'dateto' ).getValue( );

        // Load the ExtJs dataStore with the new parameters
        this.Wo1Store.load({params:{datefrom : datefrom, dateto : dateto}});

    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        this.ReloadGrid();//this.Wo1Store.load({params:{start:0, limit:5}});
        this.Wo1DStore.load();
        callback(true);

    }
});
