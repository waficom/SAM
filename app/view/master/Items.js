Ext.define('App.view.master.Items', {
    extend: 'App.ux.RenderPanel',
    id: 'panelItems',
    pageTitle: 'Product',
    pageLayout: 'border',
//    uses: ['App.ux.GridPanel', 'App.ux.form.Panel', 'Ext.grid.plugin.RowEditing'],
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.currprod_id = null;
        me.curr_coid = null;

        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit','pp_date','finishdate','est_finishdate']

        }

        Ext.define('ItemsModel', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'co_id', type: 'string'},
                { name: 'prod_id', type: 'string'},
                { name: 'prod_nama', type: 'string'},
                { name: 'jenis_id', type: 'string'},
                { name: 'jenis_nama', type: 'string'},
                { name: 'kemasan_id', type: 'string'},
                { name: 'kemasan_nama', type: 'string'},
                { name: 'kemasan_qty', type: 'float'},
                { name: 'satuan_id', type: 'string'},
                { name: 'satuan_nama', type: 'string'},
                { name: 'spesifikasi_id', type: 'string'},
                { name: 'spesifikasi_nama', type: 'string'},
                { name: 'bentuk_id', type: 'string'},
                { name: 'bentuk_nama', type: 'string'},
                { name: 'old_prod_id', type: 'string'},
                { name: 'aktif', type: 'bool'}
            ]

        });
        me.ItemsStore = Ext.create('Ext.data.Store', {
                model: 'ItemsModel',
                proxy: {
                    type: 'direct',
                    api: {
                        read: Items.getitems,
                        create: Items.additems,
                        update: Items.updateitems,
                        destroy: Items.deleteitems
                    }
                },
                autoLoad: false
            });

        Ext.define('PriceModel', {
            extend: 'Ext.data.Model',
            fields: [
                { name: 'co_id', type: 'string'},
                { name: 'prod_id', type: 'string'},
                { name: 'prod_nama', type: 'string'},
                { name: 'harga', type: 'float'},
                { name: 'ppn', type: 'bool'},
                { name: 'promosi', type: 'bool'},
                { name: 'puslit', type: 'bool'},
                { name: 'insentif', type: 'bool'},
                { name: 'tgl_efektif', type: 'date'},
                { name: 'old_prod_id', type: 'string'}
            ]

        });
        me.PriceStore = Ext.create('Ext.data.Store', {
                model: 'PriceModel',
                proxy: {
                    type: 'direct',
                    api: {
                        read: Items.getprice,
                        create: Items.addprice,
                        update: Items.updateprice,
                        destroy: Items.deleteprice
                    }
                },
                autoLoad: false
            });

        Ext.define('JenisPopup', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'jenis_id',type: 'string'},
                {name: 'jenis_nama',type: 'string'}
                // {name: 'timeedit',type: 'date'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: Jenis.getjenis

                }
            }
        });
        me.JenisPopupStore = Ext.create('Ext.data.Store', {
            model: 'JenisPopup',
            autoLoad: true
        });

        Ext.define('KemasanPopup', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'kemasan_id',type: 'string'},
                {name: 'kemasan_nama',type: 'string'},
                {name: 'timeedit',type: 'date'}
                // {name: 'timeedit',type: 'date'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read:  Kemasan.getkemasan

                }
            }
        });
        me.KemasanPopupStore = Ext.create('Ext.data.Store', {
            model: 'KemasanPopup',
            autoLoad: true
        });

        Ext.define('SatuanPopup', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'satuan_id',type: 'string'},
                {name: 'satuan_nama',type: 'string'},
                {name: 'timeedit',type: 'date'}
                // {name: 'timeedit',type: 'date'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read:  Satuan.getsatuan

                }
            }
        });
        me.SatuanPopupStore = Ext.create('Ext.data.Store', {
            model: 'SatuanPopup',
            autoLoad: true
        });

        Ext.define('SpesifikasiPopup', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'spesifikasi_id',type: 'string'},
                {name: 'spesifikasi_nama',type: 'string'}
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
                ,{name: 'af',type: 'string'},
                {name: 'timeedit',type: 'date'}
                // {name: 'timeedit',type: 'date'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read:  Spesifikasi.getspesifikasi

                }
            }
        });
        me.SpesifikasiPopupStore = Ext.create('Ext.data.Store', {
            model: 'SpesifikasiPopup',
            autoLoad: true
        });

        Ext.define('BentukPopup', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'bentuk_id',type: 'string'},
                {name: 'bentuk_nama',type: 'string'},
                {name: 'timeedit',type: 'date'}
                // {name: 'timeedit',type: 'date'}
            ],
            proxy: {
                type: 'direct',
                api: {
                    read:  Bentuk.getBentuk

                }
            }
        });
        me.BentukPopupStore = Ext.create('Ext.data.Store', {
            model: 'BentukPopup',
            autoLoad: true
        });



        function authCk(val){
            if(val == '1'){
                return '<img src="resources/images/icons/yes.gif" />';
            }else if(val == '0'){
                return '<img src="resources/images/icons/no.gif" />';
            }
            return val;
        }

        /**
         * Lists Grid
         */
        me.ItemsGrid = Ext.create('App.ux.GridPanel', {
            store: me.ItemsStore,
            itemId: 'ItemsGrid',
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {text: 'co_id', sortable: false, dataIndex: 'co_id', hidden : true},
                {text: 'ID', width:70, sortable: false, dataIndex: 'prod_id'},
                {text: 'Nama Product', flex: 1, sortable: true, dataIndex: 'prod_nama'},
                {text: 'Jenis ID', flex: 1, sortable: true, dataIndex: 'jenis_id', hidden : true},
                {text: 'Jenis', flex: 1, sortable: true, dataIndex: 'jenis_nama'},
                {text: 'Kemasan ID', flex: 1, sortable: true, dataIndex: 'kemasan_id', hidden : true},
                {text: 'Kemasan', flex: 1, sortable: true, dataIndex: 'kemasan_nama'},
                {text: 'spesifikasi_id', dataIndex: 'spesifikasi_id', hidden : true },
                {text: 'Spesifikasi', flex : 1, dataIndex: 'spesifikasi_nama', sortable : true },
                {text: 'Satuan ID', flex: 1, sortable: true, dataIndex: 'satuan_id', hidden : true},
                {text: 'Satuan', flex: 1, sortable: true, dataIndex: 'satuan_nama'},
                {text: 'Bentuk ID', flex: 1, sortable: true, dataIndex: 'bentuk_id', hidden : true},
                {text: 'Bentuk', flex: 1, sortable: true, dataIndex: 'bentuk_nama'},
                {text: 'Aktif', width:55, sortable: false, dataIndex: 'aktif', renderer: authCk }
            ],
            listeners: {
                scope: me,
                select: me.onItemsGridClick,
                itemdblclick: function(view, record){
                    oldName = record.get('prod_id');
                    record.set("old_prod_id",oldName);
                    me.onItemsdblclick(me.ItemsStore, record, 'Edit Product');
                }
            },
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
                                me.onNewItems(form, 'ItemsModel', 'Tambah Data');
                            },
                            tooltip : 'Tambah Data'
                        },
                        '->',
                        {
                            text: 'Delete',
                            iconCls: 'icoDeleteBlack',
                            itemId: 'listDeleteBtn',
                            scope: me,
                            handler: function () {
                                me.onItemsDelete(me.ItemsStore);
                            },
                            tooltip: 'Hapus Data'
                        }
                    ]
                }
            ]
        });
        /**
         * Options Grid
         */
        me.PriceGrid = Ext.create('App.ux.GridPanel', {
            store: me.PriceStore,
            itemId: 'PriceGrid',
            region: 'center',
            columns: [
                { width: 100, text: 'Company', sortable: true, dataIndex: 'co_id', hidden: true},
                { width: 200, text: 'ID', sortable: true, dataIndex: 'prod_id', hidden: true},
                { width: 200, text: 'Harga', sortable: true, dataIndex: 'harga'},
                { width : 100, text: 'PPN', sortable: true, dataIndex: 'ppn', renderer: authCk},
                { width : 100, text: 'Promosi', sortable: true, dataIndex: 'promosi', renderer: authCk},
                { width : 100, text: 'Puslit', sortable: true, dataIndex: 'puslit', renderer: authCk},
                { width : 100, text: 'Insentif', sortable: true, dataIndex: 'insentif', renderer: authCk},
                { width : 150, text: 'Tanggal Efektif', sortable: true, dataIndex: 'tgl_efektif', renderer: Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    me.onPricedblclick(me.PriceStore, record, 'Edit Detail Harga');
                }
            },
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
                            me.onNewPrice(form1, 'PriceModel', 'Tambah Data');
                        }
                    },'->',
                    {
                        xtype: 'button',
                        text: 'Hapus Data',
                        iconCls: 'delete',
                        handler: function() {
                            me.deletePrice(me.PriceStore);
                        }
                    }]
                }
            ]
        });
        me.JenisGrid = Ext.create('App.ux.GridPanel', {
            store: me.JenisStore,
            columns: [
                {
                    width: 200,
                    text: 'ID',
                    sortable: true,
                    dataIndex: 'jenis_id'
                },
                {
                    flex: 1,
                    text: 'Jenis',
                    sortable: true,
                    dataIndex: 'jenis_nama'
                }
            ],
            listeners: {
                scope: me,
                select: me.onItemGridClick

            },
            features:[searching]

        });
        me.KemasanGrid = Ext.create('App.ux.GridPanel', {
            store: me.KemasanPopupStore,
            columns: [
                {
                    width: 200,
                    text: 'ID',
                    sortable: true,
                    dataIndex: 'kemasan_id'
                },
                {
                    flex: 1,
                    text: 'Kemasan',
                    sortable: true,
                    dataIndex: 'kemasan_nama'
                }
            ],
            listeners: {
                scope: me,
                select: me.onItemGridClick

            },
            features:[searching]

        });
        me.SatuanGrid = Ext.create('App.ux.GridPanel', {
            store: me.SatuanPopupStore,
            columns: [
                {
                    width: 200,
                    text: 'ID',
                    sortable: true,
                    dataIndex: 'satuan_id'
                },
                {
                    flex: 1,
                    text: 'Kemasan',
                    sortable: true,
                    dataIndex: 'satuan_nama'
                }
            ],
            listeners: {
                scope: me,
                select: me.onItemGridClick

            },
            features:[searching]

        });
        me.BentukGrid = Ext.create('App.ux.GridPanel', {
            store: me.BentukPopupStore,
            columns: [
                {
                    width: 200,
                    text: 'ID',
                    sortable: true,
                    dataIndex: 'bentuk_id'
                },
                {
                    flex: 1,
                    text: 'Bentuk',
                    sortable: true,
                    dataIndex: 'bentuk_nama'
                }
            ],
            listeners: {
                scope: me,
                select: me.onItemGridClick

            },
            features:[searching]

        });
        me.SpesifikasiGrid = Ext.create('App.ux.GridPanel', {
            store: me.SpesifikasiPopupStore,
            columns: [
                {
                    width: 200,
                    text: 'ID',
                    sortable: true,
                    dataIndex: 'spesifikasi_id'
                },
                {
                    flex: 1,
                    text: 'Spesifikasi :',
                    sortable: true,
                    dataIndex: 'spesifikasi_nama'
                },
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
                {text: 'AF', width:50, sortable: false,dataIndex: 'af'}
            ],
            listeners: {
                scope: me,
                select: me.onItemGridClick

            },
            features:[searching]

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
                                    value: 'Product ID ' + ': '
                                },
                                {
                                    width: 100,
                                    name: 'prod_id',
                                    xtype: 'mitos.UpperCaseTextField',
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
                                    value: 'Nama Product :'
                                },
                                {
                                    width: 300,
                                    xtype: 'textfield',
                                    name: 'prod_nama'
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
                                    value: 'Jenis ID :'
                                },
                                {
                                    width: 200,
                                    xtype: 'textfield',
                                    name: 'jenis_id',
                                    id: 'jenis_id_item'
                                },
                                {
                                    xtype: 'button',
                                    text :'choose item',
                                    handler: function(){
                                        //me.myWinChooseItem.show();
                                        me.ShowGridPopup(me.JenisPopupStore,'jenis',me.JenisGrid);
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
                                    value: 'Kemasan :'
                                },
                                {
                                    width: 200,
                                    xtype: 'textfield',
                                    name: 'kemasan_id',
                                    id: 'kemasan_id_item'
                                },
                                {
                                    xtype: 'button',
                                    text :'choose item',
                                    handler: function(){
                                        //me.myWinChooseItem.show();
                                        me.ShowGridPopup(me.KemasanPopupStore,'Kemasan',me.KemasanGrid);
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
                                    value: 'Satuan :'
                                },
                                {
                                    width: 200,
                                    xtype: 'textfield',
                                    name: 'satuan_id',
                                    id: 'satuan_id_item'
                                },
                                {
                                    xtype: 'button',
                                    text :'choose item',
                                    handler: function(){
                                        //me.myWinChooseItem.show();
                                        me.ShowGridPopup(me.SatuanPopupStore,'Satuan',me.SatuanGrid);
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
                                    value: 'Spesifikasi :'
                                },
                                {
                                    width: 200,
                                    xtype: 'textfield',
                                    name: 'spesifikasi_id',
                                    id: 'spesifikasi_id_item'
                                },
                                {
                                    xtype: 'button',
                                    text :'choose item',
                                    handler: function(){
                                        //me.myWinChooseItem.show();
                                        me.ShowGridPopup(me.SpesifikasiPopupStore,'Spesifikasi',me.SpesifikasiGrid);
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
                                    value: 'bentuk :'
                                },
                                {
                                    width: 200,
                                    xtype: 'textfield',
                                    name: 'bentuk_id',
                                    id: 'bentuk_id_item'
                                },
                                {
                                    xtype: 'button',
                                    text :'choose item',
                                    handler: function(){
                                        //me.myWinChooseItem.show();
                                        me.ShowGridPopup(me.BentukPopupStore,'Bentuk',me.BentukGrid);
                                    }
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
                            me.onitemsSave(form, me.ItemsStore);
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
                            name: 'prod_id'
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
                                    value: 'Harga  :'
                                },
                                {
                                    width: 100,
                                    xtype: 'mitos.currency',
                                    name: 'harga',
							        hideTrigger: true,
							        keyNavEnabled: false,
							        mouseWheelEnabled: false
                                }                                
                            ]
						},
						{
                            xtype: 'fieldcontainer',
                            msgTarget: 'under',
                            items: [
                                {
                                    width : 150,
                                    xtype: 'mitos.checkbox',
                                    fieldLabel: 'PPN',
                                    name: 'ppn'
                                }
                            ]
						},
						{
                            xtype: 'fieldcontainer',
                            msgTarget: 'under',
                            items: [
                                {
                                    width : 150,
                                    xtype: 'mitos.checkbox',
                                    fieldLabel: 'Promosi',
                                    name: 'promosi'
                                }
                            ]
						},
						{
                            xtype: 'fieldcontainer',
                            msgTarget: 'under',
                            items: [
                                {
                                    width : 150,
                                    xtype: 'mitos.checkbox',
                                    fieldLabel: 'PUSLIT',
                                    name: 'puslit'
                                }
                            ]
						},
						{
                            xtype: 'fieldcontainer',
                            msgTarget: 'under',
                            items: [
                                {
                                    width : 150,
                                    xtype: 'mitos.checkbox',
                                    fieldLabel: 'Insentif',
                                    name: 'insentif'
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
									format: 'd-m-Y',
									submitFormat: 'Y-m-d H:i:s',
									width : 100,
									name : 'tgl_efektif'
									
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
                            me.onPriceSave(form, me.PriceStore);
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
                    me.action1('close');
                }
            }
        });
        
        me.pageBody = [me.ItemsGrid, me.PriceGrid];
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

    /**
     * This wll load a new record to the grid
     * and start the rowEditor
     */
    onNewItems: function(form, model, title){
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({
            }, model);
        form.getForm().loadRecord(newModel);
        this.action('new');
        this.win.show();
    },
    onNewPrice: function(form, model, title){
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
    onItemsGridClick: function(grid, selected){
        var me = this;
        me.currprod_id = selected.data.prod_id;
        me.curr_coid = selected.data.co_id;
        me.PriceStore.load({params:{prod_id: me.currprod_id}});
    },

    onItemsdblclick: function(store, record, title){
        var form = this.win.down('form');
        this.setForm(form, title);
        form.getForm().loadRecord(record);
        this.action('old');
        this.win.show();
    },

    onPricedblclick: function(store, record, title){
        var form = this.winform1.down('form');
        this.setForm(form, title);
        form.getForm().loadRecord(record);
        this.action1('old');
        this.winform1.show();
    },

    onitemsSave: function(form, store){
        var me = this;
			me.saveitem(form, store);
    },
    saveitem: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record);
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        console.log(values);
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

    onPriceSave: function(form, store){
        var me = this;
			me.saveprice(form, store);
    },
    saveprice: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record), 
        f = me.win.down('form').getForm(), rec = f.getRecord();
        
        form.findField('prod_id').setValue(me.currprod_id);
        form.findField('co_id').setValue(me.curr_coid);
        values = form.getValues();
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
//        console.log(values);
        store.sync({
            success:function(){
                me.winform1.close();
            },
            failure:function(){
                store.load();
                me.msg('Opps!', 'Error!!', true);
            }
        });
        store.load();
    },
    onItemsDelete: function(store){
        var me = this, grid = me.ItemsGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('prod_id');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Items.deleteitems(bid);
                    store.remove(sm.getSelection());
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        });
//        store.load();
    },
    deletePrice: function(store){
        var me = this, grid = me.PriceGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('tgl_efektif');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    Items.deleteprice(bid);
                    store.remove(sm.getSelection());
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        });
//        store.load();
    },
    ShowGridPopup: function(store, title, grid){
        this.myWinChooseItem= Ext.create('App.ux.window.Window',{
            layout: 'fit',
            title: title,
            width: 400,
            height: 300,
            items:[grid],
            modal:true

        });
        this.myWinChooseItem.show();
    },
    onItemGridClick: function(grid,selected){ //
        var me = this;
        //var getso_num = grid.getSelectionModel().getSelection()[0].get('so_num');
        var getKemasan= selected.data.kemasan_id;
        var getBentuk= selected.data.bentuk_id;
        var getSatuan= selected.data.satuan_id;
        var getSpesifikasi= selected.data.spesifikasi_id;
        var getJenis= selected.data.jenis_id;

        if(selected.data.kemasan_id != null){
            Ext.getCmp('kemasan_id_item').setValue(getKemasan);
        }else if(selected.data.bentuk_id != null){
            Ext.getCmp('bentuk_id_item').setValue(getBentuk);
        }else if(selected.data.satuan_id != null){
            Ext.getCmp('satuan_id_item').setValue(getSatuan);
        }else if(selected.data.spesifikasi_id != null){
            Ext.getCmp('spesifikasi_id_item').setValue(getSpesifikasi);
        }else if(selected.data.jenis_id != null){
            Ext.getCmp('jenis_id_item').setValue(getJenis);
        }
        me.myWinChooseItem.close();
    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        this.ItemsStore.load();
        this.PriceStore.load();
        callback(true);
    }
});
