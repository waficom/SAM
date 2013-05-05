Ext.define( 'App.model.transaksi.goodsissued.GoodsIssued',
    {
        extend : 'Ext.data.Model',
        fields : [
            { name : 'co_id', type : 'string'},
            { name : 'gi_num', type : 'string'},
            { name : 'tgl',	type : 'date'},
            { name : 'so_num', type : 'string'},
            { name : 'cust_id', type : 'string'},
            { name : 'cust_nama', type : 'string'},
            { name : 'keterangan', type : 'string'}
        ],
        proxy :
        {
            type : 'direct',
            api :
            {
                read : GoodsIssued.getFilterGIData,
                create: GoodsIssued.addGI,
                update: GoodsIssued.updateGI,
                destroy: GoodsIssued.deleteGI
            },
            reader :
            {
                root : 'goodsissued',
                totalProperty : 'totals'
            }
        }

    } );
