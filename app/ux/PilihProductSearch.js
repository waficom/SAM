Ext.define('App.ux.PilihProductSearch',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtlistproduct',

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

            Ext.define('prodSearchModel',
                {
                    extend : 'Ext.data.Model',
                    fields : [
                        { name: 'prod_id', type: 'string'},
                        { name: 'prod_nama', type: 'string'},
                        { name: 'jenis_id', type: 'string'},
                        { name: 'jenis_nama', type: 'string'},
                        { name: 'kemasan_id', type: 'string'},
                        { name: 'kemasan_nama', type: 'string'},
                        { name: 'kemasan_qty', type: 'float'},
                        { name: 'satuan_id', type: 'string'},
                        { name: 'satuan_nama', type: 'string'},
                        { name: 'spesifikasi_id', type: 'string'},
                        { name: 'spesifikasi_nama', type: 'string'},
                        { name: 'bentuk_id', type: 'string'},
                        { name: 'bentuk_nama', type: 'string'}
                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read : Items.ProductListSearch},
                        reader : {
                            totalProperty : 'totals',
                            root : 'rows'
                        }
                    }
                });

            me.store = Ext.create('Ext.data.Store',
                {
                    model : 'prodSearchModel',
                    autoLoad : false
                });


//            me.smGrid = Ext.create('Ext.selection.CheckboxModel');
            // create the Grid
            me.grid = Ext.create('Ext.grid.Panel', {
                store: me.store,
                columns: [
                    {text: 'ID', width:70, sortable: false, dataIndex: 'prod_id'},
                    {text: 'Nama Product', flex: 1, sortable: true, dataIndex: 'prod_nama'},
                    {text: 'Jenis ID', flex: 1, sortable: true, dataIndex: 'jenis_id', hidden : true},
                    {text: 'Jenis', flex: 1, sortable: true, dataIndex: 'jenis_nama'},
                    {text: 'Kemasan ID', flex: 1, sortable: true, dataIndex: 'kemasan_id', hidden : true},
                    {text: 'Kemasan', flex: 1, sortable: true, dataIndex: 'kemasan_nama'},
                    {text: 'spesifikasi_id', dataIndex: 'spesifikasi_id', hidden : true },
                    {text: 'Spesifikasi', flex : 1, dataIndex: 'spesifikasi_nama', sortable : true },
                    {text: 'Sat ID', flex: 1, sortable: true, dataIndex: 'satuan_id'},
                    {text: 'Bentuk ID', flex: 1, sortable: true, dataIndex: 'bentuk_id', hidden : true},
                    {text: 'Bentuk', flex: 1, sortable: true, dataIndex: 'bentuk_nama'}
                ],
                height: 200,
//                selModel : me.smGrid,
                width: 600,
                title: 'Barang Jadi',
                features : [searching],
                viewConfig: {stripeRows: true},
                bbar: new Ext.PagingToolbar({
                    pageSize    : 50,
                    store      : me.store,
                    displayInfo: false,
//                    displayMsg : 'Data yang ada {0} - {1} Dari {2}',
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
//                        handler: me.btnSavePressed
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
            me.searchwin.showAt([me.getPosition()[0],me.getPosition()[1]+me.getHeight()]);
            me.store.load();
            me.doComponentLayout();
        },
        onGridClick: function(grid, selected){
            prod_id = selected.data.prod_id;
            this.setValue(prod_id);
            if(Ext.ComponentQuery.query('#sat_ap')[0]){
                Ext.ComponentQuery.query('#sat_ap')[0].setValue(selected.data.satuan_id);
            }
            if( Ext.ComponentQuery.query('#sat_id_so')[0]){
                Ext.ComponentQuery.query('#sat_id_so')[0].setValue(selected.data.satuan_id);
            }
            if( Ext.ComponentQuery.query('#prod_id_bj_adl')[0]){
                Ext.ComponentQuery.query('#prod_id_bj_adl')[0].setValue(selected.data.prod_nama);
            }
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