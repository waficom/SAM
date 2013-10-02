Ext.define('App.ux.ARPopup',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.xtARPopup',

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
                        {name: 'inv_code',type: 'string'},
                        {name: 'inv_date',type: 'date'},
                        {name: 'so_num',type: 'string'},
                        {name: 'piutangdebtor',type: 'string'},
                        {name: 'timeedit',type: 'date'},
                        {name: 'account_type',type: 'string'},
                        {name: 'account',type: 'string'},
                        {name: 'cust_id',type: 'string'},
                        {name: 'posted_date',type: 'date'}
                    ],
                    proxy :
                    {
                        type : 'direct',
                        api : {read :Popup.getAR_Salepopup},
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
                    {width: 100,text: 'Doc. Number',sortable: true,dataIndex: 'inv_code'},
                    {width: 100,text: 'Entry Date',sortable: true,dataIndex: 'inv_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                    {width: 100,text: 'SO Number',sortable: true,dataIndex: 'so_num'},
                    {width: 100,text: 'Account_type',sortable: true,dataIndex: 'account_type', hidden:true},
                    {width: 100,text: 'Account',sortable: true,dataIndex: 'account', hidden:true},
                    {width: 100,text: 'Customer',sortable: true,dataIndex: 'cust_id', hidden:true},
                    {width: 100,text: 'Piutang',sortable: true,dataIndex: 'piutangdebtor', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                    {width: 100,text: 'Posted Date',sortable: true,dataIndex: 'posted_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                    {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}

                ],
                height: 200,
//                selModel : me.smGrid,
                width: 600,
                title: 'AR Sale',
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
        },
        ondblclick: function(grid, selected){
            var me = this;
            me.onGridClick(grid, selected);
            //Ext.getCmp('account_type').setValue(selected.data.account_type);
            Ext.getCmp('account_ar').setValue(selected.data.account);
            Ext.getCmp('cust_id_pay').setValue(selected.data.cust_id);
            Ext.getCmp('cust_id_al').setValue(selected.data.cust_id);
            //Ext.getCmp('cust_id_ar').setValue(selected.data.cust_id);
            Ext.getCmp('piutang').setValue(selected.data.piutangdebtor);
            Ext.getCmp('piutangdebtor_pay').setValue(selected.data.piutangdebtor);
            Ext.getCmp('posted_date_ar').setValue(selected.data.posted_date);

            me.searchwin.close();
        },
        btnCancelPressed : function(btn) {
            var me = this;
            this.reset();
            me.searchwin.close();
        }
    }
)