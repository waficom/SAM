Ext.define('App.view.master.Companies', {
    extend:'App.ux.RenderPanel',
    id:'panelCompany',
    pageTitle:'Perusahaan',

    initComponent : function()
    {
        var me = this;

        Ext.define('CompanyModel', {
            extend : 'Ext.data.Model',
            fields : [
                {
                    name: 'co_id',
                    type: 'string'
                },
                {
                    name: 'old_co_id',
                    type: 'string'
                },
                {
                    name: 'co_nama',
                    type: 'string'
                },
                {
                    name: 'npwp',
                    type: 'string'
                },
                {
                    name: 'alamat',
                    type: 'string'
                },
                {
                    name: 'kota',
                    type: 'string'
                },
                {
                    name: 'telepon1',
                    type: 'string'
                },
                {
                    name: 'telepon2',
                    type: 'string'
                },
                {
                    name: 'fax',
                    type: 'string'
                },
                {
                    name: 'propinsi',
                    type: 'string'
                },
                {
                    name: 'kodepos',
                    type: 'string'
                },
                {
                    name: 'negara',
                    type: 'string'
                },
                {
                    name: 'keterangan',
                    type: 'string'
                },
                {
                    name: 'aes',
                    type: 'string'
                },
                {
                    name: 'kategori_bdp',
                    type: 'string'
                },
                { name : 'aktif', type : 'bool'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Companies.getCompanies,
                    create: Companies.addCompany,
                    update: Companies.updateCompany,
                    destroy: Companies.deleteCompany
                }
            }

        });

        me.CompanyStore = Ext.create('Ext.data.Store', {
            storeId : 'CompanyStore',
            model : 'CompanyModel',
            remoteSort : false
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


        me.CompanyGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('CompanyStore'),
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
                                    width:450,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'mitos.UpperCaseTextField',
                                            fieldLabel:'Kode Perusahaan',
                                            name:'co_id',
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Nama Perusahaan',
                                            name:'co_nama',
                                            width:385
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Alamat',
                                            name: 'alamat',
                                            width:385
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Kota',
                                            name: 'kota',
                                            width:385
                                        },
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel : 'Tlp. 1',
                                            name: 'telepon1',
                                            width:385
                                        },
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel : 'Tlp. 2',
                                            name: 'telepon2',
                                            width:385
                                        },
                                        {
                                            width: 150,
                                            xtype: 'mitos.checkbox',
                                            fieldLabel: 'Aktif',
                                            name: 'aktif'
                                        }
                                    ]
                                },  {
                                    xtype:'container',
                                    width:450,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype: 'numberfield',
                                            fieldLabel : 'Fax',
                                            name: 'fax',
                                            width:250
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel : 'Propinsi',
                                            name: 'propinsi',
                                            width:385
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel : 'Kode Pos',
                                            name: 'kodepos',
                                            width:385
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel : 'Negara',
                                            name: 'negara',
                                            width:385
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel : 'AES',
                                            name: 'aes',
                                            width:385
                                        },
                                        {
                                            width:385,
                                            xtype: "radiogroup",
                                            fieldLabel: "Barang Dalam Proses ",
                                            defaults: {xtype: "radio", name:'kategori_bdp'
                                            },
                                            items: [
                                                {
                                                    boxLabel: "Yes",
                                                    checked: true,
                                                    inputValue:'Y'
                                                },
                                                {
                                                    boxLabel: "No",
                                                    inputValue:'N'

                                                }
                                            ]
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
                    header:'Kode Perusahaan',
                    dataIndex:'co_id'
                },
                {
                    header:'Perusahaan',
                    dataIndex:'co_nama',
                    flex:1
                },
                {
                    text: 'Alamat',
                    width: 200,
                    sortable: true,
                    dataIndex: 'alamat'
                },
                {
                    text: 'Kota',
                    width: 100,
                    sortable: true,
                    dataIndex: 'kota'
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
                    action:'CompanyModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'CompanyModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });

        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.CompanyGrid]
        });

        me.pageBody = [/*me.FormulirPanel*/ me.CompanyGrid];
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
        this.CompanyStore.load();
        callback(true);
    }
});
//ens LogPage class