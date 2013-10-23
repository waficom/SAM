
Ext.define('App.view.master.Account', {
    extend: 'App.ux.RenderPanel',
    id: 'panelAccount',
    pageTitle: 'Account',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        Ext.define('AccountModel', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'co_id',type: 'string'},
                { name: 'coa_id',type: 'string'},
                { name: 'coa_nama',type: 'string'},
                { name: 'coa_level',type: 'string'},
                { name: 'coa_parent',type: 'string'},
                { name: 'keterangan',type: 'string'},
                { name: 'aktif',type: 'bool'},
                { name: 'status',type: 'string'},
                { name: 'dk',type: 'string'},
                { name: 'userinput',type: 'string'},
                { name: 'useredit',type: 'string'},
                { name: 'timeinput',type: 'date'},
                { name: 'timeedit',type: 'date'}
            ]

        });
        me.AccountStore = Ext.create('Ext.data.Store', {
            model: 'AccountModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Account.getAccount,
                    create: Account.addAccount,
                    update: Account.updateAccount,
                    destroy: Account.deleteAccount
                }
            },
            autoLoad: false
        });

        // *************************************************************************************
        // Create the GridPanel
        // *************************************************************************************
        me.AccountGrid = Ext.create('App.ux.GridPanel', {
            store: me.AccountStore,
            columns: [
                {text: 'Coa ID',sortable: true, dataIndex: 'coa_id' },
                {text: 'Description',sortable: true, flex:1, dataIndex: 'coa_nama' },
                {text: 'Ketengan',sortable: true, dataIndex: 'keterangan' },
                {text: 'Coa Level',sortable: true, dataIndex: 'coa_level' },
                {text: 'Coa Parent',sortable: true, dataIndex: 'coa_parent' },
                {text: 'Status',sortable: true, dataIndex: 'status' },
                {text: 'Aktif', width:55, sortable: false, dataIndex: 'aktif', renderer: me.boolRenderer },
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    me.onItemdblclick(me.AccountStore, record, 'Edit Account');
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
                                me.onNew(form, 'AccountModel', 'Tambah Data');
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteAccount(me.AccountStore);
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
                                    value: 'Coa ID : '
                                },
                                {
                                    width: 100,
                                    name: 'coa_id',
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
                                    name: 'coa_nama'
                                }
                            ]
                        }, {
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Coa Parent :'
                                },
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    name: 'coa_parent',
                                    allowBlank: false
                                },{
                                    width: 80,
                                    xtype: 'displayfield',
                                    value: 'Coa Level :'
                                },
                                {
                                    width: 40,
                                    xtype: 'numberfield',
                                    name: 'coa_level',
                                    value:1,
                                    allowBlank: false
                                }
                            ]
                        }, {
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Remarks :'
                                },
                                {
                                    width: 250,
                                    xtype: 'textfield',
                                    name: 'keterangan',
                                    allowBlank: false
                                }
                            ]
                        },{
                            xtype: "radiogroup",
                            fieldLabel: "Status ",
                            defaults: {xtype: "radio", name:'status'
                            },
                            items: [
                                {
                                    boxLabel: "Y",
                                    inputValue:'Y',
                                    checked: true
                                },
                                {
                                    boxLabel: "N",
                                    inputValue:'N'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 150,
                                    xtype: 'mitos.checkbox',
                                    fieldLabel: 'Aktif',
                                    name: 'aktif'
                                }]
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
                            me.onAccountSave(form, me.AccountStore);
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
        me.pageBody = [me.AccountGrid];
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
    onAccountSave: function(form, store){
        var me = this;
        me.saveAccount(form, store);
    },
    saveAccount: function(form, store){
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
    deleteAccount: function(store){
        var me = this, grid = me.AccountGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('coa_id');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Account.deleteAccount(bid);
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
        this.AccountStore.load();
        callback(true);
    }
});
//ens UserPage class