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

        me.MarketingCategory = me.addCategory('Lap. Marketing', 260);
        me.SuratPesanan = me.addReportByCategory(me.MarketingCategory, 'Surat Pesanan', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype          : 'xtSO_RptPopup',
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
                    },
                    {
                        xtype : 'textfield',
                        fieldLabel : 'dari',
                        labelAlign : 'right',
                        value : globals['site'],
                        name : 'report_co_id',
                        hidden: true
                    }

                ],
                fn:SalesOrder_Rpt.SuratPesanan
            });
        });
        me.FormulirPesanan = me.addReportByCategory(me.MarketingCategory, 'Formulir Pesanan', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype : 'fieldcontainer',
                        itemId : 'fieldContainerDateRange',
                        items : [
                            {
                                xtype          : 'xtSO_RptPopup',
                                fieldLabel     : 'So Num :',
                                hideLabel      : false,
                                name           : 'report_sonum',
                                width          : 350
                            },
                            {
                                xtype          : 'textfield',
                                fieldLabel     : 'Nomor Order :',
                                hideLabel      : false,
                                name           : 'report_No_Order',
                                width          : 350
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
                fn:SalesOrder_Rpt.FormulirPesanan
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
                                xtype          : 'datefield',
                                fieldLabel     : 'Dari :',
                                hideLabel      : false,
                                value : new Date(),
                                name           : 'report_date_fromdate',
                                format : 'm/d/Y',
                                width          : 200

                            },
                            {
                                xtype          : 'datefield',
                                fieldLabel     : 'Sampai :',
                                hideLabel      : false,
                                value : new Date(),
                                name           : 'report_date_todate',
                                format : 'm/d/Y',
                                width          : 200
                            },
                            {
                                xtype          : 'xtSalesPopup',
                                fieldLabel     : 'Sales ID :',
                                name           : 'report_sales_id',
                                width          : 200
                            },
                            {
                                xtype          : 'xtWilayahPopup',
                                fieldLabel     : 'Wilayah ID :',
                                name           : 'report_wilayah_id',
                                width          : 200
                            },
                            {
                                xtype          : 'xtlistproduct',
                                fieldLabel     : 'Kode Produk:',
                                hideLabel      : false,
                                name           : 'report_prod_id',
                                width          : 300
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
                fn:SalesOrder_Rpt.RekapPenjualan
            });
        });
        me.Checklist = me.addReportByCategory(me.MarketingCategory, 'Check List', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype : 'fieldcontainer',
                        itemId : 'fieldContainerDateRange',
                        items : [
                            {
                                xtype          : 'xtSO_RptPopup',
                                fieldLabel     : 'So Num :',
                                hideLabel      : false,
                                name           : 'report_so_num',
                                width          : 350
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

                ],
                fn:SalesOrder_Rpt.Checklist
            });
        });

        me.LogisticsCategory = me.addCategory('Lap. Logistik', 260);
        me.PengadaanBarang = me.addReportByCategory(me.LogisticsCategory, 'Formulir Pengadaan Bahan/Barang', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype          : 'xtPB_rptPopup',
                        fieldLabel     : 'No PB:',
                        hideLabel      : false,
                        name           : 'report_pbnum',
                        width          : 250
                    },
                    {
                        xtype : 'textfield',
                        value : globals['site'],
                        name : 'report_co_id',
                        hidden: true
                    }
                ],
                fn:Logistics_Rpt.PengadaanBarang
            });
        });
        me.RekapPengadaanBarang = me.addReportByCategory(me.LogisticsCategory, 'Rekap Pengadaan Bahan/Barang', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype          : 'datefield',
                        fieldLabel     : 'Dari :',
                        hideLabel      : false,
                        value : new Date(),
                        name           : 'report_date_fromdate',
                        format : 'm/d/Y',
                        width          : 200
                    },
                    {
                        xtype          : 'datefield',
                        fieldLabel     : 'Sampai :',
                        hideLabel      : false,
                        value : new Date(),
                        name           : 'report_date_todate',
                        format : 'm/d/Y',
                        width          : 200
                    },
                    {
                        xtype          : 'xtPB_rptPopup',
                        fieldLabel     : 'No PB:',
                        hideLabel      : false,
                        name           : 'report_pb_num',
                        width          : 250
                    },
                    {
                        xtype          : 'xtGudangBMPopup',
                        fieldLabel     : 'Kode Gudang:',
                        hideLabel      : false,
                        name           : 'report_gudang_id',
                        width          : 250
                    },
                    {
                        xtype : 'textfield',
                        value : globals['site'],
                        name : 'report_co_id',
                        hidden: true
                    }
                ],
                fn:Logistics_Rpt.RekapPengadaanBarang
            });
        });
        me.FormPurchaseOrder = me.addReportByCategory(me.LogisticsCategory, 'Formulir Purchase Order', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype : 'fieldcontainer',
                        itemId : 'fieldContainerDateRange',
                        items : [
                            {
                                xtype          : 'datefield',
                                fieldLabel     : 'Dari :',
                                hideLabel      : false,
                                value : new Date(),
                                name           : 'report_date_fromdate',
                                format : 'm/d/Y',
                                width          : 200
                            },
                            {
                                xtype          : 'datefield',
                                fieldLabel     : 'Sampai :',
                                hideLabel      : false,
                                value : new Date(),
                                name           : 'report_date_todate',
                                format : 'm/d/Y',
                                width          : 200
                            },
                            {
                                xtype          : 'xtPO_rptPopup',
                                fieldLabel     : 'PO :',
                                name           : 'report_po_num',
                                width          : 250
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
                fn:Logistics_Rpt.FormPurchaseOrder
            });
        });
        me.PurchaseOrder = me.addReportByCategory(me.LogisticsCategory, 'Rekap Purchase Order', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype : 'fieldcontainer',
                        itemId : 'fieldContainerDateRange',
                        items : [
                            {
                                xtype          : 'datefield',
                                fieldLabel     : 'Dari :',
                                hideLabel      : false,
                                value : new Date(),
                                name           : 'report_date_fromdate',
                                format : 'm/d/Y',
                                width          : 200

                            },
                            {
                                xtype          : 'datefield',
                                fieldLabel     : 'Sampai :',
                                hideLabel      : false,
                                value : new Date(),
                                name           : 'report_date_todate',
                                format : 'm/d/Y',
                                width          : 200
                            },{
                                xtype : 'textfield',
                                fieldLabel : 'dari',
                                labelAlign : 'right',
                                value : globals['site'],
                                name : 'report_co_id',
                                hidden: true
                            },
                            {
                                xtype          : 'xtPO_rptPopup',
                                fieldLabel     : 'No PO:',
                                hideLabel      : false,
                                name           : 'report_po_num',
                                width          : 300
                            }]
                    }

                ],
                fn:Logistics_Rpt.PurchaseOrder
            });
        });

        me.FormulirBB = me.addReportByCategory(me.LogisticsCategory, 'Analisa Bahan Baku', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Analisa Bahan Baku',
                items : [
                    {
                        xtype : 'fieldcontainer',
                        itemId : 'fieldContainerDateRange',
                        items : [

                            {
                                xtype          : 'textfield',
                                name           : 'report_coid',
                                width          : 200,
                                value          : globals['site'],
                                hidden         : true

                            },
                            {
                                xtype          : 'datefield',
                                fieldLabel     : 'Dari :',
                                hideLabel      : false,
                                value          : new Date(),
                                name           : 'report_date_tgldatang',
                                format         : 'd/m/Y',
                                submitFormat   : 'm/d/Y',
                                width          : 200

                            },
                            {
                                xtype          : 'datefield',
                                fieldLabel     : 'Sampai :',
                                hideLabel      : false,
                                value          : new Date(),
                                name           : 'report_date_tgldatang2',
                                format         : 'd/m/Y',
                                submitFormat   : 'm/d/Y',
                                width          : 200
                            },
                            {
                                xtype          : 'textfield',
                                fieldLabel     : 'No Doc :',
                                name           : 'report_no_doc',
                                width          : 200
                            }
                        ]
                    }

                ],
                fn: RptFormulir.AnalisaBB
            });
        });

        me.AnalisaTB = me.addReportByCategory(me.LogisticsCategory, 'Analisa Timbangan Bahan Baku', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Analisa Timbangan',
                items : [
                    {
                        xtype : 'fieldcontainer',
                        itemId : 'fieldContainerDateRange',
                        items : [

                            {
                                xtype          : 'textfield',
                                name           : 'report_coid',
                                width          : 200,
                                value          : globals['site'],
                                hidden         : true

                            },
                            {
                                xtype          : 'datefield',
                                fieldLabel     : 'Dari :',
                                hideLabel      : false,
                                value          : new Date(),
                                name           : 'report_date_tanggal',
                                format         : 'd/m/Y',
                                submitFormat   : 'm/d/Y',
                                width          : 200

                            },
                            {
                                xtype          : 'datefield',
                                fieldLabel     : 'Sampai :',
                                hideLabel      : false,
                                value          : new Date(),
                                name           : 'report_date_tanggal2',
                                format         : 'd/m/Y',
                                submitFormat   : 'm/d/Y',
                                width          : 200
                            },
                            {
                                xtype          : 'textfield',
                                fieldLabel     : 'No Doc :',
                                name           : 'report_no_doc',
                                width          : 200
                            }
                        ]
                    }

                ],
                fn: RptFormulir.AnalisaTB
            });
        });

        me.RincianBahanBarangMasuk = me.addReportByCategory(me.LogisticsCategory, 'Rekap Bahan/Barang Masuk', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype : 'fieldcontainer',
                        itemId : 'fieldContainerDateRange',
                        items : [
                            {
                                xtype          : 'datefield',
                                fieldLabel     : 'Dari :',
                                hideLabel      : false,
                                value : new Date(),
                                name           : 'report_date_fromdate',
                                format : 'm/d/Y',
                                width          : 200
                            },
                            {
                                xtype          : 'datefield',
                                fieldLabel     : 'Sampai :',
                                hideLabel      : false,
                                value : new Date(),
                                name           : 'report_date_todate',
                                format : 'm/d/Y',
                                width          : 200
                            },
                            {
                                xtype          : 'xtPO_rptPopup',
                                fieldLabel     : 'PO :',
                                name           : 'report_no_po',
                                width          : 250
                            },
                            {
                                xtype          : 'xtGRPopup',
                                fieldLabel     : 'GRN :',
                                name           : 'report_no_grn',
                                width          : 250
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
                fn:Logistics_Rpt.RincianBahanBarangMasuk
            });
        });
        me.PermintaanLogistics = me.addReportByCategory(me.LogisticsCategory, 'Formulir Permintaan Produksi', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype          : 'xtProduksiPopup',
                        fieldLabel     : 'No. Produksi:',
                        hideLabel      : false,
                        name           : 'report_nopp',
                        width          : 300
                    },
                    {
                        xtype          : 'textfield',
                        fieldLabel     : 'Nomor urut:',
                        hideLabel      : false,
                        name           : 'report_No_Produksi',
                        width          : 300
                    },{
                        xtype : 'textfield',
                        fieldLabel : 'dari',
                        labelAlign : 'right',
                        value : globals['site'],
                        name : 'report_co_id',
                        hidden: true
                    }

                ],
                fn:SalesOrder_Rpt.PermintaanLogistics
            });
        });
        me.FormulirBJ = me.addReportByCategory(me.LogisticsCategory, 'Analisa Barang Jadi', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Analisa Barang Jadi',
                items : [
                    {
                        xtype : 'fieldcontainer',
                        itemId : 'fieldContainerDateRange',
                        items : [

                            {
                                xtype          : 'textfield',
                                name           : 'report_coid',
                                width          : 200,
                                value          : globals['site'],
                                hidden         : true

                            },
                            {
                                xtype          : 'datefield',
                                fieldLabel     : 'Dari :',
                                hideLabel      : false,
                                value          : new Date(),
                                name           : 'report_date_tglmasuk',
                                format         : 'd/m/Y',
                                submitFormat   : 'm/d/Y',
                                width          : 200

                            },
                            {
                                xtype          : 'datefield',
                                fieldLabel     : 'Sampai :',
                                hideLabel      : false,
                                value          : new Date(),
                                name           : 'report_date_tglmasuk2',
                                format         : 'd/m/Y',
                                submitFormat   : 'm/d/Y',
                                width          : 200
                            },
                            {
                                xtype          : 'textfield',
                                fieldLabel     : 'No Doc :',
                                name           : 'report_no_doc',
                                width          : 200
                            }
                        ]
                    }

                ],
                fn: RptFormulir.AnalisaBJ
            });
        });

        me.SPKirim = me.addReportByCategory(me.LogisticsCategory, 'Surat Perintah Kirim', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype          : 'xtSPKirimPopup',
                        fieldLabel     : 'No. SP Kirim:',
                        hideLabel      : false,
                        name           : 'report_nosurat',
                        width          : 300
                    },{
                        xtype : 'textfield',
                        fieldLabel : 'dari',
                        labelAlign : 'right',
                        value : globals['site'],
                        name : 'report_co_id',
                        hidden: true
                    }

                ],
                fn:Logistics_Rpt.SPKirim
            });
        });
       me.LPKirim = me.addReportByCategory(me.LogisticsCategory, 'Lap. Pengawasan Pengiriman', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype          : 'numberfield',
                        fieldLabel     : 'Periode:',
                        hideLabel      : false,
                        name           : 'report_periode',
                        width          : 300
                    },{
                        xtype : 'textfield',
                        fieldLabel : 'dari',
                        labelAlign : 'right',
                        value : globals['site'],
                        name : 'report_co_id',
                        hidden: true
                    }

                ],
                fn:Logistics_Rpt.LPKirim
            });
        });
       me.LP_sowodo = me.addReportByCategory(me.LogisticsCategory, 'Lap. Order, Produksi, DO', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype          : 'datefield',
                        fieldLabel     : 'Dari :',
                        hideLabel      : false,
                        value          : new Date(),
                        name           : 'report_date_fromdate',
                        format         : 'd/m/Y',
                        submitFormat   : 'm/d/Y',
                        width          : 200

                    },
                    {
                        xtype          : 'datefield',
                        fieldLabel     : 'Sampai :',
                        hideLabel      : false,
                        value          : new Date(),
                        name           : 'report_date_todate',
                        format         : 'd/m/Y',
                        submitFormat   : 'm/d/Y',
                        width          : 200
                    },
                    {
                        xtype : 'textfield',
                        fieldLabel : 'dari',
                        labelAlign : 'right',
                        value : globals['site'],
                        name : 'report_co_id',
                        hidden: true
                    }

                ],
                fn:Logistics_Rpt.LP_sowodo
            });
        });
        me.LPDKirim = me.addReportByCategory(me.LogisticsCategory, 'Lap. Status Pengiriman BDP', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype          : 'numberfield',
                        fieldLabel     : 'Periode:',
                        hideLabel      : false,
                        name           : 'report_periode',
                        width          : 200
                    },
                    {
                        xtype          : 'xtCustomerPopup',
                        fieldLabel     : 'Customer :',
                        name           : 'report_cust_id',
                        width          : 200
                    },
                    {
                        xtype : 'textfield',
                        fieldLabel : 'dari',
                        labelAlign : 'right',
                        value : globals['site'],
                        name : 'report_co_id',
                        hidden: true
                    }

                ],
                fn:Logistics_Rpt.LPDKirim
            });
        });
        me.LRPKirim = me.addReportByCategory(me.LogisticsCategory, 'Lap. Rincian Pengiriman', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype          : 'xtSO_RptPopup',
                        fieldLabel     : 'So Num :',
                        hideLabel      : false,
                        name           : 'report_so_num',
                        width          : 350
                    },
                    {
                        xtype : 'textfield',
                        fieldLabel : 'dari',
                        labelAlign : 'right',
                        value : globals['site'],
                        name : 'report_co_id',
                        hidden: true
                    }

                ],
                fn:Logistics_Rpt.LRPKirim
            });
        });
        me.LPKBB = me.addReportByCategory(me.LogisticsCategory, 'Perhitungan Kebutuhan BB', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype          : 'numberfield',
                        fieldLabel     : 'Periode:',
                        hideLabel      : false,
                        name           : 'report_periode',
                        width          : 200
                    },
                    {
                        xtype          : 'xtCustomerPopup',
                        fieldLabel     : 'Kode Customer :',
                        name           : 'report_cust_id',
                        width          : 250
                    },
                    {
                        xtype : 'textfield',
                        fieldLabel : 'dari',
                        labelAlign : 'right',
                        value : globals['site'],
                        name : 'report_co_id',
                        hidden: true
                    }

                ],
                fn:Logistics_Rpt.LPKBB
            });
        });

        /* me.FormulirPermintaanBarang = me.addReportByCategory(me.LogisticsCategory, 'Formulir Permintaan Barang Jadi', function(btn) {

         me.goToReportPanelAndSetPanel({
         title:'Insert Parameter',
         items : [
         {
         xtype : 'fieldcontainer',
         itemId : 'fieldContainerDateRange',
         items : [
         {
         xtype          : 'xtDOPopup',
         fieldLabel     : 'Do Num :',
         hideLabel      : false,
         name           : 'report_do_num',
         width          : 350
         },
         {
         xtype          : 'textfield',
         fieldLabel     : 'Nomor Order :',
         hideLabel      : false,
         name           : 'report_No_Order',
         width          : 350
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
         fn:Logistics_Rpt.FormulirPermintaanBarang
         });
         });*/
        me.ProduksiCategory = me.addCategory('Lap. Produksi', 260);
        me.LaporanProduksi = me.addReportByCategory(me.ProduksiCategory, 'Laporan Produksi', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype : 'fieldcontainer',
                        itemId : 'fieldContainerDateRange',
                        items : [
                            {
                                xtype          : 'datefield',
                                fieldLabel     : 'Dari :',
                                hideLabel      : false,
                                value : new Date(),
                                name           : 'report_date_fromdate',
                                format : 'm/d/Y',
                                width          : 200
                            },
                            {
                                xtype          : 'datefield',
                                fieldLabel     : 'Sampai :',
                                hideLabel      : false,
                                value : new Date(),
                                name           : 'report_date_todate',
                                format : 'm/d/Y',
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
                fn:Produksi_Rpt.LaporanProduksi
            });
        });
        /* me.PengirimanBarang = me.addReportByCategory(me.ProduksiCategory, 'Pengiriman Barang', function(btn) {

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
         });*/
        /*me.SuratJalan = me.addReportByCategory(me.ProduksiCategory, 'Surat Jalan', function(btn) {

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
         });*/

        me.FinanceCategory = me.addCategory('Lap. Finance', 260);

        me.Ringkasan_Hutang= me.addReportByCategory(me.FinanceCategory, 'AP Ringkasan Hutang', function(btn) {

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
        me.Rincian_Hutang= me.addReportByCategory(me.FinanceCategory, 'AP Rincian Hutang', function(btn) {

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
        me.Kartu_Hutang= me.addReportByCategory(me.FinanceCategory, 'AP Kartu Hutang', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype : 'fieldcontainer',
                        itemId : 'fieldContainerDateRange',
                        items : [
                            {
                                xtype          : 'xtVendorSuplierPopup',
                                fieldLabel     : 'Creditor :',
                                name           : 'report_vend_id',
                                width          : 200
                            },
                            {
                                xtype: "radiogroup",
                                fieldLabel: "Options ",
                                width          : 300,
                                defaults: {xtype: "radio", name:'report_kategory'
                                },
                                items: [
                                    {boxLabel: "Lunas",inputValue:'L'},
                                    {boxLabel: "Belum",inputValue:'T'},
                                    {boxLabel: "Semua",inputValue:'S',checked: true}
                                ]
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
                fn:Finance_Rpt.Kartu_Hutang
            });
        });
        me.DeliveryOrder = me.addReportByCategory(me.FinanceCategory, 'Lap. Pengiriman Barang Jadi', function(btn) {

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
                        width          : 250
                    },
                    {
                        xtype: "radiogroup",
                        fieldLabel: "Options ",
                        width          : 300,
                        defaults: {xtype: "radio", name:'report_kategory'
                        },
                        items: [
                            {boxLabel: "Semua", inputValue:'S'},
                            {boxLabel: "Belum Invoice",checked: true,inputValue:'N'}
                        ]
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

        /* me.Laporan_Ap_Invoice = me.addReportByCategory(me.FinanceCategory, 'AP Invoice', function(btn) {

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
         });*/
        me.Ringkasan_Piutang= me.addReportByCategory(me.FinanceCategory, 'AR Ringkasan Piutang', function(btn) {

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
        me.Rincian_Piutang= me.addReportByCategory(me.FinanceCategory, 'AR Rincian Piutang', function(btn) {

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
        me.Kartu_Piutang= me.addReportByCategory(me.FinanceCategory, 'AR Kartu Piutang', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype : 'fieldcontainer',
                        itemId : 'fieldContainerDateRange',
                        items : [
                            {
                                xtype          : 'xtCustomerPopup',
                                fieldLabel     : 'Customer :',
                                name           : 'report_vend_id',
                                width          : 200
                            },
                            {
                                xtype: "radiogroup",
                                fieldLabel: "Options ",
                                width          : 300,
                                defaults: {xtype: "radio", name:'report_kategory'
                                },
                                items: [
                                    {boxLabel: "Lunas",inputValue:'L'},
                                    {boxLabel: "Belum",inputValue:'T'},
                                    {boxLabel: "Semua",checked: true,inputValue:'S'}
                                ]
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
                fn:Finance_Rpt.Kartu_Piutang
            });
        });
        me.Laporan_Kas_Harian = me.addReportByCategory(me.FinanceCategory, 'CB Lap. Kas Harian', function(btn) {

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
        me.Laporan_P_Cashbon = me.addReportByCategory(me.FinanceCategory, 'CB Lap. Kas Bon', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype : 'fieldcontainer',
                        itemId : 'fieldContainerDateRange',
                        items : [
                            {
                                xtype: "radiogroup",
                                fieldLabel: "Choice ",
                                width          : 300,
                                defaults: {xtype: "radio", name:'report_pilihan'
                                },
                                items: [
                                    {boxLabel: "Settle",checked: true,inputValue:'N'},
                                    {boxLabel: "Not Settle",inputValue:'Y'}
                                ]
                            },
                            {
                                xtype          : 'xtVendorSuplierPopup',
                                fieldLabel     : 'User :',
                                name           : 'report_vend_id',
                                width          : 200
                            },
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
        me.LapCashflow = me.addReportByCategory(me.FinanceCategory, 'Lap. Cash Flow', function(btn) {

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
                                width : 200,
                                name : 'report_periode'

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
                fn:Finance_Rpt.LapCashflow
            });
        });

        me.LapAset = me.addReportByCategory(me.FinanceCategory, 'Lap. Penyusutan Aset', function(btn) {

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
                                width : 200,
                                name : 'report_periode'
                            },
                            {
                                xtype : 'textfield',
                                fieldLabel : 'Code Aset',
                                width : 200,
                                name : 'report_code'
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
                fn:Finance_Rpt.LapAset
            });
        });
        me.SummaryHPP = me.addReportByCategory(me.FinanceCategory, 'Ringkasan HPP (SAM)', function(btn) {

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
        me.DetailHPP = me.addReportByCategory(me.FinanceCategory, 'Rincian HPP (SAM)', function(btn) {

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

        me.HPP = me.addReportByCategory(me.FinanceCategory, 'HPP (DAL & ADL)', function(btn) {

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
                fn:Finance_Rpt.HPP
            });
        });


        me.General_Jurnal = me.addReportByCategory(me.FinanceCategory, 'General Ledger', function(btn) {

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
                            /*{
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
                            },*/
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
                                    },
                                    {
                                        xtype : 'numberfield',
                                        fieldLabel : 'Max Level ',
                                        width : 150,
                                        value: 10,
                                        name : 'report_int_lvl'
                                    },
                                    {
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
        me.LabaRugi = me.addReportByCategory(me.FinanceCategory, 'LABA / RUGI', function(btn) {

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
                                    },
                                    {
                                        xtype : 'numberfield',
                                        fieldLabel : 'Max Level ',
                                        width : 150,
                                        value: 10,
                                        name : 'report_int_lvl'
                                    },{
                                        xtype : 'textfield',
                                        name : 'report_dir',
                                        hidden: true
                                    }]
                            }

                        ]

                    }

                ],
                fn:Finance_Rpt.LabaRugi
            });
        });

        me.VoucherCategory = me.addCategory('Voucher', 260);
        me.AP_Invoice= me.addReportByCategory(me.VoucherCategory, 'AP Voucher', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype          : 'xtAP_RptPopup',
                        fieldLabel     : 'No. Inv. :',
                        hideLabel      : false,
                        name           : 'report_inv_code',
                        width          : 250
                    },{
                        xtype : 'textfield',
                        value : globals['site'],
                        name : 'report_co_id',
                        hidden: true
                    }

                ],
                fn:Finance_Rpt.AP_Invoice
            });
        });
        me.AR_Voucher= me.addReportByCategory(me.VoucherCategory, 'AR Voucher', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype          : 'xtAR_RptPopup',
                        fieldLabel     : 'No. Inv. :',
                        hideLabel      : false,
                        name           : 'report_inv_code',
                        width          : 250
                    },{
                        xtype : 'textfield',
                        value : globals['site'],
                        name : 'report_co_id',
                        hidden: true
                    }

                ],
                fn:Voucher_Rpt.AR_Voucher
            });
        });
        me.GL_Voucher= me.addReportByCategory(me.VoucherCategory, 'GL AD Voucher', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype          : 'xtGLADPopup',
                        fieldLabel     : 'No. Inv. :',
                        hideLabel      : false,
                        name           : 'report_inv_code',
                        width          : 200
                    },{
                        xtype : 'textfield',
                        value : globals['site'],
                        name : 'report_co_id',
                        hidden: true
                    }

                ],
                fn:Voucher_Rpt.GL_Voucher
            });
        });
        me.KasBankKeluar_Voucher= me.addReportByCategory(me.VoucherCategory, 'Voucher Kas / Bank Keluar', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype          : 'xtKBKPopup',
                        fieldLabel     : 'No. Inv. :',
                        hideLabel      : false,
                        name           : 'report_inv_code',
                        width          : 200
                    },{
                        xtype : 'textfield',
                        value : globals['site'],
                        name : 'report_co_id',
                        hidden: true
                    }

                ],
                fn:Voucher_Rpt.KasBankKeluar_Voucher
            });
        });
        me.KasBankMasuk_Voucher= me.addReportByCategory(me.VoucherCategory, 'Voucher Kas / Bank Masuk', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype          : 'xtKBMPopup',
                        fieldLabel     : 'No. Inv. :',
                        hideLabel      : false,
                        name           : 'report_inv_code',
                        width          : 200
                    },{
                        xtype : 'textfield',
                        value : globals['site'],
                        name : 'report_co_id',
                        hidden: true
                    }

                ],
                fn:Voucher_Rpt.KasBankMasuk_Voucher
            });
        });
        me.Laporan_AR = me.addReportByCategory(me.VoucherCategory, 'AR Form Invoice', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype : 'fieldcontainer',
                        itemId : 'fieldContainerDateRange',
                        items : [
                            {
                                xtype          : 'xtAR_RptPopup',
                                fieldLabel     : 'Dok AR',
                                name           : 'report_inv_code',
                                width          : 250
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
                fn:Finance_Rpt.Laporan_AR
            });
        });

        me.StockCategory = me.addCategory('Management Stock', 260);
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
                                width : 200,
                                name : 'report_periode'

                            },
                            {
                                xtype : 'xtGudangBMPopup',
                                fieldLabel : 'Gudang ',
                                width : 200,
                                name : 'report_gudang'

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
        me.StockDetailBB = me.addReportByCategory(me.StockCategory, 'Rincian Bahan Baku', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype : 'fieldcontainer',
                        itemId : 'fieldContainerDateRange',
                        items : [
                            {
                                xtype          : 'datefield',
                                fieldLabel     : 'Dari :',
                                hideLabel      : false,
                                value : new Date(),
                                name           : 'report_date_fromdate',
                                format : 'm/d/Y',
                                width          : 200
                            },
                            {
                                xtype          : 'datefield',
                                fieldLabel     : 'Sampai :',
                                hideLabel      : false,
                                value : new Date(),
                                name           : 'report_date_todate',
                                format : 'm/d/Y',
                                width          : 200
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
        me.StockBDP = me.addReportByCategory(me.StockCategory, 'Stock Barang Dalam Proses', function(btn) {

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
                                width : 200,
                                name : 'report_periode'

                            },
                            {
                                xtype : 'xtGudangBJPopup',
                                fieldLabel : 'Gudang ',
                                width : 200,
                                name : 'report_gudang'

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
                fn:Stock_Rpt.StockBDP
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
                                fieldLabel : 'Periode ',
                                width : 200,
                                name : 'report_periode'

                            },
                            {
                                xtype : 'xtGudangBJPopup',
                                fieldLabel : 'Gudang ',
                                width : 200,
                                name : 'report_gudang'

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
        /* me.StockDetailBJ = me.addReportByCategory(me.StockCategory, 'Rincian Barang Jadi', function(btn) {

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
         });*/
        me.RincianMasukBJ = me.addReportByCategory(me.StockCategory, 'Rincian Masuk Barang Jadi', function(btn) {

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
                fn:Stock_Rpt.RincianMasukBJ
            });
        });
        me.RincianKeluarBJ = me.addReportByCategory(me.StockCategory, 'Rincian Keluar Barang Jadi', function(btn) {

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
                fn:Stock_Rpt.RincianKeluarBJ
            });
        });

        me.Tax = me.addCategory('Lap. Pajak', 260);
        me.Tax_in = me.addReportByCategory(me.Tax, 'Pajak Masukan', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype : 'fieldcontainer',
                        itemId : 'fieldContainerDateRange',
                        items : [
                            {
                                xtype : 'datefield',
                                fieldLabel : 'Dari Tgl ' ,
                                width : 200,
                                format : 'm/d/Y',
                                value : new Date(),
                                name : 'report_date_fromdate'
                            },
                            {
                                xtype : 'datefield',
                                fieldLabel : 'Sampai',
                                width : 200,
                                format : 'm/d/Y',
                                value : new Date(),
                                name : 'report_date_todate'
                            },
                            {
                                xtype          : 'xtTaxDokinPopup',
                                fieldLabel     : 'No Dok :',
                                name           : 'report_dok_no',
                                width          : 250
                            },{
                                xtype: "radiogroup",
                                fieldLabel: "sudah di bayar ",
                                width          : 300,
                                defaults: {xtype: "radio", name:'report_sudahbelum'
                                },
                                items: [
                                    {boxLabel: "Y",inputValue:'Y'},
                                    {boxLabel: "N",checked: true,inputValue:'N'}
                                ]
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

                ],
                fn:Tax_Rpt.Tax_in
            });
        });
        me.Tax_out = me.addReportByCategory(me.Tax, 'Pajak Keluaran', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype : 'fieldcontainer',
                        itemId : 'fieldContainerDateRange',
                        items : [
                            {
                                xtype : 'datefield',
                                fieldLabel : 'Dari Tgl ' ,
                                width : 200,
                                format : 'm/d/Y',
                                value : new Date(),
                                name : 'report_date_fromdate'
                            },
                            {
                                xtype : 'datefield',
                                fieldLabel : 'Sampai',
                                width : 200,
                                format : 'm/d/Y',
                                value : new Date(),
                                name : 'report_date_todate'
                            },
                            {
                                xtype          : 'xtTaxDokoutPopup',
                                fieldLabel     : 'No Dok :',
                                name           : 'report_dok_no',
                                width          : 250
                            },{
                                xtype: "radiogroup",
                                fieldLabel: "sudah di bayar ",
                                width          : 300,
                                defaults: {xtype: "radio", name:'report_sudahbelum'
                                },
                                items: [
                                    {boxLabel: "Y",inputValue:'Y'},
                                    {boxLabel: "N",checked: true,inputValue:'N'}
                                ]
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

                ],
                fn:Tax_Rpt.Tax_out
            });
        });

        me.Staff = me.addCategory('Lap. Karyawan', 260);
        me.Karyawan = me.addReportByCategory(me.Staff, 'Laporan Karyawan', function(btn) {

            me.goToReportPanelAndSetPanel({
                title:'Insert Parameter',
                items : [
                    {
                        xtype : 'fieldcontainer',
                        itemId : 'fieldContainerDateRange',
                        items : [
                            {
                                xtype : 'datefield',
                                fieldLabel : 'Dari Tgl ' ,
                                width : 200,
                                format : 'm/d/Y',
                                value : new Date(),
                                name : 'report_date_fromdate'
                            },
                            {
                                xtype : 'datefield',
                                fieldLabel : 'Sampai',
                                width : 200,
                                format : 'm/d/Y',
                                value : new Date(),
                                name : 'report_date_todate'
                            },
                            {
                                xtype          : 'textfield',
                                fieldLabel     : 'User :',
                                name           : 'report_user',
                                width          : 250
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

                ],
                fn:Staff_Rpt.Karyawan
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