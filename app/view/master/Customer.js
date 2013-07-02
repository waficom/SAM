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
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.currCust = null;
        me.curr_coid = null;
        me.userinput =null;
        me.useredit=null;

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
                },
                {
                    name: 'coa_ar',
                    type: 'string'
                },
                {
                    name: 'coa_arp',
                    type: 'string'
                },
                {
                    name: 'coa_ar_disc',
                    type: 'string'
                },
                {
                    name: 'coa_ar_return',
                    type: 'string'
                },
                {
                    name: 'coa_ar_distribusi',
                    type: 'string'
                },
                {
                    name: 'coa_ar_um',
                    type: 'string'
                }
                ,
                {
                    name: 'coa_ar_pot',
                    type: 'string'
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
        
        Ext.define('CustomerL_Model', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'cust_id',type: 'string',  hidden : true}
                ,{name: 'location_id',type: 'string'}
                ,{name: 'description',type: 'string'}
                ,{name: 'kabupaten',type: 'string'}
                ,{name: 'kecamatan',type: 'string'}
                ,{name: 'timeedit',type: 'date'}
                ,{name: 'useredit',type: 'string'}
                ,{name: 'userinput',type: 'string'}
                ,{name: 'old_location_id',type: 'string'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: Customer.getcustomerL,
                    create: Customer.addcustomerL,
                    update: Customer.updatecustomerL,
                    destroy: Customer.deletecustomerL
                }
            }
        });
        me.CustomerLStore = Ext.create('Ext.data.Store',  {
            model: 'CustomerL_Model',
            autoLoad: false
        });

        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit']

        }

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
            itemId: 'CustomerGrid',
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
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
                    width: 100,
                    text: 'Coa AR',
                    sortable: true,
                    dataIndex: 'coa_ar'
                },
                {
                    width: 100,
                    text: 'Coa AR-Piutang',
                    sortable: true,
                    dataIndex: 'coa_arp'
                },
                {
                    width: 100,
                    text: 'Coa AR-Discon',
                    sortable: true,
                    dataIndex: 'coa_ar_disc'
                },
                {
                    width: 100,
                    text: 'Coa AR-Distribusi',
                    sortable: true,
                    dataIndex: 'coa_ar_distribusi'
                },
                {
                    width: 100,
                    text: 'Coa AR-UM',
                    sortable: true,
                    dataIndex: 'coa_ar_um'
                },
                {
                    width: 100,
                    text: 'Coa AR-Pot',
                    sortable: true,
                    dataIndex: 'coa_ar_pot'
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
                select: me.onCustLocationGridClick,
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
        me.CustomerLGrid = Ext.create('App.ux.GridPanel', {
            store: me.CustomerLStore,
            region: 'center',
            enablePaging: true,
            requires: [
                'Ext.toolbar.Paging'
            ],
            columns: [
                {text: 'location_id', sortable: false, dataIndex: 'location_id', hidden: true},
                {text: 'Description', flex: 1,sortable: false, dataIndex: 'description'},
                {text: 'Kecamatan', width:200, sortable: false,dataIndex: 'kecamatan'},
                {text: 'Kabupaten', width:200, sortable: false,dataIndex: 'kabupaten'},
                {text: 'LastUpdate', width : 80, sortable: false, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    oldName = record.get('location_id');
                    record.set("old_location_id",oldName);
                    me.onItemdblclick1(me.CustomerLStore, record, 'Edit Detail Locations');
                }
            },
            features:[searching],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        text: 'Add',
                        iconCls: 'icoAddRecord',
                        scope: me,
                        handler: function(){
                            var form1 = me.winform1.down('form');
                            me.onNewCustLocation(form1, 'CustomerL_Model', 'Tambah Data');
                        }
                    },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteCustLocation(me.CustomerLStore);
                            }
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.CustomerLGrid,
                    beforePageText: 'Page',
                    afterPageText: 'of {0}',
                    displayMsg: 'Diplay {0} - {1} Of {2}',
                    emptyMsg: 'No Record Found',
                    dock: 'bottom',
                    displayInfo: true,
                    pageSize: 5

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
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Coa AR :'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCoaPopup',
                                    name: 'coa_ar',
                                    allowBlank:true
                                },
                                {
                                    width: 80,
                                    xtype: 'displayfield',
                                    value: 'Coa(Piutang) :'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCoaPopup',
                                    name: 'coa_arp',
                                    allowBlank:true
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
                                    value: 'Coa(Siscon) :'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCoaPopup',
                                    name: 'coa_ar_disc',
                                    allowBlank:true
                                },
                                {
                                    width: 80,
                                    xtype: 'displayfield',
                                    value: 'Coa(Return) :'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCoaPopup',
                                    name: 'coa_ar_return',
                                    allowBlank:true
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
                                    value: 'Coa(Distribusi) :'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCoaPopup',
                                    name: 'coa_ar_distribusi',
                                    allowBlank:true
                                },
                                {
                                    width: 80,
                                    xtype: 'displayfield',
                                    value: 'Coa(UM) :'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCoaPopup',
                                    name: 'coa_ar_um',
                                    allowBlank:true
                                },
                                {
                                    width: 50,
                                    xtype: 'displayfield',
                                    value: 'Coa(Pot) :'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCoaPopup',
                                    name: 'coa_ar_pot',
                                    allowBlank:true
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
        me.winform1 = Ext.create('App.ux.window.Window', {
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
                            xtype: 'textfield',
                            hidden: true,
                            name: 'cust_id'
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
                                    value: 'Kecamatan::'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'kecamatan'
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
                                    value: 'Kabupaten :'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'kabupaten'
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
                        var form = me.winform1.down('form').getForm();
                        if(form.isValid()){
                            me.onCustLocationSave(form, me.CustomerLStore);
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
            features:[searching],
            listeners: {
                scope: me,
                close: function(){
                    me.action1('close');
                }
            }
        });
        // END WINDOW
        me.pageBody = [me.CustomerGrid, me.CustomerLGrid];
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
    openWin1: function(){
        this.winform1.show();
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
    onItemdblclick1: function(store, record, title){
        var form = this.winform1.down('form');
        this.setForm(form, title);
        form.getForm().loadRecord(record);
        this.action1('old');
        this.winform1.show();
    },
    onNewCustLocation: function(form, model, title){
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({
        }, model);
        form.getForm().loadRecord(newModel);
        record = form.getRecord()
        this.action1('new');
        this.winform1.show();
    },
    deleteCustLocation: function(store){
        var me = this, grid = me.CustomerLGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('location_id');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Route.deleteCustLocation(bid);
                    store.remove(sm.getSelection());
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        })
    },
    onCustLocationSave: function(form, store){
        var me = this;
        me.saveCustLocation(form, store);
    },
    saveCustLocation: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record),
            f = me.win.down('form').getForm(), rec = f.getRecord();

        form.findField('cust_id').setValue(me.currCust);
        values = form.getValues();
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                me.winform1.close();
               // store.load();
            },
            failure:function(){
                store.load();
                me.msg('Opps!', 'Error!!', true);
            }
        });
        // store.load({params:{no_pp: me.currRoute}});
        store.load({params:{cust_id: me.currCust}});
    },
    action1: function(action){
        var winf = this.winform1, form = winf.down('form');
        if(action == 'close'){
            form.getForm().reset();
        }
    },
    onCustLocationGridClick: function(grid, selected){
        var me = this;
        me.currCust = selected.data.cust_id;
/*
        var TopBarItems = this.CustomerGrid.getDockedItems('toolbar[dock="top"]')[0];

        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);
*/
        me.CustomerLStore.load({params:{cust_id: me.currCust}});

    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        this.CustomerStore.load();
        this.CustomerLStore.load();
        callback(true);
    }
});
//ens UserPage class