/*
 GaiaEHR (Electronic Health Records)
 Lists.js
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
Ext.define('App.view.master.Formula', {
    extend: 'App.ux.RenderPanel',
    id: 'panelFormula',
    pageTitle: 'Formula',
    pageLayout: 'border',
//    uses: ['App.ux.GridPanel', 'App.ux.form.Panel', 'Ext.grid.plugin.RowEditing'],
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.currFormula = null;
        me.curr_coid = null;

        Ext.define('FormulaModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'formula_id',type: 'string'},
                {name: 'formula_nama',type: 'string'},
                {name: 'tanggal',type: 'date'},
                {name: 'cust_id',type: 'string'},
                {name: 'cust_nama',type: 'string'},
                {name: 'spesifikasi_id',type: 'string'},
                {name: 'spesifikasi_nama',type: 'string'},
                {name: 'keterangan',type: 'string'},
                {name: 'old_formula_id',type: 'string'},
                {name: 'aktif',type: 'bool'}
            ],
            proxy: {
               type: 'direct',
               api: {
                   read: Formula.getformula,
                   create: Formula.addformula,
                   update: Formula.updateformula,
                   destroy: Formula.deleteformula
               }
           }
        });
        me.FormulaStore = Ext.create('Ext.data.Store', {
            model: 'FormulaModel',
            autoLoad: false
        });

        Ext.define('Formula1Model', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'}
                ,{name: 'formula_id',type: 'string'}
                ,{name: 'bb_id',type: 'string'}
                ,{name: 'bb_nama',type: 'string'}
                ,{name: 'jumlah',type: 'float', convert: null}
                ,{name: 'satuan_id',type: 'string'}
                ,{name: 'satuan_nama',type: 'string'}
                ,{name: 'old_bb_id',type: 'string'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: Formula.getformula1,
                    create: Formula.addformula1,
                    update: Formula.updateformula1,
                    destroy: Formula.deleteformula1
                }
            }
        });
        me.Formula1Store = Ext.create('Ext.data.Store', {
            model: 'Formula1Model',
            autoLoad: false
        });

        /**
         * Lists Grid
         */
        me.FormulaGrid = Ext.create('App.ux.GridPanel', {
            store: me.FormulaStore,
            itemId: 'FormulaGrid',
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {text: 'co_id', sortable: false, dataIndex: 'co_id', hidden : true},
                {text: 'Formula', width:70, sortable: false,dataIndex: 'formula_id'},
                {text: 'Nama Formula', flex: 1, sortable: true, dataIndex: 'formula_nama'},
                {text: 'Tanggal', width : 80, sortable: true, dataIndex: 'tanggal', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'cust_id', dataIndex: 'cust_id', hidden : true  },
                {text: 'Customer', width : 150, dataIndex: 'cust_nama', sortable : true },
                {text: 'spesifikasi_id', dataIndex: 'spesifikasi_id', hidden : true },
                {text: 'Spesifikasi', width : 150, dataIndex: 'spesifikasi_nama', sortable : true },
                {text: 'Aktif', width:55, sortable: false, dataIndex: 'aktif', renderer: me.boolRenderer }
            ],
            listeners: {
                scope: me,
                select: me.onFormulaGridClick,
                itemdblclick: function(view, record){
                    oldName = record.get('formula_id');
                    record.set("old_formula_id",oldName);
                    me.onItemdblclick(me.FormulaStore, record, 'Edit Formula');
                }
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Add',
                            iconCls: 'icoAddRecord',
                            scope: me,
                            handler: function(){
                                var form = me.win.down('form');
                                me.onNewFormula(form, 'FormulaModel', 'Tambah Data');
                            },
                            tooltip : 'Tambah Data'
                        },
                        '->',
                        {
                            text: 'Delete',
                            iconCls: 'icoDeleteBlack',
                            itemId: 'listDeleteBtn',
                            scope: me,
//                            handler: me.onFormulaDelete,
                            tooltip: 'Hapus Data'
                        }
                    ]
                }
            ]
        });
        /**
         * Options Grid
         */
        me.Formula1Grid = Ext.create('App.ux.GridPanel', {
            store: me.Formula1Store,
            itemId: 'Formula1Grid',
            region: 'center',
            columns: [
                {text: 'id', sortable: false, dataIndex: 'id', hidden : true},
                {text: 'co_id', sortable: false, dataIndex: 'co_id', hidden : true},
                {text: 'Formula', width:70, sortable: false,dataIndex: 'formula_id', hidden : true},
                {text: 'BB', sortable : false, dataIndex: 'bb_id', hidden : true},
                {text: 'Bahan Baku', flex: 1, sortable: true, dataIndex: 'bb_nama'},
                {text: 'Jumlah', width : 80, sortable: false, dataIndex: 'jumlah' },
                {text: 'satuan_id', sortable: false, dataIndex: 'satuan_id', hidden : true},
                {text: 'Satuan', width : 150, dataIndex: 'satuan_nama', sortable : true }
            ],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    oldName = record.get('bb_id');
                    record.set("old_bb_id",oldName);
                    me.onItemdblclick1(me.Formula1Store, record, 'Edit Detail Formula');
                }
            },
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
                            me.onNewFormula1(form1, 'Formula1Model', 'Tambah Data');
                        }
                    }]
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
                                    value: 'Formula ID ' + ': '
                                },
                                {
                                    width: 100,
                                    name: 'formula_id',
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
                                    value: 'Nama Formula :'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'formula_nama'
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
                                    value: 'Tanggal :'
                                },
                                {
									fieldLabel : 'Tanggal',
									xtype : 'datefield',
									format: 'd-m-Y',
									submitFormat: 'Y-m-d H:i:s',
									width : 100,
									name : 'tanggal'
									
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
									xtype : 'customerlivetsearch',
									fieldLabel : 'Customer',
									hideLabel : false,
									itemId : 'cust_id',
									name : 'cust_id',
									anchor : null,
									labelWidth : 100,
									width : 400,
									margin : '0 0 0 0'
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
									xtype : 'spesifikasilivetsearch',
									fieldLabel : 'Spesifikasi',
									hideLabel : false,
									itemId : 'spesifikasi_id',
									name : 'spesifikasi_id',
									anchor : null,
									labelWidth : 100,
									width : 400,
									margin : '0 0 0 0'
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
                                    value: 'Keterangan ' + ': '
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
                            me.onformulaSave(form, me.FormulaStore);
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
                            name: 'formula_id'
                        },
                        {
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
									xtype : 'bblivetsearch',
									fieldLabel : 'Bahan Baku',
									hideLabel : false,
									itemId : 'bb_id',
									name : 'bb_id',
									anchor : null,
									labelWidth : 100,
									width : 400,
									margin : '0 0 0 0'
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
                                    value: 'Jumlah  :'
                                },
                                {
                                    width: 100,
                                    xtype: 'numberfield',
                                    name: 'jumlah',
							        hideTrigger: true,
							        keyNavEnabled: false,
							        mouseWheelEnabled: false
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
									xtype : 'satuanlivetsearch',
									fieldLabel : 'Satuan',
									hideLabel : false,
									itemId : 'satuan_id',
									name : 'satuan_id',
									anchor : null,
									labelWidth : 100,
									width : 400,
									margin : '0 0 0 0'
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
                            me.onformula1Save(form, me.Formula1Store);
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
                    me.action1('close');
                }
            }
        });
        
        me.pageBody = [me.FormulaGrid, me.Formula1Grid];
        me.callParent(arguments);
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
    action1: function(action){
        var winf = this.winform1, form = winf.down('form');
        if(action == 'close'){
            form.getForm().reset();
        }
    },

    /**
     * This wll load a new record to the grid
     * and start the rowEditor
     */
    onNewFormula: function(form, model, title){
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({
            }, model);
        form.getForm().loadRecord(newModel);
        this.action('new');
        this.win.show();
    },
    onNewFormula1: function(form, model, title){
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({
            }, model);
        form.getForm().loadRecord(newModel);
        record = form.getRecord()
        this.action1('new');
        this.winform1.show();
        
    },
    /**
     *
     * @param grid
     * @param selected
     */
    onFormulaGridClick: function(grid, selected){
        var me = this;
        me.currFormula = selected.data.formula_id;
        me.curr_coid = selected.data.co_id;
        me.Formula1Store.load({params:{formula_id: me.currFormula}});
    },

    onItemdblclick: function(store, record, title){
        var form = this.win.down('form');
        this.setForm(form, title);
        form.getForm().loadRecord(record);
        this.action('old');
        this.win.show();
    },

    onItemdblclick1: function(store, record, title){
        var form = this.winform1.down('form');
        this.setForm(form, title);
        form.getForm().loadRecord(record);
        this.action1('old');
        this.winform1.show();
    },

    onformulaSave: function(form, store){
        var me = this;
			me.saveformula(form, store);
    },
    saveformula: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record);
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        console.log(values);
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

    onformula1Save: function(form, store){
        var me = this;
			me.saveformula1(form, store);
    },
    saveformula1: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record), 
        f = me.win.down('form').getForm(), rec = f.getRecord();
        
        form.findField('formula_id').setValue(me.currFormula);
        form.findField('co_id').setValue(me.curr_coid);
        values = form.getValues();
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        console.log(values);
        store.sync({
            success:function(){
                me.winform1.close();
            },
            failure:function(){
                store.load();
                me.msg('Opps!', 'Error!!', true);
            }
        });
    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        this.FormulaStore.load();
        this.Formula1Store.load();
        callback(true);
    }
});
