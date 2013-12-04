Ext.define('App.view.master.Satuan', {
    extend:'App.ux.RenderPanel',
    id:'panelSatuan',
    pageTitle:'Satuan',

    initComponent : function()
    {
        var me = this;

        Ext.define('SatuanModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'co_id', type : 'string'},
                { name : 'satuan_id', type : 'string'},
                { name : 'satuan_nama', type : 'string'},
                { name : 'keterangan', type : 'string'},
                { name : 'aktif', type : 'bool'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Satuan.getsatuan,
                    create: Satuan.addsatuan,
                    update: Satuan.updatesatuan,
                    destroy: Satuan.deletesatuan
                }
            }

        });

        me.SatuanStore = Ext.create('Ext.data.Store', {
            storeId : 'SatuanStore',
            model : 'SatuanModel',
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


        me.SatuanGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('SatuanStore'),
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
                                            name:'satuan_id',
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Satuan',
                                            name:'satuan_nama',
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
                                }
                            ]
                        }
                    ]
                })
            ],
            columns:[
                {
                    header:'Co ID',
                    dataIndex:'co_id',
                    hidden:true
                },
                {
                    header:'Kode',
                    dataIndex:'satuan_id'
                },
                {
                    header:'Satuan',
                    dataIndex:'satuan_nama',
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
                    action:'SatuanModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'SatuanModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });

        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.SatuanGrid]
        });

        me.pageBody = [/*me.FormulirPanel*/ me.SatuanGrid];
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
        this.SatuanStore.load();
        callback(true);
    }
});
//ens LogPage class