Ext.define('App.view.transaksi.AR.AR_Sale_Payment', {
    extend: 'App.ux.RenderPanel',
    id: 'panelAR_Sale_Payment',
    pageTitle: 'AR Sale Payment',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.currInv_Code = null;
        me.currCoa = null;
        me.currBB = null;
        me.currPosted = null;
        me.curr_coid = null;
        me.userinput =null;
        me.useredit=null;
        //me.myWinChooseItem=null;
        Ext.define('AR_Sale_PaymentModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'inv_code',type: 'string'},
                {name: 'inv_date',type: 'date'},
                {name: 'giro_num',type: 'string'},
                {name: 'for_inv_code',type: 'string'},
                {name: 'bank_code',type: 'string'},
                {name: 'bank_nama',type: 'string'},
                {name: 'cust_id',type: 'string'},
                {name: 'cust_nama',type: 'string'},
                {name: 'nilaidasar',type: 'float'},
                {name: 'keterangan',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'status',type: 'string'},
                {name: 'inv_type',type: 'string'},
                {name: 'posted_date_ar',type: 'date'},
                {name: 'piutangdebtor',type: 'float'},
                {name: 'posted_date',type: 'date'}
            ]

        });
        me.AR_Sale_PaymentStore = Ext.create('Ext.data.Store', {
            model: 'AR_Sale_PaymentModel',
            proxy: {
                type: 'direct',
                api: {
                    read: AR_Sale_Payment.getAR_Sale_Payment,
                    create: AR_Sale_Payment.addAR_Sale_Payment,
                    update: AR_Sale_Payment.updateAR_Sale_Payment,
                    destroy : AR_Sale_Payment.deleteAR_Sale_Payment
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });

        Ext.define('AR_Sale_JurnalModel', {
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
        me.AR_Sale_JurnalStore = Ext.create('Ext.data.Store', {
            model: 'AR_Sale_JurnalModel',
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
        me.AR_Sale_PaymentGrid = Ext.create('App.ux.GridPanel', {
            store: me.AR_Sale_PaymentStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {width: 200,text: 'Doc. Number',sortable: true,dataIndex: 'inv_code'},
                {width: 100,text: 'Entry Date',sortable: true,dataIndex: 'inv_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {width: 200,text: 'Giro Number.',sortable: true,dataIndex: 'giro_num'},
                {width: 200,text: 'Doc. Inv.',sortable: true,dataIndex: 'for_inv_code'},
                {width: 200,text: 'Bank Code',sortable: true,dataIndex: 'bank_code'},
                {width: 200,text: 'Debtor',sortable: true,dataIndex: 'cust_id'},
                {width: 200,text: 'Nominal',sortable: true,dataIndex: 'nilaidasar', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {width: 200,text: 'Remarks',sortable: true,dataIndex: 'keterangan'},
                {width: 200,text: 'status',sortable: true,dataIndex: 'status', hidden: true},
                {width: 50,text: 'inv_type',sortable: true,dataIndex: 'inv_type', hidden: true},
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
                    if(me.currPosted =='1' || me.currPosted =='2'){
                    }else{
                        me.onItemdblclick(me.AR_Sale_PaymentStore, record, 'Edit AR Sale Payment');
                        Ext.getCmp('post_arsp').enable();
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
                                me.onNewPB(form, 'AR_Sale_PaymentModel', 'Tambah Data');
                                Ext.getCmp('post_arsp').disable(); Ext.getCmp('posted_date_ar_pay').disable();
                                Ext.getCmp('inv_date_ar_pay').setValue(new Date());
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Delete',
                            iconCls: 'delete',
                            id:'delete_arpay',
                            handler:function() {
                                me.onPBDelete(me.AR_Sale_PaymentStore);
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
                    store: me.AR_Sale_PaymentStore,
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

        me.AR_Sale_JurnalGrid = Ext.create('App.ux.GridPanel', {
            store: me.AR_Sale_JurnalStore,
            region: 'center',
            enablePaging: true,
            columns: [
                {header : 'co_id', dataIndex : 'co_id',width : 200, hidden: true},
                {header : 'Posting Date',dataIndex : 'inv_date',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100},
                {header : 'Doc. Number', dataIndex : 'inv_code',width : 150},
                {header : 'Debtor', dataIndex : 'vend_id',width : 100},
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
                    return me.currPosted == '1'? 'child-row' : me.currPosted == '2'? 'adult-row' : '';
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
                        },{
                            xtype: "radiogroup",
                            fieldLabel: "Type ",
                            defaults: {xtype: "radio", name:'inv_type'
                            },
                            items: [
                                {
                                    boxLabel: "Normal",
                                    checked: true,
                                    inputValue:'N',
                                    handler: function(field, value) {
                                        if (value) {
                                            Ext.getCmp('for_inv_pay').enable();
                                        }
                                    }

                                },
                                {
                                    boxLabel: "Uang Muka",
                                    inputValue:'U',
                                    handler: function(field, value) {
                                        if (value) {
                                            Ext.getCmp('for_inv_pay').disable();
                                        }
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
                                    value: 'inv_date'
                                },
                                {
                                    fieldLabel : 'Entry Date',
                                    xtype : 'datefield',
                                    width : 100,
                                    name : 'inv_date',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s',
                                    maxValue: new Date(),
                                    id:'inv_date_ar_pay',
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
                                    value: ' Giro Number : '
                                },
                                {
                                    width: 150,
                                    xtype: 'textfield',
                                    name: 'giro_num'
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
                                    value: ' Doc. AR :'
                                },
                                {
                                    width: 200,
                                    xtype: 'xtARPopup',
                                    name: 'for_inv_code',
                                    id:'for_inv_pay',
                                    allowBlank: false
                                },
                                {
                                    width: 200,
                                    xtype: 'displayfield',
                                    name:'piutangdebtor',
                                    id:'piutangdebtor_pay',
                                    renderer: Ext.util.Format.numberRenderer('0,000.00')
                                },
                                {
                                    width: 100,
                                    xtype: 'datefield',
                                    id:'posted_date_ar2',
                                    name: 'posted_date_ar',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s',
                                    hidden: true
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
                                },
                                {
                                    width: 200,
                                    xtype: 'displayfield',
                                    name:'bank_nama',
                                    id:'bank_nama'
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
                                    value: 'Debtor : '
                                },
                                {
                                    width: 100,
                                    xtype: 'xtCustomerPopup',
                                    name: 'cust_id',
                                    id:'cust_id_pay'
                                },
                                {
                                    width: 200,
                                    xtype: 'displayfield',
                                    name:'cust_nama',
                                    id:'cust_nama_pay'
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
                                    name: 'nilaidasar',
                                    id:'nilaidasar_ar_pay',
                                    hideTrigger: true,
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
                                    fieldLabel: 'Posting',
                                    id:'post_arsp',
                                    name: 'status',
                                    handler: function(field, value) {
                                        if (value== true) {
                                            Ext.getCmp('posted_date_ar_pay').enable();
                                            Ext.getCmp('posted_date_ar_pay').setValue(new Date());
                                        }else{
                                            Ext.getCmp('posted_date_ar_pay').disable();
                                        }

                                    }
                                },
                                {
                                    xtype : 'datefield',
                                    width : 100,
                                    name : 'posted_date',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s',
                                    maxValue: new Date(),
                                    allowBlank:false,
                                    id:'posted_date_ar_pay'
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
                            me.onPBSave(form, me.AR_Sale_PaymentStore);
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




        me.pageBody = [me.AR_Sale_PaymentGrid, me.AR_Sale_JurnalGrid];
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

    /**
     *
     * @param grid
     * @param selected
     */
    onPBGridClick: function(grid, selected){
        var me = this;
        me.currInv_Code = selected.data.inv_code;
        me.currPosted = selected.data.status;
        var TopBarItems = this.AR_Sale_PaymentGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);
        me.AR_Sale_JurnalStore.load({params:{inv_code: me.currInv_Code}});
        if(selected.data.status == 1 || selected.data.status == 2){
            Ext.getCmp('delete_arpay').disable();
        }else{
            Ext.getCmp('delete_arpay').enable();
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
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record);
        var jenis = Ext.getCmp('for_inv_pay').getValue();
        var posted_date_pay = Ext.getCmp('posted_date_ar_pay').getValue();
        var posted_date_ar = Ext.getCmp('posted_date_ar2').getValue();
        var piutang = Ext.getCmp('piutangdebtor_pay').getValue();
        var nominal = Ext.getCmp('nilaidasar_ar_pay').getValue();
        if(posted_date_pay == null){
            posted_date_pay = new Date();
        }
        if(posted_date_pay < posted_date_ar && jenis != null){
            Ext.MessageBox.alert('Warning', 'Tanggal Posting AP lebih kecil dari Tanggal Posting Invoice');
        }else if(nominal > piutang && piutang != 0 ){
            Ext.MessageBox.alert('Warning', 'Nominal Pembayaran Melebihi Hutang');
        }else{
            if(storeIndex == -1){
                store.add(values);
            }else{
                record.set(values);
            }
            store.sync({
                success:function(){
                    me.win.close();
                    store.load();
                    me.AR_Sale_JurnalStore.load({params:{inv_code: me.currInv_Code}});
                },
                failure:function(){
                    store.load();
                    me.msg('Opps!', 'Error!!', true);
                }
            });
        }

    },

    onProduksi3Save: function(form, store, window){
        var me = this;
        me.saveProduksi3(form, store, window);
    },
    saveProduksi3: function(form, store, window){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record),

            f = me.winformAR_Sale_Jurnal.down('form').getForm(), rec = f.getRecord();

        form.findField('inv_code').setValue(me.currInv_Code);
        values = form.getValues();
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                me.winformAR_Sale_Jurnal.close();
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
        var me = this, grid = me.AR_Sale_PaymentGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('AR_Sale_Payment');
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
                    me.AR_Sale_JurnalStore.load({params:{inv_code: me.currInv_Code}});
                }
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
        this.AR_Sale_PaymentStore.load({params:{start:0, limit:5}});
        this.AR_Sale_JurnalStore.load();

        callback(true);
    }
});
