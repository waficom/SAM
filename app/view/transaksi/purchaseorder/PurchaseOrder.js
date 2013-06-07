Ext.define( 'App.view.transaksi.purchaseorder.PurchaseOrder',{
    extend: 'App.ux.RenderPanel',
    id : 'panelPO',
    pageTitle : 'Purchase Order',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.curr_bb_id = null;
        me.curr_co_id = null;
        me.curr_po_num = null;
        me.userinput =null;
        me.useredit=null;
        //me.myWinChooseItem=null;

        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit','pp_date','finishdate','est_finishdate']

        }
        me.POStore = Ext.create( 'App.store.transaksi.purchaseorder.PurchaseOrder' );
        me.POItemsStore = Ext.create('App.store.transaksi.purchaseorder.POItems');
        /**
         * Lists Grid
         */
        me.POGrid = Ext.create('App.ux.GridPanel', {
            store: me.POStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {
                    header : 'Purchase Order #',
                    dataIndex : 'po_num',
                    width : 200
                },
                {
                    header : 'Tanggal',
                    dataIndex : 'tgl',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                },
                {
                    header : 'Supplier',
                    dataIndex : 'vend_nama',
                    width : 200
                },
                {
                    header : '# Penawaran Supplier',
                    dataIndex : 'vend_inq_num',
                    width : 200
                },
                {
                    header : 'Pengadaan Barang',
                    dataIndex : 'pb_num',
                    width : 200
                },
                {
                    header : 'JT Kirim',
                    dataIndex : 'tgl_jt',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                },
                {
                    header : 'PPN',
                    dataIndex : 'ppn_po',
                    width : 50
                },
                {
                    header : 'Total',
                    dataIndex : 'n_netto',
                    renderer: Ext.util.Format.numberRenderer('0,0'),
                    width : 300
                }
            ],
            listeners: {
                scope: me,
                select: me.onPBGridClick,
                itemdblclick: function(view, record){
                    me.onItemdblclick(me.POStore, record, 'Edit PO');
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
                                me.onNewPB(form, 'App.model.transaksi.purchaseorder.PurchaseOrder', 'Tambah Data');
                            },
                            tooltip : 'Tambah Data'
                        },
                        {
                            text: 'Delete',
                            iconCls: 'icoDeleteBlack',
                            itemId: 'listDeleteBtn',
                            scope: me,
                            handler:function() {
                                me.onPBDelete(me.POStore);
                            },
                            tooltip: 'Hapus Data'
                        },{
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange1',
                            items : [

                                {
                                    xtype : 'datefield',
                                    itemId : 'datefrom',
                                    fieldLabel : 'date from',
                                    labelWidth : 35,
                                    //padding : '0 10 0 0',
                                    width : 150,
                                    format : 'd-m-Y',
                                    //labelAlign : 'right',
                                    value : new Date()
                                }]
                        },'-',{
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange',
                            items : [

                                {
                                    xtype : 'datefield',
                                    itemId : 'dateto',
                                    fieldLabel : 'to',
                                    labelWidth : 35,
                                    //padding : '0 10 0 0',
                                    width : 150,
                                    format : 'd-m-Y',
                                    //labelAlign : 'right',
                                    value : new Date()
                                }]
                        },{
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerSearch',
                            layout : 'vbox',
                            items : [
                                {
                                    xtype : 'button',
                                    width : 80,
                                    margin : '0 0 3 0',
                                    text : 'Cari',
                                    listeners :
                                    {
                                        scope : me,
                                        click : me.ReloadGrid
                                    }
                                }]
                        },'->',
                        {
                            xtype:'displayfield',
                            itemId:'itemuserinput',
                            margin : '0 5 0 0'
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.POStore,
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
        /**
         * Options Grid
         */
        me.POItemGrid = Ext.create('App.ux.GridPanel', {
            store: me.POItemsStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {text: 'co_id', width:70, sortable: false, dataIndex: 'co_id', hidden: true},
                {text: 'po_num', width:70, sortable: false, dataIndex: 'po_num', hidden: true},
                {text: 'ID', width:70, sortable: false, dataIndex: 'bb_id'},
                {text: 'Nama Barang', flex: 1, sortable: true, dataIndex: 'bb_nama'},
                {text: 'SAT ID', width:70, sortable: false, dataIndex: 'sat_id', hidden : true},
                {text: 'Satuan', width: 100, sortable: true, dataIndex: 'satuan_nama'},
                {text: 'Qty', width: 100, sortable: false, dataIndex: 'qty'},
                {text: 'Harga', width: 150, sortable: false, dataIndex: 'hrg'},
                {text: 'Jumlah', width: 150, sortable: false, dataIndex: 'n_brutto', hidden: true},
                {text: 'Disc %', width: 150, sortable: false, dataIndex: 'disc_prs', hidden : true},
                {text: 'Discount', width: 150, sortable: false, dataIndex: 'n_disc', hidden : true},
                {text: 'Total', width: 150, sortable: false, dataIndex: 'n_netto'},
                {text: 'Keterangan', flex:1, sortable: true, dataIndex: 'keterangan'}
            ],
            listeners: {
                scope: me,
                //select: me.onGridClick,
                itemdblclick: function(view, record){
                    me.onItemdblclick1(me.POItemsStore, record, 'Edit Detail PO Item');
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
                            var form1 = me.winform1.down('form');
                            me.onNewPB1(form1, 'App.model.transaksi.purchaseorder.POItems', 'Tambah Data');
                        }
                    },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deletePB1(me.POItemsStore);
                            }
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.POItemsStore,
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
                        {name: 'co_id', xtype:'textfield', hidden : true},
                        {name: 'n_disc', xtype: 'numberfield', id:'po_i_n_disc', hidden : true},
                        {name: 'n_bruto', xtype: 'numberfield', id: 'po_i_n_bruto', hidden : true},
                        {name: 'n_ppn', xtype: 'numberfield', id: 'po_i_n_ppn', hidden : true},
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
                                    value: 'Purchase Order # '
                                },
                                {
                                    width: 200,
                                    xtype: 'mitos.UpperCaseTextField',
                                    name : 'po_num',
                                    id : 'po_num_input'
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
                                    name : 'tgl',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s'
                                }
                            ]
                        },{
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [

                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Supplier'
                                },
                                {
                                    width: 200,
                                    xtype: 'xtVendorSuplierPopup',
                                    itemId : 'povend_id',
                                    name : 'vend_id'
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
                                    value: 'Supplier DO #'
                                },
                                {
                                    width: 200,
                                    xtype: 'mitos.UpperCaseTextField',
                                    name : 'vend_do_num'
                                }
                            ]
                        },{
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [

                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Supplier INQ #'
                                },
                                {
                                    width: 200,
                                    xtype: 'mitos.UpperCaseTextField',
                                    name : 'vend_inq_num'
                                }
                            ]
                        },{
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [

                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Invoice #'
                                },
                                {
                                    width: 200,
                                    xtype: 'mitos.UpperCaseTextField',
                                    name : 'inv_num'
                                }
                            ]
                        },{
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [

                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'PB Num'
                                },
                                {
                                    width: 200,
                                    xtype: 'xtPBPopup',
                                    name : 'pb_num'
                                }
                            ]
                        },{
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Tanggal JT:'
                                },
                                {
                                    fieldLabel : 'Tanggal JT',
                                    xtype : 'datefield',
                                    width : 100,
                                    name : 'tgl_jt',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s'
                                }
                            ]
                        },{
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [

                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'PPN'
                                },
                                {
                                    width: 200,
                                    xtype: 'mitos.checkbox',
                                    name : 'ppn_so'
                                },
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Exclude PPN'
                                },
                                {
                                    width: 200,
                                    xtype: 'mitos.checkbox',
                                    name : 'ppn_exc'
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
                            me.onPBSave(form, me.POStore);
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
                        {name:'co_id', xtype:'textfield', hidden : true},
                        {name: 'po_num', xtype: 'textfield', hidden : true},
                        {name: 'n_disc', xtype: 'numberfield', id:'pon_disc_input', hidden : true},
                        {name: 'n_brutto', xtype: 'numberfield', id: 'pon_brutto_input', hidden : true},
                        {name: 'qty_rcv', xtype: 'numberfield', id: 'poqty_rcv_input', hidden : true},
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
                                    value: 'Bahan Baku ID ' + ': '
                                },
                                {
                                    width: 200,
                                    xtype: 'xtBahanBakuPopup',
                                    name: 'bb_id',
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
                                    value: 'satuan :'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtSatuanPopup',
                                    name: 'sat_id'
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
                                    value: 'Qty :'
                                },
                                {
                                    width: 200,
                                    xtype: 'mitos.currency',
                                    name: 'qty',
                                    id : 'poqty_input',
                                    listeners : {
                                        scope : me,
                                        specialkey : me.onEnter
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
                                    value: 'hrg :'
                                },
                                {
                                    width: 200,
                                    xtype: 'mitos.currency',
                                    name: 'hrg',
                                    id : 'pohrg_input',
                                    listeners : {
                                        scope : me,
                                        specialkey : me.onEnter
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
                                    value: 'Disc :'
                                },
                                {
                                    width: 200,
                                    xtype: 'mitos.currency',
                                    name: 'disc_prs',
                                    id : 'podisc_prs_input',
                                    listeners : {
                                        scope : me,
                                        specialkey : me.onEnter
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
                                    value: 'Jumlah :'
                                },
                                {
                                    width: 200,
                                    xtype: 'mitos.currency',
                                    name: 'n_netto',
                                    id : 'pon_netto_input',
                                    listeners : {
                                        scope : me,
                                        specialkey : me.onEnter
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
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
                    text: i18n('save'),
                    cls: 'winSave',
                    handler: function(){
                        var form = me.winform1.down('form').getForm();
                        if(form.isValid()){
                            me.onPB1Save(form, me.POItemsStore);
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
            features:[searching],
            listeners: {
                scope: me,
                close: function(){
                    me.action1('close');
                }
            }
        });



        me.pageBody = [me.POGrid, me.POItemGrid];
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
    action2: function(action){
        var winview = this.winform1, form = winview.down('form');
        if(action == 'close'){
            form.getForm().reset();
        }
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
    onviewdetail: function(form, model,title){

        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({
        }, model);
        form.getForm().loadRecord(newModel);
        record = form.getRecord()
        this.action1('new');
        this.winform1.show();

    },
    onNewPB1: function(form, model, title){
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
    onPBGridClick: function(grid, selected){
        var me = this;
        me.curr_po_num = selected.data.po_num;
        var TopBarItems = this.POGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);
        me.POItemsStore.load({params:{po_num: me.curr_po_num}});

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
                me.POItemsStore.load();
            },
            failure:function(){
                store.load();
                me.msg('Opps!', 'Error!!', true);
            }
        });
    },

    onPB1Save: function(form, store){
        var me = this;
        me.savePB1(form, store);
    },
    savePB1: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record),
            f = me.winform1.down('form').getForm(), rec = f.getRecord();

        form.findField('po_num').setValue(me.curr_po_num);
        values = form.getValues();
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                me.winform1.close();
                // store.load();
            },
            failure:function(){
                //store.load();
                me.msg('Opps!', 'Error!!', true);
            }
        });
        store.load({params:{po_num: me.curr_po_num}});
        //me.DeliveryOrderStore.load();
    },
    onPBDelete: function(store){
        var me = this, grid = me.POGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('po_num');
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
    deletePB1: function(store){
        var me = this, grid = me.POItemGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get(bb_id);
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    PB.deletePB1(bid);
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
        var hrg = 0,
            qty = 0,
            disc_prs = 0,
            n_brutto = 0,
            n_disc = 0,
            n_netto =0;
        if (e.getKey() == e.ENTER)
        {
            qty = Ext.getCmp('poqty_input').getValue();
            hrg = Ext.getCmp('pohrg_input').getValue();
            disc_prs = Ext.getCmp('podisc_prs_input').getValue();
            n_brutto = qty * hrg;
            n_netto = n_brutto;
            if (disc_prs > 0) {
                n_disc = (disc_prs/100)*n_brutto;
                n_netto = n_brutto - n_disc;
            }
        }
        Ext.getCmp('pon_disc_input').setValue(n_disc);
        Ext.getCmp('pon_brutto_input').setValue(n_brutto);
        Ext.getCmp('pon_netto_input').setValue(n_netto);
    },
    ReloadGrid : function(btn)
    {
        // Declare some variables
        var topBarItems = this.POGrid.getDockedItems('toolbar[dock="top"]')[0],
            datefrom = topBarItems.getComponent( 'fieldContainerDateRange1' ).getComponent( 'datefrom' ).getValue( ),
            dateto = topBarItems.getComponent( 'fieldContainerDateRange' ).getComponent( 'dateto' ).getValue( );

        // Load the ExtJs dataStore with the new parameters
        this.POStore.load({params:{datefrom : datefrom, dateto : dateto}});

    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;

        this.ReloadGrid();//this.POStore.load({params:{datefrom : datefrom1, dateto : dateto1}});
        this.POItemsStore.load();

        callback(true);
    }
});
