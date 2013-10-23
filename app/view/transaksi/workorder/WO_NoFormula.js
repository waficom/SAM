Ext.define('App.view.transaksi.workorder.WO_NoFormula', {
    extend: 'App.ux.RenderPanel',
    id: 'panelWO_NoFormula',
    pageTitle: 'Produksi tanpa Formula',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.curr_coid = null;
        me.userinput =null;
        me.useredit=null;
        me.currSo_num = null;
        me.Formula = null;
        me.currProd_id = null;
        me.currWo_num = null;
        me.currNo_PPD = null;
        Ext.define('WO_BB_FormulaModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'wo_num',type: 'string'},
                {name: 'tgl',type: 'string'},
                {name: 'shift',type: 'integer'},
                {name: 'ka_shift',type: 'string'},
                {name: 'so_num',type: 'string'},
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
                {name: 'qtyso',type: 'string'}
            ]

        });
        me.WO_BB_FormulaStore = Ext.create('Ext.data.Store', {
            model: 'WO_BB_FormulaModel',
            proxy: {
                type: 'direct',
                api: {
                    read: WO_BB_Formula.getWO_BB_Formula,
                    create: WO_BB_Formula.addWO_BB_Formula,
                    destroy: WO_BB_Formula.deleteWO_BB_Formula
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });

        Ext.define('WO_BB_Formula_Detail_Store_Model', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'wo_num',type: 'date'},
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
                {name: 'darigudang',type: 'string'},
                {name: 'kegudang',type: 'string'}
            ]

        });
        me.WO_BB_Formula_Detail_Store = Ext.create('Ext.data.Store', {
            model: 'WO_BB_Formula_Detail_Store_Model',
            proxy: {
                type: 'direct',
                api: {
                    read: WO_BB_Formula.getWO_BB_FormulaDetail,
                    create: WorkOrder1.addWO_NoFormula,
                    destroy: WorkOrder1.deleteWO_NoFormula
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });

        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit','inv_date']

        }

        /**
         * Lists Grid
         */
        me.WO_BB_FormulaGrid = Ext.create('App.ux.GridPanel', {
            store: me.WO_BB_FormulaStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {text: 'No PPD',sortable: true,dataIndex: 'no_ppd', hidden:true},
                {text: 'SO Num',sortable: true,dataIndex: 'so_num'},
                {text: 'Shiff',sortable: true,dataIndex: 'shift'},
                {text: 'WO Num',sortable: true,dataIndex: 'wo_num', hidden:true},
                {text: 'Customer',sortable: true,dataIndex: 'cust_nama', flex:1},
                {text: 'Produk',sortable: true,dataIndex: 'prod_id'},
                {text: 'Qty SO',sortable: true,dataIndex: 'qtyso'},
                {text: 'Qty BB',sortable: true,dataIndex: 'qtybb'},
                {text: 'Qty BDP',sortable: true,dataIndex: 'qtybdp'},
                {text: 'Qty BJ',sortable: true,dataIndex: 'qtybj'},
                {text: 'Formula',sortable: true,dataIndex: 'formula_id'},
                {text: 'KA Shift',sortable: true,dataIndex: 'ka_shift'},
                {text: 'status',sortable: true,dataIndex: 'status', hidden:true},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
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
                select: me.onPBGridClick
            },
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
                                    xtype: 'xtPPDPopup',
                                    width: 150,
                                    name : 'no_ppd',
                                    fieldLabel: 'No DPP',
                                    id:'wo_ppd_noformula',
                                    labelWidth : 50
                                }]
                        },
                        {
                            xtype : 'fieldcontainer',
                            items : [
                                {
                                    xtype: 'numberfield',
                                    width: 100,
                                    name : 'shift',
                                    fieldLabel: 'Shift',
                                    id:'wo_shift_noformula',
                                    value:0,
                                    labelWidth : 30
                                }]
                        },
                        {
                            xtype : 'fieldcontainer',
                            items : [
                                {
                                    xtype: 'textfield',
                                    width: 150,
                                    name : 'ka_shift',
                                    fieldLabel: 'KA Shift',
                                    id:'wo_ka_shift_noformula',
                                    labelWidth : 50
                                }]
                        },
                        {
                            xtype : 'fieldcontainer',
                            items : [
                                {
                                    xtype: 'textfield',
                                    width: 150,
                                    name : 'keterangan',
                                    fieldLabel: 'Remarks',
                                    id:'wo_remarks_noformula',
                                    labelWidth : 50
                                }]
                        },
                        {
                            text: 'ADD',
                            iconCls: 'icoAddRecord',
                            scope: me,
                            handler: function(){
                                var form = me.win.down('form').getForm();
                                if(form.isValid()){
                                    form.findField('no_ppd').setValue(Ext.getCmp('wo_ppd_noformula').getValue());
                                    form.findField('shift').setValue(Ext.getCmp('wo_shift_noformula').getValue());
                                    form.findField('ka_shift').setValue(Ext.getCmp('wo_ka_shift_noformula').getValue());
                                    form.findField('keterangan').setValue(Ext.getCmp('wo_remarks_noformula').getValue());
                                    var values = form.getValues();
                                    WO_BB_Formula.addWO_BB_Formula(values,function(provider, response){
                                    });
                                    me.WO_BB_FormulaStore.load();
                                }

                            }
                        },
                        {
                            text: 'Delete',
                            iconCls: 'delete',
                            id:'dlt_noformula',
                            scope: me,
                            handler: function(){
                                me.onDeleteDetailWO(me.WO_BB_FormulaStore);
                            }
                        },
                        '->',
                        {
                            xtype:'displayfield',
                            itemId:'itemuserinput',
                            margin : '0 5 0 0'
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.WO_BB_FormulaStore,
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
            store: me.WO_BB_Formula_Detail_Store,
            region: 'center',
            enablePaging: true,
            columns: [
                {header : 'co_id', dataIndex : 'co_id',width : 200, hidden: true},
                {header : 'so_num', dataIndex : 'so_num',width : 150, hidden: true},
                {header : 'prod_id', dataIndex : 'prod_id',width : 150, hidden: true},
                {header : 'BB Id', dataIndex : 'bb_id'},
                {header : 'Bahan Baku', dataIndex : 'bb_nama',flex:1},
                {header : 'qty_in', dataIndex : 'qty_in', hidden:true},
                {header : 'Paket', dataIndex : 'jml_paket', hidden:true},
                {header : 'Qty BB', dataIndex : 'total_qty_in'},
                {header : 'satuan', dataIndex : 'sat_id'},
                {header : 'Darigudang', dataIndex : 'darigudang'},
                {header : 'kegudang', dataIndex : 'kegudang'}
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
                                    xtype: 'numberfield',
                                    width: 100,
                                    name : 'total_qty_in',
                                    fieldLabel: 'Qty',
                                    id:'qty_bb_noformula',
                                    value:1,
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
                                    value:'KG',
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
                            text: 'ADD',
                            iconCls: 'icoArrowRightSmall',
                            scope: me,
                            handler: function(){
                                var form = me.winformBahanBaku.down('form').getForm();
                                if(form.isValid()){
                                    form.findField('wo_num').setValue(me.currWo_num);
                                    form.findField('no_ppd').setValue(me.currNo_PPD);
                                    form.findField('prod_id').setValue(me.currProd_id);
                                    form.findField('so_num').setValue(me.currSo_num);
                                    form.findField('bb_id').setValue(Ext.getCmp('bb_id_noformula').getValue());
                                    form.findField('total_qty_in').setValue(Ext.getCmp('qty_bb_noformula').getValue());
                                    form.findField('qty_in').setValue(Ext.getCmp('qty_bb_noformula').getValue());
                                    form.findField('sat_id').setValue(Ext.getCmp('sat_bb_noformula').getValue());
                                    form.findField('darigudang').setValue(Ext.getCmp('drgdg_bb_noformula').getValue());
                                    form.findField('kegudang').setValue(Ext.getCmp('kegdg_bb_noformula').getValue());
                                    var values = form.getValues();
                                    WorkOrder1.addWO_NoFormula(values,function(provider, response){
                                    });
                                    me.WO_BB_Formula_Detail_Store.load({params:{so_num: me.currSo_num ,wo_num: me.currWo_num, prod_id: me.currProd_id}});
                                }
                            }
                        },{
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            id:'dlt_dt_noformula',
                            handler:function() {
                                me.deleteDetailBB_NoFormula(me.WO_BB_Formula_Detail_Store);
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

        // *************************************************************************************
        // Window User Form
        me.win = Ext.create('App.ux.window.Window', {
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
                        {xtype: 'textfield',hidden: true,name: 'no_ppd'},
                        {xtype: 'textfield',hidden: true,name: 'shift'},
                        {xtype: 'textfield',hidden: true,name: 'ka_shift' },
                        {xtype: 'textfield',hidden: true,name: 'keterangan' }
                    ]
                }

            ]
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
                        {xtype: 'textfield', hidden: true,name: 'qty_in'},
                        {xtype: 'textfield',hidden: true,name: 'sat_id' },
                        {xtype: 'textfield',hidden: true,name: 'darigudang' },
                        {xtype: 'textfield', hidden: true,name: 'kegudang'}
                    ]
                }

            ]
        });

        // *************************************************************************************

        me.pageBody = [me.WO_BB_FormulaGrid,  me.Wo1DBahanBakuGrid];
        me.callParent(arguments);
    },

    onPBGridClick: function(grid, selected){
        var me = this;
        me.currWo_num = selected.data.wo_num;
        me.currSo_num = selected.data.so_num;
        me.currProd_id = selected.data.prod_id;
        me.currStatus = selected.data.status;
        me.currNo_PPD = selected.data.no_ppd;
        if(selected.data.status==1 || selected.data.status==2){
            Ext.getCmp('dlt_noformula').setDisabled(true);
            Ext.getCmp('dlt_dt_noformula').setDisabled(true);
        }else{
            Ext.getCmp('dlt_noformula').setDisabled(false);
            Ext.getCmp('dlt_dt_noformula').setDisabled(false);
        }
        var TopBarItems = this.WO_BB_FormulaGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);
        me.WO_BB_Formula_Detail_Store.load({params:{so_num: me.currSo_num ,wo_num: me.currWo_num, prod_id: me.currProd_id}});
    },
    onDeleteDetailWO: function(store){
        var me = this, grid = me.WO_BB_FormulaGrid;
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
                    me.WO_BB_Formula_Detail_Store.load({params:{so_num: me.currSo_num ,wo_num: me.currWo_num, prod_id: me.currProd_id}});
                }
            }
        });
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

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        this.WO_BB_FormulaStore.load();
        this.WO_BB_Formula_Detail_Store.load();

        callback(true);
    }
});
