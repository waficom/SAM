Ext.define('App.ux.POPopup',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtPOPopup',

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
                        {name: 'po_num',type: 'string'},
                        {name: 'vend_nama',type: 'string'},
                        {name: 'vend_id',type: 'string'},
                        {name: 'gudang_id',type: 'string'},
                        {name: 'tgl',type: 'date'}
                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read : Popup.POPopup},
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
                    {
                        header : 'Purchase Order #',
                        dataIndex : 'po_num',
                        width : 200
                    },
                    {
                        header : 'Tanggal',
                        dataIndex : 'tgl',
                        renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                        width : 100
                    },
                    {
                        header : 'Supplier ID',
                        dataIndex : 'vend_id',
                        width : 200
                    },
                    {
                        header : 'Supplier',
                        dataIndex : 'vend_nama',
                        flex:1
                    },
                    {
                        header : 'Kode Gudang',
                        dataIndex : 'gudang_id',
                        width : 200
                    }
                ],
                height: 200,
                width: 600,
                title: 'Purchase Order',
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
            po_num = selected.data.po_num;
            this.setValue(po_num);
            if(Ext.ComponentQuery.query('#vend_id_grndal')[0]){
                Ext.ComponentQuery.query('#vend_id_grndal')[0].setValue(selected.data.vend_id);
            }
            if(Ext.ComponentQuery.query('#gdg_id_grndal')[0]){
                Ext.ComponentQuery.query('#gdg_id_grndal')[0].setValue(selected.data.gudang_id);
            }
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
