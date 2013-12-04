Ext.define('App.view.transaksi.goodsreceived.GRN_Return', {
    extend: 'App.ux.RenderPanel',
    id: 'panelGRN_Return',
    pageTitle: 'Return Penerimaan Bahan/Barang',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.statusposting= null;
        me.gr_num=null;
        me.userinput =null;
        me.useredit=null;
        Ext.define('GRModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'gr_num',type: 'string'},
                {name: 'grn_return',type: 'string'},
                {name: 'vend_id',type: 'string'},
                {name: 'tgl',type: 'date'},
                {name: 'posted_date',type: 'date'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'status',type: 'string'},
                {name: 'vend_id_trans',type: 'string'},
                {name: 'keterangan',type: 'string'},
                {name: 'gudang_id',type: 'string'},
                {name: 'po_num',type: 'string'},
                {name: 'rc_type',type: 'string'},
                {name: 'timeedit',type: 'date'}
            ]

        });
        me.GRStore = Ext.create('Ext.data.Store', {
            model: 'GRModel',
            proxy: {
                type: 'direct',
                api: {
                    read: GRN_Return.getGRN_Return,
                    create: GRN_Return.addGRN_Return,
                    update: GRN_Return.updateGRN_Return,
                    update: GRN_Return.updateGRN_Return_Posting,
                    destroy : GRN_Return.deleteGRN_Return
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });
        me.GR_ReturnStore = Ext.create('App.store.transaksi.goodsreceived.GRItems');
        me.GRDetailStore = Ext.create('App.store.transaksi.goodsreceived.GRDetail');

        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit']

        }
        me.GRGrid = Ext.create('App.ux.GridPanel', {
            store: me.GRStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {header : 'Goods Recv #',dataIndex : 'gr_num'},
                {header : 'Tanggal',dataIndex : 'tgl',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100},
                {header : 'Return Goods Recv #',dataIndex : 'grn_return'},
                {header : 'PO#',dataIndex : 'po_num'},
                {header : 'Supplier',dataIndex : 'vend_id', flex:1},
                {header : 'Transporter',dataIndex : 'vend_id_trans'},
                { header : 'Gudang',dataIndex : 'gudang_id'},
                {header : 'status',dataIndex : 'status',hidden: true},
                {header : 'rc_type',dataIndex : 'rc_type',hidden: true},
                {header : 'LastUpdate',dataIndex : 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100}],
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1'? 'child-row' : record.get('status') == '2'? 'adult-row' : '';
                }
            },
            listeners: {
                scope: me,
                select: me.onGRGridClick,
                itemdblclick: function(view, record){
                    if(me.statusposting =='1' || me.statusposting =='2'){
                    }else{
                        me.onItemdblclick(me.GRStore, record, 'Edit Goods Received');
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
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange1',
                            items : [
                                {
                                    xtype: 'xtGRPopup',
                                    itemId:'grn_return',
                                    width: 200,
                                    name : 'grn_return',
                                    fieldLabel: 'No. GRN #',
                                    labelWidth : 70
                                }]
                        },
                        {
                            text: 'Tambah Data',
                            iconCls: 'icoArrowRightSmall',
                            scope: me,
                            handler: function(){
                                var form = me.win.down('form').getForm();
                                var topBarItems = this.GRGrid.getDockedItems('toolbar[dock="top"]')[0],
                                    grn_return = topBarItems.getComponent( 'fieldContainerDateRange1' ).getComponent( 'grn_return' ).getValue( )
                                form.findField('grn_return').setValue(grn_return);
                                var values = form.getValues();
                                GRN_Return.addGRN_Return(values,function(provider, response){
                                });
                                me.GRStore.load();
                            },
                            tooltip : 'Tambah Data'
                        },
                        {
                            text: 'Delete',
                            iconCls: 'delete',
                            itemId: 'delete_gr_return',
                            scope: me,
                            handler:function() {
                                me.CallFunctionDel(me.GRStore, me.GRGrid );
                            },
                            tooltip: 'Hapus Data'
                        },'->',
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange',
                            items : [

                                {
                                    xtype : 'datefield',
                                    itemId : 'tgl_posting',
                                    width : 100,
                                    format : 'd-m-Y',
                                    value : new Date(),
                                    maxValue: new Date()
                                }]
                        },{
                            text: 'Posting',
                            iconCls: 'icoArrowRightSmall',
                            itemId:'iconsposting_grn_return',
                            scope: me,
                            handler: function(){
                                var form = me.win.down('form').getForm();
                                var topBarItems = me.GRGrid.getDockedItems('toolbar[dock="top"]')[0],
                                    getDate =  topBarItems.getComponent( 'fieldContainerDateRange' ).getComponent( 'tgl_posting' ).getValue();
                                var data_selected = me.GRGrid.getSelectionModel();
                                var length = data_selected.selected.items.length;
                                for (var i = 0, len = length; i < len; i++) {
                                    var data = data_selected.selected.items[i].data;
                                    form.findField('gr_num').setValue(data.gr_num);
                                    form.findField('posted_date').setValue(getDate);
                                    var values = form.getValues();
                                    GRN_Return.updateGRN_Return_Posting(values, function(provider, response){
                                        if (response.type == 'exception'){
                                            Ext.MessageBox.alert('Error', response.message);
                                        }
                                    });
                                    me.GRStore.load();
                                }
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
                    store: me.GRStore,
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
        me.GR_itemsGrid = Ext.create('App.ux.GridPanel', {
            store: me.GR_ReturnStore,
            region: 'center',
            enablePaging: true,
            columns: [
                {text: 'gr_num', width:70, sortable: false, dataIndex: 'gr_num', hidden: true},
                {text: 'ID', sortable: false, dataIndex: 'bb_id', hidden: true},
                {text: 'Nama Barang', flex: 1, sortable: true, dataIndex: 'bb_nama'},
                {text: 'Qty PO#',  sortable: false, dataIndex: 'qty_po'},
                {text: 'SAT ID', sortable: false, dataIndex: 'sat_id'},
                {text: 'PCS/SAK',  sortable: false, dataIndex: 'qty_pcs'},
                {text: 'Qty Muatan',  sortable: false, dataIndex: 'qty_brutto'},
                {text: 'Qty Return',  sortable: false, dataIndex: 'qty_netto'},
                {text: 'Qty Selisih',  sortable: false, dataIndex: 'qty_selisih'},
                {text: 'Keterangan', flex:1, sortable: true, dataIndex: 'keterangan'}
            ],
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return me.statusposting == '1'? 'child-row' : me.statusposting == '2'? 'adult-row' : '';
                }
            },
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    if(me.statusposting =='1' || me.statusposting =='2'){
                    }else{
                        me.onItemdblclick1(me.GRStore, record, 'Edit GRN Detail');
                    }
                }
            },
            features:[searching],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    store: me.GR_itemsGrid,
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
                        {xtype: 'datefield', hidden: true,name: 'posted_date'},
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
                                    value: 'No. GRN # :'
                                },
                                {
                                    width: 150,
                                    xtype: 'textfield',
                                    name:'gr_num',
                                    readOnly:true
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
                                    value: 'No. GRN Return'
                                },
                                {
                                    width: 150,
                                    xtype: 'xtGRPopup',
                                    name:'grn_return',
                                    readOnly:true
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
                                    value: 'No. PO #'
                                },
                                {
                                    width: 150,
                                    xtype: 'textfield',
                                    name:'po_num',
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
                                    value: 'Suplier'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtVendorSuplierPopup',
                                    name:'vend_id',
                                    readOnly:true
                                },
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Transporter'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtVendorTransporterPopup',
                                    name:'vend_id_trans',
                                    readOnly:true
                                }
                            ]
                        },
                        {
                            xtype: "radiogroup",
                            fieldLabel: "Diterima di ",
                            defaults: {xtype: "radio", name:'rc_type'
                            },
                            items: [
                                {
                                    boxLabel: "Gudang",
                                    inputValue:'R',
                                    readOnly:true,
                                    handler: function(field, value) {
                                        if (value) {
                                            Ext.ComponentQuery.query('#gudang_id_return')[0].setDisabled(false);
                                        }
                                    }

                                },
                                {
                                    boxLabel: "Non Gudang",
                                    inputValue:'B',
                                    readOnly:true,
                                    handler: function(field, value) {
                                        if (value) {
                                            Ext.ComponentQuery.query('#gudang_id_return')[0].setDisabled(true);
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
                                    value: 'Ggd : '
                                },
                                {
                                    width: 100,
                                    xtype: 'xtGudangBMPopup',
                                    name: 'gudang_id',
                                    itemId:'gudang_id_return',
                                    readOlny:true
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
                                    value: 'Keterangan Return : '
                                },
                                {
                                    width: 250,
                                    xtype: 'textfield',
                                    name: 'keterangan',
                                    allowBlank:false
                                }
                            ]
                        }]
                }
            ],
            buttons: [
                {
                    text: 'Save',
                    cls: 'winSave',
                    handler: function(){
                        var form = me.win.down('form').getForm();
                        if(form.isValid()){
                            var values = form.getValues();
                            GRN_Return.updateGRN_Return(values,function(provider, response){
                            });
                            me.GRStore.load();
                            me.win.close();
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
                                    value: 'No. GRN # :'
                                },
                                {
                                    width: 150,
                                    xtype: 'textfield',
                                    name:'gr_num',
                                    readOnly:true
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
                                    value: 'BB ID :'
                                },
                                {
                                    width: 150,
                                    xtype: 'textfield',
                                    name:'bb_id',
                                    readOnly:true
                                },
                                {
                                    xtype: 'displayfield',
                                    name:'bb_nama',
                                    readOnly:true
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
                                    value: 'Qty PO:'
                                },
                                {
                                    width: 150,
                                    xtype: 'numberfield',
                                    hideTrigger:true,
                                    name:'qty_po',
                                    readOnly:true
                                },
                                {
                                    xtype: 'textfield',
                                    name:'sat_id',
                                    readOnly:true
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
                                    value: 'Qty Return # :'
                                },
                                {
                                    width: 80,
                                    xtype: 'numberfield',
                                    hideTrigger:true,
                                    name:'qty_netto',
                                    value:1,
                                    allowBlank:false
                                },{
                                    width: 80,
                                    xtype: 'displayfield',
                                    value: 'Qty (SAK) # :'
                                },
                                {
                                    width: 80,
                                    xtype: 'numberfield',
                                    hideTrigger:true,
                                    name:'qty_pcs',
                                    value:1
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
                                    value: 'Keterangan :'
                                },
                                {
                                    width: 150,
                                    xtype: 'textfield',
                                    name:'keterangan'
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
                        var form = me.winform1.down('form').getForm();
                        if(form.isValid()){
                            /*cek qty apakah dibwah po*/
                            if(form.findField('qty_po').getValue() < form.findField('qty_netto').getValue()){
                                Ext.MessageBox.alert('Warning', 'Qty yg diterima melebihi qty PO');
                            }

                            var values = form.getValues();
                            GoodsReceived.addGRDetail(values,function(provider, response){
                            });
                            me.GR_ReturnStore.load({params:{gr_num: me.gr_num}});
                            me.winform1.close();
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
                    me.action1('close');
                }
            }
        });
        me.pageBody = [me.GRGrid,me.GR_itemsGrid];
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
    onItemdblclick1: function(store, record, title){
        var form = this.winform1.down('form');
        this.setForm(form, title);
        form.getForm().loadRecord(record);
        this.action1('old');
        this.winform1.show();
    },

    onGRGridClick: function(grid, selected){
        var me=this;
        me.gr_num= selected.data.gr_num;
        me.statusposting = selected.data.status;
        var TopBarItems = me.GRGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);

        var deletedata = Ext.ComponentQuery.query('#delete_gr_return')[0],
            iconsPosting = Ext.ComponentQuery.query('#iconsposting_grn_return')[0] ;
        if(selected.data.status==1 || selected.data.status==2){
            deletedata.setDisabled(true);
            iconsPosting.setDisabled(true);
        }else{
            deletedata.setDisabled(false);
            iconsPosting.setDisabled(false);
        }
        me.GR_ReturnStore.load({params:{gr_num: me.gr_num}});

    },

    onItemdblclick: function(store, record, title){
        var form = this.win.down('form');
        this.setForm(form, title);
        form.getForm().loadRecord(record);
        this.action('old');
        this.win.show();
    },

    CallFunctionDel:function(store, grid){
        var me = this,
            sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('gr_num');
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
                    me.GR_ReturnStore.load({params:{gr_num: me.gr_num}});
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
        this.GRStore.load(); // this.GRStore.load({params:{start:0, limit:5}});
        this.GR_ReturnStore.load({params:{start:0, limit:5}});

        callback(true);
    }
});
