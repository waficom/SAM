
Ext.define('App.view.master.Penyusutan_Aset', {
    extend: 'App.ux.RenderPanel',
    id: 'panelPenyusutan_Aset',
    pageTitle: 'Penyusutan_Aset',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        Ext.define('Penyusutan_AsetModel', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'co_id',type: 'string'},
                { name: 'pa_id',type: 'string'},
                { name: 'description',type: 'string'},
                { name: 'jml_tahun',type: 'float'},
                { name: 'jml_bulan',type: 'float'},
                { name: 'userinput',type: 'string'},
                { name: 'useredit',type: 'string'},
                { name: 'timeinput',type: 'date'},
                { name: 'timeedit',type: 'date'}
            ]

        });
        me.Penyusutan_AsetStore = Ext.create('Ext.data.Store', {
            model: 'Penyusutan_AsetModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Penyusutan_Aset.getPenyusutan_Aset,
                    create: Penyusutan_Aset.addPenyusutan_Aset,
                    update: Penyusutan_Aset.updatePenyusutan_Aset,
                    destroy: Penyusutan_Aset.deletePenyusutan_Aset
                }
            },
            autoLoad: false
        });

        // *************************************************************************************
        // Create the GridPanel
        // *************************************************************************************
        me.Penyusutan_AsetGrid = Ext.create('App.ux.GridPanel', {
            store: me.Penyusutan_AsetStore,
            columns: [
                {text: 'ID',sortable: true, dataIndex: 'pa_id' },
                {text: 'Description',sortable: true, flex:1, dataIndex: 'description' },
                {text: 'Jml Tahun',sortable: true, dataIndex: 'jml_tahun' },
                {text: 'Jml Bulan',sortable: true, dataIndex: 'jml_bulan' },
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    me.onItemdblclick(me.Penyusutan_AsetStore, record, 'Edit Penyusutan_Aset');
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
                                me.onNew(form, 'Penyusutan_AsetModel', 'Tambah Data');
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deletePenyusutan_Aset(me.Penyusutan_AsetStore);
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
                                    value: 'ID : '
                                },
                                {
                                    width: 100,
                                    name: 'pa_id',
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
                                    value: 'Jml Tahun :'
                                },
                                {
                                    width: 100,
                                    xtype: 'mitos.currency',
                                    hideTrigger: true,
                                    name: 'jml_tahun',
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
                            me.onPenyusutan_AsetSave(form, me.Penyusutan_AsetStore);
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
        me.pageBody = [me.Penyusutan_AsetGrid];
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
    onPenyusutan_AsetSave: function(form, store){
        var me = this;
        me.savePenyusutan_Aset(form, store);
    },
    savePenyusutan_Aset: function(form, store){
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
    deletePenyusutan_Aset: function(store){
        var me = this, grid = me.Penyusutan_AsetGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('pa_id');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Penyusutan_Aset.deletePenyusutan_Aset(bid);
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
        this.Penyusutan_AsetStore.load();
        callback(true);
    }
});
//ens UserPage class