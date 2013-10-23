
Ext.define('App.view.master.Kapal', {
    extend: 'App.ux.RenderPanel',
    id: 'panelVessel',
    pageTitle: i18n('Kapal'),
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        Ext.define('VesselModel', {
            extend: 'Ext.data.Model',
            fields: [
               {
                    name: 'co_id',
                    type: 'string'
                },
                {
                    name: 'vessel_id',
                    type: 'string'
                },
                {
                    name: 'vessel_name',
                    type: 'string'
                },
                {
                    name: 'aktif',
                    type: 'string'
                },
                {
                    name: 'timeedit',
                    type: 'date'
                }
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: Kapal.getVessel,
                    create: Kapal.addVessel,
                    update: Kapal.updateVessel,
                    destroy: Kapal.deleteVessel
                }
            }
        });
        me.VesselStore = Ext.create('Ext.data.Store', {
            model: 'VesselModel',
            remoteSort: true,
            pageSize: 5
        });
        function authCk(val){
            if(val == '1'){
                return '<img src="resources/images/icons/yes.gif" />';
            }else if(val == '0'){
                return '<img src="resources/images/icons/no.gif" />';
            }
            return val;
        }
        var searching = {
            ftype: 'searching',
            mode: 'local',
            width: 200
        };

        // *************************************************************************************
        // Create the GridPanel
        // *************************************************************************************
        me.VesselGrid = Ext.create('Ext.grid.Panel', {
            store: me.VesselStore,
            enablePaging: true,
           // loadMask: true,
            columns: [
                {text: 'ID Kapal',sortable: true,dataIndex: 'vessel_id'},
                {text: 'Nama Kapal',sortable: true,dataIndex: 'vessel_name', flex:1},
                {
                    text: 'Aktif',
                    sortable: true,
                    dataIndex: 'aktif',
                    renderer: authCk
                },
                {text: 'LastUpdate', dataIndex: 'timeedit',width: 100,renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            features: [searching],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    me.onItemdblclick(me.VesselStore, record, 'Edit Vessel');
                }
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Tambah Data',
                            iconCls: 'save',
                            handler: function(){
                                var form = me.win.down('form');
                                me.onNew(form, 'VesselModel', 'Tambah Data');
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            iconCls: 'delete',
                            handler: function() {
                                me.hapusVessel(me.VesselStore)
                            }
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.VesselStore,
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
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'ID Kapal'
                                },
                                {
                                    width: 100,
                                    xtype: 'mitos.UpperCaseTextField',
                                    name: 'vessel_id',
                                    allowBlank: false,
                                    stripCharsRe: /(^\s+|\s+$)/g
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
                                    value: 'Nama Kapal'
                                },
                                {
                                    width: 250,
                                    xtype: 'textfield',
                                    name: 'vessel_name'
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
                                    fieldLabel: 'Aktif',
                                    name: 'aktif'
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
                        var form = me.win.down('form').getForm();
                        if(form.isValid()){
                            me.onVesselSave(form, me.VesselStore);
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
            listeners: {
                scope: me,
                close: function(){
                    me.action('close');
                }
            }
        });
        // END WINDOW
        me.pageBody = [me.VesselGrid];
        me.callParent(arguments);
    }, // end of initComponent

    onNew: function(form, model, title){
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({}, model);
        form.getForm().loadRecord(newModel);
        this.action('new');
        this.win.show();
    },
    onVesselSave: function(form, store){
        var me = this;
        me.saveVessel(form, store);
    },
    saveVessel: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record);
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                me.win.close();
            },
            failure:function(){
                me.msg('Opps!', 'Error!!', true);
            }
        });
        store.load();
    },
    onItemdblclick: function(store, record, title){
        var form = this.win.down('form');
        this.setForm(form, title);
        form.getForm().loadRecord(record);
        this.action('old');
        this.win.show();
    },
    setForm: function(form, title){
        form.up('window').setTitle(title);
    },
    openWin: function(){
        this.win.show();
    },
    action: function(action){
        var win = this.win, form = win.down('form');
        if(action == 'close'){
            form.getForm().reset();
        }
    },
    hapusVessel: function(store){
        var me = this, grid = me.VesselGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('vessel_id');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Vessel.deleteVessel;
                    store.remove(sr);
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        });
//        store.load();
    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.VesselStore.load();
        callback(true);
    }
});
