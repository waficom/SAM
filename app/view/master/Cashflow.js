Ext.define('App.view.master.Cashflow', {
    extend: 'App.ux.RenderPanel',
    id: 'panelCashflow',
    pageTitle: 'Cashflow',
    uses: ['App.ux.GridPanel'],
    initComponent : function()
    {
        var me = this;

        Ext.define('CFModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name: 'co_id',type: 'string'},
                { name: 'cf_code',type: 'string'},
                { name: 'description',type: 'string'},
                { name: 'category',type: 'string'},
                { name: 'cf_type',type: 'string'},
                { name: 'userinput',type: 'string'},
                { name: 'useredit',type: 'string'},
                { name: 'timeinput',type: 'date'},
                { name: 'timeedit',type: 'date'},
                { name: 'aktif',type: 'bool'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Cashflow.getCashflow,
                    create: Cashflow.addCashflow,
                    update: Cashflow.updateCashflow,
                    destroy: Cashflow.deleteCashflow
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            }

        });

        me.CFStore = Ext.create('Ext.data.Store', {
            storeId : 'CFStore1',
            model : 'CFModel',
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


        me.CFGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('CFStore1'),
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
                                            name:'cf_code',
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Deskripsi',
                                            name:'description',
                                            width:385
                                        },
                                        {
                                            xtype: "radiogroup",
                                            fieldLabel: "Jenis ",
                                            defaults: {xtype: "radio",name: "cf_type"},
                                            items: [
                                                {
                                                    boxLabel: "Masuk",
                                                    inputValue: "I",
                                                    checked: true
                                                },
                                                {
                                                    boxLabel: "Keluar",
                                                    inputValue: "O"
                                                }
                                            ]
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Kategory',
                                            name:'category',
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
                    dataIndex:'cf_code'
                },
                {
                    header:'Deskripsi',
                    dataIndex:'description',
                    flex:1
                },
                {
                    header: 'Category',
                    dataIndex: 'category'
                },
                {
                    header: 'Type',
                    dataIndex: 'cf_type'
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
                    action:'CFModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'CFModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });

        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.CFGrid]
        });

        me.pageBody = [/*me.FormulirPanel*/me.CFGrid];
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
        this.CFStore.load();
        callback(true);
    }
});
//ens LogPage class