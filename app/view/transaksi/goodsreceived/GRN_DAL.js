Ext.define('App.view.transaksi.goodsreceived.GRN_DAL', {
    extend: 'App.ux.RenderPanel',
    id: 'panelGrn_Dal',
    pageTitle: 'Goods Received',
    pageLayout: 'anchor',
    uses: ['App.ux.GridPanel'],
    initComponent : function()
    {
        var me = this;
        me.kode = null;
        Ext.define('GrnDalModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'gr_num',type: 'string'},
                {name: 'tgl',type: 'date'},
                {name: 'gr_type',type: 'string'},
                {name: 'vend_id',type: 'string'},
                {name: 'vend_id_trans',type: 'string'},
                {name: 'keterangan',type: 'string'},
                {name: 'posted_date',type: 'date'},
                {name: 'status',type: 'string'},
                {name: 'rc_type',type: 'string'},
                {name: 'gudang_id',type: 'string'},
                {name: 'po_num',type: 'string'},
                {name: 'grn_return',type: 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: GrnDal.getGrnDal,
                    create: GrnDal.addGrnDal,
                    update: GrnDal.updateGrnDal,
                    destroy : GrnDal.deleteGrnDal
                }
            }

        });
        Ext.define('GrnDalDetailModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'gr_num',type: 'string'},
                {name: 'bb_id',type: 'string'},
                {name: 'bb_nama',type: 'string'},
                {name: 'sat_id',type: 'string'},
                {name: 'qty_brutto',type: 'float'},
                {name: 'qty_po',type: 'float'},
                {name: 'hrg_po',type: 'float'},
                {name: 'total_po',type: 'float'},
                {name: 'qty_netto',type: 'float'},
                {name: 'qty_pcs',type: 'float'},
                {name: 'qty_selisih',type: 'float'},
                {name: 'hpp',type: 'float'},
                {name: 'qty_selisih_prs',type: 'float'},
                {name: 'nominal_prs_selisih',type: 'float'},
                {name: 'status',type: 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: GrnDal.getGrnDalDetail,
                    create: GrnDal.addGrnDalDetail,
                    update: GrnDal.updateGrnDalDetail,
                    destroy : GrnDal.deleteGrnDalDetail
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
        me.GrnDalStore = Ext.create('Ext.data.Store', {
            storeId : 'GrnDalModel',
            model : 'GrnDalModel',
            remoteSort : false
        });
        me.GrnDalDetailStore = Ext.create('Ext.data.Store', {
            storeId : 'GrnDalDetailStore',
            model : 'GrnDalDetailModel',
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
        function authCk(val){
            if(val == '1'){
                return '<img src="resources/images/icons/yes.gif" />';
            }else if(val == '0'){
                return '<img src="resources/images/icons/no.gif" />';
            }
            return val;
        }
        me.GrnDalGrid = Ext.create('Ext.grid.Panel', {
            title:'GRN',
            store: Ext.data.StoreManager.lookup('GrnDalModel'),
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
                                            fieldLabel:'Kode Grn',
                                            name:'gr_num',
                                            readOnly: true,
                                            width:300
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tgl Input',
                                            format : 'd-m-Y',
                                            itemId:'tgl_input_grn',
                                            name:'tgl',
                                            allowBlank:false,
                                            width:200
                                        },
                                        {
                                            xtype: "radiogroup",
                                            fieldLabel: "Jenis ",
                                            width:300,
                                            defaults: {xtype: "radio", name:'gr_type'
                                            },
                                            items: [
                                                {
                                                    boxLabel: "Terima",
                                                    inputValue:'R',
                                                    checked: true,
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#grn_return_dal')[0].setDisabled(true);
                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "Retur",
                                                    inputValue:'B',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#grn_return_dal')[0].setDisabled(false);
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype : 'xtGRPopup',
                                            fieldLabel : 'Kode Retur',
                                            name:'grn_return',
                                            allowBlank:false,
                                            itemId:'grn_return_dal',
                                            width:300,
                                            disabled: true
                                        },
                                        {
                                            xtype : 'xtPOPopup',
                                            fieldLabel : 'Kode PO',
                                            name:'po_num',
                                            width:300,
                                            itemId:'po_grndal',
                                            allowBlank:false
                                        },
                                        {
                                            xtype : 'xtVendorSuplierPopup',
                                            fieldLabel : 'Kode Suplier',
                                            name:'vend_id',
                                            readOnly:true,
                                            itemId:'vend_id_grndal',
                                            width:250
                                        }
                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:450,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'xtVendorTransporterPopup',
                                            fieldLabel:'Kode Transporter',
                                            name:'vend_id_trans',
                                            allowBlank:false,
                                            width:250
                                        },
                                        {
                                            xtype: "radiogroup",
                                            fieldLabel: "Diterima di ",
                                            defaults: {xtype: "radio", name:'rc_type'
                                            },
                                            items: [
                                                {
                                                    boxLabel: "Gudang",
                                                    inputValue:'R',
                                                    checked: true,
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#keterangan_grndal')[0].setDisabled(true);
                                                            Ext.ComponentQuery.query('#gdg_id_grndal')[0].setDisabled(false);
                                                        }
                                                    }

                                                },
                                                {
                                                    boxLabel: "Non Gudang",
                                                    inputValue:'B',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#gdg_id_grndal')[0].setDisabled(true);
                                                            Ext.ComponentQuery.query('#keterangan_grndal')[0].setDisabled(false);
                                                        }
                                                    }

                                                }
                                            ]
                                        },
                                        {
                                            xtype : 'xtGudangBMPopup',
                                            fieldLabel : 'Kode Gudang',
                                            name:'gudang_id',
                                            width:200,
                                            itemId:'gdg_id_grndal'
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Keterangan',
                                            name:'keterangan',
                                            width:385,
                                            itemId:'keterangan_grndal'
                                        },
                                        {
                                            xtype : 'mitos.checkbox',
                                            fieldLabel : 'Posting',
                                            name:'status',
                                            width:150,
                                            handler: function(field, value) {
                                                if (value== true) {
                                                    Ext.ComponentQuery.query('#tgl_post_grndal')[0].setDisabled(false);
                                                    Ext.ComponentQuery.query('#tgl_post_grndal')[0].setValue(new Date());
                                                }else{
                                                    Ext.ComponentQuery.query('#tgl_post_grndal')[0].setDisabled(true);
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
                                            itemId:'tgl_post_grndal',
                                            disabled:true
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
                {header: 'Kode Grn',sortable: true,dataIndex: 'gr_num'},
                {width: 80,text: 'Tgl Input',sortable: true,dataIndex: 'tgl', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'Kode PO',sortable: true,dataIndex: 'po_num'},
                {text: 'Kode Suplier',sortable: true,dataIndex: 'vend_id'},
                {text: 'Kode Transporter',sortable: true,dataIndex: 'vend_id_trans'},
                {text: 'Kode Gudang',sortable: true,dataIndex: 'gudang_id'},
                {text: 'Keterangan',sortable: true,dataIndex: 'keterangan', flex:1},
                {text: 'status',sortable: true,dataIndex: 'status',  renderer: authCk},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'GrnDalModel',
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
        me.GrnDalDetailGrid = Ext.create('Ext.grid.Panel', {
            title:'Rincian Detail',
            store: Ext.data.StoreManager.lookup('GrnDalDetailStore'),
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
                                    width:450,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode Grn',
                                            name:'gr_num',
                                            itemId:'gr_num_dal',
                                            hidden: true,
                                            width:300
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Kode BB',
                                            name:'bb_id',
                                            width:200,
                                            readOnly: true
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Bahan Baku',
                                            name:'bb_nama',
                                            width:300,
                                            readOnly: true
                                        },
                                        {
                                            xtype: 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel : 'Qty PO',
                                            name:'qty_po',
                                            width:250,
                                            readOnly: true,
                                            itemId:'qty_po_grndal'
                                        },
                                        {
                                            xtype: 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel : 'Hrg PO',
                                            name:'hrg_po',
                                            width:250,
                                            readOnly: true,
                                            itemId:'hrg_po_grndal'
                                        },
                                        {
                                            xtype: 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel : 'Jumlah PO',
                                            name:'total_po',
                                            width:250,
                                            readOnly: true,
                                            itemId:'total_po_grndal'
                                        }
                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:450,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype: 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel : 'Qty Diterima',
                                            name:'qty_netto',
                                            width:300,
                                            enableKeyEvents: true,
                                            listeners: {
                                                'keyup':function(field, event){
                                                    var qty_po = Ext.ComponentQuery.query('#qty_po_grndal')[0].getValue(),
                                                        total_po = Ext.ComponentQuery.query('#total_po_grndal')[0].getValue();
                                                    Ext.ComponentQuery.query('#qty_selisih_grndal')[0].setValue(qty_po - field.value );
                                                    Ext.ComponentQuery.query('#qty_prs_grndal')[0].setValue(((qty_po - field.value) * 100) / qty_po );
                                                    Ext.ComponentQuery.query('#hrg_prs_grndal')[0].setValue(((((qty_po - field.value) * 100) / qty_po) * total_po) / 100);
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel : 'Qty Pcs',
                                            name:'qty_pcs',
                                            width:300
                                        },
                                        {
                                            xtype: 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel : 'Qty Selisih',
                                            name:'qty_selisih',
                                            itemId:'qty_selisih_grndal',
                                            width:300
                                        },
                                        {
                                            xtype: 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel : 'Selisih %',
                                            name:'qty_selisih_prs',
                                            width:300,
                                            readOnly: true,
                                            itemId:'qty_prs_grndal'
                                        },
                                        {
                                            xtype: 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel : 'Total Selisih',
                                            name:'nominal_prs_selisih',
                                            width:300,
                                            readOnly: true,
                                            itemId:'hrg_prs_grndal'
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
                {header: 'Kode BB',sortable: true,dataIndex: 'bb_id'},
                {header: 'Bahan Baku',sortable: true,dataIndex: 'bb_nama', flex:1},
                {header: 'Qty PO',sortable: true,dataIndex: 'qty_po', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header: 'Qty Diterima',sortable: true,dataIndex: 'qty_netto', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header: 'Qty Selisih',sortable: true,dataIndex: 'qty_selisih', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header: 'Qty PCS/SAK',sortable: true,dataIndex: 'qty_pcs', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar:[
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
            items:[ me.GrnDalGrid, me.GrnDalDetailGrid ]
        });
        me.pageBody = [me.FormulirPanel, me.JurnalGrid];
        me.callParent(arguments);

    }, // end of initComponent

    onGridClick: function(grid, selected){
        var me = this;
        me.kode = selected.data.gr_num;
        me.GrnDalDetailStore.load({params:{gr_num: me.kode}});
        me.JurnalStore.load({params:{inv_code: me.kode}});
        var  deletebtn = me.query('button[action="delete"]')[0]
        if(selected.data.status==1 || selected.data.status==2){
            deletebtn.setDisabled(true);
        }else{
            deletebtn.setDisabled(false);
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
        if( Ext.ComponentQuery.query('#tgl_input_grn')[0]){
            Ext.ComponentQuery.query('#tgl_input_grn')[0].setValue(new Date());
        }
        if(Ext.ComponentQuery.query('#gr_num_dal')[0]){
            Ext.ComponentQuery.query('#gr_num_dal')[0].setValue(me.kode);
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
        this.GrnDalStore.load();
        this.GrnDalDetailStore.load();
        this.JurnalStore.load({params:{inv_code: this.kode}});
        callback(true);
    }
});
//ens LogPage class