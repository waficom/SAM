
Ext.define( 'App.model.transaksi.workorder.WObb',
    {
        extend : 'Ext.data.Model',
        fields : [
            { name : 'co_id', type : 'string'},
            { name : 'wo_num', type : 'string'},
            { name : 'bb_id', type : 'string'},
            { name : 'bb_nama', type : 'string'},
            { name : 'sat_id', type : 'string'},
            { name : 'satuan_nama', type : 'string'},
            { name : 'qty_stock', type : 'float'},
            { name : 'qty_in', type : 'float'},
            { name : 'qty_out', type : 'float'},
            { name : 'qty_last', type : 'float'},
            { name : 'keterangan', type : 'string'},
            { name : 'old_bb_id', type : 'string'}
        ],
        proxy :
        {
            type : 'direct',
            api :
            {
                read : WorkOrder.getWObb,
                create: WorkOrder.addWObb,
                update: WorkOrder.updateWObb,
                destroy: WorkOrder.deleteWObb
            },
            reader :
            {
                root : 'wobb',
                totalProperty : 'totals'
            }
        }

    } );

