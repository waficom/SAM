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
Ext.define('App.view.master.Companies', {
    extend: 'App.ux.RenderPanel',
    id: 'panelCompany',
    pageTitle: 'Company',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        Ext.define('CompanyModel', {
            extend: 'Ext.data.Model',
            fields: [
                {
                    name: 'co_id',
                    type: 'string'
                },
                {
                    name: 'old_co_id',
                    type: 'string'
                },
                {
                    name: 'co_nama',
                    type: 'string'
                },
                {
                    name: 'npwp',
                    type: 'string'
                },
                {
                    name: 'alamat',
                    type: 'string'
                },
                {
                    name: 'kota',
                    type: 'string'
                },
                {
                    name: 'telepon1',
                    type: 'string'
                },
                {
                    name: 'telepon2',
                    type: 'string'
                },
                {
                    name: 'fax',
                    type: 'string'
                },
                {
                    name: 'propinsi',
                    type: 'string'
                },
                {
                    name: 'kodepos',
                    type: 'string'
                },
                {
                    name: 'negara',
                    type: 'string'
                },
                {
                    name: 'keterangan',
                    type: 'string'
                },
                {
                    name: 'aes',
                    type: 'string'
                },
                {
                    name: 'kategori_bdp',
                    type: 'string'
                },
                {
                    name: 'aktif',
                    type: 'bool'
                }
            ]

        });
        me.CompanyStore = Ext.create('Ext.data.Store', {
            model: 'CompanyModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Companies.getCompanies,
                    create: Companies.addCompany,
                    update: Companies.updateCompany,
                    destroy: Companies.deleteCompany
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
        me.CompanyGrid = Ext.create('App.ux.GridPanel', {
            store: me.CompanyStore,
            columns: [
                {
                    text: 'ID',
                    width: 100,
                    sortable: true,
                    dataIndex: 'co_id'
                },
                {
                    text: 'Nama',
                    flex:1,
                    sortable: true,
                    dataIndex: 'co_nama'
                },
                {
                    text: 'Alamat',
                    width: 200,
                    sortable: true,
                    dataIndex: 'alamat'
                },
                {
                    text: 'Kota',
                    width: 100,
                    sortable: true,
                    dataIndex: 'kota'
                }
            ],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    oldName = record.get('co_id');
                    record.set("old_co_id",oldName);
                    me.onItemdblclick(me.CompanyStore, record, 'Edit Company');
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
                                me.onNew(form, 'CompanyModel', 'Tambah Data');
                            }
                        },'->',
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteCompany(me.CompanyStore)
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
                                    value: 'Company ID'
                                },
                                {
                                    width: 100,
                                    xtype: 'mitos.UpperCaseTextField',
                                    name: 'co_id',
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
                                    value: 'Nama'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'co_nama'
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
                                    value: 'Alamat'
                                },
                                {
                                    width: 450,
                                    xtype: 'textfield',
                                    name: 'alamat'
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
                                    value: 'Kota'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'kota'
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
                                    value: 'Telepon'
                                },
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    name: 'telepon1'
                                },
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    name: 'telepon2'
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
                                    value: 'Fax'
                                },
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    name: 'fax'
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
                                    value: 'Propinsi'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'propinsi'
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
                                    value: 'Kode Pos'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'kodepos'
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
                                    value: 'Negara'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'negara'
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
                                    value: 'AES'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'aes'
                                }
                            ]
                        },
                        {
                            xtype: "radiogroup",
                            fieldLabel: "Barang Dalam Proses ",
                            defaults: {xtype: "radio", name:'kategori_bdp'
                            },
                            items: [
                                {
                                    boxLabel: "Yes",
                                    checked: true,
                                    inputValue:'Y'
                                },
                                {
                                    boxLabel: "No",
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
                            me.onCompanySave(form, me.CompanyStore);
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
        me.pageBody = [me.CompanyGrid];
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
    onCompanySave: function(form, store){
        var me = this;
        me.saveCompany(form, store);
    },
    saveCompany: function(form, store){
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
    deleteCompany: function(store){
        var me = this, grid = me.CompanyGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        coid = sr[0].get('co_id');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Companies.deleteCompanybyID(coid);
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
        this.CompanyStore.load();
        callback(true);
    }
});
//ens UserPage class