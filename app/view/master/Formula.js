Ext.define('App.view.master.Formula', {
    extend:'App.ux.RenderPanel',
    id:'panelFormula',
    pageTitle:'Formula',
    pageLayout: 'border',
    initComponent : function()
    {
        var me = this;
        me.formula_id = null;

        Ext.define('FormulaModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'formula_id',type: 'string'},
                {name: 'formula_nama',type: 'string'},
                {name: 'tanggal',type: 'date'},
                {name: 'cust_id',type: 'string'},
                {name: 'cust_nama',type: 'string'},
                {name: 'spesifikasi_id',type: 'string'},
                {name: 'spesifikasi_nama',type: 'string'},
                {name: 'keterangan',type: 'string'},
                {name: 'old_formula_id',type: 'string'},
                {name: 'aktif',type: 'bool'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Formula.getformula,
                    create: Formula.addformula,
                    update: Formula.updateformula,
                    destroy: Formula.deleteformula
                }
            }

        });

        Ext.define('Formula1Model', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'}
                ,{name: 'formula_id',type: 'string'}
                ,{name: 'sequence_no',type: 'string'}
                ,{name: 'bb_id',type: 'string'}
                ,{name: 'bb_nama',type: 'string'}
                ,{name: 'jumlah',type: 'float', convert: null}
                ,{name: 'satuan_id',type: 'string'}
                ,{name: 'satuan_nama',type: 'string'}
                ,{name: 'old_bb_id',type: 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Formula.getformula1,
                    create: Formula.addformula1,
                    update: Formula.updateformula1,
                    destroy: Formula.deleteformula1
                }
            }

        });
        function authCk(val){
            if(val == '1'){
                return '<img src="resources/images/icons/yes.gif" />';
            }else if(val == '0'){
                return '<img src="resources/images/icons/no.gif" />';
            }
            return val;
        }
        var searching = {
            ftype: 'searching',
            mode: 'local',
            width: 200
        };

        me.FormulaStore = Ext.create('Ext.data.Store', {
            storeId : 'Itemstore',
            model : 'FormulaModel'
        });
        me.Formula1Store = Ext.create('Ext.data.Store', {
            storeId : 'PriceListstore',
            model : 'Formula1Model'
        });
        me.FormulaGrid = Ext.create('Ext.grid.Panel', {
            title:'Fomula',
            store: Ext.data.StoreManager.lookup('Itemstore'),
            height: 330,
            region: 'north',
            viewConfig:{
                stripeRows:true
            },
            features:[searching],
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
                                            xtype:'textfield',
                                            fieldLabel:'Kode',
                                            name:'formula_id',
                                            width:300
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Formula',
                                            name:'formula_nama',
                                            width:385
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tanggal',
                                            format : 'd-m-Y',
                                            value : new Date(),
                                            maxValue:new Date(),
                                            name:'tanggal',
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
                                            xtype:'xtCustomerPopup',
                                            fieldLabel:'Customer',
                                            name:'cust_id',
                                            width:300
                                        },
                                        {
                                            xtype:'xtSpesifikasiPopup',
                                            fieldLabel:'Spesifikasi',
                                            name:'spesifikasi_id',
                                            width:300
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Keterangan',
                                            name:'keterangan',
                                            width:385
                                        },
                                        {
                                            width: 150,
                                            xtype: 'mitos.checkbox',
                                            fieldLabel: 'Aktif',
                                            name: 'aktif'
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
                    header:'Kode',
                    dataIndex:'formula_id'
                },
                {
                    header:'Formula',
                    flex:1,
                    dataIndex:'formula_nama'
                },
                {
                    header : 'Tanggal',
                    dataIndex : 'tanggal',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                },
                {
                    text: 'Aktif',
                    sortable: true,
                    dataIndex: 'aktif',
                    renderer: authCk
                }
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'FormulaModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'FormulaModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });
        me.Formula1Grid = Ext.create('Ext.grid.Panel', {
            title:'Rincian Bahan Baku',
            store: Ext.data.StoreManager.lookup('PriceListstore'),
            region: 'center',
            viewConfig:{
                stripeRows:true
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
                                            hidden : true,
                                            name:'formula_id',
                                            itemId:'formula_id'
                                        },
                                        {
                                            xtype:'xtBahanBakuPopup',
                                            fieldLabel:'Bahan Baku',
                                            name:'bb_id',
                                            width:385
                                        },{
                                            width : 250,
                                            xtype: 'numberfield',
                                            fieldLabel: 'Jumlah',
                                            name: 'jumlah'
                                        },
                                        {
                                            width : 250,
                                            xtype: 'xtSatuanPopup',
                                            fieldLabel: 'Satuan',
                                            name: 'satuan_id'
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
                    header:'No.Urut',
                    hidden:true,
                    dataIndex:'sequence_no'
                },
                {
                    header:'Kode Formula',
                    dataIndex:'formula_id',
                    hidden:true
                },
                {
                    header:'Bahan Baku',
                    dataIndex:'bb_nama',
                    flex:1
                },
                {
                    header:'Jumlah',
                    dataIndex:'jumlah'
                },
                {
                    header : 'Satuan',
                    dataIndex : 'satuan_id'
                }
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'Formula1Model',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'Formula1Model',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.FormulaGrid, me.Formula1Grid]
        });

        me.pageBody = [me.FormulaGrid, me.Formula1Grid];
        me.callParent(arguments);

    }, // end of initComponent
    onGridClick: function(grid, selected){
        var me = this;
        me.formula_id = selected.data.formula_id;
        me.Formula1Store.load({params:{formula_id: me.formula_id}});

    },
    onNewRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
//        plugin.cancelEdit();
        newModel = Ext.ModelManager.create({ co_id : globals.site }, model);
        store.insert(0, newModel);
        plugin.startEdit(0, 0);
        Ext.ComponentQuery.query('#formula_id')[0].setValue(me.formula_id);
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
        this.FormulaStore.load();
        this.Formula1Store.load();
        callback(true);
    }
});
//ens LogPage class