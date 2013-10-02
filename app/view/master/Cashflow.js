
Ext.define('App.view.master.Cashflow', {
    extend: 'App.ux.RenderPanel',
    id: 'panelCashflow',
    pageTitle: 'Cashflow',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        Ext.define('CashflowModel', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'co_id',type: 'string'},
                { name: 'cf_code',type: 'string'},
                { name: 'description',type: 'string'},
                { name: 'category',type: 'string'},
                { name: 'cf_type',type: 'string'},
                { name: 'userinput',type: 'string'},
                { name: 'useredit',type: 'string'},
                { name: 'timeinput',type: 'date'},
                { name: 'timeedit',type: 'date'}
            ]

        });
        me.CashflowStore = Ext.create('Ext.data.Store', {
            model: 'CashflowModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Cashflow.getCashflow,
                    create: Cashflow.addCashflow,
                    update: Cashflow.updateCashflow,
                    destroy: Cashflow.deleteCashflow
                }
            },
            autoLoad: false
        });

        // *************************************************************************************
        // Create the GridPanel
        // *************************************************************************************
        me.CashflowGrid = Ext.create('App.ux.GridPanel', {
            store: me.CashflowStore,
            columns: [
                {text: 'Code',sortable: true, dataIndex: 'cf_code' },
                {text: 'Description',sortable: true, flex:1, dataIndex: 'description' },
                {text: 'Category',sortable: true, dataIndex: 'category' },
                {text: 'Type',sortable: true, dataIndex: 'cf_type' },
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    me.onItemdblclick(me.CashflowStore, record, 'Edit Cashflow');
                }
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Tambah Data',
                            iconCls: 'save',
                            handler: function(){
                                var form = me.win.down('form');
                                me.onNew(form, 'CashflowModel', 'Tambah Data');
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteCashflow(me.CashflowStore);
                            }
                        }
                    ]
                }
            ]
        });
        // *************************************************************************************
        // Window User Form
        // *************************************************************************************
        me.win = Ext.create('App.ux.window.Window', {
            width: 500,
            items: [
                {
                    xtype: 'mitos.form',
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 100
                    },
                    defaultType: 'textfield',
                    //hideLabels      : true,
                    defaults: {
                        labelWidth: 89,
                        anchor: '100%',
                        layout: {
                            type: 'hbox',
                            defaultMargins: {
                                top: 0,
                                right: 5,
                                bottom: 0,
                                left: 0
                            }
                        }
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Code : '
                                },
                                {
                                    width: 100,
                                    name: 'cf_code',
                                    xtype: 'mitos.UpperCaseTextField',
                                    allowBlank: false,
                                    stripCharsRe: /(^\s+|\s+$)/g
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Description :'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'description'
                                }
                            ]
                        }, {
                            xtype: "radiogroup",
                            fieldLabel: "Type ",
                            defaults: {xtype: "radio",name: "cf_type"},
                            items: [
                                {
                                    boxLabel: "In",
                                    inputValue: "I",
                                    checked: true
                                },
                                {
                                    boxLabel: "Out",
                                    inputValue: "O"
                                }
                            ]
                        },{
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Category :'
                                },
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    name: 'category',
                                    allowBlank: false
                                }
                            ]
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: i18n('save'),
                    cls: 'winSave',
                    handler: function(){
                        var form = me.win.down('form').getForm();
                        if(form.isValid()){
                            me.onCashflowSave(form, me.CashflowStore);
                        }
                    }
                },
                '-',
                {
                    text: i18n('cancel'),
                    scope: me,
                    handler: function(btn){
                        btn.up('window').close();
                    }
                }
            ],
            listeners: {
                scope: me,
                close: function(){
                    me.action('close');
                }
            }
        });
        // END WINDOW
        me.pageBody = [me.CashflowGrid];
        me.callParent(arguments);
    }, // end of initComponent

    onNew: function(form, model, title){
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({
        }, model);
        form.getForm().loadRecord(newModel);
        this.action('new');
        this.win.show();
    },
    onCashflowSave: function(form, store){
        var me = this;
        me.saveCashflow(form, store);
    },
    saveCashflow: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record);
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                me.win.close();
            },
            failure:function(){
                Ext.MessageBox.alert('Opps', 'Error..!!');
            }
        });
        store.load();
    },
    onItemdblclick: function(store, record, title){
        var form = this.win.down('form');
        this.setForm(form, title);
        form.getForm().loadRecord(record);
        this.action('old');
        this.win.show();
    },
    setForm: function(form, title){
        form.up('window').setTitle(title);
    },
    openWin: function(){
        this.win.show();
    },
    action: function(action){
        var win = this.win, form = win.down('form');
        if(action == 'close'){
            form.getForm().reset();
        }
    },
    deleteCashflow: function(store){
        var me = this, grid = me.CashflowGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('cf_code');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Cashflow.deleteCashflow(bid);
                    store.remove(sr);
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        });
//        store.load();
    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.CashflowStore.load();
        callback(true);
    }
});
//ens UserPage class