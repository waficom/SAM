Ext.define( 'App.model.transaksi.salesorder.SalesOrder',
{
	extend : 'Ext.data.Model',
	fields : [
	{ name : 'co_id', type : 'string'},
	{ name : 'so_num', type : 'string'},
	{ name : 'tanggal',	type : 'date'},
	{ name : 'cust_id', type : 'string'},
	{ name : 'cust_nama', type : 'string'},
	{ name : 'cust_po_num', type : 'string'},
	{ name : 'cust_po_tgl', type : 'date'},
	{ name : 'inv_num', type : 'string'},
	{ name : 'fp_num', type : 'string'},
	{ name : 'tgl_jt_kirim', type : 'string'},
    { name : 'wilayah_id', type : 'string'},
    { name : 'pembayaran', type : 'string'},
    { name : 'sales_id', type : 'string'},
	{ name : 'ppn_so', type : 'bool'},
	{ name : 'ppn_exc', type : 'bool'},
	{ name : 'ppn_prs', type : 'bool'},
	{ name : 'n_bruto', type : 'float'},
	{ name : 'n_disc', type : 'float'},
	{ name : 'n_ppn', type : 'float'},
	{ name : 'n_netto', type : 'float'},
	{ name : 'keterangan', type : 'string'},
    { name : 'released', type: 'bool'},
    { name : 'released_date', type: 'date'},
        {name: 'timeedit',type: 'date'},
        {name: 'useredit',type: 'string'},
        {name: 'userinput',type: 'string'},
        { name : 'status', type: 'string'}
    ],
	proxy :
	{
		type : 'direct',
		api :
		{
			read : SalesOrder.getFilterSOData,
            create: SalesOrder.addSO,
            update: SalesOrder.updateSO,
            destroy: SalesOrder.deleteSO
		},
		reader :
		{
			root : 'salesorder',
			totalProperty : 'totals'
		}
	}

} );
