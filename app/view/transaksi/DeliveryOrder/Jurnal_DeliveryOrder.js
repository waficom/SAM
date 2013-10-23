Ext.define('App.view.transaksi.DeliveryOrder.Jurnal_DeliveryOrder', {
    extend: 'App.ux.RenderPanel',
    id: 'panelJurnal_DeliveryOrder',
    pageTitle: 'Jurnal Pengiriman Barang Jadi',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.currInv_Code = null;
        me.userinput =null;
        me.useredit=null;
        //me.myWinChooseItem=null;
        Ext.define('DeliveryOrderModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'do_num',type: 'string'},
                {name: 'so_num',type: 'string'},
                {name: 'route',type: 'string'},
                {name: 'route_nama',type: 'string'},
                {name: 'deliverydate',type: 'date'},
                {name: 'cust_nama',type: 'string'},
                {name: 'qty',type: 'float'},
                {name: 'qty_do',type: 'float'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'timeinput',type: 'date'},
                {name: 'status',type: 'string'},
                {name: 'prod_id',type: 'string'},
                {name: 'prod_nama',type: 'string'},
                {name: 'sat_id',type: 'string'},
                {name: 'darigudang',type: 'string'},
                {name: 'gudang_nama',type: 'string'},
                {name: 'for_do_num',type: 'string'},
                {name: 'do_type',type: 'string'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: DeliveryOrder.getDeliveryOrder,
                    create: DeliveryOrder.addDeliveryOrder,
                    create: DeliveryOrder.addDeliveryOrderReturn,
                    update: DeliveryOrder.updateDeliveryOrder,
                    update: DeliveryOrder.updateDeliveryOrderPosting,
                    destroy: DeliveryOrder.deleteDeliveryOrder
                }
            }
        });
        me.DeliveryOrderStore = Ext.create('Ext.data.Store', {
            model: 'DeliveryOrderModel',
            autoLoad: false
        });

        Ext.define('DO_JurnalModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'inv_date',type: 'date'},
                {name: 'inv_code',type: 'string'},
                {name: 'inv_code_link',type: 'string'},
                {name: 'vend_id',type: 'string'},
                {name: 'coa',type: 'string'},
                {name: 'coa_nama',type: 'string'},
                {name: 'debit',type: 'float'},
                {name: 'credit',type: 'float'},
                {name: 'sequence_no',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'remaks',type: 'string'}
            ]

        });
        me.DO_JurnalStore = Ext.create('Ext.data.Store', {
            model: 'DO_JurnalModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Jurnal.getJurnal
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });
        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit','inv_date']

        }

        /**
         * Lists Grid
         */
        me.DeliveryOrderGrid = Ext.create('App.ux.GridPanel', {
            store: me.DeliveryOrderStore,
            itemId: 'DeliveryOrderGrid',
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {text: 'Do Num',sortable: true,dataIndex: 'do_num'},
                {text: 'DO Date', width : 80, sortable: true, dataIndex: 'deliverydate', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'So Num', sortable: false, dataIndex: 'so_num'},
                {text: 'Produk ID',width:150, sortable: false, dataIndex: 'prod_id', hidden:true},
                {text: 'Produk', sortable: false, dataIndex: 'prod_nama'},
                {text: 'Route', sortable: false, dataIndex: 'route'},
                {text: 'Customer', flex:1, sortable: false,dataIndex: 'cust_nama'},
                {text: 'Qty SO', sortable: false,dataIndex: 'qty'},
                {text: 'Qty DO', sortable: false,dataIndex: 'qty_do'},
                {text: 'Sat.', sortable: false, dataIndex: 'sat_id'},
                {text: 'status',sortable: true,dataIndex: 'status', hidden: true},
                {text: 'LastUpdate', dataIndex: 'timeedit',width: 100,renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1'? 'child-row' : record.get('status') == '2'? 'adult-row' : '';
                }
            },
            listeners: {
                scope: me,
                select: me.onDeliveryOrderGridClick
            },
            features:[searching],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange1',
                            items : [

                                {
                                    xtype : 'datefield',
                                    itemId : 'datefrom',
                                    fieldLabel : 'Date',
                                    labelWidth : 20,
                                    width : 110,
                                    format : 'd-m-Y',
                                    value : new Date()
                                }]
                        },{
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange',
                            items : [

                                {
                                    xtype : 'datefield',
                                    itemId : 'dateto',
                                    fieldLabel : 'to',
                                    labelWidth : 10,
                                    width : 110,
                                    format : 'd-m-Y',
                                    value : new Date()
                                }]
                        },{
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerSearch',
                            layout : 'vbox',
                            items : [
                                {
                                    xtype : 'button',
                                    width : 80,
                                    margin : '0 0 3 0',
                                    text : 'Cari',
                                    listeners :
                                    {
                                        scope : me,
                                        click : me.ReloadGrid
                                    }
                                }]
                        },
                        '->',
                        {
                            xtype:'displayfield',
                            itemId:'itemuserinput',
                            margin : '0 5 0 0'
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.DeliveryOrderStore,
                    beforePageText: 'Page',
                    afterPageText: 'of {0}',
                    displayMsg: 'Diplay {0} - {1} Of {2}',
                    emptyMsg: 'No Record Found',
                    dock: 'bottom',
                    displayInfo: true,
                    pageSize: 5

                }
            ]
        });

        me.DO_JurnalGrid = Ext.create('App.ux.GridPanel', {
            store: me.DO_JurnalStore,
            region: 'center',
            enablePaging: true,
            columns: [
                {header : 'co_id', dataIndex : 'co_id',width : 200, hidden: true},
                {header : 'Doc. Date',dataIndex : 'inv_date',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100},
                {header : 'Doc. Number', dataIndex : 'inv_code',width : 150},
                {header : 'Coa', dataIndex : 'coa',width : 100},
                {header : 'Description', dataIndex : 'coa_nama',width : 200, summaryRenderer: function(){
                    return '<b>Total</b>';
                }},
                {header : 'Debit', dataIndex : 'debit',width : 150,renderer: Ext.util.Format.numberRenderer('0,000.00'),  summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'Credit', dataIndex : 'credit',width : 150,renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'sequence_no', dataIndex : 'sequence_no',width : 150, hidden: true},
                {header : 'Remarks', dataIndex : 'remaks',width : 200},
                {header : 'LastUpdate',dataIndex : 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100}
            ],
            viewConfig: {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return me.currPosted == '1'? 'child-row' : me.currPosted == '2'? 'adult-row' : '';
                }
            },
            features: [{
                ftype: 'summary'
            }, searching]
        });

        // *************************************************************************************
        // Window User Form
        // *************************************************************************************
        me.pageBody = [me.DeliveryOrderGrid, me.DO_JurnalGrid];
        me.callParent(arguments);
    },
    onDeliveryOrderGridClick: function(grid, selected){
        var me = this;
        me.currDeliveryOrder = selected.data.do_num;
        me.currPosted = selected.data.status;
        var TopBarItems = this.DeliveryOrderGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);
        if(selected.data.status == 1 || selected.data.status == 2){
            Ext.getCmp('delete_do').disable();
        }else{
            Ext.getCmp('delete_do').enable();
        }
        me.DO_JurnalStore.load({params:{inv_code: me.currDeliveryOrder}});

    },
    ReloadGrid : function(btn)
    {
        // Declare some variables
        var topBarItems = this.DeliveryOrderGrid.getDockedItems('toolbar[dock="top"]')[0],
            datefrom = topBarItems.getComponent( 'fieldContainerDateRange1' ).getComponent( 'datefrom' ).getValue( ),
            dateto = topBarItems.getComponent( 'fieldContainerDateRange' ).getComponent( 'dateto' ).getValue( );

        // Load the ExtJs dataStore with the new parameters
        this.DeliveryOrderStore.load({params:{co_id:globals['site'] ,datefrom : datefrom, dateto : dateto}});

    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        this.ReloadGrid();
        this.DO_JurnalStore.load();

        callback(true);
    }
});
