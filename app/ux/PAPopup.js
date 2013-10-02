Ext.define('App.ux.PAPopup',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtPAPopup',

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
                        { name: 'pa_id',type: 'string'},
                        { name: 'description',type: 'string'},
                        { name: 'jml_tahun',type: 'float'},
                        { name: 'jml_bulan',type: 'float'},
                        { name: 'timeedit',type: 'date'}
                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read : Penyusutan_Aset.getPenyusutan_Aset},
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
                    {text: 'ID',sortable: true, dataIndex: 'pa_id' },
                    {text: 'Description',sortable: true, flex:1, dataIndex: 'description' },
                    {text: 'Jml Tahun',sortable: true, dataIndex: 'jml_tahun' },
                    {text: 'Jml Bulan',sortable: true, dataIndex: 'jml_bulan' },
                    {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
                ],
                height: 200,
//                selModel : me.smGrid,
                width: 600,
                title: 'Umur Aset',
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
            pa_id = selected.data.pa_id;
            this.setValue(pa_id);
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
