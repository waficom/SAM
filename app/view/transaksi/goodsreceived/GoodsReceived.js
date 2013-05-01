/**
 GaiaEHR (Electronic Health Records)
 Billing.js
 Billing Forms
 Copyright (C) 2012 Certun, inc.

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
Ext.define( 'App.view.transaksi.goodsreceived.GoodsReceived',
    {
        extend : 'App.ux.RenderPanel',
        id : 'panelGR',
        pageTitle : 'Goods Received',
        uses : ['App.ux.GridPanel'],
        pageLayout : 'card',

        initComponent : function()
        {
            var me = this;
            me.gr_numsearch = null;
            me.cust_search = null;
            me.curr_prod_id = null;
            me.curr_co_id = null;
            me.curr_gr_num = null;

            me.step = [];

            me.GRStore = Ext.create( 'App.store.transaksi.goodsreceived.GoodsReceived' );
            me.GRItemsStore = Ext.create('App.store.transaksi.goodsreceived.GRItemsStore');
            me.GRDetailStore = Ext.create('App.store.transaksi.goodsreceived.GRDetailStore');
            /**
             *  Sales Order Search data grid.
             * Gives a list of encounter based on the search
             *
             */
            me.GRGrid = Ext.create( 'Ext.grid.Panel',
                {
                    store : me.GRStore,
                    viewConfig :
                    {
                        stripeRows : true
                    },
                    columns : [
                        {
                            header : 'Goods Recv #',
                            dataIndex : 'gr_num',
                            width : 200
                        },
                        {
                            header : 'Tanggal',
                            dataIndex : 'tgl',
                            renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                            width : 100
                        },
                        {
                            header : 'PO#',
                            dataIndex : 'po_num',
                            width : 200
                        },
                        {
                            header : 'Supplier',
                            dataIndex : 'vend_nama',
                            width : 200
                        },
                        {
                            header : 'Transporter',
                            dataIndex : 'vend_tr_nama',
                            width : 200
                        }],
                    // ToolBar for Encounter DataGrid.
                    tbar : [
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldcontainergr_numsearch',
                            items : [
                                {
                                    xtype : 'displayfield',
                                    fieldLabel : 'Goods Received #'
                                },
                                {
                                    xtype : 'textfield',
                                    itemId : 'gr_numsearch',
                                    width : 235,
                                    margin : '0 5 0 0'
                                }]
                        },
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldcontainervend_search',
                            items : [
                                {
                                    xtype : 'displayfield',
                                    fieldLabel : 'Supplier'
                                },
                                {
                                    xtype : 'textfield',
                                    itemId : 'vend_search',
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
                            me.rowDblClicked(me.GRStore, record);
                        }

                    }

                });

            /**
             * Panel:
             */
            me.grpnl = Ext.create( 'Ext.panel.Panel',
                {
                    defaultTitle : 'Goods Received',
                    title : 'Goods Received Detail',
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
                                                                name : 'gr_num',
                                                                id : 'gr_num_input',
                                                                width: 400,
                                                                fieldLabel: 'Goods Recv #',
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
                                                        items : [
                                                            {
                                                                xtype : 'vendorlivetsearch',
                                                                fieldLabel : 'Supplier',
                                                                hideLabel : false,
                                                                width: 400,
                                                                itemId : 'vend_id',
                                                                name : 'vend_id',
                                                                labelAlign : 'right'
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
                                                        items : [
                                                            {
                                                                xtype : 'vendorlivetsearch',
                                                                fieldLabel : 'Transporter',
                                                                hideLabel : false,
                                                                width: 400,
                                                                itemId : 'vend_id_trans',
                                                                name : 'vend_id_trans',
                                                                labelAlign : 'right'
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
                                                        items : [
                                                            {
                                                                xtype: 'mitos.UpperCaseTextField',
                                                                name : 'po_num',
                                                                fieldLabel: 'PO #',
                                                                labelAlign: 'right',
                                                                width : 400
                                                            }]
                                                    }
                                                ]
                                            }]
                                    })
                            ]
                        })
                    ],
                    buttons : [
                        {
                            text : 'Goods Received',
                            scope : me,
                            action : 'encounters',
                            tooltip : 'Kembali ke Goods Received',
                            handler : me.onBtnBack
                        }, '->',
                        {
                            text : 'Simpan',
                            scope : me,
                            action : 'save',
                            tooltip : 'Simpan Data',
                            id: 'save-btn',
                            handler: function(){
                                var form = me.GeneralForm.getForm();
                                if(form.isValid()){
                                    me.onBtnSave(form, me.GRStore);
                                }
                            }
                        },
                        {
                            text : 'Batal',
                            scope : me,
                            action : 'cancel',
                            tooltip : 'Batal dan kembali ke Goods Received',
                            handler : me.onBtnCancel
                        },
                        {
                            text : 'Berikut',
                            scope : me,
                            action : 'next',
                            iconCls : 'icoArrowRightSmall',
                            iconAlign : 'right',
                            tooltip : 'Berikutnya',
                            id:'move-next',
                            handler : me.onBtnNext
                        }]
                } );

            me.GRItemspnl = Ext.create( 'Ext.panel.Panel',
                {
                    defaultTitle : 'Goods Received',
                    title : 'Goods Received Items',
                    layout : 'border',
                    bodyStyle : 'background-color:#fff',
                    items : [
                        me.ItemsGrid = Ext.create('App.ux.GridPanel', {
                            store: me.SOItemsStore,
                            height: 250,
                            margin: '0 0 3 0',
                            region: 'north',
                            columns: [
                                {text: 'co_id', width:70, sortable: false, dataIndex: 'co_id', hidden: true},
                                {text: 'gr_num', width:70, sortable: false, dataIndex: 'gr_num', hidden: true},
                                {text: 'ID', width:70, sortable: false, dataIndex: 'bb_id'},
                                {text: 'Nama Product', flex: 1, sortable: true, dataIndex: 'bb_nama'},
                                {text: 'SAT ID', width:70, sortable: false, dataIndex: 'sat_id', hidden : true},
                                {text: 'Satuan', width: 100, sortable: true, dataIndex: 'satuan_nama'},
                                {text: 'Qty', width: 100, sortable: false, dataIndex: 'qty'},
                                {text: 'Keterangan', flex:1, sortable: true, dataIndex: 'keterangan'}
                            ],
                            listeners: {
                                scope: me,
                                select: me.onItemsGridClick,
                                itemdblclick: function(view, record){
                                    oldName = record.get('bb_id');
                                    record.set("old_bb_id",oldName);
                                    me.onItemsdblclick(me.GRItemsStore, record, 'Edit Bahan Baku');
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
                                                me.onNewItems(form, 'App.model.transaksi.goodsreceived.GRItems', 'Tambah data Bahan Baku');
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
                                                me.onItemsDelete(me.GRItemsStore);
                                            },
                                            tooltip: 'Hapus Data'
                                        }
                                    ]
                                }
                            ]
                        }),
                        me.LocationGrid = Ext.create('App.ux.GridPanel', {
                            store: me.SOLocationStore,
                            region: 'center',
                            columns: [
                                { text: 'company', dataIndex: 'co_id', hidden: true},
                                { text: 'gr_num', dataIndex: 'gr_num', hidden: true},
                                { text: 'id', dataIndex: 'bb_id', hidden: true},
                                { text: 'urut', dataIndex: 'urut', hidden: true},
                                { text: 'Nopol', width:100, sortable: true, dataIndex: 'nopol'},
                                { text: 'Kecamatan', width: 100, sortable: true, dataIndex: 'lokasi_kec'},
                                { text: 'Kabupaten', width: 100, sortable: true, dataIndex: 'lokasi_kab'},
                                { text: 'Qty', width: 50, sortable: false, dataIndex: 'qty'},
                                { text: 'SAT ID', width:70, sortable: false, dataIndex: 'sat_id', hidden : true},
                                { text: 'Satuan', width: 100, sortable: true, dataIndex: 'satuan_nama'},
                                { text: 'Keterangan', flex:1, sortable: true, dataIndex: 'keterangan'}
                            ],
                            listeners: {
                                scope: me,
                                itemdblclick: function(view, record){
                                    me.onLocdblclick(me.SOLocationStore, record, 'Edit Detail Qty');
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
                                            var form = me.winLoc.down('form');
                                            me.onNewLoc(form, 'App.model.transaksi.salesorder.SOLocation', 'Tambah Data');
                                        }
                                    },'->',
                                        {
                                            xtype: 'button',
                                            text: 'Hapus Data',
                                            iconCls: 'delete',
                                            handler: function() {
                                                me.onLocDelete(me.SOLocationStore);
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
                            id: 'move-prev-1',
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
                                    {name:'co_id', xtype:'textfield', hidden : true},
                                    {name: 'so_num', xtype: 'textfield', hidden : true},
                                    {name: 'n_disc', xtype: 'numberfield', id:'n_disc_input', hidden : true},
                                    {name: 'n_brutto', xtype: 'numberfield', id: 'n_brutto_input', hidden : true},
                                    {name: 'hrg_lain', xtype: 'numberfield', id: 'hrg_lain_input', hidden : true}
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
                                        fieldLabel : 'Product ID ',
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
                                    hideLabel : false,
                                    margin: '0 0 0 0'
                                },
                                msgTarget: 'under',
                                items: [
                                    {
                                        width: 200,
                                        xtype: 'mitos.currency',
                                        name: 'qty',
                                        id : 'qty_input',
                                        fieldLabel : 'Qty ',
                                        labelAlign: 'right',
                                        hideTrigger: true,
                                        listeners : {
                                            scope : me,
                                            specialkey : me.onEnter
                                        }
                                    },
                                    {
                                        width: 200,
                                        xtype: 'mitos.currency',
                                        name: 'hrg',
                                        id : 'hrg_input',
                                        fieldLabel : 'Harga',
                                        labelAlign: 'right',
                                        hideTrigger: true,
                                        margin: '0 0 0 -15',
                                        listeners : {
                                            scope : me,
                                            specialkey : me.onEnter
                                        }
                                    },
                                    {
                                        width: 150,
                                        xtype: 'mitos.currency',
                                        name: 'disc_prs',
                                        fieldLabel : 'Diskon % ',
                                        labelAlign : 'right',
                                        id : 'disc_prs_input',
                                        margin: '0 0 0 -15',
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
                                    hideLabel: false
                                },
                                msgTarget: 'under',
                                items: [
                                    {
                                        width: 300,
                                        xtype: 'mitos.currency',
                                        name: 'n_netto',
                                        id : 'n_netto_input',
                                        fieldLabel : 'Jumlah ',
                                        labelAlign : 'right',
                                        hideTrigger: true,
                                        readonly : true
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
                                        width: 200,
                                        xtype: 'mitos.currency',
                                        name: 'hrg_loco',
                                        id : 'hrg_loco_input',
                                        fieldLabel : 'Harga Loco ',
                                        labelAlign : 'right',
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
                                    hideLabel: false
                                },
                                msgTarget: 'under',
                                items: [
                                    {
                                        width: 200,
                                        xtype: 'mitos.currency',
                                        name: 'hrg_transport',
                                        id : 'hrg_transport_input',
                                        fieldLabel : 'Harga Transport ',
                                        labelAlign : 'right',
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
                                    hideLabel: false
                                },
                                msgTarget: 'under',
                                items: [
                                    {
                                        width: 200,
                                        xtype: 'mitos.currency',
                                        name: 'hrg_promosi',
                                        id : 'hrg_promosi_input',
                                        fieldLabel : 'Harga Promosi ',
                                        labelAlign : 'right',
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
                                    hideLabel: false
                                },
                                msgTarget: 'under',
                                items: [
                                    {
                                        width: 200,
                                        xtype: 'mitos.currency',
                                        name: 'hrg_sosialisasi',
                                        id : 'hrg_sosialisasi_input',
                                        fieldLabel : 'Hrg Sosialisasi ',
                                        labelAlign : 'right',
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
                                me.onitemsSave(form, me.SOItemsStore);
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
            me.winLoc = Ext.create('App.ux.window.Window', {
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
                                    {name: 'so_num', xtype: 'textfield', hidden : true},
                                    {name: 'prod_id', xtype: 'textfield', hidden : true}
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
                                        value: 'Lokasi : ',
                                        labelAlign: 'right'
                                    },
                                    {
                                        width: 400,
                                        name: 'lokasi_nama',
                                        xtype: 'textfield'
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
                                        value: 'Kecamatan : ',
                                        labelAlign: 'right'
                                    },
                                    {
                                        width: 400,
                                        name: 'lokasi_kec',
                                        xtype: 'textfield'
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
                                        value: 'Kabupaten : ',
                                        labelAlign: 'right'
                                    },
                                    {
                                        width: 400,
                                        name: 'lokasi_kab',
                                        xtype: 'textfield'
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
                                        value: 'Satuan : ',
                                        labelAlign: 'right'
                                    },
                                    {
                                        width: 400,
                                        name: 'sat_id',
                                        xtype: 'satuanlivetsearch',
                                        itemId : 'sat_id',
                                        margin : '0 0 0 0',
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
                            var form = me.winLoc.down('form').getForm();
                            if(form.isValid()){
                                me.onlocSave(form, me.SOLocationStore);
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
                        me.action(me.winLoc, 'close');
                    }
                }
            });

            me.pageBody = [me.GRGrid, me.grpnl, me.GRItemspnl];
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
            Ext.getCmp('move-next').setDisabled(true);
            Ext.getCmp('so_num_input').setDisabled(false);
        },
        onDelete: function(){
            var me = this,
                grid = me.SOGrid,
                store = grid.getStore(),
                record = grid.getSelectionModel().getSelection(),
                co_id = record[0].get('co_id'),
                so_num = record[0].get('so_num');
            if (record != []) {
                Ext.Msg.show({
                    title: 'Please Confirm' + '...',
                    msg: 'Are you sure want to delete' + ' ?',
                    icon: Ext.MessageBox.QUESTION,
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn){
                        if(btn == 'yes'){
                            store.remove(record);
                            SalesOrder.deleteSO(record);
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
            var form = this.GeneralForm;
            form.loadRecord(record);
            this.goToSODetail();
            Ext.getCmp('move-next').setDisabled(false);
            Ext.getCmp('so_num_input').setDisabled(true);
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
            this.getPageBody().getLayout().setActiveItem( 2 );
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
                    Ext.getCmp('move-next').setDisabled(false);
                },
                failure:function(){
                    me.msg('Opps!', 'Error!!', true);
                }
            });
            store.load();
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
            var topBarItems = this.SOGrid.getDockedItems('toolbar[dock="top"]')[0],
                datefrom = topBarItems.getComponent( 'fieldContainerDateRange' ).getComponent( 'datefrom' ).getValue( ),
                dateto = topBarItems.getComponent( 'fieldContainerDateRange' ).getComponent( 'dateto' ).getValue( );

            // Load the ExtJs dataStore with the new parameters
            this.SOStore.load(
                {
                    params :
                    {
                        datefrom : datefrom,
                        dateto : dateto,
                        so_numsearch : topBarItems.getComponent( 'fieldcontainerso_numsearch' ).getComponent( 'so_numsearch' ).getValue( ),
                        cust_search : topBarItems.getComponent( 'fieldcontainercust_search' ).getComponent( 'cust_search' ).getValue( )
                    }
                } );

        },

        onNewItems: function(form, model, title){
            this.setForm(form, title);
            form.getForm().reset();
            var newModel = Ext.ModelManager.create({
            }, model);
            form.getForm().loadRecord(newModel);
            this.action(this.win, 'new');
            this.win.show();
        },
        onNewLoc: function(form, model, title){
            this.setForm(form, title);
            form.getForm().reset();
            var newModel = Ext.ModelManager.create({
            }, model);
            form.getForm().loadRecord(newModel);
            this.action(this.winLoc, 'new');
            this.winLoc.show();
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
        onItemsGridClick: function(grid, selected){
            var me = this;
            me.curr_prod_id = selected.data.prod_id;
            me.curr_co_id = selected.data.co_id;
            me.curr_so_num = selected.data.so_num;
            me.SOLocationStore.load({params:{prod_id: me.curr_prod_id}});
        },
        onItemsdblclick: function(store, record, title){
            var form = this.win.down('form');
            this.setForm(form, title);
            form.getForm().loadRecord(record);
            this.action(this.win, 'old');
            this.win.show();
        },
        onLocdblclick: function(store, record, title){
            var form = this.winLoc.down('form');
            this.setForm(form, title);
            form.getForm().loadRecord(record);
            this.action(this.winLoc, 'old');
            this.winLoc.show();
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
                    SalesOrder.updateSOnetto(params);
                    me.win.close();
                },
                failure:function(){
                    me.msg('Opps!', 'Error!!', true);
                }
            });
            store.load();
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
                    me.winLoc.close();
                },
                failure:function(){
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

        onLocDelete: function(store){
            var me = this, grid = me.LocationGrid;
            sm = grid.getSelectionModel();
            sr = sm.getSelection();
            bid = sr[0].get('urut');
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
            });
//        store.load();
        },
        onEnter : function(field, e)
        {
            var hrg = 0,
                qty = 0,
                disc_prs = 0,
                n_brutto = 0,
                n_disc = 0,
                n_loco = 0,
                n_transport = 0,
                n_promosi = 0,
                n_sosialisasi = 0,
                n_lain = 0;
            if (e.getKey() == e.ENTER)
            {
                qty = Ext.getCmp('qty_input').getValue();
                hrg = Ext.getCmp('hrg_input').getValue();
                disc_prs = Ext.getCmp('disc_prs_input').getValue();
                n_loco = Ext.getCmp('hrg_loco_input').getValue();
                n_transport = Ext.getCmp('hrg_transport_input').getValue();
                n_promosi = Ext.getCmp('hrg_promosi_input').getValue();
                n_sosialisasi = Ext.getCmp('hrg_sosialisasi_input').getValue();
                n_lain = Ext.getCmp('hrg_lain_input').getValue();
                n_brutto = qty * hrg;
                n_netto = n_brutto;
                if (disc_prs > 0) {
                    n_disc = (disc_prs/100)*n_brutto;
                    n_netto = n_brutto - n_disc;
                }
                if (n_loco = 0) {
                    n_loco = n_netto;
                    n_transport = 0;
                    n_promosi = 0;
                    n_sosialisasi = 0;
                    n_lain = 0;
                }
                n_lain = n_netto - n_loco - n_transport - n_promosi - n_sosialisasi;
            }
            Ext.getCmp('n_disc_input').setValue(n_disc);
            Ext.getCmp('n_brutto_input').setValue(n_brutto);
            Ext.getCmp('n_netto_input').setValue(n_netto);
            Ext.getCmp('hrg_loco_input').setValue(n_loco);
            Ext.getCmp('hrg_transport_input').setValue(n_transport);
            Ext.getCmp('hrg_promosi_input').setValue(n_promosi);
            Ext.getCmp('hrg_sosialisasi_input').setValue(n_sosialisasi);
            Ext.getCmp('hrg_lain_input').setValue(n_lain);

        },


        /*
         * Event: navigate
         */
        navigate:function(panel, to){
            var me = this,
                layout = panel.getLayout(),
                currCard;
            if(typeof to == 'string'){
                layout[to]();
            }
            else{
                layout.setActiveItem(to);
            }
            currCard = layout.getActiveItem();
            /*
             if(me.step[currCard.action]){
             Ext.getCmp('move-next').setDisabled(false);
             }
             else{
             Ext.getCmp('move-next').setDisabled(true);
             }
             */
//        Ext.getCmp('move-prev').setVisible(layout.getPrev());

        },

        /*
         * Event: okToGoNext
         */
        okToGoNext:function(ok){
            var me = this, layout = me.mainPanel.getLayout();
            if(me.GeneralForm.getLayout().getActiveItem().action != 2) Ext.getCmp('move-next').setDisabled(!ok);
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

