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
            me.vend_search = null;
            me.curr_bb_id = null;
            me.curr_co_id = null;
            me.curr_gr_num = null;
            me.curr_bb_id = null;
            me.curr_sat_id = null;

            me.step = [];
            var searching={
                ftype : 'searching',
                mode: 'local'
                ,           width:  200,
                disableIndexes:['timeedit']

            }

            me.GRStore = Ext.create( 'App.store.transaksi.goodsreceived.GoodsReceived' );
            me.GRItemsStore = Ext.create('App.store.transaksi.goodsreceived.GRItems');
            me.GRDetailStore = Ext.create('App.store.transaksi.goodsreceived.GRDetail');
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
                            flex:1,
                            width : 200
                        }
                        ,
                        {
                            header : 'Type',
                            dataIndex : 'gr_type_desc',
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
                                    xtype : 'xtVendorSuplierPopup',
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
                                                                xtype : 'xtVendorSuplierPopup',
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
                                                                xtype : 'xtVendorTransporterPopup',
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
                                                    },
                                                    {
                                                        xtype : 'radiogroup',
                                                        fieldLabel: "Type ",
                                                        layout :
                                                        {
                                                            type : 'hbox'
                                                        },
                                                        defaults :
                                                        {
                                                           // margin : '0 0 0 10',
                                                            xtype: "radio",name: "gr_type"
                                                        },
                                                        hideLabel : false,
                                                        items : [
                                                            {
                                                                boxLabel: "Received",
                                                                inputValue: "R"
                                                            },
                                                            {
                                                                boxLabel: "Return",
                                                                inputValue: "B"
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
                            action : 'goodsreceived',
                            tooltip : 'Kembali ke Goods Received',
                            handler : me.onBtnBack
                        }, '->',
                        {
                            text : 'Simpan',
                            scope : me,
                            action : 'save',
                            tooltip : 'Simpan Data',
                            id: 'gr-save-btn',
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
                            id:'gr-move-next',
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
                            store: me.GRItemsStore,
                            height: 250,
                            margin: '0 0 3 0',
                            region: 'north',
                            columns: [
                                {text: 'co_id', width:70, sortable: false, dataIndex: 'co_id', hidden: true},
                                {text: 'gr_num', width:70, sortable: false, dataIndex: 'gr_num', hidden: true},
                                {text: 'ID', width:70, sortable: false, dataIndex: 'bb_id', hidden: true},
                                {text: 'Nama Barang', flex: 1, sortable: true, dataIndex: 'bb_nama'},
                                {text: 'SAT ID', width:70, sortable: false, dataIndex: 'sat_id', hidden : true},
                                {text: 'Satuan', width: 100, sortable: true, dataIndex: 'satuan_nama'},
                                {text: 'Qty PCS/SAK', width: 100, sortable: false, dataIndex: 'qty_pcs'},
                                {text: 'Qty Muatan', width: 100, sortable: false, dataIndex: 'qty_brutto'},
                                {text: 'Qty Diterima', width: 100, sortable: false, dataIndex: 'qty_netto'},
                                {text: 'Qty Selisih', width: 100, sortable: false, dataIndex: 'qty_selisih'},
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
                        me.GRDetailGrid = Ext.create('App.ux.GridPanel', {
                            store: me.GRDetailStore,
                            region: 'center',
                            columns: [
                                { text: 'company', dataIndex: 'co_id', hidden: true},
                                { text: 'gr_num', dataIndex: 'gr_num', hidden: true},
                                { text: 'id', dataIndex: 'bb_id', hidden: true},
                                { text: 'urut', dataIndex: 'urut', hidden: true},
                                { text: 'SAT ID', width:70, sortable: false, dataIndex: 'sat_id', hidden : true},
                                { text: 'Satuan', width: 100, sortable: true, dataIndex: 'satuan_nama'},
                                { text: 'Nopol', width:100, sortable: true, dataIndex: 'nopol'},
                                { text: 'Jml PCS/SAK', width: 100, sortable: true, dataIndex: 'qty_pcs'},
                                { text: 'Jml Muatan', width: 100, sortable: true, dataIndex: 'qty_brutto'},
                                { text: 'Jml diterima', width: 100, sortable: false, dataIndex: 'qty_netto'},
                                { text: 'Selisih', width:70, sortable: false, dataIndex: 'qty_selisih'},
                                { text: 'Keterangan', flex:1, sortable: true, dataIndex: 'keterangan'}
                            ],
                            listeners: {
                                scope: me,
                                itemdblclick: function(view, record){
                                    me.onLocdblclick(me.GRDetailStore, record, 'Edit Detail Qty');
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
                                            me.onNewLoc(form, 'App.model.transaksi.goodsreceived.GRDetail', 'Tambah Data');
                                        }
                                    },'->',
                                        {
                                            xtype: 'button',
                                            text: 'Hapus Data',
                                            iconCls: 'delete',
                                            handler: function() {
                                                me.onLocDelete(me.GRDetailStore);
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
                            id: 'gr-move-prev-1',
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
                                    {name: 'gr_num', xtype: 'textfield', hidden : true}
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
                                        xtype: 'xtBahanBakuPopup',
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
                                        xtype: 'xtSatuanPopup',
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
                                me.onitemsSave(form, me.GRItemsStore);
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
                                    {name: 'gr_num', xtype: 'textfield', hidden : true},
                                    {name: 'bb_id', xtype: 'textfield', hidden : true}
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
                                        value: 'NO POLISI : ',
                                        labelAlign: 'right'
                                    },
                                    {
                                        width: 200,
                                        name: 'nopol',
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
                                        value: 'DO # : ',
                                        labelAlign: 'right'
                                    },
                                    {
                                        width: 200,
                                        name: 'do_num',
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
                                        value: 'Qty PCS/SAK:'
                                    },
                                    {
                                        width: 200,
                                        xtype: 'mitos.currency',
                                        name: 'qty_pcs',
                                        id : 'idqty_pcs',
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
                                        value: 'Qty Muatan:'
                                    },
                                    {
                                        width: 200,
                                        xtype: 'mitos.currency',
                                        name: 'qty_brutto',
                                        id : 'idqty_brutto',
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
                                        value: 'Qty Timbangan:'
                                    },
                                    {
                                        width: 200,
                                        xtype: 'mitos.currency',
                                        name: 'qty_netto',
                                        id : 'idqty_netto',
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
                                        value: 'Selisih'
                                    },
                                    {
                                        width: 200,
                                        xtype: 'mitos.currency',
                                        name: 'qty_selisih',
                                        id : 'idqty_selisih',
                                        hideTrigger: true,
                                        readonly: true
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
                                me.onlocSave(form, me.GRDetailStore);
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
            Ext.getCmp('gr-move-next').setDisabled(true);
            Ext.getCmp('gr_num_input').setDisabled(false);
        },
        onDelete: function(){
            var me = this,
                grid = me.GRGrid,
                store = grid.getStore(),
                record = grid.getSelectionModel().getSelection(),
                co_id = record[0].get('co_id'),
                gr_num = record[0].get('gr_num');
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
            var me = this, form = this.GeneralForm;
            form.loadRecord(record);
            me.curr_gr_num = form.getForm().findField('gr_num').getValue();
            me.curr_co_id = form.getForm().findField('co_id').getValue();
            this.goToSODetail();
            Ext.getCmp('gr-move-next').setDisabled(false);
            Ext.getCmp('gr_num_input').setDisabled(true);
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
            me.GRItemsStore.load({params:{co_id: coid, gr_num: me.curr_gr_num}});
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
                    me.curr_gr_num = Ext.getCmp('gr_num_input').getValue();
                    Ext.getCmp('gr-move-next').setDisabled(false);
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
            var topBarItems = this.GRGrid.getDockedItems('toolbar[dock="top"]')[0],
                datefrom = topBarItems.getComponent( 'fieldContainerDateRange' ).getComponent( 'datefrom' ).getValue( ),
                dateto = topBarItems.getComponent( 'fieldContainerDateRange' ).getComponent( 'dateto' ).getValue( );

            // Load the ExtJs dataStore with the new parameters
            this.GRStore.load(
                {
                    params :
                    {
                        datefrom : datefrom,
                        dateto : dateto,
                        gr_numsearch : topBarItems.getComponent( 'fieldcontainergr_numsearch' ).getComponent( 'gr_numsearch' ).getValue( ),
                        vend_search : topBarItems.getComponent( 'fieldcontainervend_search' ).getComponent( 'vend_search' ).getValue( )
                    }
                } );

        },

        onNewItems: function(form, model, title){
            var me = this;
            this.setForm(form, title);
            form.getForm().reset();
            var newModel = Ext.ModelManager.create({co_id: me.curr_co_id, gr_num: me.curr_gr_num}, model);
            form.getForm().loadRecord(newModel);
            this.action(this.win, 'new');
            this.win.show();
        },
        onNewLoc: function(form, model, title){
            var me = this;
            this.setForm(form, title);
            form.getForm().reset();
            var newModel = Ext.ModelManager.create({co_id: me.curr_co_id, gr_num: me.curr_gr_num, bb_id: me.curr_bb_id,
            sat_id: me.curr_sat_id}, model);
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
        onItemsGridClick: function(grid, selected){
            var me = this;
            me.curr_bb_id = selected.data.bb_id;
            me.curr_co_id = selected.data.co_id;
            me.curr_gr_num = selected.data.gr_num;
            me.curr_sat_id = selected.data.sat_id;
            me.GRDetailStore.load({params:{co_id: me.curr_co_id, gr_num: me.curr_gr_num, bb_id: me.curr_bb_id}});
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
            store.load({params:{co_id: me.curr_co_id, gr_num: me.curr_gr_num}});
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
            store.load({params:{co_id: me.curr_co_id, gr_num: me.curr_gr_num, bb_id: me.curr_bb_id}});
        },
        onItemsDelete: function(store){
            var me = this, grid = me.ItemsGrid;
            sm = grid.getSelectionModel();
            sr = sm.getSelection();
            bid = sr[0].get('bb_id');
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
        },

        onLocDelete: function(store){
            var me = this, grid = me.GRDetailGrid;
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
        },
        onEnter : function(field, e)
        {
            var qty_brutto = 0,
                qty_netto = 0,
                qty_selisih = 0;
            if (e.getKey() == e.ENTER)
            {
                qty_brutto = Ext.getCmp('idqty_brutto').getValue();
                qty_netto = Ext.getCmp('idqty_netto').getValue();
                qty_selisih = qty_netto - qty_brutto;
            }
            Ext.getCmp('idqty_selisih').setValue(qty_selisih);
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

