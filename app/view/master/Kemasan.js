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
Ext.define('App.view.master.Kemasan', {
    extend: 'App.ux.RenderPanel',
    id: 'panelKemasan',
    pageTitle: 'Kemasan',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        Ext.define('KemasanModel', {
            extend: 'Ext.data.Model',
            fields: [
                {
                    name: 'co_id',
                    type: 'string'
                },
                {
                    name: 'kemasan_id',
                    type: 'string'
                },
                {
                    name: 'kemasan_nama',
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
                    name: 'old_kemasan_id',
                    type: 'string'
                }
            ]

        });
        me.KemasanStore = Ext.create('Ext.data.Store', {
                model: 'KemasanModel',
                proxy: {
                    type: 'direct',
                    api: {
                        read: Kemasan.getkemasan,
                        create: Kemasan.addkemasan,
                        update: Kemasan.updatekemasan,
                        destroy: Kemasan.deletekemasan
                    }
                },
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
        me.KemasanGrid = Ext.create('App.ux.GridPanel', {
            store: me.KemasanStore,
            columns: [
                {
                    width: 100,
                    text: 'Company',
                    sortable: true,
                    dataIndex: 'co_id',
                    hidden: true
                },
                {
                    width: 200,
                    text: 'ID',
                    sortable: true,
                    dataIndex: 'kemasan_id'
                },
                {
                    flex: 1,
                    text: 'Kemasan',
                    sortable: true,
                    dataIndex: 'kemasan_nama'
                },
                {
                    flex: 1,
                    text: 'Keterangan',
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
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    oldName = record.get('kemasan_id');
                    record.set("old_kemasan_id",oldName);
                    me.onItemdblclick(me.KemasanStore, record, 'Edit Kemasan');
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
                                me.onNew(form, 'KemasanModel', 'Tambah Data');
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteKemasan(me.KemasanStore);
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
                                    value: 'Kemasan ID ' + ': '
                                },
                                {
                                    width: 100,
                                    name: 'kemasan_id',
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
                                    value: 'Nama :'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'kemasan_nama'
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
                                }                            ]
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
                            me.onkemasanSave(form, me.KemasanStore);
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
        me.pageBody = [me.KemasanGrid];
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
    onkemasanSave: function(form, store){
        var me = this;
			me.savekemasan(form, store);
    },
    savekemasan: function(form, store){
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
    deleteKemasan: function(store){
        var me = this, grid = me.KemasanGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('kemasan_id');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Kemasan.deletekemasan(bid);
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
        this.KemasanStore.load();
        callback(true);
    }
});
//ens UserPage class