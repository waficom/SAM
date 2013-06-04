Ext.define('App.view.transaksi.Produksi.Produksi', {
    extend: 'App.ux.RenderPanel',
    id: 'panelProduksi',
    pageTitle: 'Permintaan Produksi',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.currProduksi = null;
        me.curr_coid = null;
        me.userinput =null;
        me.useredit=null;
        //me.myWinChooseItem=null;
        Ext.define('ProduksiModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'no_pp',type: 'string'},
                {name: 'description',type: 'string'},
                {name: 'pabrik_sequence',type: 'string'},
                {name: 'factory',type: 'string'},
                {name: 'pp_date',type: 'date'},
                {name: 'status',type: 'string'},
                {name: 'statusdesc',type: 'string'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'old_no_pp',type: 'string'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: Produksi.getProduksi,
                    create: Produksi.addProduksi,
                    update: Produksi.updateProduksi,
                    destroy: Produksi.deleteProduksi
                }
            }
        });
        me.ProduksiStore = Ext.create('Ext.data.Store', {
            model: 'ProduksiModel',
            autoLoad: false
        });

        Ext.define('Produksi1Model', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'no_pp',type: 'string'}
                ,{name: 'no_ppd',type: 'string'}
                ,{name: 'so_num',type: 'string'}
                ,{name: 'cust_nama',type: 'string'}
                ,{name: 'formula_nama',type: 'string'}
                ,{name: 'formula_id',type: 'string'}
                ,{name: 'prod_nama',type: 'string'}
                ,{name: 'kemasan_nama',type: 'string'}
                ,{name: 'spesifikasi_nama',type: 'string'}
                ,{name: 'n',type: 'string'}
                ,{name: 'p2o5',type: 'string'}
                ,{name: 'k2o',type: 'string'}
                ,{name: 'cao',type: 'string'}
                ,{name: 'mgo',type: 'string'}
                ,{name: 'so4',type: 'string'}
                ,{name: 'b',type: 'string'}
                ,{name: 'cu',type: 'string'}
                ,{name: 'zn',type: 'string'}
                ,{name: 'ah',type: 'string'}
                ,{name: 'af',type: 'string'}
                ,{name: 'finishdate',type: 'date'}
                ,{name: 'est_finishdate',type: 'date'}
                ,{name: 'timeedit',type: 'date'}
                ,{name: 'useredit',type: 'string'}
                ,{name: 'userinput',type: 'string'}
                ,{name: 'old_no_ppd',type: 'string'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: Produksi.getProduksi1,
                    create: Produksi.addProduksi1,
                    update: Produksi.updateProduksi1,
                    destroy: Produksi.deleteProduksi1
                }
            }
        });
        me.Produksi1Store = Ext.create('Ext.data.Store', {
            model: 'Produksi1Model',
            autoLoad: false
        });

        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit','pp_date','finishdate','est_finishdate']

        }

        /**
         * Lists Grid
         */
        me.ProduksiGrid = Ext.create('App.ux.GridPanel', {
            store: me.ProduksiStore,
            itemId: 'ProduksiGrid',
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            enablePaging: true,
            columns: [
                {text: 'No. Produksi', sortable: false, dataIndex: 'no_pp'},
                {text: 'Deskripsi', width:200, sortable: false,dataIndex: 'description'},
                {text: 'sequence_no', width:200, sortable: false,dataIndex: 'pabrik_sequence', hidden: true},
                {text: 'Factory', width:200, sortable: false,dataIndex: 'factory'},
                {text: 'Status', width:200, sortable: false,dataIndex: 'statusdesc'},
                {text: 'status',width:70, sortable: true, dataIndex: 'status',hidden:true},
                {text: 'Tanggal', width : 80, sortable: true, dataIndex: 'pp_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'LastUpdate', dataIndex: 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y')}

            ],
            listeners: {
                scope: me,
               select: me.onProduksiGridClick,
                itemdblclick: function(view, record){
                    oldName = record.get('no_pp');
                    record.set("old_no_pp",oldName);
                    me.onItemdblclick(me.ProduksiStore, record, 'Edit Produksi');
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
                                me.onNewProduksi(form, 'ProduksiModel', 'Tambah Data');
                            },
                            tooltip : 'Tambah Data'
                        },
                        {
                            text: 'Delete',
                            iconCls: 'icoDeleteBlack',
                            itemId: 'listDeleteBtn',
                            scope: me,
                            handler:function() {
                                me.onProduksiDelete(me.ProduksiStore);
                            },
                            tooltip: 'Hapus Data'
                        },{
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange1',
                            items : [

                                {
                                    xtype : 'datefield',
                                    itemId : 'datefrom',
                                    fieldLabel : 'ppdate from',
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
                    store: me.ProduksiStore,
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
        me.Produksi1Grid = Ext.create('App.ux.GridPanel', {
            store: me.Produksi1Store,
            region: 'center',
            enablePaging: true,
            columns: [
                {text: 'NO PP', sortable: false, dataIndex: 'no_pp',  hidden : true},
                {text: 'NO PPD', sortable: false, dataIndex: 'no_ppd'},
                {text: 'Sales Number', width:100, sortable: false,dataIndex: 'so_num'},
                {text: 'Customer', width:150, sortable: false,dataIndex: 'cust_nama'},
                {text: 'Formula', width:100, sortable: false,dataIndex: 'formula_nama'},
                {text: 'Formula id', width:100, sortable: false,dataIndex: 'formula_id', hidden: true},
                {text: 'Produk', width:100, sortable: false,dataIndex: 'prod_nama'},
                {text: 'Kemasan', width:100, sortable: false,dataIndex: 'kemasan_nama'},
                {text: 'Spesifikasi', width:100, sortable: false,dataIndex: 'spesifikasi_nama'},
                {text: 'N', width:50, sortable: false,dataIndex: 'n'},
                {text: 'P2O5', width:50, sortable: false,dataIndex: 'p2o5'},
                {text: 'K2O', width:50, sortable: false,dataIndex: 'k2o'},
                {text: 'CAO', width:50, sortable: false,dataIndex: 'cao'},
                {text: 'MGO', width:50, sortable: false,dataIndex: 'mgo'},
                {text: 'SO4', width:50, sortable: false,dataIndex: 'so4'},
                {text: 'B', width:50, sortable: false,dataIndex: 'b'},
                {text: 'CU', width:50, sortable: false,dataIndex: 'cu'},
                {text: 'ZN', width:50, sortable: false,dataIndex: 'zn'},
                {text: 'AH', width:50, sortable: false,dataIndex: 'ah'},
                {text: 'AF', width:50, sortable: false,dataIndex: 'af'},
                {text: 'tgl selesai', sortable : false, dataIndex: 'finishdate', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'est tgl selesai', width:70, sortable: true, dataIndex: 'est_finishdate', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'LastUpdate', width : 80, sortable: false, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
//flex: 1
            ],
            listeners: {
                scope: me,
                //select: me.onGridClick,
                itemdblclick: function(view, record){
                    oldName = record.get('no_ppd');
                    record.set("old_no_ppd",oldName);
                    me.onItemdblclick1(me.Produksi1Store, record, 'Edit Detail Produksi');
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
                            me.onNewProduksi1(form1, 'Produksi1Model', 'Tambah Data');
                        }
                    },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteProduksi1(me.Produksi1Store);
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'View Detail',
                            scope: me,

                            handler: function(){
                                var form1 = me.winform1.down('form');
                                me.onviewdetail(form1, 'ProduksiModel', 'View Detail');

                            }
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.Produksi1Grid,
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
                            xtype: 'textfield',
                            hidden: true,
                            name: 'co_id'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'no_pp'
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
                                    value: 'Description :'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'description'
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
                                    name : 'pp_date',
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
                                    value: 'Factory:'
                                },
                                {
                                    width: 100,
                                    xtype: 'xtFactoryPopup',
                                    name:'pabrik_sequence'
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
                                    fieldLabel: 'Release',
                                    name: 'status'
                                }]
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
                            me.onProduksiSave(form, me.ProduksiStore);
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
                       {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'co_id'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'no_pp'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'no_ppd'
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
                                    value: 'So Number :'
                                },
                                {
                                    width: 250,
                                    xtype: 'xtSalesOrderPopup',
                                    name :'so_num'
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
                                    value: 'Formula ID:'
                                },
                                {
                                    width: 250,
                                    xtype: 'xtFormulaPopup',
                                    name:'formula_id'
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
                                    value: 'Tanggal selesai :'
                                },
                                {
                                    fieldLabel : 'Tanggal',
                                    xtype : 'datefield',
                                    width : 100,
                                    name : 'finishdate',
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
                                    value: 'est. tgl selesai :'
                                },
                                {
                                    fieldLabel : 'Tanggal',
                                    xtype : 'datefield',
                                    width : 100,
                                    name : 'est_finishdate',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s'
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
                            me.onProduksi1Save(form, me.Produksi1Store);
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



        me.pageBody = [me.ProduksiGrid, me.Produksi1Grid];
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
    onNewProduksi: function(form, model, title){
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
    onNewProduksi1: function(form, model, title){
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
    onProduksiGridClick: function(grid, selected){
        var me = this;
       me.currProduksi = selected.data.no_pp;
       var TopBarItems = this.ProduksiGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);
        me.Produksi1Store.load({params:{no_pp: me.currProduksi}});

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

    onProduksiSave: function(form, store){
        var me = this;
        me.saveProduksi(form, store);
    },
    saveProduksi: function(form, store){
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
                me.Produksi1Store.load();
            },
            failure:function(){
                store.load();
                me.msg('Opps!', 'Error!!', true);
            }
        });
    },

    onProduksi1Save: function(form, store){
        var me = this;
        me.saveProduksi1(form, store);
    },
    saveProduksi1: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record),
            f = me.winform1.down('form').getForm(), rec = f.getRecord();

        form.findField('no_pp').setValue(me.currProduksi);
        //  form.findField('co_id').setValue(me.curr_coid);
        values = form.getValues();
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                me.winform1.close();
                //store.load();
            },
            failure:function(){
                //store.load();
                me.msg('Opps!', 'Error!!', true);
            }
        });
       store.load({params:{no_pp: me.currProduksi}});
    },
    onProduksiDelete: function(store){
        var me = this, grid = me.ProduksiGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('no_pp');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Produksi.deleteProduksi(bid);
                    store.remove(sm.getSelection());
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        });
    },
    deleteProduksi1: function(store){
        var me = this, grid = me.Produksi1Grid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('no_ppd');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Produksi.deleteProduksi1(bid);
                    store.remove(sm.getSelection());
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        })
    },
    ReloadGrid : function(btn)
    {
        // Declare some variables
        var topBarItems = this.ProduksiGrid.getDockedItems('toolbar[dock="top"]')[0],
            datefrom = topBarItems.getComponent( 'fieldContainerDateRange1' ).getComponent( 'datefrom' ).getValue( ),
            dateto = topBarItems.getComponent( 'fieldContainerDateRange' ).getComponent( 'dateto' ).getValue( );

        // Load the ExtJs dataStore with the new parameters
        this.ProduksiStore.load({params:{datefrom : datefrom, dateto : dateto}});

    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        this.ReloadGrid();//this.ProduksiStore.load({params:{start:0, limit:5}});
        this.Produksi1Store.load();

        callback(true);
    }
});
