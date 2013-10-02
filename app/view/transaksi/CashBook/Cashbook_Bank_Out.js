Ext.define('App.view.transaksi.CashBook.Cashbook_Bank_Out', {
    extend: 'App.ux.RenderPanel',
    id: 'panelCashbook_Bank_Out',
    pageTitle: 'Bank Out',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.currInv_Code = null;
        me.currCoa = null;
        me.currDebtor = null;
        me.currPosted = null;
        me.curr_coid = null;
        me.userinput =null;
        me.useredit=null;
        me.MaxNominal=null;
        //me.myWinChooseItem=null;
        Ext.define('Cashbook_Bank_OutModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'inv_code',type: 'string'},
                {name: 'inv_date',type: 'date'},
                {name: 'bank_code',type: 'string'},
                {name: 'received_from',type: 'string'},
                {name: 'nominal',type: 'float'},
                {name: 'remaks',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'status',type: 'string'},
                {name: 'tax_code',type: 'string'},
                {name: 'posted_date',type: 'date'},
                {name: 'cf_code',type: 'string'}
            ]

        });
        me.Cashbook_Bank_OutStore = Ext.create('Ext.data.Store', {
            model: 'Cashbook_Bank_OutModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Cashbook_Bank_Out.getCashbook_Bank_Out,
                    create: Cashbook_Bank_Out.addCashbook_Bank_Out,
                    update: Cashbook_Bank_Out.updateCashbook_Bank_Out,
                    destroy : Cashbook_Bank_Out.deleteCashbook_Bank_Out
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });
        Ext.define('CB_Bank_Out_DetailModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'inv_code',type: 'string'},
                {name: 'account',type: 'string'},
                {name: 'coa_nama',type: 'string'},
                {name: 'nominal',type: 'float'},
                {name: 'timeedit',type: 'date'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'}
            ]

        });
        me.CB_Bank_Out_DetailStore = Ext.create('Ext.data.Store', {
            model: 'CB_Bank_Out_DetailModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Cashbook_Bank_In.getCashbook_Bank_In_Detail,
                    create: Cashbook_Bank_In.addCashbook_Bank_In_Detail,
                    update: Cashbook_Bank_In.updateCashbook_Bank_In_Detail,
                    destroy : Cashbook_Bank_In.deleteCashbook_Bank_In_Detail
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });

        Ext.define('Cb_Bank_Out_JurnalModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'inv_date',type: 'date'},
                {name: 'inv_code',type: 'string'},
                {name: 'vend_id',type: 'string'},
                {name: 'coa',type: 'string'},
                {name: 'coa_nama',type: 'string'},
                {name: 'debit',type: 'float'},
                {name: 'credit',type: 'float'},
                {name: 'sequence_no',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'remaks',type: 'string'}
            ]

        });
        me.Cashbook_Bank_Out_JurnalStore = Ext.create('Ext.data.Store', {
            model: 'Cb_Bank_Out_JurnalModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Jurnal.getJurnal
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
        me.Cashbook_Bank_OutGrid = Ext.create('App.ux.GridPanel', {
            store: me.Cashbook_Bank_OutStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {width: 150,text: 'Doc Number',sortable: true,dataIndex: 'inv_code'},
                {width: 100,text: 'Entry Date',sortable: true,dataIndex: 'inv_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {width: 100,text: 'Bank Code',sortable: true,dataIndex: 'bank_code'},
                {width: 100,text: 'From Bank',sortable: true,dataIndex: 'received_from'},
                {width: 150,text: 'Nominal',sortable: true,dataIndex: 'nominal', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {width: 200,text: 'Remarks',sortable: true,dataIndex: 'remaks'},
                {width: 200,text: 'status',sortable: true,dataIndex: 'status', hidden: true},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}

            ],
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1'? 'child-row' : record.get('status') == '2'? 'adult-row' : '';
                }
            },
            listeners: {
                scope: me,
                select: me.onPBGridClick,
                itemdblclick: function(view, record){
                    if(record.get('status')!=1){
                        var form = this.win.down('form');
                        me.onItemdblclick(me.Cashbook_Bank_OutStore, record, 'Edit CashBook Bank Out', me.win,form );
                        Ext.getCmp('post_cb_bank_out').setDisabled(false);
                    }
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
                                me.onNewScreen(form, 'Cashbook_Bank_OutModel', 'Tambah Data', me.win);
                                Ext.getCmp('inv_date_cb_bank_out').setValue(new Date());
                                Ext.getCmp('tax_cd_bankout').setValue('NT01');
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            id:'delete_cb_bank_out',
                            handler:function() {
                                me.onPBDelete(me.Cashbook_Bank_OutStore);
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Detail',
                            iconCls: 'document',
                            scope: me,
                            handler: function(){
                                me.ShowGridPopup(me.CB_Bank_Out_DetailStore, 'Detail Item',me.CB_Bank_Out_DetailGrid);

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
                    store: me.Cashbook_Bank_OutStore,
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
        me.CB_Bank_Out_DetailGrid = Ext.create('App.ux.GridPanel', {
            store: me.CB_Bank_Out_DetailStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {width: 100,text: 'Account',sortable: true,dataIndex: 'account'},
                {text: 'Description',sortable: true,dataIndex: 'coa_nama', flex:1},
                {width: 150,text: 'Nominal',sortable: true,dataIndex: 'nominal', renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00'), id:'SumNominal'},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}

            ],
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return me.currPosted == '1'? 'child-row' : me.currPosted == '2'? 'adult-row' : '';
                }
            },
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    if(me.currPosted =='1' || me.currPosted =='2'){
                    }else{
                        var form = this.winform.down('form');
                        me.onItemdblclick1(me.CB_Bank_Out_DetailStore, record, 'Edit CashBank Out Detail',me.winform, form);
                    }

                }
            },
            features: [{
                ftype: 'summary'
            }, searching],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Add',
                            iconCls: 'icoAddRecord',
                            id:'add_dt_cb_bank_out',
                            scope: me,
                            handler: function(){
                                var form = me.winform.down('form');
                                me.onNewScreen(form, 'CB_Bank_Out_DetailModel', 'Tambah Data', me.winform);
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            id:'delete_dt_cb_bank_out',
                            handler:function() {
                                me.onCb_In_DetailDelete(me.CB_Bank_Out_DetailStore);
                            }
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.CB_Bank_Out_DetailStore,
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
        me.Cb_Out_JurnalGrid = Ext.create('App.ux.GridPanel', {
            store: me.Cashbook_Bank_Out_JurnalStore,
            region: 'center',
            enablePaging: true,
            columns: [
                {header : 'co_id', dataIndex : 'co_id',width : 200, hidden: true},
                {header : 'Posting Date',dataIndex : 'inv_date',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100},
                {header : 'Doc. Number', dataIndex : 'inv_code',width : 150},
                {header : 'Creditor', dataIndex : 'vend_id',width : 100},
                {header : 'Coa', dataIndex : 'coa',width : 100},
                {header : 'Description', dataIndex : 'coa_nama',width : 200, summaryRenderer: function(){
                    return '<b>Total</b>';
                }},
                {header : 'Debit', dataIndex : 'debit',width : 150,renderer: Ext.util.Format.numberRenderer('0,000.00'),  summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'Credit', dataIndex : 'credit',width : 150,renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'sequence_no', dataIndex : 'sequence_no',width : 150, hidden: true},
                {header : 'Remarks', dataIndex : 'remaks',width : 200},
                {header : 'LastUpdate',dataIndex : 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100}
            ],
            viewConfig: {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return me.currPosted == '1'? 'child-row' : '';
                }
            },
            features: [{
                ftype: 'summary'
            }, searching]
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
                                    value: 'Entry Date'
                                },
                                {
                                    fieldLabel : 'Entry Date',
                                    xtype : 'datefield',
                                    width : 100,
                                    name : 'inv_date',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s',
                                    id:'inv_date_cb_bank_out',
                                    maxValue: new Date(),
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
                                    value: 'Bank Code : '
                                },
                                {
                                    width: 100,
                                    xtype: 'xtBankPopup',
                                    name: 'bank_code',
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
                                    value: 'CF Code : '
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCF_OPopup',
                                    name: 'cf_code',
                                    allowBlank:false
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
                                    value: 'Tax Code: '
                                },
                                {
                                    width: 100,
                                    xtype: 'xtTaxMPopup',
                                    name: 'tax_code',
                                    id:'tax_cd_bankout',
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
                                    value: 'Dibayar ke : '
                                },
                                {
                                    width: 100,
                                    xtype: 'xtVendorSuplierPopup',
                                    name: 'received_from',
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
                                    value: 'Nominal : '
                                },
                                {
                                    width: 200,
                                    xtype: 'mitos.currency',
                                    hideTrigger: true,
                                    name: 'nominal',
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
                                    value: 'Remarks : '
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
                                    fieldLabel: 'Posting',
                                    id:'post_cb_bank_out',
                                    disabled: true,
                                    name: 'status',
                                    handler: function(field, value) {
                                        if (value== true) {
                                            Ext.getCmp('posted_date_cb_bank_out').setDisabled(false);
                                            Ext.getCmp('posted_date_cb_bank_out').setValue(new Date());
                                        }else{
                                            Ext.getCmp('posted_date_cb_bank_out').setDisabled(true);
                                        }

                                    }
                                },
                                {
                                    xtype : 'datefield',
                                    width : 100,
                                    name : 'posted_date',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s',
                                    disabled: true,
                                    maxValue: new Date(),
                                    allowBlank:false,
                                    id:'posted_date_cb_bank_out'
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
                            me.onPBSave(form, me.Cashbook_Bank_OutStore);
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
                    me.action1('close', me.win);
                }
            }
        });
        me.winform = Ext.create('App.ux.window.Window', {
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
                                    value: 'Account : '
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCoaPopup',
                                    name: 'account',
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
                                    value: 'Nominal : '
                                },
                                {
                                    width: 200,
                                    xtype: 'mitos.currency',
                                    hideTrigger: true,
                                    name: 'nominal',
                                    allowBlank: false,
                                    id:'nominal_dt_cb_bank_out'
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
                        var form = me.winform.down('form').getForm();
                        if(form.isValid()){
                            me.onCB_Bank_In_DetailSave(form, me.CB_Bank_Out_DetailStore, me.winform);
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
                    me.action1('close',me.winform );
                }
            }
        });
        me.pageBody = [me.Cashbook_Bank_OutGrid, me.Cb_Out_JurnalGrid];
        me.callParent(arguments);
    },
    setForm: function(form, title){
        form.up('window').setTitle(title);
    },
    openWin: function(){
        this.win.show();
    },
    openWin1: function(){
        this.winform.show();
    },

   /* action: function(action){
        var win = this.win, form = win.down('form');
        if(action == 'close'){
            form.getForm().reset();
        }
    },*/
    action1: function(action, window){
        var win = window, form = win.down('form');
        if(action == 'close'){
            form.getForm().reset();
        }
    },
    onItemdblclick: function(store, record, title, window, form){
        this.setForm(form, title);
        form.getForm().loadRecord(record);
        this.action1('old',window);
        window.show();
    },

    /**
     * This wll load a new record to the grid
     * and start the rowEditor
     */
    onNewScreen: function(form, model, title, window){
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({
        }, model);
        form.getForm().loadRecord(newModel);
        this.action1('new',window);
        window.show();

    },
  /*  onCb_In_DetailNew: function(form, model, title, window){
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({
        }, model);
        form.getForm().loadRecord(newModel);
        this.action1('new',window);
        window.show();
    },*/

    /**
     *
     * @param grid
     * @param selected
     */
    onPBGridClick: function(grid, selected){
        var me = this;
        me.currInv_Code = selected.data.inv_code;
        me.currDebtor=selected.data.received_from;
        me.currPosted = selected.data.status;
        me.MaxNominal = selected.data.nominal;
        var TopBarItems = this.Cashbook_Bank_OutGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);
        me.CB_Bank_Out_DetailStore.load({params:{inv_code: me.currInv_Code}});
        me.Cashbook_Bank_Out_JurnalStore.load({params:{inv_code: me.currInv_Code}});
        if(selected.data.status == 1 || selected.data.status == 2){
            Ext.getCmp('delete_cb_bank_out').disable();
            Ext.getCmp('delete_dt_cb_bank_out').disable();
            Ext.getCmp('add_dt_cb_bank_out').disable();

        }else{
            Ext.getCmp('delete_cb_bank_out').enable();
            Ext.getCmp('delete_dt_cb_bank_out').enable();
            Ext.getCmp('add_dt_cb_bank_out').enable();
        }

    },

    onPBSave: function(form, store){
        var me = this, showWin=me.win;
        var StatusPosting = form.findField('status').getValue();
        var totalDebit= 0, totalCredit= 0, count=0 ;
        me.Cashbook_Bank_Out_JurnalStore.each(function(record){
            if(record.get('inv_code') == me.currInv_Code ) {
                totalDebit += record.get('debit');
                totalCredit += record.get('credit');
            }
        });
        if(StatusPosting){
            if( totalDebit != totalCredit){
                Ext.MessageBox.alert('Warning', 'Debit Credit tidak Balance');
            }else{
                me.CallFunctionSave(form, store, showWin);
            }
        }else{
            me.CallFunctionSave(form, store, showWin);
        }
        store.load({params:{co_id:globals['site'] }});
        me.Cashbook_Bank_Out_JurnalStore.load({params:{inv_code: me.currInv_Code}});

    },
    CallFunctionSave: function(form, store, showWin){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record);
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                showWin.close();
            },
            failure:function(){
                Ext.MessageBox.alert('OOPS!', 'Error!!');
            }
        });
    },

    onCB_Bank_In_DetailSave: function(form, store, window){
        var me = this, showWin= me.winform;
        form.findField('inv_code').setValue(me.currInv_Code);
        me.CallFunctionSave(form, store, showWin);
        store.load({params:{inv_code: me.currInv_Code}});
        me.Cashbook_Bank_Out_JurnalStore.load({params:{inv_code: me.currInv_Code}});
    },

    onPBDelete: function(store){
        var me = this, grid = me.Cashbook_Bank_OutGrid;
        me.CallFunctionDel(store, grid);
        me.CB_Bank_Out_DetailStore.load({params:{inv_code: me.currInv_Code}});
        me.Cashbook_Bank_Out_JurnalStore.load({params:{inv_code: me.currInv_Code}});

    },
    onCb_In_DetailDelete: function(store){
        var me = this, grid = me.CB_Bank_Out_DetailGrid;
        me.CallFunctionDel(store, grid);
    },
    CallFunctionDel:function(store, grid){
        var me=this;
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
                    me.Cashbook_Bank_Out_JurnalStore.load({params:{inv_code: me.currInv_Code}});
                }
            }
        });
    },

    ShowGridPopup: function(store, title, grid){
        var me=this;
        this.myWinChooseItem= Ext.create('App.ux.window.Window',{
            layout: 'fit',
            title: title,
            width: 800,
            height: 400,
            items:[grid],
            modal:true

        });
        store.load({params:{inv_code: me.currInv_Code}});
        this.myWinChooseItem.show();
    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        this.Cashbook_Bank_OutStore.load({params:{co_id:globals['site'] }});
        this.Cashbook_Bank_Out_JurnalStore.load();

        callback(true);
    }
});
