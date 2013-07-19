Ext.define('App.ux.BahanBakuPopup',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtBahanBakuPopup',

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

            Ext.define('BahanBakuSearchModel',
                {
                    extend : 'Ext.data.Model',
                    fields : [
                        {
                            name: 'bb_id',
                            type: 'string'
                        },
                        {
                            name: 'bb_nama',
                            type: 'string'
                        },
                        {
                            name: 'sat_id',
                            type: 'string'
                        },
                        {
                            name: 'keterangan',
                            type: 'string'
                        }

                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read : BahanBaku.getbb},
                        reader : {
                            totalProperty : 'totals',
                            root : 'rows'
                        }
                    }
                });

            me.store = Ext.create('Ext.data.Store',
                {
                    model : 'BahanBakuSearchModel',
                    pageSize : 50,
                    autoLoad : false
                });

            me.grid = Ext.create('Ext.grid.Panel', {
                store: me.store,
                columns: [
                    {
                        width: 200,
                        text: 'ID',
                        sortable: true,
                        dataIndex: 'bb_id'
                    },
                    {
                        flex: 1,
                        text: 'Bahan Baku',
                        sortable: true,
                        dataIndex: 'bb_nama'
                    },
                    {
                        width: 200,
                        text: 'Sat',
                        sortable: true,
                        dataIndex: 'sat_id'
                    },
                    {
                        flex: 1,
                        text: 'Keterangan',
                        sortable: true,
                        dataIndex: 'keterangan'
                    }
                ],
                height: 200,
                width: 600,
                title: 'Sales Order',
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
            bb_id = selected.data.bb_id;
            this.setValue(bb_id);
        },
        ondblclick: function(grid, selected){
            var me = this;
            me.onGridClick(grid, selected);
            Ext.getCmp('sat_id_po').setValue(selected.data.sat_id);
            Ext.getCmp('sat_id').setValue(selected.data.sat_id);
            Ext.getCmp('sat_id_gr').setValue(selected.data.sat_id);
            Ext.getCmp('bb_nama').setValue(selected.data.bb_nama);
            Ext.getCmp('bb_nama_gr').setValue(selected.data.bb_nama);
            me.searchwin.close();
        },
        btnCancelPressed : function(btn) {
            var me = this;
            this.reset();
            me.searchwin.close();
        }
    }
)