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
Ext.define('App.view.master.Spesifikasi', {
    extend: 'App.ux.RenderPanel',
    id: 'panelSpesifikasi',
    pageTitle: 'Spesifikasi',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        Ext.define('SpesifikasiModel', {
            extend: 'Ext.data.Model',
            fields: [
                {
                    name: 'co_id',
                    type: 'string'
                },
                {
                    name: 'spesifikasi_id',
                    type: 'string'
                },
                {
                    name: 'spesifikasi_nama',
                    type: 'string'
                },
                {
                    name: 'n',
                    type: 'float'
                },
                {
                    name: 'p2o5',
                    type: 'float'
                },
                {
                    name: 'k2o',
                    type: 'float'
                },
                {
                    name: 'cao',
                    type: 'float'
                },
                {
                    name: 'mgo',
                    type: 'float'
                },
                {
                    name: 'so4',
                    type: 'float'
                },
                {
                    name: 'b',
                    type: 'float'
                },
                {
                    name: 'cu',
                    type: 'float'
                },
                {
                    name: 'zn',
                    type: 'float'
                },
                {
                    name: 'ah',
                    type: 'float'
                },
                {
                    name: 'af',
                    type: 'float'
                },
                {
                    name: 'te',
                    type: 'float'
                },
                {
                    name: 'keterangan',
                    type: 'string'
                },
                {
                    name: 'old_spesifikasi_id',
                    type: 'string'
                },
                {
                    name: 'aktif',
                    type: 'bool'
                }
            ]

        });
        me.SpesifikasiStore = Ext.create('Ext.data.Store', {
                model: 'SpesifikasiModel',
                proxy: {
                    type: 'direct',
                    api: {
                        read: Spesifikasi.getspesifikasi,
                        create: Spesifikasi.addspesifikasi,
                        update: Spesifikasi.updatespesifikasi,
                        destroy: Spesifikasi.deletespesifikasi
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
        me.SpesifikasiGrid = Ext.create('App.ux.GridPanel', {
            store: me.SpesifikasiStore,
            columns: [
                {
                    text: 'Company',
                    sortable: true,
                    dataIndex: 'co_id',
                    hidden: true
                },
                {
                    width: 70,
                    text: 'ID',
                    sortable: true,
                    dataIndex: 'spesifikasi_id'
                },
                {
                    flex: 1,
                    text: 'Spesifikasi',
                    sortable: true,
                    dataIndex: 'spesifikasi_nama'
                },
                {
                    width: 50,
                    text: 'N',
                    dataIndex: 'n'
                },
                {
                    width: 50,
                    text: 'P2O5',
                    dataIndex: 'p2o5'
                },
                {
                    width: 50,
                    text: 'K2O',
                    dataIndex: 'k2o'
                },
                {
                    width: 50,
                    text: 'CaO',
                    dataIndex: 'cao'
                },
                {
                    width: 50,
                    text: 'MgO',
                    dataIndex: 'mgo'
                },
                {
                    width: 50,
                    text: 'SO4',
                    dataIndex: 'so4'
                },
                {
                    width: 50,
                    text: 'B',
                    dataIndex: 'b'
                },
                {
                    width: 50,
                    text: 'Cu',
                    dataIndex: 'cu'
                },
                {
                    width: 50,
                    text: 'Zn',
                    dataIndex: 'zn'
                },
                {
                    width: 50,
                    text: 'AH',
                    dataIndex: 'ah'
                },
                {
                    width: 50,
                    text: 'AF',
                    dataIndex: 'af'
                },
                {
                    width: 50,
                    text: 'TE',
                    dataIndex: 'te'
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
                    oldName = record.get('spesifikasi_id');
                    record.set("old_spesifikasi_id",oldName);
                    me.onItemdblclick(me.SpesifikasiStore, record, 'Edit Spesifikasi');
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
                                me.onNew(form, 'SpesifikasiModel', 'Tambah Data');
                            }
                        },'->',
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteSpesifikasi(me.SpesifikasiStore);
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
                            xtype: 'textfield',
                            hidden: true,
                            name: 'id'
                        },
                        {   xtype: 'textfield',
                            hidden: true,
                            name: 'co_id'
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
                                    value: 'Spesifikasi ID ' + ': '
                                },
                                {
                                    width: 100,
                                    name: 'spesifikasi_id',
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
                                    name: 'spesifikasi_nama'
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
                                    value: 'N :'
                                },
                                {
                                    width: 50,
                                    xtype: 'numberfield',
                                    name: 'n'
                                },                                
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'B :'
                                },
                                {
                                    width: 50,
                                    xtype: 'numberfield',
                                    name: 'b'
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
                                    value: 'P2O5 :'
                                },
                                {
                                    width: 50,
                                    xtype: 'numberfield',
                                    name: 'p2o5'
                                },                                
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Cu :'
                                },
                                {
                                    width: 50,
                                    xtype: 'numberfield',
                                    name: 'cu'
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
                                    value: 'K2O :'
                                },
                                {
                                    width: 50,
                                    xtype: 'numberfield',
                                    name: 'k2o'
                                },                                
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Zn :'
                                },
                                {
                                    width: 50,
                                    xtype: 'numberfield',
                                    name: 'zn'
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
                                    value: 'CaO :'
                                },
                                {
                                    width: 50,
                                    xtype: 'numberfield',
                                    name: 'cao'
                                },                                
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'AH :'
                                },
                                {
                                    width: 50,
                                    xtype: 'numberfield',
                                    name: 'ah'
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
                                    value: 'MgO :'
                                },
                                {
                                    width: 50,
                                    xtype: 'numberfield',
                                    name: 'mgo'
                                },                                
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'AF :'
                                },
                                {
                                    width: 50,
                                    xtype: 'numberfield',
                                    name: 'af'
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
                                    value: 'SO4 :'
                                },
                                {
                                    width: 50,
                                    xtype: 'numberfield',
                                    name: 'so4'
                                }  ,
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'TE :'
                                },
                                {
                                    width: 50,
                                    xtype: 'numberfield',
                                    name: 'te'
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
                            me.onspesifikasiSave(form, me.SpesifikasiStore);
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
        me.pageBody = [me.SpesifikasiGrid];
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
    onspesifikasiSave: function(form, store){
        var me = this;
			me.savespesifikasi(form, store);
    },
    savespesifikasi: function(form, store){
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
    deleteSpesifikasi: function(store){
        var me = this, grid = me.SpesifikasiGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('spesifikasi_id');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Spesifikasi.deletespesifikasi(bid);
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
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.SpesifikasiStore.load();
        callback(true);
    }
});
//ens UserPage class