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
Ext.define('App.view.master.Tax', {
    extend: 'App.ux.RenderPanel',
    id: 'panelTax',
    pageTitle: 'Tax',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        Ext.define('TaxModel', {
            extend: 'Ext.data.Model',
            fields: [
                {
                    name: 'co_id',
                    type: 'string'
                },
                {
                    name: 'tax_code',
                    type: 'string'
                },
                {
                    name: 'type_tax',
                    type: 'string'
                },
                {
                    name: 'description',
                    type: 'string'
                },
                {
                    name: 'rate_ppn',
                    type: 'string'
                },
                {
                    name: 'coa_ppn',
                    type: 'string'
                },
                {
                    name: 'rate_pph',
                    type: 'string'
                },
                {
                    name: 'coa_pph',
                    type: 'string'
                },
                {
                    name: 'remaks',
                    type: 'string'
                },
                {
                    name: 'aktif',
                    type: 'bool'
                },
                {
                    name: 'old_tax_code',
                    type: 'string'
                }
            ]

        });
        me.TaxStore = Ext.create('Ext.data.Store', {
            model: 'TaxModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Tax.getTax,
                    create: Tax.addTax,
                    update: Tax.updateTax,
                    destroy: Tax.deleteTax
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
        me.TaxGrid = Ext.create('App.ux.GridPanel', {
            store: me.TaxStore,
            columns: [
                {header : 'co_id', dataIndex : 'co_id',width : 200, hidden: true},
                {header : 'Tax Code', dataIndex : 'tax_code',width : 100},
                {header : 'Type', dataIndex : 'type_tax',width : 25},
                {
                    width: 300,
                    text: 'Description',
                    sortable: true,
                    dataIndex: 'description'
                },
                {
                    width: 75,
                    text: 'Rate Ppn',
                    sortable: true,
                    dataIndex: 'rate_ppn'
                },
                {
                    width: 100,
                    text: 'Coa Ppn',
                    sortable: true,
                    dataIndex: 'coa_ppn'
                },
                {
                    width: 75,
                    text: 'Rate Pph',
                    sortable: true,
                    dataIndex: 'rate_pph'
                },
                {
                    width: 100,
                    text: 'Coa Pph',
                    sortable: true,
                    dataIndex: 'coa_pph'
                },
                {
                    width: 250,
                    text: 'Remarks',
                    sortable: true,
                    dataIndex: 'remaks'
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
                    oldName = record.get('tax_code');
                    record.set("old_tax_code",oldName);
                    me.onItemdblclick(me.TaxStore, record, 'Edit Tax');
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
                                me.onNew(form, 'TaxModel', 'Tambah Data');
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteTax(me.TaxStore);
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
                                    value: 'Tax ID : '
                                },
                                {
                                    width: 100,
                                    name: 'tax_code',
                                    xtype: 'mitos.UpperCaseTextField',
                                    allowBlank: false,
                                    stripCharsRe: /(^\s+|\s+$)/g
                                }
                            ]
                        },
                        {
                            xtype: "radiogroup",
                            fieldLabel: "Type ",
                            defaults: {xtype: "radio",name: "type_tax"},
                            items: [
                                {
                                    boxLabel: "P. Masukan",
                                    inputValue: "M",
                                    checked: true
                                },
                                {
                                    boxLabel: "P. Keluaran",
                                    inputValue: "K"
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
                                    value: 'Rate PPN :'
                                },
                                {
                                    width: 50,
                                    xtype: 'textfield',
                                    name: 'rate_ppn'
                                },
                                {
                                    width: 80,
                                    xtype: 'displayfield',
                                    value: 'Coa PPN :'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCoaPopup',
                                    name: 'coa_ppn'
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
                                    value: 'Rate PPH :'
                                },
                                {
                                    width: 50,
                                    xtype: 'textfield',
                                    name: 'rate_pph',
                                    allowBlank:true
                                },
                                {
                                    width: 80,
                                    xtype: 'displayfield',
                                    value: 'Coa PPH :'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCoaPopup',
                                    name: 'coa_pph',
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
                            me.onTaxSave(form, me.TaxStore);
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
        me.pageBody = [me.TaxGrid];
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
    onTaxSave: function(form, store){
        var me = this;
        me.saveTax(form, store);
    },
    saveTax: function(form, store){
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
    deleteTax: function(store){
        var me = this, grid = me.TaxGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('tax_code');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Tax.deleteTax(bid);
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
        this.TaxStore.load();
        callback(true);
    }
});
//ens UserPage class