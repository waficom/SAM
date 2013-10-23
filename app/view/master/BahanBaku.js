
Ext.define('App.view.master.BahanBaku', {
    extend: 'App.ux.RenderPanel',
    id: 'panelBahanBaku',
    pageTitle: 'Nama Barang / Bahan',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        var searching = {
            ftype: 'searching',
            mode: 'local',
            width: 200
        };
        Ext.define('BahanBakuModel', {
            extend: 'Ext.data.Model',
            fields: [
                {
                    name: 'co_id',
                    type: 'string'
                },
                {
                    name: 'bb_id',
                    type: 'string'
                },
                {
                    name: 'bb_nama',
                    type: 'string'
                },
                {
                    name: 'sat_id',
                    type: 'string'
                },
                {
                    name: 'keterangan',
                    type: 'string'
                },
                {
                    name: 'kategoristock',
                    type: 'string'
                },
                {
                    name: 'account',
                    type: 'string'
                },
                {
                    name: 'old_bb_id',
                    type: 'string'
                },
                {
                    name: 'aktif',
                    type: 'bool'
                }
            ]

        });
        me.BahanBakuStore = Ext.create('Ext.data.Store', {
                model: 'BahanBakuModel',
                proxy: {
                    type: 'direct',
                    api: {
                        read: BahanBaku.getbb,
                        create: BahanBaku.addbb,
                        update: BahanBaku.updatebb,
                        destroy : BahanBaku.deletebb
                    },
                    reader : {
                        totalProperty : 'totals',
                        root : 'rows'
                    }
                },
                pageSize : 10,
                autoLoad: false
            });
        function authCk(val){
            if(val == '1'){
                return '<img src="resources/images/icons/yes.gif" />';
            }else if(val == '0'){
                return '<img src="resources/images/icons/no.gif" />';
            }
            return val;
        }

        // *************************************************************************************
        // Create the GridPanel
        // *************************************************************************************
        me.BahanBakuGrid = Ext.create('App.ux.GridPanel', {
            store: me.BahanBakuStore,
            columns: [
                {text: 'Company',sortable: true, dataIndex: 'co_id',hidden: true
                },
                {text: 'ID Barang',sortable: true,dataIndex: 'bb_id'
                },
                {flex: 1,text: 'Nama Barang/Bahan',sortable: true,dataIndex: 'bb_nama'
                },
                {text: 'Satuan',sortable: true,dataIndex: 'sat_id'
                },
                {text: 'Keterangan',sortable: true,dataIndex: 'keterangan'
                },
                {text: 'Akun',sortable: true,dataIndex: 'account'
                },
                {text: 'Aktif',sortable: true,dataIndex: 'aktif',renderer: authCk }
            ],
            bbar: new Ext.PagingToolbar({
                //pageSize    : 10,
                store      : me.BahanBakuStore,
                displayInfo: false,
//                    displayMsg : 'Data yang ada {0} - {1} Dari {2}',
                emptyMsg   : "Tidak ada data"
            }),
            features: [searching],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    oldName = record.get('bb_id');
                    record.set("old_bb_id",oldName);
                    me.onItemdblclick(me.BahanBakuStore, record, 'Edit Bahan Baku');
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
                                me.onNew(form, 'BahanBakuModel', 'Tambah Data');
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deletebb(me.BahanBakuStore)
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
            width: 450,
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
                                    value: 'Id Brg'
                                },
                                {
                                    width: 100,
                                    xtype: 'mitos.UpperCaseTextField',
                                    name: 'bb_id',
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
                                    value: 'Nama Brg / Bhn'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'bb_nama'
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
                                    value: 'Satuan'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtSatuanPopup',
                                    name: 'sat_id'
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
                                }, {
                                    width: 100,
                                    xtype: "radiogroup",
                                    fieldLabel: "Stok ",
                                    defaults: {xtype: "radio", name:'kategoristock'
                                    },
                                    items: [
                                        {
                                            boxLabel: "Y",
                                            inputValue:'Y',
                                            handler: function(field, value) {
                                                if (value) {
                                                    Ext.getCmp('account_bb').setDisabled(true);
                                                }
                                            }

                                        },
                                        {
                                            boxLabel: "N",
                                            inputValue:'N',
                                            checked: true,
                                            handler: function(field, value) {
                                                if (value) {
                                                    Ext.getCmp('account_bb').setDisabled(false);
                                                }
                                            }

                                        }
                                    ]
                                }                             ]
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
                                    value: 'Akun'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCoaPopup',
                                    name: 'account',
                                    id:'account_bb'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Keterangan : '
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'keterangan'
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
                            me.onbbSave(form, me.BahanBakuStore);
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
        me.pageBody = [me.BahanBakuGrid];
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
    onbbSave: function(form, store){
        var me = this;
			me.savebb(form, store);
    },
    savebb: function(form, store){
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
                me.msg('Opps!', 'Error!!', true);
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
    deletebb: function(store){
        var me = this, grid = me.BahanBakuGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('bb_id');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    BahanBaku.deletebb(bid);
                    store.remove(sm.getSelection());
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        });
//        store.load();
    },
    onActive: function(callback){
        this.BahanBakuStore.load();
        callback(true);
    }
});
//ens UserPage class