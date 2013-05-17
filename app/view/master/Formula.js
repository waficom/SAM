Ext.define('App.view.master.Formula', {
    extend: 'App.ux.RenderPanel',
    id: 'panelFormula',
    pageTitle: 'Formula',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;

        me.currFormula = null;
        me.curr_coid = null;
        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit','pp_date','finishdate','est_finishdate']

        }

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

        Ext.define('SpesifikasiPopup', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'spesifikasi_id',type: 'string'},
                {name: 'spesifikasi_nama',type: 'string'}
                ,{name: 'n',type: 'string'}
                ,{name: 'p2o5',type: 'string'}
                ,{name: 'k2o',type: 'string'}
                ,{name: 'cao',type: 'string'}
                ,{name: 'mgo',type: 'string'}
                ,{name: 'so4',type: 'string'}
                ,{name: 'b',type: 'string'}
                ,{name: 'cu',type: 'string'}
                ,{name: 'zn',type: 'string'}
                ,{name: 'ah',type: 'string'}
                ,{name: 'af',type: 'string'}
                ,{name: 'te',type: 'string'},
                {name: 'timeedit',type: 'date'}
                // {name: 'timeedit',type: 'date'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read:  Spesifikasi.getspesifikasi

                }
            }
        });
        me.SpesifikasiPopupStore = Ext.create('Ext.data.Store', {
            model: 'SpesifikasiPopup',
            autoLoad: true
        });

        Ext.define('SatuanPopup', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'satuan_id',type: 'string'},
                {name: 'satuan_nama',type: 'string'},
                {name: 'timeedit',type: 'date'}
                // {name: 'timeedit',type: 'date'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read:  Satuan.getsatuan

                }
            }
        });
        me.SatuanPopupStore = Ext.create('Ext.data.Store', {
            model: 'SatuanPopup',
            autoLoad: true
        });

        Ext.define('BahanBakuPopup', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'bb_id',type: 'string'},
                {name: 'bb_nama',type: 'string'}
                // {name: 'timeedit',type: 'date'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read:  BahanBaku.getbb

                }
            }
        });
        me.BBPopupStore = Ext.create('Ext.data.Store', {
            model: 'BahanBakuPopup',
            autoLoad: true
        });

        Ext.define('CustomerPopup', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'cust_id',type: 'string'},
                {name: 'cust_nama',type: 'string'}
                ,{name: 'kota',type: 'string'}

                // {name: 'timeedit',type: 'date'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read:  Customer.getcustomer

                }
            }
        });
        me.CustomerPopupStore = Ext.create('Ext.data.Store', {
            model: 'CustomerPopup',
            autoLoad: true
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
                            handler:function() {
                                me.onFormulaDelete(me.FormulaStore);
                            },
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
                    },'->',
                    {
                        xtype: 'button',
                        text: 'Hapus Data',
                        iconCls: 'delete',
                        handler: function() {
                            me.deleteFormula1(me.Formula1Store);
                        }
                    }]
                }
            ]
        });

        me.SpesifikasiGrid = Ext.create('App.ux.GridPanel', {
            store: me.SpesifikasiPopupStore,
            columns: [
                {
                    width: 200,
                    text: 'ID',
                    sortable: true,
                    dataIndex: 'spesifikasi_id'
                },
                {
                    flex: 1,
                    text: 'Spesifikasi :',
                    sortable: true,
                    dataIndex: 'spesifikasi_nama'
                },
                {text: 'N', width:50, sortable: false,dataIndex: 'n'},
                {text: 'P2O5', width:50, sortable: false,dataIndex: 'p2o5'},
                {text: 'K2O', width:50, sortable: false,dataIndex: 'k2o'},
                {text: 'CAO', width:50, sortable: false,dataIndex: 'cao'},
                {text: 'MGO', width:50, sortable: false,dataIndex: 'mgo'},
                {text: 'SO4', width:50, sortable: false,dataIndex: 'so4'},
                {text: 'B', width:50, sortable: false,dataIndex: 'b'},
                {text: 'CU', width:50, sortable: false,dataIndex: 'cu'},
                {text: 'ZN', width:50, sortable: false,dataIndex: 'zn'},
                {text: 'AH', width:50, sortable: false,dataIndex: 'ah'},
                {text: 'AF', width:50, sortable: false,dataIndex: 'af'},
                {text: 'TE', width:50, sortable: false,dataIndex: 'te'}
            ],
            listeners: {
                scope: me,
                select: me.onItemGridClick

            },
            features:[searching]

        });

        me.CustomerGrid = Ext.create('App.ux.GridPanel', {
            store: me.CustomerPopupStore,
            columns: [
                {
                    width: 200,
                    text: 'ID',
                    sortable: true,
                    dataIndex: 'cust_id'
                },
                {
                    flex: 1,
                    text: 'Customer :',
                    sortable: true,
                    dataIndex: 'cust_nama'
                },
                {text: 'Kota', width:50, sortable: false,dataIndex: 'kota'}
            ],
            listeners: {
                scope: me,
                select: me.onItemGridClick

            },
            features:[searching]

        });

        me.SatuanGrid = Ext.create('App.ux.GridPanel', {
            store: me.SatuanPopupStore,
            columns: [
                {
                    width: 200,
                    text: 'ID',
                    sortable: true,
                    dataIndex: 'satuan_id'
                },
                {
                    flex: 1,
                    text: 'Kemasan',
                    sortable: true,
                    dataIndex: 'satuan_nama'
                }
            ],
            listeners: {
                scope: me,
                select: me.onItemGridClick

            },
            features:[searching]

        });
        me.BahanBakuGrid = Ext.create('App.ux.GridPanel', {
            store: me.BBPopupStore,
            columns: [
                {
                    width: 200,
                    text: 'ID',
                    sortable: true,
                    dataIndex: 'bb_id'
                },
                {
                    flex: 1,
                    text: 'bahan Baku',
                    sortable: true,
                    dataIndex: 'bb_nama'
                }
            ],
            listeners: {
                scope: me,
                select: me.onItemGridClick

            },
            features:[searching]

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
                                    width : 100,
                                    name : 'tanggal',
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
                                    value: 'Customer :'
                                },
                                {
                                    width: 200,
                                    xtype: 'textfield',
                                    name: 'cust_id',
                                    id: 'cust_id_formula'
                                },
                                {
                                    xtype: 'button',
                                    text :'choose item',
                                    handler: function(){
                                        //me.myWinChooseItem.show();
                                        me.ShowGridPopup(me.CustomerPopupStore,'Customer',me.CustomerGrid);
                                    }
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
                                    value: 'Spesifikasi :'
                                },
                                {
                                    width: 200,
                                    xtype: 'textfield',
                                    name: 'spesifikasi_id',
                                    id: 'spesifikasi_id_formula'
                                },
                                {
                                    xtype: 'button',
                                    text :'choose item',
                                    handler: function(){
                                        //me.myWinChooseItem.show();
                                        me.ShowGridPopup(me.SpesifikasiPopupStore,'Spesifikasi',me.SpesifikasiGrid);
                                    }
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
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Bahan Baku :'
                                },
                                {
                                    width: 200,
                                    xtype: 'textfield',
                                    name: 'bb_id',
                                    id: 'bb_id_formula'
                                },
                                {
                                    xtype: 'button',
                                    text :'choose item',
                                    handler: function(){
                                        //me.myWinChooseItem.show();
                                        me.ShowGridPopup(me.BBPopupStore,'Satuan',me.BahanBakuGrid);
                                    }
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
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Satuan :'
                                },
                                {
                                    width: 200,
                                    xtype: 'textfield',
                                    name: 'satuan_id',
                                    id: 'satuan_id_formula'
                                },
                                {
                                    xtype: 'button',
                                    text :'choose item',
                                    handler: function(){
                                        //me.myWinChooseItem.show();
                                        me.ShowGridPopup(me.SatuanPopupStore,'Satuan',me.SatuanGrid);
                                    }
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
        store.sync({
            success:function(){
                me.win.close();
                store.load();
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
        store.sync({
            success:function(){
                me.winform1.close();
                store.load();
            },
            failure:function(){
                store.load();
                me.msg('Opps!', 'Error!!', true);
            }
        });
    },
    onFormulaDelete: function(store){
        var me = this, grid = me.FormulaGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('formula_id');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Formula.deleteformula(bid);
                    store.remove(sm.getSelection());
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        });
        store.load();
    },
    deleteFormula1: function(store){
        var me = this, grid = me.Formula1Grid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('bb_id');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Formula.deleteformula1(bid);
                    store.remove(sm.getSelection());
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        })
    },
    ShowGridPopup: function(store, title, grid){
        this.myWinChooseItem= Ext.create('App.ux.window.Window',{
            layout: 'fit',
            title: title,
            width: 400,
            height: 300,
            items:[grid],
            modal:true

        });
        this.myWinChooseItem.show();
    },

    onItemGridClick: function(grid,selected){ //
        var me = this;

        var getSpesifikasi= selected.data.spesifikasi_id;
        var getSatuan= selected.data.satuan_id;
        var getCustomer= selected.data.cust_id;
        var getBB= selected.data.bb_id;

        if(selected.data.cust_id != null){
            Ext.getCmp('cust_id_formula').setValue(getCustomer);
        }else if(selected.data.spesifikasi_id != null){
            Ext.getCmp('spesifikasi_id_formula').setValue(getSpesifikasi);
        }else if(selected.data.satuan_id != null){
            Ext.getCmp('satuan_id_formula').setValue(getSatuan);
        }else if(selected.data.bb_id != null){
            Ext.getCmp('bb_id_formula').setValue(getBB);
        }
        me.myWinChooseItem.close();
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
