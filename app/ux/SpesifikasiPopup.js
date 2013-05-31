Ext.define('App.ux.SpesifikasiPopup',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtSpesifikasiPopup',

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

            Ext.define('SpesifikasiSearchModel',
                {
                    extend : 'Ext.data.Model',
                    fields : [
                        {
                            name: 'spesifikasi_id',
                            type: 'string'
                        },
                        {
                            name: 'spesifikasi_nama',
                            type: 'string'
                        },
                        {
                            name: 'n',
                            type: 'float'
                        },
                        {
                            name: 'p2o5',
                            type: 'float'
                        },
                        {
                            name: 'k2o',
                            type: 'float'
                        },
                        {
                            name: 'cao',
                            type: 'float'
                        },
                        {
                            name: 'mgo',
                            type: 'float'
                        },
                        {
                            name: 'so4',
                            type: 'float'
                        },
                        {
                            name: 'b',
                            type: 'float'
                        },
                        {
                            name: 'cu',
                            type: 'float'
                        },
                        {
                            name: 'zn',
                            type: 'float'
                        },
                        {
                            name: 'ah',
                            type: 'float'
                        },
                        {
                            name: 'af',
                            type: 'float'
                        },
                        {
                            name: 'te',
                            type: 'float'
                        },
                        {
                            name: 'keterangan',
                            type: 'string'
                        }

                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read : Spesifikasi.getspesifikasi},
                        reader : {
                            totalProperty : 'totals',
                            root : 'rows'
                        }
                    }
                });

            me.store = Ext.create('Ext.data.Store',
                {
                    model : 'SpesifikasiSearchModel',
                    pageSize : 50,
                    autoLoad : false
                });


//            me.smGrid = Ext.create('Ext.selection.CheckboxModel');
            // create the Grid
            me.grid = Ext.create('Ext.grid.Panel', {
                store: me.store,
                columns: [
                    {
                        width: 70,
                        text: 'ID',
                        sortable: true,
                        dataIndex: 'spesifikasi_id'
                    },
                    {
                        flex: 1,
                        text: 'Spesifikasi',
                        sortable: true,
                        dataIndex: 'spesifikasi_nama'
                    },
                    {
                        width: 50,
                        text: 'N',
                        dataIndex: 'n'
                    },
                    {
                        width: 50,
                        text: 'P2O5',
                        dataIndex: 'p2o5'
                    },
                    {
                        width: 50,
                        text: 'K2O',
                        dataIndex: 'k2o'
                    },
                    {
                        width: 50,
                        text: 'CaO',
                        dataIndex: 'cao'
                    },
                    {
                        width: 50,
                        text: 'MgO',
                        dataIndex: 'mgo'
                    },
                    {
                        width: 50,
                        text: 'SO4',
                        dataIndex: 'so4'
                    },
                    {
                        width: 50,
                        text: 'B',
                        dataIndex: 'b'
                    },
                    {
                        width: 50,
                        text: 'Cu',
                        dataIndex: 'cu'
                    },
                    {
                        width: 50,
                        text: 'Zn',
                        dataIndex: 'zn'
                    },
                    {
                        width: 50,
                        text: 'AH',
                        dataIndex: 'ah'
                    },
                    {
                        width: 50,
                        text: 'AF',
                        dataIndex: 'af'
                    },
                    {
                        width: 50,
                        text: 'TE',
                        dataIndex: 'te'
                    },
                    {
                        flex: 1,
                        text: 'Keterangan',
                        sortable: true,
                        dataIndex: 'keterangan'
                    }
                ],
                height: 200,
//                selModel : me.smGrid,
                width: 600,
                title: 'Spesifikasi',
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
            spesifikasi_id = selected.data.spesifikasi_id;
            this.setValue(spesifikasi_id);
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