Ext.define('App.ux.AP_RptPopup',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtAP_RptPopup',

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
                        {name: 'inv_date',type: 'date'},
                        {name: 'gr_num',type: 'string'},
                        {name: 'po_num',type: 'string'},
                        {name: 'hutangsuplier',type: 'string'},
                        {name: 'timeedit',type: 'date'},
                        {name: 'vend_id',type: 'string'},
                        {name: 'posted_date',type: 'date'},
                        {name: 'vend_nama',type: 'string'}
                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read :Popup.getAP_Rptpopup},
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


            me.grid = Ext.create('Ext.grid.Panel', {
                store: me.store,
                columns: [
                    {text: 'Inv. Number',sortable: true,dataIndex: 'inv_code'},
                    {width: 100,text: 'Entry Date',sortable: true,dataIndex: 'inv_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                    {text: 'GR Number',sortable: true,dataIndex: 'gr_num'},
                    {text: 'PO Number',sortable: true,dataIndex: 'po_num'},
                    {text: 'Vendor',sortable: true,dataIndex: 'vend_id', hidden:true},
                    {text: 'Vendor',sortable: true,dataIndex: 'vend_nama', flex:1},
                    {text: 'Hutang Suplier',sortable: true,dataIndex: 'hutangsuplier', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                    {width: 100,text: 'Posting Date',sortable: true,dataIndex: 'posted_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                    {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}

                ],
                height: 200,
//                selModel : me.smGrid,
                width: 600,
                title: 'AP Invoice',
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
            inv_code = selected.data.inv_code;
            this.setValue(inv_code);
        },
        ondblclick: function(grid, selected){
            var me = this;
            me.onGridClick(grid, selected);
           // Ext.ComponentQuery.query('#vend_id_ap')[0].setValue(selected.data.vend_id);

            me.searchwin.close();
        },
        btnCancelPressed : function(btn) {
            var me = this;
            this.reset();
            me.searchwin.close();
        }
    }
)