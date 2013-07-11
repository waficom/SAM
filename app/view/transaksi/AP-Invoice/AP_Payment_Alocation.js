Ext.define('App.view.transaksi.AP-Invoice.AP_Payment_Alocation', {
    extend: 'App.ux.RenderPanel',
    id: 'panelAP_Payment_Alocation',
    pageTitle: 'AP Payment Alocation',
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
        Ext.define('AP_Inv_PaymentModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'ap_inv_payment',type: 'string'},
                {name: 'inv_date',type: 'date'},
                {name: 'inv_code',type: 'string'},
                {name: 'giro_num',type: 'string'},
                {name: 'inv_um',type: 'string'},
                {name: 'vend_id',type: 'string'},
                {name: 'nilaidasar',type: 'string'},
                {name: 'keterangan',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'status',type: 'string'},
                {name: 'inv_type',type: 'string'},
                {name: 'hutangsuplier',type: 'string'},
                {name: 'uangmuka',type: 'string'}
            ]

        });
        me.AP_Inv_PaymentStore = Ext.create('Ext.data.Store', {
            model: 'AP_Inv_PaymentModel',
            proxy: {
                type: 'direct',
                api: {
                    read: AP_Invoice.getAP_Payment_Alocation,
                    create: AP_Invoice.addAP_Inv_Payment,
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
                {name: 'inv_date',type: 'date'},
                {name: 'inv_code',type: 'string'},
                {name: 'vend_id',type: 'string'},
                {name: 'coa',type: 'string'},
                {name: 'coa_nama',type: 'string'},
                {name: 'harga',type: 'string'},
                {name: 'debit',type: 'string'},
                {name: 'credit',type: 'string'},
                {name: 'sequence_no',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'remaks',type: 'string'}
            ]

        });
        me.AP_Inv_JurnalStore = Ext.create('Ext.data.Store', {
            model: 'AP_Inv_JurnalModel',
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
        me.AP_Inv_PaymentGrid = Ext.create('App.ux.GridPanel', {
            store: me.AP_Inv_PaymentStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {width: 150,text: 'Doc. Number',sortable: true,dataIndex: 'ap_inv_payment'},
                {width: 100,text: 'Doc. Date',sortable: true,dataIndex: 'inv_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {width: 150,text: 'Giro Num',sortable: true,dataIndex: 'giro_num'},
                {width: 150,text: 'Doc. Inv',sortable: true,dataIndex: 'inv_code'},
                {width: 100,text: 'Doc. Advance',sortable: true,dataIndex: 'inv_um'},
                {width: 100,text: 'Creditor',sortable: true,dataIndex: 'vend_id'},
                {width: 100,text: 'Nilai',sortable: true,dataIndex: 'nilaidasar', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {width: 200,text: 'Keterangan',sortable: true,dataIndex: 'keterangan'},
                {width: 100,text: 'status',sortable: true,dataIndex: 'status', hidden: true},
                {width: 200,text: 'hutangsuplier',sortable: true,dataIndex: 'hutangsuplier', hidden: true},
                {width: 200,text: 'uangmuka',sortable: true,dataIndex: 'uangmuka', hidden: true},
                {width: 100,text: 'inv_type',sortable: true,dataIndex: 'inv_type', hidden: true},
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
                        me.onItemdblclick(me.AP_Inv_PaymentStore, record, 'Edit AP Payment Alocation');
                        Ext.getCmp('post_ap_pay_al').enable();
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
                                me.onNewPB(form, 'AP_Inv_PaymentModel', 'Tambah Data');
                                Ext.getCmp('post_ap_pay_al').disable();
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            id:'delete_payloc',
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
                {header : 'Doc. Date',dataIndex : 'inv_date',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100},
                {header : 'Doc. Number', dataIndex : 'inv_code',width : 150},
                {header : 'Creditor ', dataIndex : 'vend_id',width : 100},
                {header : 'Coa', dataIndex : 'coa',width : 100},
                {header : 'Description', dataIndex : 'coa_nama',width : 200},
                {header : 'Debit', dataIndex : 'debit',width : 150, renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'Credit', dataIndex : 'credit',width : 150, renderer: Ext.util.Format.numberRenderer('0,000.00')},
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
            features:[searching]

        });

        // *************************************************************************************
        // Window User Form
        // *************************************************************************************
        me.win = Ext.create('App.ux.window.Window', {
            width: 650,
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
                            xtype: "radiogroup",
                            fieldLabel: "Type ",
                            defaults: {xtype: "radio", name:'inv_type'
                            },
                            hidden: true,
                            items: [
                                {
                                    boxLabel: "Alocation",
                                    checked: true,
                                    inputValue:'A',
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
                                    value: 'Doc. Date'
                                },
                                {
                                    fieldLabel : 'Doc. Date',
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
                                    value: 'Giro : '
                                },
                                {
                                    width: 200,
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
                                    value: 'Doc. Inv: '
                                },
                                {
                                    width: 180,
                                    xtype: 'xtAPPopup',
                                    name: 'inv_code',
                                    allowBlank: false
                                },
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Doc. Advance: '
                                },
                                {
                                    width: 180,
                                    xtype: 'xtAPPayUMPopup',
                                    name: 'inv_um',
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
                                    hiddenField:true
                                },
                                {
                                    width: 100,
                                    xtype: 'mitos.currency',
                                    disabled:true,
                                    name:'hutangsuplier',
                                    hideTrigger: true
                                },
                                {
                                    width: 100,
                                    xtype: 'mitos.currency',
                                    disabled:true,
                                    name:'uangmuka',
                                    hideTrigger: true
                                },
                                {
                                    width: 100,
                                    xtype: 'mitos.currency',
                                    name: 'nilaidasar',
                                    hideTrigger: true
                                },
                                {
                                    width: 100,
                                    xtype: 'mitos.currency',
                                    disabled:true,
                                    hideTrigger: true
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
                                    value: 'Keterangan : '
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
                                    fieldLabel: 'Posted',
                                    id:'post_ap_pay_al',
                                    name: 'status'
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

    /**
     *
     * @param grid
     * @param selected
     */
    onPBGridClick: function(grid, selected){
        var me = this;
        me.currInv_Code = selected.data.ap_inv_payment;
        me.currPosted = selected.data.status;
        var TopBarItems = this.AP_Inv_PaymentGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);
        me.AP_Inv_JurnalStore.load({params:{inv_code: me.currInv_Code}});
        if(selected.data.status == 1 || selected.data.status == 2){
            Ext.getCmp('delete_payloc').disable();
        }else{
            Ext.getCmp('delete_payloc').enable();
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
