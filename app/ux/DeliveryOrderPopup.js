Ext.define('App.ux.DOPopup',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtDOPopup',

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

            Ext.define('DOSearchModel',
                {
                    extend : 'Ext.data.Model',
                    fields : [
                        {name: 'do_num',type: 'string'},
                        {name: 'so_num',type: 'string'},
                        {name: 'route',type: 'string'},
                        {name: 'deliverydate',type: 'date'},
                        {name: 'cust_nama',type: 'string'},
                        {name: 'qty',type: 'string'}
                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read : DeliveryOrder.getDeliveryOrder},
                        reader : {
                            totalProperty : 'totals',
                            root : 'rows'
                        }
                    }
                });

            me.store = Ext.create('Ext.data.Store',
                {
                    model : 'DOSearchModel',
                    pageSize : 50,
                    autoLoad : false
                });


//            me.smGrid = Ext.create('Ext.selection.CheckboxModel');
            // create the Grid
            me.grid = Ext.create('Ext.grid.Panel', {
                store: me.store,
                columns: [
                    {text: 'Do_num', sortable: false, dataIndex: 'do_num'},
                    {text: 'So_num', sortable: false, dataIndex: 'so_num'},
                    {text: 'Route', width:100, sortable: false,flex: 1, dataIndex: 'route'},
                    {text: 'Delivery Date', width : 80, sortable: true, dataIndex: 'deliverydate', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                    {text: 'Customer', width:200, sortable: false,flex: 1,dataIndex: 'cust_nama'},
                    {text: 'Qty', width:200, sortable: false,dataIndex: 'qty'}
                ],
                height: 200,
//                selModel : me.smGrid,
                width: 600,
                title: 'Delviery Order',
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
            do_num = selected.data.do_num;
            this.setValue(do_num);
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