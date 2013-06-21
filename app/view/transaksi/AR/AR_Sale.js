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
        me.curr_coid = null;
        me.userinput =null;
        me.useredit=null;
        //me.myWinChooseItem=null;

        Ext.define('AR_SaleModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'inv_code',type: 'string'},
                {name: 'inv_code_revisi',type: 'string'},
                {name: 'inv_date',type: 'date'},
                {name: 'so_num',type: 'string'},
                {name: 'po_num',type: 'string'},
                {name: 'tax_code',type: 'string'},
                {name: 'gudang_id',type: 'string'},
                {name: 'nilaidasarx',type: 'string'},
                {name: 'nd_setelah_discx',type: 'string'},
                {name: 'discon',type: 'string'},
                {name: 'remaks',type: 'string'},
                {name: 'cust_id',type: 'string'},
                {name: 'ppn_prs',type: 'string'},
                {name: 'ppn_nilaix',type: 'string'},
                {name: 'pph_prs',type: 'string'},
                {name: 'pph_nilaix',type: 'string'},
                {name: 'totalx',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'status',type: 'string'},
                {name: 'inv_type',type: 'string'}
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
                {name: 'harga',type: 'string'},
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
                {name: 'inv_code',type: 'string'},
                {name: 'vend_id',type: 'string'},
                {name: 'coa',type: 'string'},
                {name: 'debit',type: 'string'},
                {name: 'credit',type: 'string'},
                {name: 'sequence_no',type: 'string'},
                {name: 'timeedit',type: 'date'}
            ]

        });
        me.AR_Sale_JurnalStore = Ext.create('Ext.data.Store', {
            model: 'AR_Sale_JurnalModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Jurnal.getJurnal,
                    create: Jurnal.addJurnal,
                    update: Jurnal.updateJurnal,
                    destroy : Jurnal.deleteJurnal
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
            columns: [
                {width: 100,text: 'Inv. Number',sortable: true,dataIndex: 'inv_code'},
                {width: 100,text: 'Inv. Revisi',sortable: true,dataIndex: 'inv_code_revisi'},
                {width: 100,text: 'Inv. Date',sortable: true,dataIndex: 'inv_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {width: 100,text: 'SO Number',sortable: true,dataIndex: 'so_num'},
                {width: 100,text: 'PO Number',sortable: true,dataIndex: 'po_num'},
                {width: 50,text: 'Tax',sortable: true,dataIndex: 'tax_code'},
                {width: 50,text: 'Customer',sortable: true,dataIndex: 'customer'},
                {width: 50,text: 'Gudang',sortable: true,dataIndex: 'gudang_id'},
                {width: 100,text: 'Nilai',sortable: true,dataIndex: 'nilaidasarx',renderer: Ext.util.Format.numberRenderer('0,000.00')},
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
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}

            ],
            listeners: {
                scope: me,
                select: me.onPBGridClick,
                itemdblclick: function(view, record){
                    me.onItemdblclick(me.AR_SaleStore, record, 'Edit PB');
                   Ext.getCmp('return_ar').enable();
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
                                Ext.getCmp('return_ar').disable();
                                Ext.getCmp('po_ar').disable();
                                Ext.getCmp('inv_code_rev_ar').disable();
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler:function() {
                                me.onPBDelete(me.AR_SaleStore);
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Detail',
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
                {width: 200,text: 'Inv. Number',sortable: true,dataIndex: 'inv_code'},
                {width: 200,text: 'sequence_no',sortable: true,dataIndex: 'sequence_no', hidden:true},
                {width: 200,text: 'Description',sortable: true,dataIndex: 'description'},
                {width: 200,text: 'qty',sortable: true,dataIndex: 'qty'},
                {width: 100,text: 'satuan',sortable: true,dataIndex: 'sat_id'},
                {width: 200,text: 'harga',sortable: true,dataIndex: 'harga',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}

            ],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    me.currBB = record.get('sequence_no');
                    var form = this.winformAR_Sale_Detail.down('form');
                    me.onItemdblclick1(me.AR_Sale_DetailStore, record, 'Edit Detail Item', me.winformAR_Sale_Detail, form);
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
                {header : 'Inv. Code', dataIndex : 'inv_code',width : 200},
                {header : 'Customer', dataIndex : 'vend_id',width : 200},
                {header : 'Coa', dataIndex : 'coa',width : 200},
                {header : 'Debit', dataIndex : 'debit',width : 200,renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'Credit', dataIndex : 'credit',width : 200,renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'sequence_no', dataIndex : 'sequence_no',width : 150, hidden: true},
                {header : 'LastUpdate',dataIndex : 'timeedit',renderer: Ext.util.Format.numberRenderer('0,000.00')}
            ],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    var form = this.winformAR_Sale_Jurnal.down('form');
                    me.onItemdblclick1(me.AR_Sale_JurnalStore, record, 'Edit AR Sale Jurnal', me.winformAR_Sale_Jurnal, form);
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
                            var form1 = me.winformAR_Sale_Jurnal.down('form');
                            me.onNewProduksi1(form1, 'AR_Sale_JurnalModel', 'Tambah Data', me.winformAR_Sale_Jurnal);
                        }
                    },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteProduksi1(me.AR_Sale_JurnalStore, me.AR_Sale_JurnalGrid);
                            }
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.AR_Sale_JurnalGrid,
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
                                            Ext.getCmp('inv_code_rev_ar').disable();
                                        }
                                    }

                                },
                                {
                                    boxLabel: "Revisi",
                                    inputValue:'R',
                                    handler: function(field, value) {
                                        if (value) {
                                            Ext.getCmp('inv_code_rev_ar').enable();
                                        }
                                    }

                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            id:'inv_code_rev_ar',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [

                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Inv. Revisi : '
                                },
                                {
                                    width: 200,
                                    xtype: 'textfield',
                                    name: 'inv_code_revisi'

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
                                    value: 'inv_date'
                                },
                                {
                                    fieldLabel : 'Inv. Date',
                                    xtype : 'datefield',
                                    width : 100,
                                    name : 'inv_date',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s'
                                }
                            ]
                        },
                       {
                            xtype: "radiogroup",
                            fieldLabel: "choose ",
                            defaults: {xtype: "radio", name:'xxxx'
                            },
                            items: [
                                {
                                    boxLabel: "SO NUM",
                                    checked: true,
                                    inputValue:'S',
                                    handler: function(field, value) {
                                        if (value) {
                                            Ext.getCmp('po_ar').disable();
                                            Ext.getCmp('so_num_ar').enable();
                                        }
                                    }

                                },
                                {
                                    boxLabel: "PO",
                                    inputValue:'P',
                                    handler: function(field, value) {
                                        if (value) {
                                            Ext.getCmp('po_ar').enable();
                                            Ext.getCmp('so_num_ar').disable();
                                        }
                                    }

                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            id:'so_num_ar',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [

                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'SO Num : '
                                },
                                {
                                    width: 200,
                                    xtype: 'xtSalesOrderPopup',
                                    name: 'so_num'

                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            id:'po_ar',
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
                                    name: 'po_num'

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
                                    value: 'Tax : '
                                },
                                {
                                    width: 200,
                                    xtype: 'xtTaxPopup',
                                    name: 'tax_code',
                                    allowBlank: false
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
                                    value: 'Customer : '
                                },
                                {
                                    width: 200,
                                    xtype: 'xtCustomerPopup',
                                    name: 'cust_id',
                                    allowBlank: false
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
                                    width: 200,
                                    xtype: 'xtGudangPopup',
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
                                    value: 'Discon % : '
                                },
                                {
                                    width: 50,
                                    xtype: 'textfield',
                                    name: 'discon'
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
                                    xtype: 'mitos.checkbox',
                                    fieldLabel: 'Return',
                                    id:'return_ar',
                                    name: 'status'
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
        me.winformAR_Sale_Jurnal = Ext.create('App.ux.window.Window', {
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
                            xtype: 'fieldcontainer',
                            defaults: {hideLabel: true},
                            msgTarget: 'under',
                            name:'sequence_no',
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
                                    value: 'Coa '
                                },
                                {
                                    width: 200,
                                    xtype: 'textfield',
                                    name: 'coa'
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'vend_id'

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
                                    value: 'Debit :'
                                },
                                {
                                    fieldLabel : 'Debit',
                                    labelAlign : 'right',
                                    name: 'debit',
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
                                    value: 'Credit :'
                                },
                                {
                                    fieldLabel : 'Credit',
                                    labelAlign : 'right',
                                    name: 'credit',
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
                        var form = me.winformAR_Sale_Jurnal.down('form').getForm();
                        if(form.isValid()){
                            me.onProduksi3Save(form, me.AR_Sale_JurnalStore, me.winformAR_Sale_Jurnal);
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
                    me.action1('close', me.winformAR_Sale_Jurnal);
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
        var TopBarItems = this.AR_SaleGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);
        me.AR_Sale_JurnalStore.load({params:{inv_code: me.currInv_Code}});

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
//                    PB.deletePB(bid);
                    store.remove(sm.getSelection());
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        });
    },
    deleteProduksi1: function(store, grid){
        var me = this,
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