/**
 * Created with JetBrains PhpStorm.
 * User: dharma
 * Date: 4/19/13
 * Time: 10:13 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define( 'App.model.transaksi.purchaseorder.POItems',
    {
        extend : 'Ext.data.Model',
        fields : [
            { name : 'co_id', type : 'string'},
            { name : 'po_num', type : 'string'},
            { name : 'bb_id', type : 'string'},
            { name : 'bb_nama', type : 'string'},
            { name : 'sat_id', type : 'string'},
            { name : 'satuan_nama', type : 'string'},
            { name : 'qty', type : 'float'},
            { name : 'hrg', type : 'float'},
            { name : 'n_brutto', type : 'float'},
            { name : 'disc_prs', type : 'float'},
            { name : 'n_disc', type : 'float'},
            { name : 'n_netto', type : 'float'},
            { name : 'qty_rcv', type : 'float'},
            { name : 'keterangan', type : 'string'},
            {name: 'useredit',type: 'string'},
            {name: 'userinput',type: 'string'},
            {name: 'timeedit',type: 'date'},
            { name : 'old_bb_id', type : 'string'}
        ],
        proxy :
        {
            type : 'direct',
            api :
            {
                read : PurchaseOrder.getPOItems,
                create: PurchaseOrder.addPOItems,
                update: PurchaseOrder.updatePOItems,
                destroy: PurchaseOrder.deletePOItems
            },
            reader :
            {
                root : 'poitems',
                totalProperty : 'totals'
            }
        }

    } );

