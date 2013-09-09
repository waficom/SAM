Ext.define('App.ux.CoaPopup',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtCoaPopup',

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
                        {
                            name: 'coa_id',
                            type: 'string'
                        },
                        {
                            name: 'coa_nama',
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
                        api : {read :Popup.getCoaPopup},
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


//            me.smGrid = Ext.create('Ext.selection.CheckboxModel');
            // create the Grid
            me.grid = Ext.create('Ext.grid.Panel', {
                store: me.store,
                columns: [
                    {
                        width: 200,
                        text: 'Account',
                        sortable: true,
                        dataIndex: 'coa_id'
                    },
                    {
                        width: 300,
                        text: 'Description',
                        sortable: true,
                        dataIndex: 'coa_nama'
                    },
                    {
                        width: 300,
                        text: 'Remaks',
                        sortable: true,
                        dataIndex: 'keterangan'
                    }
                ],
                height: 200,
//                selModel : me.smGrid,
                width: 600,
                title: 'Tax',
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
            coa_id = selected.data.coa_id;
            this.setValue(coa_id);
        },
        ondblclick: function(grid, selected){
            var me = this;
            me.onGridClick(grid, selected);
            //Ext.getCmp('account_nama').setValue(selected.data.coa_nama);
            Ext.getCmp('account_nama_ar').setValue(selected.data.coa_nama);
            //Ext.getCmp('account_nama_gr').setValue(selected.data.coa_nama);
            Ext.getCmp('account_nama_ap').setValue(selected.data.coa_nama);
            Ext.getCmp('account_cashbon').setValue(selected.data.coa_nama);
            me.searchwin.close();
        },
        btnCancelPressed : function(btn) {
            var me = this;
            this.reset();
            me.searchwin.close();
        }
    }
)