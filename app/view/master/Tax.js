Ext.define('App.view.master.Tax', {
    extend: 'App.ux.RenderPanel',
    id: 'panelTax',
    pageTitle: 'Pajak',
    uses: ['App.ux.GridPanel'],
    initComponent : function()
    {
        var me = this;

        Ext.define('TaxModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'tax_code',type: 'string' },
                {name: 'description',type: 'string'},
                {name: 'type_tax',type: 'string'},
                {name: 'rate_ppn',type: 'string'},
                {name: 'coa_ppn',type: 'string'},
                {name: 'rate_pph',type: 'string'},
                {name: 'coa_pph',type: 'string'},
                {name: 'remaks',type: 'string'},
                {name: 'aktif', type: 'bool'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Tax.getTax,
                    create: Tax.addTax,
                    update: Tax.updateTax,
                    destroy: Tax.deleteTax
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            }

        });

        me.TaxStore = Ext.create('Ext.data.Store', {
            storeId : 'TaxStore1',
            model : 'TaxModel',
            remoteSort : false,
            pageSize : 10,
            autoLoad: false
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


        me.TaxGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('TaxStore1'),
            border:false,
            frame:false,
            viewConfig:{
                stripeRows:true
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
                                            fieldLabel:'Kode',
                                            name:'tax_code',
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Pajak',
                                            name:'description',
                                            width:385
                                        },
                                        {
                                            xtype: "radiogroup",
                                            fieldLabel: "Jenis ",
                                            width:250,
                                            defaults: {xtype: "radio",name: "type_tax"},
                                            items: [
                                                {
                                                    boxLabel: "P. Masukan",
                                                    inputValue: "M",
                                                    checked: true
                                                },
                                                {
                                                    boxLabel: "P. Keluaran",
                                                    inputValue: "K"
                                                }
                                            ]
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Keterangan',
                                            name:'remaks',
                                            width:385
                                        },{
                                            width: 150,
                                            xtype: 'mitos.checkbox',
                                            fieldLabel: 'Aktif',
                                            name: 'aktif'
                                        }

                                    ]
                                }, {
                                    xtype:'container',
                                    width:400,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype : 'numberfield',
                                            hideTrigger: true,
                                            fieldLabel : 'Rate PPN',
                                            name:'rate_ppn',
                                            allowBlank:true,
                                            width:200
                                        },
                                        {
                                            xtype : 'xtCoaPopup',
                                            fieldLabel : 'Akun PPN',
                                            name:'coa_ppn',
                                            width:200
                                        },
                                        {
                                            xtype : 'numberfield',
                                            hideTrigger: true,
                                            fieldLabel : 'Rate PPh',
                                            name:'rate_pph',
                                            allowBlank:true,
                                            width:200
                                        },
                                        {
                                            xtype : 'xtCoaPopup',
                                            fieldLabel : 'Akun PPh',
                                            name:'coa_pph',
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
                    dataIndex:'co_id',
                    hidden:true
                },
                {
                    header:'Kode',
                    dataIndex:'tax_code'
                },
                {
                    header:'Pajak',
                    dataIndex:'description',
                    flex:1
                },
                {
                    header:'Type',
                    dataIndex:'type_tax'
                },
                {
                    header : 'Keterangan',
                    dataIndex : 'remaks',
                    flex:1
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
                    action:'TaxModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'TaxModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });

        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.TaxGrid]
        });

        me.pageBody = [/*me.FormulirPanel*/me.TaxGrid];
        me.callParent(arguments);

    }, // end of initComponent

    onNewRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
//        plugin.cancelEdit();
        newModel = Ext.ModelManager.create({ co_id : globals.site }, model);
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
        this.TaxStore.load();
        callback(true);
    }
});
//ens LogPage class