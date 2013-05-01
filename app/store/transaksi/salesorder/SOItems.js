/**
 * Created with JetBrains PhpStorm.
 * User: dharma
 * Date: 4/19/13
 * Time: 10:12 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.store.transaksi.salesorder.SOItems',
    {
        extend : 'Ext.data.Store',
        model : 'App.model.transaksi.salesorder.SOItems',
        autoLoad : false
    });
