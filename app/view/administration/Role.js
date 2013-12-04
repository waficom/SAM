Ext.define('App.view.administration.Role', {
    extend:'App.ux.RenderPanel',
    id:'panelRole',
    pageTitle:'Role Authorization',

    initComponent : function()
    {
        var me = this;

        Ext.define('RoleModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'id', type : 'int'},
                { name : 'role_name', type : 'string'},
                { name : 'role_key', type : 'string'},
                { name : 'seq', type : 'int'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read:Role.getRole,
                    create:Role.addRole,
                    update:Role.updateRole,
                    destroy:Role.deleteRole
                }
            }

        });

        Ext.define('PermissionsModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'id', type : 'int'},
                { name : 'perm_key', type : 'string'},
                { name : 'perm_name', type : 'string'},
                { name : 'perm_cat',type : 'string'},
                { name : 'seq',type : 'int'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read:Role.getPermissions,
                    create:Role.addPermissions,
                    update:Role.updatePermissions,
                    destroy:Role.deletePermissions
                }
            }

        });

        Ext.define('RolePermissionsModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'id', type : 'int'},
                { name : 'role_key', type : 'string'},
                { name : 'role_name', type : 'string'},
                { name : 'perm_key', type : 'string'},
                { name : 'perm_name', type : 'string'},
                { name : 'val', type : 'bool'},
                { name : 'add_date', type : 'date'},
                { name : 'seq', type : 'int'},
                { name : 'perm_cat', type : 'string'},
                { name : 'role_id', type : 'int'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read:Role.getRolePermissions,
                    create:Role.addRolePermissions,
                    update:Role.updateRolePermissions,
                    destroy:Role.deleteRolePermissions
                }
            }

        });

        Ext.define('UserPermissionsModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'id', type : 'int'},
                { name : 'user_id', type : 'string'},
                { name : 'usrname', type : 'string'},
                { name : 'perm_key', type : 'string'},
                { name : 'perm_name', type : 'string'},
                { name : 'val', type : 'bool'},
                { name : 'add_date', type : 'date'},
                { name : 'seq', type : 'int'},
                { name : 'perm_cat', type : 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read:Role.getUserPermissions,
                    create:Role.addUserPermissions,
                    update:Role.updateUserPermissions,
                    destroy:Role.deleteUserPermissions
                }
            }

        });

        me.Rolestore = Ext.create('Ext.data.Store', {
            storeId : 'Rolestore',
            model : 'RoleModel',
            remoteSort : false
        });
        me.Permissionsstore = Ext.create('Ext.data.Store', {
            storeId : 'Permissionsstore',
            model : 'PermissionsModel',
            remoteSort : false
        });
        me.RolePermissionsstore = Ext.create('Ext.data.Store', {
            storeId : 'RolePermissionsstore',
            model : 'RolePermissionsModel',
            remoteSort : false
        });
        me.UserPermissionsstore = Ext.create('Ext.data.Store', {
            storeId : 'UserPermissionsstore',
            model : 'UserPermissionsModel',
            remoteSort : false
        });

        function authCk(val){
            if(val == '1'){
                return '<img src="resources/images/icons/yes.gif" />';
            }else if(val == '0'){
                return '<img src="resources/images/icons/no.gif" />';
            }
            return val;
        }


        me.RoleGrid = Ext.create('Ext.grid.Panel', {
            title:'Role',
            store: Ext.data.StoreManager.lookup('Rolestore'),
            border:false,
            frame:false,
            viewConfig:{
                stripeRows:true
            },
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
                                            hidden : true,
                                            name:'id'
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Nama Role',
                                            name:'role_name',
                                            /*                                            enableKeyEvents : true,
                                             listeners: {
                                             specialkey: function(field, e){
                                             // e.HOME, e.END, e.PAGE_UP, e.PAGE_DOWN,
                                             // e.TAB, e.ESC, arrow keys: e.LEFT, e.RIGHT, e.UP, e.DOWN
                                             if (e.getKey() == e.ENTER) {

                                             var obj = Ext.ComponentQuery.query('#spesifikasi_i')[0];
                                             obj.setValue(this.getValue());

                                             //    var form = field.ownerCt.getForm();

                                             }
                                             }
                                             },
                                             */
                                            width:385
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Role Key',
                                            name:'role_key',
                                            width:385
                                        },
                                        {
                                            xtype : 'numberfield',
                                            fieldLabel : 'Sequential',
                                            name:'seq',
                                            width:385
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
                    header:'ID',
                    width:50,
                    dataIndex:'id'
                },
                {
                    header:'Role Name',
                    width:250,
                    dataIndex:'role_name'
                },
                {
                    header:'Role Key',
                    width:250,
                    dataIndex:'role_key'
                }
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'RoleModel',
                    scope:me,
                    handler:me.onNewRec
                },
                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'RoleModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });
        me.PermissionsGrid = Ext.create('Ext.grid.Panel', {
            title:'Permissions',
            store: Ext.data.StoreManager.lookup('Permissionsstore'),
            border:false,
            frame:false,
            viewConfig:{
                stripeRows:true
            },
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
                                            hidden : true,
                                            name:'id'
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Permissions Key',
                                            name:'perm_key',
                                            width:385
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Permissions Name',
                                            name:'perm_name',
                                            width:385
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Permissions Category',
                                            name:'perm_cat',
                                            width:385
                                        },
                                        {
                                            xtype : 'numberfield',
                                            fieldLabel : 'Sequential',
                                            name:'seq',
                                            width:250
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
                    header:'ID',
                    width:100,
                    dataIndex:'id'
                },
                {
                    header:'Permissions Key',
                    width:250,
                    dataIndex:'perm_key'
                },
                {
                    header:'Permissions Name',
                    width:250,
                    dataIndex:'perm_name'
                },
                {
                    header:'Permissions Category',
                    width:250,
                    dataIndex:'perm_cat'
                },
                {
                    header : 'Sequential',
                    dataIndex : 'seq',
                    width : 100
                }
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'PermissionsModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'PermissionsModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });
        me.RolePermissionsGrid = Ext.create('Ext.grid.Panel', {
            title:'Role Permissions',
            store: Ext.data.StoreManager.lookup('RolePermissionsstore'),
            border:false,
            frame:false,
            viewConfig:{
                stripeRows:true
            },
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
                                            hidden : true,
                                            name:'id'
                                        },
                                        {
                                            xtype:'displayfield',
                                            fieldLabel:'Role Key',
                                            name:'role_key',
                                            width:385
                                        },
                                        {
                                            xtype:'displayfield',
                                            fieldLabel:'Permissions Key',
                                            name:'perm_key',
                                            readonly: 'true',
                                            width:385
                                        },
                                        {
                                            xtype:'mitos.checkbox',
                                            fieldLabel:'Enabled',
                                            name:'val',
                                            width:200
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Date Added',
                                            format : 'd-m-Y h:i:s',
                                            width:350,
                                            name : 'add_date',
                                            disabled : 'true',
                                            readonly : 'true'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                })
            ],
            columns:[
/*
                {
                    header:'ID',
                    width:100,
                    dataIndex:'id'
                },
                {
                    header:'Role Key',
                    width:250,
                    dataIndex:'role_key'
                },
*/
                {
                    header:'Role Name',
                    width:300,
                    dataIndex:'role_name'
                },
/*
                {
                    header:'Permissions Key',
                    width:250,
                    dataIndex:'perm_key'
                },
*/
                {
                    header:'Permissions Name',
                    width:300,
                    dataIndex:'perm_name'
                },
                {
                    header:'Enabled',
                    width:300,
                    dataIndex:'val',
                    renderer: authCk
                },
                {
                    header : 'Date Added',
                    dataIndex : 'add_date',
                    width : 250,
                    disabled : true,
                    renderer:Ext.util.Format.dateRenderer('d-m-Y')
                }
            ],
            tbar:[
/*
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'RolePermissionsModel',
                    scope:me,
                    handler:me.onNewRec
                },
                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'RolePermissionsModel',
                    scope:me,
                    handler:me.onDeleteRec
                },
                '->',
*/
                {
                    xtype : 'fieldcontainer',
                    itemId : 'fieldcontainer_RoleSearch',
                    width : 300,
                    items : [
                        {
                            xtype: 'mitos.rolescombo',
                            fieldLabel : 'Role :',
                            labelWidth : 35,
                            width : 300,
                            labelAlign : 'right',
                            itemId : 'rolesearch',
                            listeners: {
                                change: function () {

                                    me.RolePermissionsstore.load({
                                        params: { role_id : this.getValue() }
                                        }
                                    );

                                }
                            }

                        }
                    ]
                }

            ]
        });
        me.UserPermissionsGrid = Ext.create('Ext.grid.Panel', {
            title:'User Permissions',
            store: Ext.data.StoreManager.lookup('UserPermissionsstore'),
            border:false,
            frame:false,
            viewConfig:{
                stripeRows:true
            },
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
                                            hidden : true,
                                            name:'id'
                                        },
                                        {
                                            xtype:'displayfield',
                                            fieldLabel:'User Name',
                                            name:'usrname',
                                            width:385
                                        },
                                        {
                                            xtype:'displayfield',
                                            fieldLabel:'Permissions Key',
                                            name:'perm_key',
                                            readonly: 'true',
                                            width:385
                                        },
                                        {
                                            xtype:'mitos.checkbox',
                                            fieldLabel:'Enabled',
                                            name:'val',
                                            width:200
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Date Added',
                                            format : 'd-m-Y h:i:s',
                                            width:350,
                                            name : 'add_date',
                                            disabled : 'true',
                                            readonly : 'true'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                })
            ],
            columns:[
                /*
                 {
                 header:'ID',
                 width:100,
                 dataIndex:'id'
                 },
                 {
                 header:'Role Key',
                 width:250,
                 dataIndex:'role_key'
                 },
                 */
                {
                    header:'User Name',
                    width:300,
                    dataIndex:'usrname'
                },
                /*
                 {
                 header:'Permissions Key',
                 width:250,
                 dataIndex:'perm_key'
                 },
                 */
                {
                    header:'Permissions Name',
                    width:300,
                    dataIndex:'perm_name'
                },
                {
                    header:'Enabled',
                    width:300,
                    dataIndex:'val',
                    renderer: authCk
                },
                {
                    header : 'Date Added',
                    dataIndex : 'add_date',
                    width : 250,
                    disabled : true,
                    renderer:Ext.util.Format.dateRenderer('d-m-Y')
                }
            ],
            tbar:[
                /*
                 {
                 text:'Tambah Data',
                 iconCls:'save',
                 action:'RolePermissionsModel',
                 scope:me,
                 handler:me.onNewRec
                 },
                 {
                 text:'Hapus Data',
                 iconCls:'delete',
                 action:'RolePermissionsModel',
                 scope:me,
                 handler:me.onDeleteRec
                 },
                 '->',
                 */
                {
                    xtype : 'fieldcontainer',
                    itemId : 'fieldcontainer_RoleSearch',
                    width : 300,
                    items : [
                        {
                            xtype: 'userscombo',
                            fieldLabel : 'User :',
                            labelWidth : 35,
                            width : 300,
                            labelAlign : 'right',
                            itemId : 'usersearch',
                            listeners: {
                                change: function () {

                                    me.UserPermissionsstore.load({
                                            params: { user_id : this.getValue() }
                                        }
                                    );

                                }
                            }

                        }
                    ]
                }

            ]
        });

