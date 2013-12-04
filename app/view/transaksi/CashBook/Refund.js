Ext.define('App.view.transaksi.CashBook.Refund', {
    extend: 'App.ux.RenderPanel',
    id: 'panelRefund',
    pageTitle: 'Refund',
    pageLayout: 'anchor',
    uses: ['App.ux.GridPanel'],
    initComponent : function()
    {
        var me = this;
        me.kode = null;
        Ext.define('RefundModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'inv_code',type: 'string'},
                {name: 'inv_date',type: 'date'},
                {name: 'inv_type',type: 'string'},
                {name: 'inv_um',type: 'string'},
                {name: 'vend_id',type: 'string'},
                {name: 'cust_id',type: 'string'},
                {name: 'nominal_um',type: 'float'},
                {name: 'nominal',type: 'float'},
                {name: 'keterangan',type: 'string'},
                {name: 'status',type: 'string'},
                {name: 'posted_date',type: 'date'},
                {name: 'timeedit',type: 'date'},
                {name: 'bank_code',type: 'string'},
                {name: 'cf_code',type: 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Refund.getRefund,
                    create: Refund.addRefund,
                    update: Refund.updateRefund,
                    destroy : Refund.deleteRefund
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
        me.RefundModel = Ext.create('Ext.data.Store', {
            storeId : 'RefundModel',
            model : 'RefundModel',
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
        me.RefundGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('RefundModel'),
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
                                    width:450,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode Dokumen',
                                            name:'inv_code',
                                            readOnly: true,
                                            width:300
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tgl Input',
                                            format : 'd-m-Y',
                                            itemId:'tgl_input_rf',
                                            name:'inv_date',
                                            allowBlank:false,
                                            width:200
                                        },
                                        {
                                            xtype: "radiogroup",
                                            fieldLabel: "Jenis",
                                            width:300,
                                            defaults: {xtype: "radio", name:'inv_type'
                                            },
                                            items: [
                                                {
                                                    boxLabel: 'AP UM',
                                                    inputValue:'P',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#inv_code_rf')[0].remove(0);
                                                            Ext.ComponentQuery.query('#vend_cust_rf')[0].remove(0);
                                                            Ext.ComponentQuery.query('#cf_code_rf')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_rf')[0].add({xtype:'xtAPPayUMPopup',  name:'inv_um', fieldLabel:'Kode UM', value: this.getValue()});
                                                            Ext.ComponentQuery.query('#vend_cust_rf')[0].add({xtype:'textfield',  name:'vend_id', fieldLabel:'Kode Creditor',readOnly: true,  itemId:'vend_cust_rf2'});
                                                            Ext.ComponentQuery.query('#cf_code_rf')[0].add({xtype:'xtCF_IPopup',  name:'cf_code', fieldLabel:'Kode CashFlow', value: this.getValue()});
                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "AR UM",
                                                    inputValue:'R',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#inv_code_rf')[0].remove(0);
                                                            Ext.ComponentQuery.query('#vend_cust_rf')[0].remove(0);
                                                            Ext.ComponentQuery.query('#cf_code_rf')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_rf')[0].add({xtype:'xtARPayUMPopup',  name:'inv_um', fieldLabel:'Kode UM', value: this.getValue()});
                                                            Ext.ComponentQuery.query('#vend_cust_rf')[0].add({xtype:'textfield',  name:'cust_id', fieldLabel:'Kode Customer',readOnly: true,  itemId:'vend_cust_rf2'});
                                                            Ext.ComponentQuery.query('#cf_code_rf')[0].add({xtype:'xtCF_OPopup',  name:'cf_code', fieldLabel:'Kode CashFlow', value: this.getValue()});
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            itemId:'inv_code_rf',
                                            width:300
                                        },
                                        {
                                            itemId:'vend_cust_rf',
                                            width:200
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            hideTrigger:true,
                                            fieldLabel : 'Saldo UM',
                                            name:'nominal_um',
                                            itemId:'nominal_um_rf',
                                            width:300,
                                            readOnly:true
                                        }
                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:450,
                                    layout:'anchor',
                                    items:[

                                        {
                                            xtype : 'xtBankPopup',
                                            fieldLabel : 'Kode Bank',
                                            name:'bank_code',
                                            width:200,
                                            allowBlank:false
                                        },
                                        {
                                            itemId:'cf_code_rf',
                                            width:300
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel : 'Nominal Refund',
                                            name:'nominal',
                                            width:300,
                                            enableKeyEvents: true,
                                            listeners: {
                                                'keyup':function(field, event){
                                                    var saldo = Ext.ComponentQuery.query('#nominal_um_rf')[0].getValue();
                                                    if(field.value > saldo) {
                                                        Ext.Msg.alert('Warning', '<span style="color: #ff2110"> Nominal Refun tidak boleh melebihi saldo UM</span>');
                                                        field.value=0;
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Keterangan',
                                            name:'Keterangan',
                                            width:385
                                        },
                                        {
                                            xtype : 'mitos.checkbox',
                                            fieldLabel : 'Posting',
                                            name:'status',
                                            width:150,
                                            handler: function(field, value) {
                                                if (value== true) {
                                                    Ext.ComponentQuery.query('#tgl_post_rf')[0].setDisabled(false);
                                                    Ext.ComponentQuery.query('#tgl_post_rf')[0].setValue(new Date());
                                                }else{
                                                    Ext.ComponentQuery.query('#tgl_post_rf')[0].setDisabled(true);
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
                                            itemId:'tgl_post_rf'
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
                {text: 'Kode UM',sortable: true,dataIndex: 'inv_type'},
                {text: 'Kode Bank',sortable: true,dataIndex: 'bank_code'},
                {text: 'Kode Cashflow',sortable: true,dataIndex: 'cf_code'},
                {width: 150,text: 'Nominal UM',sortable: true,dataIndex: 'nominal_um', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {width: 150,text: 'Nominal RF',sortable: true,dataIndex: 'nominal', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {flex:1,text: 'Keterangan',sortable: true,dataIndex: 'keterangan'},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'RefundModel',
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

        me.pageBody = [me.RefundGrid, me.JurnalGrid];
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
        Ext.ComponentQuery.query('#tgl_input_rf')[0].setValue(new Date());
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
        this.RefundModel.load();
        this.JurnalStore.load();
        callback(true);
    }
});
//ens LogPage class