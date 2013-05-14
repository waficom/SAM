Ext.define( 'App.model.transaksi.workorder.WOItems',
    {
        extend : 'Ext.data.Model',
        fields : [
            { name : 'co_id', type : 'string'},
            { name : 'wo_num', type : 'string'},
            { name : 'no_pp', type : 'string'},
            { name : 'no_ppd', type : 'string'},
            { name : 'so_num', type : 'string'},
            { name : 'cust_id', type : 'string'},
            { name : 'cust_nama', type : 'string'},
            { name : 'prod_id', type : 'string'},
            { name : 'prod_nama', type : 'string'},
            { name : 'sat_id', type : 'string'},
            { name : 'sat_nama', type : 'string'},
            { name : 'qty', type : 'float'},
            { name : 'qty_pcs', type : 'float'},
            { name : 'keterangan', type : 'string'},
            { name : 'old_prod_id', type : 'string'}
        ],
        proxy :
        {
            type : 'direct',
            api :
            {
                read : WorkOrder.getWOItems,
                create: WorkOrder.addWOItems,
                update: WorkOrder.updateWOItems,
                destroy: WorkOrder.deleteWOItems
            },
            reader :
            {
                root : 'woitems',
                totalProperty : 'totals'
            }
        }

    } );

