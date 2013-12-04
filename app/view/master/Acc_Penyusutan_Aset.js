
Ext.define('App.view.master.Acc_Penyusutan_Aset', {
    extend: 'App.ux.RenderPanel',
    id: 'panelAcc_Penyusutan_Aset',
    pageTitle: 'Jenis Aset',
    uses: ['App.ux.GridPanel'],
    initComponent : function()
    {
        var me = this;

        Ext.define('AkunAsetModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name: 'co_id',type: 'string'},
                { name: 'apa_id',type: 'string'},
                { name: 'description',type: 'string'},
                { name: 'account_master',type: 'string'},
                { name: 'acc_master_desc',type: 'string'},
                { name: 'account_debit',type: 'string'},
                { name: 'acc_debit_desc',type: 'string'},
                { name: 'account_credit',type: 'string'},
                { name: 'acc_credit_desc',type: 'string'},
                { name: 'userinput',type: 'string'},
                { name: 'useredit',type: 'string'},
                { name: 'timeinput',type: 'date'},
                { name: 'timeedit',type: 'date'},
                { name: 'aktif',type: 'bool'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Acc_Penyusutan_Aset.getAcc_Penyusutan_Aset,
                    create: Acc_Penyusutan_Aset.addAcc_Penyusutan_Aset,
                    update: Acc_Penyusutan_Aset.updateAcc_Penyusutan_Aset,
                    destroy: Acc_Penyusutan_Aset.deleteAcc_Penyusutan_Aset
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            }

        });

        me.AkunAsetStore = Ext.create('Ext.data.Store', {
            storeId : 'AkunAsetStore1',
            model : 'AkunAsetModel',
            remoteSort : false,
            pageSize : 10,
            autoLoad: false
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


        me.AkunAsetGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('AkunAsetStore1'),
            border:false,
            frame:false,
            viewConfig:{
                stripeRows:true
            },
            features:[searching],
            plugins:[
                Ext.create('App.ux.grid.RowFormEditing', {
                    autoCancel:false,
                    errorSummary:false,
                    clicksToEdit:1,
                    formItems:[
                        {
                            xtype:'container',
                            layout:'hbox',
                            width:900,
                            items:[
                                {
                                    xtype:'container',
                                    width:450,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode',
                                            name:'apa_id',
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Deskripsi',
                                            name:'description',
                                            width:385
                                        },
                                        {
                                            width: 150,
                                            xtype: 'mitos.checkbox',
                                            fieldLabel: 'Aktif',
                                            name: 'aktif'
                                        }

                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:450,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype: 'xtCoaPopup',
                                            name: 'account_master',
                                            allowBlank: false,
                                            fieldLabel : 'Akun Aset',
                                            width:200
                                        },
                                        {
                                            xtype: 'xtCoaPopup',
                                            name: 'account_debit',
                                            allowBlank: false,
                                            fieldLabel : 'Akun Biaya',
                                            width:200
                                        },
                                        {
                                            xtype: 'xtCoaPopup',
                                            name: 'account_credit',
                                            allowBlank: false,
                                            fieldLabel : 'Akun Akum. Aset',
                                            width:200
                                        }

                                    ]
                                }
                            ]
                        }
                    ]
                })
            ],
            columns:[
                {
                    header:'Company',
                    dataIndex:'co_id',
                    hidden:true
                },
                {
                    header:'Kode',
                    dataIndex:'apa_id'
                },
                {
                    header:'Deskripsi',
                    dataIndex:'description',
                    flex:1
                },
                {
                    header: 'Akun Aset',
                    dataIndex: 'account_master'
                },
                {
                    header: 'Akun Aset Desc ',
                    dataIndex: 'acc_master_desc'
                },
                {
                    header: 'Akun Biaya',
                    dataIndex: 'account_debit'
                },
                {
                    header: 'Akun Biaya Desc ',
                    dataIndex: 'acc_debit_desc'
                },
                {
                    header: 'Akun Akum. Aset',
                    dataIndex: 'account_credit'
                },
                {
                    header: 'Akun Akum. Aset Desc ',
                    dataIndex: 'acc_credit_desc'
                },
                {
                    header: 'Aktif',
                    sortable: true,
                    dataIndex: 'aktif',
                    renderer: authCk
                }
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'AkunAsetModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'AkunAsetModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });

        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.AkunAsetGrid]
        });

        me.pageBody = [/*me.FormulirPanel*/me.AkunAsetGrid];
        me.callParent(arguments);

    }, // end of initComponent

    onNewRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
//        plugin.cancelEdit();
        newModel = Ext.ModelManager.create({ co_id : globals.site }, model);
        store.insert(0, newModel);
        plugin.startEdit(0, 0);
    },

    onDeleteRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin,
            sm = grid.getSelectionModel(),
            selection = grid.getView().getSelectionModel().getSelection()[0];

        plugin.cancelEdit();
        if (selection) {
            Ext.Msg.show({
                title: 'Please Confirm' + '...',
                msg: 'Are you sure want to delete' + ' ?',
                icon: Ext.MessageBox.QUESTION,
                buttons: Ext.Msg.YESNO,
                fn: function(btn){
                    if(btn == 'yes'){
                        store.remove(selection);
                        store.sync();
                        if (store.getCount() > 0) {
                            sm.select(0);
                        }
                    }
                }
            });

        }

    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive : function(callback)
    {
        this.AkunAsetStore.load();
        callback(true);
    }
});
//ens LogPage class