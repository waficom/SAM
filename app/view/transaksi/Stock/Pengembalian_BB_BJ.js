Ext.define('App.view.transaksi.Stock.Pengembalian_BB_BJ', {
    extend: 'App.ux.RenderPanel',
    id: 'panelPengembalian_BB_BJ',
    pageTitle: 'Pengembalian Bahan Baku Masuk',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.currInv_Code = null;
        me.currPosted = null;
        me.curr_sequence = null;
        me.userinput =null;
        me.useredit=null;
        Ext.define('PengembalianModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'dok_no',type: 'string'},
                {name: 'for_dok_no',type: 'string'},
                {name: 'dok_type',type: 'string'},
                {name: 'account',type: 'string'},
                {name: 'bank_code',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'posted_date',type: 'date'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'status',type: 'string'},
                {name: 'remaks',type: 'string'},
                {name: 'gudang_id',type: 'string'},
                {name: 'cf_code',type: 'string'}
            ]

        });
        me.PengembalianStore = Ext.create('Ext.data.Store', {
            model: 'PengembalianModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Pengembalian_BB_BJ.getPengembalian,
                    create: Pengembalian_BB_BJ.addPengembalian_I,
                    update: Pengembalian_BB_BJ.updatePengembalian,
                    destroy : Pengembalian_BB_BJ.deletePengembalian
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });
        Ext.define('PengembalianDetailModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'dok_no',type: 'string'},
                {name: 'bb_id',type: 'string'},
                {name: 'bb_nama',type: 'string'},
                {name: 'prod_id',type: 'string'},
                {name: 'prod_nama',type: 'string'},
                {name: 'qty',type: 'float'},
                {name: 'sequence_no',type: 'string'},
                {name: 'sat_id',type: 'string'},
                {name: 'hpp',type: 'float'},
                {name: 'total',type: 'float'}
            ]

        });
        me.PengembalianDetailStore = Ext.create('Ext.data.Store', {
            model: 'PengembalianDetailModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Pengembalian_BB_BJ.getPengembalianDetail,
                    update: Pengembalian_BB_BJ.updatePengembalianDetail
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });


        Ext.define('Pengembalian_JurnalModel', {
            extend: 'Ext.data.Model',
            fields: [
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
            ]

        });
        me.Pengembalian_JurnalStore = Ext.create('Ext.data.Store', {
            model: 'Pengembalian_JurnalModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Jurnal.getJurnal
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
            disableIndexes:['timeedit','dok_no']

        }

        /**
         * Lists Grid
         */
        me.PengembalianGrid = Ext.create('App.ux.GridPanel', {
            store: me.PengembalianStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {text: 'Dok No',sortable: true,dataIndex: 'dok_no'},
                {text: 'For Dok No',sortable: true,dataIndex: 'for_dok_no'},
                {text: 'status',sortable: true,dataIndex: 'status', hidden:true},
                {text: 'dok_type',sortable: true,dataIndex: 'dok_type', hidden:true},
                {text: 'Bank',sortable: true,dataIndex: 'bank_code'},
                {text: 'Gudang',sortable: true,dataIndex: 'gudang_id'},
                {flex:1,text: 'Remarks',sortable: true,dataIndex: 'remaks'},
                {text: 'Tgl Posting', width : 80, sortable: true, dataIndex: 'posted_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
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
                select: me.onPBGridClick,
                itemdblclick: function(view, record){
                    if(me.currPosted =='1' || me.currPosted =='2'){
                    }else{
                        me.onItemdblclick(me.PengembalianStore, record, 'Edit Pengembalian BB & BJ');
                    }
                    Ext.getCmp('post_pg').setDisabled(false);
                }
            },
            features:[searching],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'ADD Dok',
                            iconCls: 'icoArrowRightSmall',
                            scope: me,
                            handler: function(){
                                Pengembalian_BB_BJ.addPengembalian_I(function(provider, response){
                                });
                                me.PengembalianStore.load();
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            id:'dlt_pg',
                            handler:function() {
                                me.onPBDelete(me.PengembalianStore);
                            }
                        },{
                            text: 'Detail',
                            iconCls: 'document',
                            scope: me,
                            handler: function(){
                                me.ShowGridPopup(me.PengembalianDetailStore, 'Detail Item',me.PengembalianDetailGrid);
                            }
                        },'->',
                        {
                            xtype:'displayfield',
                            itemId:'itemuserinput',
                            margin : '0 5 0 0'
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.PengembalianStore,
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
        me.PengembalianDetailGrid = Ext.create('App.ux.GridPanel', {
            store: me.PengembalianDetailStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {text: 'dok_no',sortable: true,dataIndex: 'dok_no', hidden:true},
                {text: 'sequence_no',sortable: true,dataIndex: 'sequence_no', hidden:true},
                {text: 'BB ID',sortable: true,dataIndex: 'bb_id'},
                {text: 'Bahan Baku',sortable: true,dataIndex: 'bb_nama', flex:1},
                {text: 'Qty Dikembalikan',sortable: true,dataIndex: 'qty', tdCls: 'custom-column'},
                {text: 'Sat',sortable: true,dataIndex: 'sat_id'},
                {header : 'Hrg Rata2', dataIndex : 'hpp',renderer: Ext.util.Format.numberRenderer('0,000.00'),  summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'Total', dataIndex : 'total',renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},

                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}

            ],
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return me.currPosted == '1'? 'child-row' : me.currPosted == '2'? 'adult-row' : '';
                }
            },
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    if(me.currPosted =='1' || me.currPosted =='2'){
                    }else{
                        me.onItemdblclick1(me.PengembalianDetailStore, record, 'Edit Pengembalian Detail BB & BJ');
                    }
                }
            },
            features: [{
                ftype: 'summary'
            }, searching]
        });

        me.Pengembalian_JurnalGrid = Ext.create('App.ux.GridPanel', {
            store: me.Pengembalian_JurnalStore,
            region: 'center',
            enablePaging: true,
            columns: [
                {header : 'co_id', dataIndex : 'co_id',width : 200, hidden: true},
                {header : 'Doc. Date',dataIndex : 'inv_date',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100},
                {header : 'Doc. Number', dataIndex : 'inv_code',width : 150},
                {header : 'Coa', dataIndex : 'coa',width : 100},
                {header : 'Description', dataIndex : 'coa_nama',width : 200, summaryRenderer: function(){
                    return '<b>Total</b>';
                }},
                {header : 'Debit', dataIndex : 'debit',width : 150,renderer: Ext.util.Format.numberRenderer('0,000.00'),  summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'Credit', dataIndex : 'credit',width : 150,renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'sequence_no', dataIndex : 'sequence_no',width : 150, hidden: true},
                {header : 'Remarks', dataIndex : 'remaks',width : 200},
                {header : 'LastUpdate',dataIndex : 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100}
            ],
            viewConfig: {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return me.currPosted == '1'? 'child-row' : me.currPosted == '2'? 'adult-row' : '';
                }
            },
            features: [{
                ftype: 'summary'
            }, searching]
        });
        me.win = Ext.create('App.ux.window.Window', {
            width: 600,
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
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Dok No.'
                                },
                                {
                                    width: 150,
                                    xtype: 'textfield',
                                    name: 'dok_no',
                                    readOnly:true
                                },
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'For Dok No.'
                                },
                                {
                                    width: 150,
                                    xtype: 'xtStock_IN_OUT',
                                    name: 'for_dok_no'
                                }
                            ]
                        },
                        {
                            xtype: "radiogroup",
                            fieldLabel: "Stock ",
                            defaults: {xtype: "radio", name:'dok_type'
                            },
                            items: [
                                {
                                    boxLabel: "Barang",
                                    inputValue:'B',
                                    checked: true,
                                    handler: function(field, value) {
                                        if (value) {
                                            Ext.getCmp('bank_code_pg').setDisabled(true);
                                            Ext.getCmp('cf_code_pg').setDisabled(true);
                                        }
                                    }
                                },
                                {
                                    boxLabel: "Bayar",
                                    inputValue:'R',
                                    handler: function(field, value) {
                                        if (value) {
                                            Ext.getCmp('bank_code_pg').setDisabled(false);
                                            Ext.getCmp('cf_code_pg').setDisabled(false);
                                        }
                                    }
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
                                    value: 'Bank. '
                                },
                                {
                                    width: 100,
                                    xtype: 'xtBankPopup',
                                    name: 'bank_code',
                                    id:'bank_code_pg',
                                    disabled:true
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
                                    value: 'CF Code : '
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCF_OPopup',
                                    name: 'cf_code',
                                    id:'cf_code_pg',
                                    allowBlank:false,
                                    disabled:true
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
                                    value: 'Keterangan '
                                },
                                {
                                    width: 250,
                                    xtype: 'textfield',
                                    name: 'remaks'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 150,
                                    xtype: 'checkboxfield',
                                    fieldLabel: 'Posting',
                                    id:'post_pg',
                                    disabled: true,
                                    name: 'status',
                                    handler: function(field, value) {
                                        if (value== true) {
                                            Ext.getCmp('posted_date_pg').setDisabled(false);
                                            Ext.getCmp('posted_date_pg').setValue(new Date());
                                        }else{
                                            Ext.getCmp('posted_date_pg').setDisabled(true);
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
                                    id:'posted_date_pg'
                                }
                            ]
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: 'Save',
                    cls: 'winSave',
                    handler: function(){
                        var form = me.win.down('form').getForm();
                        if(form.isValid()){
                            var values = form.getValues();
                            var StatusPosting = form.findField('status').getValue();
                            var CountDetail = me.PengembalianDetailStore.getCount({params:{inv_code: me.currInv_Code}});
                            if(StatusPosting){
                                if(CountDetail > 0){
                                    Pengembalian_BB_BJ.updatePengembalian(values,function(provider, response){
                                        if (response.type == 'exception'){
                                            Ext.MessageBox.alert('Error', response.message);
                                        }
                                        me.win.close();
                                        me.PengembalianStore.load();
                                    });
                                }else{
                                    Ext.MessageBox.alert('Warning', 'Cek Detail');
                                }
                            }else{
                                Pengembalian_BB_BJ.updatePengembalian(values,function(provider, response){
                                    if (response.type == 'exception'){
                                        Ext.MessageBox.alert('Error', response.message);
                                    }
                                    me.win.close();
                                    me.PengembalianStore.load();
                                });
                            }

                        }
                    }
                },
                '-',
                {
                    text: 'Cancel',
                    scope: me,
                    handler: function(btn){
                        btn.up('window').close();
                    }
                }
            ],
            listeners: {
                scope: me,
                close: function(){
                    me.action('close',me.win);
                }
            }
        });
        me.winform = Ext.create('App.ux.window.Window', {
            width: 600,
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
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Dok No.'
                                },
                                {
                                    width: 150,
                                    xtype: 'textfield',
                                    name: 'dok_no',
                                    readOnly:true
                                }
                            ]
                        }, {
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'BB Id'
                                },
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    name: 'bb_id',
                                    readOnly:true
                                }
                            ]
                        },{
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Qty '
                                },
                                {
                                    width: 100,
                                    xtype: 'numberfield',
                                    hideTrigger: true,
                                    name: 'qty',
                                    allowBlank:false
                                }
                            ]
                        },{
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Sat Id'
                                },
                                {
                                    width: 80,
                                    xtype: 'textfield',
                                    name: 'sat_id',
                                    readOnly:true
                                }
                            ]
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: 'Save',
                    cls: 'winSave',
                    handler: function(){
                        var form = me.winform.down('form').getForm();
                        if(form.isValid()){
                            var values = form.getValues();
                            Pengembalian_BB_BJ.updatePengembalianDetail(values,function(provider, response){
                                me.winform.close();
                                me.PengembalianDetailStore.load({params:{dok_no: me.currInv_Code}});
                            });
                        }
                    }
                },
                '-',
                {
                    text: 'Cancel',
                    scope: me,
                    handler: function(btn){
                        btn.up('window').close();
                    }
                }
            ],
            listeners: {
                scope: me,
                close: function(){
                    me.action1('close');
                }
            }
        });
        // *************************************************************************************
        // Window User Form
        // *************************************************************************************

        me.pageBody = [me.PengembalianGrid, me.Pengembalian_JurnalGrid];
        me.callParent(arguments);
    },
    setForm: function(form, title){
        form.up('window').setTitle(title);
    },
    openWin: function(){
        this.win.show();
    },
    action: function(action){
        var win = this.win, form = win.down('form');
        if(action == 'close'){
            form.getForm().reset();
        }
    },
    action1: function(action){
        var win = this.winform, form = win.down('form');
        if(action == 'close'){
            form.getForm().reset();
        }
    },
    onItemdblclick: function(store, record, title){
        var form = this.win.down('form');
        this.setForm(form, title);
        form.getForm().loadRecord(record);
        this.action('old');
        this.win.show();
    },
    onItemdblclick1: function(store, record, title){
        var form = this.winform.down('form');
        this.setForm(form, title);
        form.getForm().loadRecord(record);
        this.action1('old');
        this.winform.show();
    },
    onPBGridClick: function(grid, selected){
        var me = this;
        me.currInv_Code = selected.data.dok_no;
        me.currPosted = selected.data.status;
        var TopBarItems = this.PengembalianGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);
        if(me.currPosted==1 || me.currPosted==2){
            Ext.getCmp('dlt_pg').disable();
        }else{
            Ext.getCmp('dlt_pg').enable();
        }
        me.Pengembalian_JurnalStore.load({params:{inv_code: me.currInv_Code}});

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
        store.load({params:{dok_no: me.currInv_Code}});
        this.myWinChooseItem.show();
    },

    onPBDelete: function(store){
        var me = this, grid = me.PengembalianGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('dok_no');
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
    deletedetail: function(store){
        var me = this, grid = me.PengembalianDetailGrid;
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
        });
    },
    onActive: function(callback){
        var me = this;
        me.PengembalianStore.load();
        me.Pengembalian_JurnalStore.load();

        callback(true);
    }
});