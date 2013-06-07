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
Ext.define('App.view.master.Vendor', {
    extend: 'App.ux.RenderPanel',
    id: 'panelVendor',
    pageTitle: 'Vendor',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        Ext.define('VendorModel', {
            extend: 'Ext.data.Model',
            fields: [
                {
                    name: 'co_id',
                    type: 'string'
                },
                {
                    name: 'vend_id',
                    type: 'string'
                },
                {
                    name: 'vend_nama',
                    type: 'string'
                },
                {
                    name: 'vend_type',
                    type: 'string'
                },
                {
                    name: 'vend_type_desc',
                    type: 'string'
                },
                {
                    name: 'contact',
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
                    name: 'coa_ap',
                    type: 'string'
                },
                {
                    name: 'coa_advance',
                    type: 'string'
                },
                {
                    name: 'old_vend_id',
                    type: 'string'
                },
                {
                    name: 'aktif',
                    type: 'bool'
                }
            ]

        });
        me.VendorStore = Ext.create('Ext.data.Store', {
                model: 'VendorModel',
                proxy: {
                    type: 'direct',
                    api: {
                        read: Vendor.getvendor,
                        create: Vendor.addvendor,
                        update: Vendor.updatevendor,
                        destroy: Vendor.deletevendor
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
        me.VendorGrid = Ext.create('App.ux.GridPanel', {
            store: me.VendorStore,
            columns: [
                {
                    text: 'Company',
                    sortable: false,
                    dataIndex: 'co_id',
                    hidden: true
                },
                {
                    width: 50,
                    text: 'ID',
                    sortable: true,
                    dataIndex: 'vend_id'
                },
                {
                    flex: 1,
                    text: 'Vendor',
                    sortable: true,
                    dataIndex: 'vend_nama'
                },
                {
                    flex: 1,
                    text: 'Type :',
                    sortable: true,
                    dataIndex: 'vend_type_desc'
                },
                {
                    flex: 1,
                    text: 'Alamat',
                    sortable: true,
                    dataIndex: 'alamat'
                },
                {
                    width : 100,
                    text: 'Contact',
                    sortable: true,
                    dataIndex: 'contact',
                    hidden : true
                },
                {
                    width : 100,
                    text: 'NPWP',
                    sortable: true,
                    dataIndex: 'npwp',
                    hidden : true
                },
                {
                    width : 100,
                    text: 'Kota',
                    sortable: true,
                    dataIndex: 'kota'
                },
                {
                    width: 100,
                    text: 'Telepon',
                    sortable: true,
                    dataIndex: 'telepon1',
                    hidden : true
                },
                {
                    width: 100,
                    text: 'Telepon',
                    sortable: true,
                    dataIndex: 'telepon2',
                    hidden : true
                },
                {
                    width: 100,
                    text: 'Fax',
                    sortable: true,
                    dataIndex: 'fax',
                    hidden : true
                },
                {
                    width: 100,
                    text: 'Propinsi',
                    sortable: true,
                    dataIndex: 'propinsi',
                    hidden : true
                },
                {
                    width: 100,
                    text: 'Kode Pos',
                    sortable: true,
                    dataIndex: 'kodepos',
                    hidden : true
                },
                {
                    width: 100,
                    text: 'Negara',
                    sortable: true,
                    dataIndex: 'negara',
                    hidden : true
                },
                {
                    flex: 1,
                    text: 'Keterangan',
                    sortable: true,
                    dataIndex: 'keterangan'
                },
                {
                    flex: 1,
                    text: 'Coa AP',
                    sortable: true,
                    dataIndex: 'coa_ap'
                },
                {
                    flex: 1,
                    text: 'Coa Advance',
                    sortable: true,
                    dataIndex: 'coa_advance'
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
                    oldName = record.get('vend_id');
                    record.set("old_vend_id",oldName);
                    me.onItemdblclick(me.VendorStore, record, 'Edit Vendor');
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
                                me.onNew(form, 'VendorModel', 'Tambah Data');
                            }
                        },'->',
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteVendor(me.VendorStore);
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
                                    value: 'Vendor ID ' + ': '
                                },
                                {
                                    width: 100,
                                    name: 'vend_id',
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
                                    value: 'Nama Vendor:'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'vend_nama'
                                }                                
                            ]
                        },
                        {
                            xtype: "radiogroup",
                            fieldLabel: "Type ",
                            id: "vend_type_v",
                            defaults: {xtype: "radio",name: "vend_type"},
                            items: [
                                {
                                    boxLabel: "Suplier",
                                    inputValue: "S"
                                },
                                {
                                    boxLabel: "Transporter",
                                    inputValue: "T"
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
                                    value: 'Contact :'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'contact'
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
                                    value: 'NPWP :'
                                },
                                {
                                    width: 200,
                                    xtype: 'textfield',
                                    name: 'npwp'
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
                                    value: 'Alamat :'
                                },
                                {
                                    width: 300,
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
                                    value: 'Kota :'
                                },
                                {
                                    width: 200,
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
                                    value: 'Telepon 1 :'
                                },
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    name: 'telpon1'
                                },                                
                                {
                                    width: 80,
                                    xtype: 'displayfield',
                                    value: 'Telepon 2 :'
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
                                    value: 'Fax :'
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
                                    width: 200,
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
                                    value: 'Kode Pos :'
                                },
                                {
                                    width: 100,
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
                                    value: 'Negara :'
                                },
                                {
                                    width: 200,
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
                                    value: 'Coa AP :'
                                },
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    name: 'coa_ap'
                                },
                                {
                                    width: 80,
                                    xtype: 'displayfield',
                                    value: 'Coa Advance :'
                                },
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    name: 'coa_advance'
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
                                    width: 50,
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
                            me.onvendorSave(form, me.VendorStore);
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
        me.pageBody = [me.VendorGrid];
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
    onvendorSave: function(form, store){
        var me = this;
			me.savevendor(form, store);
    },
    savevendor: function(form, store){
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
    deleteVendor: function(store){
        var me = this, grid = me.VendorGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('vend_id');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Vendor.deletevendor(bid);
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
        this.VendorStore.load();
        callback(true);
    }
});
//ens UserPage class