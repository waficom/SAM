Ext.define('App.ux.CashbonOutPopup',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtCashbonOutPopup',

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
                        {name: 'co_id',type: 'string'},
                        {name: 'inv_code',type: 'string'},
                        {name: 'inv_date',type: 'date'},
                        {name: 'bank_code',type: 'string'},
                        {name: 'bank_nama',type: 'string'},
                        {name: 'received_from',type: 'string'},
                        {name: 'nominal',type: 'float'},
                        {name: 'posted_date',type: 'date'}

                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read :Popup.getCashbonOutPopup},
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
                    {width: 150,text: 'Doc Number',sortable: true,dataIndex: 'inv_code'},
                    {width: 100,text: 'Entry Date',sortable: true,dataIndex: 'inv_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                    {width: 100,text: 'Bank Code',sortable: true,dataIndex: 'bank_code'},
                    {width: 200,text: 'Bank',sortable: true,dataIndex: 'bank_nama'},
                    {width: 100,text: 'From Bank',sortable: true,dataIndex: 'received_from'},
                    {width: 150,text: 'Nominal',sortable: true,dataIndex: 'nominal', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                    {text: 'Posting Date', width : 80, sortable: true, dataIndex: 'posted_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                    {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}

                ],
                height: 200,
//                selModel : me.smGrid,
                width: 600,
                title: 'Cashbon Out',
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
            if(Ext.ComponentQuery.query('#kode_bank_cb')[0]){
                Ext.ComponentQuery.query('#kode_bank_cb')[0].setValue(selected.data.bank_code);
            }
            if(Ext.ComponentQuery.query('#bank_kasbon')[0]){
                Ext.ComponentQuery.query('#bank_kasbon')[0].setValue(selected.data.bank_nama);
            }
            if(Ext.ComponentQuery.query('#nominal_kasbon')[0]){
                Ext.ComponentQuery.query('#nominal_kasbon')[0].setValue(selected.data.nominal);
            }
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