Ext.define('App.view.transaksi.AP-Invoice.AP_Invoice', {
    extend: 'App.ux.RenderPanel',
    id: 'panelAP_Invoice',
    pageTitle: 'AP Invoice',
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
        me.currChoose=null;
        var total=0;
        //me.myWinChooseItem=null;


        Ext.define('AP_InvModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'inv_code',type: 'string'},
               {name: 'inv_date',type: 'date'},
                {name: 'gr_num',type: 'string'},
                {name: 'po_num',type: 'string'},
                {name: 'tax_code',type: 'string'},
                {name: 'tax_nama',type: 'string'},
                {name: 'gudang_id',type: 'string'},
                {name: 'nilaidasarx',type: 'string'},
                {name: 'nd_setelah_discx',type: 'string'},
                {name: 'discon',type: 'float'},
                {name: 'remaks',type: 'string'},
                {name: 'vend_id',type: 'string'},
                {name: 'vend_nama',type: 'string'},
                {name: 'ppn_prs',type: 'string'},
                {name: 'ppn_nilaix',type: 'string'},
                {name: 'pph_prs',type: 'string'},
                {name: 'pph_nilaix',type: 'string'},
                {name: 'totalx',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'status',type: 'string'},
                {name: 'inv_type',type: 'string'},
                {name: 'account',type: 'string'},
                {name: 'account_nama',type: 'string'},
                {name: 'choose',type: 'string'},
                {name: 'posted_date',type: 'date'}
            ]

        });
        me.AP_InvStore = Ext.create('Ext.data.Store', {
            model: 'AP_InvModel',
            proxy: {
                type: 'direct',
                api: {
                    read: AP_Invoice.getAP_Inv,
                    create: AP_Invoice.addAP_Inv,
                    update: AP_Invoice.updateAP_Inv,
                    destroy : AP_Invoice.deleteAP_Inv
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });

        Ext.define('AP_Inv_DetailModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'inv_code',type: 'string'},
                {name: 'description',type: 'string'},
                {name: 'qty',type: 'string'},
                {name: 'harga',type: 'string'},
                {name: 'sat_id',type: 'string'},
                {name: 'sequence_no',type: 'string'},
                {name: 'timeedit',type: 'date'}
            ]

        });
        me.AP_Inv_DetailStore = Ext.create('Ext.data.Store', {
            model: 'AP_Inv_DetailModel',
            proxy: {
                type: 'direct',
                api: {
                    read: AP_Invoice.getAP_Inv_Detail,
                    create: AP_Invoice.addAP_Inv_Detail,
                    update: AP_Invoice.updateAP_Inv_Detail,
                    destroy : AP_Invoice.deleteAP_Inv_Detail
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });

        Ext.define('AP_Inv_JurnalModel', {
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
                {name: 'remaks',type: 'string'},
                {name: 'total',type: 'float'}
            ]

        });
        me.AP_Inv_JurnalStore = Ext.create('Ext.data.Store', {
            model: 'AP_Inv_JurnalModel',
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
        me.AP_InvGrid = Ext.create('App.ux.GridPanel', {
            store: me.AP_InvStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {width: 200,text: 'Doc. Number',sortable: true,dataIndex: 'inv_code'},
                {width: 100,text: 'Entry. Date',sortable: true,dataIndex: 'inv_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {width: 100,text: 'GR Number',sortable: true,dataIndex: 'gr_num'},
                {width: 100,text: 'PO Number',sortable: true,dataIndex: 'po_num'},
                {width: 50,text: 'Tax',sortable: true,dataIndex: 'tax_code'},
                {width: 50,text: 'Creditor',sortable: true,dataIndex: 'vend_id'},
                {width: 50,text: 'Gudang',sortable: true,dataIndex: 'gudang_id'},
                {width: 50,text: 'Account',sortable: true,dataIndex: 'account'},
                {width: 100,text: 'Nilai',sortable: true,dataIndex: 'nilaidasarx', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                //{width: 50,text: 'Discon',sortable: true,dataIndex: 'discon',  renderer: Ext.util.Format.numberRenderer('0,000.00')},
               // {width: 100,text: 'Setelah Disc',sortable: true,dataIndex: 'nd_setelah_discx', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {width: 50,text: 'Ppn %',sortable: true,dataIndex: 'ppn_prs'},
                {width: 100,text: 'ppn',sortable: true,dataIndex: 'ppn_nilaix', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {width: 50,text: 'Pph %',sortable: true,dataIndex: 'pph_prs'},
                {width: 100,text: 'Pph',sortable: true,dataIndex: 'pph_nilaix',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {width: 100,text: 'Total',sortable: true,dataIndex: 'totalx',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {width: 200,text: 'Remaks',sortable: true,dataIndex: 'remaks'},
                {width: 200,text: 'status',sortable: true,dataIndex: 'status', hidden: true},
                {width: 200,text: 'choose',sortable: true,dataIndex: 'choose', hidden: true},
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
                        me.onItemdblclick(me.AP_InvStore, record, 'Edit AP');
                        Ext.getCmp('post_ap').enable();
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
                                me.onNewPB(form, 'AP_InvModel', 'Tambah Data');
                                Ext.getCmp('post_ap').disable();
                                Ext.getCmp('posted_date_ap').disable();  Ext.getCmp('inv_date_ap').setValue(new Date());
                                Ext.getCmp('PO_AP').disable();
                                Ext.getCmp('account_ap').disable();

                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Delete',
                            iconCls: 'delete',
                            id:'delete_ap',
                            handler:function() {
                                me.onPBDelete(me.AP_InvStore);
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Detail',
                            iconCls: 'document',
                            scope: me,
                            handler: function(){
                                me.ShowGridPopup(me.AP_Inv_DetailStore, 'Detail Item',me.AP_Inv_DetailGrid);

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
                    store: me.AP_InvStore,
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

        me.AP_Inv_DetailGrid = Ext.create('App.ux.GridPanel', {
            store: me.AP_Inv_DetailStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {width: 200,text: 'Doc. Number',sortable: true,dataIndex: 'inv_code'},
                {width: 200,text: 'sequence_no',sortable: true,dataIndex: 'sequence_no', hidden:true},
                {width: 200,text: 'Description',sortable: true,dataIndex: 'description'},
                {width: 200,text: 'qty',sortable: true,dataIndex: 'qty', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {width: 100,text: 'satuan',sortable: true,dataIndex: 'sat_id'},
                {width: 200,text: 'harga',sortable: true,dataIndex: 'harga',renderer: Ext.util.Format.numberRenderer('0,000.00')},
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
                    if(me.currPosted =='1' || me.currPosted =='2'){
                    }else{
                        me.currBB = record.get('sequence_no');
                        var form = this.winformAP_Inv_Detail.down('form');
                        me.onItemdblclick1(me.AP_Inv_DetailStore, record, 'Edit Detail Item', me.winformAP_Inv_Detail, form);
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
                        id:'add_dt_ap',
                        scope: me,
                        handler: function(){
                            var form1 = me.winformAP_Inv_Detail.down('form');
                            me.onNewProduksi1(form1, 'AP_Inv_DetailModel', 'Tambah Data', me.winformAP_Inv_Detail);
                        }
                    },
                        {
                            xtype: 'button',
                            text: 'Delete',
                            iconCls: 'delete',
                            id:'delete_dt_ap',
                            handler: function() {
                                me.deleteProduksi2(me.AP_Inv_DetailStore, me.AP_Inv_DetailGrid);
                            }
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.AP_Inv_DetailGrid,
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

        me.AP_Inv_JurnalGrid = Ext.create('App.ux.GridPanel', {
            store: me.AP_Inv_JurnalStore,
            region: 'center',
            enablePaging: true,
            features: [{
                ftype: 'summary'
            }],
            columns: [
                {header : 'co_id', dataIndex : 'co_id',width : 200, hidden: true},
                {header : 'Posting Date',dataIndex : 'inv_date',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100},
                {header : 'Doc. Number', dataIndex : 'inv_code',width : 200},
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
            }//,
           // features:[searching]
        });
        function Cal(value, metaData, record, rowIndex, colIndex, store,total) {
            return total = total + record.data.debit;}
        // *************************************************************************************
        // Window User Form
        // *************************************************************************************
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
                            defaults: {hideLabel: true},
                            msgTarget: 'under',
                            name:'inv_code',
                            hidden:true
                        },
                        {
                            xtype: 'fieldcontainer',
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
                                    id:'inv_date_ap',
                                    maxValue: new Date(),
                                    allowBlank:false
                                }
                            ]
                        },
                       {
                            xtype: "radiogroup",
                            fieldLabel: "choose ",
                            defaults: {xtype: "radio", name:'choose'
                            },
                            items: [
                                {
                                    boxLabel: "GRN",
                                    checked: true,
                                    inputValue:'G',
                                    handler: function(field, value) {
                                        if (value) {
                                            Ext.getCmp('PO_AP').disable();
                                            Ext.getCmp('GR_AP').enable();
                                            Ext.getCmp('gudang_id_ap').enable();
                                            Ext.getCmp('account_ap').disable();
                                        }
                                    }

                                },
                                {
                                    boxLabel: "PO",
                                    inputValue:'P',
                                    handler: function(field, value) {
                                        if (value) {
                                            Ext.getCmp('PO_AP').enable();
                                            Ext.getCmp('GR_AP').disable();
                                            Ext.getCmp('gudang_id_ap').enable();
                                            Ext.getCmp('account_ap').disable();
                                        }
                                    }

                                },
                                {
                                    boxLabel: "Other",
                                    inputValue:'O',
                                    handler: function(field, value) {
                                        if (value) {
                                            Ext.getCmp('PO_AP').disable();
                                            Ext.getCmp('GR_AP').disable();
                                            Ext.getCmp('gudang_id_ap').disable();
                                            Ext.getCmp('account_ap').enable();
                                        }
                                    }

                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            id:'GR_AP',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'GR  Num : '
                                },
                                {
                                    width: 200,
                                    xtype: 'xtGRPopup',
                                    name: 'gr_num',
                                    allowBlank:false
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            id:'PO_AP',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'PO  Num : '
                                },
                                {
                                    width: 200,
                                    xtype: 'xtPOPopup',
                                    name: 'po_num',
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
                                    value: 'Tax : '
                                },
                                {
                                    width: 100,
                                    xtype: 'xtTaxMPopup',
                                    name: 'tax_code',
                                    allowBlank: false
                                },
                                {
                                    width: 200,
                                    xtype: 'displayfield',
                                    name:'tax_nama',
                                    id:'tax_code_ap'
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
                                    value: 'Creditor :'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtVendorSuplierPopup',
                                    name: 'vend_id',
                                    id:'vend_id_ap',
                                    allowBlank: false
                                },
                                {
                                    width: 200,
                                    xtype: 'displayfield',
                                    name:'vend_nama',
                                    id:'vend_nama_ap'
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
                                    name: 'gudang_id',
                                    id:'gudang_id_ap',
                                    allowBlank: false

                                },
                                {
                                    width: 50,
                                    xtype: 'displayfield',
                                    value: 'Account : '
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCoaPopup',
                                    name: 'account',
                                    id:'account_ap',
                                    allowBlank: false
                                },
                                {
                                    width: 150,
                                    xtype: 'displayfield',
                                    name:'account_nama',
                                    id:'account_nama_ap'
                                }
                            ]
                        },/*
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
                                    xtype: 'textfield',
                                    name: 'discon'
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
                                    xtype: 'mitos.checkbox',
                                    fieldLabel: 'Posting',
                                    id:'post_ap',
                                    name: 'status',
                                    handler: function(field, value) {
                                       if (value== true) {
                                            Ext.getCmp('posted_date_ap').enable();
                                           Ext.getCmp('posted_date_ap').setValue(new Date());

                                       }else{
                                            Ext.getCmp('posted_date_ap').disable();
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
                                    id:'posted_date_ap'
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
                            me.onPBSave(form, me.AP_InvStore);
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
        me.winformAP_Inv_Detail = Ext.create('App.ux.window.Window', {
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
                                    id:'qty_dt_ap',
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
                                    value: 'Satuan :'
                                },
                                {
                                    width: 200,
                                    xtype: 'xtSatuanPopup',
                                    name:'sat_id',
                                    id:'sat_ap'
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
                                    value: 'Harga :'
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
                        var form = me.winformAP_Inv_Detail.down('form').getForm();
                        if(form.isValid()){
                            me.onProduksi2Save(form, me.AP_Inv_DetailStore, me.winformAP_Inv_Detail);
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
                    me.action1('close', me.winformAP_Inv_Detail);
                }
            }
        });



        me.pageBody = [me.AP_InvGrid, me.AP_Inv_JurnalGrid];
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
        me.currChoose = selected.data.choose;
        var TopBarItems = this.AP_InvGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);
        me.AP_Inv_JurnalStore.load({params:{inv_code: me.currInv_Code}});
        if(selected.data.status == 1 || selected.data.status == 2){
            Ext.getCmp('delete_ap').disable();
            Ext.getCmp('delete_dt_ap').disable();
            Ext.getCmp('add_dt_ap').disable();
        }else{
            Ext.getCmp('delete_ap').enable();
            Ext.getCmp('delete_dt_ap').enable();
            Ext.getCmp('add_dt_ap').enable();
        }
        if( me.currChoose == 'O'){
            Ext.getCmp('qty_dt_ap').disable();
            Ext.getCmp('sat_ap').disable();
        }else{
            Ext.getCmp('qty_dt_ap').enable();
            Ext.getCmp('sat_ap').enable();
        }

    },

    onItemdblclick: function(store, record, title){
        var form = this.win.down('form');
        this.setForm(form, title);
        form.getForm().loadRecord(record);
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
        var CountDetail = me.AP_Inv_DetailStore.getCount({params:{inv_code: me.currInv_Code}});
        if(StatusPosting){
            if(CountDetail > 0){
                me.CallFucntionSave(store, form);
            }else{
                Ext.MessageBox.alert('Warning', 'Detail AP Belum Terisi');
            }
        }else{
            me.CallFucntionSave(store, form);
        }
    },

    CallFucntionSave: function(store, form){
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
            me.AP_Inv_JurnalStore.load({params:{inv_code: me.currInv_Code}});
        },
        failure:function(){
            store.load();
            me.msg('Opps!', 'Error!!', true);
            me.win.close();
        }
    });
},
    onProduksi2Save: function(form, store, window){
        var me = this;
        me.saveProduksi2(form, store, window);
    },
    saveProduksi2: function(form, store, window){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record),

            f = me.winformAP_Inv_Detail.down('form').getForm(), rec = f.getRecord();

        form.findField('inv_code').setValue(me.currInv_Code);
        values = form.getValues();
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                me.winformAP_Inv_Detail.close();
                //store.load();
            },
            failure:function(){
                // store.load();
                me.msg('Opps!', 'Error!!', true);
            }
        });
        store.load({params:{inv_code: me.currInv_Code}});
        me.AP_InvStore.load({params:{inv_code: me.currInv_Code}});
        me.AP_Inv_JurnalStore.load({params:{inv_code: me.currInv_Code}});
    },

    onPBDelete: function(store){
        var me = this, grid = me.AP_InvGrid;
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
                    me.AP_Inv_JurnalStore.load({params:{inv_code: me.currInv_Code}});
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
                    me.AP_InvStore.load({params:{inv_code: me.currInv_Code}});
                    me.AP_Inv_JurnalStore.load({params:{inv_code: me.currInv_Code}});
                }
            }
        })
    },

    onActive: function(callback){
        var me = this;
        this.AP_InvStore.load({params:{start:0, limit:5}});
        this.AP_Inv_JurnalStore.load();

        callback(true);
    }
});
