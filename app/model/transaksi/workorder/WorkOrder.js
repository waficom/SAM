Ext.define( 'App.model.transaksi.workorder.WorkOrder',
    {
        extend : 'Ext.data.Model',
        fields : [
            { name : 'co_id', type : 'string'},
            { name : 'wo_num', type : 'string'},
            { name : 'tgl',	type : 'date'},
            { name : 'shift', type : 'string'},
            { name : 'ka_shift', type : 'string'},
            { name : 'wo_num_from', type : 'string'},
            { name : 'keterangan', type : 'string'}
        ],
        proxy :
        {
            type : 'direct',
            api :
            {
                read : WorkOrder.getFilterWOData,
                create: WorkOrder.addWO,
                update: WorkOrder.updateWO,
                destroy: WorkOrder.deleteWO
            },
            reader :
            {
                root : 'workorder',
                totalProperty : 'totals'
            }
        }

    } );
