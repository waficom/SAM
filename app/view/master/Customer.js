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
Ext.define('App.view.master.Customer', {
    extend: 'App.ux.RenderPanel',
    id: 'panelCustomer',
    pageTitle: 'Customer',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        Ext.define('CustomerModel', {
            extend: 'Ext.data.Model',
            fields: [
                {
                    name: 'co_id',
                    type: 'string'
                },
                {
                    name: 'old_cust_id',
                    type: 'string'
                },
                {
                    name: 'cust_id',
                    type: 'string'
                },
                {
                    name: 'cust_nama',
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
                    name: 'credit_limit',
                    type: 'float'
                },
                {
                    name: 'aktif',
                    type: 'bool'
                }
            ]

        });
        me.CustomerStore = Ext.create('Ext.data.Store', {
                model: 'CustomerModel',
                proxy: {
                    type: 'direct',
                    api: {
                        read: Customer.getcustomer,
                        create: Customer.addcustomer,
                        update: Customer.updatecustomer,
                        destroy: Customer.deletecustomer
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

        function renderRupiah(val)
        {
          var neg = null;
            val = ( neg = val < 0) ? val * -1 : val;
            val = val.toString();
            var ps = val.split('.');
            ps[1] = ps[1] ? ps[1] : null;
            var whole = ps[0];
            var r = /(\d+)(\d{3})/;
            var ts = '.';
            while (r.test(whole))
                whole = whole.replace(r, '$1' + ts + '$2');
            val = whole + (ps[1] ? ',' + ps[1] : '');
            return Ext.String.format('{0}{1}{2}', ( neg ? '-' : ''), 'Rp ', val);
        }

        // *************************************************************************************
        // Create the GridPanel
        // *************************************************************************************
        me.CustomerGrid = Ext.create('App.ux.GridPanel', {
            store: me.CustomerStore,
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
                    dataIndex: 'cust_id'
                },
                {
                    flex: 1,
                    text: 'Customer',
                    sortable: true,
                    dataIndex: 'cust_nama'
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
                    width: 200,
                    text: 'Kredit Limit',
                    sortable: true,
                    dataIndex: 'credit_limit',
                    renderer: renderRupiah,
                    align:'right',
                    style: 'text-align:center'
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
                    oldName = record.get('cust_id');
                    record.set("old_cust_id",oldName);
                    me.onItemdblclick(me.CustomerStore, record, 'Edit Customer');
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
                                me.onNew(form, 'CustomerModel', 'Tambah Data');
                            }
                        },'->',
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteCustomer(me.CustomerStore);
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
                                    value: 'Customer ID ' + ': '
                                },
                                {
                                    width: 100,
                                    xtype: 'mitos.UpperCaseTextField',
                                    name: 'cust_id',
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
                                    value: 'Nama Customer:'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'cust_nama'
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
                                    width: 300,
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
                                    value: 'Telpon 1 :'
                                },
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    name: 'telepon1'
                                },                                
                                {
                                    width: 100,
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
                                    width: 300,
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
                                    value: 'Kode Pos :'
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
                                    value: 'Negara :'
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
                                    value: 'Limit Kredit :'
                                },
                                {
                                    width: 200,
                                    xtype: 'mitos.currency',
                                    name: 'credit_limit',
                                    hideTrigger: true
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
                            me.oncustomerSave(form, me.CustomerStore);
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
        me.pageBody = [me.CustomerGrid];
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
    oncustomerSave: function(form, store){
        var me = this;
			me.savecustomer(form, store);
    },
    savecustomer: function(form, store){
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
    deleteCustomer: function(store){
        var me = this, grid = me.CustomerGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('cust_id');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Customer.deletecustomer(bid);
                    store.remove(sm.getSelection());
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        })
//        store.load();
    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.CustomerStore.load();
        callback(true);
    }
});
//ens UserPage class