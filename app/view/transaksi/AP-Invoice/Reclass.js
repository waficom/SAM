Ext.define('App.view.transaksi.AP-Invoice.Reclass', {
    extend: 'App.ux.RenderPanel',
    id: 'panelViewReclass',
    pageTitle: 'Reclass',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.currInv_Code = null;
        me.currCoa = null;
        me.currDebtor = null;
        me.currPosted = null;
        me.curr_coid = null;
        me.userinput =null;
        me.useredit=null;
        //me.myWinChooseItem=null;
        Ext.define('ReclassModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'for_inv_code',type: 'string'},
                {name: 'account',type: 'string'},
                {name: 'coa_nama',type: 'string'},
                {name: 'check',type: 'string'},
                {name: 'debit',type: 'float'},
                {name: 'credit',type: 'float'},
                {name: 'timeedit',type: 'date'}
            ]

        });
        me.ReclassStore = Ext.create('Ext.data.Store', {
            model: 'ReclassModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Reclass.getViewReclass,
                    create: Reclass.addViewReclass
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });

        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit']

        }

        /**
         * Lists Grid
         */
        me.ReclassGrid = Ext.create('App.ux.GridPanel', {
            store: me.ReclassStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {
                    xtype: 'checkcolumn',
                    dataIndex: 'check',
                    width: 60,
                    editor: {
                        xtype: 'checkbox'
                    }
                },
                {text: 'Account',sortable: true,dataIndex: 'account'},
                {text: 'Description',sortable: true,dataIndex: 'coa_nama'},
                {text: 'Doc. Number',sortable: true, dataIndex: 'for_inv_code'},
                {text: 'Debit',sortable: true,dataIndex: 'debit', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Credit',sortable: true,dataIndex: 'credit', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            features:[searching],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype : 'fieldcontainer',
                            items : [
                                {
                                    xtype : 'xtCoaPopup',
                                    id : 'account_rc',
                                    fieldLabel : 'Account',
                                    labelWidth : 70,
                                    width : 200
                                }]
                        },
                        {
                            xtype : 'button',
                            width : 80,
                            margin : '0 0 3 0',
                            text: 'Searching',
                            listeners :
                            {
                                scope : me,
                                click : me.SeachingItem
                            }
                        },
                        {
                            xtype: 'button',
                            width : 80,
                            margin : '0 0 3 0',
                            text: 'Posting',
                            listeners :
                            {
                                scope : me,
                                click : me.PostingItem
                            }
                        },'->',
                        {
                            xtype:'displayfield',
                            itemId:'itemuserinput',
                            margin : '0 5 0 0'
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.ReclassStore,
                    beforePageText: 'Page',
                    afterPageText: 'of {0}',
                    displayMsg: 'Diplay {0} - {1} Of {2}',
                    emptyMsg: 'No Record Found',
                    dock: 'bottom',
                    displayInfo: true,
                    pageSize: 5

                }
            ]
        });
        me.win = Ext.create('App.ux.window.Window', {
            width: 600,
            items: [
                {
                    xtype: 'mitos.form',
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 100
                    },
                    defaultType: 'textfield',
                    items: [
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'for_inv_code'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'account'
                        },{
                            xtype: 'textfield',
                            hidden: true,
                            name: 'debit'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'credit'
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: 'Save',
                    cls: 'winSave',
                    handler: function(){
                        if(form.isValid()){
                            me.PostingItem(me.ReclassStore);
                        }
                    }
                }
            ]
        });
        // *************************************************************************************
        // Window User Form
        // *************************************************************************************
        me.pageBody = [me.ReclassGrid];
        me.callParent(arguments);
    },
    PostingItem: function(btn){
        var me = this;
        var getAccount = Ext.getCmp('account_rc').getValue();
        var form = me.win.down('form').getForm();
        me.ReclassStore.each(function(record){
                if (record.get('check')){
                    console.log(record.get('for_inv_code'));
                    form.findField('account').setValue(record.get('account'));
                    form.findField('for_inv_code').setValue(record.get('for_inv_code'));
                    form.findField('debit').setValue(record.get('debit'));
                    form.findField('credit').setValue(record.get('credit'));
                    var values = form.getValues();
                    me.ReclassStore.add(values);
                    me.ReclassStore.sync();
                }
        });
        me.ReclassStore.load({params:{Account : getAccount}});


    },
    SeachingItem: function(btn){
        var getAccount = Ext.getCmp('account_rc').getValue();
        this.ReclassStore.load({params:{Account : getAccount}});
    },

    onActive: function(callback){
        var me = this;
        this.SeachingItem();

        callback(true);
    }
});
