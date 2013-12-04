Ext.define('App.view.transaksi.salesorder.ReleaseOrder', {
    extend:'App.ux.RenderPanel',
    id:'panelRO',
    pageTitle:'Pelepasan Pesanan',

    initComponent : function()
    {
        var me = this;
        me.so_num = null;

        Ext.define('ROModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'co_id', type : 'string'},
                { name : 'so_num', type : 'string'},
                { name : 'released_date',	type : 'date'},
                { name : 'status', type : 'string'},
                { name : 'tanggal',	type : 'date'},
                { name : 'cust_nama', type : 'string'},
                { name : 'keterangan_risk',	type : 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: ReleaseOrder.getReleaseOrder,
                    update: ReleaseOrder.updateReleaseOrder
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            }


        });
        Ext.define('RiskCheckListModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'co_id', type : 'string'},
                { name : 'risk_code', type : 'string'},
                { name : 'description', type : 'string'},
                { name : 'so_num', type : 'string'},
                { name : 'aktif', type : 'bool'},
                { name : 'keterangan',	type : 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: ReleaseOrder.getRCL,
                    update: ReleaseOrder.updateRCL
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            }
        });


        me.ROStore = Ext.create('Ext.data.Store', {
            storeId : 'ROStore1',
            model : 'ROModel',
            remoteSort : false,
            pageSize : 10,
            autoLoad: false
        });
        me.RCLStore = Ext.create('Ext.data.Store', {
            storeId : 'RiskCheckListModel',
            model : 'RiskCheckListModel',
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


        me.ROGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('ROStore1'),
            title:'Release',
            border:false,
            frame:false,
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
                                    width:900,
                                    layout:'anchor',
                                    items:[
                                        {
                                            width: 150,
                                            xtype: 'mitos.checkbox',
                                            fieldLabel: 'Release',
                                            name: 'status',
                                            handler: function(field, value) {
                                                if (value == true) {
                                                    Ext.ComponentQuery.query('#release_so')[0].setDisabled(false);
                                                    Ext.ComponentQuery.query('#release_so')[0].setValue(new Date());
                                                }else{
                                                    Ext.ComponentQuery.query('#release_so')[0].setDisabled(true);
                                                }

                                            }
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tanggal',
                                            format : 'd-m-Y',
                                            value : new Date(),
                                            maxValue : new Date(),
                                            name:'released_date',
                                            itemId:'release_so',
                                            disabled:true,
                                            width:250
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Keterangan',
                                            name:'keterangan_risk',
                                            value: 'Keterangan',
                                            width:600
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
                    text: 'co_id',
                    sortable: false,
                    dataIndex: 'co_id',
                    hidden: true
                },
                {
                    header : 'Kode SO #',
                    dataIndex : 'so_num',
                    width : 200
                },
                {
                    header : 'Tanggal',
                    dataIndex : 'tanggal',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                },
                {
                    header : 'Customer',
                    dataIndex : 'cust_nama',
                    flex:1
                }
            ]
        });
        me.RCLGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('RiskCheckListModel'),
            title:'Check List',
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
                            flex:1,
                            items:[
                                {
                                    xtype:'container',
                                    width:385,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Deskripsi',
                                            name:'description',
                                            readOnly: true,
                                            width:385
                                        }
                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:50,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype : 'mitos.checkbox',
                                            name:'aktif',
                                            width:50
                                        }
                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:385,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Keterangan',
                                            name:'keterangan',
                                            width:385
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
                    text: 'co_id',
                    sortable: false,
                    dataIndex: 'co_id',
                    hidden: true
                },
                {
                    header : 'Deskripsi',
                    dataIndex : 'description',
                    flex:1
                },
                {
                    header : 'Status',
                    dataIndex : 'aktif',
                    renderer: authCk
                },
                {
                    header : 'Keterangan',
                    dataIndex : 'keterangan',
                    flex:1
                }
            ]
        });

        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.ROGrid, me.RCLGrid]
        });

        me.pageBody = [me.FormulirPanel];
        me.callParent(arguments);

    }, // end of initComponent

    onGridClick: function(grid, selected){
        var me = this;
        me.so_num = selected.data.so_num;
        me.RCLStore.load({params:{so_num: me.so_num}});
    },
    onActive : function(callback)
    {
        this.ROStore.load();
        this.RCLStore.load();
        callback(true);
    }
});
//ens LogPage class