Ext.define( 'App.model.transaksi.AllModel.Jurnal',{
    extend: 'Ext.data.Model',
    fields: [
        {name: 'co_id',type: 'string'},
        {name: 'inv_date',type: 'date'},
        {name: 'inv_code',type: 'string'},
        {name: 'vend_id',type: 'string'},
        {name: 'coa',type: 'string'},
        {name: 'coa_nama',type: 'string'},
        {name: 'debit',type: 'float'},
        {name: 'credit',type: 'float'},
        {name: 'sequence_no',type: 'string'},
        {name: 'timeedit',type: 'date'},
        {name: 'remaks',type: 'string'}
    ],
    proxy: {
        type: 'direct',
        api: {
            read: Jurnal.getJurnal

        },
        reader : {
            totalProperty : 'totals',
            root : 'rows'
        }
    }
});
