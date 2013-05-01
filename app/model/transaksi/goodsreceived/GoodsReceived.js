Ext.define( 'App.model.transaksi.goodsreceived.GoodsReceived',
    {
        extend : 'Ext.data.Model',
        fields : [
            { name : 'co_id', type : 'string'},
            { name : 'gr_num', type : 'string'},
            { name : 'tgl',	type : 'date'},
            { name : 'po_num', type : 'string'},
            { name : 'vend_id', type : 'string'},
            { name : 'vend_nama', type : 'string'},
            { name : 'vend_tr_nama', type : 'string'},
            { name : 'vend_id_trans', type : 'string'},
            { name : 'keterangan', type : 'string'}
        ],
        proxy :
        {
            type : 'direct',
            api :
            {
                read : GoodsReceived.getFilterGR,
                create: GoodsReceived.addGR,
                update: GoodsReceived.updateGR,
                destroy: GoodsReceived.deleteGR
            },
            reader :
            {
                root : 'goodsreceived',
                totalProperty : 'totals'
            }
        }

    } );

