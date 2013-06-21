Ext.define('App.view.transaksi.CashBook.Cashbon_Kurang', {
    extend: 'App.ux.RenderPanel',
    id: 'panelCashbon_Kurang',
    pageTitle: 'Penyelesaian CashBon Kurang',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.currInv_Code = null;
        me.currCoa = null;
        me.currDebtor = null;
        me.curr_coid = null;
        me.userinput =null;
        me.useredit=null;
        //me.myWinChooseItem=null;
        Ext.define('Cashbon_KurangModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'inv_code',type: 'string'},
                {name: 'inv_date',type: 'date'},
                {name: 'bank_code',type: 'string'},
                {name: 'paid_to',type: 'string'},
                {name: 'nominal_1',type: 'string'},
                {name: 'nominal_2',type: 'string'},
                {name: 'remaks',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'}
            ]

        });
        me.Cashbon_KurangStore = Ext.create('Ext.data.Store', {
            model: 'Cashbon_KurangModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Cashbon_Kurang.getCashbon_Kurang,
                    create: Cashbon_Kurang.addCashbon_Kurang,
                    update: Cashbon_Kurang.updateCashbon_Kurang,
                    destroy : Cashbon_Kurang.deleteCashbon_Kurang
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });

        Ext.define('Cb_Kurang_JurnalModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'inv_code',type: 'string'},
                {name: 'vend_id',type: 'string'},
                {name: 'coa',type: 'string'},
                {name: 'debit',type: 'string'},
                {name: 'credit',type: 'string'},
                {name: 'sequence_no',type: 'string'},
                {name: 'timeedit',type: 'date'}
            ]

        });
        me.Cashbon_Kurang_JurnalStore = Ext.create('Ext.data.Store', {
            model: 'Cb_Kurang_JurnalModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Jurnal.getJurnal,
                    create: Jurnal.addJurnal,
                    update: Jurnal.updateJurnal,
                    destroy : Jurnal.deleteJurnal
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });

        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit','inv_date']

        }

        /**
         * Lists Grid
         */
        me.Cashbon_KurangGrid = Ext.create('App.ux.GridPanel', {
            store: me.Cashbon_KurangStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {width: 150,text: 'Inv. Number',sortable: true,dataIndex: 'inv_code'},
                {width: 100,text: 'Inv. Date',sortable: true,dataIndex: 'inv_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {width: 100,text: 'Bank Code',sortable: true,dataIndex: 'bank_code'},
                {width: 100,text: 'DiBayar Ke',sortable: true,dataIndex: 'paid_to'},
                {width: 150,text: 'Nominal 1',sortable: true,dataIndex: 'nominal_1', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {width: 150,text: 'Nominal 2',sortable: true,dataIndex: 'nominal_2', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {width: 200,text: 'remaks',sortable: true,dataIndex: 'remaks'},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}

            ],
            listeners: {
                scope: me,
                select: me.onPBGridClick,
                itemdblclick: function(view, record){
                    me.onItemdblclick(me.Cashbon_KurangStore, record, 'Edit CashBon Kurang');
                }
            },
            features:[searching],
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
                                me.onNewPB(form, 'Cashbon_KurangModel', 'Tambah Data');
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler:function() {
                                me.onPBDelete(me.Cashbon_KurangStore);
                            }
                        },'->',
                        {
                            xtype:'displayfield',
                            itemId:'itemuserinput',
                            margin : '0 5 0 0'
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.Cashbon_KurangStore,
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

        me.Cb_Kurang_JurnalGrid = Ext.create('App.ux.GridPanel', {
            store: me.Cashbon_Kurang_JurnalStore,
            region: 'center',
            enablePaging: true,
            columns: [
                {header : 'co_id', dataIndex : 'co_id',width : 150, hidden: true},
                {header : 'Inv. Code', dataIndex : 'inv_code',width : 150},
                {header : 'Creditor', dataIndex : 'vend_id',width : 100},
                {header : 'Coa', dataIndex : 'coa',width : 100},
                {header : 'Debit', dataIndex : 'debit',width : 150,renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'Credit', dataIndex : 'credit',width : 150,renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'sequence_no', dataIndex : 'sequence_no',width : 150, hidden: true},
                {header : 'LastUpdate',dataIndex : 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100}
            ],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    var form = this.winformCb_Kurang_Jurnal.down('form');
                    me.onItemdblclick1(me.Cashbon_Kurang_JurnalStore, record, 'Edit CashBon Kurang Jurnal', me.winformCb_Kurang_Jurnal, form);

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
                            var form1 = me.winformCb_Kurang_Jurnal.down('form');
                            me.onNewProduksi1(form1, 'Cb_Kurang_JurnalModel', 'Tambah Data', me.winformCb_Kurang_Jurnal);

                        }
                    },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteProduksi1(me.Cashbon_Kurang_JurnalStore, me.Cb_Kurang_JurnalGrid);
                            }
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.Cb_Kurang_JurnalGrid,
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
                            defaults: {hideLabel: true},
                            msgTarget: 'under',
                            name:'inv_code',
                            hidden:true
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
                                    value: 'inv_date'
                                },
                                {
                                    fieldLabel : 'Inv. Date',
                                    xtype : 'datefield',
                                    width : 100,
                                    name : 'inv_date',
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
                                    value: 'Bank Code : '
                                },
                                {
                                    width: 100,
                                    xtype: 'xtBankPopup',
                                    name: 'bank_code'
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
                                    value: 'DiBayar ke : '
                                },
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    name: 'paid_to'
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
                                    value: 'Nominal : '
                                },
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    name: 'nominal_1',
                                    id:'nominal_1_cb_lbh',
                                    listeners : {
                                        scope : me,
                                        specialkey : me.onEnter
                                    }

                                },
                                {
                                    width: 10,
                                    xtype: 'displayfield',
                                    value: ' - '
                                },
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    name: 'nominal_2',
                                    id:'nominal_2_cb_lbh',
                                    listeners : {
                                        scope : me,
                                        specialkey : me.onEnter
                                    }
                                },{
                                    width: 10,
                                    xtype: 'displayfield',
                                    value: ' = '
                                },
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    id:'total_cb_lbh'
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
                                    value: 'Remaks : '
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'remaks'
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
                            me.onPBSave(form, me.Cashbon_KurangStore);
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
        me.winformCb_Kurang_Jurnal = Ext.create('App.ux.window.Window', {
            width: 400,
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
                            name: 'inv_code'
                        },
                        {
                            xtype: 'fieldcontainer',
                            defaults: {hideLabel: true},
                            msgTarget: 'under',
                            name:'sequence_no',
                            hidden:true
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
                                    value: 'Coa '
                                },
                                {
                                    width: 200,
                                    xtype: 'textfield',
                                    name: 'coa',
                                    allowBlank: false
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'vend_id'

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
                                    value: 'Debit :'
                                },
                                {
                                    fieldLabel : 'Debit',
                                    labelAlign : 'right',
                                    name: 'debit',
                                    xtype: 'textfield'
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
                                    value: 'Credit :'
                                },
                                {
                                    fieldLabel : 'Credit',
                                    labelAlign : 'right',
                                    name: 'credit',
                                    xtype: 'textfield'
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
                        var form = me.winformCb_Kurang_Jurnal.down('form').getForm();
                        if(form.isValid()){
                            me.onProduksi3Save(form, me.Cashbon_Kurang_JurnalStore, me.winformCb_Kurang_Jurnal);
                        }
                    }
                },{
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
                    me.action1('close', me.winformCb_Kurang_Jurnal);
                }
            }
        });




        me.pageBody = [me.Cashbon_KurangGrid, me.Cb_Kurang_JurnalGrid];
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
    action1: function(action, window){
        var winf = window, form = winf.down('form');
        if(action == 'close'){
            form.getForm().reset();
        }
    },
    onItemdblclick1: function(store, record, title, window, form){

        this.setForm(form, title);
        form.getForm().loadRecord(record);
        this.action1('old',window);
        window.show();
    },

    /**
     * This wll load a new record to the grid
     * and start the rowEditor
     */
    onNewPB: function(form, model, title){
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({
        }, model);
        form.getForm().loadRecord(newModel);
        this.action('new');
        this.win.show();

    },
    onNewProduksi1: function(form, model, title, window){
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({
        }, model);
        form.getForm().loadRecord(newModel);
        record = form.getRecord()
        this.action1('new',window);
        window.show();
    },

    /**
     *
     * @param grid
     * @param selected
     */
    onPBGridClick: function(grid, selected){
        var me = this;
        me.currInv_Code = selected.data.inv_code;
        me.currDebtor=selected.data.from_bank_code;
        var TopBarItems = this.Cashbon_KurangGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);
        me.Cashbon_Kurang_JurnalStore.load({params:{inv_code: me.currInv_Code}});

    },

    onItemdblclick: function(store, record, title){
        var form = this.win.down('form');
        this.setForm(form, title);
        form.getForm().loadRecord(record);
        this.action('old');
        this.win.show();
    },

    onPBSave: function(form, store){
        var me = this;
        me.savePB(form, store);
    },
    savePB: function(form, store){
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
               me.Cashbon_Kurang_JurnalStore.load({params:{inv_code: me.currInv_Code}});
            },
            failure:function(){
                store.load();
                me.msg('Opps!', 'Error!!', true);
            }
        });
    },

    onProduksi3Save: function(form, store, window){
        var me = this;
        me.saveProduksi3(form, store, window);
    },
    saveProduksi3: function(form, store, window){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record),

        f = me.winformCb_Kurang_Jurnal.down('form').getForm(), rec = f.getRecord();

        form.findField('inv_code').setValue(me.currInv_Code);
        form.findField('vend_id').setValue(me.currDebtor);
        values = form.getValues();
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                me.winformCb_Kurang_Jurnal.close();
                //store.load();
            },
            failure:function(){
                // store.load();
                me.msg('Opps!', 'Error!!', true);
            }
        });
        store.load({params:{inv_code: me.currInv_Code}});
    },

    onPBDelete: function(store){
        var me = this, grid = me.Cashbon_KurangGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('inv_code');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    PB.deletePB(bid);
                    store.remove(sm.getSelection());
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                    me.Cashbon_Kurang_JurnalStore.load();

                }
            }
        });
    },
    deleteProduksi1: function(store, grid){
        var me = this,
            sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('inv_code');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
                    store.remove(sm.getSelection());
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        })
    },
    onEnter : function(field, e)
    {
       var nominal_1 = Ext.getCmp('nominal_1_cb_lbh').getValue();
        var nominal_2 = Ext.getCmp('nominal_2_cb_lbh').getValue();
        Ext.getCmp('total_cb_lbh').setValue(nominal_1 - nominal_2);
    },

    onActive: function(callback){
        var me = this;
        this.Cashbon_KurangStore.load({params:{start:0, limit:5}});
        this.Cashbon_Kurang_JurnalStore.load();

        callback(true);
    }
});
