Ext.define('App.view.transaksi.AP-Invoice.AP_Payment_Alocation', {
    extend: 'App.ux.RenderPanel',
    id: 'panelAP_Payment_Alocation',
    pageTitle: 'AP Alokasi',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent : function()
    {
        var me = this;
        me.dok_no=null;

        Ext.define('AP_AlokasiModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'ap_inv_payment',type: 'string'},
                {name: 'inv_date',type: 'date'},
                {name: 'inv_code',type: 'string'},
                {name: 'giro_num',type: 'string'},
                {name: 'inv_um',type: 'string'},
                {name: 'vend_id',type: 'string'},
                {name: 'vend_nama',type: 'string'},
                {name: 'nilaidasar',type: 'float'},
                {name: 'keterangan',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'status',type: 'string'},
                {name: 'inv_type',type: 'string'},
                {name: 'hutangsuplier',type: 'string'},
                {name: 'uangmuka',type: 'string'},
                {name: 'inv_date_um',type: 'date'},
                {name: 'ap_inv_date',type: 'date'},
                {name: 'posted_date',type: 'date'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: AP_Invoice.getAP_Payment_Alocation,
                    create: AP_Invoice.addAP_Inv_Payment,
                    update: AP_Invoice.updateAP_Inv_Payment,
                    destroy : AP_Invoice.deleteAP_Inv_Payment
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

        me.AP_AlokasiStore = Ext.create('Ext.data.Store', {
            storeId : 'AP_AlokasiStore',
            model : 'AP_AlokasiModel',
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
            disableIndexes:['timeedit']
        }
        me.AP_AlokasiGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('AP_AlokasiStore'),
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
                                            name:'ap_inv_payment',
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
                                            itemId:'tgl_input_al',
                                            width:200
                                        },
                                        {
                                            xtype: "radiogroup",
                                            fieldLabel: "Type ",
                                            defaults: {xtype: "radio", name:'inv_type'
                                            },
                                            hidden: true,
                                            items: [
                                                {
                                                    boxLabel: "Alocation",
                                                    checked: true,
                                                    inputValue:'A',
                                                    hidden: true

                                                }
                                            ]
                                        },
                                        {
                                            xtype:'xtAPPopup',
                                            fieldLabel:'Kode Invoice',
                                            name:'inv_code',
                                            allowBlank: false,
                                            width:300
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode Creditor',
                                            name:'vend_id',
                                            readOnly:true,
                                            itemId:'vend_id_al',
                                            width:200
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            itemId:'hutang_al',
                                            fieldLabel:'Hutang',
                                            name:'hutangsuplier',
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
                                            xtype:'xtAPPayUMPopup',
                                            fieldLabel:'Kode UM',
                                            name:'inv_um',
                                            allowBlank: false,
                                            width:300
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            itemId:'um_al',
                                            fieldLabel:'Uang Muka',
                                            name:'uangmuka',
                                            readOnly:true,
                                            width:250
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            hideTrigger:true,
                                            fieldLabel : 'Nominal Alokasi',
                                            name:'nilaidasar',
                                            width:250
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
                                                    Ext.ComponentQuery.query('#posting_al')[0].setDisabled(false);
                                                    Ext.ComponentQuery.query('#posting_al')[0].setValue(new Date());
                                                }else{
                                                    Ext.ComponentQuery.query('#posting_al')[0].setDisabled(true);
                                                }

                                            }
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tgl Posting',
                                            format : 'd-m-Y',
                                            allowBlank: false,
                                            maxValue : new Date(),
                                            name:'posted_date',
                                            itemId:'posting_al',
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
                {header: 'Kode Dokumen',sortable: false, dataIndex: 'ap_inv_payment'},
                {header: 'Tanggal', width : 80, sortable: true, dataIndex: 'inv_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {header: 'Kode Creditor',sortable: false, dataIndex: 'vend_id'},
                {header: 'Creditor', flex:1, sortable: false,dataIndex: 'vend_nama'},
                {header: 'Nominal',  sortable: false,dataIndex: 'nilaidasar',renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header: 'status',width:70, sortable: true, dataIndex: 'status',hidden:true},
                {header: 'Keterangan', flex:1, sortable: false,dataIndex: 'keterangan'},
                {header: 'LastUpdate', dataIndex: 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'AP_AlokasiModel',
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
            store:  me.JurnalStore,
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

        me.pageBody = [ me.AP_AlokasiGrid,me.JurnalGrid];
        me.callParent(arguments);

    }, // end of initComponent
    onGridClick: function(grid, selected){
        var me = this;
        me.dok_no = selected.data.ap_inv_payment;
        me.JurnalStore.load({params:{inv_code: me.dok_no}});
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

        Ext.ComponentQuery.query('#tgl_input_al')[0].setValue(new Date());
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
        this.AP_AlokasiStore.load();
        this.JurnalStore.load();
        callback(true);
    }
});
//ens LogPage class