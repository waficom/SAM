/**
 * Created with JetBrains PhpStorm.
 * User: dharma
 * Date: 5/15/13
 * Time: 11:45 AM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('JenisPopup', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'jenis_id',type: 'string'},
        {name: 'jenis_nama',type: 'string'},
        {name: 'timeedit',type: 'date'}
        // {name: 'timeedit',type: 'date'}
    ],
    proxy: {
        type: 'direct',
        api: {
            read: Jenis.getjenis

        }
    }
});
