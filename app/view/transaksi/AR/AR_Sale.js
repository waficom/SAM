Ext.define('App.view.transaksi.AR.AR_Sale', {
    extend: 'App.ux.RenderPanel',
    id: 'panelAR_Sale',
    pageTitle: 'AR Penjualan',
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
        me.counter=0;
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
                {name: 'tgl_jt',type: 'date'},
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
                {name: 'qty_do',type: 'float'},
                {name: 'qty',type: 'float'},
                {name: 'qty_susut',type: 'float'},
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
                {text: 'Doc. Number',sortable: true,dataIndex: 'inv_code'},
                {text: 'Entry Date',sortable: true,dataIndex: 'inv_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'Due Date',sortable: true,dataIndex: 'tgl_jt', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'DO Num',sortable: true,dataIndex: 'do_num'},
                {text: 'Doc. AR',sortable: true,dataIndex: 'for_inv_code'},
                {text: 'Acc. Number',sortable: true,dataIndex: 'account'},
                {text: 'Tax Code',sortable: true,dataIndex: 'tax_code'},
                {flex: 1,text: 'Customer',sortable: true,dataIndex: 'cust_id'},
                {text: 'Nominal',sortable: true,dataIndex: 'nilaidasarx',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Discon',sortable: true,dataIndex: 'discon'},
                {text: 'Setelah Disc',sortable: true,dataIndex: 'nd_setelah_discx',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Ppn %',sortable: true,dataIndex: 'ppn_prs'},
                {text: 'ppn',sortable: true,dataIndex: 'ppn_nilaix', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Pph %',sortable: true,dataIndex: 'pph_prs'},
                {text: 'Pph',sortable: true,dataIndex: 'pph_nilaix', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Total',sortable: true,dataIndex: 'totalx', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Remaks',sortable: true,dataIndex: 'remaks'},
                {text: 'status',sortable: true,dataIndex: 'status', hidden: true},
                {text: 'inv_type',sortable: true,dataIndex: 'inv_type', hidden: true},
                {text: 'account_type',sortable: true,dataIndex: 'account_type', hidden: true},
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
                        Ext.getCmp('post_ar').setDisabled(false);
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
                                Ext.getCmp('inv_date_ar').setValue(new Date());
                                Ext.getCmp('tgl_jt_ar').setValue(new Date());
                                Ext.getCmp('at_Y_ar').setDisabled(false);
                                me.counter=0;
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
                                me.counter=1;
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
                {text: 'Doc. Number',sortable: true,dataIndex: 'inv_code', hidden: true},
                {text: 'sequence_no',sortable: true,dataIndex: 'sequence_no', hidden:true},
                {flex:1,text: 'Description',sortable: true,dataIndex: 'description'},
                {text: 'Qty DO',sortable: true,dataIndex: 'qty_do', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Qty AR',sortable: true,dataIndex: 'qty', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Qty Susut',sortable: true,dataIndex: 'qty_susut', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Satuan',sortable: true,dataIndex: 'sat_id'},
                {text: 'Nominal',sortable: true,dataIndex: 'harga',renderer: Ext.util.Format.numberRenderer('0,000.00')},
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
                {header : 'Doc. Number', dataIndex : 'inv_code'},
                {header : 'Creditor', dataIndex : 'vend_id'},
                {header : 'Coa', dataIndex : 'coa'},
                {header : 'Description', dataIndex : 'coa_nama',flex:1, summaryRenderer: function(){
                    return '<b>Total</b>';
                }},
                {header : 'Debit', dataIndex : 'debit',width : 150,renderer: Ext.util.Format.numberRenderer('0,000.00'),  summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'Credit', dataIndex : 'credit',width : 150,renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'sequence_no', dataIndex : 'sequence_no',width : 150, hidden: true},
                {header : 'Remarks', dataIndex : 'remaks'},
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
                                            //Ext.getCmp('gudang_id_ar').enable();
                                            Ext.getCmp('do_num_ar').enable();
                                            Ext.getCmp('for_inv_ar').setDisabled(true);
                                            Ext.getCmp('at_Y_ar').setDisabled(false);
                                        }
                                    }

                                },
                                {
                                    boxLabel: "Potongan",
                                    inputValue:'P',
                                    handler: function(field, value) {
                                        if (value) {
                                            Ext.getCmp('tax_ar').disable();
                                            // Ext.getCmp('gudang_id_ar').disable();
                                            Ext.getCmp('at_Y_ar').setDisabled(true);
                                            Ext.getCmp('do_num_ar').disable();
                                            Ext.getCmp('for_inv_ar').setDisabled(false);
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
                                },
                                {
                                    width: 60,
                                    xtype: 'displayfield',
                                    value: 'Due Date'
                                },
                                {
                                    xtype : 'datefield',
                                    width : 100,
                                    name : 'tgl_jt',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s',
                                    id:'tgl_jt_ar',
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
                                    width: 60,
                                    xtype: 'displayfield',
                                    value: 'Doc. AR :'
                                },
                                {
                                    width: 180,
                                    xtype: 'xtARPopup',
                                    name: 'for_inv_code',
                                    allowBlank: false,
                                    disabled: true,
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
                            fieldLabel: "Account/Susut ", id:'at_Y_ar',
                            defaults: {xtype: "radio", name:'account_type'
                            },disabled:true,
                            items: [
                                {
                                    boxLabel: "Y",
                                    inputValue:'Y',
                                    handler: function(field, value) {
                                        if (value) {
                                            Ext.getCmp('account_ar').setDisabled(false);
                                        }
                                    }
                                },
                                {
                                    boxLabel: "N",
                                    inputValue:'N',
                                    checked: true,
                                    handler: function(field, value) {
                                        if (value) {
                                            Ext.getCmp('account_ar').setDisabled(true);
                                        }
                                    }
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCoaPopup',
                                    name: 'account',
                                    allowBlank: false,
                                    id:'account_ar',
                                    disabled:true
                                },
                                {
                                    width: 200,
                                    xtype: 'displayfield',
                                    name:'account_nama',
                                    itemId:'akun_nama_ar'
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
                                    disabled: true,
                                    name: 'status',
                                    handler: function(field, value) {
                                        if (value== true) {
                                            Ext.getCmp('posted_date_ar').setDisabled(false);
                                            Ext.getCmp('posted_date_ar').setValue(new Date());
                                        }else{
                                            Ext.getCmp('posted_date_ar').setDisabled(true);
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
                        /*{
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
                         },*/
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
                                    xtype: 'mitos.currency',
                                    hideTrigger: true
                                },
                                {
                                    width: 50,
                                    xtype: 'xtSatuanPopup',
                                    name:'sat_id',
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
                                    value: 'Qty Susut :'
                                },
                                {
                                    fieldLabel : 'qty',
                                    labelAlign : 'right',
                                    name: 'qty_susut',
                                    xtype: 'mitos.currency',
                                    hideTrigger: true,
                                    id:'qty_susut_ar',
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
                                    value: 'Nominal :'
                                },
                                {
                                    fieldLabel : 'Harga',
                                    labelAlign : 'right',
                                    name: 'harga',
                                    xtype: 'mitos.currency',
                                    hideTrigger: true,
                                    id:'hrg_ar_sale'
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
                            me.onProduksi2Save(form, me.AR_Sale_DetailStore);
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
            Ext.getCmp('qty_susut_ar').setReadOnly(true)
            Ext.getCmp('hrg_ar_sale').setReadOnly(false)
        }else{
            if(selected.data.account == null || selected.data.account==''){
                Ext.getCmp('qty_susut_ar').setReadOnly(true)
            }else{
                Ext.getCmp('qty_susut_ar').setReadOnly(false)
            }
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
        var me = this, showWin =me.win ;
        var totalDebit= 0, totalCredit= 0;
        me.AR_Sale_JurnalStore.each(function(record){
            if(record.get('inv_code') == me.currInv_Code ) {
                totalDebit += record.get('debit');
                totalCredit += record.get('credit');
            }
        });
        var StatusPosting = form.findField('status').getValue();
        if(StatusPosting){
            if(me.counter > 0){
                if((totalDebit == 0 && totalCredit==0)){
                    Ext.MessageBox.alert('Warning', 'Detail Data Masih Belum Terisi..!!');
                }
                else if(totalDebit != totalCredit){
                    Ext.MessageBox.alert('Warning', 'Debit Credit Tidak Balance..!!');
                }else{
                    me.CallFunctionSave(form, store, showWin);
                }
            }else{
                Ext.MessageBox.alert('Warning', 'Cek Detail di Harga / Qty Jual');
            }
        }else{
            me.CallFunctionSave(form, store, showWin);
        }



    },

    CallFunctionSave: function(form, store, showWin){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record);
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                showWin.close();
                store.load();
                store.load({params:{inv_code: me.currInv_Code}});
                me.AR_Sale_JurnalStore.load({params:{inv_code: me.currInv_Code}});
            },
            failure:function(){
                //me.msg('Opps!', 'Error!!', true);
                Ext.MessageBox.alert('Opps', 'Error..!!');
            }
        });
    },
    onProduksi2Save: function(form, store){
        var me = this, showWin=me.winformAR_Sale_Detail;
        form.findField('inv_code').setValue(me.currInv_Code);
        var qty_kirim = form.findField('qty').getValue();
        var qty_susut = form.findField('qty_susut').getValue();
        var total_nominal = form.findField('harga').getValue();
        me.AR_SaleStore.each(function(record){
            if(record.get('inv_code') == me.currInv_Code ) {
                if(record.get('inv_type')=='P'){
                    if(total_nominal > record.get('piutangdebtor2')){
                        Ext.MessageBox.alert('Warning', 'Nominal Potongan Melebihi Nominal AR');
                    }else{
                        me.CallFunctionSave(form, store, showWin);
                    }
                }else{
                    if(qty_susut > qty_kirim){
                        Ext.MessageBox.alert('Warning', 'Qty Susut Melebihi Qty Kirim');
                    }else{
                        me.CallFunctionSave(form, store, showWin);
                    }
                }
            }
        });
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