Ext.define('App.view.transaksi.CashBook.Cashbon_Kurang', {
    extend: 'App.ux.RenderPanel',
    id: 'panelCashbon_Kurang',
    pageTitle: 'Penyelesaian CashBon',
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
        //me.myWinChooseItem=null;
        Ext.define('Cashbon_KurangModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'inv_code',type: 'string'},
                {name: 'inv_cb',type: 'string'},
                {name: 'inv_date',type: 'date'},
                {name: 'bank_code',type: 'string'},
                {name: 'bank_nama',type: 'string'},
                {name: 'tax_code',type: 'string'},
                {name: 'tax_nama',type: 'string'},
                {name: 'nominal_1',type: 'float'},
                {name: 'nominal_2',type: 'float'},
                {name: 'remaks',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'status',type: 'string'},
                {name: 'account',type: 'string'},
                {name: 'account_nama',type: 'string'},
                {name: 'posted_date',type: 'date'},
                {name: 'btl_cashbon',type: 'string'},
                {name: 'posted_date_cb_cashbon',type: 'date'}
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
        me.Cashbon_Kurang_JurnalStore = Ext.create('Ext.data.Store', {
            model: 'Cb_Kurang_JurnalModel',
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
        me.Cashbon_KurangGrid = Ext.create('App.ux.GridPanel', {
            store: me.Cashbon_KurangStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {width: 150,text: 'Doc Number',sortable: true,dataIndex: 'inv_code'},
                {width: 100,text: 'Entry Date',sortable: true,dataIndex: 'inv_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {width: 150,text: 'Doc CB',sortable: true,dataIndex: 'inv_cb'},
                {width: 100,text: 'Bank Code',sortable: true,dataIndex: 'bank_code'},
                {width: 100,text: 'Tax',sortable: true,dataIndex: 'tax_code'},
                {width: 100,text: 'Account',sortable: true,dataIndex: 'account'},
                {width: 150,text: 'Nominal 1',sortable: true,dataIndex: 'nominal_1', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {width: 150,text: 'Nominal 2',sortable: true,dataIndex: 'nominal_2', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {width: 200,text: 'Remarks',sortable: true,dataIndex: 'remaks'},
                {width: 200,text: 'status',sortable: true,dataIndex: 'status', hidden: true},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}

            ],
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1'? 'child-row' : '';
                }
            },
            listeners: {
                scope: me,
                select: me.onPBGridClick,
                itemdblclick: function(view, record){
                    if(record.get('status')!=1){
                        me.onItemdblclick(me.Cashbon_KurangStore, record, 'Edit Penyelesaian Cashbon');
                        Ext.getCmp('post_cashbon').setDisabled(false);
                        Ext.getCmp('total_cb_krg').setValue(record.get('nominal_1')-record.get('nominal_2'));
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
                                me.onNewPB(form, 'Cashbon_KurangModel', 'Tambah Data');
                                Ext.getCmp('inv_date_cashbon').setValue(new Date());
                                Ext.getCmp('tax_cd_ck').setValue('NT01')
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            id:'delete_cashbon',
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
                                    maxValue: new Date(),
                                    id:'inv_date_cashbon',
                                    submitFormat : 'Y-m-d H:i:s',
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
                                    value: 'CB Doc : '
                                },
                                {
                                    width: 180,
                                    xtype: 'xtCashbonOutPopup',
                                    name: 'inv_cb',
                                    allowBlank: false
                                },
                                {
                                    width: 100,
                                    xtype: 'datefield',
                                    id:'posted_date_cb_cashbon',
                                    name: 'posted_date_cb_cashbon',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s',
                                    hidden: true
                                },
                                {
                                    width: 100,
                                    xtype: 'textfield',
                                    name: 'bank_code',
                                    id:'bank_code_cashbon',
                                    hidden: true
                                },
                                {
                                    //width: 200,
                                    xtype: 'displayfield',
                                    name:'bank_nama',
                                    id:'bank_nama_cashbon'
                                },{
                                    //width: 150,
                                    xtype: 'mitos.checkbox',
                                    fieldLabel: 'Batal Cashbon',
                                    name:'btl_cashbon',
                                    handler: function(field, value) {
                                        if (value== true) {
                                            Ext.getCmp('tax_cd_ck').disable();
                                            Ext.getCmp('acc_id_cashbon').disable();
                                            //Ext.getCmp('nominal_1_cb_krg').disable();
                                            Ext.getCmp('nominal_2_cb_krg').disable();
                                            //Ext.getCmp('total_cb_krg').disable();
                                        }else{
                                            Ext.getCmp('tax_cd_ck').enable();
                                            Ext.getCmp('acc_id_cashbon').enable();
                                            //Ext.getCmp('nominal_1_cb_krg').enable();
                                            Ext.getCmp('nominal_2_cb_krg').enable();
                                            //Ext.getCmp('total_cb_krg').enable();
                                        }

                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    value: 'Batal Cashbon'
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
                                    value: 'Tax Code : '
                                },
                                {
                                    width: 100,
                                    xtype: 'xtTaxMPopup',
                                    name: 'tax_code',
                                    id:'tax_cd_ck',
                                    allowBlank: false
                                },{
                                    width: 200,
                                    xtype: 'displayfield',
                                    name:'tax_nama',
                                    id:'tax_nama_cashbon'
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
                                    value: 'Account : '
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCoaPopup',
                                    name: 'account',
                                    id:'acc_id_cashbon',
                                    allowBlank: false
                                },{
                                    width: 200,
                                    xtype: 'displayfield',
                                    name:'account_nama',
                                    id:'account_cashbon'
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
                                    xtype: 'mitos.currency',
                                    hideTrigger: true,
                                    name: 'nominal_1',
                                    id:'nominal_1_cb_krg',
                                    readOnly: true,
                                    readonly:true

                                },
                                {
                                    width: 10,
                                    xtype: 'displayfield',
                                    value: ' - '
                                },
                                {
                                    width: 100,
                                    xtype: 'mitos.currency',
                                    hideTrigger: true,
                                    name: 'nominal_2',
                                    id:'nominal_2_cb_krg',
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
                                    xtype: 'mitos.currency',
                                    hideTrigger: true,
                                    id:'total_cb_krg',
                                    readOnly: true
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
                        },
                        {
                            xtype: 'fieldcontainer',
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 150,
                                    xtype: 'mitos.checkbox',
                                    fieldLabel: 'Posted',
                                    id:'post_cashbon',
                                    disabled: true,
                                    name: 'status',
                                    handler: function(field, value) {
                                        if (value== true) {
                                            Ext.getCmp('posted_date_cashbon').setDisabled(false);
                                            Ext.getCmp('posted_date_cashbon').setValue(new Date());
                                        }else{
                                            Ext.getCmp('posted_date_cashbon').setDisabled(true);
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
                                    id:'posted_date_cashbon'
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
        me.currPosted = selected.data.status;
        var TopBarItems = this.Cashbon_KurangGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);
        me.Cashbon_Kurang_JurnalStore.load({params:{inv_code: me.currInv_Code}});
        if(selected.data.status == 1 || selected.data.status == 2){
            Ext.getCmp('delete_cashbon').disable();
        }else{
            Ext.getCmp('delete_cashbon').enable();
        }

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
        var me = this;
        var tglPost_CB_out = Ext.getCmp('posted_date_cb_cashbon').getValue();
        var StatusPosting = form.findField('status').getValue();
        var tglPosting = form.findField('posted_date').getValue();
        if(StatusPosting){
            if(tglPosting < tglPost_CB_out ){
                Ext.MessageBox.alert('Warning', 'Tgl Posting Penyelesaian Cashbon Lebih Kecil dari tgl Posting Cashbook');
            }else{
                me.CallFuctionSave(form, store);
            }
        }else{
            me.CallFuctionSave(form, store);
        }
    },

    CallFuctionSave: function(form, store){
        var me = this , record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record);

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

    onEnter : function(field, e)
    {
       var nominal_1 = Ext.getCmp('nominal_1_cb_krg').getValue();
        var nominal_2 = Ext.getCmp('nominal_2_cb_krg').getValue();
        Ext.getCmp('total_cb_krg').setValue(nominal_1 - nominal_2);
    },

    onActive: function(callback){
        var me = this;
        this.Cashbon_KurangStore.load({params:{start:0, limit:5}});
        this.Cashbon_Kurang_JurnalStore.load();

        callback(true);
    }
});
