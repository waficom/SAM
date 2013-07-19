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
Ext.define('App.view.transaksi.salesorder.ReleaseOrder', {
    extend: 'App.ux.RenderPanel',
    id: 'panelRO',
    pageTitle: 'Release Order',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        Ext.define('ReleaseOrderModel', {
            extend: 'Ext.data.Model',
            fields: [
                { name : 'co_id', type : 'string', hidden: true},
                { name : 'so_num', type : 'string'},
                { name : 'released_date',	type : 'date'},
                { name : 'released', type : 'string'},
                { name : 'status', type : 'string', hidden: true},
                { name : 'tanggal',	type : 'date'},
                { name : 'cust_nama', type : 'string'},
                { name : 'cust_po_num', type : 'string'},
                { name : 'tgl_jt_kirim', type : 'string'},
                { name : 'ppn_so', type : 'bool'},
                { name : 'n_netto', type : 'float'},
                { name : 'statusdesc', type : 'string'}


            ],
            proxy: {
                type: 'direct',
                api: {
                    read: ReleaseOrder.getReleaseOrder,
                    update: ReleaseOrder.updateReleaseOrder
                }
            }
        });
        me.ReleaseOrderStore = Ext.create('Ext.data.Store', {
            model: 'ReleaseOrderModel',
            remoteSort: true
        });

        var searching = {
            ftype: 'searching',
            mode: 'local',
            width: 200
        };

        // *************************************************************************************
        // Create the GridPanel
        // *************************************************************************************
        me.ReleaseOrderGrid = Ext.create('Ext.grid.Panel', {
            store: me.ReleaseOrderStore,
            columns: [
                {
                    text: 'co_id',
                    sortable: false,
                    dataIndex: 'co_id',
                    hidden: true
                },
                {
                    header : 'Sales Order #',
                    dataIndex : 'so_num',
                    width : 200
                },
                {
                    header : 'Tanggal',
                    dataIndex : 'tanggal',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                },
                {
                    header : 'Customer',
                    dataIndex : 'cust_nama',
                    width : 200
                },
                {
                    header : 'PO# Customer',
                    dataIndex : 'cust_po_num',
                    width : 200
                },
                {
                    header : 'JT Kirim',
                    dataIndex : 'tgl_jt_kirim',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                },
                {
                    header : 'PPN',
                    dataIndex : 'ppn_so',
                    renderer: me.boolRenderer,
                    width : 50
                },
                {
                    header : 'Netto',
                    dataIndex : 'n_netto',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    width :50
                },
                {
                    header : 'Tgl Release',
                    dataIndex : 'released_date',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                },{
                    header : 'Status',
                    dataIndex : 'statusdesc',
                    width : 300
                }
            ],
            features: [searching],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    oldName = record.get('so_num');
                    record.set("old_so_num",oldName);
                    me.onItemdblclick(me.ReleaseOrderStore, record, 'Release');
                }
            }
        });
        // *************************************************************************************
        me.win = Ext.create('App.ux.window.Window', {
            width: 300,
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
                                    value: 'Sales Order : '
                                },
                                {
                                    width: 150,
                                    name: 'so_num',
                                    xtype: 'textfield',
                                    disabled: true
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
                                    value: 'Tanggal Release :'
                                },
                                {
                                    width: 100,
                                    xtype: 'datefield',
                                    name: 'released_date',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s',
                                    value : new Date(),
                                    maxValue: new Date(),
                                    allowBlank:false
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
                                    fieldLabel: 'Release',
                                    name: 'released'
                                }
                            ]
                        }
                    ]
                }
            ],
            buttons: [
                {
                    text: 'Save',
                    cls: 'winSave',
                    handler: function(){
                        var form = me.win.down('form').getForm();
                        if(form.isValid()){
                            me.onReleaseOrderSave(form, me.ReleaseOrderStore);
                        }
                    }
                },
                '-',
                {
                    text: 'Cancel',
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
        me.pageBody = [me.ReleaseOrderGrid];
        me.callParent(arguments);
    }, // end of initComponent

    onReleaseOrderSave: function(form, store){
        var me = this;
        me.saveReleaseOrder(form, store);
    },
    saveReleaseOrder: function(form, store){
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


    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.ReleaseOrderStore.load();
        callback(true);
    }
});
