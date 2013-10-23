Ext.define('App.view.transaksi.workorder.WO_BDP_Formula', {
    extend: 'App.ux.RenderPanel',
    id: 'panelWO_BDP_Formula',
    pageTitle: 'WO Bahan Baku Dalam Proses',
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
        Ext.define('WO_BDP_FormulaModel', {
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
        me.WO_BDP_FormulaStore = Ext.create('Ext.data.Store', {
            model: 'WO_BDP_FormulaModel',
            proxy: {
                type: 'direct',
                api: {
                    read: WO_BB_Formula.getWO_BB_Formula
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });

        Ext.define('WO_BDP_Formula_Detail_Store_Model', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'wo_num',type: 'string'},
                {name: 'so_num',type: 'string'},
                {name: 'prod_id',type: 'string'},
                {name: 'no_ppd',type: 'string'},
                {name: 'qty',type: 'float'},
                {name: 'sat_id',type: 'string'},
                {name: 'darigudang',type: 'string'},
                {name: 'kegudang',type: 'string'},
                {name: 'sequence_no',type: 'string'},
                {name: 'posted_date',type: 'date'},
                {name: 'status',type: 'string'}
            ]

        });
        me.WO_BDP_Formula_Detail_Store = Ext.create('Ext.data.Store', {
            model: 'WO_BDP_Formula_Detail_Store_Model',
            proxy: {
                type: 'direct',
                api: {
                    read: WO_BDP_Formula.getWO_BDP_FormulaDetail,
                    create: WO_BDP_Formula.addWO_BDP_FormulaDetail,
                    update: WO_BDP_Formula.updateWO_BDP_FormulaDetail,
                    destroy: WO_BDP_Formula.deleteWO_BDP_FormulaDetail
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
        me.WO_BDP_FormulaGrid = Ext.create('App.ux.GridPanel', {
            store: me.WO_BDP_FormulaStore,
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
                        '->',
                        {
                            xtype:'displayfield',
                            itemId:'itemuserinput',
                            margin : '0 5 0 0'
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.WO_BDP_FormulaStore,
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
        me.WoBDPGrid = Ext.create('App.ux.GridPanel', {
            store: me.WO_BDP_Formula_Detail_Store,
            region: 'center',
            enablePaging: true,
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {header : 'Co Id', dataIndex : 'co_id',width : 200, hidden: true},
                {header : 'WO Num', dataIndex : 'wo_num',width : 150, hidden: true},
                {header : 'SO Num', dataIndex : 'so_num',width : 150, hidden: true},
                {header : 'Sequence  No', dataIndex : 'sequence_no'},
                {header : 'Prod ID', dataIndex : 'prod_id'},
                {header : 'Produk', dataIndex : 'prod_nama',flex:1},
                {header : 'Qty', dataIndex : 'qty'},
                {header : 'Satuan', dataIndex : 'sat_id'},
                {header : 'Darigudang', dataIndex : 'darigudang'},
                {header : 'kegudang', dataIndex : 'kegudang'},
                {header : 'Status', dataIndex : 'status', hidden:true}

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
                select: me.onGridClick
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
                                    xtype: 'numberfield',
                                    width: 150,
                                    name : 'qty',
                                    fieldLabel: 'Qty',
                                    value:1,
                                    itemId:'qtybdp_f',
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
                                    value:'KG',
                                    itemId:'sat_id_bdp',
                                    labelWidth : 30
                                }]
                        },{
                        text: 'ADD',
                        iconCls: 'icoAddRecord',
                        scope: me,
                        handler: function(){
                            var form = me.winformBDP.down('form').getForm();
                            if(form.isValid()){
                                form.findField('wo_num').setValue(me.currWo_num);
                                form.findField('no_ppd').setValue(me.currNo_PPD);
                                form.findField('prod_id').setValue(me.currProd_id);
                                form.findField('so_num').setValue(me.currSo_num);
                                form.findField('qty').setValue(Ext.ComponentQuery.query('#qtybdp_f')[0].getValue());
                                form.findField('sat_id').setValue(Ext.ComponentQuery.query('#sat_id_bdp')[0].getValue());
                                var values = form.getValues();
                                WO_BDP_Formula.addWO_BDP_FormulaDetail(values,function(provider, response){
                                });
                                me.WO_BDP_Formula_Detail_Store.load({params:{so_num: me.currSo_num ,wo_num: me.currWo_num, prod_id: me.currProd_id}});
                            }
                        }
                    },
                        {
                            xtype: 'button',
                            text: 'Delete',
                            iconCls: 'delete',
                            id:'dlt_wo_bdp_f',
                            handler: function() {
                                var form = me.winformBDP.down('form').getForm();
                                var data_selected = me.WoBDPGrid.getSelectionModel();
                                var length = data_selected.selected.items.length;
                                for (var i = 0, len = length; i < len; i++) {
                                    var data = data_selected.selected.items[i].data;
                                    form.findField('wo_num').setValue(data.wo_num);
                                    form.findField('prod_id').setValue(data.prod_id);
                                    form.findField('so_num').setValue(data.so_num);
                                    form.findField('sequence_no').setValue(data.sequence_no);
                                    var values = form.getValues();
                                    if(form.isValid()){
                                        WO_BDP_Formula.deleteWO_BDP_FormulaDetail(values, function(provider, response){
                                            me.WO_BDP_Formula_Detail_Store.remove(data_selected.getSelection());
                                        });
                                    }
                                };

                            }
                        },'->',
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange',
                            items : [

                                {
                                    xtype : 'datefield',
                                    itemId : 'tgl_post',
                                    width : 100,
                                    format : 'd-m-Y',
                                    value : new Date()
                                }]
                        },
                        {
                            xtype: 'button',
                            text: 'Posting',
                            id:'post_wo_bdp_f',
                            iconCls: 'icoArrowRightSmall',
                            handler: function() {
                                var form = me.winformBDP.down('form').getForm();
                                var topBarItems = me.WoBDPGrid.getDockedItems('toolbar[dock="top"]')[0],
                                    getDate =  topBarItems.getComponent( 'fieldContainerDateRange' ).getComponent( 'tgl_post' ).getValue();
                                var data_selected = me.WoBDPGrid.getSelectionModel();
                                var length = data_selected.selected.items.length;
                                for (var i = 0, len = length; i < len; i++) {
                                    var data = data_selected.selected.items[i].data;
                                    form.findField('wo_num').setValue(data.wo_num);
                                    form.findField('prod_id').setValue(data.prod_id);
                                    form.findField('so_num').setValue(data.so_num);
                                    form.findField('no_ppd').setValue(data.no_ppd);
                                    form.findField('sequence_no').setValue(data.sequence_no);
                                    form.findField('posted_date').setValue(getDate);
                                    var values = form.getValues();
                                    if(form.isValid()){
                                        WO_BDP_Formula.updateWO_BDP_FormulaDetail(values, function(provider, response){
                                            if (response.type == 'exception'){
                                                Ext.MessageBox.alert('Error', response.message);
                                            }
                                            me.WO_BDP_Formula_Detail_Store.load({params:{so_num: me.currSo_num ,wo_num: me.currWo_num, prod_id: me.currProd_id}});
                                        });
                                    }
                                };
                            }
                        }

                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.WoBDPGrid,
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
        me.winformBDP = Ext.create('App.ux.window.Window', {
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
                        {xtype: 'textfield',hidden: true,name: 'sequence_no'},
                        {xtype: 'textfield',hidden: true,name: 'so_num'},
                        {xtype: 'textfield',hidden: true,name: 'prod_id'},
                        {xtype: 'numberfield',hidden: true,name: 'qty'},
                        {xtype: 'textfield',hidden: true,name: 'no_ppd'},
                        {xtype: 'textfield',hidden: true,name: 'sat_id' },
                        {xtype: 'datefield', hidden: true,name: 'posted_date'}
                    ]
                }

            ]
        });

        // *************************************************************************************

        me.pageBody = [me.WO_BDP_FormulaGrid,  me.WoBDPGrid];
        me.callParent(arguments);
    },

    onPBGridClick: function(grid, selected){
        var me = this;
        me.currWo_num = selected.data.wo_num;
        me.currSo_num = selected.data.so_num;
        me.currProd_id = selected.data.prod_id;
        me.currStatus = selected.data.status;
        me.currNo_PPD = selected.data.no_ppd;

        Ext.ComponentQuery.query('#qtybdp_f')[0].setValue(selected.data.qtybb);

        var TopBarItems = this.WO_BDP_FormulaGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);
        me.WO_BDP_Formula_Detail_Store.load({params:{so_num: me.currSo_num ,wo_num: me.currWo_num, prod_id: me.currProd_id}});
    },
    onGridClick: function(grid, selected){
        var me = this;
        if(selected.data.status==1 || selected.data.status==2){
            Ext.getCmp('post_wo_bdp_f').disable();
            Ext.getCmp('dlt_wo_bdp_f').disable();
        }else{
            Ext.getCmp('post_wo_bdp_f').enable();
            Ext.getCmp('dlt_wo_bdp_f').enable();
        }

    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        this.WO_BDP_FormulaStore.load();
        this.WO_BDP_Formula_Detail_Store.load();

        callback(true);
    }
});
