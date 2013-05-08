Ext.define( 'App.view.transaksi.workorder.WorkOrder',
    {
        extend : 'App.ux.RenderPanel',
        id : 'panelWO',
        pageTitle : 'Work Order',
        uses : ['App.ux.GridPanel'],
        pageLayout : 'card',

        initComponent : function()
        {
            var me = this;
            me.wo_numsearch = null;
            me.cust_search = null;
            me.curr_co_id = null;
            me.curr_wo_num = null;
            me.curr_prod_id = null;
            me.curr_bb_id = null;

            me.step = [];

            me.WOStore = Ext.create( 'App.store.transaksi.workorder.WorkOrder' );
            me.WOItemsStore = Ext.create('App.store.transaksi.workorder.WOItems');
            me.WObbStore = Ext.create('App.store.transaksi.workorder.WObb');
            /**
             *  Sales Order Search data grid.
             * Gives a list of encounter based on the search
             *
             */
            me.WOGrid = Ext.create( 'Ext.grid.Panel',
                {
                    store : me.WOStore,
                    viewConfig :
                    {
                        stripeRows : true
                    },
                    columns : [
                        {
                            header : 'Work Order #',
                            dataIndex : 'wo_num',
                            width : 200
                        },
                        {
                            header : 'Tanggal',
                            dataIndex : 'tgl',
                            renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                            width : 100
                        },
                        {
                            header : 'Shift#',
                            dataIndex : 'shift',
                            width : 100
                        },
                        {
                            header : 'Kepala Shift',
                            dataIndex : 'ka_shift',
                            flex : 1,
                            width : 200
                        },
                        {
                            header : 'Prev Work Order#',
                            dataIndex : 'wo_num_from',
                            flex : 1,
                            width : 200
                        }],
                    // ToolBar for Encounter DataGrid.
                    tbar : [
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldcontainerwo_numsearch',
                            items : [
                                {
                                    xtype : 'displayfield',
                                    fieldLabel : 'Goods Issued #'
                                },
                                {
                                    xtype : 'textfield',
                                    itemId : 'wo_numsearch',
                                    width : 235,
                                    margin : '0 5 0 0'
                                }]
                        },
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldcontainerwocust_search',
                            items : [
                                {
                                    xtype : 'displayfield',
                                    fieldLabel : 'Kepala Shift'
                                },
                                {
                                    xtype : 'textfield',
                                    itemId : 'cust_search',
                                    width : 235,
                                    margin : '0 5 0 0'
                                }]
                        },
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange',
                            items : [
                                {
                                    xtype : 'datefield',
                                    itemId : 'datefrom',
                                    fieldLabel : 'dari',
                                    labelWidth : 35,
                                    width : 150,
                                    format : 'd-m-Y',
                                    labelAlign : 'right',
                                    value : new Date()
                                },
                                {
                                    xtype : 'datefield',
                                    itemId : 'dateto',
                                    fieldLabel : 'sampai',
                                    labelWidth : 35,
                                    padding : '0 10 0 0',
                                    width : 150,
                                    format : 'd-m-Y',
                                    labelAlign : 'right',
                                    value : new Date()
                                }]
                        }, '-',
                        {
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
                        },
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerAdd',
                            layout : 'vbox',
                            items : [
                                {
                                    xtype : 'button',
                                    width : 100,
                                    margin : '0 0 3 0',
                                    text : 'Tambah Data',
                                    listeners :
                                    {
                                        scope : me,
                                        click : me.onNew
                                    }
                                }]
                        },
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDelete',
                            layout : 'vbox',
                            items : [
                                {
                                    xtype : 'button',
                                    width : 100,
                                    margin : '0 0 3 0',
                                    text : 'Hapus Data',
                                    listeners :
                                    {
                                        scope : me,
                                        click : me.onDelete
                                    }
                                }]
                        }],
                    listeners :
                    {
                        scope : me,
                        itemdblclick: function(view, record){
                            me.rowDblClicked(me.WOStore, record);
                        }

                    }

                });

            /**
             * Panel:
             */
            me.wopnl = Ext.create( 'Ext.panel.Panel',
                {
                    defaultTitle : 'Work Order',
                    title : 'Work Order Detail',
                    layout : 'border',
                    bodyStyle : 'background-color:#fff',
                    items : [
                        Ext.create( 'Ext.container.Container',{
                            region : 'center',
                            layout : 'card',
                            style : 'background-color:#fff',
                            items : [
                                me.GeneralForm = Ext.create( 'Ext.form.Panel',
                                    {
                                        region : 'north',
                                        border : false,
                                        items : [
                                            {
                                                xtype : 'fieldset',
                                                title : 'General Info',
                                                margin : '0 10 0 10',
                                                items : [
                                                    {
                                                        xtype: 'fieldcontainer',
                                                        hidden: true,
                                                        layout: {type: 'hbox'},
                                                        defaults :{margin : '0 10 0 10'},
                                                        hideLabel: true,
                                                        items : [
                                                            {name: 'co_id', xtype:'textfield', hidden : true}
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'fieldcontainer',
                                                        hidden: false,
                                                        layout: {type: 'hbox'},
                                                        defaults :{margin : '0 10 0 10'},
                                                        hideLabel: true,
                                                        items : [
                                                            {
                                                                xtype: 'mitos.UpperCaseTextField',
                                                                name : 'wo_num',
                                                                id : 'wo_num_input',
                                                                width: 400,
                                                                fieldLabel: 'Work Order #',
                                                                labelAlign: 'right',
                                                                allowBlank: false,
                                                                stripCharsRe: /(^\s+|\s+$)/g
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        xtype: 'fieldcontainer',
                                                        hidden: false,
                                                        layout: {
                                                            type: 'hbox'
                                                        },
                                                        defaults :
                                                        {
                                                            margin : '0 10 0 10'
                                                        },
                                                        hideLabel: true,
                                                        items : [
                                                            {
                                                                xtype: 'datefield',
                                                                name : 'tgl',
                                                                width: 270,
                                                                fieldLabel: 'Tanggal',
                                                                labelAlign: 'right',
                                                                submitFormat: 'Y-m-d',
                                                                format : globals['date_display_format']
                                                            }]
                                                    },
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
                                                        items: [
                                                            {
                                                                fieldLabel : 'Shift',
                                                                labelAlign : 'right',
                                                                xtype: 'mitos.UpperCaseTextField',
                                                                name: 'shift'
                                                            }
                                                        ]
                                                    },
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
                                                        items: [
                                                            {
                                                                fieldLabel : 'Kepala Shift',
                                                                labelAlign : 'right',
                                                                xtype: 'mitos.UpperCaseTextField',
                                                                name: 'ka_shift'
                                                            }
                                                        ]
                                                    },
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
                                                        items: [
                                                            {
                                                                fieldLabel : 'WO# Sebelum',
                                                                labelAlign : 'right',
                                                                xtype: 'mitos.UpperCaseTextField',
                                                                width: 400,
                                                                name: 'wo_num_from'
                                                            }
                                                        ]
                                                    },
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
                                                        items: [
                                                            {
                                                                width: 400,
                                                                height: 100,
                                                                fieldLabel : 'Keterangan',
                                                                labelAlign : 'right',
                                                                xtype: 'textareafield',
                                                                name: 'keterangan'
                                                            }
                                                        ]

                                                    }
                                                ]
                                            }]
                                    })
                            ]
                        })
                    ],
                    buttons : [
                        {
                            text : 'Work Order',
                            scope : me,
                            action : 'workorder',
                            tooltip : 'Kembali ke Work Order List',
                            handler : me.onBtnBack
                        }, '->',
                        {
                            text : 'Simpan',
                            scope : me,
                            action : 'save',
                            tooltip : 'Simpan Data',
                            id: 'wo-save-btn',
                            handler: function(){
                                var form = me.GeneralForm.getForm();
                                if(form.isValid()){
                                    me.onBtnSave(form, me.WOStore);
                                }
                            }
                        },
                        {
                            text : 'Batal',
                            scope : me,
                            action : 'cancel',
                            tooltip : 'Batal dan kembali ke Work Order List',
                            handler : me.onBtnCancel
                        },
                        {
                            text : 'Berikut',
                            scope : me,
                            action : 'next',
                            iconCls : 'icoArrowRightSmall',
                            iconAlign : 'right',
                            tooltip : 'Berikutnya',
                            id:'wo-move-next',
                            handler : me.onBtnNext
                        }]
                } );

            me.WObbpnl = Ext.create( 'Ext.panel.Panel',
                {
                    defaultTitle : 'Work Order',
                    title : 'Work Order Bahan Baku',
                    layout : 'border',
                    bodyStyle : 'background-color:#fff',
                    items : [
                        me.WObbGrid = Ext.create('App.ux.GridPanel', {
                            store: me.WObbStore,
                            height: 250,
                            margin: '0 0 3 0',
                            region: 'north',
                            columns: [
                                {text: 'co_id', width:70, sortable: false, dataIndex: 'co_id', hidden: true},
                                {text: 'wo_num', width:70, sortable: false, dataIndex: 'wo_num', hidden: true},
                                {text: 'id', width:70, sortable: false, dataIndex: 'bb_id', hidden: true},
                                {text: 'Bahan Baku', flex: 1, sortable: true, dataIndex: 'bb_nama'},
                                {text: 'SAT ID', width:70, sortable: false, dataIndex: 'sat_id', hidden : true},
                                {text: 'Satuan', width: 100, sortable: true, dataIndex: 'satuan_nama'},
                                {text: 'Qty Stock', width: 100, sortable: false, dataIndex: 'qty_stock'},
                                {text: 'Qty Masuk', width: 100, sortable: false, dataIndex: 'qty_in'},
                                {text: 'Qty Terpakai', width: 100, sortable: false, dataIndex: 'qty_out'},
                                {text: 'Qty Akhir', width: 100, sortable: false, dataIndex: 'qty_last'},
                                {text: 'Keterangan', flex:1, sortable: true, dataIndex: 'keterangan'}
                            ],
                            listeners: {
                                scope: me,
//                                select: me.onItemsGridClick,
                                itemdblclick: function(view, record){
                                    oldName = record.get('bb_id');
                                    record.set("old_bb_id",oldName);
                                    me.onItemsdblclick(me.WObbStore, record, 'Edit Bahan Baku');
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
                                                me.onNewItems(form, 'App.model.transaksi.workorder.WObb', 'Tambah data Bahan Baku');
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
                                                me.onItemsDelete(me.WObbStore);
                                            },
                                            tooltip: 'Hapus Data'
                                        }
                                    ]
                                }
                            ]
                        }),
                        me.WOItemsGrid = Ext.create('App.ux.GridPanel', {
                            store: me.WOItemsStore,
                            region: 'center',
                            columns: [
                                { text: 'company', dataIndex: 'co_id', hidden: true},
                                { text: 'wo_num', dataIndex: 'wo_num', hidden: true},
                                { text: 'id', dataIndex: 'prod_id', hidden: true},
                                { text: 'SAT ID', width:70, sortable: false, dataIndex: 'sat_id', hidden : true},
                                { text: 'Jml PCS/SAK', width: 100, sortable: true, dataIndex: 'qty_pcs'},
                                { text: 'Jml Muatan', width: 100, sortable: true, dataIndex: 'qty'},
                                { text: 'Satuan', width: 100, sortable: true, dataIndex: 'satuan_nama'},
                                { text: 'Keterangan', flex:1, sortable: true, dataIndex: 'keterangan'}
                            ],
                            listeners: {
                                scope: me,
                                itemdblclick: function(view, record){
                                    me.onLocdblclick(me.WOItemsStore, record, 'Edit Detail Product');
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
                                            var form = me.winDtl.down('form');
                                            me.onNewLoc(form, 'App.model.transaksi.workorder.WOItems', 'Tambah Data');
                                        }
                                    },'->',
                                        {
                                            xtype: 'button',
                                            text: 'Hapus Data',
                                            iconCls: 'delete',
                                            handler: function() {
                                                me.onLocDelete(me.WOItemsStore);
                                            }
                                        }]
                                }
                            ]
                        })
                    ],
                    buttons : [
                        {
                            text : 'Kembali',
                            scope : me,
                            action : 'back',
                            iconCls : 'icoArrowLeftSmall',
                            tooltip : 'Kembali ke Awal',
                            id: 'wo-move-prev-1',
                            handler : me.onButtonBack
                        }]
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
                                hidden : true,
                                defaults: {hideLabel: true},
                                msgTarget: 'under',
                                items: [
                                    {name: 'co_id', xtype:'textfield', hidden : true},
                                    {name: 'wo_num', xtype: 'textfield', hidden : true}
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                defaults: { hideLabel: false },
                                anchor : '100%',
                                msgTarget: 'under',
                                items: [
                                    {
                                        width: 400,
                                        name: 'bb_id',
                                        fieldLabel : 'Bahan Baku ',
                                        xtype: 'bblivetsearch',
                                        itemId : 'bb_id',
                                        labelAlign : 'right',
                                        allowBlank: false
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                defaults: { hideLabel: false },
                                msgTarget: 'under',
                                items: [
                                    {
                                        width: 400,
                                        name: 'sat_id',
                                        xtype: 'satuanlivetsearch',
                                        itemId : 'sat_id',
                                        fieldLabel : 'Satuan ',
                                        labelAlign: 'right',
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
                                        value: 'Qty Stock:'
                                    },
                                    {
                                        width: 200,
                                        xtype: 'mitos.currency',
                                        name: 'qty_stock',
                                        id : 'woqty_stock',
                                        hideTrigger: true,
                                        listeners : {
                                            scope : me,
                                            specialkey : me.onEnter
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
                                        value: 'Qty Masuk:'
                                    },
                                    {
                                        width: 200,
                                        xtype: 'mitos.currency',
                                        name: 'qty_in',
                                        id : 'woqty_in',
                                        hideTrigger: true,
                                        listeners : {
                                            scope : me,
                                            specialkey : me.onEnter
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
                                        value: 'Qty Terpakai:'
                                    },
                                    {
                                        width: 200,
                                        xtype: 'mitos.currency',
                                        name: 'qty_out',
                                        id : 'woqty_out',
                                        hideTrigger: true,
                                        listeners : {
                                            scope : me,
                                            specialkey : me.onEnter
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
                                        value: 'Qty Akhir:'
                                    },
                                    {
                                        width: 200,
                                        xtype: 'mitos.currency',
                                        name: 'qty_last',
                                        id : 'woqty_last',
                                        hideTrigger: true,
                                        readOnly : true
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                defaults: {
                                    hideLabel: false
                                },
                                msgTarget: 'under',
                                items: [
                                    {
                                        width: 400,
                                        height: 100,
                                        fieldLabel : 'Keterangan',
                                        labelAlign : 'right',
                                        xtype: 'textareafield',
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
                            var form = me.win.down('form').getForm();
                            if(form.isValid()){
                                me.onitemsSave(form, me.WObbStore);
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
                        me.action(me.win, 'close');
                    }
                }
            });

            // *************************************************************************************
            // Window User Form
            // *************************************************************************************
            me.winDtl = Ext.create('App.ux.window.Window', {
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
                                hidden : true,
                                defaults: {
                                    hideLabel: true
                                },
                                msgTarget: 'under',
                                items: [
                                    {name: 'co_id', xtype:'textfield', hidden : true},
                                    {name: 'wo_num', xtype: 'textfield', hidden : true}
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                defaults: { hideLabel: false },
                                anchor : '100%',
                                msgTarget: 'under',
                                items: [
                                    {
                                        width: 400,
                                        name: 'prod_id',
                                        fieldLabel : 'Product ',
                                        xtype: 'Itemslivetsearch',
                                        itemId : 'prod_id',
                                        labelAlign : 'right',
                                        allowBlank: false
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                defaults: { hideLabel: false },
                                msgTarget: 'under',
                                items: [
                                    {
                                        width: 400,
                                        name: 'sat_id',
                                        xtype: 'satuanlivetsearch',
                                        itemId : 'sat_id',
                                        fieldLabel : 'Satuan ',
                                        labelAlign: 'right',
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
                                        value: 'Qty PCS/SAK:'
                                    },
                                    {
                                        width: 200,
                                        xtype: 'mitos.currency',
                                        name: 'qty_pcs',
                                        id : 'woqty_pcs',
                                        hideTrigger: true
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
                                        width: 200,
                                        xtype: 'mitos.currency',
                                        name: 'qty',
                                        id : 'woqty_netto',
                                        hideTrigger: true
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
                                        width: 300,
                                        height: 100,
                                        xtype: 'textareafield',
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
                            var form = me.winDtl.down('form').getForm();
                            if(form.isValid()){
                                me.onlocSave(form, me.WOItemsStore);
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
                        me.action(me.winDtl, 'close');
                    }
                }
            });

            me.pageBody = [me.WOGrid, me.wopnl, me.WObbpnl];
            me.callParent( arguments );
        },

        /**
         * Event: onBtnClicked
         */
        onBtnClicked : function(btn)
        {
            var datefrom = this.query( 'datefield[itemId="datefrom"]' ),
                dateto = this.query( 'datefield[itemId="dateto"]' );
            if (btn.pressed)
            {
                datefrom[0].reset();
                dateto[0].reset();
            }
            this.ReloadGrid();

        },

        onNew : function(store)
        {
            var me = this, form = me.GeneralForm.getForm();
            form.reset();
            this.goToSODetail();
            Ext.getCmp('wo-move-next').setDisabled(true);
            Ext.getCmp('wo_num_input').setDisabled(false);
        },
        onDelete: function(){
            var me = this,
                grid = me.WOGrid,
                store = grid.getStore(),
                record = grid.getSelectionModel().getSelection(),
                co_id = record[0].get('co_id'),
                wo_num = record[0].get('wo_num');
            if (record != []) {
                Ext.Msg.show({
                    title: 'Please Confirm' + '...',
                    msg: 'Are you sure want to delete' + ' ?',
                    icon: Ext.MessageBox.QUESTION,
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn){
                        if(btn == 'yes'){
                            store.remove(record);
                            store.sync();
                            if (store.getCount() > 0) {
                                grid.getSelectionModel().select(0);
                            }
//                        me.ReloadGrid();
                        }
                    }
                });
            }
        },

        /**
         * Event: rowDblClicked
         */
        rowDblClicked : function(store, record)
        {
            var me = this, form = this.GeneralForm;
            form.loadRecord(record);
            me.curr_wo_num = form.getForm().findField('wo_num').getValue();
            me.curr_co_id = form.getForm().findField('co_id').getValue();
            this.goToSODetail();
            Ext.getCmp('wo-move-next').setDisabled(false);
            Ext.getCmp('wo_num_input').setDisabled(true);
        },

        /**
         * Function: goToSalesOrderDetail
         */
        goToSODetail : function()
        {
            this.getPageBody().getLayout().setActiveItem( 1 );
        },

        /**
         * Function: goToEncounterList
         */
        goToSOList : function()
        {
            this.getPageBody().getLayout().setActiveItem( 0 );
        },

        /**
         * Event: onBtnCancel
         */
        onBtnCancel : function()
        {
            this.getPageBody().getLayout().setActiveItem( 0 );
        },

        /**
         * Event: onBtnBack
         */
        onBtnBack : function()
        {
            this.getPageBody().getLayout().setActiveItem( 0 );
        },

        onButtonBack : function()
        {
            this.getPageBody().getLayout().setActiveItem( 1 );
        },

        /**
         * Event: onBtnNext
         */
        onBtnNext : function()
        {
            var me = this, coid = globals.site;
            me.curr_co_id = coid;
            this.getPageBody().getLayout().setActiveItem( 2 );
            me.WObbStore.load({params:{co_id: coid, wo_num: me.curr_wo_num}});
            me.WOItemsStore.load({params:{co_id: coid, wo_num: me.curr_wo_num}});
        },

        /**
         * Event: onBtnSave
         */
        onBtnSave : function(form, store)
        {
            var me = this, form = me.GeneralForm.getForm( ), record = form.getRecord(), values = form.getValues(),
                storeIndex = store.indexOf(record);
            if(storeIndex == -1){
                store.add(values);
            }else{
                record.set(values);
            }
            /*
             console.log(values);
             */
            store.sync({
                success:function(){
                    me.curr_wo_num = Ext.getCmp('wo_num_input').getValue();
                    Ext.getCmp('wo-move-next').setDisabled(false);
                },
                failure:function(){
                    me.msg('Opps!', 'Error!!', true);
                }
            });
//            store.load();
        },

        /**
         * Function: Search for Sales Order based on the search fields
         * This function will pass all the fields to the server side
         * so PHP dataProvider can calculate and do the search against
         * the SQL Server
         */
        ReloadGrid : function(btn)
        {
            // Declare some variables
            var topBarItems = this.WOGrid.getDockedItems('toolbar[dock="top"]')[0],
                datefrom = topBarItems.getComponent( 'fieldContainerDateRange' ).getComponent( 'datefrom' ).getValue( ),
                dateto = topBarItems.getComponent( 'fieldContainerDateRange' ).getComponent( 'dateto' ).getValue( );

            // Load the ExtJs dataStore with the new parameters
            this.WOStore.load(
                {
                    params :
                    {
                        datefrom : datefrom,
                        dateto : dateto,
                        wo_numsearch : topBarItems.getComponent( 'fieldcontainerwo_numsearch' ).getComponent( 'wo_numsearch' ).getValue( )
//                        cust_search : topBarItems.getComponent( 'fieldcontainerwocust_search' ).getComponent( 'cust_search' ).getValue( )
                    }
                } );

        },

        onNewItems: function(form, model, title){
            var me = this;
            this.setForm(form, title);
            form.getForm().reset();
            var newModel = Ext.ModelManager.create({co_id: me.curr_co_id, wo_num: me.curr_wo_num}, model);
            form.getForm().loadRecord(newModel);
            this.action(this.win, 'new');
            this.win.show();
        },
        onNewLoc: function(form, model, title){
            var me = this;
            this.setForm(form, title);
            form.getForm().reset();
            var newModel = Ext.ModelManager.create({co_id: me.curr_co_id, wo_num: me.curr_wo_num}, model);
            form.getForm().loadRecord(newModel);
            this.action(this.winDtl, 'new');
            this.winDtl.show();
        },
        setForm: function(form, title){
            form.up('window').setTitle(title);
        },
        openWin: function(){
            this.win.show();
        },
        action: function(wnd, action){
            var form = wnd.down('form');
            if(action == 'close'){
                form.getForm().reset();
            }
        },
        onItemsdblclick: function(store, record, title){
            var form = this.win.down('form');
            this.setForm(form, title);
            form.getForm().loadRecord(record);
            this.action(this.win, 'old');
            this.win.show();
        },
        onLocdblclick: function(store, record, title){
            var form = this.winDtl.down('form');
            this.setForm(form, title);
            form.getForm().loadRecord(record);
            this.action(this.winDtl, 'old');
            this.winDtl.show();
        },

        onitemsSave: function(form, store){
            var me = this;
            me.saveitem(form, store);
        },
        onlocSave: function(form, store){
            var me = this;
            me.saveloc(form, store);
        },
        saveitem: function(form, store){
            var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record);
            if(storeIndex == -1){
                store.add(values);
            }else{
                record.set(values);
            }
            store.sync({
                success:function(){
//                    SalesOrder.updateSOnetto(params);
                    me.win.close();
                },
                failure:function(){
                    me.msg('Opps!', 'Error!!', true);
                }
            });
            store.load({params:{co_id: me.curr_co_id, wo_num: me.curr_wo_num}});
        },
        saveloc: function(form, store){
            var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record);
            if(storeIndex == -1){
                store.add(values);
            }else{
                record.set(values);
            }
            store.sync({
                success:function(){
                    me.winDtl.close();
                },
                failure:function(){
                    me.msg('Opps!', 'Error!!', true);
                }
            });
            store.load({params:{co_id: me.curr_co_id, wo_num: me.curr_wo_num}});
        },
        onItemsDelete: function(store){
            var me = this, grid = me.WObbGrid;
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
                        store.remove(sr);
                        store.sync();
                        if (store.getCount() > 0) {
                            sm.select(0);
                        }
                    }
                }
            });
        },

        onLocDelete: function(store){
            var me = this, grid = me.WOItemsGrid;
            sm = grid.getSelectionModel();
            sr = sm.getSelection();
            Ext.Msg.show({
                title: 'Please Confirm' + '...',
                msg: 'Are you sure want to delete' + ' ?',
                icon: Ext.MessageBox.QUESTION,
                buttons: Ext.Msg.YESNO,
                fn: function(btn){
                    if(btn == 'yes'){
                        store.remove(sr);
                        store.sync();
                        if (store.getCount() > 0) {
                            sm.select(0);
                        }
                    }
                }
            });
        },
        onEnter : function(field, e)
        {

        },

        /**
         * This function is called from Viewport.js when
         * this panel is selected in the navigation panel.
         * place inside this function all the functions you want
         * to call every this panel becomes active
         */
        onActive : function(callback)
        {
            this.ReloadGrid();
            callback( true );
        }
    } );



