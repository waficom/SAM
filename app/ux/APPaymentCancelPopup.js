Ext.define('App.ux.APPaymentCancelPopup',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtAPPaymentCancelPopup',

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

            Ext.define('JenisSearchModel',
                {
                    extend : 'Ext.data.Model',
                    fields : [
                        {name: 'ap_inv_payment',type: 'string'},
                        {name: 'inv_date',type: 'date'},
                        {name: 'saldo_akhir',type: 'string'},
                        {name: 'vend_id',type: 'string'},
                        {name: 'vend_nama',type: 'string'},
                        {name: 'timeedit',type: 'date'},
                        {name: 'posted_date',type: 'date'}

                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read : Popup.getAPPaymentCancel},
                        reader : {
                            totalProperty : 'totals',
                            root : 'rows'
                        }
                    }
                });

            me.store = Ext.create('Ext.data.Store',
                {
                    model : 'JenisSearchModel',
                    pageSize : 50,
                    autoLoad : false
                });


//            me.smGrid = Ext.create('Ext.selection.CheckboxModel');
            // create the Grid
            me.grid = Ext.create('Ext.grid.Panel', {
                store: me.store,
                columns: [
                    {width: 150,text: 'Doc. Number',sortable: true,dataIndex: 'ap_inv_payment'},
                    {width: 100,text: 'Entry Date',sortable: true,dataIndex: 'inv_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                    {width: 100,text: 'Saldo Akhir',sortable: true,dataIndex: 'saldo_akhir', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                    {width: 150,text: 'Vendor',sortable: true,dataIndex: 'vend_id', hidden: true},
                    {width: 150,text: 'Vendor',sortable: true,dataIndex: 'vend_nama'},
                    {width: 100,text: 'Posting Date',sortable: true,dataIndex: 'posted_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                    {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
                ],
                height: 200,
//                selModel : me.smGrid,
                width: 600,
                title: 'AP Payment',
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
            var me = this, inv_type= null;
            me.searchwin.showAt([me.getPosition()[0],me.getPosition()[1]+me.getHeight()]);
            if(Ext.ComponentQuery.query('#cancel_tmp')[0]){
                inv_type = Ext.ComponentQuery.query('#cancel_tmp')[0].getValue();
            }
            me.store.load({params:{inv_type: inv_type}});
            me.doComponentLayout();
        },
        onGridClick: function(grid, selected){
            ap_inv_payment = selected.data.ap_inv_payment;
            this.setValue(ap_inv_payment);
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