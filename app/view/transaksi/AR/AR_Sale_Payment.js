Ext.define('App.view.transaksi.AR.AR_Sale_Payment', {
    extend:'App.ux.RenderPanel',
    id:'panelAR_Sale_Payment',
    pageTitle:'Pembayaran',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent : function()
    {
        var me = this;
        me.dok_no=null;

        Ext.define('AR_PaymentModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'inv_code',type: 'string'},
                {name: 'inv_date',type: 'date'},
                {name: 'giro_num',type: 'string'},
                {name: 'for_inv_code',type: 'string'},
                {name: 'bank_code',type: 'string'},
                {name: 'bank_nama',type: 'string'},
                {name: 'cust_id',type: 'string'},
                {name: 'cust_nama',type: 'string'},
                {name: 'nilaidasar',type: 'float'},
                {name: 'keterangan',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'status',type: 'string'},
                {name: 'inv_type',type: 'string'},
                {name: 'posted_date_ar',type: 'date'},
                {name: 'piutangdebtor',type: 'float'},
                {name: 'posted_date',type: 'date'},
                {name: 'cf_code',type: 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: AR_Sale_Payment.getAR_Sale_Payment,
                    create: AR_Sale_Payment.addAR_Sale_Payment,
                    update: AR_Sale_Payment.updateAR_Sale_Payment,
                    destroy : AR_Sale_Payment.deleteAR_Sale_Payment
                }
            }

        });

        me.AR_PaymentStore = Ext.create('Ext.data.Store', {
            storeId : 'AR_PaymentStore',
            model : 'AR_PaymentModel',
            remoteSort : false
        });
        Ext.define('JurnalModel', {
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
        me.JurnalPaymentStore = Ext.create('Ext.data.Store', {
            model: 'JurnalModel',
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
            disableIndexes:['timeedit']
        }
        me.AR_PaymentGrid = Ext.create('App.ux.GridPanel', {
//            store: Ext.data.StoreManager.lookup('AR_PaymentStore'),
            store : me.AR_PaymentStore,
            height: 330,
            region: 'north',
            features:[searching],
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            listeners: {
                scope: me,
                select: me.onGridClick
            },
            plugins:[
                Ext.create('App.ux.grid.RowFormEditing', {
                    autoCancel:false,
                    errorSummary:false,
                    clicksToEdit:1,
                    formItems:[
                        {
                            xtype:'container',
                            layout:'hbox',
                            width:900,
                            items:[
                                {
                                    xtype:'container',
                                    width:400,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode Dokument',
                                            name:'inv_code',
                                            readOnly:true,
                                            width:300
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tanggal',
                                            format : 'd-m-Y',
                                            value : new Date(),
                                            maxValue : new Date(),
                                            name:'inv_date',
                                            itemId:'tgl_input_arpay',
                                            width:200
                                        },
                                        {
                                            xtype: "radiogroup",
                                            fieldLabel: "Type ",
                                            defaults: {xtype: "radio", name:'inv_type'
                                            },
                                            items: [
                                                {
                                                    boxLabel: "Normal",
                                                    checked: true,
                                                    inputValue:'N',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#for_inv_arpay')[0].setDisabled(false);
                                                            Ext.ComponentQuery.query('#cust_id_pay')[0].setReadOnly(true);
                                                        }
                                                    }

                                                },
                                                {
                                                    boxLabel: "Uang Muka",
                                                    inputValue:'U',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#for_inv_arpay')[0].setDisabled(true);
                                                            Ext.ComponentQuery.query('#cust_id_pay')[0].setReadOnly(false);
                                                        }
                                                    }

                                                }
                                            ]
                                        },
                                        {
                                            xtype:'xtAR_LPIPopup',
                                            fieldLabel:'Kode Invoice',
                                            name:'for_inv_code',
                                            itemId:'for_inv_arpay',
                                            allowBlank:false,
                                            width:300
                                        },
                                        {
                                            xtype:'xtCustomerPopup',
                                            fieldLabel:'Kode Customer',
                                            name:'cust_id',
                                            allowBlank:false,
                                            itemId:'cust_id_pay',
                                            width:200
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            itemId:'piutang_pay',
                                            fieldLabel:'Piutang',
                                            name:'piutangdebtor',
                                            readOnly:true,
                                            width:250
                                        }
                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:400,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype : 'mitos.currency',
                                            hideTrigger:true,
                                            fieldLabel : 'Nominal Bayar',
                                            name:'nilaidasar',
                                            width:250
                                        },
                                        {
                                            xtype : 'xtBankPopup',
                                            fieldLabel : 'Kode Bank',
                                            name:'bank_code',
                                            allowBlank:false,
                                            width:200
                                        },
                                        {
                                            xtype : 'xtCF_IPopup',
                                            fieldLabel : 'Kode Cash Flow',
                                            name:'cf_code',
                                            allowBlank:false,
                                            width:200
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Keterangan',
                                            name: 'keterangan',
                                            width:385
                                        },
                                        {
                                            width: 150,
                                            xtype: 'mitos.checkbox',
                                            fieldLabel: 'Posting',
                                            name: 'status',
                                            handler: function(field, value) {
                                                if (value == true) {
                                                    Ext.ComponentQuery.query('#tgl_posting_arpay')[0].setDisabled(false);
                                                    Ext.ComponentQuery.query('#tgl_posting_arpay')[0].setValue(new Date());
                                                }else{
                                                    Ext.ComponentQuery.query('#tgl_posting_arpay')[0].setDisabled(true);
                                                }

                                            }
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tgl Posting',
                                            format : 'd-m-Y',
                                            value : new Date(),
                                            maxValue : new Date(),
                                            name:'posted_date',
                                            itemId:'tgl_posting_arpay',
                                            disabled:true,
                                            width:200
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                })
            ],
            columns:[
                {header: 'Company',sortable: false, dataIndex: 'co_id', hidden:true},
                {header: 'Kode Dokumen',sortable: false, dataIndex: 'inv_code'},
                {header: 'Tanggal', width : 80, sortable: true, dataIndex: 'inv_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {header: 'Kode Customer',sortable: false, dataIndex: 'cust_id'},
                {header: 'Custumer', flex:1, sortable: false,dataIndex: 'cust_nama'},
                {header: 'Nominal',  sortable: false,dataIndex: 'nilaidasar',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header: 'status',width:70, sortable: true, dataIndex: 'status',hidden:true},
                {header: 'Keterangan', flex:1, sortable: false,dataIndex: 'keterangan'},
                {header: 'LastUpdate', dataIndex: 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'AR_PaymentModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'delete',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });
        me.JurnalGrid = Ext.create('App.ux.GridPanel', {
            store: me.JurnalPaymentStore,
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
            features: [{
                ftype: 'summary'
            }]
        });

        me.pageBody = [ me.AR_PaymentGrid,me.JurnalGrid];
        me.callParent(arguments);

    }, // end of initComponent
    onGridClick: function(grid, selected){
        var me = this;
        me.dok_no = selected.data.inv_code;
        me.JurnalPaymentStore.load({params:{inv_code: me.dok_no}});
        var  deletebtn = me.query('button[action="delete"]')[0];
        if(selected.data.status==1 || selected.data.status==2){
            deletebtn.setDisabled(true);
        }else{
            deletebtn.setDisabled(false);
        }
    },

    onNewRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
        newModel = Ext.ModelManager.create({
        }, model);
        store.insert(0, newModel);
        plugin.startEdit(0, 0);
        Ext.ComponentQuery.query('#tgl_input_arpay')[0].setValue(new Date());
    },

    onDeleteRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin,
            sm = grid.getSelectionModel(),
            selection = grid.getView().getSelectionModel().getSelection()[0];

        plugin.cancelEdit();
        if (selection) {
            Ext.Msg.show({
                title: 'Please Confirm' + '...',
                msg: 'Are you sure want to delete' + ' ?',
                icon: Ext.MessageBox.QUESTION,
                buttons: Ext.Msg.YESNO,
                fn: function(btn){
                    if(btn == 'yes'){
                        store.remove(selection);
                        store.sync();
                        if (store.getCount() > 0) {
                            sm.select(0);
                        }
                    }
                }
            });

        }

    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive : function(callback)
    {
        this.AR_PaymentStore.load();
        this.JurnalPaymentStore.load();
        callback(true);
    }
});
//ens LogPage class