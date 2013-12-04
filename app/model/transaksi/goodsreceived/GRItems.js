
Ext.define( 'App.model.transaksi.goodsreceived.GRItems',
    {
        extend : 'Ext.data.Model',
        fields : [
            { name : 'co_id', type : 'string'},
            { name : 'gr_num', type : 'string'},
            { name : 'bb_id', type : 'string'},
            { name : 'bb_nama', type : 'string'},
            { name : 'sat_id', type : 'string'},
            { name : 'sat_nama', type : 'string'},
            { name : 'qty_brutto', type : 'float'},
            { name : 'qty_netto', type : 'float'},
            { name : 'qty_pcs', type : 'float'},
            { name : 'qty_selisih', type : 'float'},
            { name : 'keterangan', type : 'string'},
            { name : 'qty_po', type : 'float'},
            { name : 'old_bb_id', type : 'string'},
            { name : 'nopol', type : 'string'},
            { name : 'do_num', type : 'string'},
            { name : 'qty_bruto', type : 'float'},
            { name : 'qty_netto', type : 'float'},
            { name : 'qty_pcs', type : 'float'},
            { name : 'qty_selisih', type : 'float'},
            { name : 'qtygrn', type : 'float'}
            ],
        proxy :
        {
            type : 'direct',
            api :
            {
                read : GoodsReceived.getGRItems,
                create: GoodsReceived.addGRItems,
                update: GoodsReceived.updateGRItems,
                destroy: GoodsReceived.deleteGRItems
            },
            reader :
            {
                root : 'gritems',
                totalProperty : 'totals'
            }
        }

    } );
