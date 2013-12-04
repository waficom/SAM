Ext.define('App.view.transaksi.purchaseorder.PurchaseOrder', {
    extend:'App.ux.RenderPanel',
    id:'panelPO',
    pageTitle:'Purchase Order',
    pageLayout: 'border',
    initComponent : function()
    {
        var me = this;
        me.kode = null;
        Ext.define('PurchaseOrderModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'co_id', type : 'string'},
                { name : 'po_num', type : 'string'},
                { name : 'tgl',	type : 'date'},
                { name : 'tgl_jt',	type : 'date'},
                { name : 'vend_id', type : 'string'},
                { name : 'vend_nama', type : 'string'},
                { name : 'vend_inq_num', type : 'string'},
                { name : 'vend_do_num', type : 'string'},
                { name : 'inv_num', type : 'string'},
                { name : 'n_bruto', type : 'float'},
                { name : 'netto_total', type : 'float'},
                { name : 'keterangan', type : 'string'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'timeedit',type: 'date'},
                { name : 'pb_num', type : 'string'},
                { name : 'status', type : 'bool'},
                { name : 'tax_code', type : 'string'},
                { name : 'tax_nama', type : 'string'},
                { name : 'gudang_id', type : 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read : PurchaseOrder.getFilterPOData,
                    create: PurchaseOrder.addPO,
                    update: PurchaseOrder.updatePO,
                    destroy: PurchaseOrder.deletePO
                }
            }

        });
        Ext.define('PurchaseOrderDetailModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'co_id', type : 'string'},
                { name : 'po_num', type : 'string'},
                { name : 'bb_id', type : 'string'},
                { name : 'bb_nama', type : 'string'},
                { name : 'sat_id', type : 'string'},
                { name : 'satuan_nama', type : 'string'},
                { name : 'qty', type : 'float'},
                { name : 'hrg', type : 'float'},
                { name : 'n_brutto', type : 'float'},
                { name : 'disc_prs', type : 'float'},
                { name : 'n_disc', type : 'float'},
                { name : 'n_netto', type : 'float'},
                { name : 'qty_rcv', type : 'float'},
                { name : 'keterangan', type : 'string'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                { name : 'status', type : 'bool'},
                {name: 'timeedit',type: 'date'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read : PurchaseOrder.getPOItems,
                    create: PurchaseOrder.addPOItems,
                    update: PurchaseOrder.updatePOItems,
                    destroy: PurchaseOrder.deletePOItems
                }
            }

        });

        me.PurchaseOrderStore = Ext.create('Ext.data.Store', {
            storeId : 'POStore',
            model : 'PurchaseOrderModel',
            remoteSort : false
        });
        me.PODetailStore = Ext.create('Ext.data.Store', {
            storeId : 'PODetailStore',
            model : 'PurchaseOrderDetailModel',
            remoteSort : false
        });
        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit','tanggal','tgl_jt_kirim']
        }
        me.PurchaseOrderGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('POStore'),
            height: 330,
            margin: '0 0 3 0',
            region: 'north',
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'yellow-row':'');
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
                                            fieldLabel:'Kode PO',
                                            name:'po_num',
                                            valueText:'otomatis',
                                            readOnly: true,
                                            width:300
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tanggal Input',
                                            format : 'd-m-Y',
                                            itemId:'tgl_input_po',
                                            name:'tgl',
                                            allowBlank:false,
                                            width:200
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tanggal JT',
                                            format : 'd-m-Y',
                                            name:'tgl_jt',

                                            width:200
                                        },
                                        {
                                            xtype : 'xtVendorSuplierPopup',
                                            fieldLabel : 'Kode Supplier',
                                            name:'vend_id',
                                            width:200
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Supplier',
                                            name:'vend_nama',
                                            itemId:'vend_nama_po',
                                            readOnly:true,
                                            width:300
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Keterangan',
                                            name:'keterangan',
                                            width:385
                                        },
                                        {
                                            width: 150,
                                            xtype: 'mitos.checkbox',
                                            fieldLabel : 'Posting',
                                            name : 'status'
                                        }
                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:450,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Supplier DO',
                                            name:'vend_do_num',
                                            width:300
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Supplier INQ',
                                            name:'vend_inq_num',
                                            width:300
                                        },
                                        {
                                            xtype : 'xtTaxKPopup',
                                            fieldLabel : 'Kode Pajak',
                                            name:'tax_code',
                                            itemId:'pajak_po',
                                            readOnly:true,
                                            width:200
                                        },
                                        {
                                            xtype : 'xtPBPopup',
                                            fieldLabel : 'Kode Pengadaan',
                                            name:'pb_num',
                                            width:300
                                        },
                                        {
                                            xtype : 'xtGudangBMPopup',
                                            fieldLabel : 'Kode Gudang',
                                            name:'gudang_id',
                                            itemId:'gudang_po',
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
                {
                    header:'Company',
                    hidden:true,
                    dataIndex:'co_id'
                },
                {
                    header : 'Kode PO #',
                    dataIndex : 'po_num'
                },
                {
                    header : 'Tanggal',
                    dataIndex : 'tgl',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                },
                {
                    header : 'Supplier',
                    dataIndex : 'vend_nama',
                    flex:1
                },
                {
                    header : 'Pengadaan Barang',
                    dataIndex : 'pb_num',
                    width : 150
                },
                {
                    header : 'JT Kirim',
                    dataIndex : 'tgl_jt',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                },
                {
                    header : 'Total',
                    dataIndex : 'netto_total',
                    renderer: Ext.util.Format.numberRenderer('0,0'),
                    width : 100
                },
                {width: 100,text: 'status',sortable: true,dataIndex: 'status', hidden: true},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'PurchaseOrderModel',
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
        me.PODetailGrid = Ext.create('Ext.grid.Panel', {
            title:'Rincian Detail',
            store: Ext.data.StoreManager.lookup('PODetailStore'),
            region:'center',
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'yellow-row':'');
                }
            },
            features: [{
                ftype: 'summary'
            }],
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
                                            xtype : 'textfield',
                                            fieldLabel : 'Kode PO',
                                            name:'po_num',
                                            hidden:true,
                                            itemId:'kode_po',
                                            width:300
                                        },
                                        {
                                            xtype:'xtBahanBakuPopup',
                                            fieldLabel:'Kode BB',
                                            name:'bb_id',
                                            width:250
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            fieldLabel : 'Qty',
                                            hideTrigger: true,
                                            name:'qty',
                                            itemId:'qty_po',
                                            width:300
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel : 'Harga',
                                            name:'hrg',
                                            itemId:'hrg_po',
                                            width:300,
                                            enableKeyEvents: true,
                                            listeners: {
                                                'keyup':function(field, event){
                                                    var qty_po = Ext.ComponentQuery.query('#qty_po')[0].getValue();
                                                    Ext.ComponentQuery.query('#n_brutto_po')[0].setValue(qty_po * field.value );
                                                    Ext.ComponentQuery.query('#n_netto_po')[0].setValue(qty_po * field.value);
                                                }
                                            }
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Satuan',
                                            name:'sat_id',
                                            readOnly:true,
                                            itemId:'sat_id_po',
                                            width:300
                                        }
                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:450,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype : 'mitos.currency',
                                            fieldLabel : 'Jumlah',
                                            name:'n_brutto',
                                            itemId:'n_brutto_po',
                                            readOnly:true,
                                            width:300
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel : 'Total',
                                            hidden:true,
                                            name:'n_netto',
                                            itemId:'n_netto_po',
                                            readOnly: true,
                                            allowBlank: false,
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
                {
                    header:'Company',
                    hidden:true,
                    dataIndex:'co_id'
                },
                {
                    header : 'Kode BB',
                    dataIndex : 'bb_id'
                },
                {
                    header : 'Bahan Baku',
                    dataIndex : 'bb_nama',
                    flex:1
                },
                {
                    header : 'Qty',
                    dataIndex : 'qty',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')
                },
                {
                    header : 'Satuan',
                    dataIndex : 'sat_id'
                },
                {
                    header : 'Harga',
                    dataIndex : 'hrg',
                    renderer: Ext.util.Format.numberRenderer('0,000.00')
                },
                {
                    header : 'Total',
                    dataIndex : 'n_netto',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')
                },
                {
                    header : 'Keratangan',
                    dataIndex : 'keterangan',
                    flex:1
                },
                {
                    header:'Status',
                    hidden:true,
                    dataIndex:'status'
                }

            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'PurchaseOrderDetailModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'delete002',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });


        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.PurchaseOrderGrid]
        });

        me.pageBody = [ me.PurchaseOrderGrid, me.PODetailGrid];
        me.callParent(arguments);

    }, // end of initComponent

    onGridClick: function(grid, selected){
        var me = this;
        me.kode = selected.data.po_num;

        me.PODetailStore.load({params:{po_num: me.kode}});
        var  deletebtn = me.query('button[action="delete"]')[0],
            delete002btn = me.query('button[action="delete002"]')[0],
            tambahbtn =  me.query('button[action="PurchaseOrderDetailModel"]')[0];
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
    onNewRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
        newModel = Ext.ModelManager.create({
        }, model);
        store.insert(0, newModel);
        plugin.startEdit(0, 0);
        if( Ext.ComponentQuery.query('#tgl_input_po')[0]){
            Ext.ComponentQuery.query('#tgl_input_po')[0].setValue(new Date());
        }
        if( Ext.ComponentQuery.query('#pajak_po')[0]){
            Ext.ComponentQuery.query('#pajak_po')[0].setValue('NT02');
        }
        if(Ext.ComponentQuery.query('#kode_po')[0]){
            Ext.ComponentQuery.query('#kode_po')[0].setValue(me.kode);
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
        this.PurchaseOrderStore.load();
        this.PODetailStore.load();
        callback(true);
    }
});
//ens LogPage class