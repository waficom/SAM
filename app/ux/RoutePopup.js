Ext.define('App.ux.RoutePopup',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtRoutePopup',

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

            Ext.define('WilayahSearchModel',
                {
                    extend : 'Ext.data.Model',
                    fields : [
                        {name: 'route_code',type: 'string'},
                        {name: 'description',type: 'string'},
                        {name: 'remaks',type: 'string'},
                        {name: 'timeedit',type: 'date'}
                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read : Popup.getRoutePopup},
                        reader : {
                            totalProperty : 'totals',
                            root : 'rows'
                        }
                    }
                });

            me.store = Ext.create('Ext.data.Store',
                {
                    model : 'WilayahSearchModel',
                    pageSize : 50,
                    autoLoad : false
                });


//            me.smGrid = Ext.create('Ext.selection.CheckboxModel');
            // create the Grid
            me.grid = Ext.create('Ext.grid.Panel', {
                store: me.store,
                columns: [
                    {text: 'Route Code', width:70, sortable: false,dataIndex: 'route_code'},
                    {text: 'Description', flex: 1, sortable: true, dataIndex: 'description'},
                    {text: 'Remarks', width : 150, dataIndex: 'remaks', sortable : true },
                    {text: 'LastUpdate', width : 100, sortable: true, dataIndex: 'timeedit'}
                ],
                height: 200,
//                selModel : me.smGrid,
                width: 600,
                title: 'Route',
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
            route_code = selected.data.route_code;
            this.setValue(route_code);
        },
        ondblclick: function(grid, selected){
            var me = this;
            me.onGridClick(grid, selected);
            Ext.getCmp('route_nama_do').setValue(selected.data.description);
            me.searchwin.close();
        },
        btnCancelPressed : function(btn) {
            var me = this;
            this.reset();
            me.searchwin.close();
        }
    }
)