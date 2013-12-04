Ext.define('App.ux.SODeliveryPopup',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtSODeliveryPopup',

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

            Ext.define('SalesOrderSearchModel',
                {
                    extend : 'Ext.data.Model',
                    fields : [
                        { name: 'so_num', type: 'string'},
                        { name: 'tanggal', type: 'date'},
                        { name: 'cust_nama', type: 'string'},
                        { name: 'cust_id', type: 'string'},
                        { name: 'prod_id', type: 'string'}

                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read : Popup.getSODeliveryPopup},
                        reader : {
                            totalProperty : 'totals',
                            root : 'rows'
                        }
                    }
                });

            me.store = Ext.create('Ext.data.Store',
                {
                    model : 'SalesOrderSearchModel',
                    pageSize : 50,
                    autoLoad : false
                });


//            me.smGrid = Ext.create('Ext.selection.CheckboxModel');
            // create the Grid
            me.grid = Ext.create('Ext.grid.Panel', {
                store: me.store,
                columns: [
                    {text: 'So Num', width:70, sortable: false, dataIndex: 'so_num'},
                    {text: 'Tanggal', flex: 1, sortable: true, dataIndex: 'tanggal'},
                    {text: 'Cust ID', flex: 1, sortable: true, dataIndex: 'cust_id'},
                    {text: 'Customer', flex: 1, sortable: true, dataIndex: 'cust_nama'},
                    {text: 'Produk', flex: 1, sortable: true, dataIndex: 'prod_id'}
                ],
                height: 200,
//                selModel : me.smGrid,
                width: 600,
                title: 'Sales Order',
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
            so_num = selected.data.so_num;
            this.setValue(so_num);
            if(Ext.ComponentQuery.query('#prod_id_do')[0]){
                Ext.ComponentQuery.query('#prod_id_do')[0].setValue(selected.data.prod_id);
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