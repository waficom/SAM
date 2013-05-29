Ext.define('App.ux.SearchAdd',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.srchadd',

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
            nomor = null;

            Ext.define('bsSearchModel',
                {
                    extend : 'Ext.data.Model',
                    fields : [
                        { name : 'nomor'},
                        { name : 'tanggal'},
                        { name : 'kegiatan'},
                        { name : 'staff_nama'},
                        { name : 'customer'}
                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read : BahanBaku.getbsLiveSearch},
                        reader : {
                            totalProperty : 'totals',
                            root : 'rows'
                        }
                    }
                });

            me.store = Ext.create('Ext.data.Store',
                {
                    model : 'bsSearchModel',
                    pageSize : 50,
                    autoLoad : false
                });


//            me.smGrid = Ext.create('Ext.selection.CheckboxModel');
            // create the Grid
            me.grid = Ext.create('Ext.grid.Panel', {
                store: me.store,
                columns: [
                    { header: 'Nomor',width: 100, sortable: true, dataIndex: 'nomor'},
                    { header: 'Tanggal',width: 100, sortable: false, dataIndex: 'tanggal'},
                    { header: 'Kegiatan',width: 100,sortable: true,dataIndex: 'kegiatan'},
                    { header: 'Staff',width: 150,sortable: true,dataIndex: 'staff_nama'},
                    { header: 'Pelanggan',width: 200,sortable: true,dataIndex: 'customer'}
                ],
                height: 200,
//                selModel : me.smGrid,
                width: 600,
                title: 'BS',
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

            me.win = Ext.create('App.ux.window.Window', {
                border : false,
                items: [ me.grid ],
                buttons: [
                    {
                        text: 'Pilih',
                        cls: 'winSave',
                        handler: me.btnSavePressed
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
            me.win.showAt([me.getPosition()[0],me.getPosition()[1]+me.getHeight()]);
            me.store.load();
            me.doComponentLayout();
        },
        onGridClick: function(grid, selected){
            nomor = selected.data.nomor;
            this.setValue(nomor);
        },
        ondblclick: function(grid, selected){
            var me = this;
            me.onGridClick(grid, selected);
            me.win.close();
        },
        btnCancelPressed : function(btn) {
            var me = this;
            this.reset();
            me.win.close();
        },
        btnSavePressed : function(btn) {
            var me = this;
            me.win.close();
        }
    }
)