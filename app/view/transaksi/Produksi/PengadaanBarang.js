Ext.define('App.view.transaksi.Produksi.PengadaanBarang', {
    extend: 'App.ux.RenderPanel',
    id: 'panelPengadaanBarang',
    pageTitle: 'Permintaan Bahan/Barang',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.currPB = null;
        me.curr_coid = null;
        me.userinput =null;
        me.currStatus =null;
        me.useredit=null;
        //me.myWinChooseItem=null;
        Ext.define('PB0Model', {
            extend: 'Ext.data.Model',
            fields: [
                {
                    name: 'co_id',
                    type: 'string'
                },
                {
                    name: 'pb_num',
                    type: 'string'
                },
                {
                    name: 'bagian',
                    type: 'string'
                },
                {
                    name: 'request_by',
                    type: 'string'
                },
                {
                    name: 'status',
                    type: 'string'
                },
                {
                    name: 'tanggal',
                    type: 'date'
                },
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'timeedit',type: 'date'}
            ]

        });
        me.PB0Store = Ext.create('Ext.data.Store', {
            model: 'PB0Model',
            proxy: {
                type: 'direct',
                api: {
                    read: PengadaanBarang.getPB0,
                    create: PengadaanBarang.addPB0,
                    update: PengadaanBarang.updatePB0,
                    destroy : PengadaanBarang.deletePB0
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });

        Ext.define('PengadaanBarangModel', {
            extend: 'Ext.data.Model',
            fields: [
                {
                    name: 'co_id',
                    type: 'string'
                },
                {
                    name: 'pb_num',
                    type: 'string'
                },
                {
                    name: 'pb_type',
                    type: 'string'
                },
                {
                    name: 'qty',
                    type: 'string'
                },
                {
                    name: 'bb_id',
                    type: 'string'
                },
                {
                    name: 'bb_nama',
                    type: 'string'
                },
                {
                    name: 'sat_id',
                    type: 'string'
                },
                {
                    name: 'keterangan',
                    type: 'string'
                },
                {
                    name: 'timeedit',
                    type: 'date'
                }
            ]

        });
        me.PengadaanBarangStore = Ext.create('Ext.data.Store', {
            model: 'PengadaanBarangModel',
            proxy: {
                type: 'direct',
                api: {
                    read: PengadaanBarang.getPB,
                    create: PengadaanBarang.addPB,
                    update: PengadaanBarang.updatePB,
                    destroy : PengadaanBarang.deletePB
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
            mode: 'local',
            width:  200,
            disableIndexes:['timeedit','pp_date','finishdate','est_finishdate']

        }

        /**
         * Lists Grid
         */
        me.PB0Grid = Ext.create('App.ux.GridPanel', {
            store: me.PB0Store,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {text: 'PB Num',sortable: true,dataIndex: 'pb_num'},
                {text: 'Tanggal', width : 80, sortable: true, dataIndex: 'tanggal', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {text: 'Departement',flex:1,sortable: true,dataIndex: 'bagian'},
                {text: 'User Request',sortable: true,dataIndex: 'request_by'},
                {text: 'status',sortable: true,dataIndex: 'status', hidden:true},
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
                    if(me.currStatus =='1' || me.currStatus =='2'){
                    }else{
                        me.onItemdblclick(me.PB0Store, record, 'Edit Pengadaan Bahan');
                        Ext.getCmp('post_pb').setDisabled(false);
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
                                me.onNewPB(form, 'PB0Model', 'Tambah Data');
                                Ext.getCmp('tgl_pb').setValue(new Date());
                                Ext.getCmp('post_pb').setDisabled(true);
                            },
                            tooltip : 'Tambah Data'
                        },
                        {
                            text: 'Delete',
                            iconCls: 'icoDeleteBlack',
                            itemId: 'listDeleteBtn',
                            id:'delete_pb',
                            scope: me,
                            handler:function() {
                                me.onPBDelete(me.PB0Store);
                            },
                            tooltip: 'Hapus Data'
                        },'->',
                        {
                            xtype:'displayfield',
                            itemId:'itemuserinput',
                            margin : '0 5 0 0'
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.PBStore,
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
        me.PengadaanBarangGrid = Ext.create('App.ux.GridPanel', {
            store: me.PengadaanBarangStore,
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {text: 'PB Num',sortable: true,dataIndex: 'pb_num', hidden:true},
                {text: 'bb_id',hidden:true,dataIndex: 'bb_id'},
                {text: 'Bahan Baku',sortable: true,dataIndex: 'bb_nama' },
                {text: 'Satuan',sortable: true,dataIndex: 'sat_id'},
                { text: 'Qty',sortable: true,dataIndex: 'qty' ,renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'Keterangan',flex:1,sortable: true,dataIndex: 'keterangan'},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return me.currStatus == '1'? 'child-row' : me.currStatus == '2'? 'adult-row' : '';
                }
            },
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    if(me.currStatus =='1' || me.currStatus =='2'){
                    }else{
                    me.onItemdblclick1(me.PengadaanBarangStore, record, 'Edit Detail PB');
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
                        id:'add_pb',
                        disabled: true,
                        scope: me,
                        handler: function(){
                            var form1 = me.winform1.down('form');
                            me.onNewPB1(form1, 'PengadaanBarangModel', 'Tambah Data');
                        }
                    },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            id:'delete_dt_pb',
                            disabled: true,
                            handler: function() {
                                me.deletePB1(me.PengadaanBarangStore);
                            }
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.PengadaanBarangStore,
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
                            xtype: 'fieldcontainer',
                            defaults: {hideLabel: true},
                            msgTarget: 'under',
                            name:'pb_num',
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
                                    value: 'Bagian : '
                                },
                                {
                                    width: 250,
                                    xtype: 'textfield',
                                    name: 'bagian',
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
                                    value: 'User Request : '
                                },
                                {
                                    width: 200,
                                    xtype: 'textfield',
                                    name: 'request_by',
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
                                    value: 'Tanggal :'
                                },
                                {
                                    fieldLabel : 'Tanggal',
                                    xtype : 'datefield',
                                    width : 100,
                                    name : 'tanggal',
                                    format : 'd-m-Y',
                                    allowBlank:false,
                                    id:'tgl_pb'
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
                                    value: 'Release'
                                },
                                {
                                    width: 100,
                                    xtype: 'mitos.checkbox',
                                    name : 'status',
                                    id:'post_pb',
                                    disabled: true
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
                            me.onPBSave(form, me.PB0Store);
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
                            name: 'pb_num'
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
                                    width: 100,
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
                                    value: 'Satuan :'
                                },
                                {
                                    width: 80,
                                    xtype: 'xtSatuanPopup',
                                    name: 'sat_id',
                                    id:'sat_id'
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
                                    width: 80,
                                    xtype: 'numberfield',
                                    name: 'qty'
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
                                    width: 250,
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
                            me.onPB1Save(form, me.PengadaanBarangStore);
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



        me.pageBody = [me.PB0Grid, me.PengadaanBarangGrid];
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
        me.currPB = selected.data.pb_num;
        me.currStatus = selected.data.status;
        me.curr_coid = globals['site'];
        var TopBarItems = this.PB0Grid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);
        me.PengadaanBarangStore.load({params:{co_id: me.curr_coid, pb_num: me.currPB}});
        if(selected.data.status == 1 || selected.data.status == 2){
            Ext.getCmp('add_pb').disable();
            Ext.getCmp('delete_pb').disable();
            Ext.getCmp('delete_dt_pb').disable();
        }else{
            Ext.getCmp('add_pb').enable();
            Ext.getCmp('delete_pb').enable();
            Ext.getCmp('delete_dt_pb').enable();
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
        var me = this;
        var StatusPosting = form.findField('status').getValue();
        var CountDetail = me.PengadaanBarangStore.getCount({params:{co_id: me.curr_coid, pb_num: me.currPB}});

        if(StatusPosting){
            if(CountDetail > 0){
                me.CallFucntionSave(store, form);
            }else{
                Ext.MessageBox.alert('Warning', 'Detail Masih Belum Terisi');
            }
        }else{
            me.CallFucntionSave(store, form);
        }

    },


    CallFucntionSave: function(store, form){
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
                me.PengadaanBarangStore.load({params:{co_id: me.curr_coid, pb_num: me.currPB}});
            },
            failure:function(){
                Ext.MessageBox.alert('Opps', 'Error..!!');
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

        form.findField('pb_num').setValue(me.currPB);
        values = form.getValues();
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                me.winform1.close();
            },
            failure:function(){
                Ext.MessageBox.alert('Opps', 'Error..!!');
            }
        });
        store.load({params:{co_id: me.curr_coid, pb_num: me.currPB}});
    },
    onPBDelete: function(store){
        var me = this, grid = me.PB0Grid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('pb_num');
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
                    me.PengadaanBarangStore.load({params:{co_id: me.curr_coid, pb_num: me.currPB}});
                }
            }
        });
    },
    deletePB1: function(store){
        var me = this, grid = me.PengadaanBarangGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('pb_num');
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

    onActive: function(callback){
        var me = this;
        this.PB0Store.load({params:{start:0, limit:5}});
        this.PengadaanBarangStore.load({params:{co_id: me.curr_coid, pb_num: me.currPB}});

        callback(true);
    }
});
