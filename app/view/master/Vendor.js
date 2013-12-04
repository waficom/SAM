Ext.define('App.view.master.Vendor', {
    extend: 'App.ux.RenderPanel',
    id: 'panelVendor',
    pageTitle: 'Creditor',
    uses: ['App.ux.GridPanel'],
    initComponent : function()
    {
        var me = this;

        Ext.define('VendorModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'vend_id',type: 'string' },
                {name: 'vend_nama',type: 'string'},
                {name: 'vend_type',type: 'string'},
                {name: 'vend_type_desc',type: 'string'},
                {name: 'contact',type: 'string'},
                {name: 'npwp',type: 'string'},
                {name: 'alamat',type: 'string'},
                {name: 'kota',type: 'string'},
                {name: 'telepon1',type: 'string'},
                {name: 'telepon2',type: 'string'},
                {name: 'fax', type: 'string'},
                {name: 'propinsi',type: 'string'},
                {name: 'kodepos', type: 'string'},
                {name: 'negara',type: 'string'},
                {name: 'keterangan', type: 'string'},
                {name: 'coa_ap',type: 'string'},
                {name: 'coa_advance',type: 'string'},
                {name: 'old_vend_id',type: 'string'},
                {name: 'aktif', type: 'bool'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Vendor.getvendor,
                    create: Vendor.addvendor,
                    update: Vendor.updatevendor,
                    destroy: Vendor.deletevendor
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            }

        });

        me.VendorStore = Ext.create('Ext.data.Store', {
            storeId : 'VendorStore1',
            model : 'VendorModel',
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


        me.VendorGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('VendorStore1'),
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
                                            name:'vend_id',
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Vendor',
                                            name:'vend_nama',
                                            width:385
                                        },
                                        {
                                            xtype: "radiogroup",
                                            fieldLabel: "Jenis ",
                                            width:200,
                                            defaults: {xtype: "radio",name: "vend_type"},
                                            items: [
                                                {
                                                    boxLabel: "Suplier",
                                                    inputValue: "S",
                                                    checked: true
                                                },
                                                {
                                                    boxLabel: "Transporter",
                                                    inputValue: "T"
                                                }
                                            ]
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Contact',
                                            name:'contact',
                                            width:200
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'NPWP',
                                            name:'npwp',
                                            width:385
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'alamat',
                                            name:'alamat',
                                            width:385
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Kota',
                                            name:'kota',
                                            width:200
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Propinsi',
                                            name:'propinsi',
                                            width:200
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
                                            xtype:'numberfield',
                                            hideTrigger:true,
                                            fieldLabel:'Telpon 1',
                                            name:'telepon1',
                                            width:250
                                        },
                                        {
                                            xtype : 'numberfield',
                                            hideTrigger:true,
                                            fieldLabel : 'Telpon 2',
                                            name:'telepon2',
                                            width:250
                                        },
                                        {
                                            xtype : 'numberfield',
                                            hideTrigger:true,
                                            fieldLabel : 'Fax',
                                            name:'fax',
                                            width:250
                                        },
                                        {
                                            xtype : 'numberfield',
                                            hideTrigger:true,
                                            fieldLabel : 'Kode Pos',
                                            name:'kodepos',
                                            width:200
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Negara',
                                            name:'negara',
                                            width:300
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Keterangan',
                                            name:'keterangan',
                                            width:350
                                        },
                                        {
                                            xtype : 'xtCoaPopup',
                                            fieldLabel : 'Akun Hutang',
                                            name:'coa_ap',
                                            width:200
                                        },
                                        {
                                            xtype : 'xtCoaPopup',
                                            fieldLabel : 'Akun UM',
                                            name:'coa_advance',
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
                    dataIndex:'vend_id'
                },
                {
                    header:'Customer',
                    dataIndex:'vend_nama',
                    flex:1
                },
                {
                    header:'Type',
                    dataIndex:'vend_type_desc'
                },
                {
                    header : 'Keterangan',
                    dataIndex : 'keterangan',
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
                    action:'VendorModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'VendorModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });

        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.VendorGrid]
        });

        me.pageBody = [/*me.FormulirPanel*/me.VendorGrid];
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
        this.VendorStore.load();
        callback(true);
    }
});
//ens LogPage class