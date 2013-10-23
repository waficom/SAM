Ext.define('App.view.transaksi.Stock.Pinjaman_BB_BJ', {
    extend: 'App.ux.RenderPanel',
    id: 'panelPinjaman_BB_BJ',
    pageTitle: 'Pinjam Bahan Baku',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.currInv_Code = null;
        me.currPosted = null;
        me.curr_sequence = null;
        me.userinput =null;
        me.useredit=null;
        Ext.define('PinjamModel', {
            extend: 'Ext.data.Model',
            fields: [
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
            ]

        });
        me.PinjamStore = Ext.create('Ext.data.Store', {
            model: 'PinjamModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Pinjaman_BB_BJ.getPinjam,
                    create: Pinjaman_BB_BJ.addPinjam_I,
                    create: Pinjaman_BB_BJ.addPinjam_O,
                    update: Pinjaman_BB_BJ.updatePinjam,
                    destroy : Pinjaman_BB_BJ.deletePinjam
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });
        Ext.define('PinjamDetailModel', {
            extend: 'Ext.data.Model',
            fields: [
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
            ]

        });
        me.PinjamDetailStore = Ext.create('Ext.data.Store', {
            model: 'PinjamDetailModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Pinjaman_BB_BJ.getPinjamDetail,
                    create: Pinjaman_BB_BJ.addPinjamDetail,
                    destroy : Pinjaman_BB_BJ.deletePinjamDetail
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });


        Ext.define('Pinjam_JurnalModel', {
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
        me.Pinjam_JurnalStore = Ext.create('Ext.data.Store', {
            model: 'Pinjam_JurnalModel',
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
        me.PinjamGrid = Ext.create('App.ux.GridPanel', {
            store: me.PinjamStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {text: 'Dok No',sortable: true,dataIndex: 'dok_no'},
                {text: 'status',sortable: true,dataIndex: 'status', hidden:true},
                {text: 'Tgl JT', width : 80, sortable: true, dataIndex: 'tgl_jt', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'dok_type',sortable: true,dataIndex: 'dok_type', hidden:true},
                {text: 'bb_bj_type',sortable: true,dataIndex: 'bb_bj_type', hidden:true},
                {text: 'Vendor',sortable: true,dataIndex: 'vend_id'},
                {text: 'Customer',sortable: true,dataIndex: 'cust_id'},
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
                        me.onItemdblclick(me.PinjamStore, record, 'Edit Pinjam BB & BJ');
                    }
                    Ext.getCmp('post_pj').setDisabled(false);
                    Ext.getCmp('tgl_jt_stock').setValue(new Date());
                }
            },
            features:[searching],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Stock In',
                            iconCls: 'icoArrowRightSmall',
                            scope: me,
                            handler: function(){
                                Pinjaman_BB_BJ.addPinjam_I(function(provider, response){
                                });
                                me.PinjamStore.load();
                            }
                        },
                        {
                            text: 'Stock Out',
                            iconCls: 'icoArrowRightSmall',
                            scope: me,
                            handler: function(){
                                Pinjaman_BB_BJ.addPinjam_O(function(provider, response){
                                });
                                me.PinjamStore.load();
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            id:'dlt_pj',
                            handler:function() {
                                me.onPBDelete(me.PinjamStore);
                            }
                        },{
                            text: 'Detail',
                            iconCls: 'document',
                            scope: me,
                            handler: function(){
                                me.ShowGridPopup(me.PinjamDetailStore, 'Detail Item',me.PinjamDetailGrid);
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
                    store: me.PinjamStore,
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
        me.PinjamDetailGrid = Ext.create('App.ux.GridPanel', {
            store: me.PinjamDetailStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {text: 'dok_no',sortable: true,dataIndex: 'dok_no', hidden:true},
                {text: 'sequence_no',sortable: true,dataIndex: 'sequence_no', hidden:true},
                {text: 'BB ID',sortable: true,dataIndex: 'bb_id'},
                {text: 'Bahan Baku',sortable: true,dataIndex: 'bb_nama', flex:1},
                {text: 'Qty',sortable: true,dataIndex: 'qty'},
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
            features: [{
                ftype: 'summary'
            }, searching],
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
                                    labelWidth : 50,
                                    itemId:'bb_id'
                                }]
                        },
                        {
                            xtype : 'fieldcontainer',
                            items : [
                                {
                                    xtype: 'textfield',
                                    width: 100,
                                    name : 'Qty',
                                    fieldLabel: 'Qty',
                                    itemId:'qtybb',
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
                                    itemId:'sat_id_bb',
                                    value:'KG',
                                    labelWidth : 30
                                }]
                        },
                        {
                            xtype : 'fieldcontainer',
                            items : [
                                {
                                    xtype: 'numberfield',
                                    width: 150,
                                    name : 'Harga',
                                    fieldLabel: 'Hpp',
                                    itemId:'Hpp',
                                    labelWidth : 50,
                                    disabled:true
                                }]
                        },
                        {
                            text: 'Add',
                            iconCls: 'icoAddRecord',
                            id:'add_dt_pj',
                            scope: me,
                            handler: function(){
                                var form = me.winform.down('form').getForm();
                                form.findField('dok_no').setValue( me.currInv_Code);
                                form.findField('bb_id').setValue(Ext.ComponentQuery.query('#bb_id')[0].getValue());
                                form.findField('qty').setValue(Ext.ComponentQuery.query('#qtybb')[0].getValue());
                                form.findField('sat_id').setValue(Ext.ComponentQuery.query('#sat_id_bb')[0].getValue());
                                form.findField('hpp').setValue(Ext.ComponentQuery.query('#Hpp')[0].getValue());
                                var values = form.getValues();
                                Pinjaman_BB_BJ.addPinjamDetail(values,function(provider, response){
                                });
                                me.PinjamDetailStore.load({params:{dok_no: me.currInv_Code}})

                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            id:'dlt_dt_pj',
                            handler:function() {
                                me.deletedetail(me.PinjamDetailStore);
                            }
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.PinjamDetailStore,
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

        me.Pinjam_JurnalGrid = Ext.create('App.ux.GridPanel', {
            store: me.Pinjam_JurnalStore,
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
                            width: 150,
                            xtype: 'textfield',
                            name: 'dok_type',
                            hidden:true
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
                                    value: 'Dok No.'
                                },
                                {
                                    width: 150,
                                    xtype: 'textfield',
                                    name: 'dok_no',
                                    readOnly:true
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
                                    value: 'Due Date'
                                },
                                {
                                    xtype : 'datefield',
                                    width : 100,
                                    name : 'tgl_jt',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s',
                                    id:'tgl_jt_stock',
                                    value: new Date(),
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
                                    value: 'Vendor.'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtVendorSuplierPopup',
                                    name: 'vend_id',
                                    id:'vend_id_pj'
                                },{
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Customer. '
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCustomerPopup',
                                    name: 'cust_id',
                                    id:'cust_id_pj'
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
                                    value: 'Gudang '
                                },
                                {
                                    width: 150,
                                    xtype: 'xtGudangBMPopup',
                                    name: 'gudang_id'
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
                                    id:'post_pj',
                                    disabled: true,
                                    name: 'status',
                                    handler: function(field, value) {
                                        if (value== true) {
                                            Ext.getCmp('posted_date_pj').setDisabled(false);
                                            Ext.getCmp('posted_date_pj').setValue(new Date());
                                        }else{
                                            Ext.getCmp('posted_date_pj').setDisabled(true);
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
                                    id:'posted_date_pj'
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
                            Pinjaman_BB_BJ.updatePinjam(values,function(provider, response){
                                if (response.type == 'exception'){
                                    Ext.MessageBox.alert('Error', response.message);
                                }
                                me.win.close();
                                me.PinjamStore.load();
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
                    items: [
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'dok_no'
                        },{
                            xtype: 'textfield',
                            hidden: true,
                            name: 'bb_id'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'hpp'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'sat_id'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'qty'
                        }
                    ]
                }
            ]
        });
        // *************************************************************************************
        // Window User Form
        // *************************************************************************************

        me.pageBody = [me.PinjamGrid, me.Pinjam_JurnalGrid];
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
    onItemdblclick: function(store, record, title){
        var form = this.win.down('form');
        this.setForm(form, title);
        form.getForm().loadRecord(record);
        this.action('old');
        this.win.show();
    },
    onPBGridClick: function(grid, selected){
        var me = this;
        me.currInv_Code = selected.data.dok_no;
        me.currPosted = selected.data.status;
        var TopBarItems = this.PinjamGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);
        if(me.currPosted==1 || me.currPosted==2){
            Ext.getCmp('dlt_pj').disable();
            Ext.getCmp('add_dt_pj').disable();
            Ext.getCmp('dlt_dt_pj').disable();
        }else{
            Ext.getCmp('dlt_pj').enable();
            Ext.getCmp('add_dt_pj').enable();
            Ext.getCmp('dlt_dt_pj').enable();
        }
        if(selected.data.dok_type=='I'){
            Ext.getCmp('vend_id_pj').enable();
            Ext.getCmp('cust_id_pj').disable();
            Ext.ComponentQuery.query('#Hpp')[0].setDisabled(false);
            Ext.ComponentQuery.query('#Hpp')[0].setValue('0');
        }else{
            Ext.getCmp('cust_id_pj').enable();
            Ext.getCmp('vend_id_pj').disable();
            Ext.ComponentQuery.query('#Hpp')[0].setDisabled(true);
            Ext.ComponentQuery.query('#Hpp')[0].setValue('0');
        }
        me.Pinjam_JurnalStore.load({params:{inv_code: me.currInv_Code}});

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
        var me = this, grid = me.PinjamGrid;
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
        var me = this, grid = me.PinjamDetailGrid;
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
        me.PinjamStore.load();
        me.Pinjam_JurnalStore.load();

        callback(true);
    }
});
