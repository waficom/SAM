Ext.define('App.view.transaksi.Stock.StockOpname', {
    extend:'App.ux.RenderPanel',
    id:'panelStockOpname',
    pageTitle:'Stock OpName',
    pageLayout: 'anchor',
    initComponent : function()
    {
        var me = this;
        me.dok_no=null;

        Ext.define('StockOpnameModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'co_id', type : 'string'},
                { name : 'bb_id', type : 'string'},
                { name : 'sat_id',type : 'string'},
                { name : 'gudang_id',type : 'string'},
                { name : 'periode',type : 'string'},
                { name : 'qty_akhir',type : 'string'},
                { name : 'harga_akhir',type : 'float'},
                { name : 'total_akhir', type : 'float'},
                { name : 'qty_opname', type : 'string'},
                { name : 'harga_opname', type : 'float'},
                { name : 'total_opname', type : 'float'},
                { name : 'qty_selisih', type : 'string'},
                { name : 'harga_selisih', type : 'float'},
                { name : 'total_selisih', type : 'float'},
                { name : 'userinput', type : 'string'},
                { name : 'useredit', type : 'string'},
                { name : 'timeinput', type : 'date'},
                { name : 'timeedit', type : 'date'},
                { name : 'bb_nama', type : 'string'},
                { name : 'status', type : 'bool'},
                { name : 'posted_date', type : 'date'},
                { name : 'keterangan', type : 'string'},
                { name : 'dok_no', type : 'string'}
               
            ],
            proxy:{
                type:'direct',
                api:{
                    read : StockOpname.getStockOpname,
                    create: StockOpname.addStockOpname,
                    update: StockOpname.updateStockOpname,
                    destroy: StockOpname.deleteStockOpname
                }
            }

        });
        Ext.define('BarangJadiModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'co_id', type : 'string'},
                { name : 'prod_id', type : 'string'},
                { name : 'sat_id',type : 'string'},
                { name : 'gudang_id',type : 'string'},
                { name : 'periode',type : 'string'},
                { name : 'qty_akhir',type : 'string'},
                { name : 'harga_akhir',type : 'float'},
                { name : 'total_akhir', type : 'float'},
                { name : 'qty_opname', type : 'string'},
                { name : 'harga_opname', type : 'float'},
                { name : 'total_opname', type : 'float'},
                { name : 'qty_selisih', type : 'string'},
                { name : 'harga_selisih', type : 'float'},
                { name : 'total_selisih', type : 'float'},
                { name : 'userinput', type : 'string'},
                { name : 'useredit', type : 'string'},
                { name : 'timeinput', type : 'date'},
                { name : 'timeedit', type : 'date'},
                { name : 'prod_nama', type : 'string'},
                { name : 'status', type : 'bool'},
                { name : 'posted_date', type : 'date'},
                { name : 'keterangan', type : 'string'},
                { name : 'dok_no', type : 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read : StockOpname.getStockOpnameBJ,
                    create: StockOpname.addStockOpnameBJ,
                    update: StockOpname.updateStockOpnameBJ,
                    destroy: StockOpname.deleteStockOpnameBJ
                }
            }

        });
        Ext.define('JurnalModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'inv_date',type: 'date'},
                {name: 'inv_code',type: 'string'},
                {name: 'inv_code_link',type: 'string'},
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

        me.StockOpnameStore = Ext.create('Ext.data.Store', {
            storeId : 'SOStore',
            model : 'StockOpnameModel',
            remoteSort : false
        });
        me.StockOpnameBJStore = Ext.create('Ext.data.Store', {
            storeId : 'StockOpnameBJStore',
            model : 'BarangJadiModel',
            remoteSort : false
        });
        me.JurnalStore = Ext.create('Ext.data.Store', {
            storeId : 'JurnalStockOpnameStore',
            model : 'JurnalModel',
            remoteSort : false
        });
        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit']
        }
        me.StockOpnameGrid = Ext.create('Ext.grid.Panel', {
            title:'Bahan Baku',
            store: Ext.data.StoreManager.lookup('SOStore'),
            height: 400,
            region: 'north',
            features:[searching],
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1'? 'child-row' : record.get('status') == '2'? 'adult-row' : '';
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
                                    width:450,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype : 'numberfield',
                                            hideTrigger: true,
                                            fieldLabel : 'Periode',
                                            name:'periode',
                                            itemId:'periode_stock',
                                            width:200
                                        },
                                        {
                                            xtype : 'xtGudangBMPopup',
                                            fieldLabel : 'Kode Gudang',
                                            name:'gudang_id',
                                            itemId:'gudang_stock',
                                            width:200
                                        },
                                        {
                                            xtype:'xtStockOpnameBBPopup',
                                            fieldLabel:'Kode Bahan Baku',
                                            name:'bb_id',
                                            allowBlank:false,
                                            width:300
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Satuan',
                                            name:'sat_id',
                                            itemId:'sat_id_stock',
                                            readOnly:true,
                                            width:150
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            fieldLabel : 'Qty Stock',
                                            name:'qty_akhir',
                                            readOnly:true,
                                            itemId:'qty_akhir',
                                            width:200
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            fieldLabel : 'Harga Rata2 (Rp)',
                                            name:'harga_akhir',
                                            readOnly:true,
                                            itemId:'harga_akhir',
                                            xtAlign : 'right',
                                            width:300
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            fieldLabel : 'Total (Rp)',
                                            name:'total_akhir',
                                            readOnly:true,
                                            itemId:'total_akhir',
                                            width:300
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Keterangan',
                                            name:'keterangan',
                                            width:300
                                        }
                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:300,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype : 'mitos.currency',
                                            fieldLabel : 'Qty Opname',
                                            name:'qty_opname',
                                            itemId:'qty_opname',
                                            hideTrigger: true,
                                            xtAlign : 'right',
                                            width:200,
                                            listeners : {
                                                scope : me,
                                                specialkey : me.onEnter
                                            }
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            fieldLabel : 'Harga Rata2 (Rp)',
                                            name:'harga_opname',
                                            readOnly:true,
                                            xtAlign : 'right',
                                            itemId:'harga_opname',
                                            width:300
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            fieldLabel : 'Total (Rp)',
                                            name:'total_opname',
                                            readOnly:true,
                                            xtAlign : 'right',
                                            itemId:'total_opname',
                                            width:300
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            fieldLabel : 'Qty Selisih',
                                            name:'qty_selisih',
                                            readOnly:true,
                                            itemId:'qty_selisih',
                                            xtAlign : 'right',
                                            width:200
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            fieldLabel : 'Harga Rata2 (Rp)',
                                            name:'harga_selisih',
                                            readOnly:true,
                                            xtAlign : 'right',
                                            itemId:'harga_selisih',
                                            width:300
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            fieldLabel : 'Total (Rp)',
                                            name:'total_selisih',
                                            readOnly:true,
                                            xtAlign : 'right',
                                            itemId:'total_selisih',
                                            width:300
                                        },
                                        {
                                            width: 150,
                                            xtype: 'mitos.checkbox',
                                            fieldLabel: 'Posting',
                                            name: 'status',
                                            handler: function(field, value) {
                                                if (value == true) {
                                                    Ext.ComponentQuery.query('#posting_stock')[0].setDisabled(false);
                                                    Ext.ComponentQuery.query('#posting_stock')[0].setValue(new Date());
                                                }else{
                                                    Ext.ComponentQuery.query('#posting_stock')[0].setDisabled(true);
                                                }

                                            }
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tanggal',
                                            format : 'd-m-Y',
                                            value : new Date(),
                                            maxValue : new Date(),
                                            name:'posted_date',
                                            itemId:'posting_stock',
                                            disabled:true,
                                            width:250
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
                    header:'Kode Dok',
                    dataIndex:'dok_no'
                },
                {
                    header:'Kode',
                    dataIndex:'bb_id'
                },
                {
                    header : 'Bahan Baku',
                    dataIndex : 'bb_nama',
                    flex:1
                },
                {
                    header : 'Gudang',
                    dataIndex : 'gudang_id'
                },
                {
                    header : 'Periode',
                    dataIndex : 'periode'
                },
                {
                    header : 'Lastupdate',
                    dataIndex : 'timeedit',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                }

            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'StockOpnameModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'StockOpnameModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });
        me.StockOpnameBJGrid = Ext.create('Ext.grid.Panel', {
            title:'Barang Jadi',
            store: Ext.data.StoreManager.lookup('StockOpnameBJStore'),
            height: 400,
            margin: '0 0 3 0',
            region: 'north',
            features:[searching],
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1'? 'child-row' : record.get('status') == '2'? 'adult-row' : '';
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
                                    width:450,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype : 'numberfield',
                                            fieldLabel : 'Periode',
                                            name:'periode',
                                            itemId:'periode_stock_bj',
                                            width:200
                                        },
                                        {
                                            xtype : 'xtGudangBJPopup',
                                            fieldLabel : 'Kode Gudang',
                                            name:'gudang_id',
                                            itemId:'gudang_stock_bj',
                                            width:200
                                        },
                                        {
                                            xtype:'xtStockOpnameBJPopup',
                                            fieldLabel:'Kode Produk',
                                            name:'prod_id',
                                            allowBlank:false,
                                            width:300
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Satuan',
                                            name:'sat_id',
                                            itemId:'sat_id_stock_bj',
                                            readOnly:true,
                                            width:150
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            fieldLabel : 'Qty Stock',
                                            name:'qty_akhir',
                                            readOnly:true,
                                            itemId:'qty_akhir_bj',
                                            width:200
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            fieldLabel : 'Harga Rata2 (Rp)',
                                            name:'harga_akhir',
                                            readOnly:true,
                                            itemId:'harga_akhir_bj',
                                            xtAlign : 'right',
                                            width:300
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            fieldLabel : 'Total (Rp)',
                                            name:'total_akhir',
                                            readOnly:true,
                                            itemId:'total_akhir_bj',
                                            width:300
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Keterangan',
                                            name:'keterangan',
                                            width:300
                                        }
                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:300,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype : 'mitos.currency',
                                            fieldLabel : 'Qty Opname',
                                            name:'qty_opname',
                                            itemId:'qty_opname_bj',
                                            hideTrigger: true,
                                            xtAlign : 'right',
                                            width:200,
                                            listeners : {
                                                scope : me,
                                                specialkey : me.onEnter_Bj
                                            }
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            fieldLabel : 'Harga Rata2 (Rp)',
                                            name:'harga_opname',
                                            readOnly:true,
                                            xtAlign : 'right',
                                            itemId:'harga_opname_bj',
                                            width:300
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            fieldLabel : 'Total (Rp)',
                                            name:'total_opname',
                                            readOnly:true,
                                            xtAlign : 'right',
                                            itemId:'total_opname_bj',
                                            width:300
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            fieldLabel : 'Qty Selisih',
                                            name:'qty_selisih',
                                            readOnly:true,
                                            itemId:'qty_selisih_bj',
                                            xtAlign : 'right',
                                            width:200
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            fieldLabel : 'Harga Rata2 (Rp)',
                                            name:'harga_selisih',
                                            readOnly:true,
                                            xtAlign : 'right',
                                            itemId:'harga_selisih_bj',
                                            width:300
                                        },
                                        {
                                            xtype : 'mitos.currency',
                                            fieldLabel : 'Total (Rp)',
                                            name:'total_selisih',
                                            readOnly:true,
                                            xtAlign : 'right',
                                            itemId:'total_selisih_bj',
                                            width:300
                                        },
                                        {
                                            width: 150,
                                            xtype: 'mitos.checkbox',
                                            fieldLabel: 'Posting',
                                            name: 'status',
                                            handler: function(field, value) {
                                                if (value == true) {
                                                    Ext.ComponentQuery.query('#posting_stock_bj')[0].setDisabled(false);
                                                    Ext.ComponentQuery.query('#posting_stock_bj')[0].setValue(new Date());
                                                }else{
                                                    Ext.ComponentQuery.query('#posting_stock_bj')[0].setDisabled(true);
                                                }

                                            }
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tanggal',
                                            format : 'd-m-Y',
                                            value : new Date(),
                                            maxValue : new Date(),
                                            name:'posted_date',
                                            itemId:'posting_stock_bj',
                                            disabled:true,
                                            width:250
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
                    header:'Kode Dok',
                    dataIndex:'dok_no'
                },
                {
                    header:'Kode Produk',
                    dataIndex:'prod_id'
                },
                {
                    header : 'Produk',
                    dataIndex : 'prod_nama',
                    flex:1
                },
                {
                    header : 'Gudang',
                    dataIndex : 'gudang_id'
                },
                {
                    header : 'Periode',
                    dataIndex : 'periode'
                },
                {
                    header : 'Lastupdate',
                    dataIndex : 'timeedit',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                }

            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'BarangJadiModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'BarangJadiModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });
        me.JurnalGrid = Ext.create('Ext.grid.Panel', {
            title:'Jurnal',
            store: Ext.data.StoreManager.lookup('JurnalStockOpnameStore'),
            region: 'center',
            columns:[
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

            ]
        });


        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.StockOpnameGrid, me.StockOpnameBJGrid]
        });

        me.pageBody = [me.FormulirPanel,me.JurnalGrid];
        me.callParent(arguments);

    }, // end of initComponent
    onGridClick: function(grid, selected){
        /*if(selected.data.status == 1 || selected.data.status == 2){
            Ext.ComponentQuery.query('#update_plugin')[0].setDisabled(true);
            Ext.ComponentQuery.query('#delete_plugin')[0].setDisabled(true);
        }else{
            Ext.ComponentQuery.query('#update_plugin')[0].setDisabled(false);
            Ext.ComponentQuery.query('#delete_plugin')[0].setDisabled(false);
        }*/
        var me = this;
        me.dok_no = selected.data.dok_no;
        me.JurnalStore.load({params:{inv_code: me.dok_no}});

    },
    onEnter : function(field, e)
    {
       var qty_akhir = Ext.ComponentQuery.query('#qty_akhir')[0].getValue(),
           harga_akhir = Ext.ComponentQuery.query('#harga_akhir')[0].getValue(),
           total_akhir = Ext.ComponentQuery.query('#total_akhir')[0].getValue(),
           qty_opname = Ext.ComponentQuery.query('#qty_opname')[0].getValue();

           Ext.ComponentQuery.query('#harga_opname')[0].setValue(harga_akhir),
           Ext.ComponentQuery.query('#total_opname')[0].setValue(harga_akhir * qty_opname),
           Ext.ComponentQuery.query('#qty_selisih')[0].setValue(qty_akhir - qty_opname),
           Ext.ComponentQuery.query('#harga_selisih')[0].setValue(harga_akhir),
          Ext.ComponentQuery.query('#total_selisih')[0].setValue((qty_akhir - qty_opname)*harga_akhir);

    },
    onEnter_Bj : function(field, e)
    {
        var qty_akhir = Ext.ComponentQuery.query('#qty_akhir_bj')[0].getValue(),
            harga_akhir = Ext.ComponentQuery.query('#harga_akhir_bj')[0].getValue(),
            total_akhir = Ext.ComponentQuery.query('#total_akhir_bj')[0].getValue(),
            qty_opname = Ext.ComponentQuery.query('#qty_opname_bj')[0].getValue();

        Ext.ComponentQuery.query('#harga_opname_bj')[0].setValue(harga_akhir),
            Ext.ComponentQuery.query('#total_opname_bj')[0].setValue(harga_akhir * qty_opname),
            Ext.ComponentQuery.query('#qty_selisih_bj')[0].setValue(qty_akhir - qty_opname),
            Ext.ComponentQuery.query('#harga_selisih_bj')[0].setValue(harga_akhir),
            Ext.ComponentQuery.query('#total_selisih_bj')[0].setValue((qty_akhir - qty_opname)*harga_akhir);

    },
    onNewRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
        newModel = Ext.ModelManager.create({
        }, model);
        store.insert(0, newModel);
        plugin.startEdit(0, 0);
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
        this.StockOpnameStore.load();
        this.StockOpnameBJStore.load();
        this.JurnalStore.load();
        callback(true);
    }
});
//ens LogPage class