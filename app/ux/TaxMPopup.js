Ext.define('App.ux.TaxMPopup',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtTaxMPopup',

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

            Ext.define('TaxSearchModel',
                {
                    extend : 'Ext.data.Model',
                    fields : [
                        {
                            name: 'tax_code',
                            type: 'string'
                        },
                        {
                            name: 'description',
                            type: 'string'
                        },
                        {
                            name: 'rate_ppn',
                            type: 'string'
                        },
                        {
                            name: 'coa_ppn',
                            type: 'string'
                        },
                        {
                            name: 'rate_pph',
                            type: 'string'
                        },
                        {
                            name: 'coa_pph',
                            type: 'string'
                        }
                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read :Popup.getTaxMPopup},
                        reader : {
                            totalProperty : 'totals',
                            root : 'rows'
                        }
                    }
                });

            me.store = Ext.create('Ext.data.Store',
                {
                    model : 'TaxSearchModel',
                    pageSize : 50,
                    autoLoad : false
                });


//            me.smGrid = Ext.create('Ext.selection.CheckboxModel');
            // create the Grid
            me.grid = Ext.create('Ext.grid.Panel', {
                store: me.store,
                columns: [
                    {
                        width: 200,
                        text: 'Tax Code',
                        sortable: true,
                        dataIndex: 'tax_code'
                    },
                    {
                        width: 300,
                        text: 'Description',
                        sortable: true,
                        dataIndex: 'description'
                    },
                    {
                        width: 100,
                        text: 'Rate Ppn',
                        sortable: true,
                        dataIndex: 'rate_ppn'
                    },
                    {
                        width: 200,
                        text: 'Coa Ppn',
                        sortable: true,
                        dataIndex: 'coa_ppn'
                    },
                    {
                        width: 100,
                        text: 'Rate Pph',
                        sortable: true,
                        dataIndex: 'rate_pph'
                    },
                    {
                        width: 200,
                        text: 'Coa Pph',
                        sortable: true,
                        dataIndex: 'coa_pph'
                    }
                ],
                height: 200,
//                selModel : me.smGrid,
                width: 600,
                title: 'Tax',
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
            tax_code = selected.data.tax_code;
            this.setValue(tax_code);
            if(Ext.ComponentQuery.query('#tax_nama')[0]){
                Ext.ComponentQuery.query('#tax_nama')[0].setValue(selected.data.description);
            }
            Ext.getCmp('tax_code').setValue(selected.data.description);


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