Ext.define('App.view.transaksi.workorder.WorkOrder1', {
    extend: 'App.ux.RenderPanel',
    id: 'panelWO1',
    pageTitle: 'Produksi',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.currProduksi = null;
        me.currSo_num = null;
        me.currProd_id = null;
        me.currFormula = null;
        me.currWo_num = null;
        me.curr_coid = null;
        me.userinput =null;
        me.useredit=null;
        me.currStatus = null;
        //me.myWinChooseItem=null;

        Ext.define('Wo1Model', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'no_pp',type: 'string',  hidden : true}
                ,{name: 'no_ppd',type: 'string'}
                ,{name: 'so_num',type: 'string'}
                ,{name: 'cust_nama',type: 'string'}
                ,{name: 'qty_produksi',type: 'string'}
                ,{name: 'qty',type: 'string'}
                ,{name: 'formula_nama',type: 'string'}
                ,{name: 'formula_id',type: 'string'}
                ,{name: 'prod_id',type: 'string'}
                ,{name: 'prod_nama',type: 'string'}
                ,{name: 'kemasan_nama',type: 'string'}
                ,{name: 'spesifikasi_nama',type: 'string'}
                ,{name: 'n',type: 'string'}
                ,{name: 'p2o5',type: 'string'}
                ,{name: 'k2o',type: 'string'}
                ,{name: 'cao',type: 'string'}
                ,{name: 'mgo',type: 'string'}
                ,{name: 'so4',type: 'string'}
                ,{name: 'b',type: 'string'}
                ,{name: 'cu',type: 'string'}
                ,{name: 'zn',type: 'string'}
                ,{name: 'ah',type: 'string'}
                ,{name: 'af',type: 'string'}
                ,{name: 'finishdate',type: 'date'}
                ,{name: 'est_finishdate',type: 'date'}
                ,{name: 'timeedit',type: 'date'}
                ,{name: 'useredit',type: 'string'}
                ,{name: 'userinput',type: 'string'}
                ,{name: 'status',type: 'string'}

            ],
            proxy: {
                type: 'direct',
                api: {
                    read: WorkOrder1.getWorkOrder1,
                    update: WorkOrder1.updateWorkOrder1
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
                { name : 'qty_bb', type : 'string'},
                { name : 'qty_bj', type : 'string'},
                { name : 'qty_susut', type : 'string'},
                { name : 'status', type : 'string'}
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
                { name : 'qty', type : 'string'},
                { name : 'qty_pcs', type : 'string'},
                { name : 'gudang_id', type : 'string'},
                { name : 'gudang_nama', type : 'string'},
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
                { name : 'bb_nama', type : 'string'},
                { name : 'qty_total', type : 'string'},
                { name : 'qty_in', type : 'string'},
                { name : 'sat_id', type : 'string'},
                { name : 'jml_paket', type : 'string'},
                { name : 'darigudang', type : 'string'},
                { name : 'kegudang', type : 'string'}


            ],
            proxy: {
                type: 'direct',
                api: {
                    read: WorkOrder1.getWorkOrder1DetailBBaku,
                    create: WorkOrder1.addWorkOrder1DetailBBaku

                }
            }
        });
        me.Wo1DBahanBakuStore = Ext.create('Ext.data.Store', {
            model: 'Wo1DBahanBakuModel',
            autoLoad: false
        });

        Ext.define('Wo1DBBdalamprosesModel', {
            extend: 'Ext.data.Model',
            fields: [
                { name : 'co_id', type : 'string'},
                { name : 'wo_num', type : 'string'},
                { name : 'so_num', type : 'string'},
                { name : 'prod_id', type : 'string'},
                { name : 'no_ppd', type : 'string'},
                { name : 'bb_nama', type : 'string'},
                { name : 'formula_id', type : 'string'},
                { name : 'qty_total', type : 'string'},
                { name : 'qty', type : 'string'},
                { name : 'sat_id', type : 'string'},
                { name : 'jml_paket', type : 'string'},
                { name : 'darigudang', type : 'string'},
                { name : 'kegudang', type : 'string'}


            ],
            proxy: {
                type: 'direct',
                api: {
                    read: WorkOrder1.getWODetailBBdalamproses,
                    create: WorkOrder1.addWODetailBBdalamproses


                }
            }
        });
        me.Wo1DBBdalamprosesStore = Ext.create('Ext.data.Store', {
            model: 'Wo1DBBdalamprosesModel',
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
                {text: 'No. Produksi',width:150, sortable: false, dataIndex: 'no_pp'},
                {text: 'No. Detail',width:50, sortable: false, dataIndex: 'no_ppd'},
                {text: 'Sales Number', width:100, sortable: false,dataIndex: 'so_num'},
                {text: 'Customer', width:200, sortable: false,dataIndex: 'cust_nama'},
                {text: 'Qty', width:100, sortable: false,dataIndex: 'qty'},
                {text: 'Qty Produksi', width:100, sortable: false,dataIndex: 'qty_produksi'},
                {text: 'Formula', width:200, sortable: false,dataIndex: 'formula_nama'},
                {text: 'Formula id', width:100, sortable: false,dataIndex: 'formula_id', hidden: true},
                {text: 'Produk id', width:100, sortable: false,dataIndex: 'prod_id', hidden:true},
                {text: 'Produk', width:200, sortable: false,dataIndex: 'prod_nama'},
                {text: 'Kemasan', width:100, sortable: false,dataIndex: 'kemasan_nama'},
                {text: 'Spesifikasi', width:150, sortable: false,dataIndex: 'spesifikasi_nama'},
                {text: 'N', width:50, sortable: false,dataIndex: 'n'},
                {text: 'P2O5', width:50, sortable: false,dataIndex: 'p2o5'},
                {text: 'K2O', width:50, sortable: false,dataIndex: 'k2o'},
                {text: 'CAO', width:50, sortable: false,dataIndex: 'cao'},
                {text: 'MGO', width:50, sortable: false,dataIndex: 'mgo'},
                {text: 'SO4', width:50, sortable: false,dataIndex: 'so4'},
                {text: 'B', width:50, sortable: false,dataIndex: 'b'},
                {text: 'CU', width:50, sortable: false,dataIndex: 'cu'},
                {text: 'ZN', width:50, sortable: false,dataIndex: 'zn'},
                {text: 'AH', width:50, sortable: false,dataIndex: 'ah'},
                {text: 'AF', width:50, sortable: false,dataIndex: 'af'},
                {text: 'status', width:100, sortable: false,dataIndex: 'status', hidden: true},
                {text: 'Est. Selesai', width:70, sortable: true, dataIndex: 'est_finishdate', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'LastUpdate', width : 80, sortable: false, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            viewConfig :
                {
                    stripeRows: false,
                    getRowClass: function(record, index) {
                        return record.get('status') == '1' ? 'child-row' : '';
                    }
                },
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
                                    fieldLabel : 'dari',
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
                                    fieldLabel : 'sampai',
                                    labelWidth : 35,
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
                {header : 'Work Order', dataIndex : 'wo_num',width : 100},
                {header : 'Tanggal',dataIndex : 'tgl',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100},
                {header : 'Shift#',dataIndex : 'shift',width : 100},
                {header : 'Kepala Shift',dataIndex : 'ka_shift',flex : 1, width : 200 },
                {header : 'Tota Qty BB',dataIndex : 'qty_bb',flex : 1, width : 100},
                {header : 'Tota Qty BJ',dataIndex : 'qty_bj',flex : 1, width : 100},
                {header : 'Qty Susut',dataIndex : 'qty_susut',flex : 1, width : 100},
                {header : 'Keterangan',dataIndex : 'keterangan',flex : 1, width : 200},
                {text: 'status', width:100, sortable: false,dataIndex: 'status', hidden: true},
                {header : 'LastUpdate',dataIndex : 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100}
            ],
            listeners: {
                scope: me,
                select: me.onProduksiGridClick2,
                itemdblclick: function(view, record){
                    var form = this.winform1.down('form');
                    if(me.currStatus != 1){
                        me.onItemdblclick1(me.Wo1DStore, record, 'Edit Detail Produksi', me.winform1, form);
                        Ext.getCmp('post_wo').enable();
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
                            Ext.getCmp('post_wo').disable();
                        }
                    },
                        {
                            xtype: 'button',
                            text: 'Delete',
                            iconCls: 'delete',
                            id:'delete_wo',
                            handler: function() {
                                me.deleteProduksi1(me.Wo1DStore, me.Wo1DGrid);
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'BahanBaku',
                            itemId:'BahanBaku',
                            id:'addBahanBaku',
                            scope: me,
                            handler: function(){

                                me.ShowGridPopup(me.Wo1DBahanBakuStore, 'Bahan Baku',me.Wo1DBahanBakuGrid);

                            }
                        },
                        {
                            xtype: 'button',
                            text: 'BB dalam Proses',
                            itemId:'bbproses',
                            id:'addbbproses',
                            scope: me,
                            handler: function(){

                                me.ShowGridPopup(me.Wo1DBBdalamprosesStore, 'Bahan Baku Dalam Proses',me.Wo1DBBdalamprosesGrid);

                            }
                        },
                        {
                            xtype: 'button',
                            text: 'BarangJadi',
                            id:'addBarangJadi',
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
                {header : 'so_num', dataIndex : 'so_num',width : 150},
                {header : 'prod_id', dataIndex : 'prod_id',width : 150},
                {header : 'Bahan Baku', dataIndex : 'bb_nama',width : 200},
                {header : 'satuan', dataIndex : 'sat_id',width : 50},
                {header : 'qty_in', dataIndex : 'qty_in',width : 100},
                {header : 'qty_total', dataIndex : 'qty_total',width : 100}
            ],
            features:[searching],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        xtype : 'fieldcontainer',
                        items : [
                            {
                                xtype : 'displayfield',
                                fieldLabel : 'Jml Paket #'
                            },
                            {
                                xtype : 'textfield',
                                width : 150,
                                margin : '0 5 0 0',
                                name:'jml_paket',
                                id:'jml_paket_wo',
                                allowBlank:true

                            }]
                    },{
                        xtype : 'fieldcontainer',
                        items : [
                            {
                                xtype : 'displayfield',
                                fieldLabel : 'Dari Gudang #'
                            },
                            {
                                xtype : 'xtGudangPopup',
                                width : 150,
                                margin : '0 5 0 0',
                                name:'darigudang',
                                id:'darigudang_wo',
                                allowBlank:true,
                                handler: function(field, value) {
                                    if (value) {
                                        var me=this;
                                        Ext.getCmp('darigudang_jd_wo').setValue(value);
                                    }
                                }
                            }]
                    },{
                        xtype : 'fieldcontainer',
                        items : [
                            {
                                xtype : 'displayfield',
                                fieldLabel : 'Ke #'
                            },
                            {
                                xtype : 'xtGudangPopup',
                                width : 150,
                                margin : '0 5 0 0',
                                name:'kegudang',
                                id:'kegudang_wo',
                                allowBlank:true,
                                handler: function(field, value) {
                                    if (value) {
                                        var me=this;
                                        Ext.getCmp('darigudang_proses_wo').setValue(value);
                                        Ext.getCmp('kegudang_jd_wo').setValue(value);
                                    }
                                }
                            }]
                    },{
                        text: 'Generate',
                        iconCls: 'icoArrowRightSmall',
                        scope: me,
                        handler: function(){
                            var form = me.winformBahanBaku.down('form').getForm();
                            if(form.isValid()){
                                me.onProduksi2Save(form, me.Wo1DBahanBakuStore);
                            }
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
        me.Wo1DBBdalamprosesGrid = Ext.create('App.ux.GridPanel', {
            store: me.Wo1DBBdalamprosesStore,
            region: 'center',
            enablePaging: true,
            columns: [
                {header : 'co_id', dataIndex : 'co_id',width : 200, hidden: true},
                {header : 'so_num', dataIndex : 'so_num',width : 150},
                {header : 'prod_id', dataIndex : 'prod_id',width : 150},
                {header : 'Bahan Baku', dataIndex : 'bb_nama',width : 200},
                {header : 'satuan', dataIndex : 'sat_id',width : 50},
                {header : 'qty_in', dataIndex : 'qty',width : 100},
                {header : 'Jml Paket', dataIndex : 'jml_paket',width : 100},
                {header : 'qty_total', dataIndex : 'qty_total',width : 100}
            ],
            features:[searching],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        xtype : 'fieldcontainer',
                        items : [
                            {
                                xtype : 'displayfield',
                                fieldLabel : 'Jml Paket #'
                            },
                            {
                                xtype : 'textfield',
                                width : 150,
                                margin : '0 5 0 0',
                                name:'jml_paket',
                                id:'jml_paket_proses_wo',
                                allowBlank:true
                            }]
                    },{
                        xtype : 'fieldcontainer',
                        items : [
                            {
                                xtype : 'displayfield',
                                fieldLabel : 'Dari Gudang #'
                            },
                            {
                                xtype : 'xtGudangPopup',
                                width : 150,
                                margin : '0 5 0 0',
                                name:'darigudang',
                                id:'darigudang_proses_wo',
                                allowBlank:true
                            }]
                    },{
                        xtype : 'fieldcontainer',
                        items : [
                            {
                                xtype : 'displayfield',
                                fieldLabel : 'Ke #'
                            },
                            {
                                xtype : 'xtGudangPopup',
                                width : 150,
                                margin : '0 5 0 0',
                                name:'kegudang',
                                id:'kegudang_proses_wo',
                                disabled: true,
                                handler: function(field, value) {
                                    if (value) {
                                        var me=this;
                                        Ext.getCmp('darigudang_jd_wo').setValue(this.getValue());
                                    }
                                }

                            }]
                    },{
                        text: 'Generate',
                        iconCls: 'icoArrowRightSmall',
                        scope: me,
                        handler: function(){
                            var form = me.winformBahanBakuproses.down('form').getForm();
                            if(form.isValid()){
                                me.saveProduksi5(form, me.Wo1DBBdalamprosesStore);
                            }
                        }
                    }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.Wo1DBBdalamprosesGrid,
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
                {header : 'prod_id', dataIndex : 'prod_id',width : 200, hidden: true},
                {header : 'no_ppd', dataIndex : 'no_ppd',width : 200, hidden: true},
                {header : 'WO', dataIndex : 'wo_num',width : 50},
                {header : 'qty',dataIndex : 'qty', width : 50},
                {header : 'qty_pcs',dataIndex : 'qty_pcs', width : 50},
                {header : 'Dari Gudang',dataIndex : 'gudang_nama',flex : 1, width : 200},
                {header : 'Gudang',dataIndex : 'gudang_id',flex : 1, width : 200, hidden:true},
                {header : 'Ke',dataIndex : 'kegudang',flex : 1, width : 200},
                {header : 'Keterangan',dataIndex : 'keterangan',flex : 1, width : 200},
                {header : 'LastUpdate',dataIndex : 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100}
            ],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    var form = this.winformBahanJadi.down('form');
                    me.onItemdblclick1(me.Wo1DBahanJadiStore, record, 'Edit Detail Produksi', me.winformBahanJadi, form);
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
                            var form1 = me.winformBahanJadi.down('form');
                            me.onNewProduksi1(form1, 'Wo1DBahanJadiModel', 'Tambah Data', me.winformBahanJadi);
                            Ext.getCmp('')
                        }
                    },
                        {
                            xtype: 'button',
                            text: 'Delete',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteProduksi2(me.Wo1DBahanJadiStore, me.Wo1DBahanJadiGrid);
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
                                    submitFormat : 'Y-m-d H:i:s'
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
                                    width: 100,
                                    xtype: 'mitos.checkbox',
                                    name : 'status',
                                    id:'post_wo'

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
                            name: 'formula_id'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'prod_id'
                        },
                        {
                            xtype: 'textfield',
                           hidden: true,
                            name: 'wo_num'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'so_num'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'jml_paket'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'darigudang'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'kegudang'
                        }



                    ]
                }
            ],
            buttons: [
                {
                    text: i18n('save'),
                    cls: 'winSave',
                    handler: function(){
                        var form = me.winformBahanBaku.down('form').getForm();
                        if(form.isValid()){
                            me.onProduksi2Save(form, me.Wo1DBahanBakuStore);
                        }
                    }
                },{
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
                    me.action1('close', me.winformBahanBaku);
                }
            }
        });
        me.winformBahanBakuproses = Ext.create('App.ux.window.Window', {
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
                            name: 'formula_id'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'prod_id'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'wo_num'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'so_num'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'jml_paket'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'darigudang'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'kegudang'
                        }



                    ]
                }
            ],
            buttons: [
                {
                    text: i18n('save'),
                    cls: 'winSave',
                    handler: function(){
                        var form = me.winformBahanBakuproses.down('form').getForm();
                        if(form.isValid()){
                            me.saveProduksi5(form, me.Wo1DBBdalamprosesStore);
                        }
                    }
                }
            ],
            features:[searching]
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
                            name: 'so_num'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'prod_id'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'no_ppd'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'wo_num'
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
                                    value: 'Qty BB :'
                                },
                                {
                                    fieldLabel : 'qty',
                                    labelAlign : 'right',
                                    id:'qty_bj_wo',
                                    xtype: 'textfield',
                                    disabled:true
                                },
                                {
                                    width: 20,
                                    xtype: 'displayfield',
                                    value: 'KG'
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
                                    value: 'Qty BJ :'
                                },
                                {
                                    fieldLabel : 'qty',
                                    labelAlign : 'right',
                                    name: 'qty',
                                    xtype: 'textfield'
                                },
                                {
                                    width: 20,
                                    xtype: 'displayfield',
                                    value: 'KG'
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
                                    value: 'qty_pcs:'
                                },
                                {
                                    fieldLabel : 'qty_pcs',
                                    labelAlign : 'right',
                                    name: 'qty_pcs',
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
                                    value: 'Gudang :'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtGudangPopup',
                                    name:'gudang_id',
                                    id:'darigudang_jd_wo'
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
                                    value: 'Ke :'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtGudangPopup',
                                    name:'kegudang',
                                    id:'kegudang_jd_wo'
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
                        }


                    ]
                }
            ],
            buttons: [
                {
                    text: i18n('save'),
                    cls: 'winSave',
                    handler: function(){
                        var form = me.winformBahanJadi.down('form').getForm();
                        if(form.isValid()){
                            me.onProduksi3Save(form, me.Wo1DBahanJadiStore, me.winformBahanJadi);
                        }
                    }
                },{
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
                    me.action1('close', me.winformBahanJadi);
                }
            }
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



    /**
     * This wll load a new record to the grid
     * and start the rowEditor
     */

    onNewProduksi1: function(form, model, title, window){
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({
        }, model);
        form.getForm().loadRecord(newModel);
        record = form.getRecord()
        this.action1('new',window);
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
        Ext.getCmp('addBahanBaku').setDisabled(false);
        Ext.getCmp('addBarangJadi').setDisabled(false);
        Ext.getCmp('addbbproses').setDisabled(false);
        if(me.currStatus == 1 || me.currStatus == 2){
            Ext.getCmp('delete_wo').disable();
            Ext.getCmp('addBahanBaku').disable();
            Ext.getCmp('addBarangJadi').disable();

        }else{
            Ext.getCmp('delete_wo').enable();
            Ext.getCmp('addBahanBaku').enable();
            Ext.getCmp('addBarangJadi').enable();
        }
        if (globals['site']=='SAM'){
            Ext.getCmp('addbbproses').disable();
        }else{
            Ext.getCmp('addbbproses').enable();
        }

    },
    onItemdblclick1: function(store, record, title, window, form){

        this.setForm(form, title);
        form.getForm().loadRecord(record);
        this.action1('old',window);
        window.show();
    },
    onProduksi1Save: function(form, store, window){
        var me = this;
        me.saveProduksi1(form, store, window);
    },
    saveProduksi1: function(form, store, window){
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
                //store.load();
            },
            failure:function(){
               // store.load();
                me.msg('Opps!', 'Error!!', true);
            }
        });
        store.load({params:{so_num: me.currSo_num ,no_ppd: me.currProduksi, prod_id: me.currProd_id}});
    },

    onProduksi2Save: function(form, store){
        var me = this;
        me.saveProduksi2(form, store);
    },
    saveProduksi2: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record),

        f = me.winformBahanBaku.down('form').getForm(), rec = f.getRecord();

        form.findField('wo_num').setValue(me.currWo_num);
        form.findField('no_ppd').setValue(me.currProduksi);
        form.findField('prod_id').setValue(me.currProd_id);
        form.findField('formula_id').setValue(me.currFormula);
        form.findField('so_num').setValue(me.currSo_num);
        form.findField('jml_paket').setValue(Ext.getCmp('jml_paket_wo').getValue());
        form.findField('darigudang').setValue(Ext.getCmp('darigudang_wo').getValue());
        form.findField('kegudang').setValue(Ext.getCmp('kegudang_wo').getValue());

        values = form.getValues();
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                me.Wo1DStore.load({params:{so_num: me.currSo_num, no_ppd: me.currProduksi, prod_id: me.currProd_id}});
            },
            failure:function(){
                me.msg('Opps!', 'Error!!', true);
            }
        });
        store.load({params:{so_num: me.currSo_num ,wo_num: me.currWo_num, prod_id: me.currProd_id}});
    },
    onProduksi3Save: function(form, store, window){
        var me = this;
        me.saveProduksi3(form, store, window);
    },
    saveProduksi3: function(form, store, window){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record),

            f = me.winformBahanJadi.down('form').getForm(), rec = f.getRecord();

        form.findField('wo_num').setValue(me.currWo_num);
        form.findField('prod_id').setValue(me.currProd_id);
        form.findField('so_num').setValue(me.currSo_num);
        form.findField('no_ppd').setValue(me.currProduksi);
        values = form.getValues();
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                me.winformBahanJadi.close();
                me.Wo1DStore.load({params:{so_num: me.currSo_num, no_ppd: me.currProduksi, prod_id: me.currProd_id}});
            },
            failure:function(){
                // store.load();
                me.msg('Opps!', 'Error!!', true);
            }
        });
        store.load({params:{so_num: me.currSo_num ,wo_num: me.currWo_num, prod_id: me.currProd_id}});
    },
    saveProduksi4: function(form, store, window){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record),

        f = me.winposted.down('form').getForm(), rec = f.getRecord();
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
            },
            failure:function(){
                me.msg('Opps!', 'Error!!', true);
            }
        });
        store.load({params:{so_num: me.currSo_num ,no_ppd: me.currProduksi, prod_id: me.currProd_id}});
    },
    saveProduksi5: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record),

            f = me.winformBahanBakuproses.down('form').getForm(), rec = f.getRecord();

        form.findField('wo_num').setValue(me.currWo_num);
        form.findField('no_ppd').setValue(me.currProduksi);
        form.findField('prod_id').setValue(me.currProd_id);
        form.findField('formula_id').setValue(me.currFormula);
        form.findField('so_num').setValue(me.currSo_num);
        form.findField('jml_paket').setValue(Ext.getCmp('jml_paket_proses_wo').getValue());
        form.findField('darigudang').setValue(Ext.getCmp('darigudang_proses_wo').getValue());
        form.findField('kegudang').setValue(Ext.getCmp('kegudang_proses_wo').getValue());

        values = form.getValues();
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
            },
            failure:function(){
                me.msg('Opps!', 'Error!!', true);
            }
        });
        store.load({params:{so_num: me.currSo_num ,wo_num: me.currWo_num, prod_id: me.currProd_id}});
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

    deleteProduksi2: function(store, grid){
        var me = this,
            sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('sequence_no');
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

            Ext.getCmp('addBahanBaku').setDisabled(true);
            Ext.getCmp('addBarangJadi').setDisabled(true);
        Ext.getCmp('addbbproses').setDisabled(true);

    }
});
