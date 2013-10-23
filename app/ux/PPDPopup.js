Ext.define('App.ux.PPDPopup',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtPPDPopup',

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
                        { name: 'no_ppd', type: 'string'},
                        { name: 'est_finishdate', type: 'date'},
                        { name: 'so_num', type: 'string'},
                        { name: 'prod_id', type: 'string'},
                        { name: 'cust_nama', type: 'string'},
                        { name: 'prod_id', type: 'string'},
                        { name: 'formula_id', type: 'string'},
                        { name: 'timeedit', type: 'date'}

                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read : Popup.PPDPopup},
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
                    {text: 'No Ppd',sortable: false, dataIndex: 'no_ppd'},
                    {header : 'Est. Selesai',dataIndex : 'est_finishdate',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100},
                    {text: 'So Num', sortable: true, dataIndex: 'so_num'},
                    {text: 'Customer', sortable: true, dataIndex: 'cust_nama', flex:1},
                    {text: 'Produk', sortable: true, dataIndex: 'prod_id'},
                    {text: 'Formula', sortable: true, dataIndex: 'formula_id'},
                    {header : 'LastUpdate',dataIndex : 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100}
                ],
                height: 200,
                width: 600,
                title: 'Detail Produksi',
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
            no_ppd = selected.data.no_ppd;
            this.setValue(no_ppd);
        },
        ondblclick: function(grid, selected){
            var me = this;
            me.searchwin.close();
        },
        btnCancelPressed : function(btn) {
            var me = this;
            this.reset();
            me.searchwin.close();
        }
    }
)