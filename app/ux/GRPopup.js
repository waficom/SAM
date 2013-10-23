Ext.define('App.ux.GRPopup',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtGRPopup',

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

            Ext.define('GRSearchModel',
                {
                    extend : 'Ext.data.Model',
                    fields : [
                        { name: 'gr_num',type: 'string' },
                        {name: 'tgl', type: 'date'},
                        { name: 'po_num', type: 'string'},
                        { name: 'vend_id',type: 'string' },
                        {name: 'po_num',type: 'string' },
                        { name : 'vend_id_trans', type : 'string'},
                        { name : 'gudang_id', type : 'string'},
                        { name : 'rc_type', type : 'string'},
                        { name : 'account', type : 'string'}
                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read : Popup.getGRPopup},
                        reader : {
                            totalProperty : 'totals',
                            root : 'rows'
                        }
                    }
                });

            me.store = Ext.create('Ext.data.Store',
                {
                    model : 'GRSearchModel',
                    pageSize : 50,
                    autoLoad : false
                });


//            me.smGrid = Ext.create('Ext.selection.CheckboxModel');
            // create the Grid
            me.grid = Ext.create('Ext.grid.Panel', {
                store: me.store,
                columns: [
                    {width: 200,text: 'GR Number',sortable: true, dataIndex: 'gr_num'},
                    {width: 100, text: 'tanggal',sortable: true, dataIndex: 'tgl'},
                    {width: 200,text: 'PO Number',sortable: true,dataIndex: 'po_num'},
                    {width: 200,text: 'Suplier',sortable: true,dataIndex: 'vend_id'},
                    {width: 200,text: 'Transporter',sortable: true,dataIndex: 'vend_id_trans'},
                    {width: 200,text: 'Gudang',sortable: true,dataIndex: 'gudang_id'},
                    {width: 200,text: 'Account',sortable: true,dataIndex: 'account', hidden: true},
                    {width: 200,text: 'RC Type',sortable: true,dataIndex: 'rc_type', hidden:true}
                ],
                height: 200,
//                selModel : me.smGrid,
                width: 600,
                title: 'Good Received',
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
            grn_return = selected.data.gr_num;
            this.setValue(grn_return);
        },
        ondblclick: function(grid, selected){
            var me = this;
            me.onGridClick(grid, selected);
            Ext.ComponentQuery.query('#vend_id')[0].setValue(selected.data.vend_id);
            Ext.ComponentQuery.query('#gudang_id_ap')[0].setValue(selected.data.gudang_id);
           // Ext.getCmp('gudang_id_ap').setValue(selected.data.gudang_id);
            me.searchwin.close();
        },
        btnCancelPressed : function(btn) {
            var me = this;
            this.reset();
            me.searchwin.close();
        }
    }
)