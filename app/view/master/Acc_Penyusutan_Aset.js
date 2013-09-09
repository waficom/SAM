
Ext.define('App.view.master.Acc_Penyusutan_Aset', {
    extend: 'App.ux.RenderPanel',
    id: 'panelAcc_Penyusutan_Aset',
    pageTitle: 'Acc_Penyusutan_Aset',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        Ext.define('Acc_Penyusutan_AsetModel', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'co_id',type: 'string'},
                { name: 'apa_id',type: 'string'},
                { name: 'description',type: 'string'},
                { name: 'account_master',type: 'string'},
                { name: 'acc_master_desc',type: 'string'},
                { name: 'account_debit',type: 'string'},
                { name: 'acc_debit_desc',type: 'string'},
                { name: 'account_credit',type: 'string'},
                { name: 'acc_credit_desc',type: 'string'},
                { name: 'userinput',type: 'string'},
                { name: 'useredit',type: 'string'},
                { name: 'timeinput',type: 'date'},
                { name: 'timeedit',type: 'date'}
            ]

        });
        me.Acc_Penyusutan_AsetStore = Ext.create('Ext.data.Store', {
            model: 'Acc_Penyusutan_AsetModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Acc_Penyusutan_Aset.getAcc_Penyusutan_Aset,
                    create: Acc_Penyusutan_Aset.addAcc_Penyusutan_Aset,
                    update: Acc_Penyusutan_Aset.updateAcc_Penyusutan_Aset,
                    destroy: Acc_Penyusutan_Aset.deleteAcc_Penyusutan_Aset
                }
            },
            autoLoad: false
        });

        // *************************************************************************************
        // Create the GridPanel
        // *************************************************************************************
        me.Acc_Penyusutan_AsetGrid = Ext.create('App.ux.GridPanel', {
            store: me.Acc_Penyusutan_AsetStore,
            columns: [
                {text: 'ID',sortable: true, dataIndex: 'apa_id' },
                {text: 'Description',sortable: true, flex:1, dataIndex: 'description' },
                {text: 'Acc. Master',sortable: true, dataIndex: 'account_master' },
                {text: 'Acc. Master Desc ',sortable: true, dataIndex: 'acc_master_desc' },
                {text: 'Acc. Debit',sortable: true, dataIndex: 'account_debit' },
                {text: 'Acc. Debi Desc ',sortable: true, dataIndex: 'acc_debit_desc' },
                {text: 'Acc. Credit',sortable: true, dataIndex: 'account_credit' },
                {text: 'Acc. Credit Desc ',sortable: true, dataIndex: 'acc_credit_desc' },
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    me.onItemdblclick(me.Acc_Penyusutan_AsetStore, record, 'Edit Acc_Penyusutan_Aset');
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
                                me.onNew(form, 'Acc_Penyusutan_AsetModel', 'Tambah Data');
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteAcc_Penyusutan_Aset(me.Acc_Penyusutan_AsetStore);
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
            width: 600,
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
                                    value: 'ID : '
                                },
                                {
                                    width: 100,
                                    name: 'apa_id',
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
                                    value: 'Acc. Master :'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCoaPopup',
                                    name: 'account_master',
                                    allowBlank: false
                                },
                                {
                                    width: 70,
                                    xtype: 'displayfield',
                                    value: 'Acc. Debit :'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCoaPopup',
                                    name: 'account_debit',
                                    allowBlank: false
                                },
                                {
                                    width: 70,
                                    xtype: 'displayfield',
                                    value: 'Acc. Credit :'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCoaPopup',
                                    name: 'account_credit',
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
                            me.onAcc_Penyusutan_AsetSave(form, me.Acc_Penyusutan_AsetStore);
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
        me.pageBody = [me.Acc_Penyusutan_AsetGrid];
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
    onAcc_Penyusutan_AsetSave: function(form, store){
        var me = this;
        me.saveAcc_Penyusutan_Aset(form, store);
    },
    saveAcc_Penyusutan_Aset: function(form, store){
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
    deleteAcc_Penyusutan_Aset: function(store){
        var me = this, grid = me.Acc_Penyusutan_AsetGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('apa_id');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Acc_Penyusutan_Aset.deleteAcc_Penyusutan_Aset(bid);
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
        this.Acc_Penyusutan_AsetStore.load();
        callback(true);
    }
});
//ens UserPage class