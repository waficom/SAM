
Ext.define( 'App.model.transaksi.GoodsIssued.GRDetail',
    {
        extend : 'Ext.data.Model',
        fields : [
            { name : 'co_id', type : 'string'},
            { name : 'gi_num', type : 'string'},
            { name : 'prod_id', type : 'string'},
            { name : 'sat_id', type : 'string'},
            { name : 'sat_nama', type : 'string'},
            { name : 'urut', type : 'int'},
            { name : 'nopol', type : 'string'},
            { name : 'sj_num', type : 'string'},
            { name : 'qty_netto', type : 'float'},
            { name : 'qty_pcs', type : 'float'},
            { name : 'keterangan', type : 'string'},
            { name : 'old_urut', type : 'int'}
        ],
        proxy :
        {
            type : 'direct',
            api :
            {
                read : GoodsIssued.getGIDetail,
                create: GoodsIssued.addGIDetail,
                update: GoodsIssued.updateGIDetail,
                destroy: GoodsIssued.deleteGIDetail
            },
            reader :
            {
                root : 'gidetail',
                totalProperty : 'totals'
            }
        }

    } );
