Ext.define('App.ux.BankPopup',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtBankPopup',

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

            Ext.define('BankSearchModel',
                {
                    extend : 'Ext.data.Model',
                    fields : [
                        {
                            name: 'bank_code',
                            type: 'string'
                        },
                        {
                            name: 'description',
                            type: 'string'
                        },
                        {
                            name: 'person',
                            type: 'string'
                        },
                        {
                            name: 'address',
                            type: 'string'
                        },
                        {
                            name: 'coa',
                            type: 'string'
                        },
                        {
                            name: 'coa_cashbon',
                            type: 'string'
                        },
                        {
                            name: 'remaks',
                            type: 'string'
                        }

                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read : Bank.getBank},
                        reader : {
                            totalProperty : 'totals',
                            root : 'rows'
                        }
                    }
                });

            me.store = Ext.create('Ext.data.Store',
                {
                    model : 'BankSearchModel',
                    pageSize : 50,
                    autoLoad : false
                });


//            me.smGrid = Ext.create('Ext.selection.CheckboxModel');
            // create the Grid
            me.grid = Ext.create('Ext.grid.Panel', {
                store: me.store,
                columns: [
                    {
                        width: 100,
                        text: 'Bank Code',
                        sortable: true,
                        dataIndex: 'bank_code'
                    },
                    {
                        width: 300,
                        text: 'Description',
                        sortable: true,
                        dataIndex: 'description'
                    },
                    {
                        width: 100,
                        text: 'Person',
                        sortable: true,
                        dataIndex: 'person'
                    },
                    {
                        width: 200,
                        text: 'Address',
                        sortable: true,
                        dataIndex: 'address'
                    },
                    {
                        width: 100,
                        text: 'coa',
                        sortable: true,
                        dataIndex: 'coa'
                    },
                    {
                        width: 200,
                        text: 'Coa cash bon',
                        sortable: true,
                        dataIndex: 'coa_cashbon'
                    },
                    {
                        width: 300,
                        text: 'Remaks',
                        sortable: true,
                        dataIndex: 'remaks'
                    }
                ],
                height: 200,
//                selModel : me.smGrid,
                width: 600,
                title: 'Bank',
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
            bank_code = selected.data.bank_code;
            this.setValue(bank_code);
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