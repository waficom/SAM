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
        me.currPosted = null;
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
                    width : 180
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
                    width : 150
                },
                {
                    header : '# Penawaran Supplier',
                    dataIndex : 'vend_inq_num',
                    width : 150
                },
                {
                    header : 'Pengadaan Barang',
                    dataIndex : 'pb_num',
                    width : 150
                },
                {
                    header : 'JT Kirim',
                    dataIndex : 'tgl_jt',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                },
                {
                    header : 'Tax Code',
                    dataIndex : 'tax_code',
                    width : 100
                },
                {
                    header : 'Tax Code',
                    dataIndex : 'tax_nama',
                    width : 100,
                    hidden: true
                },
                {
                    header : 'Total',
                    dataIndex : 'netto_total',
                    renderer: Ext.util.Format.numberRenderer('0,0'),
                    width : 100
                },
                {width: 100,text: 'status',sortable: true,dataIndex: 'status', hidden: true},
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
                        me.onItemdblclick(me.POStore, record, 'Edit PO');
                        Ext.getCmp('post_po').setDisabled(false);
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
                                me.onNewPB(form, 'App.model.transaksi.purchaseorder.PurchaseOrder', 'Tambah Data');
                                Ext.getCmp('tgl_po').setValue(new Date());Ext.getCmp('tgl_jt_po').setValue(new Date());
                                Ext.getCmp('tax_cd_po').setValue('NT02');
                            },
                            tooltip : 'Tambah Data'
                        },
                        {
                            text: 'Delete',
                            iconCls: 'icoDeleteBlack',
                            itemId: 'listDeleteBtn',
                            id:'delete_po',
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
                                    width : 150,
                                    format : 'd-m-Y',
                                    value : new Date(),
                                    maxValue: new Date()

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
                                    width : 150,
                                    format : 'd-m-Y',
                                    value : new Date(),
                                    maxValue: new Date()
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
                {text: 'Code Brg', width:70, sortable: false, dataIndex: 'bb_id'},
                {text: 'po_num', width:70, sortable: false, dataIndex: 'po_num', hidden: true},
                {text: 'Nama Barang', flex: 1, sortable: true, dataIndex: 'bb_nama'},
                {text: 'Sat ID', width:70, sortable: false, dataIndex: 'sat_id'},
                {text: 'Qty', width: 100, sortable: false, dataIndex: 'qty'},
                {text: 'Harga', width: 150, sortable: false, dataIndex: 'hrg'},
                {text: 'Jumlah', width: 150, sortable: false, dataIndex: 'n_brutto', hidden: true},
                {text: 'Disc %', width: 150, sortable: false, dataIndex: 'disc_prs', hidden : true},
                {text: 'Discount', width: 150, sortable: false, dataIndex: 'n_disc', hidden : true},
                {text: 'Total', width: 150, sortable: false, dataIndex: 'n_netto'},
                {text: 'Keterangan', flex:1, sortable: true, dataIndex: 'keterangan'}
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
                //select: me.onGridClick,
                itemdblclick: function(view, record){
                    if(me.currPosted =='1' || me.currPosted =='2'){
                    }else{
                        me.onItemdblclick1(me.POItemsStore, record, 'Edit Detail PO Item');
                    }

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
                        id:'add_dt_po',
                        scope: me,
                        handler: function(){
                            var form1 = me.winform1.down('form');
                            me.onNewPB1(form1, 'App.model.transaksi.purchaseorder.POItems', 'Tambah Data');
                        }
                    },
                        {
                            xtype: 'button',
                            text: 'Delete',
                            iconCls: 'delete',
                            id:'delete_dt_po',
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
                                    id : 'po_num_input',
                                    disabled:true
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
                                    submitFormat : 'Y-m-d H:i:s',
                                    id:'tgl_po',
                                    maxValue: new Date(),
                                    allowBlank:false
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
                                    width: 100,
                                    xtype: 'xtVendorSuplierPopup',
                                    itemId : 'povend_id',
                                    name : 'vend_id'
                                },
                                {
                                    width: 150,
                                    xtype: 'displayfield',
                                    name:'vend_nama',
                                    id:'vend_nama_po'
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
                                    submitFormat : 'Y-m-d H:i:s',
                                    id:'tgl_jt_po',
                                    allowBlank:false
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
                                    value: 'Tax Code'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtTaxKPopup',
                                    name : 'tax_code',
                                    id:'tax_cd_po'
                                },
                                {
                                    width: 150,
                                    xtype: 'displayfield',
                                    name:'tax_nama',
                                    id:'tax_code_po'
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
                                    value: 'Posting'
                                },
                                {
                                    width: 100,
                                    xtype: 'mitos.checkbox',
                                    name : 'status',
                                    id:'post_po',
                                    disabled:true

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
                                    value: 'BB ID :'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtBahanBakuPopup',
                                    name: 'bb_id',
                                    allowBlank: false
                                },
                                {
                                    width: 150,
                                    xtype: 'displayfield',
                                    name:'bb_nama',
                                    id:'bb_nama'
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
                                    width: 100,
                                    xtype: 'xtSatuanPopup',
                                    name: 'sat_id',
                                    id:'sat_id_po'
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
                                    width: 100,
                                    xtype: 'mitos.currency',
                                    hideTrigger: true,
                                    name: 'qty',
                                    id : 'poqty_input'
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
                                    width: 150,
                                    xtype: 'mitos.currency',
                                    hideTrigger: true,
                                    name: 'hrg',
                                    id : 'pohrg_input'
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
                                    width: 50,
                                    xtype: 'mitos.currency',
                                    hideTrigger: true,
                                    name: 'disc_prs',
                                    id : 'podisc_prs_input'
                                }
                            ]
                        },
                       /* {
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
                        },*/
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
        me.currPosted = selected.data.status;
        var TopBarItems = this.POGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);
        me.POItemsStore.load({params:{po_num: me.curr_po_num}});
        if(selected.data.status == 1 || selected.data.status == 2){
            Ext.getCmp('delete_po').disable();
            Ext.getCmp('delete_dt_po').disable();
            Ext.getCmp('add_dt_po').disable();
        }else{
            Ext.getCmp('delete_po').enable();
            Ext.getCmp('delete_dt_po').enable();
            Ext.getCmp('add_dt_po').enable();
        }
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
        var me = this, showWin = me.win;
        var StatusPosting = form.findField('status').getValue();
        var CountDetail = me.POItemsStore.getCount({params:{po_num:me.curr_po_num}});
        if(StatusPosting){
            if(CountDetail > 0){
                me.CallFunctionSave(form,store, showWin);
            }else{
                Ext.MessageBox.alert('Warning', 'Detail PO Belum Terisi');
            }
        }else{
            me.CallFunctionSave(form,store, showWin);
        }
        this.ReloadGrid();
    },
    onPB1Save: function(form, store){
        var me = this, showWin = me.winform1;
        form.findField('po_num').setValue(me.curr_po_num);
        me.CallFunctionSave(form,store,showWin);
        store.load({params:{po_num: me.curr_po_num}});
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
                me.msg('Opps!', 'Error!!', true);
            }
        });
    },

    CallFunctionDel:function(store, grid){
        var me=this;
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
                    store.remove(sm.getSelection());
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                    store.load({params:{po_num: me.curr_po_num}});
                    me.POItemsStore.load({params:{po_num: me.curr_po_num}});
                }
            }
        });
    },
    onPBDelete: function(store){
        var me = this, grid = me.POGrid;
        me. CallFunctionDel(store, grid);
    },
    deletePB1: function(store){
        var me = this, grid = me.POItemGrid;
        me. CallFunctionDel(store, grid);
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
