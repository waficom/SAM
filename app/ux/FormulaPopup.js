Ext.define('App.ux.FormulaPopup',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtFormulaPopup',

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

            Ext.define('FormulaSearchModel',
                {
                    extend : 'Ext.data.Model',
                    fields : [
                        {name: 'formula_id',type: 'string'},
                        {name: 'formula_nama',type: 'string'},
                        {name: 'cust_nama',type: 'string'},
                        {name: 'spesifikasi_id',type: 'string'},
                        {name: 'spesifikasi_nama',type: 'string'}

                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read : Popup.FormulaPopup},
                        reader : {
                            totalProperty : 'totals',
                            root : 'rows'
                        }
                    }
                });

            me.store = Ext.create('Ext.data.Store',
                {
                    model : 'FormulaSearchModel',
                    pageSize : 50,
                    autoLoad : false
                });


//            me.smGrid = Ext.create('Ext.selection.CheckboxModel');
            // create the Grid
            me.grid = Ext.create('Ext.grid.Panel', {
                store: me.store,
                columns: [
                    {text: 'Formula', width:70, sortable: false,dataIndex: 'formula_id'},
                    {text: 'Nama Formula', flex: 1, sortable: true, dataIndex: 'formula_nama'},
                    {text: 'Customer', width : 150, dataIndex: 'cust_nama', sortable : true },
                    {text: 'spesifikasi_id', dataIndex: 'spesifikasi_id', hidden : true },
                    {text: 'Spesifikasi', width : 150, dataIndex: 'spesifikasi_nama', sortable : true }
                ],
                height: 200,
//                selModel : me.smGrid,
                width: 600,
                title: 'Formula',
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
            var cust_id = Ext.ComponentQuery.query('#cust_id_pp')[0].getValue();
            me.store.load({params:{cust_id: cust_id}});
            me.doComponentLayout();
        },
        onGridClick: function(grid, selected){
            formula_id = selected.data.formula_id;
            this.setValue(formula_id);
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