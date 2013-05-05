
Ext.define( 'App.model.transaksi.goodsissued.GIItems',
    {
        extend : 'Ext.data.Model',
        fields : [
            { name : 'co_id', type : 'string'},
            { name : 'gi_num', type : 'string'},
            { name : 'prod_id', type : 'string'},
            { name : 'prod_nama', type : 'string'},
            { name : 'sat_id', type : 'string'},
            { name : 'sat_nama', type : 'string'},
            { name : 'qty_netto', type : 'float'},
            { name : 'qty_pcs', type : 'float'},
            { name : 'transporter', type : 'string'},
            { name : 'vend_nama', type : 'string'},
            { name : 'keterangan', type : 'string'},
            { name : 'old_prod_id', type : 'string'}
        ],
        proxy :
        {
            type : 'direct',
            api :
            {
                read : GoodsIssued.getGIItems,
                create: GoodsIssued.addGIItems,
                update: GoodsIssued.updateGIItems,
                destroy: GoodsIssued.deleteGIItems
            },
            reader :
            {
                root : 'giitems',
                totalProperty : 'totals'
            }
        }

    } );

