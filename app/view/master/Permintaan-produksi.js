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
Ext.define('App.view.master.Permintaan-produksi', {
    extend: 'App.ux.RenderPanel',
    id: 'panelProduksi',
    pageTitle: 'Permintaan Produksi',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.userinput =null;
        me.useredit=null;
        Ext.define('ProduksiModel', {
            extend: 'Ext.data.Model',
            fields: [
                {
                    name: 'no_pp',
                    type: 'string'
                },
                {
                    name: 'description',
                    type: 'string'
                },
                {
                    name: 'pp_date',
                    type: 'string'
                },
                {
                    name: 'status',
                    type: 'string'
                },
                {
                    name: 'userinput',
                    type: 'string'
                },
                {
                    name: 'useredit',
                    type: 'string'
                },
                {
                    name: 'timeedit',
                    type: 'date'
                },
                {
                    name: 'aktif',
                    type: 'bool'
                },
                {
                    name: 'old_no_pp',
                    type: 'string'
                }
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: Produksi.getProduksi,
                    create: Produksi.addProduksi,
                    update: Produksi.updateProduksi,
                    destroy: Produksi.deleteProduksi
                }
            }
        });
        me.ProduksiStore = Ext.create('Ext.data.Store', {
            model: 'ProduksiModel',
            remoteSort: true,
            stripeRows: true

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
        // *************************************************************************************
        // Create the GridPanel
        // *************************************************************************************
        me.ProduksiGrid = Ext.create('Ext.grid.Panel', {
            store: me.ProduksiStore,
            pageSize: 5,
            columns: [

                {
                    text: 'No Produksi',
                    width: 100,
                    sortable: true,
                    dataIndex: 'no_pp'
                },
                {
                    text: 'Description',
                    flex:1,
                    sortable: true,
                    dataIndex: 'description'
                },
                {
                    text: 'Date',
                    sortable: true,
                    dataIndex: 'pp_date',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    text: 'LastUpdate',
                    width: 200,
                    sortable: true,
                    dataIndex: 'timeedit',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y')
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
                select: me.onGridClick,
                itemdblclick: function(view, record){
                    oldName = record.get('no_pp');
                    record.set("old_no_pp",oldName);
                    me.onItemdblclick(me.ProduksiStore, record, 'Edit Produksi');
                }
            },
            features:[searching],
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
                                me.onNew(form, 'ProduksiModel', 'Tambah Data');
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.hapusProduksi(me.ProduksiStore)
                            }
                        },'->',
                        {
                            xtype:'displayfield',
                            itemId:'itemuserinput',
                            margin : '0 5 0 0'
                        }
                    ]
                },
                {
                    xtype: 'pagingtoolbar',
                    store: me.ProduksiStore,
                    beforePageText: 'Page',
                    afterPageText: 'of {0}',
                    displayMsg: 'Diplay {0} - {1} Of {2}',
                    emptyMsg: 'No Record Found',
                    dock: 'bottom',
                    displayInfo: true,
                    pageSize: 5

                }/*{
                 bbar: Ext.create('Ext.PagingToolbar', {
                 store: me.ProduksiStore,
                 displayInfo: true,
                 displayMsg: 'Displaying topics {0} - {1} of {2}',
                 emptyMsg: "No topics to display",
                 items:[
                 '-', {
                 text: 'Show Preview',
                 pressed: pluginExpanded,
                 enableToggle: true,
                 toggleHandler: function(btn, pressed) {
                 var preview = Ext.getCmp('gv').getPlugin('preview');
                 preview.toggleExpanded(pressed);
                 }
                 }]
                 })}*/

            ]

        } );

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
                                    value: 'No PP'
                                },
                                {
                                    width: 100,
                                    xtype: 'mitos.UpperCaseTextField',
                                    name: 'no_pp',
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
                                    value: 'Description'
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
                                    value: 'Date'
                                },
                                {
                                    width: 450,
                                    xtype: 'textfield',
                                    name: 'pp_date'
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
                            me.onProduksiSave(form, me.ProduksiStore);
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
        me.pageBody = [me.ProduksiGrid];
        me.callParent(arguments);
    }, // end of initComponent

    onNew: function(form, model, title){
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({}, model);
        form.getForm().loadRecord(newModel);
        this.action('new');
        this.win.show();
    },
    onProduksiSave: function(form, store){
        var me = this;
        me.saveProduksi(form, store);
    },
    saveProduksi: function(form, store){
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
    onGridClick: function(grid, selected){
        var me = this;
        var TopBarItems = this.ProduksiGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;

        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);

//        Ext.getCmp('itemuserinput').setValue(me.userinput);
//        Ext.getCmp('itemuseredit').setFieldLabel('user edit: '+ me.useredit);
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
    hapusProduksi: function(store){
        var me = this, grid = me.ProduksiGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('Produksi_id');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Produksi.deleteProduksi;
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
        this.ProduksiStore.load({params:{start:5, limit:5}});
        callback(true);
    }
});
