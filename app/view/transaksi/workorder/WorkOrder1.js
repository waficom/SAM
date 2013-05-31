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
        me.currWo_num = null;
        me.curr_coid = null;
        me.userinput =null;
        me.useredit=null;
        //me.myWinChooseItem=null;

        Ext.define('Wo1Model', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'no_pp',type: 'string',  hidden : true}
                ,{name: 'no_ppd',type: 'string'}
                ,{name: 'so_num',type: 'string'}
                ,{name: 'cust_nama',type: 'string'}
                ,{name: 'formula_nama',type: 'string'}
                ,{name: 'formula_id',type: 'string'}
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
                { name : 'wo_num_from', type : 'string'},
                { name : 'userinput', type : 'string'},
                { name : 'useredit', type : 'string'},
                { name : 'timeinput', type : 'date'},
                { name : 'timeedit', type : 'date'},
                { name : 'keterangan', type : 'string'}
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
                { name : 'no_ppd', type : 'string'},
                { name : 'sequence_no', type : 'string'},
                { name : 'qty', type : 'string'},
                { name : 'qty_pcs', type : 'string'},
                { name : 'gudang_id', type : 'string'},
                { name : 'gudang_nama', type : 'string'},
                { name : 'keterangan', type : 'string'},
                { name : 'userinput', type : 'string'},
                { name : 'useredit', type : 'string'},
                { name : 'timeinput', type : 'date'},
                { name : 'timeedit', type : 'date'}
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
                { name : 'no_ppd', type : 'string'},
                { name : 'sequence_no', type : 'string'},
                { name : 'bb_id', type : 'string'},
                { name : 'sat_id', type : 'string'},
                { name : 'qty_stock', type : 'float'},
                { name : 'qty_in', type : 'float'},
                { name : 'qty_out', type : 'float'},
                { name : 'qty_last', type : 'float'},
                { name : 'keterangan', type : 'string'},
                { name : 'userinput', type : 'string'},
                { name : 'useredit', type : 'string'},
                { name : 'timeinput', type : 'date'},
                { name : 'timeedit', type : 'date'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: WorkOrder1.getWorkOrder1DetailBBaku,
                    create: WorkOrder1.addWorkOrder1DetailBBaku,
                    update: WorkOrder1.updateWorkOrder1DetailBBaku,
                    destroy: WorkOrder1.deleteWorkOrder1DetailBBaku

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
                {text: 'NO PP', sortable: false, dataIndex: 'no_pp',  hidden : true},
                {text: 'NO PPD', sortable: false, dataIndex: 'no_ppd'},
                {text: 'Sales Number', width:100, sortable: false,dataIndex: 'so_num'},
                {text: 'Customer', width:150, sortable: false,dataIndex: 'cust_nama'},
                {text: 'Formula', width:100, sortable: false,dataIndex: 'formula_nama'},
                {text: 'Formula id', width:100, sortable: false,dataIndex: 'formula_id', hidden: true},
                {text: 'Produk', width:100, sortable: false,dataIndex: 'prod_nama'},
                {text: 'Kemasan', width:100, sortable: false,dataIndex: 'kemasan_nama'},
                {text: 'Spesifikasi', width:100, sortable: false,dataIndex: 'spesifikasi_nama'},
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
                {text: 'tgl selesai', sortable : false, dataIndex: 'finishdate', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'est tgl selesai', width:70, sortable: true, dataIndex: 'est_finishdate', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'LastUpdate', width : 80, sortable: false, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            listeners: {
                scope: me,
                select: me.onProduksiGridClick
            },
            features:[searching]

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
                {header : 'Work Order #', dataIndex : 'wo_num',width : 200},
                {header : 'Tanggal',dataIndex : 'tgl',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100},
                {header : 'Shift#',dataIndex : 'shift',width : 100},
                {header : 'Kepala Shift',dataIndex : 'ka_shift',flex : 1, width : 200 },
                {header : 'Prev Work Order#',dataIndex : 'wo_num_from',flex : 1, width : 200},
                {header : 'Keterangan',dataIndex : 'keterangan',flex : 1, width : 200},
                {header : 'LastUpdate',dataIndex : 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100}
            ],
            listeners: {
                scope: me,
                select: me.onProduksiGridClick2,
                itemdblclick: function(view, record){
                    var form = this.winform1.down('form');
                    me.onItemdblclick1(me.Wo1DStore, record, 'Edit Detail Produksi', me.winform1, form);
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
                        }
                    },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteProduksi1(me.Wo1DStore, me.Wo1DGrid);
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'addBahanBaku',
                            itemId:'addBahanBaku',
                            scope: me,
                            handler: function(){

                                me.ShowGridPopup(me.Wo1DBahanBakuStore, 'Bahan Baku',me.Wo1DBahanBakuGrid);

                            }
                        },
                        {
                            xtype: 'button',
                            text: 'addBarangJadi',
                            scope: me,
                            handler: function(){
                                me.ShowGridPopup(me.Wo1DBahanJadiStore, 'Barang Jadi',me.Wo1DBahanJadiGrid);

                            }
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.Produksi1Grid,
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
                {header : 'ppd', dataIndex : 'no_ppd',width : 200, hidden: true},
                {header : 'sequence_no', dataIndex : 'sequence_no',width : 200, hidden: true},
                {header : 'WO', dataIndex : 'wo_num',width : 50},
                {header : 'bb_id',dataIndex : 'bb_id',width : 200},
                {header : 'sat_id',dataIndex : 'sat_id', width : 200 },
                {header : 'qty_stock',dataIndex : 'qty_stock', width : 200},
                {header : 'qty_in',dataIndex : 'qty_in', width : 200},
                {header : 'qty_out',dataIndex : 'qty_out', width : 200},
                {header : 'qty_last',dataIndex : 'qty_last', width : 200},
                {header : 'Keterangan',dataIndex : 'keterangan', width : 200},
                {header : 'LastUpdate',dataIndex : 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100}
            ],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    var form = this.winformBahanBaku.down('form');
                    me.onItemdblclick1(me.Wo1DBahanBakuStore, record, 'Edit Detail Produksi', me.winformBahanBaku, form);
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
                            var form1 = me.winformBahanBaku.down('form');
                            me.onNewProduksi1(form1, 'Wo1DBahanBakuModel', 'Tambah Data', me.winformBahanBaku);
                        }
                    },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteProduksi2(me.Wo1DBahanBakuStore, me.Wo1DBahanBakuGrid);
                            }
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.Produksi1Grid,
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
                {header : 'ppd', dataIndex : 'no_ppd',width : 200, hidden: true},
                {header : 'sequence_no', dataIndex : 'sequence_no',width : 200, hidden: true},
                {header : 'WO', dataIndex : 'wo_num',width : 50},
                {header : 'qty',dataIndex : 'qty', width : 200},
                {header : 'qty_pcs',dataIndex : 'qty_pcs', width : 200},
                {header : 'Gudang',dataIndex : 'gudang_nama',flex : 1, width : 200},
                {header : 'Gudang',dataIndex : 'gudang_id',flex : 1, width : 200, hidden:true},
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
                        }
                    },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteProduksi2(me.Wo1DBahanJadiStore, me.Wo1DBahanJadiGrid);
                            }
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.Produksi1Grid,
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
                                    value: 'Bahan Baku :'
                                },
                                {
                                    width: 200,
                                    xtype: 'xtBahanBakuPopup',
                                    name:'bb_id'
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
                                    value: 'Satuan :'
                                },
                                {
                                    width: 200,
                                    xtype: 'xtSatuanPopup',
                                    name:'sat_id'
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
                                    value: 'qty_stock:'
                                },
                                {
                                    fieldLabel : 'qty_stock',
                                    labelAlign : 'right',
                                    name: 'qty_stock',
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
                                    value: 'qty_in:'
                                },
                                {
                                    fieldLabel : 'qty_in',
                                    labelAlign : 'right',
                                    name: 'qty_in',
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
                                    value: 'qty_out:'
                                },
                                {
                                    fieldLabel : 'qty_out',
                                    labelAlign : 'right',
                                    name: 'qty_out',
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
                                    value: 'qty_last:'
                                },
                                {
                                    fieldLabel : 'qty_last',
                                    labelAlign : 'right',
                                    name: 'qty_last',
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
                        var form = me.winformBahanBaku.down('form').getForm();
                        if(form.isValid()){
                            me.onProduksi2Save(form, me.Wo1DBahanBakuStore, me.Wo1DGrid);
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
                                    value: 'qty :'
                                },
                                {
                                    fieldLabel : 'qty',
                                    labelAlign : 'right',
                                    name: 'qty',
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
                                    width: 200,
                                    xtype: 'xtGudangPopup',
                                    name:'gudang_id'
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
                            me.onProduksi3Save(form, me.Wo1DBahanJadiStore, me.Wo1DGrid);
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
        store.load({params:{no_ppd: me.currProduksi, wo_num:me.currWo_num}});
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
       /* var TopBarItems = this.ProduksiGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);*/
        me.Wo1DStore.load({params:{no_ppd: me.currProduksi}});

    },
    onProduksiGridClick2: function(grid, selected){
        var me = this;
        me.currWo_num = selected.data.wo_num;
        me.currProduksi = selected.data.no_ppd;

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
        store.load({params:{no_ppd: me.currProduksi}});
    },

    onProduksi2Save: function(form, store, grid){
        var me = this;
        me.saveProduksi2(form, store, grid);
    },
    saveProduksi2: function(form, store, grid){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record),

        f = me.winformBahanBaku.down('form').getForm(), rec = f.getRecord();

        form.findField('no_ppd').setValue(me.currProduksi);
        form.findField('wo_num').setValue(me.currWo_num);
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
        store.load({params:{no_ppd: me.currProduksi,wo_num: me.currWo_num}});
    },
    onProduksi3Save: function(form, store, grid){
        var me = this;
        me.saveProduksi3(form, store, grid);
    },
    saveProduksi3: function(form, store, grid){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record),

            f = me.winformBahanJadi.down('form').getForm(), rec = f.getRecord();

        form.findField('no_ppd').setValue(me.currProduksi);
        form.findField('wo_num').setValue(me.currWo_num);
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
        store.load({params:{no_ppd: me.currProduksi,wo_num: me.currWo_num}});
    },
    deleteProduksi1: function(store, grid){
        var me = this,
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('no_ppd');
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

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        this.Wo1Store.load({params:{start:0, limit:5}});
        this.Wo1DStore.load();
        callback(true);
    }
});
