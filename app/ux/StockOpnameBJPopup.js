Ext.define('App.ux.StockOpnameBJPopup',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtStockOpnameBJPopup',

        trigger1Cls: Ext.baseCSSPrefix + 'form-search-trigger',

        paramName : 'query',
        hasSearch : false,

        initComponent : function()
        {
            var me = this, searching = {
                    ftype: 'searching',
                    mode: 'local',
                    width: 200
                },
                prod_id = null;

            Ext.define('StockOpnameBBModel',
                {
                    extend : 'Ext.data.Model',
                    fields : [
                        {name: 'co_id',type: 'string'},
                        {name: 'prod_id',type: 'string'},
                        {name: 'prod_nama',type: 'string'},
                        {name: 'gudang_id',type: 'string'},
                        {name: 'sat_id',type: 'string'},
                        {name: 'qty_akhir',type: 'string'},
                        {name: 'harga_akhir',type: 'string'},
                        {name: 'total_akhir',type: 'string'}

                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read : Popup.getStockOpnameBJ},
                        reader : {
                            totalProperty : 'totals',
                            root : 'rows'
                        }
                    }
                });

            me.store = Ext.create('Ext.data.Store',
                {
                    model : 'StockOpnameBBModel',
                    pageSize : 50,
                    autoLoad : false
                });

            me.grid = Ext.create('Ext.grid.Panel', {
                store: me.store,
                columns: [
                    {text: 'Kode',sortable: true,dataIndex: 'prod_id'},
                    {text: 'Produk',sortable: true,dataIndex: 'prod_nama', flex:1},
                    {text: 'Gudang',sortable: true,dataIndex: 'gudang_id'},
                    {text: 'Satuan',sortable: true,dataIndex: 'sat_id'},
                    {text: 'Qty Stock',sortable: true,dataIndex: 'qty_akhir'},
                    {text: 'Harga Rata2',sortable: true,dataIndex: 'harga_akhir'},
                    {text: 'Total',sortable: true,dataIndex: 'total_akhir'}
                ],
                height: 200,
                width: 600,
                title: 'Stock Opname Barang Jadi',
                features : [searching],
                viewConfig: {stripeRows: true},
                bbar: new Ext.PagingToolbar({
                    pageSize    : 50,
                    store      : me.store,
                    displayInfo: false,
                    emptyMsg   : "Tidak ada data"
                }),
                listeners: {
                    scope: me,
                    select: me.onGridClick,
                    itemdblclick: me.ondblclick
                }
            });

            me.searchwin = Ext.create('App.ux.window.Window', {
                border : false,
                items: [ me.grid ],
                buttons: [
                    {
                        text: 'Pilih',
                        cls: 'winSave',
                        handler : function(btn){
                            btn.up('window').close();
                        }
                    },
                    '-',
                    {
                        text: i18n('cancel'),
                        scope: me,
                        handler: me.btnCancelPressed
                    }
                ]
            });

            me.callParent(arguments);
            me.on('specialkey', function(f, e){
                if(e.getKey() == e.ENTER){
                    me.onTrigger1Click();
                }
            }, me);
        },

        onTrigger1Click : function(){
            var me = this;
            var periode= 0, gudang_id=null;
            me.searchwin.showAt([me.getPosition()[0],me.getPosition()[1]+me.getHeight()]);
            if( Ext.ComponentQuery.query('#periode_stock_bj')[0]){
                periode =  Ext.ComponentQuery.query('#periode_stock_bj')[0].getValue();
            }
            if(Ext.ComponentQuery.query('#gudang_stock_bj')[0]){
                gudang_id = Ext.ComponentQuery.query('#gudang_stock_bj')[0].getValue();
            }
            me.store.load({params:{periode: periode, gudang_id:gudang_id}});
            me.doComponentLayout();
        },
        onGridClick: function(grid, selected){
            prod_id = selected.data.prod_id;
            this.setValue(prod_id);
                Ext.ComponentQuery.query('#qty_akhir_bj')[0].setValue(selected.data.qty_akhir);
                Ext.ComponentQuery.query('#harga_akhir_bj')[0].setValue(selected.data.harga_akhir);
                Ext.ComponentQuery.query('#total_akhir_bj')[0].setValue(selected.data.total_akhir);
                Ext.ComponentQuery.query('#sat_id_stock_bj')[0].setValue(selected.data.sat_id);

        },
        ondblclick: function(grid, selected){
            var me = this;
            me.onGridClick(grid, selected);
            me.searchwin.close();
        },
        btnCancelPressed : function(btn) {
            var me = this;
            this.reset();
            me.searchwin.close();
        }
    }
)