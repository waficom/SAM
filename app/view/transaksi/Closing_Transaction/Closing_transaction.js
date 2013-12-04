
Ext.define('App.view.transaksi.Closing_Transaction.Closing_transaction', {
    extend: 'App.ux.RenderPanel',
    id: 'panelCT',
    pageTitle: 'Tutup Pembukuan',
    initComponent : function()
    {
        var me = this;

        Ext.define('CT_MonthModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id', type: 'string'},
                {name: 'periode_month', type: 'string'},
                {name: 'remaks', type: 'string'},
                {name: 'closing_date', type: 'date'},
                {name: 'userinput', type: 'string'},
                {name: 'useredit', type: 'string'},
                {name: 'status', type: 'bool'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Closing_transaction.getCT_month,
                    create: Closing_transaction.addCT_month,
                    update: Closing_transaction.updateCT_month,
                    destroy: Closing_transaction.deleteCT_month
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            }


        });
        Ext.define('CT_YearModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id', type: 'string'},
                {name: 'periode_year', type: 'string'},
                {name: 'remaks', type: 'string'},
                {name: 'closing_date', type: 'date'},
                {name: 'userinput', type: 'string'},
                {name: 'useredit', type: 'string'},
                {name: 'status', type: 'bool'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Closing_transaction.getCT_year,
                    create: Closing_transaction.addCT_year,
                    update: Closing_transaction.updateCT_year,
                    destroy: Closing_transaction.deleteCT_year
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
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
        me.CT_MonthStore = Ext.create('Ext.data.Store', {
            storeId : 'CT_MonthStore1',
            model : 'CT_MonthModel',
            remoteSort : false,
            pageSize : 10,
            autoLoad: false
        });
        me.CT_YearStore = Ext.create('Ext.data.Store', {
            storeId : 'CT_YearModel',
            model : 'CT_YearModel',
            remoteSort : false,
            pageSize : 10,
            autoLoad: false
        });

        var searching = {
            ftype: 'searching',
            mode: 'local',
            width: 200
        };


        me.CT_MonthGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('CT_MonthStore1'),
            title:'Tutup Bulanan',
            border:false,
            frame:false,
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
                                    width:900,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype : 'numberfield',
                                            hideTrigger: true,
                                            fieldLabel: 'Per. Bulan',
                                            name: 'periode_month',
                                            allowBlank:false,
                                            width: 150
                                        },
                                        {
                                            fieldLabel: 'Keterangan',
                                            xtype: 'textfield',
                                            name: 'remaks',
                                            width: 385
                                        },
                                        {
                                            width: 150,
                                            xtype: 'mitos.checkbox',
                                            fieldLabel: 'Aktif',
                                            name: 'status',
                                            handler: function(field, value) {
                                                if (value == true) {
                                                    Ext.ComponentQuery.query('#tgl_ttp_bulan')[0].setDisabled(false);
                                                    Ext.ComponentQuery.query('#tgl_ttp_bulan')[0].setValue(new Date());
                                                }else{
                                                    Ext.ComponentQuery.query('#tgl_ttp_bulan')[0].setDisabled(true);
                                                }

                                            }
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tanggal',
                                            format : 'd-m-Y',
                                            value : new Date(),
                                            maxValue : new Date(),
                                            name:'closing_date',
                                            itemId:'tgl_ttp_bulan',
                                            disabled:true,
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
                {header : 'co_id', dataIndex : 'co_id', hidden: true},
                {header : 'Per. Bulan', dataIndex : 'periode_month'},
                {header: 'Keterangan',sortable: true,dataIndex: 'remaks', flex:1},
                {header: 'Aktif',sortable: true,dataIndex: 'status',renderer: authCk},
                {header: 'Tgl Tutup', width : 80, sortable: true, dataIndex: 'closing_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {header: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'CT_MonthModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'CT_MonthModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });
        me.CT_YearGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('CT_YearModel'),
            title:'Tutup Tahunan',
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
                            flex:1,
                            items:[
                                {
                                    xtype:'container',
                                    flex:1,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype : 'numberfield',
                                            hideTrigger: true,
                                            fieldLabel: 'Per. Tahun',
                                            name: 'periode_year',
                                            allowBlank:false,
                                            width: 150
                                        },
                                        {
                                            fieldLabel: 'Keterangan',
                                            xtype: 'textfield',
                                            name: 'remaks',
                                            width: 385
                                        },
                                        {
                                            width: 150,
                                            xtype: 'mitos.checkbox',
                                            fieldLabel: 'Aktif',
                                            name: 'status',
                                            handler: function(field, value) {
                                                if (value == true) {
                                                    Ext.ComponentQuery.query('#tgl_ttp_tahun')[0].setDisabled(false);
                                                    Ext.ComponentQuery.query('#tgl_ttp_tahun')[0].setValue(new Date());
                                                }else{
                                                    Ext.ComponentQuery.query('#tgl_ttp_tahun')[0].setDisabled(true);
                                                }

                                            }
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tanggal',
                                            format : 'd-m-Y',
                                            value : new Date(),
                                            maxValue : new Date(),
                                            name:'closing_date',
                                            itemId:'tgl_ttp_tahun',
                                            disabled:true,
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
                {header : 'co_id', dataIndex : 'co_id', hidden: true},
                {header : 'Per. Tahun', dataIndex : 'periode_year'},
                {text: 'Keterangan',sortable: true,dataIndex: 'remaks', flex:1},
                {text: 'Aktif',sortable: true,dataIndex: 'status',renderer: authCk},
                {text: 'Tgl Tutup', width : 80, sortable: true, dataIndex: 'closing_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'CT_YearModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'CT_YearModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });

        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.CT_MonthGrid, me.CT_YearGrid ]
        });

        me.pageBody = [me.FormulirPanel];
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

    onActive : function(callback)
    {
        this.CT_MonthStore.load();
        this.CT_YearStore.load();
        callback(true);
    }
});
//ens LogPage class