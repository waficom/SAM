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
                        {name: 'prod_id',type: 'string'},
                        {name: 'darigudang',type: 'string'},
                        {name: 'route',type: 'string'},
                        {name: 'deliverydate',type: 'date'},
                        {name: 'vessel_id',type: 'string'},
                        {name: 'kategory_kirim',type: 'string'},
                        {name: 'cust_id',type: 'string'}
                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read : Popup.getDeliveryOrderpopup},
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
                    {text: 'Produk', sortable: false, dataIndex: 'prod_id'},
                    {text: 'Gudang', sortable: false, dataIndex: 'darigudang'},
                    {text: 'Kategory_kirim', sortable: false, dataIndex: 'kategory_kirim'},
                    {text: 'cust_id', sortable: false, dataIndex: 'cust_id', hidden:true},
                    {text: 'Route', width:100, sortable: false,flex: 1, dataIndex: 'route'},
                    {text: 'Kapal', width:100, sortable: false,flex: 1, dataIndex: 'vessel_id', hidden:true},
                    {text: 'Delivery Date', width : 80, sortable: true, dataIndex: 'deliverydate', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
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
            Ext.getCmp('do_num_ar').setValue(selected.data.do_num);
            Ext.ComponentQuery.query('#so_num')[0].setValue(selected.data.so_num);
            Ext.ComponentQuery.query('#prod_id_do')[0].setValue(selected.data.prod_id);
            Ext.ComponentQuery.query('#gudang_do')[0].setValue(selected.data.darigudang);
            Ext.ComponentQuery.query('#route_code')[0].setValue(selected.data.route);
            Ext.ComponentQuery.query('#vessel_id')[0].setValue(selected.data.vessel_id);
            if(selected.data.cust_id==''){
                Ext.ComponentQuery.query('#kategory_c')[0].setValue(selected.data.kategory_kirim);
            }else{
                Ext.ComponentQuery.query('#kategory_o')[0].setValue(selected.data.kategory_kirim);
            }
            Ext.ComponentQuery.query('#cust_id_do')[0].setValue(selected.data.cust_id);

            me.searchwin.close();
        },
        btnCancelPressed : function(btn) {
            var me = this;
            this.reset();
            me.searchwin.close();
        }
    }
)