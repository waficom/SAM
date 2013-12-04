Ext.define('App.view.master.Penyusutan_Aset', {
    extend: 'App.ux.RenderPanel',
    id: 'panelPenyusutan_Aset',
    pageTitle: 'Umur Aset',
    uses: ['App.ux.GridPanel'],
    initComponent : function()
    {
        var me = this;

        Ext.define('UmurAsetModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name: 'co_id',type: 'string'},
                { name: 'pa_id',type: 'string'},
                { name: 'description',type: 'string'},
                { name: 'jml_tahun',type: 'float'},
                { name: 'jml_bulan',type: 'float'},
                { name: 'userinput',type: 'string'},
                { name: 'useredit',type: 'string'},
                { name: 'timeinput',type: 'date'},
                { name: 'timeedit',type: 'date'},
                { name: 'aktif',type: 'bool'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Penyusutan_Aset.getPenyusutan_Aset,
                    create: Penyusutan_Aset.addPenyusutan_Aset,
                    update: Penyusutan_Aset.updatePenyusutan_Aset,
                    destroy: Penyusutan_Aset.deletePenyusutan_Aset
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            }

        });

        me.UmurAsetStore = Ext.create('Ext.data.Store', {
            storeId : 'UmurAsetStore1',
            model : 'UmurAsetModel',
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


        me.UmurAsetGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('UmurAsetStore1'),
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
                                            name:'pa_id',
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Deskripsi',
                                            name:'description',
                                            width:385
                                        },
                                        {
                                            xtype : 'numberfield',
                                            hideTrigger: true,
                                            fieldLabel : 'Jml Tahun',
                                            name:'jml_tahun',
                                            width:200
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
                    dataIndex:'pa_id'
                },
                {
                    header:'Umur Aset',
                    dataIndex:'description',
                    flex:1
                },
                {
                    header: 'Jml Tahun',
                    dataIndex: 'jml_tahun'
                },
                {
                    header: 'Jml Bulan',
                    dataIndex: 'jml_bulan'
                },
                {
                    header: 'Aktif',
                    sortable: true,
                    dataIndex: 'aktif',
                    renderer: authCk
                }
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'UmurAsetModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'UmurAsetModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });

        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.UmurAsetGrid]
        });

        me.pageBody = [/*me.FormulirPanel*/me.UmurAsetGrid];
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
        this.UmurAsetStore.load();
        callback(true);
    }
});
//ens LogPage class