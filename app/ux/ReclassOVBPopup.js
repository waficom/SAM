Ext.define('App.ux.ReclassOVBPopup',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtReclassOVBPopup',

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
                        {name: 'inv_code',type: 'string'},
                        {name: 'do_num',type: 'string'},
                        {name: 'so_num',type: 'string'},
                        {name: 'qty_do',type: 'float'},
                        {name: 'qty_ar',type: 'float'}
                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read :Popup.getReclassOVBpopup},
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
                    {text: 'Doc. AR',sortable: true,dataIndex: 'inv_code'},
                    {text: 'DO Num',sortable: true,dataIndex: 'do_num'},
                    {text: 'SO Num',sortable: true,dataIndex: 'so_num'},
                    {text: 'Qty DO',sortable: true,dataIndex: 'qty_do'},
                    {text: 'Qty AR',sortable: true,dataIndex: 'qty_ar'}

                ],
                height: 200,
                width: 600,
                title: 'Reclass OVB',
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
            me.searchwin.showAt([me.getPosition()[0],me.getPosition()[1]+me.getHeight()]);
            me.store.load();
            me.doComponentLayout();
        },
        onGridClick: function(grid, selected){
            inv_code = selected.data.inv_code;
            this.setValue(inv_code);
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