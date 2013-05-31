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
Ext.define('App.view.master.Kota', {
    extend: 'App.ux.RenderPanel',
    id: 'panelKota',
    pageTitle: 'Kota',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        Ext.define('KotaModel', {
            extend: 'Ext.data.Model',
            fields: [
                {
                    name: 'id_kota',
                    type: 'string'
                },
                {
                    name: 'description',
                    type: 'string'
                },
                {
                    name: 'region',
                    type: 'string'
                },
                {
                    name: 'old_id_kota',
                    type: 'string'
                }
            ]

        });
        me.KotaStore = Ext.create('Ext.data.Store', {
            model: 'KotaModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Kota.getKota,
                    create: Kota.addKota,
                    update: Kota.updateKota,
                    destroy: Kota.deleteKota
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
        me.KotaGrid = Ext.create('App.ux.GridPanel', {
            store: me.KotaStore,
            columns: [
                {
                    text: 'id',
                    width: 100,
                    sortable: true,
                    dataIndex: 'id_kota'
                },
                {
                    text: 'Descriptions',
                    flex:1,
                    sortable: true,
                    dataIndex: 'description'
                },
                {
                    text: 'Region',
                    width: 200,
                    sortable: true,
                    dataIndex: 'region'
                }
            ],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    oldName = record.get('id_kota');
                    record.set("old_id_kota",oldName);
                    me.onItemdblclick(me.KotaStore, record, 'Edit Kota');
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
                                me.onNew(form, 'KotaModel', 'Tambah Data');
                            }
                        },'->',
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteKota(me.KotaStore)
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
                                    value: 'id_kota'
                                },
                                {
                                    width: 100,
                                    xtype: 'mitos.UpperCaseTextField',
                                    name: 'id_kota',
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
                                    value: 'description'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'description'
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
                                    value: 'region'
                                },
                                {
                                    width: 450,
                                    xtype: 'textfield',
                                    name: 'region'
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
                            me.onKotaSave(form, me.KotaStore);
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
        me.pageBody = [me.KotaGrid];
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
    onKotaSave: function(form, store){
        var me = this;
        me.saveKota(form, store);
    },
    saveKota: function(form, store){
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
                store.load();
                me.msg('Opps!', 'Error!!', true);
            }
        });
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
    deleteKota: function(store){
        var me = this, grid = me.KotaGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        coid = sr[0].get('id_kota');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Companies.deleteKotabyID(coid);
                    store.remove(sm.getSelection());
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        })
    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.KotaStore.load();
        callback(true);
    }
});
