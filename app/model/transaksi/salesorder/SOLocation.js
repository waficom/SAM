
Ext.define( 'App.model.transaksi.salesorder.SOLocation',
    {
        extend : 'Ext.data.Model',
        fields : [
            { name : 'co_id', type : 'string'},
            { name : 'so_num', type : 'string'},
            { name : 'prod_id', type : 'string'},
            { name : 'urut', type : 'int'},
            { name : 'lokasi_nama', type : 'string'},
            { name : 'lokasi_kec', type : 'string'},
            { name : 'lokasi_kab', type : 'string'},
            { name : 'qty', type : 'float'},
            { name : 'sat_id', type : 'string'},
            { name : 'sat_nama', type : 'string'},
            { name : 'keterangan', type : 'string'},
            { name : 'old_urut', type : 'int'}
        ],
        proxy :
        {
            type : 'direct',
            api :
            {
                read : SalesOrder.getSOLocation,
                create: SalesOrder.addSOLocation,
                update: SalesOrder.updateSOLocation,
                destroy: SalesOrder.deleteSOLocation
            },
            reader :
            {
                root : 'solocation',
                totalProperty : 'totals'
            }
        }

    } );
