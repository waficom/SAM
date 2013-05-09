/*
 GaiaEHR (Electronic Health Records)
 Users.js
 Copyright (C) 2012 Ernesto Rodriguez

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
Ext.define('App.view.master.Bentuk', {
    extend: 'App.ux.RenderPanel',
    id: 'panelBentuk',
    pageTitle: i18n('bentuk'),
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        Ext.define('BentukModel', {
            extend: 'Ext.data.Model',
            fields: [
                {
                    name: 'co_id',
                    type: 'string'
                },
                {
                    name: 'bentuk_id',
                    type: 'string'
                },
                {
                    name: 'bentuk_nama',
                    type: 'string'
                },
                {
                    name: 'keterangan',
                    type: 'string'
                },
                {
                    name: 'aktif',
                    type: 'bool'
                },
                {
                    name: 'old_bentuk_id',
                    type: 'string'
                }
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: Bentuk.getBentuk,
                    create: Bentuk.addBentuk,
                    update: Bentuk.updateBentuk,
                    destroy: Bentuk.deleteBentuk
                }
            }
        });
        me.BentukStore = Ext.create('Ext.data.Store', {
            model: 'BentukModel',
            remoteSort: true
        });
        function authCk(val){
            if(val == '1'){
                return '<img src="resources/images/icons/yes.gif" />';
            }else if(val == '0'){
                return '<img src="resources/images/icons/no.gif" />';
            }
            return val;
        }
        var searching = {
            ftype: 'searching',
            mode: 'local',
            width: 200
        };

        // *************************************************************************************
        // Create the GridPanel
        // *************************************************************************************
        me.BentukGrid = Ext.create('Ext.grid.Panel', {
            store: me.BentukStore,
            columns: [
                {
                    text: 'co_id',
                    sortable: false,
                    dataIndex: 'co_id',
                    hidden: true
                },
                {
                    text: 'Bentuk ID',
                    width: 100,
                    sortable: true,
                    dataIndex: 'bentuk_id'
                },
                {
                    text: 'Nama Bentuk',
                    flex:1,
                    sortable: true,
                    dataIndex: 'bentuk_nama'
                },
                {
                    text: 'Keterangan',
                    width: 200,
                    sortable: true,
                    dataIndex: 'keterangan'
                },
                {
                    text: 'Aktif',
                    sortable: true,
                    dataIndex: 'aktif',
                    renderer: authCk
                }
            ],
            features: [searching],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    oldName = record.get('bentuk_id');
                    record.set("old_bentuk_id",oldName);
                    me.onItemdblclick(me.BentukStore, record, 'Edit Bentuk');
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
                                me.onNew(form, 'BentukModel', 'Tambah Data');
                            }
                        },'->',
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.hapusBentuk(me.BentukStore)
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
                                    value: 'ID'
                                },
                                {
                                    width: 100,
                                    xtype: 'mitos.UpperCaseTextField',
                                    name: 'bentuk_id',
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
                                    value: 'Nama Bentuk'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'bentuk_nama'
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
                                    value: 'Keterangan'
                                },
                                {
                                    width: 450,
                                    xtype: 'textfield',
                                    name: 'keterangan'
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
                            me.onBentukSave(form, me.BentukStore);
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
        me.pageBody = [me.BentukGrid];
        me.callParent(arguments);
    }, // end of initComponent

    onNew: function(form, model, title){
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({}, model);
        form.getForm().loadRecord(newModel);
        this.action('new');
        this.win.show();
    },
    onBentukSave: function(form, store){
        var me = this;
        me.saveBentuk(form, store);
    },
    saveBentuk: function(form, store){
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
    hapusBentuk: function(store){
        var me = this, grid = me.BentukGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('bentuk_id');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Bentuk.deleteBentuk;
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
        this.BentukStore.load();
        callback(true);
    }
});
