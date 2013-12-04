
Ext.define('App.view.transaksi.salesorder.ReleaseOrder', {
    extend: 'App.ux.RenderPanel',
    id: 'panelRO',
    pageTitle: 'ReleaseOrder',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        Ext.define('ReleaseOrderModel', {
            extend: 'Ext.data.Model',
            fields: [
                { name : 'so_num', type : 'string'},
                { name : 'tanggal',	type : 'date'},
                { name : 'cust_id', type : 'string'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: ReleaseOrder.getReleaseOrder,
                    update: ReleaseOrder.updateReleaseOrder
                }
            }
        });
        me.ReleaseOrderStore = Ext.create('Ext.data.Store', {
            model: 'ReleaseOrderModel',
            remoteSort: true
        });

        var searching = {
            ftype: 'searching',
            mode: 'local',
            width: 200
        };

        // *************************************************************************************
        // Create the GridPanel
        // *************************************************************************************
        me.ReleaseOrderGrid = Ext.create('Ext.grid.Panel', {
            store: me.ReleaseOrderStore,
            columns: [
                {
                    text: 'co_id',
                    sortable: false,
                    dataIndex: 'co_id',
                    hidden: true
                },
                {
                    header : 'Sales Order #',
                    dataIndex : 'so_num',
                    width : 200
                },
                {
                    header : 'Tanggal',
                    dataIndex : 'tanggal',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                },
                {
                    header : 'Customer',
                    dataIndex : 'cust_nama',
                    width : 200
                },
                {
                    header : 'PO# Customer',
                    dataIndex : 'cust_po_num',
                    width : 200
                },
                {
                    header : 'JT Kirim',
                    dataIndex : 'tgl_jt_kirim',
                    width : 100
                },
                {
                    header : 'PPN',
                    dataIndex : 'ppn_so',
                    renderer: me.boolRenderer,
                    width : 50
                },
                {
                    header : 'Netto',
                    dataIndex : 'n_netto',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    width : 300
                }
            ],
            features: [searching],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    oldName = record.get('so_num');
                    record.set("old_so_num",oldName);
                    me.onItemdblclick(me.ReleaseOrderStore, record, 'Release');
                }
            }
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
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 200,
                                    xtype: 'mitos.checkbox',
                                    fieldLabel: 'Release',
                                    labelAlign: 'right',
                                    name: 'released'
                                },{
                                    width: 200,
                                    xtype: 'mitos.checkbox',
                                    fieldLabel: 'Release',
                                    labelAlign: 'right',
                                    name: 'released'
                                }]
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
                                    name : 'released_date',
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
                        var form = me.win.down('form').getForm();
                        if(form.isValid()){
                            me.onReleaseOrderSave(form, me.ReleaseOrderStore);
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
        me.pageBody = [me.ReleaseOrderGrid];
        me.callParent(arguments);
    }, // end of initComponent

    onReleaseOrderSave: function(form, store){
        var me = this;
        me.saveReleaseOrder(form, store);
    },
    saveReleaseOrder: function(form, store){
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


    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.ReleaseOrderStore.load();
        callback(true);
    }
});
