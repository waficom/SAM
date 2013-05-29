Ext.define('App.ux.SearchBoxBS',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.srchbox',
        trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',
        trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger',
        hasSearch : false,
        paramName : 'query',

        initComponent : function()
        {
            var me = this;

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
                    pageSize : 10,
                    autoLoad : false
                });
            smGrid = Ext.create('Ext.selection.CheckboxModel');
            // create the Grid
            grid = Ext.create('Ext.grid.Panel', {
                store: me.store,
                columns: [
                    { header: 'Nomor',width: 100, sortable: true, dataIndex: 'nomor'},
                    { header: 'Tanggal',width: 100, sortable: false, dataIndex: 'tanggal'},
                    { header: 'Kegiatan',width: 100,sortable: true,dataIndex: 'kegiatan'},
                    { header: 'Staff',width: 150,sortable: true,dataIndex: 'staff_nama'},
                    { header: 'Pelanggan',width: 200,sortable: true,dataIndex: 'customer'}
                ],
                height: 350,
                selModel : smGrid,
                width: 600,
                title: 'BS',
                viewConfig: {stripeRows: true},
                bbar: new Ext.PagingToolbar({
                    pageSize    : 20,
                    store      : storeGrid,
                    displayInfo: true,
                    displayMsg : 'Data yang ada {0} - {1} Dari {2}',
                    emptyMsg   : "Tidak ada data"
                })
            });

            MenuGrid = new Ext.menu.Menu();
            MenuGrid.add(grid);

            me.callParent(arguments);
            me.on('specialkey', function(f, e){
                if(e.getKey() == e.ENTER){
                    me.onTrigger2Click();
                }
            }, me);
        },
        afterRender: function(){
            this.callParent();
            this.triggerEl.item(0).setDisplayed('none');
        },
        onTrigger1Click : Ext.form.field.Trigger.prototype.onTriggerClick,
        onTrigger2Click : function(){
            helpGrid.showAt([this.getPosition()[0],this.getPosition()[1]+this.getHeight()]);
        }
    }
)