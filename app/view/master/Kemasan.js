Ext.define('App.view.master.Kemasan', {
    extend:'App.ux.RenderPanel',
    id:'panelKemasan',
    pageTitle:'Kemasan',

    initComponent : function()
    {
        var me = this;

        Ext.define('KemasanModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'co_id', type : 'string'},
                { name : 'kemasan_id', type : 'string'},
                { name : 'kemasan_nama', type : 'string'},
                { name : 'size', type : 'string'},
                { name : 'keterangan', type : 'string'},
                { name : 'aktif', type : 'bool'},
                { name : 'old_kemasan_id', type : 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Kemasan.getkemasan,
                    create: Kemasan.addkemasan,
                    update: Kemasan.updatekemasan,
                    destroy: Kemasan.deletekemasan
                }
            }

        });

        me.KemasanStore = Ext.create('Ext.data.Store', {
            storeId : 'KemasanStore',
            model : 'KemasanModel',
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


        me.KemasanGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('KemasanStore'),
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
                                            fieldLabel:'Kode',
                                            name:'kemasan_id',
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Kemasan',
                                            name:'kemasan_nama',
                                            width:385
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Ukuran',
                                            name:'size',
                                            width:200
                                        }

                                    ]
                                },{
                                    xtype:'container',
                                    width:300,
                                    layout:'anchor',
                                    items:[
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
                    dataIndex:'kemasan_id'
                },
                {
                    header:'Kemasan',
                    dataIndex:'kemasan_nama',
                    flex:1
                },
                {
                    header:'Ukuran',
                    dataIndex:'size'
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
                    action:'KemasanModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'KemasanModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });

        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.KemasanGrid]
        });

        me.pageBody = [/*me.FormulirPanel*/ me.KemasanGrid];
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
        this.KemasanStore.load();
        callback(true);
    }
});
//ens LogPage class