Ext.define('App.view.transaksi.CashBook.Cashbon_Kurang', {
    extend: 'App.ux.RenderPanel',
    id: 'panelCashbon_Kurang',
    pageTitle: 'Penyelesaian CashBon',
    pageLayout: 'anchor',
    uses: ['App.ux.GridPanel'],
    initComponent : function()
    {
        var me = this;
        me.kode = null;
        Ext.define('KBModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'inv_code',type: 'string'},
                {name: 'inv_cb',type: 'string'},
                {name: 'inv_date',type: 'date'},
                {name: 'bank_code',type: 'string'},
                {name: 'bank_nama',type: 'string'},
                {name: 'tax_code',type: 'string'},
                {name: 'tax_nama',type: 'string'},
                {name: 'nominal_1',type: 'float'},
                {name: 'nominal_2',type: 'float'},
                {name: 'remaks',type: 'string'},
                {name: 'status',type: 'string'},
                {name: 'account',type: 'string'},
                {name: 'account_nama',type: 'string'},
                {name: 'posted_date',type: 'date'},
                {name: 'btl_cashbon',type: 'bool'},
                {name: 'cf_code',type: 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Cashbon_Kurang.getCashbon_Kurang,
                    create: Cashbon_Kurang.addCashbon_Kurang,
                    update: Cashbon_Kurang.updateCashbon_Kurang,
                    destroy : Cashbon_Kurang.deleteCashbon_Kurang
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
        me.KBModel = Ext.create('Ext.data.Store', {
            storeId : 'KBModel',
            model : 'KBModel',
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
        me.KasBonGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('KBModel'),
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
                                            itemId:'tgl_input_kasbon',
                                            name:'inv_date',
                                            allowBlank:false,
                                            width:200
                                        },
                                        {
                                            xtype : 'xtCashbonOutPopup',
                                            fieldLabel : 'Kode Kas Bon',
                                            name:'inv_cb',
                                            width:300,
                                            allowBlank:false
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Kode Bank',
                                            name:'bank_code',
                                            itemId:'kode_bank_cb',
                                            width:200,
                                            readOnly:true
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Bank',
                                            name:'bank_nama',
                                            itemId:'bank_kasbon',
                                            width:300,
                                            readOnly:true
                                        },
                                        {
                                            xtype: 'mitos.checkbox',
                                            fieldLabel: 'Batal Kas Bon',
                                            name:'btl_cashbon',
                                            width:150,
                                            handler: function(field, value) {
                                                if (value== true) {
                                                    Ext.ComponentQuery.query('#akun_kasbon')[0].setDisabled(true);
                                                    Ext.ComponentQuery.query('#nominal_kasbon')[0].setDisabled(true);
                                                }else{
                                                    Ext.ComponentQuery.query('#akun_kasbon')[0].setDisabled(false);
                                                    Ext.ComponentQuery.query('#nominal_kasbon')[0].setDisabled(false);
                                                }

                                            }
                                        },
                                        {
                                            xtype:'xtCFPopup',
                                            fieldLabel : 'Kode Cash Flow',
                                            name:'cf_code',
                                            width:200,
                                            allowBlank:false
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Kode Pajak',
                                            name:'tax_code',
                                            itemId:'tax_code_kasbon',
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
                                            xtype : 'xtCoaPopup',
                                            fieldLabel : 'Akun',
                                            name:'account',
                                            itemId:'akun_kasbon',
                                            width:200,
                                            allowBlank:false
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel : 'Jumlah',
                                            name:'nominal_1',
                                            itemId:'nominal_kasbon',
                                            readOnly:true,
                                            width:300
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel : 'Nominal Bayar',
                                            name:'nominal_2',
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
                                                    Ext.ComponentQuery.query('#tgl_post_kasbon')[0].setDisabled(false);
                                                    Ext.ComponentQuery.query('#tgl_post_kasbon')[0].setValue(new Date());
                                                }else{
                                                    Ext.ComponentQuery.query('#tgl_post_kasbon')[0].setDisabled(true);
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
                                            itemId:'tgl_post_kasbon'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                })
            ],
            columns:[
                {text: 'Kode Dokumen',sortable: true,dataIndex: 'inv_code'},
                {width: 80,text: 'Entry Date',sortable: true,dataIndex: 'inv_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'Kode KasBon',sortable: true,dataIndex: 'inv_cb'},
                {text: 'Kode Bank',sortable: true,dataIndex: 'bank_code'},
                {text: 'Kode Pajak',sortable: true,dataIndex: 'tax_code'},
                {text: 'Akun',sortable: true,dataIndex: 'account'},
                {width: 150,text: 'Nominal 1',sortable: true,dataIndex: 'nominal_1', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {width: 150,text: 'Nominal 2',sortable: true,dataIndex: 'nominal_2', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {flex:1,text: 'Remarks',sortable: true,dataIndex: 'remaks'},
                {width: 200,text: 'status',sortable: true,dataIndex: 'status', hidden: true},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'KBModel',
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
        me.JurnalGrid = Ext.create('Ext.grid.Panel', {
            title:'Jurnal',
            store: Ext.data.StoreManager.lookup('JurnalStore'),
            region:'center',
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

        me.pageBody = [me.KasBonGrid, me.JurnalGrid];
        me.callParent(arguments);

    }, // end of initComponent

    onGridClick: function(grid, selected){
        var me = this;
        me.kode = selected.data.inv_code;
        me.JurnalStore.load({params:{inv_code: me.kode}});
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

        Ext.ComponentQuery.query('#tgl_input_kasbon')[0].setValue(new Date());
        Ext.ComponentQuery.query('#tax_code_kasbon')[0].setValue('NT02');
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
        this.KBModel.load();
        this.JurnalStore.load();
        callback(true);
    }
});
//ens LogPage class