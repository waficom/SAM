Ext.define( 'App.model.transaksi.purchaseorder.PurchaseOrder',
    {
        extend : 'Ext.data.Model',
        fields : [
            { name : 'co_id', type : 'string'},
            { name : 'po_num', type : 'string'},
            { name : 'tgl',	type : 'date'},
            { name : 'vend_id', type : 'string'},
            { name : 'vend_nama', type : 'string'},
            { name : 'vend_inq_num', type : 'string'},
            { name : 'vend_do_num', type : 'string'},
            { name : 'inv_num', type : 'string'},
            { name : 'ppn_po', type : 'bool'},
            { name : 'ppn_exc', type : 'bool'},
            { name : 'ppn_prs', type : 'float'},
            { name : 'disc_prs', type : 'float'},
            { name : 'n_bruto', type : 'float'},
            { name : 'n_disc', type : 'float'},
            { name : 'n_ppn', type : 'float'},
            { name : 'n_netto', type : 'float'},
            { name : 'keterangan', type : 'string'}
        ],
        proxy :
        {
            type : 'direct',
            api :
            {
                read : PurchaseOrder.getFilterPOData,
                create: PurchaseOrder.addPO,
                update: PurchaseOrder.updatePO,
                destroy: PurchaseOrder.deletePO
            },
            reader :
            {
                root : 'purchaseorder',
                totalProperty : 'totals'
            }
        }

    } );