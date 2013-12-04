Ext.define('App.view.master.Account', {
    extend:'App.ux.RenderPanel',
    id:'panelAccount',
    pageTitle:'Akun',

    initComponent : function()
    {
        var me = this;
        Ext.define('AccountModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name: 'co_id',type: 'string'},
                { name: 'coa_id',type: 'string'},
                { name: 'coa_nama',type: 'string'},
                { name: 'coa_level',type: 'string'},
                { name: 'coa_parent',type: 'string'},
                { name: 'keterangan',type: 'string'},
                { name: 'aktif',type: 'bool'},
                { name: 'status',type: 'string'},
                { name: 'dk',type: 'string'},
                { name: 'jenis',type: 'string'},
                { name: 'userinput',type: 'string'},
                { name: 'useredit',type: 'string'},
                { name: 'timeinput',type: 'date'},
                { name: 'timeedit',type: 'date'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: Account.getAccount,
                    create: Account.addAccount,
                    update: Account.updateAccount,
                    destroy: Account.deleteAccount
                }
            }

        });

        me.AccountStore = Ext.create('Ext.data.Store', {
            storeId : 'AccountStore',
            model : 'AccountModel',
            remoteSort : false
        });
/*
        me.JnsStore = Ext.create('Ext.data.Store', {
           field:['nama'],
            data: [
                {"nama":"ASSET"},
                {"nama" :"LIABILITIES"},
                {"nama":"CAPITAL"},
                {"nama":"EXPENSE"},
                {"nama":"REVENUE"}
            ]
        });
*/
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


        me.SatuanGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('AccountStore'),
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
                                            hidden:true,
                                            name:'old_coa_id',
                                            itemId:'old_coa_id'
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Kode Akun',
                                            name:'coa_id',
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Nama Akun',
                                            name:'coa_nama',
                                            width:385
                                        },
                                        {
                                            xtype: "radiogroup",
                                            fieldLabel: "Status ",
                                            width:250,
                                            defaults: {xtype: "radio", name:'status'
                                            },
                                            items: [
                                                {
                                                    boxLabel: "Y",
                                                    inputValue:'Y',
                                                    checked: true
                                                },
                                                {
                                                    boxLabel: "N",
                                                    inputValue:'N'
                                                }
                                            ]
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Akun Parent',
                                            name:'coa_parent',
                                            width:250
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Coa Level',
                                            name:'coa_level',
                                            width:250
                                        }
                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:450,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype: "radiogroup",
                                            fieldLabel: "Debit/Kredit ",
                                            width:250,
                                            defaults: {xtype: "radio", name:'dk'
                                            },
                                            items: [
                                                {
                                                    boxLabel: "Debit",
                                                    inputValue:'D',
                                                    checked: true
                                                },
                                                {
                                                    boxLabel: "Kredit",
                                                    inputValue:'K'
                                                }
                                            ]
                                        },
                                        {
                                            xtype : 'combo',
                                            fieldLabel : 'Jenis',
                                            name:'jenis',
                                            width:250,
                                            enableKeyEvents:true,
                                            typeAhead: true,
                                            mode:'local',
                                            store:[
                                                ['ASSET','ASSET'],
                                                ['LIABILITIES' ,'LIABILITIES'],
                                                ['CAPITAL','CAPITAL'],
                                                ['EXPENSE','EXPENSE'],
                                                ['REVENUE','REVENUE']
                                            ]
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Keterangan',
                                            name:'keterangan',
                                            width:385
                                        },
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
                    header:'Kode Akun',
                    dataIndex:'coa_id'
                },
                {
                    header:'Akun',
                    dataIndex:'coa_nama',
                    flex:1
                },
                {
                    header : 'Keterangan',
                    dataIndex : 'keterangan',
                    flex:1
                },
                {
                    header:'Status',
                    dataIndex:'status'
                },
                {
                    text: 'Aktif',
                    sortable: true,
                    dataIndex: 'aktif',
                    renderer: authCk
                },
                {
                    text: 'LastUpdate', width : 80,
                    dataIndex: 'timeedit',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y')
                }
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'AccountModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'AccountModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });

        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.SatuanGrid]
        });

        me.pageBody = [/*me.FormulirPanel*/ me.SatuanGrid];
        me.callParent(arguments);

    }, // end of initComponent

    onNewRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
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
        this.AccountStore.load();
        callback(true);
    }
});
//ens LogPage class