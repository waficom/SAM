Ext.define('App.ux.CustomerPopup',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtCustomerPopup',

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

            Ext.define('CustomerSearchModel',
                {
                    extend : 'Ext.data.Model',
                    fields : [
                        {
                            name: 'cust_id',
                            type: 'string'
                        },
                        {
                            name: 'cust_nama',
                            type: 'string'
                        },
                        {
                            name: 'contact',
                            type: 'string'
                        },
                        {
                            name: 'npwp',
                            type: 'string'
                        },
                        {
                            name: 'alamat',
                            type: 'string'
                        },
                        {
                            name: 'kota',
                            type: 'string'
                        }
                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read : Customer.getcustomer},
                        reader : {
                            totalProperty : 'totals',
                            root : 'rows'
                        }
                    }
                });

            me.store = Ext.create('Ext.data.Store',
                {
                    model : 'CustomerSearchModel',
                    pageSize : 50,
                    autoLoad : false
                });


//            me.smGrid = Ext.create('Ext.selection.CheckboxModel');
            // create the Grid
            me.grid = Ext.create('Ext.grid.Panel', {
                store: me.store,
                columns: [
                    {
                        width: 50,
                        text: 'ID',
                        sortable: true,
                        dataIndex: 'cust_id'
                    },
                    {
                        flex: 1,
                        text: 'Customer',
                        sortable: true,
                        dataIndex: 'cust_nama'
                    },
                    {
                        flex: 1,
                        text: 'Alamat',
                        sortable: true,
                        dataIndex: 'alamat'
                    },
                    {
                        width : 100,
                        text: 'Contact',
                        sortable: true,
                        dataIndex: 'contact',
                        hidden : true
                    },
                    {
                        width : 100,
                        text: 'NPWP',
                        sortable: true,
                        dataIndex: 'npwp',
                        hidden : true
                    },
                    {
                        width : 100,
                        text: 'Kota',
                        sortable: true,
                        dataIndex: 'kota'
                    }
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
            cust_id = selected.data.cust_id;
            this.setValue(cust_id);
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