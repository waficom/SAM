
Ext.define('App.view.transaksi.OrderMonitoring.OrderMonitoring', {
    extend: 'App.ux.RenderPanel',
    id: 'panelOM',
    pageTitle: 'Order Monitoring',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        Ext.define('OrderMonitoringModel', {
            extend: 'Ext.data.Model',
            fields: [
                { name : 'co_id', type : 'string', hidden: true},
                { name : 'so_num', type : 'string'},
                { name : 'tanggal', type : 'date'},
                { name : 'tgl_jt_kirim', type : 'date'},
                { name : 'cust_nama', type : 'string'},
                { name : 'no_pp',	type : 'string'},
                { name : 'no_ppd', type : 'string'},
                { name : 'qty', type : 'string'},
                { name : 'qty_working', type : 'string'},
                { name : 'qty_delivery', type : 'string'},
                { name : 'status', type : 'string'},
                { name : 'statusdesc', type : 'string'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: OrderMonitoring.getOrderMonitoring
                }
            }
        });
        me.OrderMonitoringStore = Ext.create('Ext.data.Store', {
            model: 'OrderMonitoringModel',
            remoteSort: true
        });

        var searching = {
            ftype: 'searching',
            mode: 'local',
            width: 200
        };

        // *************************************************************************************
        // Create the GridPanel
        // *************************************************************************************
        me.OrderMonitoringGrid = Ext.create('Ext.grid.Panel', {
            store: me.OrderMonitoringStore,
            columns: [
                {text: 'co_id',sortable: false, dataIndex: 'co_id', hidden: true },
                {header : 'Sales Order #',dataIndex : 'so_num',width : 150},
                {header : 'Tanggal',dataIndex : 'tanggal',renderer:Ext.util.Format.dateRenderer('d-m-Y'),width : 100},
                {header : 'Customer',dataIndex : 'cust_nama',width : 200 },
                {header : 'JT Kirim',dataIndex : 'tgl_jt_kirim',renderer:Ext.util.Format.dateRenderer('d-m-Y'),width : 100},
                {header : 'Qty',dataIndex : 'qty',width : 100},
                {header : 'Qty Working',dataIndex : 'qty_working',width : 100 },
                {header : 'Qty Delivery',dataIndex : 'qty_delivery',width : 100},
                {header : 'Status',dataIndex : 'status',width : 300, hidden:true},
                {header : 'Status Description',dataIndex : 'statusdesc',width : 300}
            ],
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == 'B' ? 'child-row' : (record.get('status') == 'C' ? 'yellow-row':'');
                }
            },
            features: [searching]

        });
        // *************************************************************************************
        // END WINDOW
        me.pageBody = [me.OrderMonitoringGrid];
        me.callParent(arguments);
    }, // end of initComponent

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.OrderMonitoringStore.load();
        callback(true);
    }
});
