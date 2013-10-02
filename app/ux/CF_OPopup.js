Ext.define('App.ux.CF_OPopup',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtCF_OPopup',

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

            Ext.define('POSearchModel',
                {
                    extend : 'Ext.data.Model',
                    fields : [
                        {name: 'cf_code',type: 'string'},
                        {name: 'description',type: 'string'},
                        {name: 'cf_type',type: 'string'},
                        {name: 'category',type: 'string'},
                        {name: 'timeedit',type: 'string'}
                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read : Popup.CF_OPopup},
                        reader : {
                            totalProperty : 'totals',
                            root : 'rows'
                        }
                    }
                });

            me.store = Ext.create('Ext.data.Store',
                {
                    model : 'POSearchModel',
                    pageSize : 50,
                    autoLoad : false
                });


//            me.smGrid = Ext.create('Ext.selection.CheckboxModel');
            // create the Grid
            me.grid = Ext.create('Ext.grid.Panel', {
                store: me.store,
                columns: [
                    {header : 'CF Code',dataIndex : 'cf_code'},
                    {header : 'Description',dataIndex : 'description', flex:1},
                    {header : 'Type',dataIndex : 'cf_type'},
                    {header : 'Category',dataIndex : 'category'},
                    {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}

                ],
                height: 200,
//                selModel : me.smGrid,
                width: 600,
                title: 'CashFlow',
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
            cf_code = selected.data.cf_code;
            this.setValue(cf_code);
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
