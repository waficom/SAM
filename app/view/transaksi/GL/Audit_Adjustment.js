Ext.define('App.view.transaksi.GL.Audit_Adjustment', {
    extend: 'App.ux.RenderPanel',
    id: 'panelAD',
    pageTitle: 'Penyesuaian Audit',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.currInv_Code = null;
        me.currPosted = null;
        me.curr_coid = null;
        me.userinput =null;
        me.useredit=null;
        Ext.define('Audit_AdjustmentModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'inv_code',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'posted_date',type: 'date'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'status',type: 'string'}
            ]

        });
        me.Audit_AdjustmentStore = Ext.create('Ext.data.Store', {
            model: 'Audit_AdjustmentModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Audit_Adjustment.getAudit_Adjustment,
                    create: Audit_Adjustment.addAudit_Adjustment,
                    update: Audit_Adjustment.updateAudit_Adjustment,
                    destroy : Audit_Adjustment.deleteAudit_Adjustment
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });

        Ext.define('Audit_Adjustment_JurnalModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'inv_date',type: 'date'},
                {name: 'inv_code',type: 'string'},
                {name: 'inv_code_link',type: 'string'},
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
        me.Audit_Adjustment_JurnalStore = Ext.create('Ext.data.Store', {
            model: 'Audit_Adjustment_JurnalModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Jurnal.getJurnal,
                    create: Jurnal.addJurnal,
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
        me.Audit_AdjustmentGrid = Ext.create('App.ux.GridPanel', {
            store: me.Audit_AdjustmentStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {flex:1,text: 'Dok No',sortable: true,dataIndex: 'inv_code'},
                {text: 'status',sortable: true,dataIndex: 'status', hidden:true},
                {text: 'Tgl Posting', width : 80, sortable: true, dataIndex: 'posted_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
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
                select: me.onPBGridClick
            },
            features:[searching],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            text: 'Generate Dok.',
                            iconCls: 'icoArrowRightSmall',
                            scope: me,
                            handler: function(){
                                Audit_Adjustment.addAudit_Adjustment(function(provider, response){
                                        Ext.MessageBox.alert('Sukses', '!!!!');
                                });
                                me.Audit_AdjustmentStore.load();
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            id:'dlt_ad',
                            handler:function() {
                                me.onPBDelete(me.Audit_AdjustmentStore);
                            }
                        },{
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange',
                            items : [

                                {
                                    xtype : 'datefield',
                                    itemId : 'posting_ad',
                                    fieldLabel : 'Tgl Posting',
                                    labelWidth : 50,
                                    width : 150,
                                    format : 'd-m-Y',
                                    value : new Date()
                                }]
                        },{
                            text: 'Posting Dok.',
                            iconCls: 'icoArrowRightSmall',
                            id:'pst_ad',
                            scope: me,
                            handler: function(){
                                var me=this, totalDebit= 0, totalCredit= 0;
                                var topBarItems = this.Audit_AdjustmentGrid.getDockedItems('toolbar[dock="top"]')[0],
                                    getDate =  topBarItems.getComponent( 'fieldContainerDateRange' ).getComponent( 'posting_ad' ).getValue();
                                me.Audit_Adjustment_JurnalStore.each(function(record){
                                    if(record.get('inv_code') == me.currInv_Code ) {
                                        totalDebit += record.get('debit');
                                        totalCredit += record.get('credit');
                                    }
                                });
                                if((totalDebit == 0 && totalCredit==0)){
                                    Ext.MessageBox.alert('Warning', 'Detail Data Masih Belum Terisi..!!');
                                }
                                else if(totalDebit != totalCredit){
                                    Ext.MessageBox.alert('Warning', 'Debit Credit Tidak Balance..!!');
                                }else{
                                    var me = this, form = me.win.down('form').getForm(); data_selected = me.Audit_AdjustmentGrid.getSelectionModel(), length = data_selected.selected.items.length;
                                    for (var i = 0, len = length; i < len; i++) {
                                        var data = data_selected.selected.items[i].data;
                                        form.findField('inv_code').setValue(data.inv_code);
                                        form.findField('posted_date').setValue(getDate);
                                        var values = form.getValues();
                                            Audit_Adjustment.updateAudit_Adjustment(values,function(provider, response){
                                                Ext.MessageBox.alert('Sukses', '!!!!');
                                            });
                                        me.Audit_AdjustmentStore.load();
                                    }

                                    me.Audit_AdjustmentStore.load();
                                }
                                me.Audit_Adjustment_JurnalStore.load({params:{inv_code: me.currInv_Code}});
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
                    store: me.Audit_AdjustmentStore,
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

        me.Audit_Adjustment_JurnalGrid = Ext.create('App.ux.GridPanel', {
            store: me.Audit_Adjustment_JurnalStore,
            region: 'center',
            enablePaging: true,
            columns: [
                {header : 'co_id', dataIndex : 'co_id',width : 200, hidden: true},
                {header : 'Doc. Date',dataIndex : 'inv_date',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100},
                {header : 'Doc. Number', dataIndex : 'inv_code',width : 150},
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
            }, searching],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype : 'fieldcontainer',
                            items : [
                                {
                                    xtype: 'xtCoaPopup',
                                    width: 150,
                                    name : 'coa',
                                    fieldLabel: 'Account',
                                    labelWidth : 50,
                                    id:'acc_ad'
                                }]
                        }, {
                            xtype : 'fieldcontainer',
                            items : [
                                {
                                    xtype: 'combo',
                                    width: 100,
                                    fieldLabel: 'Jenis',
                                    displayField : 'title',
                                    id:'jns_dc_ad',
                                    labelWidth : 35,
                                    data : [
                                        {
                                            "title" : 'D'
                                        },
                                        {
                                            "title" : 'C'
                                        }]
                                }]
                        },
                        {
                            xtype : 'fieldcontainer',
                            items : [
                                {
                                    xtype: 'mitos.currency',
                                    hideTrigger: true,
                                    width: 150,
                                    fieldLabel: 'Nominal',
                                    labelWidth : 50,
                                    id:'nom_ad'
                                }]
                        },
                    {
                        text: 'Add',
                        iconCls: 'icoAddRecord',
                        scope: me,
                        id:'add_ad',
                        handler: function(){
                            var form = me.win.down('form').getForm();
                            if(form.isValid()){
                               // me.PostingItem(form, me.Audit_Adjustment_JurnalStore);
                                form.findField('coa').setValue(Ext.getCmp('acc_ad').getValue());
                                form.findField('inv_code').setValue(me.currInv_Code);
                                form.findField('inv_code_link').setValue(me.currInv_Code);
                                if(Ext.getCmp('jns_dc_ad').getValue()=='D' || Ext.getCmp('jns_dc_ad').getValue()=='d' ){
                                    form.findField('debit').setValue(Ext.getCmp('nom_ad').getValue());
                                    form.findField('credit').setValue(null);
                                }else{
                                    form.findField('debit').setValue(null);
                                    form.findField('credit').setValue(Ext.getCmp('nom_ad').getValue());
                                }
                                var values = form.getValues();
                                if(form.isValid()){
                                    Jurnal.addJurnal(values, function(provider, response){
                                        //Ext.MessageBox.alert('Sukses', '!!!!');
                                        me.Audit_Adjustment_JurnalStore.load({params:{inv_code: me.currInv_Code}});
                                    });
                                }
                            }

                        }
                    },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            id:'dlt_dt_ad',
                            handler: function() {
                                me.deleteProduksi1(me.Audit_Adjustment_JurnalStore, me.Audit_Adjustment_JurnalGrid);
                            }
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.Audit_Adjustment_JurnalGrid,
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
                    items: [
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'inv_code'
                        },{
                            xtype: 'textfield',
                            hidden: true,
                            name: 'inv_code_link'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'debit'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'credit'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'coa'
                        },
                        {
                            xtype: 'datefield',
                            hidden: true,
                            name: 'posted_date'
                        }
                    ]
                }
            ]
        });
        // *************************************************************************************
        // Window User Form
        // *************************************************************************************

        me.pageBody = [me.Audit_AdjustmentGrid, me.Audit_Adjustment_JurnalGrid];
        me.callParent(arguments);
    },

    onPBGridClick: function(grid, selected){
        var me = this;
        me.currInv_Code = selected.data.inv_code;
        me.currPosted = selected.data.status;
        var TopBarItems = this.Audit_AdjustmentGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);
        if(me.currPosted==1 || me.currPosted==2){
            Ext.getCmp('dlt_ad').disable();
            Ext.getCmp('pst_ad').disable();
            Ext.getCmp('dlt_dt_ad').disable();
            Ext.getCmp('add_ad').disable();
        }else{
            Ext.getCmp('dlt_ad').enable();
            Ext.getCmp('pst_ad').enable();
            Ext.getCmp('dlt_dt_ad').enable();
            Ext.getCmp('add_ad').enable();
        }


        me.Audit_Adjustment_JurnalStore.load({params:{inv_code: me.currInv_Code}});

    },

    onPBDelete: function(store){
        var me = this, grid = me.Audit_AdjustmentGrid;
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
                    me.Audit_Adjustment_JurnalStore.load({params:{inv_code: me.currInv_Code}});
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
        this.Audit_AdjustmentStore.load({params:{start:0, limit:5}});
        this.Audit_Adjustment_JurnalStore.load();

        callback(true);
    }
});
