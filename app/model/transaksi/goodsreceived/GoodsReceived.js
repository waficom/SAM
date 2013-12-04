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
            { name : 'gr_type', type : 'string'},
            { name : 'gr_type_desc', type : 'string'},
            { name : 'keterangan', type : 'string'},
            { name : 'gudang_id', type : 'string'},
            { name : 'gudang_nama', type : 'string'},
            { name : 'status', type : 'string'},
            { name : 'userinput', type : 'string'},
            { name : 'useredit', type : 'string'},
            { name : 'timeinput', type : 'date'},
            { name : 'timeedit', type : 'date'},
            { name : 'posted_date', type : 'date'},
            { name : 'grn_return', type : 'string'},
            { name : 'rc_type', type : 'string'},
            { name : 'account', type : 'string'},
            { name : 'account_nama', type : 'string'},
            { name : 'pabrik', type : 'string'}
        ],
        proxy :
        {
            type : 'direct',
            api :
            {
                read : GoodsReceived.getFilterGRData,
                create: GoodsReceived.addGR,
                update: GoodsReceived.updateGR,
                update: GoodsReceived.postingGR,
                destroy: GoodsReceived.deleteGR
            },
            reader :
            {
                root : 'goodsreceived',
                totalProperty : 'totals'
            }
        }

    } );

