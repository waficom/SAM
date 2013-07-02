
Ext.define( 'App.model.transaksi.goodsreceived.GRDetail',
    {
        extend : 'Ext.data.Model',
        fields : [
            { name : 'co_id', type : 'string'},
            { name : 'gr_num', type : 'string'},
            { name : 'bb_id', type : 'string'},
            { name : 'sat_id', type : 'string'},
            { name : 'urut', type : 'int'},
            { name : 'nopol', type : 'string'},
            { name : 'do_num', type : 'string'},
            { name : 'qty_brutto', type : 'float'},
            { name : 'qty_netto', type : 'float'},
            { name : 'qty_pcs', type : 'float'},
            { name : 'qty_selisih', type : 'float'},
            { name : 'keterangan', type : 'string'}
        ],
        proxy :
        {
            type : 'direct',
            api :
            {
                read : GoodsReceived.getGRDetail,
                create: GoodsReceived.addGRDetail,
                update: GoodsReceived.updateGRDetail,
                destroy: GoodsReceived.deleteGRDetail
            }
        }

    } );
