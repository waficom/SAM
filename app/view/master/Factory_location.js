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
Ext.define('App.view.master.Factory_location', {
    extend: 'App.ux.RenderPanel',
    id: 'panelFactlocation',
    pageTitle: 'Factory location',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],

    initComponent: function(){
        var me = this;
        me.currSequence = null;

        Ext.define('FactorylocationModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'pabrik_sequence',type: 'string'},
                {name: 'description',type: 'string'},
                {name: 'factory_id',type: 'string'},
                {name: 'location',type: 'string'},
                {name: 'remarks',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'useredit',type: 'string'},
                {name: 'timeinput',type: 'date'},
                {name: 'timeedit',type: 'date'},
                {name: 'aktif',type: 'bool'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: Factory_location.getFactorylocation,
                    create: Factory_location.addFactorylocation,
                    update: Factory_location.updateFactorylocation,
                    destroy: Factory_location.deleteFactorylocation
                }
            }
        });
        me.FactlocationStore = Ext.create('Ext.data.Store', {
            model: 'FactorylocationModel',
            remoteSort: true
        });

        Ext.define('GudanglocationModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'pabrik_sequence',type: 'string'},
                {name: 'gudang_id',type: 'string'},
                {name: 'gudang_nama',type: 'string'},
                {name: 'location',type: 'string'},
                {name: 'remarks',type: 'string'},
                {name: 'coa',type: 'string'},
                {name: 'coa_grn',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'useredit',type: 'string'},
                {name: 'timeinput',type: 'date'},
                {name: 'timeedit',type: 'date'},
                {name: 'aktif',type: 'bool'},
                {name: 'old_gudang_id',type: 'string'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: Factory_location.getGudanglocation,
                    create: Factory_location.addGudanglocation,
                    update: Factory_location.updateGudanglocation,
                    destroy: Factory_location.deleteGudanglocation
                }
            }
        });
        me.GudanglocationStore = Ext.create('Ext.data.Store', {
            model: 'GudanglocationModel',
            remoteSort: true
        });

        function authCk(val){
            if(val == '1'){
                return '<img src="resources/images/icons/yes.gif" />';
            }else if(val == '0'){
                return '<img src="resources/images/icons/no.gif" />';
            }
            return val;
        }
        var searching = {
            ftype: 'searching',
            mode: 'local',
            width: 200
        };

        // *************************************************************************************
        // Create the GridPanel
        // *************************************************************************************
        me.FactorylocationGrid = Ext.create('Ext.grid.Panel', {
            store: me.FactlocationStore,
            itemId: 'GudanglocationGrid',
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {text: 'co_id',width: 100,sortable: true,dataIndex: 'co_id', hidden:true},
                {text: 'pabrik_sequence',width: 100,sortable: true,dataIndex: 'pabrik_sequence', hidden:true},
                {text: 'ID',width: 100,sortable: true,flex:1,dataIndex: 'factory_id'},
                {text: 'Description',width: 100,sortable: true,flex:1, dataIndex: 'description'},
                {text: 'Location',width: 100,sortable: true,flex:1,dataIndex: 'location'},
                {text: 'Remarks',width: 100,sortable: true,flex:1,dataIndex: 'remarks'},
                {text: 'Aktif',sortable: true,dataIndex: 'aktif', renderer: authCk},
                {text: 'LastUpdate', width : 80, sortable: false, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}

            ],
            features: [searching],
            listeners: {
                scope: me,
                select: me.onOrderGridClick,
                itemdblclick: function(view, record){
                    oldName = record.get('pabrik_sequence');
                    record.set("old_pabrik_sequence",oldName);
                    var form = this.win.down('form');
                    me.onItemdblclick(me.FactlocationStore, record, 'Edit Factory Location', me.win,form);
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
                                //var me=this;
                                var form = me.win.down('form');
                                me.onNew(form, 'FactorylocationModel', 'Tambah Data', me.win);
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.hapusFactlocation(me.FactlocationStore)
                            }
                        },'->',
                        {
                            xtype:'displayfield',
                            itemId:'itemuserinput',
                            margin : '0 5 0 0'
                        }

                    ]
                }
            ]
        });
        me.GudanglocationGrid = Ext.create('Ext.grid.Panel', {
            store: me.GudanglocationStore,
            region: 'center',
            enablePaging: true,
            columns: [
                {text: 'co_id',width: 100,sortable: true,dataIndex: 'co_id', hidden:true},
                {text: 'pabrik_sequence',width: 100,sortable: true,dataIndex: 'pabrik_sequence', hidden:true},
                {text: 'Gudang ID',width: 100,sortable: true,dataIndex: 'gudang_id'},
                {text: 'Gudang',width: 100,sortable: true,flex:1,dataIndex: 'gudang_nama'},
                {text: 'Location',width: 100,sortable: true,flex:1,dataIndex: 'location'},
                {text: 'Remarks',width: 100,sortable: true,flex:1,dataIndex: 'remarks'},
                {text: 'Coa',width: 100,sortable: true,flex:1,dataIndex: 'coa'},
                {text: 'Coa GRN',width: 100,sortable: true,flex:1,dataIndex: 'coa_grn'},
                {text: 'Aktif',sortable: true,dataIndex: 'aktif', renderer: authCk},
                {text: 'LastUpdate', width : 80, sortable: false, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            features: [searching],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    oldName = record.get('gudang_id');
                    record.set("old_gudang_id",oldName);
                    var form = this.winform1.down('form');
                    me.onItemdblclick(me.GudanglocationStore, record, 'Edit Gudang Location', me.winform1, form);
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
                                //var me=this;
                                var form = me.winform1.down('form');
                                me.onNew(form, 'GudanglocationModel', 'Tambah Data', me.winform1 );
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.hapusGudanglocation(me.GudanglocationStore)
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
                            xtype: 'textfield',
                            hidden: true,
                            name: 'co_id'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'pabrik_sequence'
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
                                    value: 'ID :'
                                },
                                {
                                    width: 150,
                                    xtype: 'textfield',
                                    name: 'factory_id',
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
                                    value: 'Description :'
                                },
                                {
                                    width: 150,
                                    xtype: 'textfield',
                                    name: 'description',
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
                                    value: 'Location :'
                                },
                                {
                                    width: 200,
                                    xtype: 'textfield',
                                    name: 'location'
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
                                    value: 'Remarks :'
                                },
                                {
                                    width: 450,
                                    xtype: 'textfield',
                                    name: 'remarks'
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
                            me.onFactlocationSave(form, me.FactlocationStore);
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
                    me.action('close', me.win);
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
                            name: 'co_id'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'pabrik_sequence'

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
                                    value: 'Gudang ID :'
                                },
                                {
                                    width: 150,
                                    xtype: 'textfield',
                                    name: 'gudang_id',
                                    allowBlank: true
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
                                    value: ' Gudang Desc :'
                                },
                                {
                                    width: 150,
                                    xtype: 'textfield',
                                    name: 'gudang_nama',
                                    allowBlank: true
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
                                    value: 'Location :'
                                },
                                {
                                    width: 200,
                                    xtype: 'textfield',
                                    name: 'location'
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
                                    value: 'Remarks :'
                                },
                                {
                                    width: 450,
                                    xtype: 'textfield',
                                    name: 'remarks'
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
                                    value: 'Coa :'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCoaPopup',
                                    name: 'coa',
                                    allowBlank: true
                                },
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Coa GRN:'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCoaPopup',
                                    name: 'coa_grn',
                                    allowBlank: true
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
                        var form = me.winform1.down('form').getForm();
                        if(form.isValid()){
                            me.onGudanglocationSave(form, me.GudanglocationStore);
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
                    //var form = me.winform1.down('form').getForm();
                    me.action('close', me.winform1);
                }
            }
        });
        // END WINDOW
        me.pageBody = [me.FactorylocationGrid, me.GudanglocationGrid];
        me.callParent(arguments);

    }, // end of initComponent

    onNew: function(form, model, title, win){
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({}, model);
        form.getForm().loadRecord(newModel);
        this.action('new', win);
        win.show();
    },

    onOrderGridClick: function(grid, selected){
        var me = this;
        me.currSequence = selected.data.pabrik_sequence;
        //console.log('currseq ='+ me.currSequence);
        var TopBarItems = this.FactorylocationGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);
        me.GudanglocationStore.load({params:{pabrik_sequence: me.currSequence}});

    },

    onFactlocationSave: function(form, store){
        var me = this;
        me.saveFactlocation(form, store);
    },
    saveFactlocation: function(form, store){
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

    onGudanglocationSave: function(form, store){
        var me = this;
        me.saveGudanglocation(form, store);
    },
    saveGudanglocation: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record),
            f = me.winform1.down('form').getForm(), rec = f.getRecord();

        form.findField('pabrik_sequence').setValue(me.currSequence);

        values = form.getValues();
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                me.winform1.close();
            },
            failure:function(){
                me.msg('Opps!', 'Error!!', true);
            }
        });
        store.load({params:{pabrik_sequence: me.currSequence}});
    },

    onItemdblclick: function(store, record, title, win, form){

        this.setForm(form, title);
        form.getForm().loadRecord(record);
        this.action('old', win, form);
        win.show();
    },
    setForm: function(form, title){
        form.up('window').setTitle(title);
    },
    openWin: function(){
        this.win.show();
    },
    action: function(action, win){
        var win = win; form = win.down('form');
        if(action == 'close'){
            form.getForm().reset();
        }
    },
    hapusFactlocation: function(store){
        var me = this, grid = me.FactorylocationGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('pabrik_sequence');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Factlocation.deleteFactlocation;
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
    hapusGudanglocation: function(store){
        var me = this, grid = me.GudanglocationGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('gudang_id');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Factlocation.deleteFactlocation;
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
        this.FactlocationStore.load();
        this.GudanglocationStore.load();
        callback(true);
    }
});
