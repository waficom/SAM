/**
 * Created with JetBrains PhpStorm.
 * User: dharma
 * Date: 4/19/13
 * Time: 10:13 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define( 'App.model.transaksi.salesorder.SOItems',
    {
        extend : 'Ext.data.Model',
        fields : [
            { name : 'co_id', type : 'string'},
            { name : 'so_num', type : 'string'},
            { name : 'prod_id', type : 'string'},
            { name : 'prod_nama', type : 'string'},
            { name : 'sat_id', type : 'string'},
            { name : 'sat_nama', type : 'string'},
            { name : 'qty', type : 'float'},
            { name : 'harga', type : 'float'},
            { name : 'n_bruto', type : 'float'},
            { name : 'disc_prs', type : 'float'},
            { name : 'n_disc', type : 'float'},
            { name : 'n_netto', type : 'float'},
            { name : 'hrg_loco', type : 'float'},
            { name : 'hrg_transport', type : 'float'},
            { name : 'hrg_promosi', type : 'float'},
            { name : 'hrg_sosialisasi', type : 'float'},
            { name : 'hrg_lain', type : 'float'},
            { name : 'keterangan', type : 'string'},
            { name : 'old_prod_id', type : 'string'}
        ],
        proxy :
        {
            type : 'direct',
            api :
            {
                read : SalesOrder.getSOItems,
                create: SalesOrder.addSOItems,
                update: SalesOrder.updateSOItems,
                destroy: SalesOrder.deleteSOItems
            },
            reader :
            {
                root : 'soitems',
                totalProperty : 'totals'
            }
        }

    } );
