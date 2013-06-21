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
Ext.define('App.view.transaksi.AR.AR_Giro', {
    extend: 'App.ux.RenderPanel',
    id: 'panelAR_Giro',
    pageTitle: 'AR Giro',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        Ext.define('AR_GiroModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'giro_num',type: 'string'},
                {name: 'giro_date',type: 'date'},
                {name: 'from_bank_code',type: 'string'},
                {name: 'to_bank_code',type: 'string'},
                {name: 'person',type: 'string'},
                {name: 'tanggal_jt',type: 'date'},
                {name: 'tanggal_cair',type: 'date'},
                {name: 'nominal',type: 'string'},
                {name: 'inv_code',type: 'string'},
                {name: 'remaks',type: 'string'},
                {name: 'timeedit',type: 'date'},
                { name: 'aktif',type: 'bool' },
                {name: 'old_ar_giro', type: 'string'}
            ]

        });
        me.AR_GiroStore = Ext.create('Ext.data.Store', {
            model: 'AR_GiroModel',
            proxy: {
                type: 'direct',
                api: {
                    read: AR_Giro.getAR_Giro,
                    create: AR_Giro.addAR_Giro,
                    update: AR_Giro.updateAR_Giro,
                    destroy: AR_Giro.deleteAR_Giro
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
        me.AR_GiroGrid = Ext.create('App.ux.GridPanel', {
            store: me.AR_GiroStore,
            columns: [
                {
                    width: 100,
                    text: 'Company',
                    sortable: true,
                    dataIndex: 'co_id',
                    hidden: true
                },
                {width: 100,text: 'Giro Num',sortable: true, dataIndex: 'giro_num' },
                {width: 100,text: 'Giro Date',sortable: true, dataIndex: 'giro_date',renderer:Ext.util.Format.dateRenderer('d-m-Y') },
                {width: 100,text: 'From Bank Code',sortable: true, dataIndex: 'from_bank_code' },
                {width: 100,text: 'To Bank Code',sortable: true, dataIndex: 'to_bank_code' },
                {width: 100,text: 'Person',sortable: true, dataIndex: 'person' },
                {width: 100,text: 'Tanggal JT',sortable: true, dataIndex: 'tanggal_jt',renderer:Ext.util.Format.dateRenderer('d-m-Y') },
                {width: 100,text: 'Tanggal Cair',sortable: true, dataIndex: 'tanggal_cair',renderer:Ext.util.Format.dateRenderer('d-m-Y') },
                {width: 100,text: 'Nominal',sortable: true, dataIndex: 'nominal' },
                {width: 200,text: 'inv_code',sortable: true, dataIndex: 'inv_code' },
                {width: 200,text: 'remaks',sortable: true, dataIndex: 'remaks' },
                {text: 'Aktif', sortable: true, dataIndex: 'aktif',renderer: authCk},
                {width: 100,text: 'LastUpdate',sortable: true, dataIndex: 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y') }

            ],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    oldName = record.get('bank_code');
                    record.set("old_bank_code",oldName);
                    me.onItemdblclick(me.AR_GiroStore, record, 'Edit Bank');
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
                                me.onNew(form, 'AR_GiroModel', 'Tambah Data');
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteAR_Giro(me.AR_GiroStore);
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
                                    value: 'Giro Number :'
                                },
                                {
                                    width: 200,
                                    xtype: 'textfield',
                                    name: 'giro_num'
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
                                    value: 'Giro Date :'
                                },
                                {
                                    width: 100,
                                    xtype: 'datefield',
                                    name: 'giro_date',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s'
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
                                    value: 'From Bank Code :'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtBankPopup',
                                    name: 'from_bank_code'
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
                                    value: 'To Bank code :'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtBankPopup',
                                    name: 'to_bank_code'
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
                                    value: 'Person :'
                                },
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    name: 'person'
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
                                    value: 'Tanggal JT :'
                                },
                                {
                                    width: 100,
                                    xtype: 'datefield',
                                    name: 'tanggal_jt',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s'
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
                                    value: 'Tanggal Cair :'
                                },
                                {
                                    width: 100,
                                    xtype: 'datefield',
                                    name: 'tanggal_cair',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s'
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
                                    value: 'Nominal :'
                                },
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    name: 'nominal'
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
                                    value: 'Inv. Number :'
                                },
                                {
                                    width: 200,
                                    xtype: 'textfield',
                                    name: 'inv_code'
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
                                    value: 'Remaks : '
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'remaks'
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
                            me.onAR_GiroSave(form, me.AR_GiroStore);
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
        me.pageBody = [me.AR_GiroGrid];
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
    onAR_GiroSave: function(form, store){
        var me = this;
        me.saveAR_Giro(form, store);
    },
    saveAR_Giro: function(form, store){
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
    deleteAR_Giro: function(store){
        var me = this, grid = me.AR_GiroGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('giro_num');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Bank.deleteAR_Giro(bid);
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
        this.AR_GiroStore.load();
        callback(true);
    }
});
//ens UserPage class