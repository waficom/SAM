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

            me.reports = Ext.create('Ext.panel.Panel', {
                layout: 'auto'
            });
            me.pageBody = [ me.reports ];

            /*
             * Patient Reports List
             * TODO: Pass the report indicator telling what report should be rendering
             * this indicator will also be the logic for field rendering.
             */

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
                            xtype          : 'xtSalesOrderPopup',
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
                                    xtype : 'xtlistproduct',
                                    fieldLabel : 'Produk',
                                    hideLabel : false,
                                    width: 350,
                                    name : 'report_produk',
                                    labelAlign : 'right',
                                    id: 'produk_id_dk'
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
                                    xtype : 'xtWilayahPopup',
                                    fieldLabel : 'Wilayah',
                                    hideLabel : false,
                                    width: 350,
                                    name : 'report_wilayah',
                                    labelAlign : 'right',
                                    id:'wilayah_id_dk'
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
                                    xtype : 'xtWilayahPopup',
                                    fieldLabel : 'Wilayah',
                                    hideLabel : false,
                                    width: 350,
                                    name : 'report_wilayah',
                                    labelAlign : 'right',
                                    id:'wilayah_id_pc'
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
                                    xtype : 'xtlistproduct',
                                    fieldLabel : 'Produk',
                                    hideLabel : false,
                                    width: 350,
                                    name : 'report_produk',
                                    labelAlign : 'right',
                                    id: 'produk_id_pl'
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
                            xtype          : 'xtSalesOrderPopup',
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
                            xtype          : 'xtProduksiPopup',
                            fieldLabel     : 'No. PP:',
                            hideLabel      : false,
                            name           : 'report_nopp',
                            width          : 350
                        }

                    ],
                    fn:SalesOrder_Rpt.PermintaanProduksi
                });
            });

            me.ProduksiCategory = me.addCategory('Report Produksi', 260);
            me.BarangMasuk = me.addReportByCategory(me.ProduksiCategory, 'Barang Masuk', function(btn) {

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
                                    name : 'report_date_fromdate'

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
                                    name : 'report_date_todate'
                                }]
                        }

                    ],
                    fn:Produksi_Rpt.BarangMasuk
                });
            });
            me.PengirimanBarang = me.addReportByCategory(me.ProduksiCategory, 'Pengiriman Barang', function(btn) {

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
                                    name : 'report_date_fromdate'

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
                                    name : 'report_date_todate'
                                }]
                        }

                    ],
                    fn:Produksi_Rpt.PengirimanBarang
                });
            });
            me.SuratJalan = me.addReportByCategory(me.ProduksiCategory, 'Surat Jalan', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype          : 'xtDOPopup',
                            fieldLabel     : 'No. Do :',
                            hideLabel      : false,
                            name           : 'report_do_num',
                            width          : 350
                        }

                    ],
                    fn:Produksi_Rpt.SuratJalan
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