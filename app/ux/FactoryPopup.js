Ext.define('App.ux.FactoryPopup',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtFactoryPopup',

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

            Ext.define('FactorySearchModel',
                {
                    extend : 'Ext.data.Model',
                    fields : [
                        {name: 'pabrik_sequence',type: 'string'},
                        {name: 'description',type: 'string'},
                        {name: 'location',type: 'string'},
                        {name: 'remarks',type: 'string'},
                        {name: 'userinput',type: 'string'},
                        {name: 'useredit',type: 'string'},
                        {name: 'timeinput',type: 'date'},
                        {name: 'timeedit',type: 'date'}

                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read : Factory_location.getFactorylocation},
                        reader : {
                            totalProperty : 'totals',
                            root : 'rows'
                        }
                    }
                });

            me.store = Ext.create('Ext.data.Store',
                {
                    model : 'FactorySearchModel',
                    pageSize : 50,
                    autoLoad : false
                });


//            me.smGrid = Ext.create('Ext.selection.CheckboxModel');
            // create the Grid
            me.grid = Ext.create('Ext.grid.Panel', {
                store: me.store,
                columns: [
                    {text: 'pabrik_sequence',width: 100,sortable: true,dataIndex: 'pabrik_sequence'},
                    {text: 'Description',width: 100,sortable: true,flex:1, dataIndex: 'description'},
                    {text: 'Location',width: 100,sortable: true,flex:1,dataIndex: 'location'},
                    {text: 'Remarks',width: 100,sortable: true,flex:1,dataIndex: 'remarks'},
                    {text: 'LastUpdate', width : 80, sortable: false, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}

                ],
                height: 200,
//                selModel : me.smGrid,
                width: 600,
                title: 'Factory',
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
            pabrik_sequence = selected.data.pabrik_sequence;
            this.setValue(pabrik_sequence);
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