Ext.define('App.view.master.Spesifikasi', {
    extend:'App.ux.RenderPanel',
    id:'panelSpesifikasi',
    pageTitle:'Spesifikasi',

    initComponent : function()
    {
        var me = this;

        Ext.define('SpesifikasiModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'co_id', type : 'string'},
                { name : 'spesifikasi_id', type : 'string'},
                { name : 'spesifikasi_nama', type : 'string'},
                { name : 'keterangan', type : 'string'},
                { name : 'n', type : 'float'},
                { name : 'p2o5', type : 'float'},
                { name : 'k2o', type : 'float'},
                { name : 'cao', type : 'float'},
                { name : 'mgo', type : 'float'},
                { name : 'so4', type : 'float'},
                { name : 'b', type : 'float'},
                { name : 'cu', type : 'float'},
                { name : 'zn', type : 'float'},
                { name : 'ah', type : 'float'},
                { name : 'af', type : 'float'},
                { name : 'te', type : 'float'},
                { name : 'aktif', type : 'bool'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Spesifikasi.getspesifikasi,
                    create: Spesifikasi.addspesifikasi,
                    update: Spesifikasi.updatespesifikasi,
                    destroy: Spesifikasi.deletespesifikasi
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            }

        });

        me.SpesifikasiStore = Ext.create('Ext.data.Store', {
            storeId : 'SpesifikasiStore1',
            model : 'SpesifikasiModel',
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


        me.SpesifikasiGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('SpesifikasiStore1'),
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
                                            xtype:'textfield',
                                            fieldLabel:'Kode',
                                            name:'spesifikasi_id',
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Spesifikasi',
                                            name:'spesifikasi_nama',
                                            width:385
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
                                },{
                                    xtype:'container',
                                    width:300,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype : 'numberfield',
                                            fieldLabel : 'N',
                                            name:'n',
                                            width:150
                                        },
                                        {
                                            xtype : 'numberfield',
                                            fieldLabel : 'P2O5',
                                            name:'p2o5',
                                            width:150
                                        },
                                        {
                                            xtype : 'numberfield',
                                            fieldLabel : 'K2O',
                                            name:'k2o',
                                            width:150
                                        },
                                        {
                                            xtype : 'numberfield',
                                            fieldLabel : 'CaO',
                                            name:'cao',
                                            width:150
                                        },
                                        {
                                            xtype : 'numberfield',
                                            fieldLabel : 'TE',
                                            name:'te',
                                            width:150
                                        }
                                    ]
                                },{
                                    xtype:'container',
                                    width:300,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype : 'numberfield',
                                            fieldLabel : 'MgO',
                                            name:'mgo',
                                            width:150
                                        },
                                        {
                                            xtype : 'numberfield',
                                            fieldLabel : 'SO4',
                                            name:'so4',
                                            width:150
                                        },
                                        {
                                            xtype : 'numberfield',
                                            fieldLabel : 'B',
                                            name:'b',
                                            width:150
                                        },
                                        {
                                            xtype : 'numberfield',
                                            fieldLabel : 'Cu',
                                            name:'cu',
                                            width:150
                                        },{
                                            xtype : 'numberfield',
                                            fieldLabel : 'Zn',
                                            name:'zn',
                                            width:150
                                        },
                                        {
                                            xtype : 'numberfield',
                                            fieldLabel : 'AH',
                                            name:'ah',
                                            width:150
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
                    dataIndex:'spesifikasi_id'
                },
                {
                    header:'Spesifikasi',
                    dataIndex:'spesifikasi_nama',
                    flex:1
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
                    action:'SpesifikasiModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'SpesifikasiModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });

        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.SpesifikasiGrid]
        });

        me.pageBody = [/*me.FormulirPanel*/me.SpesifikasiGrid];
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
        this.SpesifikasiStore.load();
        callback(true);
    }
});
//ens LogPage class