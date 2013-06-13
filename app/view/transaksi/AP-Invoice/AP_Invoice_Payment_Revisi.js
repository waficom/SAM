Ext.define('App.view.transaksi.AP-Invoice.AP_Invoice_Payment_Revisi', {
    extend: 'App.ux.RenderPanel',
    id: 'panelAP_Invoice_Payment_Revision',
    pageTitle: 'AP Invoice Payment Revisi',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.currInv_Code = null;
        me.currCoa = null;
        me.currBB = null;
        me.curr_coid = null;
        me.userinput =null;
        me.useredit=null;
        //me.myWinChooseItem=null;
        Ext.define('AP_Inv_PaymentModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'ap_inv_payment',type: 'string'},
                {name: 'ap_inv_payment_revisi',type: 'string'},
                {name: 'inv_date',type: 'date'},
                {name: 'bank_code',type: 'string'},
                {name: 'vend_id',type: 'string'},
                {name: 'nilaidasar',type: 'string'},
                {name: 'keterangan',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'}
            ]

        });
        me.AP_Inv_PaymentStore = Ext.create('Ext.data.Store', {
            model: 'AP_Inv_PaymentModel',
            proxy: {
                type: 'direct',
                api: {
                    read: AP_Invoice.getAP_Inv_Payment_Revisi,
                    create: AP_Invoice.addAP_Inv_Payment_Revisi,
                    update: AP_Invoice.updateAP_Inv_Payment,
                    destroy : AP_Invoice.deleteAP_Inv_Payment
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });

        Ext.define('AP_Inv_JurnalModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'inv_code',type: 'string'},
                {name: 'vend_id',type: 'string'},
                {name: 'coa',type: 'string'},
                {name: 'harga',type: 'string'},
                {name: 'debit',type: 'string'},
                {name: 'credit',type: 'string'},
                {name: 'timeedit',type: 'date'}
            ]

        });
        me.AP_Inv_JurnalStore = Ext.create('Ext.data.Store', {
            model: 'AP_Inv_JurnalModel',
            proxy: {
                type: 'direct',
                api: {
                    read: AP_Invoice.getAP_Inv_Jurnal,
                    create: AP_Invoice.addAP_Inv_Jurnal,
                    update: AP_Invoice.updateAP_Inv_Jurnal,
                    destroy : AP_Invoice.deleteAP_Inv_Jurnal
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
        me.AP_Inv_PaymentGrid = Ext.create('App.ux.GridPanel', {
            store: me.AP_Inv_PaymentStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {width: 200,text: 'Inv. Number',sortable: true,dataIndex: 'ap_inv_payment'},
                {width: 200,text: 'Inv. Revisi',sortable: true,dataIndex: 'ap_inv_payment_revisi'},
                {width: 100,text: 'Inv. Date',sortable: true,dataIndex: 'inv_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {width: 200,text: 'Bank Code',sortable: true,dataIndex: 'bank_code'},
                {width: 200,text: 'Vendor',sortable: true,dataIndex: 'vend_id'},
                {width: 200,text: 'Nilai',sortable: true,dataIndex: 'nilaidasar'},
                {width: 200,text: 'Keterangan',sortable: true,dataIndex: 'keterangan'},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}

            ],
            listeners: {
                scope: me,
                select: me.onPBGridClick,
                itemdblclick: function(view, record){
                    me.onItemdblclick(me.AP_Inv_PaymentStore, record, 'Edit AP Inv. Pembayaran');
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
                                me.onNewPB(form, 'AP_Inv_PaymentModel', 'Tambah Data');
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler:function() {
                                me.onPBDelete(me.AP_Inv_PaymentStore);
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
                    store: me.AP_Inv_PaymentStore,
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

        me.AP_Inv_JurnalGrid = Ext.create('App.ux.GridPanel', {
            store: me.AP_Inv_JurnalStore,
            region: 'center',
            enablePaging: true,
            columns: [
                {header : 'co_id', dataIndex : 'co_id',width : 200, hidden: true},
                {header : 'Inv. Code', dataIndex : 'inv_code',width : 200},
                {header : 'Vendor Id', dataIndex : 'vend_id',width : 200},
                {header : 'Coa', dataIndex : 'coa',width : 200},
                {header : 'Harga', dataIndex : 'harga',width : 200},
                {header : 'Debit', dataIndex : 'debit',width : 200},
                {header : 'Credit', dataIndex : 'credit',width : 200},
                {header : 'LastUpdate',dataIndex : 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100}
            ],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    var form = this.winformAP_Inv_Jurnal.down('form');
                    me.onItemdblclick1(me.AP_Inv_JurnalStore, record, 'Edit AP Inv. Jurnal', me.winformAP_Inv_Jurnal, form);
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
                            var form1 = me.winformAP_Inv_Jurnal.down('form');
                            me.onNewProduksi1(form1, 'AP_Inv_JurnalModel', 'Tambah Data', me.winformAP_Inv_Jurnal);
                        }
                    },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteProduksi1(me.AP_Inv_JurnalStore, me.AP_Inv_JurnalGrid);
                            }
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.AP_Inv_JurnalGrid,
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
                            name:'ap_inv_payment',
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
                                    value: 'Ap Inv Payment Rev. : '
                                },
                                {
                                    width: 200,
                                    xtype: 'textfield',
                                    name: 'ap_inv_payment_revisi'
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
                                    width: 200,
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
                                    value: 'Vendor : '
                                },
                                {
                                    width: 200,
                                    xtype: 'xtVendorSuplierPopup',
                                    name: 'vend_id',
                                    allowBlank: false
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
                                    value: 'Cost : '
                                },
                                {
                                    width: 200,
                                    xtype: 'textfield',
                                    name: 'nilaidasar'
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
                                    value: 'Keterangan : '
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'keterangan'
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
                            me.onPBSave(form, me.AP_Inv_PaymentStore);
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
        me.winformAP_Inv_Jurnal = Ext.create('App.ux.window.Window', {
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
                                    name: 'coa'
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
                                    value: 'Vendor : '
                                },
                                {
                                    width: 200,
                                    xtype: 'xtVendorSuplierPopup',
                                    name: 'vend_id'
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
                                    value: 'Harga :'
                                },
                                {
                                    fieldLabel : 'Harga',
                                    labelAlign : 'right',
                                    name: 'harga',
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
                        var form = me.winformAP_Inv_Jurnal.down('form').getForm();
                        if(form.isValid()){
                            me.onProduksi3Save(form, me.AP_Inv_JurnalStore, me.winformAP_Inv_Jurnal);
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
                    me.action1('close', me.winformAP_Inv_Jurnal);
                }
            }
        });




        me.pageBody = [me.AP_Inv_PaymentGrid, me.AP_Inv_JurnalGrid];
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
        me.currInv_Code = selected.data.ap_inv_payment;
        var TopBarItems = this.AP_Inv_PaymentGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);
        me.AP_Inv_JurnalStore.load({params:{inv_code: me.currInv_Code}});

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
               me.AP_Inv_JurnalStore.load({params:{inv_code: me.currInv_Code}});
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

            f = me.winformAP_Inv_Jurnal.down('form').getForm(), rec = f.getRecord();

        form.findField('inv_code').setValue(me.currInv_Code);
        values = form.getValues();
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                me.winformAP_Inv_Jurnal.close();
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
        var me = this, grid = me.AP_Inv_PaymentGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('ap_inv_payment');
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

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        this.AP_Inv_PaymentStore.load({params:{start:0, limit:5}});
        this.AP_Inv_JurnalStore.load();

        callback(true);
    }
});
