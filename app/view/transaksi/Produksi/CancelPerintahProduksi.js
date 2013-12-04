Ext.define('App.view.transaksi.Produksi.CancelPerintahProduksi', {
    extend:'App.ux.RenderPanel',
    id:'panelCPP',
    pageTitle:'Batal Perintah Produksi',

    initComponent : function()
    {
        var me = this;

        Ext.define('ROModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'co_id', type : 'string'},
                { name : 'no_pp', type : 'string'},
                { name : 'pp_date',	type : 'date'},
                { name : 'description', type : 'string'},
                { name : 'canceled', type : 'bool'},
                { name : 'cancel_date',	type : 'date'},
                { name : 'keterangan_cancel', type : 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Produksi.getProduksiCancel,
                    update: Produksi.updateProduksiCancel
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

        var searching = {
            ftype: 'searching',
            mode: 'local',
            width: 200
        };


        me.ROGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('ROStore1'),
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
                                    width:900,
                                    layout:'anchor',
                                    items:[
                                        {
                                            width: 150,
                                            xtype: 'mitos.checkbox',
                                            fieldLabel: 'Cancel',
                                            name: 'canceled',
                                            handler: function(field, value) {
                                                if (value == true) {
                                                    Ext.ComponentQuery.query('#cancel_pp')[0].setDisabled(false);
                                                    Ext.ComponentQuery.query('#cancel_pp')[0].setValue(new Date());
                                                }else{
                                                    Ext.ComponentQuery.query('#cancel_pp')[0].setDisabled(true);
                                                }

                                            }
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tanggal',
                                            format : 'd-m-Y',
                                            value : new Date(),
                                            maxValue : new Date(),
                                            name:'cancel_date',
                                            itemId:'cancel_pp',
                                            disabled:true,
                                            width:250
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Keterangan',
                                            name:'keterangan_cancel',
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
                    header : 'Kode PP #',
                    dataIndex : 'no_pp',
                    width : 200
                },
                {
                    header : 'Tanggal',
                    dataIndex : 'pp_date',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                },
                {
                    header : 'Description',
                    dataIndex : 'description',
                    flex:1
                }
            ]
        });

        me.pageBody = [me.ROGrid];
        me.callParent(arguments);

    }, // end of initComponent

    onActive : function(callback)
    {
        this.ROStore.load();
        callback(true);
    }
});
//ens LogPage class