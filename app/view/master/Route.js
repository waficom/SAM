Ext.define('App.view.master.Route', {
    extend: 'App.ux.RenderPanel',
    id: 'panelRoute',
    pageTitle: 'Route',
    uses: ['App.ux.GridPanel'],
    initComponent : function()
    {
        var me = this;
        me.route_id = null;

        Ext.define('RouteModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'route_code',type: 'string'},
                {name: 'description',type: 'string'},
                {name: 'keterangan',type: 'string'},
                {name: 'aktif',type: 'bool'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'timeedit',type: 'date'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Route.getRoute,
                    create: Route.addRoute,
                    update: Route.updateRoute,
                    destroy: Route.deleteRoute
                }
            }

        });

        Ext.define('RincianRouteModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'route_code',type: 'string'}
                ,{name: 'sequence_no',type: 'integer'}
                ,{name: 'route',type: 'string'}
                ,{name: 'fromcity',type: 'string'}
                ,{name: 'tocity',type: 'string'}
                ,{name: 'timeedit',type: 'date'}
                ,{name: 'useredit',type: 'string'}
                ,{name: 'userinput',type: 'string'}
                ,{name: 'ordersource',type: 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Route.getRouteD,
                    create: Route.addRouteD,
                    update: Route.updateRouteD,
                    destroy: Route.deleteRouteD
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

        me.RouteStore = Ext.create('Ext.data.Store', {
            storeId : 'RouteStore',
            model : 'RouteModel'
        });
        me.RincianRouteStore = Ext.create('Ext.data.Store', {
            storeId : 'RincianRouteStore',
            model : 'RincianRouteModel'
        });
        me.RouteGrid = Ext.create('Ext.grid.Panel', {
            title:'Route',
            store: Ext.data.StoreManager.lookup('RouteStore'),
            border:false,
            frame:false,
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
                                            name:'route_code',
                                            width:300
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Route',
                                            name:'description',
                                            width:385
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
                    header:'Company',
                    dataIndex:'co_id',
                    hidden:true
                },
                {
                    header:'Kode',
                    dataIndex:'route_code'
                },
                {
                    header:'Route',
                    flex:1,
                    dataIndex:'description'
                },
                {
                    header:'Keterangan',
                    flex:1,
                    dataIndex:'keterangan'
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
                    action:'RouteModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'RouteModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });
        me.RincianRouteGrid = Ext.create('Ext.grid.Panel', {
            title:'Rincian',
            store: Ext.data.StoreManager.lookup('RincianRouteStore'),
            border:false,
            frame:false,
            viewConfig:{
                stripeRows:true
            },
            features:[searching],
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
                                            xtype: 'textfield',
                                            hidden: true,
                                            name: 'co_id'
                                        },
                                        {
                                            xtype: 'textfield',
                                            hidden: true,
                                            name: 'route_code',
                                            itemId:'route_id'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            hideTrigger: true,
                                            fieldLabel:'No. Urut',
                                            name: 'sequence_no',
                                            width:150
                                        },
                                        {
                                            xtype: "radiogroup",
                                            width:250,
                                            fieldLabel: "Jenis",
                                            defaults: {xtype: "radio",name: "ordersource"},
                                            items: [
                                                {
                                                    boxLabel: "Land",
                                                    inputValue: "Land",
                                                    checked: true
                                                },
                                                {
                                                    boxLabel: "Sea",
                                                    inputValue: "Sea"
                                                }
                                            ]
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Dari',
                                            width:300,
                                            name:'fromcity'
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Ke',
                                            width:300,
                                            name:'tocity'
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
                    header:'Urut',
                    dataIndex:'sequence_no'
                },
                {
                    header:'Dari',
                    dataIndex:'fromcity',
                    flex:1
                },
                {
                    header:'Ke',
                    dataIndex:'tocity',
                    flex:1
                },
                {
                    header:'Keterangan',
                    dataIndex:'keterangan',
                    flex:1
                },
                {
                    header: 'LastUpdate',
                    width : 80,
                    dataIndex: 'timeedit',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'RincianRouteModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'RincianRouteModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });
        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.RouteGrid, me.RincianRouteGrid]
        });

        me.pageBody = [me.FormulirPanel];
        me.callParent(arguments);

    }, // end of initComponent
    onGridClick: function(grid, selected){
        var me = this;
        me.route_id = selected.data.route_code;
        me.RincianRouteStore.load({params:{route_code: me.route_id}});

    },
    onNewRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
//        plugin.cancelEdit();
        newModel = Ext.ModelManager.create({ co_id : globals.site }, model);
        store.insert(0, newModel);
        plugin.startEdit(0, 0);
        if(Ext.ComponentQuery.query('#route_id')[0]){
            Ext.ComponentQuery.query('#route_id')[0].setValue(me.route_id);
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
        this.RouteStore.load();
        this.RincianRouteStore.load();
        callback(true);
    }
});
//ens LogPage class