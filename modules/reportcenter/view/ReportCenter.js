//******************************************************************************
// ReportCenter.js
// This is the Report Center Main Panel ths will contain categories and list
// of the available reports in GaiaEHR App
// v0.0.1
// 
// Author: Gino Rivera Falu (GI Technologies)
// Modified:
// 
// GaiaEHR (Electronic Health Records) 2012
//******************************************************************************
Ext.define('Modules.reportcenter.view.ReportCenter', {
        extend   : 'App.ux.RenderPanel',
        id       : 'panelReportCenter',
        pageTitle: i18n('report_center'),

        initComponent            : function() {
            var me = this;
            var searching={
                ftype : 'searching',
                mode: 'local'
                ,           width:  200,
                disableIndexes:['timeedit']

            }
            Ext.define('ProdPopup', {
                extend: 'Ext.data.Model',
                fields: [
                    {name: 'prod_id',type: 'string'},
                    {name: 'prod_nama',type: 'string'},
                    {name: 'timeedit',type: 'date'}
                ],
                proxy: {
                    type: 'direct',
                    api: {
                        read:  Items.getitems

                    }
                }
            });
            me.ProdPopupStore = Ext.create('Ext.data.Store', {
                model: 'ProdPopup',
                autoLoad: true
            });
            Ext.define('WilayahPopup', {
                extend: 'Ext.data.Model',
                fields: [
                    {name: 'wilayah_id',type: 'string'},
                    {name: 'wilayah_nama',type: 'string'},
                    {name: 'keterangan',type: 'string'}
                ],
                proxy: {
                    type: 'direct',
                    api: {
                        read:  Wilayah.getwilayah

                    }
                }
            });
            me.WilayahPopupStore = Ext.create('Ext.data.Store', {
                model: 'WilayahPopup',
                autoLoad: true
            });
            Ext.define('PpPopup', {
                extend: 'Ext.data.Model',
                fields: [
                    {name: 'no_pp',type: 'string'},
                    {name: 'description',type: 'string'},
                    {name: 'timeedit',type: 'date'}
                ],
                proxy: {
                    type: 'direct',
                    api: {
                        read:  Produksi.getProduksi

                    }
                }
            });
            me.PpPopupStore = Ext.create('Ext.data.Store', {
                model: 'PpPopup',
                autoLoad: true
            });


            me.reports = Ext.create('Ext.panel.Panel', {
                layout: 'auto'
            });
            me.pageBody = [ me.reports ];

            /*
             * Patient Reports List
             * TODO: Pass the report indicator telling what report should be rendering
             * this indicator will also be the logic for field rendering.
             */
            me.ProdpopupGrid = Ext.create('App.ux.GridPanel', {
                store: me.ProdPopupStore,
                itemId: 'ProdpopupGrid',
                //height: 300,
                margin: '0 0 3 0',
                region: 'north',
                enablePaging: true,
                columns: [
                    {text: 'Produk  ID', sortable: false, dataIndex: 'prod_id'},
                    {text: 'Produk Nama', width:200, sortable: false,dataIndex: 'prod_nama'}

                ],
                listeners: {
                    scope: me,
                    select: me.onItemGridClick
                },

                features:[searching]
            });
            me.WilayahGrid = Ext.create('App.ux.GridPanel', {
                store: me.WilayahPopupStore,
                itemId: 'Wilayah',
                height: 300,
                margin: '0 0 3 0',
                region: 'north',
                columns: [
                    {text: 'Wilayah', width:70, sortable: false,dataIndex: 'wilayah_id'},
                    {text: 'Nama Wilayah', flex: 1, sortable: true, dataIndex: 'wilayah_nama'},
                    {text: 'Keterangan', width : 150, dataIndex: 'keterangan', sortable : true }

                ],
                listeners: {
                    scope: me,
                    select: me.onItemGridClick
                },

                features:[searching]
            });
            me.ProduksiGrid = Ext.create('App.ux.GridPanel', {
                store: me.PpPopupStore,
                height: 300,
                margin: '0 0 3 0',
                region: 'north',
                enablePaging: true,
                columns: [
                    {text: 'No. Produksi', sortable: false, dataIndex: 'no_pp'},
                    {text: 'Deskripsi', width:200, sortable: false,dataIndex: 'description'},
                    {text: 'LastUpdate', dataIndex: 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y')}

                ],
                listeners: {
                    scope: me,
                    select: me.onItemGridClick

                },
                features:[searching]

            });


            me.MarketingCategory = me.addCategory('Report Marketing', 260);
            me.TestReport = me.addReportByCategory(me.MarketingCategory, 'Maketing', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Testing 123',
                    items : [
                        {
                            xtype          : 'datefield',
                            fieldLabel     : 'from',
                            hideLabel      : false,

                            name           : 'report_date_datefrom',
                            width          : 350
                        },
                        {
                            xtype          : 'datefield',
                            fieldLabel     : 'to',
                            hideLabel      : false,
                            name           : 'report_date_dateto',
                            name           : 'report_sonum',
                            width          : 350
                        }
                    ],
                    fn:Test.TestList
                });
            });
            me.SalesOrder = me.addReportByCategory(me.MarketingCategory, 'Sales Order', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                            {
                            xtype          : 'textfield',
                            fieldLabel     : 'So Num :',
                            hideLabel      : false,
                            name           : 'report_sonum',
                            width          : 350
                            }

                    ],
                    fn:SalesOrder_Rpt.SalesOrder
                });
            });
            me.DataKonsumen = me.addReportByCategory(me.MarketingCategory, 'Data Konsumen', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
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
                                    fieldLabel : 'Produk',
                                    hideLabel : false,
                                    width: 350,
                                    name : 'report_produk',
                                    labelAlign : 'right',
                                    id: 'produk_id_dk'
                                },{
                                    xtype: 'button',
                                    text :'...',
                                    handler: function(){
                                        //me.myFormulaChooseItem.showAt(400,200);
                                        me.ShowGridPopup(me.ProdPopupStore, 'Produk',me.ProdpopupGrid);

                                    }
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
                            items : [
                                {
                                    xtype : 'textfield',
                                    fieldLabel : 'Wilayah',
                                    hideLabel : false,
                                    width: 350,
                                    name : 'report_wilayah',
                                    labelAlign : 'right',
                                    id:'wilayah_id_dk'
                                },{
                                    xtype: 'button',
                                    text :'...',
                                    handler: function(){
                                        //me.myFormulaChooseItem.showAt(400,200);
                                        me.ShowGridPopup(me.WilayahPopupStore, 'Wilayah',me.WilayahGrid);

                                    }
                                }
                            ]

                        }

                    ],
                    fn:SalesOrder_Rpt.DataKonsumen
                });
            });
            me.RekapPenjualan = me.addReportByCategory(me.MarketingCategory, 'Rekap Penjualan', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange',
                            items : [
                                {
                                    xtype : 'datefield',
                                    fieldLabel : 'dari',
                                    labelWidth : 35,
                                    width : 150,
                                    format : 'm/d/Y',
                                    labelAlign : 'right',
                                    value : new Date(),
                                    name : 'report_date_daritgl'

                                },
                                {
                                    xtype : 'datefield',
                                    fieldLabel : 'sampai',
                                    labelWidth : 35,
                                    padding : '0 10 0 0',
                                    width : 150,
                                    format : 'm/d/Y',
                                    labelAlign : 'right',
                                    value : new Date(),
                                    name : 'report_date_sampaitgl'
                                }]
                        }

                    ],
                    fn:SalesOrder_Rpt.RekapPenjualan
                });
            });
            me.PerformanceCabang = me.addReportByCategory(me.MarketingCategory, 'Performance Cabang', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
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
                                    fieldLabel : 'Wilayah',
                                    hideLabel : false,
                                    width: 350,
                                    name : 'report_wilayah',
                                    labelAlign : 'right',
                                    id:'wilayah_id_pc'
                                },{
                                    xtype: 'button',
                                    text :'...',
                                    handler: function(){
                                        //me.myFormulaChooseItem.showAt(400,200);
                                        me.ShowGridPopup(me.WilayahPopupStore, 'Wilayah',me.WilayahGrid);

                                    }
                                }
                            ]

                        }

                    ],
                    fn:SalesOrder_Rpt.PerformanceCabang
                });
            });
            me.PriceList = me.addReportByCategory(me.MarketingCategory, 'Price List', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
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
                                    fieldLabel : 'Produk',
                                    hideLabel : false,
                                    width: 350,
                                    name : 'report_produk',
                                    labelAlign : 'right',
                                    id: 'produk_id_pl'
                                },{
                                    xtype: 'button',
                                    text :'...',
                                    handler: function(){
                                        //me.myFormulaChooseItem.showAt(400,200);
                                        me.ShowGridPopup(me.ProdPopupStore, 'Produk',me.ProdpopupGrid);

                                    }
                                }
                            ]

                        }

                    ],
                    fn:SalesOrder_Rpt.PriceList
                });
            });
            me.SuratPesanan = me.addReportByCategory(me.MarketingCategory, 'Surat Pesanan', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype          : 'textfield',
                            fieldLabel     : 'So Num :',
                            hideLabel      : false,
                            name           : 'report_sonum',
                            width          : 350
                        },
                        {
                            xtype          : 'textfield',
                            fieldLabel     : 'Nomor Surat :',
                            hideLabel      : false,
                            name           : 'report_NoSuratPesanan',
                            width          : 350
                        }

                    ],
                    fn:SalesOrder_Rpt.SuratPesanan
                });
            });


            me.LogisticsCategory = me.addCategory('Report Logistics', 260);
            me.PermintaanProduksi = me.addReportByCategory(me.LogisticsCategory, 'Permintaan Logistics', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
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
                                    fieldLabel : 'No PP',
                                    hideLabel : false,
                                    width: 350,
                                    name : 'report_nopp',
                                    labelAlign : 'right',
                                    id: 'no_pp_pp'
                                },{
                                    xtype: 'button',
                                    text :'...',
                                    handler: function(){
                                        //me.myFormulaChooseItem.showAt(400,200);
                                        me.ShowGridPopup(me.PpPopupStore, 'Produksi',me.ProduksiGrid);

                                    }
                                }
                            ]

                        }

                    ],
                    fn:SalesOrder_Rpt.PermintaanProduksi
                });
            });


            me.callParent(arguments);

        },

        /*
         * Function to add categories with the respective with to the
         * Report Center Panel
         */
        addCategory              : function(category, width) {
            var me = this;
            return me.reports.add(Ext.create('Ext.container.Container', {
                    cls   : 'CategoryContainer',
                    width : width,
                    layout: 'anchor',
                    items : [
                        {
                            xtype : 'container',
                            cls   : 'title',
                            margin: '0 0 5 0',
                            html  : category
                        }
                    ]
                }));
        },

        /*
         * Function to add Items to the category
         */
        addReportByCategory      : function(category, text, fn) {
            return category.add(Ext.create('Ext.button.Button', {
                    cls      : 'CategoryContainerItem',
                    anchor   : '100%',
                    margin   : '0 0 5 0',
                    textAlign: 'left',
                    text     : text,
                    handler  : fn
                }));
        },

        /*
         * Function to call the report panel.
         * Remember the report fields are dynamically rendered.
         */
        goToReportPanelAndSetPanel: function(config) {
            var panel = app.MainPanel.getLayout().setActiveItem('panelReportPanel');
            panel.setReportPanel(config);



//            formPanel.setTitle(config.title);
//            formPanel.action = config.action;
//            formPanel.reportFn = config.fn;
//            formPanel.removeAll();
//            formPanel.add(config.items);
        },

    onItemGridClick: function(grid,selected){ //
        var me = this;
        if(selected.data.prod_id != null){
            Ext.getCmp('produk_id_dk').setValue(selected.data.prod_id);
        }else if(selected.data.wilayah_id != null){
            Ext.getCmp('wilayah_id_dk').setValue(selected.data.wilayah_id);
           Ext.getCmp('wilayah_id_pc').setValue(selected.data.wilayah_id);
        }

        //me.myWinChooseItem.close();
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

        /**
         * This function is called from MitosAPP.js when
         * this panel is selected in the navigation panel.
         * place inside this function all the functions you want
         * to call every this panel becomes active
         */
        onActive: function(callback) {
            callback(true);
        }

    }); //ens oNotesPage class