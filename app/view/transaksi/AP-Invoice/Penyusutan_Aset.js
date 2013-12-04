Ext.define('App.view.transaksi.AP-Invoice.Penyusutan_Aset', {
    extend: 'App.ux.RenderPanel',
    id: 'panelPenyusutan_Aset2',
    pageTitle: 'Penyusutan Aset',
    uses: ['App.ux.GridPanel'],
    initComponent : function()
    {
        var me = this;
        Ext.define('PAModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id',type: 'string'},
                {name: 'inv_code',type: 'string'},
                {name: 'account',type: 'string'},
                {name: 'coa_nama',type: 'string'},
                {name: 'sisa_umur_aset',type: 'string'},
                {name: 'pa_id',type: 'string'},
                {name: 'sequence_no',type: 'string'},
                {name: 'status_aset',type: 'string'},
                {name: 'debit',type: 'float'},
                {name: 'tanggal_aset',type: 'date'},
                {name: 'timeedit',type: 'date'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Penyusutan_Aset2.getPenyusutan_Aset2,
                    update: Penyusutan_Aset2.updatePenyusutan_Aset2
                }
            }

        });
        me.PAStore = Ext.create('Ext.data.Store', {
            storeId : 'PAStore',
            model : 'PAModel',
            remoteSort : false
        });
        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit','tanggal']
        }
        me.PAGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('PAStore'),
            border:false,
            frame:false,
            listeners: {
                scope: me,
                select: me.onGridClick
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
                                    width:400,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype: 'xtPAPopup',
                                            fieldLabel:'Umur Aset',
                                            name:'pa_id',
                                            width:200
                                        },
                                        {
                                            width: 150,
                                            xtype: 'mitos.checkbox',
                                            fieldLabel: 'Posting',
                                            disabled:true,
                                            itemId:'status_aset',
                                            name: 'status_aset',
                                            handler: function(field, value) {
                                                if (value) {
                                                    Ext.ComponentQuery.query('#tgl_posting_aset')[0].setDisabled(false);
                                                    Ext.ComponentQuery.query('#tgl_posting_aset')[0].setValue(new Date());
                                                }else{
                                                    Ext.ComponentQuery.query('#tgl_posting_aset')[0].setDisabled(true);
                                                }

                                            }
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tanggal',
                                            format : 'd-m-Y',
                                            readOnly:true,
                                            name:'tanggal_aset',
                                            itemId:'tgl_posting_aset',
                                            disabled:true,
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
                    text: 'co_id',
                    sortable: false,
                    dataIndex: 'co_id',
                    hidden: true
                },
                {
                    header : 'Kode Dokumen #',
                    dataIndex : 'inv_code'
                },
                {
                    header : 'Kode Akun',
                    dataIndex : 'account',
                    width : 200
                },
                {
                    header : 'Akun',
                    dataIndex : 'coa_nama',
                    flex:1
                },
                {
                    header : 'Umur Aset #',
                    dataIndex : 'pa_id'
                },
                {
                    header : 'Sisa Umur Aset(Bln) #',
                    dataIndex : 'sisa_umur_aset'
                },
                {
                    header: 'LastUpdate',
                    width : 80,
                    dataIndex: 'timeedit',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y')
                }
            ]
        });

        me.pageBody = [me.PAGrid];
        me.callParent(arguments);

    }, // end of initComponent

    onGridClick:function(grid,selected){
        var me = this;
        Ext.ComponentQuery.query('#status_aset')[0].setDisabled(false);
    },
    onNewRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
        newModel = Ext.ModelManager.create({
        }, model);
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
        this.PAStore.load();
        callback(true);
    }
});
//ens LogPage class