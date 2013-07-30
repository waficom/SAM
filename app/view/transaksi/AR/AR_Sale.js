Ext.define('App.view.transaksi.AR.AR_Sale', {
    extend: 'App.ux.RenderPanel',
    id: 'panelAR_Sale',
    pageTitle: 'AR Sale',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.currInv_Code = null;
        me.currCoa = null;
        me.currBB = null;
        me.currPosted = null;
        me.curr_coid = null;
        me.userinput =null;
        me.useredit=null;
        Ext.define('AR_SaleModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'inv_code',type: 'string'},
                {name: 'inv_date',type: 'date'},
                {name: 'inv_type',type: 'string'},
                {name: 'do_num',type: 'string'},
                {name: 'account',type: 'string'},
                {name: 'account_nama',type: 'string'},
                {name: 'tax_code',type: 'string'},
                {name: 'tax_nama',type: 'string'},
                {name: 'gudang_id',type: 'string'},
                {name: 'gudang_nama',type: 'string'},
                {name: 'nilaidasarx',type: 'string'},
                {name: 'nd_setelah_discx',type: 'string'},
                {name: 'discon',type: 'float'},
                {name: 'remaks',type: 'string'},
                {name: 'cust_id',type: 'string'},
                {name: 'ppn_prs',type: 'float'},
                {name: 'ppn_nilaix',type: 'float'},
                {name: 'pph_prs',type: 'float'},
                {name: 'pph_nilaix',type: 'float'},
                {name: 'totalx',type: 'float'},
                {name: 'timeedit',type: 'date'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'status',type: 'string'},
                {name: 'inv_type',type: 'string'},
                {name: 'choose',type: 'string'},
                {name: 'account_type',type: 'string'},
                {name: 'for_inv_code',type: 'string'},
                {name: 'cust_nama',type: 'string'},
                {name: 'posted_date',type: 'date'},
                {name: 'piutangdebtor2',type: 'float'}
            ]

        });
        me.AR_SaleStore = Ext.create('Ext.data.Store', {
            model: 'AR_SaleModel',
            proxy: {
                type: 'direct',
                api: {
                    read: AR_Sale.getAR_Sale,
                    create: AR_Sale.addAR_Sale,
                    update: AR_Sale.updateAR_Sale,
                    destroy : AR_Sale.deleteAR_Sale
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });

        Ext.define('AR_Sale_DetailModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'inv_code',type: 'string'},
                {name: 'description',type: 'string'},
                {name: 'qty',type: 'string'},
                {name: 'qty_susut',type: 'string'},
                {name: 'harga',type: 'float'},
                {name: 'sat_id',type: 'string'},
                {name: 'sequence_no',type: 'string'},
                {name: 'timeedit',type: 'date'}
            ]

        });
        me.AR_Sale_DetailStore = Ext.create('Ext.data.Store', {
            model: 'AR_Sale_DetailModel',
            proxy: {
                type: 'direct',
                api: {
                    read: AR_Sale.getAR_Sale_Detail,
                    create: AR_Sale.addAR_Sale_Detail,
                    update: AR_Sale.updateAR_Sale_Detail,
                    destroy : AR_Sale.deleteAR_Sale_Detail
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });

        Ext.define('AR_Sale_JurnalModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'inv_date',type: 'date'},
                {name: 'inv_code',type: 'string'},
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
        me.AR_Sale_JurnalStore = Ext.create('Ext.data.Store', {
            model: 'AR_Sale_JurnalModel',
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
            disableIndexes:['timeedit','pp_date']

        }

        /**
         * Lists Grid
         */
        me.AR_SaleGrid = Ext.create('App.ux.GridPanel', {
            store: me.AR_SaleStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            readOnly: true,
            columns: [
                {width: 150,text: 'Doc. Number',sortable: true,dataIndex: 'inv_code'},
                {width: 100,text: 'Entry Date',sortable: true,dataIndex: 'inv_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {width: 150,text: 'DO Num',sortable: true,dataIndex: 'do_num'},
                {width: 150,text: 'Doc. AR',sortable: true,dataIndex: 'for_inv_code'},
                {width: 150,text: 'Acc. Number',sortable: true,dataIndex: 'account'},
                {width: 100,text: 'Tax Code',sortable: true,dataIndex: 'tax_code'},
                {width: 100,text: 'Customer',sortable: true,dataIndex: 'cust_id'},
                {width: 100,text: 'Gudang',sortable: true,dataIndex: 'gudang_id'},
                {width: 100,text: 'Nominal',sortable: true,dataIndex: 'nilaidasarx',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {width: 50,text: 'Discon',sortable: true,dataIndex: 'discon'},
                {width: 100,text: 'Setelah Disc',sortable: true,dataIndex: 'nd_setelah_discx',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {width: 50,text: 'Ppn %',sortable: true,dataIndex: 'ppn_prs'},
                {width: 100,text: 'ppn',sortable: true,dataIndex: 'ppn_nilaix', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {width: 50,text: 'Pph %',sortable: true,dataIndex: 'pph_prs'},
                {width: 100,text: 'Pph',sortable: true,dataIndex: 'pph_nilaix', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {width: 100,text: 'Total',sortable: true,dataIndex: 'totalx', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {width: 200,text: 'Remaks',sortable: true,dataIndex: 'remaks'},
                {width: 50,text: 'status',sortable: true,dataIndex: 'status', hidden: true},
                {width: 50,text: 'inv_type',sortable: true,dataIndex: 'inv_type', hidden: true},
                {width: 50,text: 'account_type',sortable: true,dataIndex: 'account_type', hidden: true},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}

            ],
            viewConfig: {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1'? 'child-row' : record.get('status') == '2'? 'adult-row' : '';
                }
            },
            listeners: {
                scope: me,
                select: me.onPBGridClick,
                itemdblclick: function(view, record){
                    var form = this.win.down('form');
                    form.getForm().loadRecord(record);
                    if(me.currPosted =='1' || me.currPosted =='2'){
                    }else{
                        me.onItemdblclick(form, me.AR_SaleStore, record, 'Edit AR Sale');
                        Ext.getCmp('post_ar').enable();
                    }

                }
            },
            features:[searching],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Add',
                            iconCls: 'icoAddRecord',
                            scope: me,
                            handler: function(){
                                var form = me.win.down('form');
                                me.onNewPB(form, 'AR_SaleModel', 'Tambah Data');
                                Ext.getCmp('for_inv_ar').disable();Ext.getCmp('inv_date_ar').setValue(new Date());
                                Ext.getCmp('post_ar').disable();Ext.getCmp('posted_date_ar').disable();
                                Ext.getCmp('account_ar').enable();

                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Delete',
                            iconCls: 'delete',
                            id:'delete_ar',
                            handler:function() {
                                me.onPBDelete(me.AR_SaleStore);
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Detail',
                            iconCls: 'document',
                            scope: me,
                            handler: function(){
                                me.ShowGridPopup(me.AR_Sale_DetailStore, 'Detail Item',me.AR_Sale_DetailGrid);

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
                    store: me.AR_SaleStore,
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

        me.AR_Sale_DetailGrid = Ext.create('App.ux.GridPanel', {
            store: me.AR_Sale_DetailStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {width: 200,text: 'Doc. Number',sortable: true,dataIndex: 'inv_code', hidden: true},
                {width: 200,text: 'sequence_no',sortable: true,dataIndex: 'sequence_no', hidden:true},
                {width: 200,text: 'Description',sortable: true,dataIndex: 'description'},
                {width: 200,text: 'Qty',sortable: true,dataIndex: 'qty'},
                {width: 200,text: 'Qty Susut',sortable: true,dataIndex: 'qty_susut'},
                {width: 100,text: 'Satuan',sortable: true,dataIndex: 'sat_id'},
                {width: 200,text: 'Nominal',sortable: true,dataIndex: 'harga',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}

            ],
            viewConfig: {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return me.currPosted == '1'? 'child-row' : me.currPosted == '2'? 'adult-row' : '';
                }
            },
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    me.currBB = record.get('sequence_no');
                    var form = this.winformAR_Sale_Detail.down('form');
                    if(me.currPosted =='1' || me.currPosted =='2'){
                    }else{
                        me.onItemdblclick1(me.AR_Sale_DetailStore, record, 'Edit Detail Item', me.winformAR_Sale_Detail, form);

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
                            var form1 = me.winformAR_Sale_Detail.down('form');
                            me.onNewProduksi1(form1, 'AR_Sale_DetailModel', 'Tambah Data', me.winformAR_Sale_Detail);
                        }
                    },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            id:'delete_dt_ar',
                            handler: function() {
                                me.deleteProduksi2(me.AR_Sale_DetailStore, me.AR_Sale_DetailGrid);
                            }
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.AR_Sale_DetailGrid,
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

        me.AR_Sale_JurnalGrid = Ext.create('App.ux.GridPanel', {
            store: me.AR_Sale_JurnalStore,
            region: 'center',
            enablePaging: true,
            columns: [
                {header : 'co_id', dataIndex : 'co_id',width : 200, hidden: true},
                {header : 'Posting Date',dataIndex : 'inv_date',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100},
                {header : 'Doc. Number', dataIndex : 'inv_code',width : 150},
                {header : 'Creditor', dataIndex : 'vend_id',width : 100},
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

        // *************************************************************************************
        // Window User Form
        // *************************************************************************************
        me.win = Ext.create('App.ux.window.Window', {
            width: 650,
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
                            defaults: {hideLabel: true},
                            msgTarget: 'under',
                            name:'inv_code',
                            hidden:true
                        },
                        {
                            xtype: "radiogroup",
                            fieldLabel: "Jenis ",
                            defaults: {xtype: "radio", name:'inv_type'
                            },
                            items: [
                                {
                                    boxLabel: "Normal",
                                    checked: true,
                                    inputValue:'N',
                                    handler: function(field, value) {
                                        if (value) {
                                            Ext.getCmp('tax_ar').enable();
                                            Ext.getCmp('gudang_id_ar').enable();
                                            Ext.getCmp('do_num_ar').enable();
                                            Ext.getCmp('for_inv_ar').disable();
                                            Ext.getCmp('discon_ar').enable();
                                        }
                                    }

                                },
                                {
                                    boxLabel: "Potongan",
                                    inputValue:'P',
                                    handler: function(field, value) {
                                        if (value) {
                                            Ext.getCmp('tax_ar').disable();
                                            Ext.getCmp('gudang_id_ar').disable();
                                            Ext.getCmp('account_ar').enable();
                                            Ext.getCmp('do_num_ar').disable();
                                            Ext.getCmp('for_inv_ar').enable();
                                            Ext.getCmp('discon_ar').disable();
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
                                    value: 'Entry Date'
                                },
                                {
                                    xtype : 'datefield',
                                    width : 100,
                                    name : 'inv_date',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s',
                                    allowBlank: false,
                                    maxValue: new Date(),
                                    id:'inv_date_ar'
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
                                    value: 'DO Num : '
                                },
                                {
                                    width: 180,
                                    xtype: 'xtDOPopup',
                                    name: 'do_num',
                                    allowBlank: false,
                                    id:'do_num_ar'

                                },
                                {
                                    width: 80,
                                    xtype: 'displayfield',
                                    value: 'Doc. AR : '
                                },
                                {
                                    width: 180,
                                    xtype: 'xtARPopup',
                                    name: 'for_inv_code',
                                    allowBlank: false,
                                    id:'for_inv_ar'
                                },
                                {
                                    xtype: 'mitos.currency',
                                    name:'piutangdebtor2',
                                    hideTrigger: true,
                                    hidden: true
                                }
                            ]
                        },
                        {
                            xtype: "radiogroup",
                            fieldLabel: "Account/Susut ",
                            defaults: {xtype: "radio", name:'account_type'
                            },
                            items: [
                                {
                                    boxLabel: "Y",
                                    inputValue:'Y',
                                    checked: true,
                                    handler: function(field, value) {
                                        if (value) {
                                            Ext.getCmp('account_ar').enable();
                                        }
                                    }
                                },
                                {
                                    boxLabel: "N",
                                    inputValue:'N',
                                    handler: function(field, value) {
                                        if (value) {
                                            Ext.getCmp('account_ar').disable();
                                        }
                                    }
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCoaPopup',
                                    name: 'account',
                                    allowBlank: false,
                                    id:'account_ar'
                                },
                                {
                                    width: 200,
                                    xtype: 'displayfield',
                                    name:'account_nama',
                                    id:'account_nama_ar'
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
                                    value: 'Tax : '
                                },
                                {
                                    width: 100,
                                    xtype: 'xtTaxKPopup',
                                    name: 'tax_code',
                                    allowBlank: false,
                                    id:'tax_ar'
                                },
                                {
                                    width: 200,
                                    xtype: 'displayfield',
                                    name:'tax_nama',
                                    id:'tax_code'
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
                                    value: 'Debtor : '
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCustomerPopup',
                                    name: 'cust_id',
                                    id:'cust_id_ar',
                                    allowBlank: false
                                },
                                {
                                    width: 200,
                                    xtype: 'displayfield',
                                    name:'cust_nama',
                                    id:'cust_nama_ar'
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
                                    value: 'Ambil dari Gudang : '
                                },
                                {
                                    width: 100,
                                    xtype: 'xtGudangBJPopup',
                                    name: 'gudang_id',
                                    id:'gudang_id_ar'
                                },
                                {
                                    width: 200,
                                    xtype: 'displayfield',
                                    name:'gudang_nama',
                                    id:'gudang_nama_ar'
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
                                    value: 'Discon % : '
                                },
                                {
                                    width: 50,
                                    xtype: 'mitos.currency',
                                    name: 'discon',
                                    hideTrigger: true,
                                    id:'discon_ar'
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
                                    value: 'Remaks : '
                                },
                                {
                                    width: 300,
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
                                    id:'post_ar',
                                    name: 'status',
                                    handler: function(field, value) {
                                        if (value== true) {
                                            Ext.getCmp('posted_date_ar').enable();
                                            Ext.getCmp('posted_date_ar').setValue(new Date());
                                        }else{
                                            Ext.getCmp('posted_date_ar').disable();
                                        }

                                    }
                                },
                                {
                                    xtype : 'datefield',
                                    width : 100,
                                    name : 'posted_date',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s',
                                    value : new Date(),
                                    maxValue: new Date(),
                                    allowBlank:false,
                                    id:'posted_date_ar'
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
                            me.onPBSave(form, me.AR_SaleStore);
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
                    me.action('close');
                }
            }
        });
        me.winformAR_Sale_Detail = Ext.create('App.ux.window.Window', {
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
                            name: 'inv_code'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'sequence_no'
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
                                    value: 'Description :'
                                },
                                {
                                    width: 200,
                                    xtype: 'textfield',
                                    name:'description'
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
                                    value: 'Qty :'
                                },
                                {
                                    fieldLabel : 'qty',
                                    labelAlign : 'right',
                                    name: 'qty',
                                    xtype: 'textfield',
                                    id:'qty_ar'
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
                                    value: 'Qty Susut :'
                                },
                                {
                                    fieldLabel : 'qty',
                                    labelAlign : 'right',
                                    name: 'qty_susut',
                                    xtype: 'textfield',
                                    id:'qty_susut_ar'
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
                                    name:'sat_id',
                                    id:'sat_id_ar'
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
                                    value: 'Nominal :'
                                },
                                {
                                    fieldLabel : 'Harga',
                                    labelAlign : 'right',
                                    name: 'harga',
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
                        var form = me.winformAR_Sale_Detail.down('form').getForm();
                        if(form.isValid()){
                            me.onProduksi2Save(form, me.AR_Sale_DetailStore, me.winformAR_Sale_Detail);
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
                    me.action1('close', me.winformAR_Sale_Detail);
                }
            }
        });




        me.pageBody = [me.AR_SaleGrid, me.AR_Sale_JurnalGrid];
        me.callParent(arguments);
    },
    setForm: function(form, title){
        form.up('window').setTitle(title);
    },
    openWin: function(){
        this.win.show();
    },
    openWin1: function(){
        this.winform1.show();
    },

    action: function(action){
        var win = this.win, form = win.down('form');
        if(action == 'close'){
            form.getForm().reset();
        }
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
     * This wll load a new record to the grid
     * and start the rowEditor
     */
    onNewPB: function(form, model, title){
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({
        }, model);
        form.getForm().loadRecord(newModel);
        this.action('new');
        this.win.show();

    },

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
    onPBGridClick: function(grid, selected){
        var me = this;
        me.currInv_Code = selected.data.inv_code;
        me.currPosted = selected.data.status;
        var TopBarItems = this.AR_SaleGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);
        me.AR_Sale_JurnalStore.load({params:{inv_code: me.currInv_Code}});
        if(selected.data.status == 1 || selected.data.status == 2){
            Ext.getCmp('delete_ar').disable();
            Ext.getCmp('delete_dt_ar').disable();
        }else{
            Ext.getCmp('delete_ar').enable();
            Ext.getCmp('delete_dt_ar').enable();
        }
        if(selected.data.inv_type =='P'){
            Ext.getCmp('qty_ar').disable();
            Ext.getCmp('qty_susut_ar').disable();
            Ext.getCmp('sat_id_ar').disable();
        }else{
            Ext.getCmp('qty_ar').enable();
            Ext.getCmp('qty_susut_ar').enable();
            Ext.getCmp('sat_id_ar').enable();
        }
    },

    onItemdblclick: function(form, store, record, title){
        this.setForm(form, title);
        this.action('old');
        this.win.show();
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
        store.load({params:{inv_code: me.currInv_Code}});
        this.myWinChooseItem.show();
    },

    onPBSave: function(form, store){
        var me = this;
        me.savePB(form, store);
    },
    savePB: function(form, store){
        var me = this;
        var StatusPosting = form.findField('status').getValue();
        var type = form.findField('inv_type').getValue();
        var piutangdebtor2 =  form.findField('piutangdebtor2').getValue();
        var TotalDetail = me.AR_Sale_DetailStore.getCount({params:{inv_code: me.currInv_Code}});
        if(StatusPosting){
            if(type == 'N'){
                me.CallFunctionSave(form, store);
            }
            else{
                if(TotalDetail > piutangdebtor2){
                    Ext.MessageBox.alert('Warning', 'Nominal Potongan Melebihi Nominal AR');
                }
                else{
                    me.CallFunctionSave(form, store);
                }
            }

        }else{
            me.CallFunctionSave(form, store);
        }



    },
    CallFunctionSave: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record);
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                me.win.close();
                store.load();
                me.AR_Sale_JurnalStore.load({params:{inv_code: me.currInv_Code}});
            },
            failure:function(){
                store.load();
                me.msg('Opps!', 'Error!!', true);
            }
        });
    },
    onProduksi2Save: function(form, store, window){
        var me = this;
        me.saveProduksi2(form, store, window);
    },
    saveProduksi2: function(form, store, window){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record),

            f = me.winformAR_Sale_Detail.down('form').getForm(), rec = f.getRecord();

        form.findField('inv_code').setValue(me.currInv_Code);
        values = form.getValues();
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                me.winformAR_Sale_Detail.close();
                //store.load();
            },
            failure:function(){
                // store.load();
                me.msg('Opps!', 'Error!!', true);
            }
        });
        store.load({params:{inv_code: me.currInv_Code}});
        me.AR_SaleStore.load({params:{inv_code: me.currInv_Code}});
        me.AR_Sale_JurnalStore.load({params:{inv_code: me.currInv_Code}});
    },
    onProduksi3Save: function(form, store, window){
        var me = this;
        me.saveProduksi3(form, store, window);
    },
    saveProduksi3: function(form, store, window){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record),

        f = me.winformAR_Sale_Jurnal.down('form').getForm(), rec = f.getRecord();
        form.findField('inv_code').setValue(me.currInv_Code);
        values = form.getValues();
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                me.winformAR_Sale_Jurnal.close();
                //store.load();
            },
            failure:function(){
                // store.load();
                me.msg('Opps!', 'Error!!', true);
            }
        });
        store.load({params:{inv_code: me.currInv_Code}});
    },

    onPBDelete: function(store){
        var me = this, grid = me.AR_SaleGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('inv_code');
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
                    me.AR_Sale_JurnalStore.load({params:{inv_code: me.currInv_Code}});
                }
            }
        });
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
                    me.AR_SaleStore.load({params:{inv_code: me.currInv_Code}});
                    me.AR_Sale_JurnalStore.load({params:{inv_code: me.currInv_Code}});
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
        this.AR_SaleStore.load({params:{start:0, limit:5}});
        this.AR_Sale_JurnalStore.load();

        callback(true);
    }
});
