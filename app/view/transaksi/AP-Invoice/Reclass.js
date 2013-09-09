Ext.define('App.view.transaksi.AP-Invoice.Reclass', {
    extend: 'App.ux.RenderPanel',
    id: 'panelViewReclass',
    pageTitle: 'Reclass',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.currCoa = null;
        me.currPosted = null;
        me.userinput =null;
        me.useredit=null;
        //me.myWinChooseItem=null;
        Ext.define('ReclassOVBModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'for_inv_code',type: 'string'},
                {name: 'so_num',type: 'string'},
                {name: 'account',type: 'string'},
                {name: 'coa_nama',type: 'string'},
                {name: 'check',type: 'string'},
                {name: 'debit',type: 'float'},
                {name: 'timeedit',type: 'date'}
            ]

        });
        me.ReclassOVBStore = Ext.create('Ext.data.Store', {
            model: 'ReclassOVBModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Reclass.getViewReclassOVB,
                    create: Reclass.addViewReclassOVB
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });
        Ext.define('ReclassBJModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'for_inv_code',type: 'string'},
                {name: 'do_num',type: 'string'},
                {name: 'so_num',type: 'string'},
                {name: 'qty_do',type: 'float'},
                {name: 'qty_susut',type: 'float'},
                {name: 'rata2_hpp',type: 'float'},
                {name: 'total',type: 'float'},
                {name: 'timeedit',type: 'date'}
            ]

        });
        me.ReclassOBJStore = Ext.create('Ext.data.Store', {
            model: 'ReclassBJModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Reclass.getViewReclassOBJ,
                    create: Reclass.addViewReclassOBJ
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
            disableIndexes:['timeedit']

        }

        /**
         * Lists Grid
         */
        me.ReclassOVBGrid = Ext.create('App.ux.GridPanel', {
            store: me.ReclassOVBStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: 'Account',sortable: true,dataIndex: 'account'},
                {text: 'Description',sortable: true,dataIndex: 'coa_nama', flex:1},
                {text: 'Doc. Number',sortable: true, dataIndex: 'for_inv_code'},
                {text: 'SO Number',sortable: true, dataIndex: 'so_num'},
                {text: 'Debit',sortable: true,dataIndex: 'debit', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            features:[searching],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        '<span style="color: #ff2110"> OHP In Direct Cost </span>',
                        {
                            xtype : 'fieldcontainer',
                            items : [
                                {
                                    xtype : 'xtCoaPopup',
                                    id : 'account_rc',
                                    fieldLabel : 'Account',
                                    labelWidth : 50,
                                    width : 200
                                }]
                        },
                        '<span style="color: #ff2110"> OHP Direct Cost </span>',
                        {
                            xtype : 'fieldcontainer',
                            items : [
                                {
                                    xtype : 'xtSalesOrderPopup',
                                    id : 'so_num_rc',
                                    fieldLabel : 'SO Num',
                                    labelWidth : 50,
                                    width : 200
                                }]
                        },
                        {
                            xtype : 'button',
                            width : 80,
                            margin : '0 0 3 0',
                            text: 'Searching',
                            listeners :
                            {
                                scope : me,
                                click : me.SeachingItem
                            }
                        },
                        {
                            text: 'Posting',
                            iconCls: 'icoArrowRightSmall',
                            scope: me,
                            handler: function(){
                                var form = me.win.down('form').getForm();
                                if(form.isValid()){
                                    me.PostingItem(form, me.ReclassOVBStore);
                                }
                            }
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.ReclassOVBStore,
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
        me.ReclassOBJGrid = Ext.create('App.ux.GridPanel', {
            store: me.ReclassOBJStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {text: 'Dok. AR',sortable: true,dataIndex: 'for_inv_code'},
                {text: 'DO Num',sortable: true,dataIndex: 'do_num'},
                {text: 'SO Num',sortable: true, dataIndex: 'so_num'},
                {text: 'Qty DO',sortable: true, dataIndex: 'qty_do'},
                {text: 'Qty Susut',sortable: true,dataIndex: 'qty_susut'},
                {text: 'Harga Rata2 HPP',sortable: true,dataIndex: 'rata2_hpp', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Jumlah',sortable: true,dataIndex: 'total', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            features:[searching],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        '<span style="color: #ff2110"> RECLASS BJ </span>',
                        {
                            xtype : 'fieldcontainer',
                            items : [
                                {
                                    xtype : 'xtReclassOVBPopup',
                                    id : 'dok_ar_rc',
                                    fieldLabel : 'Dok. AR',
                                    labelWidth : 50,
                                    width : 200
                                }]
                        },
                        {
                            xtype : 'button',
                            width : 80,
                            margin : '0 0 3 0',
                            text: 'Searching',
                            listeners :
                            {
                                scope : me,
                                click : me.SeachingItemBJ
                            }
                        },
                        {
                            text: 'Posting',
                            iconCls: 'icoArrowRightSmall',
                            scope: me,
                            handler: function(){
                                var form = me.winBJ.down('form').getForm();
                                if(form.isValid()){
                                    me.PostingItemOBJ(form, me.ReclassOBJStore);
                                }
                            }
                        },'->',
                        '<span style="color: #ff2110"> CATATAN: Dokumen AR muncul jika total seluruh Qty AR = Qty DO </span>'
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.ReclassOBJStore,
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
                            name: 'for_inv_code'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'account'
                        },{
                            xtype: 'textfield',
                            hidden: true,
                            name: 'debit'
                        }
                    ]
                }
            ]/*,
             buttons: [
             {
             text: 'Save',
             cls: 'winSave',
             handler: function(){
             var form = me.win.down('form').getForm();
             if(form.isValid()){
             me.PostingItem(form, me.ReclassOVBStore);
             }
             }
             }
             ]*/
        });
        me.winBJ = Ext.create('App.ux.window.Window', {
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
                            name: 'for_inv_code'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'qty_do'
                        },{
                            xtype: 'textfield',
                            hidden: true,
                            name: 'rata2_hpp'
                        }
                    ]
                }
            ]
        });

        // *************************************************************************************
        // Window User Form
        // *************************************************************************************
        me.pageBody = [me.ReclassOVBGrid, me.ReclassOBJGrid];
        me.callParent(arguments);
    },
    PostingItem: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record);
        var data_selected = me.ReclassOVBGrid.getSelectionModel();
        var length = data_selected.selected.items.length;
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            form.findField('account').setValue(data.account);
            form.findField('for_inv_code').setValue(data.for_inv_code);
            form.findField('debit').setValue(data.debit);
            var values = form.getValues();
            if(storeIndex == -1){
                store.add(values);
            }else{
                record.set(values);
            }
            store.sync({
                success:function(){
                    store.remove(data_selected.getSelection());
                    Ext.MessageBox.alert('Sukses', '!!!!');
                },
                failure:function(){
                    store.remove(data_selected.getSelection());
                    Ext.MessageBox.alert('Warning', '!!!!');
                }

            });
        };

    },
    PostingItemOBJ: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record);
        var data_selected = me.ReclassOBJGrid.getSelectionModel();
        var length = data_selected.selected.items.length;
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            form.findField('for_inv_code').setValue(data.for_inv_code);
            form.findField('qty_do').setValue(data.qty_do);
            form.findField('rata2_hpp').setValue(data.rata2_hpp);
            var values = form.getValues();
            if(storeIndex == -1){
                store.add(values);
            }else{
                record.set(values);
            }
            store.sync({
                success:function(){
                    store.remove(data_selected.getSelection());
                    Ext.MessageBox.alert('Sukses', '!!!!');
                },
                failure:function(){
                    store.remove(data_selected.getSelection());
                    Ext.MessageBox.alert('Warning', '!!!!');
                }

            });
        };

    },
    SeachingItem: function(btn){
        var getAccount = Ext.getCmp('account_rc').getValue();
        var getSO_NUM = Ext.getCmp('so_num_rc').getValue();
        this.ReclassOVBStore.load({params:{account : getAccount, so_num: getSO_NUM}});
        this.ReclassOBJStore.load({params:{so_num: getSO_NUM}});
    },
    SeachingItemBJ: function(btn){
        var getDok_AR = Ext.getCmp('dok_ar_rc').getValue();
        var getSO_NUM = Ext.getCmp('so_num_rc').getValue();
        this.ReclassOBJStore.load({params:{inv_code : getDok_AR, so_num: getSO_NUM}});
    },

    onActive: function(callback){
        var me = this;
        this.SeachingItem();
        this.SeachingItemBJ();

        callback(true);
    }
});
