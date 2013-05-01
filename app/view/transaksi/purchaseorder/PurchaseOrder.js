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
Ext.define( 'App.view.transaksi.purchaseorder.PurchaseOrder',
    {
        extend : 'App.ux.RenderPanel',
        id : 'panelPO',
        pageTitle : 'Purchase Order',
        uses : ['App.ux.GridPanel'],
        pageLayout : 'card',

        initComponent : function()
        {
            var me = this;
            me.po_numsearch = null;
            me.vend_search = null;
            me.curr_bb_id = null;
            me.curr_co_id = null;
            me.curr_po_num = null;

            me.step = [];

            me.POStore = Ext.create( 'App.store.transaksi.purchaseorder.PurchaseOrder' );
            me.POItemsStore = Ext.create('App.store.transaksi.purchaseorder.POItems');
            /**
             *  Sales Order Search data grid.
             * Gives a list of encounter based on the search
             *
             */
            me.POGrid = Ext.create( 'Ext.grid.Panel',
                {
                    store : me.POStore,
                    viewConfig :
                    {
                        stripeRows : true
                    },
                    columns : [
                        {
                            header : 'Purchase Order #',
                            dataIndex : 'po_num',
                            width : 200
                        },
                        {
                            header : 'Tanggal',
                            dataIndex : 'tgl',
                            renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                            width : 100
                        },
                        {
                            header : 'Supplier',
                            dataIndex : 'vend_nama',
                            width : 200
                        },
                        {
                            header : '# Penawaran Supplier',
                            dataIndex : 'vend_inq_num',
                            width : 200
                        },
                        {
                            header : 'JT Kirim',
                            dataIndex : 'tgl_jt',
                            width : 100
                        },
                        {
                            header : 'PPN',
                            dataIndex : 'ppn_po',
                            width : 50
                        },
                        {
                            header : 'Total',
                            dataIndex : 'n_netto',
                            renderer: Ext.util.Format.numberRenderer('0,0'),
                            width : 300
                        }],
                    // ToolBar for Encounter DataGrid.
                    tbar : [
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldcontainerpo_numsearch',
                            items : [
                                {
                                    xtype : 'displayfield',
                                    fieldLabel : 'Purchase Order #'
                                },
                                {
                                    xtype : 'textfield',
                                    itemId : 'po_numsearch',
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
                            itemId : 'pofieldContainerDateRange',
                            items : [
                                {
                                    xtype : 'datefield',
                                    itemId : 'podatefrom',
                                    fieldLabel : 'dari',
                                    labelWidth : 35,
                                    width : 150,
                                    format : 'd-m-Y',
                                    labelAlign : 'right',
                                    value : new Date()
                                },
                                {
                                    xtype : 'datefield',
                                    itemId : 'podateto',
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
                            itemId : 'pofieldContainerSearch',
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
                            itemId : 'pofieldContainerAdd',
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
                            itemId : 'pofieldContainerDelete',
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
                            me.rowDblClicked(me.POStore, record);
                        }

                    }

                });

            /**
             * Panel:
             */
            me.porderpnl = Ext.create( 'Ext.panel.Panel',
                {
                    defaultTitle : 'Purchase Order',
                    title : 'Purchase Order Detail',
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
                                                            {name: 'co_id', xtype:'textfield', hidden : true},
                                                            {name: 'n_disc', xtype: 'numberfield', id:'po_i_n_disc', hidden : true},
                                                            {name: 'n_bruto', xtype: 'numberfield', id: 'po_i_n_bruto', hidden : true},
                                                            {name: 'n_ppn', xtype: 'numberfield', id: 'po_i_n_ppn', hidden : true}
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
                                                                name : 'po_num',
                                                                id : 'po_num_input',
                                                                width: 400,
                                                                fieldLabel: 'Purchase Order #',
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
                                                                itemId : 'povend_id',
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
                                                                name : 'vend_do_num',
                                                                xtype: 'mitos.UpperCaseTextField',
                                                                fieldLabel: 'Supplier DO #',
                                                                labelAlign: 'right',
                                                                width : 400
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
                                                                name : 'vend_inq_num',
                                                                xtype: 'mitos.UpperCaseTextField',
                                                                fieldLabel: 'Supplier INQ #',
                                                                labelAlign: 'right',
                                                                width : 400
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
                                                                name : 'inv_num',
                                                                fieldLabel: 'Invoice #',
                                                                labelAlign: 'right',
                                                                width : 400
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
                                                                xtype: 'datefield',
                                                                name : 'tgl_jt',
                                                                width: 270,
                                                                fieldLabel: 'Tgl JT',
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
                                                                xtype: 'fieldcontainer',
                                                                msgTarget: 'under',
                                                                items: [
                                                                    {
                                                                        width: 200,
                                                                        xtype: 'mitos.checkbox',
                                                                        fieldLabel: 'PPN',
                                                                        labelAlign: 'right',
                                                                        name: 'ppn_so'
                                                                    },{
                                                                        width: 200,
                                                                        xtype: 'mitos.checkbox',
                                                                        fieldLabel: 'Exclude PPN',
                                                                        labelAlign: 'right',
                                                                        name: 'ppn_exc'
                                                                    }]
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
                            text : 'Purchase Order',
                            scope : me,
                            action : 'purchase',
                            tooltip : 'Kembali ke Purchase Order',
                            handler : me.onBtnBack
                        }, '->',
                        {
                            text : 'Simpan',
                            scope : me,
                            action : 'save',
                            tooltip : 'Simpan Data',
                            id: 'posave-btn',
                            handler: function(){
                                var form = me.GeneralForm.getForm();
                                if(form.isValid()){
                                    me.onBtnSave(form, me.POStore);
                                }
                            }
                        },
                        {
                            text : 'Batal',
                            scope : me,
                            action : 'cancel',
                            tooltip : 'Batal dan kembali ke Purchase Order',
                            handler : me.onBtnCancel
                        },
                        {
                            text : 'Berikut',
                            scope : me,
                            action : 'next',
                            iconCls : 'icoArrowRightSmall',
                            iconAlign : 'right',
                            tooltip : 'Berikutnya',
                            id:'pomove-next',
                            handler : me.onBtnNext
                        }]
                } );

            me.POItemspnl = Ext.create( 'Ext.panel.Panel',
                {
                    defaultTitle : 'Purchase Order',
                    title : 'Purchase Order Items',
                    layout : 'border',
                    bodyStyle : 'background-color:#fff',
                    items : [
                        me.ItemsGrid = Ext.create('App.ux.GridPanel', {
                            store: me.POItemsStore,
                            height: 250,
                            margin: '0 0 3 0',
                            region: 'north',
                            columns: [
                                {text: 'co_id', width:70, sortable: false, dataIndex: 'co_id', hidden: true},
                                {text: 'po_num', width:70, sortable: false, dataIndex: 'po_num', hidden: true},
                                {text: 'ID', width:70, sortable: false, dataIndex: 'bb_id'},
                                {text: 'Nama Barang', flex: 1, sortable: true, dataIndex: 'bb_nama'},
                                {text: 'SAT ID', width:70, sortable: false, dataIndex: 'sat_id', hidden : true},
                                {text: 'Satuan', width: 100, sortable: true, dataIndex: 'satuan_nama'},
                                {text: 'Qty', width: 100, sortable: false, dataIndex: 'qty'},
                                {text: 'Harga', width: 150, sortable: false, dataIndex: 'hrg'},
                                {text: 'Jumlah', width: 150, sortable: false, dataIndex: 'n_brutto', hidden: true},
                                {text: 'Disc %', width: 150, sortable: false, dataIndex: 'disc_prs', hidden : true},
                                {text: 'Discount', width: 150, sortable: false, dataIndex: 'n_disc', hidden : true},
                                {text: 'Total', width: 150, sortable: false, dataIndex: 'n_netto'},
                                {text: 'Keterangan', flex:1, sortable: true, dataIndex: 'keterangan'}
                            ],
                            listeners: {
                                scope: me,
                                select: me.onItemsGridClick,
                                itemdblclick: function(view, record){
                                    oldName = record.get('bb_id');
                                    record.set("old_bb_id",oldName);
                                    me.onItemsdblclick(me.POItemsStore, record, 'Edit Product');
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
                                                me.onNewItems(form, 'App.model.transaksi.purchaseorder.POItems', 'Tambah data Items');
                                            },
                                            tooltip : 'Tambah Data'
                                        },
                                        '->',
                                        {
                                            text: 'Delete',
                                            iconCls: 'icoDeleteBlack',
                                            itemId: 'polistDeleteBtn',
                                            scope: me,
                                            handler: function () {
                                                me.onItemsDelete(me.POItemsStore);
                                            },
                                            tooltip: 'Hapus Data'
                                        }
                                    ]
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
                            id: 'pomove-prev-1',
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
                                    {name: 'po_num', xtype: 'textfield', hidden : true},
                                    {name: 'n_disc', xtype: 'numberfield', id:'pon_disc_input', hidden : true},
                                    {name: 'n_brutto', xtype: 'numberfield', id: 'pon_brutto_input', hidden : true},
                                    {name: 'qty_rcv', xtype: 'numberfield', id: 'poqty_rcv_input', hidden : true}
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
                                        fieldLabel : 'Barang ',
                                        xtype: 'bblivetsearch',
                                        itemId : 'pobb_id',
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
                                        itemId : 'posat_id',
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
                                        id : 'poqty_input',
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
                                        id : 'pohrg_input',
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
                                        id : 'podisc_prs_input',
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
                                        id : 'pon_netto_input',
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
                                me.onitemsSave(form, me.POItemsStore);
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

            me.pageBody = [me.POGrid, me.porderpnl, me.POItemspnl];
            me.callParent( arguments );
        },

        /**
         * Event: onBtnClicked
         */
        onBtnClicked : function(btn)
        {
            var datefrom = this.query( 'datefield[itemId="podatefrom"]' ),
                dateto = this.query( 'datefield[itemId="podateto"]' );
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
            Ext.getCmp('pomove-next').setDisabled(true);
            Ext.getCmp('po_num_input').setDisabled(false);
        },
        onDelete: function(){
            var me = this,
                grid = me.POGrid,
                store = grid.getStore(),
                record = grid.getSelectionModel().getSelection(),
                co_id = record[0].get('co_id'),
                so_num = record[0].get('po_num');
            if (record != []) {
                Ext.Msg.show({
                    title: 'Please Confirm' + '...',
                    msg: 'Are you sure want to delete' + ' ?',
                    icon: Ext.MessageBox.QUESTION,
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn){
                        if(btn == 'yes'){
                            store.remove(record);
                            PurchaseOrder.deletePO(record);
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
            Ext.getCmp('pomove-next').setDisabled(false);
            Ext.getCmp('po_num_input').setDisabled(true);
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
                    Ext.getCmp('pomove-next').setDisabled(false);
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
            var topBarItems = this.POGrid.getDockedItems('toolbar[dock="top"]')[0],
                datefrom = topBarItems.getComponent( 'pofieldContainerDateRange' ).getComponent( 'podatefrom' ).getValue(),
                dateto = topBarItems.getComponent( 'pofieldContainerDateRange' ).getComponent( 'podateto' ).getValue();

            // Load the ExtJs dataStore with the new parameters
            this.POStore.load(
                {
                    params :
                    {
                        datefrom : datefrom,
                        dateto : dateto,
                        po_numsearch : topBarItems.getComponent( 'fieldcontainerpo_numsearch' ).getComponent( 'po_numsearch' ).getValue( ),
                        vend_search : topBarItems.getComponent( 'fieldcontainervend_search' ).getComponent( 'vend_search' ).getValue( )
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
            me.curr_bb_id = selected.data.bb_id;
            me.curr_co_id = selected.data.co_id;
            me.curr_po_num = selected.data.po_num;
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
        saveitem: function(form, store){
            var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record);
            if(storeIndex == -1){
                store.add(values);
            }else{
                record.set(values);
            }
            store.sync({
                success:function(){
                    PurchaseOrder.updatePOnetto(params);
                    me.win.close();
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
//        store.load();
        },

        onEnter : function(field, e)
        {
            var hrg = 0,
                qty = 0,
                disc_prs = 0,
                n_brutto = 0,
                n_disc = 0;
            if (e.getKey() == e.ENTER)
            {
                qty = Ext.getCmp('poqty_input').getValue();
                hrg = Ext.getCmp('pohrg_input').getValue();
                disc_prs = Ext.getCmp('podisc_prs_input').getValue();
                n_brutto = qty * hrg;
                n_netto = n_brutto;
                if (disc_prs > 0) {
                    n_disc = (disc_prs/100)*n_brutto;
                    n_netto = n_brutto - n_disc;
                }
            }
            Ext.getCmp('pon_disc_input').setValue(n_disc);
            Ext.getCmp('pon_brutto_input').setValue(n_brutto);
            Ext.getCmp('pon_netto_input').setValue(n_netto);
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

