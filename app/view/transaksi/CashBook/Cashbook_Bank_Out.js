Ext.define('App.view.transaksi.CashBook.Cashbook_Bank_Out', {
    extend: 'App.ux.RenderPanel',
    id: 'panelCashbook_Bank_Out',
    pageTitle: 'Bank Keluar',
    pageLayout: 'anchor',
    uses: ['App.ux.GridPanel'],
    initComponent : function()
    {
        var me = this;
        me.kode = null;
        Ext.define('CB_OUTModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'inv_code',type: 'string'},
                {name: 'inv_date',type: 'date'},
                {name: 'bank_code',type: 'string'},
                {name: 'received_from',type: 'string'},
                {name: 'nominal',type: 'float'},
                {name: 'remaks',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'status',type: 'string'},
                {name: 'tax_code',type: 'string'},
                {name: 'posted_date',type: 'date'},
                {name: 'cf_code',type: 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Cashbook_Bank_Out.getCashbook_Bank_Out,
                    create: Cashbook_Bank_Out.addCashbook_Bank_Out,
                    update: Cashbook_Bank_Out.updateCashbook_Bank_Out,
                    destroy : Cashbook_Bank_Out.deleteCashbook_Bank_Out
                }
            }

        });
        Ext.define('CB_OUTDetailModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'inv_code',type: 'string'},
                {name: 'account',type: 'string'},
                {name: 'status',type: 'string'},
                {name: 'coa_nama',type: 'string'},
                {name: 'nominal',type: 'float'},
                {name: 'timeedit',type: 'date'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Cashbook_Bank_In.getCashbook_Bank_In_Detail,
                    create: Cashbook_Bank_In.addCashbook_Bank_In_Detail,
                    update: Cashbook_Bank_In.updateCashbook_Bank_In_Detail,
                    destroy : Cashbook_Bank_In.deleteCashbook_Bank_In_Detail
                }
            }

        });
        Ext.define('JurnalModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'inv_date',type: 'date'},
                {name: 'inv_code',type: 'string'},
                {name: 'vend_id',type: 'string'},
                {name: 'coa',type: 'string'},
                {name: 'coa_nama',type: 'string'},
                {name: 'harga',type: 'string'},
                {name: 'debit',type: 'float'},
                {name: 'credit',type: 'float'},
                {name: 'sequence_no',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'remaks',type: 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Jurnal.getJurnal
                }
            }

        });
        me.CB_OUTStore = Ext.create('Ext.data.Store', {
            storeId : 'CB_OUTStore',
            model : 'CB_OUTModel',
            remoteSort : false
        });
        me.CB_OUTDetailStore = Ext.create('Ext.data.Store', {
            storeId : 'CB_OUTDetailStore',
            model : 'CB_OUTDetailModel',
            remoteSort : false
        });
        me.JurnalStore = Ext.create('Ext.data.Store', {
            storeId : 'JurnalStore',
            model : 'JurnalModel',
            remoteSort : false
        });
        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit','tanggal']
        }
        me.CB_OUTGrid = Ext.create('Ext.grid.Panel', {
            title:'Cash Book',
            store: Ext.data.StoreManager.lookup('CB_OUTStore'),
            height: 370,
            margin: '0 0 3 0',
            region: 'north',
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
            features:[searching],
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
                                            fieldLabel:'Kode Dokumen',
                                            name:'inv_code',
                                            valueText:'otomatis',
                                            readOnly: true,
                                            width:300
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tgl Input',
                                            format : 'd-m-Y',
                                            itemId:'tgl_input_bankout',
                                            name:'inv_date',
                                            allowBlank:false,
                                            width:200
                                        },
                                        {
                                            xtype : 'xtBankPopup',
                                            fieldLabel : 'Kode Bank',
                                            name:'bank_code',
                                            allowBlank:false,
                                            width:200
                                        },
                                        {
                                            xtype : 'xtCF_OPopup',
                                            fieldLabel : 'Kode Cash Flow',
                                            name:'cf_code',
                                            allowBlank:false,
                                            width:200
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Kode Pajak',
                                            name:'tax_code',
                                            itemId:'tax_code_bankout',
                                            readOnly:true,
                                            width:200
                                        }
                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:400,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'xtVendorSuplierPopup',
                                            fieldLabel:'Dibayar ke',
                                            name:'received_from',
                                            allowBlank:false,
                                            width:200
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel : 'Nominal',
                                            name:'nominal',
                                            width:300
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Keterangan',
                                            name:'remaks',
                                            width:300
                                        },
                                        {
                                            xtype : 'mitos.checkbox',
                                            fieldLabel : 'Posting',
                                            name:'status',
                                            width:150,
                                            handler: function(field, value) {
                                                if (value== true) {
                                                    Ext.ComponentQuery.query('#tgl_post_bankout')[0].setDisabled(false);
                                                    Ext.ComponentQuery.query('#tgl_post_bankout')[0].setValue(new Date());
                                                }else{
                                                    Ext.ComponentQuery.query('#tgl_post_bankout')[0].setDisabled(true);
                                                }

                                            }
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tgl Posting',
                                            format : 'd-m-Y',
                                            maxValue : new Date(),
                                            name:'posted_date',
                                            disabled:true,
                                            width:200,
                                            itemId:'tgl_post_bankout'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                })
            ],
            columns:[
                {header: 'Company',sortable: true,dataIndex: 'co_id', hidden:true},
                {header: 'Doc Number',sortable: true,dataIndex: 'inv_code'},
                {width: 80,text: 'Entry Date',sortable: true,dataIndex: 'inv_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'Kode Bank',sortable: true,dataIndex: 'bank_code'},
                {text: 'Dari Customer',sortable: true,dataIndex: 'received_from'},
                {text: 'Nominal',sortable: true,dataIndex: 'nominal', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {flex:1,text: 'Keterangan',sortable: true,dataIndex: 'remaks'},
                {text: 'status',sortable: true,dataIndex: 'status', hidden: true},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'CB_OUTModel',
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
        me.CB_INDetailGrid = Ext.create('Ext.grid.Panel', {
            title:'Rincian Detail',
            store: Ext.data.StoreManager.lookup('CB_OUTDetailStore'),
            height: 370,
            margin: '0 0 3 0',
            region: 'north',
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == 'B' ? 'child-row' : (record.get('status') == 'C' ? 'yellow-row':'');
                }
            },
            plugins:[
                Ext.create('App.ux.grid.RowFormEditing2', {
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
                                            fieldLabel:'Kode Dokumen',
                                            name:'inv_code',
                                            itemId:'inv_code_bankout',
                                            hidden: true,
                                            width:300
                                        },
                                        {
                                            xtype : 'xtCoaPopup',
                                            fieldLabel : 'Kode Akun',
                                            name:'account',
                                            width:200
                                        },
                                        {
                                            xtype: 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel : 'Nominal',
                                            name:'nominal',
                                            width:300
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                })
            ],
            columns:[
                {header: 'Company',sortable: true,dataIndex: 'co_id', hidden:true},
                {header: 'Account',sortable: true,dataIndex: 'account'},
                {header: 'Description',sortable: true,dataIndex: 'coa_nama', flex:1},
                {width: 150,text: 'Nominal',sortable: true,dataIndex: 'nominal', renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00'), id:'SumNominal'},
                {text: 'status',sortable: true,dataIndex: 'status', hidden: true},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'CB_OUTDetailModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'delete002',
                    scope:me,
                    handler:me.onDeleteRec
                },
                {
                    text:'Refresh',
                    iconCls:'icoGreen',
                    scope:me,
                    handler:me.onRefresh
                }

            ]
        });
        me.JurnalGrid = Ext.create('Ext.grid.Panel', {
            title:'Jurnal',
            store: Ext.data.StoreManager.lookup('JurnalStore'),
            region:'center',
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == 'B' ? 'child-row' : (record.get('status') == 'C' ? 'yellow-row':'');
                }
            },
            columns:[
                {header : 'co_id', dataIndex : 'co_id', hidden: true},
                {header : 'Posting Date',dataIndex : 'inv_date',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100},
                {header : 'Doc. Number', dataIndex : 'inv_code'},
                {header : 'Creditor', dataIndex : 'vend_id'},
                {header : 'Coa', dataIndex : 'coa'},
                {header : 'Description', dataIndex : 'coa_nama',flex:1, summaryRenderer: function(){
                    return '<b>Total</b>';
                }},
                {header : 'Debit', dataIndex : 'debit',width : 150,renderer: Ext.util.Format.numberRenderer('0,000.00'),  summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'Credit', dataIndex : 'credit',width : 150,renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'Remarks', dataIndex : 'remaks', flex:1},
                {header : 'LastUpdate',dataIndex : 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100}
            ],features: [{
                ftype: 'summary'
            }]
        });
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.CB_OUTGrid, me.CB_INDetailGrid ]
        });
        me.pageBody = [me.FormulirPanel, me.JurnalGrid];
        me.callParent(arguments);

    }, // end of initComponent

    onGridClick: function(grid, selected){
        var me = this;
        me.kode = selected.data.inv_code;
        me.CB_OUTDetailStore.load({params:{inv_code: me.kode}});
        me.JurnalStore.load({params:{inv_code: me.kode}});

        var  deletebtn = me.query('button[action="delete"]')[0],
            delete002btn = me.query('button[action="delete002"]')[0],
            tambahbtn =  me.query('button[action="CB_OUTDetailModel"]')[0];
        if(selected.data.status==1 || selected.data.status==2){
            deletebtn.setDisabled(true);
            delete002btn.setDisabled(true);
            tambahbtn.setDisabled(true);
        }else{
            deletebtn.setDisabled(false);
            delete002btn.setDisabled(false);
            tambahbtn.setDisabled(false);
        }

    },
    onRefresh:function(btn){
        var me = this;
        me.JurnalStore.load({params:{inv_code: me.kode}});

    },
    onNewRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
        newModel = Ext.ModelManager.create({
        }, model);
        store.insert(0, newModel);
        plugin.startEdit(0, 0);
        if(model == 'CB_OUTDetailModel'){
            Ext.ComponentQuery.query('#inv_code_bankout')[0].setValue(me.kode);
        }else{
            Ext.ComponentQuery.query('#tgl_input_bankout')[0].setValue(new Date());
            Ext.ComponentQuery.query('#tax_code_bankout')[0].setValue('NT01');
        }

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
        this.CB_OUTStore.load();
        this.CB_OUTDetailStore.load();
        this.JurnalStore.load();
        callback(true);
    }
});
//ens LogPage class