/*
        me.AnalisaTBGrid = Ext.create('Ext.grid.Panel', {
            title:'Timbangan',
            store: Ext.data.StoreManager.lookup('ATBstore'),
            border:false,
            frame:false,
            viewConfig:{
                stripeRows:true
            },
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
                                            hidden : true,
                                            name:'co_id'
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'No. Dokumen',
                                            name:'no_doc',
                                            width:385
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tanggal',
                                            format : 'd-m-Y H:i',
                                            submitFormat: 'Y-m-d H:i',
                                            value : new Date(),
                                            name:'tanggal',
                                            width:250
                                        },
                                        {
                                            xtype:'numberfield',
                                            fieldLabel:'Shift',
                                            hideTrigger: true,
                                            name:'shift',
                                            width:200
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Petugas',
                                            name:'petugas',
                                            width:385
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Produk',
                                            name:'produk',
                                            width:385
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Keterangan',
                                            name:'keterangan',
                                            width:385
                                        }
                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:450,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'mitos.currency',
                                            fieldLabel:'Hasil Penimbangan 1',
                                            hideTrigger: true,
                                            name:'hasil1',
                                            width:250,
                                            labelWidth : 150
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            fieldLabel:'Hasil Penimbangan 2',
                                            hideTrigger: true,
                                            name:'hasil2',
                                            width:250,
                                            labelWidth : 150
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            fieldLabel:'Hasil Penimbangan 3',
                                            hideTrigger: true,
                                            name:'hasil3',
                                            width:250,
                                            labelWidth : 150
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            fieldLabel:'Hasil Penimbangan 4',
                                            hideTrigger: true,
                                            name:'hasil4',
                                            width:250,
                                            labelWidth : 150
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            fieldLabel:'Hasil Penimbangan 5',
                                            hideTrigger: true,
                                            name:'hasil5',
                                            width:250,
                                            labelWidth : 150
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
                    header:'No. Dokumen',
                    width:100,
                    dataIndex:'no_doc'
                },
                {
                    header:'Urut',
                    width:50,
                    dataIndex:'urut'
                },
                {
                    header : 'Tanggal',
                    dataIndex : 'tanggal',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y H:i'),
                    width : 100
                },
                {
                    header:'Shift',
                    width:100,
                    dataIndex:'shift'
                },
                {
                    header:'Petugas',
                    width:100,
                    dataIndex:'petugas'
                },
                {
                    header : 'Produk',
                    dataIndex : 'produk',
                    width : 200
                },
                {
                    header : '1',
                    dataIndex : 'hasil1',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    width : 50
                },
                {
                    header : '2',
                    dataIndex : 'hasil2',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    width : 50
                },
                {
                    header : '3',
                    dataIndex : 'hasil3',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    width : 50
                },
                {
                    header : '4',
                    dataIndex : 'hasil4',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    width : 50
                },
                {
                    header : '5',
                    dataIndex : 'hasil5',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    width : 50
                },
                {
                    header : 'Keterangan',
                    dataIndex : 'keterangan',
                    width : 300
                }
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'AnalisaTBModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'AnalisaTBModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });

        me.CoaPanel = Ext.create('Ext.form.Panel', {
            title: 'Search',
            border:false,
            frame:false,
            layout: 'fit',
            id : 'MyPanel',
            items: [
                {
                    xtype : 'fieldcontainer',
                    layout :
                    {
                        type : 'hbox'
                    },
                    defaults :
                    {
                        margin : '0 10 0 10'
                    },
                    hideLabel : true,
                    items : [
                        {
                            xtype : 'textfield',
                            fieldLabel : 'Coa Parent',
                            hideLabel : false,
                            width: 200,
                            name : 'coa_parent',
                            labelAlign : 'right',
                            itemId : 'mbcoa_parent'
                        },
                        {
                            xtype : 'xtCoaPopup',
                            fieldLabel : 'Chart of Account',
                            hideLabel : false,
                            width: 200,
                            name : 'coa_id',
                            store : me.coastore,
                            paramName : '4',
                            labelAlign : 'right',
                            itemId : 'coa_id'
                        }

                    ]
                }
            ]
        })
*/

        me.RolePanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.RoleGrid, me.PermissionsGrid, me.RolePermissionsGrid, me.UserPermissionsGrid]
        });

        me.pageBody = [me.RolePanel];
        me.callParent(arguments);

    }, // end of initComponent

    onNewRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
//        plugin.cancelEdit();
        newModel = Ext.ModelManager.create({}, model);
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
        this.Rolestore.load();
        this.Permissionsstore.load();
        callback(true);
    }
});
//ens LogPage class