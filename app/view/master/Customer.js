Ext.define('App.view.master.Customer', {
    extend:'App.ux.RenderPanel',
    id:'panelCustomer',
    pageTitle:'Customer',

    initComponent : function()
    {
        var me = this;
        me.cust_id=null;

        Ext.define('CustomerModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'co_id', type : 'string'},
                { name : 'cust_id', type : 'string'},
                { name : 'cust_nama', type : 'string'},
                { name : 'contact', type : 'string'},
                { name : 'npwp', type : 'string'},
                { name : 'alamat', type : 'string'},
                { name : 'kota', type : 'string'},
                { name : 'telepon1', type : 'string'},
                { name : 'telepon2', type : 'string'},
                { name : 'fax', type : 'string'},
                { name : 'kodepos', type : 'string'},
                { name : 'propinsi', type : 'string'},
                { name : 'negara', type : 'string'},
                { name : 'keterangan', type : 'string'},
                { name : 'credit_limit', type : 'float'},
                { name : 'coa_ar', type : 'string'},
                { name : 'coa_arp', type : 'string'},
                { name : 'coa_ar_disc', type : 'string'},
                { name : 'coa_ar_return', type : 'string'},
                { name : 'coa_ar_distribusi', type : 'string'},
                { name : 'coa_ar_um', type : 'string'},
                { name : 'coa_ar_pot', type : 'string'},
                { name : 'coa_lpi', type : 'string'},
                { name : 'coa_plpi', type : 'string'},
                { name : 'aktif', type : 'bool'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Customer.getcustomer,
                    create: Customer.addcustomer,
                    update: Customer.updatecustomer,
                    destroy: Customer.deletecustomer
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            }

        });
        Ext.define('CustLocModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'co_id', type : 'string'},
                { name : 'cust_id', type : 'string'},
                { name : 'custloc_id', type : 'string'},
                { name : 'custloc_nama', type : 'string'},
                { name : 'contact', type : 'string'},
                { name : 'alamat', type : 'string'},
                { name : 'kota', type : 'string'},
                { name : 'telepon1', type : 'string'},
                { name : 'fax', type : 'string'},
                { name : 'kodepos', type : 'string'},
                { name : 'propinsi', type : 'string'},
                { name : 'keterangan', type : 'string'},
                { name : 'aktif', type : 'bool'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Customer.getCustLoc,
                    create: Customer.addCustLoc,
                    update: Customer.updateCustLoc,
                    destroy: Customer.deleteCustLoc
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            }

        });

        me.CustomerStore = Ext.create('Ext.data.Store', {
            storeId : 'CustomerStore1',
            model : 'CustomerModel',
            remoteSort : false,
            pageSize : 10,
            autoLoad: false
        });
        me.CustLocStore = Ext.create('Ext.data.Store', {
            storeId : 'CustLocStore1',
            model : 'CustLocModel',
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


        me.CustomerGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('CustomerStore1'),
            title:'Customer',
            border:false,
            frame:false,
            viewConfig:{
                stripeRows:true
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
                                            fieldLabel:'Kode',
                                            name:'cust_id',
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Customer',
                                            name:'cust_nama',
                                            width:385
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
                                    width:300,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'numberfield',
                                            fieldLabel:'Telpon 1',
                                            name:'telepon1',
                                            width:200
                                        },
                                        {
                                            xtype : 'numberfield',
                                            fieldLabel : 'Telpon 2',
                                            name:'telepon2',
                                            width:200
                                        },
                                        {
                                            xtype : 'numberfield',
                                            fieldLabel : 'Fax',
                                            name:'fax',
                                            width:200
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Kode Pos',
                                            name:'kodepos',
                                            width:200
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Negara',
                                            name:'negara',
                                            width:200
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Limit',
                                            name:'credit_limit',
                                            width:200
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Keterangan',
                                            name:'keterangan',
                                            width:250
                                        }

                                    ]
                                },{
                                    xtype:'container',
                                    width:300,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype : 'xtCoaPopup',
                                            fieldLabel : 'Akun Pend',
                                            name:'coa_ar',
                                            width:200
                                        },
                                        {
                                            xtype : 'xtCoaPopup',
                                            fieldLabel : 'Akun Diskon',
                                            name:'coa_ar_disc',
                                            width:200
                                        },
                                        {
                                            xtype : 'xtCoaPopup',
                                            fieldLabel : 'Akun Distribusi',
                                            name:'coa_ar_distribusi',
                                            width:200
                                        },
                                        {
                                            xtype : 'xtCoaPopup',
                                            fieldLabel : 'Akun Piutang',
                                            name:'coa_arp',
                                            width:200
                                        },
                                        {
                                            xtype : 'xtCoaPopup',
                                            fieldLabel : 'Akun Retur Penj',
                                            name:'coa_ar_return',
                                            width:200
                                        },
                                        {
                                            xtype : 'xtCoaPopup',
                                            fieldLabel : 'Akun UM',
                                            name:'coa_ar_um',
                                            width:200
                                        },
                                        {
                                            xtype : 'xtCoaPopup',
                                            fieldLabel : 'Akun Pot',
                                            name:'coa_ar_pot',
                                            width:200
                                        },
                                        {
                                            xtype : 'xtCoaPopup',
                                            fieldLabel : 'Akun Denda',
                                            name:'coa_lpi',
                                            width:200
                                        },
                                        {
                                            xtype : 'xtCoaPopup',
                                            fieldLabel : 'Akun Pend. Denda',
                                            name:'coa_plpi',
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
                    dataIndex:'cust_id'
                },
                {
                    header:'Customer',
                    dataIndex:'cust_nama',
                    flex:1
                },
                {
                    header:'Alamat',
                    dataIndex:'alamat'
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
                    action:'CustomerModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'CustomerModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });
        me.CustLocGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('CustLocStore1'),
            title:'Rincian Lokasi',
            border:false,
            frame:false,
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
                                    flex:1,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode Cust',
                                            name:'cust_id',
                                            itemId:'cust_id_m',
                                            hidden: true,
                                            width:250
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode',
                                            name:'custloc_id',
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Sub Customer',
                                            name:'custloc_nama',
                                            width:385
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Contact',
                                            name:'contact',
                                            width:385
                                        },
                                        {
                                                xtype:'numberfield',
                                                hideTrigger:true,
                                                fieldLabel:'Telpon 1',
                                                name:'telepon1',
                                                width:250
                                        },
                                        {
                                            xtype : 'numberfield',
                                            hideTrigger: true,
                                            fieldLabel : 'Fax',
                                            name:'fax',
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'alamat',
                                            name:'alamat',
                                            width:385
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Kode Pos',
                                            name:'kodepos',
                                            width:200
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Kota',
                                            name:'kota',
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Propinsi',
                                            name:'propinsi',
                                            width:250
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
                    header:'Company',
                    dataIndex:'co_id',
                    hidden:true
                },
                {
                    header:'Kode',
                    dataIndex:'custloc_id'
                },
                {
                    header:'Customer',
                    dataIndex:'custloc_nama',
                    flex:1
                },
                {
                    header:'Alamat',
                    dataIndex:'alamat'
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
                    action:'CustLocModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'CustLocModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });

        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.CustomerGrid, me.CustLocGrid]
        });

        me.pageBody = [me.FormulirPanel];
        me.callParent(arguments);

    }, // end of initComponent
    onGridClick:function(grid,selected){
        var me = this;
        me.cust_id = selected.data.cust_id;
        me.CustLocStore.load({params:{cust_id:me.cust_id}});
    },
    onNewRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
//        plugin.cancelEdit();
        newModel = Ext.ModelManager.create({ co_id : globals.site }, model);
        store.insert(0, newModel);
        plugin.startEdit(0, 0);
        if(Ext.ComponentQuery.query('#cust_id_m')[0]){
            Ext.ComponentQuery.query('#cust_id_m')[0].setValue(me.cust_id);
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
        this.CustomerStore.load();
        this.CustLocStore.load();
        callback(true);
    }
});
//ens LogPage class