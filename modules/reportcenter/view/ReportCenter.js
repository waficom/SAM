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
                            format         : 'd-m-Y',
                            value          : new Date(),
                            width          : 250
                        },
                        {
                            xtype          : 'datefield',
                            fieldLabel     : 'to',
                            hideLabel      : false,
                            format         : 'd-m-Y',
                            value          : new Date(),
                            name           : 'report_date_dateto',
                            width          : 250
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
            me.DeliveryOrder = me.addReportByCategory(me.MarketingCategory, 'Delivery Order', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype : 'datefield',
                            fieldLabel : 'Tanggal ' ,
                            width : 200,
                            format : 'm/d/Y',
                            value : new Date(),
                            name : 'report_date_tanggal'
                        },
                        {
                            xtype          : 'xtSalesPopup',
                            fieldLabel     : 'Sales ID :',
                            name           : 'report_sales_id',
                            width          : 200
                        },
                        {
                            xtype : 'textfield',
                            fieldLabel : 'Company',
                            labelAlign : 'right',
                            value : globals['site'],
                            name : 'report_co_id',
                            hidden: true
                        }

                    ],
                    fn:SalesOrder_Rpt.DeliveryOrder
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
            me.PurchaseOrder = me.addReportByCategory(me.LogisticsCategory, 'Purchase Order', function(btn) {

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
                    fn:Logistics_Rpt.PurchaseOrder
                });
            });
            me.PengadaanBarang = me.addReportByCategory(me.LogisticsCategory, 'Pengadaan Barang', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype          : 'xtPBPopup',
                            fieldLabel     : 'No PB:',
                            hideLabel      : false,
                            name           : 'report_pbnum',
                            width          : 350
                        }

                    ],
                    fn:Logistics_Rpt.PengadaanBarang
                });
            });
            me.FormPurchaseOrder = me.addReportByCategory(me.LogisticsCategory, 'Form Purchase Order', function(btn) {

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
                    fn:Logistics_Rpt.FormPurchaseOrder
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

            me.FinanceCategory = me.addCategory('Report Finance', 260);
            me.AP_Invoice= me.addReportByCategory(me.FinanceCategory, 'AP Invoice', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype          : 'xtDOPopup',
                            fieldLabel     : 'No. Inv. :',
                            hideLabel      : false,
                            name           : 'report_inv_code',
                            width          : 350
                        }

                    ],
                    fn:Finance_Rpt.AP_Invoice
                });
            });
            me.Ringkasan_Hutang= me.addReportByCategory(me.FinanceCategory, 'Ringkasan Hutang', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange',
                            items : [
                                {
                                    xtype : 'datefield',
                                    fieldLabel : 'Tanggal ' ,
                                    width : 200,
                                    format : 'm/d/Y',
                                    value : new Date(),
                                    name : 'report_date_tanggal'
                                },
                                {
                                    xtype          : 'xtVendorSuplierPopup',
                                    fieldLabel     : 'Creditor :',
                                    name           : 'report_vend_id',
                                    width          : 200
                                },
                                {
                                    xtype : 'textfield',
                                    fieldLabel : 'Company',
                                    labelAlign : 'right',
                                    value : globals['site'],
                                    name : 'report_co_id',
                                    hidden: true
                                }
                            ]
                        }

                    ],
                    fn:Finance_Rpt.Ringkasan_Hutang
                });
            });
            me.Rincian_Hutang= me.addReportByCategory(me.FinanceCategory, 'Rincian Hutang', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange',
                            items : [
                                {
                                    xtype : 'datefield',
                                    fieldLabel : 'Tanggal ' ,
                                    width : 200,
                                    format : 'm/d/Y',
                                    value : new Date(),
                                    name : 'report_date_tanggal'
                                },
                                {
                                    xtype          : 'xtVendorSuplierPopup',
                                    fieldLabel     : 'Creditor :',
                                    name           : 'report_vend_id',
                                    width          : 200
                                },
                                {
                                    xtype : 'textfield',
                                    fieldLabel : 'Company',
                                    labelAlign : 'right',
                                    value : globals['site'],
                                    name : 'report_co_id',
                                    hidden: true
                                }
                            ]
                        }

                    ],
                    fn:Finance_Rpt.Rincian_Hutang
                });
            });
            me.Laporan_Ap_Invoice = me.addReportByCategory(me.FinanceCategory, 'Laporan AP Invoice', function(btn) {

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
                    fn:Finance_Rpt.Laporan_Ap_Invoice
                });
            });
            me.Laporan_AR = me.addReportByCategory(me.FinanceCategory, 'Laporan AR', function(btn) {

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
                    fn:Finance_Rpt.Laporan_AR
                });
            });
            me.Ringkasan_Piutang= me.addReportByCategory(me.FinanceCategory, 'Ringkasan Piutang', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange',
                            items : [
                                {
                                    xtype : 'datefield',
                                    fieldLabel : 'Tanggal ' ,
                                    width : 200,
                                    format : 'm/d/Y',
                                    value : new Date(),
                                    name : 'report_date_tanggal'
                                },
                                {
                                    xtype          : 'xtCustomerPopup',
                                    fieldLabel     : 'Customer :',
                                    name           : 'report_cust_id',
                                    width          : 200
                                },
                                {
                                    xtype          : 'xtSalesPopup',
                                    fieldLabel     : 'Sales ID :',
                                    name           : 'report_sales_id',
                                    width          : 200
                                },
                                {
                                    xtype : 'textfield',
                                    fieldLabel : 'Company',
                                    labelAlign : 'right',
                                    value : globals['site'],
                                    name : 'report_co_id',
                                    hidden: true
                                }
                            ]
                        }

                    ],
                    fn:Finance_Rpt.Ringkasan_Piutang
                });
            });
            me.Rincian_Piutang= me.addReportByCategory(me.FinanceCategory, 'Rincian Piutang', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange',
                            items : [
                                {
                                    xtype : 'datefield',
                                    fieldLabel : 'Tanggal ' ,
                                    width : 200,
                                    format : 'm/d/Y',
                                    value : new Date(),
                                    name : 'report_date_tanggal'
                                },
                                {
                                    xtype          : 'xtCustomerPopup',
                                    fieldLabel     : 'Customer :',
                                    name           : 'report_cust_id',
                                    width          : 200
                                },
                                {
                                    xtype          : 'xtSalesPopup',
                                    fieldLabel     : 'Sales ID :',
                                    name           : 'report_sales_id',
                                    width          : 200
                                },
                                {
                                    xtype : 'textfield',
                                    fieldLabel : 'Company',
                                    labelAlign : 'right',
                                    value : globals['site'],
                                    name : 'report_co_id',
                                    hidden: true
                                }
                            ]
                        }

                    ],
                    fn:Finance_Rpt.Rincian_Piutang
                });
            });
            me.Laporan_Kas_Harian = me.addReportByCategory(me.FinanceCategory, 'Lap. Kas Harian', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange',
                            items : [
                                {
                                    xtype : 'datefield',
                                    fieldLabel : 'Dari ' ,
                                    width : 200,
                                    format : 'm/d/Y',
                                    value : new Date(),
                                    name : 'report_date_fromdate'

                                },
                                {
                                    xtype : 'datefield',
                                    fieldLabel : 'Sampai ' ,
                                    width : 200,
                                    format : 'm/d/Y',
                                    value : new Date(),
                                    name : 'report_date_todate'
                                },
                                {
                                    xtype          : 'xtBankPopup',
                                    fieldLabel     : 'Bank Code :',
                                    name           : 'report_bank_code',
                                    width          : 200
                                },
                                {
                                    xtype : 'textfield',
                                    fieldLabel : 'Company',
                                    labelAlign : 'right',
                                    value : globals['site'],
                                    name : 'report_co_id',
                                    hidden: true
                                }]
                        }

                    ],
                    fn:Finance_Rpt.Laporan_Kas_Harian
                });
            });
            me.Laporan_P_Cashbon = me.addReportByCategory(me.FinanceCategory, 'Lap. Penyelesaian Kas bon', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange',
                            items : [
                                /*{
                                    xtype : 'datefield',
                                    fieldLabel : 'Dari ' ,
                                    width : 200,
                                    format : 'm/d/Y',
                                    value : new Date(),
                                    name : 'report_date_fromdate'

                                },
                                {
                                    xtype : 'datefield',
                                    fieldLabel : 'Sampai ' ,
                                    width : 200,
                                    format : 'm/d/Y',
                                    value : new Date(),
                                    name : 'report_date_todate'
                                },*/
                                {
                                    xtype          : 'xtVendorSuplierPopup',
                                    fieldLabel     : 'User :',
                                    name           : 'report_vend_id',
                                    width          : 200
                                },
                                {
                                    xtype : 'textfield',
                                    fieldLabel : 'Company',
                                    labelAlign : 'right',
                                    value : globals['site'],
                                    name : 'report_co_id',
                                    hidden: true
                                }]
                        }

                    ],
                    fn:Finance_Rpt.Laporan_P_Cashbon
                });
            });
            me.General_Jurnal = me.addReportByCategory(me.FinanceCategory, 'General Jurnal', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange',
                            items : [
                                {
                                    xtype : 'datefield',
                                    fieldLabel : 'From ' ,
                                    width : 200,
                                    format : 'm/d/Y',
                                    value : new Date(),
                                    name : 'report_date_fromdate'
                                },
                                {
                                    xtype : 'datefield',
                                    fieldLabel : 'To ',
                                    width : 200,
                                    format : 'm/d/Y',
                                    value : new Date(),
                                    name : 'report_date_todate'
                                },
                                {
                                    xtype          : 'xtCoaPopup',
                                    fieldLabel     : 'Account :',
                                    name           : 'report_account',
                                    width          : 250
                                },
                                {
                                    xtype: "radiogroup",
                                    fieldLabel: "Module ",
                                    width          : 300,
                                    defaults: {xtype: "radio", name:'report_module'
                                    },
                                    items: [
                                        {boxLabel: "All",checked: true,inputValue:'%%'},
                                        {boxLabel: "AP",inputValue:'AP'},
                                        {boxLabel: "AR",inputValue:'AR'},
                                        {boxLabel: "CB",inputValue:'CB'},
                                        {boxLabel: "RC",inputValue:'RC'}
                                    ]
                                },
                                {
                                    xtype : 'textfield',
                                    fieldLabel : 'dari',
                                    labelAlign : 'right',
                                    value : globals['site'],
                                    name : 'report_co_id',
                                    hidden: true
                                }
                            ]
                        }
                    ],
                    fn:Finance_Rpt.General_Jurnal
                });
            });
            me.Trial_Balance = me.addReportByCategory(me.FinanceCategory, 'Trial Balance', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange',
                            items : [
                                {
                                    xtype : 'fieldcontainer',
                                    itemId : 'fieldContainerDateRange',
                                    items : [
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Periode ',
                                            width : 200,
                                            name : 'report_periode'

                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'dari',
                                            labelAlign : 'right',
                                            value : globals['site'],
                                            name : 'report_co_id',
                                            hidden: true
                                        }]
                                }

                            ]

                        }

                    ],
                    fn:Finance_Rpt.Trial_Balance
                });
            });
            me.Neraca = me.addReportByCategory(me.FinanceCategory, 'Neraca', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange',
                            items : [
                                {
                                    xtype : 'fieldcontainer',
                                    itemId : 'fieldContainerDateRange',
                                    items : [
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Periode ',
                                            width : 200,
                                            name : 'report_prd'

                                        },{
                                            xtype : 'textfield',
                                            fieldLabel : 'dari',
                                            labelAlign : 'right',
                                            value : globals['site'],
                                            name : 'report_coid',
                                            hidden: true
                                        },{
                                            xtype : 'textfield',
                                            name : 'report_dir',
                                            hidden: true
                                        }]
                                }

                            ]

                        }

                    ],
                    fn:Finance_Rpt.Neraca
                });
            });
            me.DetailHPP = me.addReportByCategory(me.FinanceCategory, 'Detail HPP', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange',
                            items : [
                                {
                                    xtype : 'fieldcontainer',
                                    itemId : 'fieldContainerDateRange',
                                    items : [
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Periode ',
                                            width : 200,
                                            name : 'report_periode'

                                        },{
                                            xtype : 'textfield',
                                            fieldLabel : 'dari',
                                            labelAlign : 'right',
                                            value : globals['site'],
                                            name : 'report_co_id',
                                            hidden: true
                                        },{
                                            xtype : 'textfield',
                                            name : 'report_dir',
                                            hidden: true
                                        }]
                                }

                            ]

                        }

                    ],
                    fn:Finance_Rpt.DetailHPP
                });
            });
            me.SummaryHPP = me.addReportByCategory(me.FinanceCategory, 'Summary HPP', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange',
                            items : [
                                {
                                    xtype : 'fieldcontainer',
                                    itemId : 'fieldContainerDateRange',
                                    items : [
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Periode ',
                                            width : 200,
                                            name : 'report_periode'

                                        },{
                                            xtype : 'textfield',
                                            fieldLabel : 'dari',
                                            labelAlign : 'right',
                                            value : globals['site'],
                                            name : 'report_co_id',
                                            hidden: true
                                        }]
                                }

                            ]

                        }

                    ],
                    fn:Finance_Rpt.SummaryHPP
                });
            });

            me.StockCategory = me.addCategory('Report Management Stock', 260);
            me.StockBB = me.addReportByCategory(me.StockCategory, 'Stock Bahan Baku', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange',
                            items : [
                                {
                                    xtype : 'textfield',
                                    fieldLabel : 'Periode ',
                                    labelWidth : 35,
                                    width : 100,
                                    labelAlign : 'right',
                                    name : 'report_periode'

                                },{
                                    xtype : 'textfield',
                                    fieldLabel : 'dari',
                                    labelAlign : 'right',
                                    value : globals['site'],
                                    name : 'report_co_id',
                                    hidden: true
                                }]
                        }

                    ],
                    fn:Stock_Rpt.StockBB
                });
            });
            me.StockDetailBB = me.addReportByCategory(me.StockCategory, 'Detail Bahan Baku', function(btn) {

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
                                },{
                                    xtype : 'textfield',
                                    fieldLabel : 'dari',
                                    labelAlign : 'right',
                                    value : globals['site'],
                                    name : 'report_co_id',
                                    hidden: true
                                }]
                        }

                    ],
                    fn:Stock_Rpt.StockDetailBB
                });
            });
            me.StockBJ = me.addReportByCategory(me.StockCategory, 'Stock Barang Jadi', function(btn) {

                me.goToReportPanelAndSetPanel({
                    title:'Insert Parameter',
                    items : [
                        {
                            xtype : 'fieldcontainer',
                            itemId : 'fieldContainerDateRange',
                            items : [
                                {
                                    xtype : 'textfield',
                                    fieldLabel : 'Periode',
                                    labelWidth : 35,
                                    width : 100,
                                    //format : 'Ym',
                                    labelAlign : 'right',
                                    //value : new Date(),
                                    name : 'report_periode'

                                },{
                                    xtype : 'textfield',
                                    fieldLabel : 'dari',
                                    labelAlign : 'right',
                                    value : globals['site'],
                                    name : 'report_co_id',
                                    hidden: true
                                }]
                        }

                    ],
                    fn:Stock_Rpt.StockBJ
                });
            });
            me.StockDetailBJ = me.addReportByCategory(me.StockCategory, 'Detail Barang Jadi', function(btn) {

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
                                },{
                                    xtype : 'textfield',
                                    fieldLabel : 'dari',
                                    labelAlign : 'right',
                                    value : globals['site'],
                                    name : 'report_co_id',
                                    hidden: true
                                }]
                        }

                    ],
                    fn:Stock_Rpt.StockDetailBJ
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