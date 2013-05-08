<?php
/* Main Screen Application
 *
 * Description: This is the main application file, all the global
 * vars are defined here inluding "var app" witch refers to
 * the applciation Viewport.
 *
 * version 1.0.0
 * revision: N/A
 * author: GI Technologies, 2011
 * modified: Ernesto J Rodriguez (Certun)
 *
 * @namespace App.data.REMOTING_API
 */
if (!defined('_GaiaEXEC')) die('No direct access allowed.');
?>
<html>
	<head>
		<script type="text/javascript">
			var app,
				acl = {},
				user = {},
				settings = {},
				globals = {},
				ext = 'extjs-4.1.1a',
				version = '0.0.6.175',
				requires;
		</script>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>SAM Enterprise</title>
		<link rel="stylesheet" type="text/css" href="resources/css/dashboard.css">
		<link rel="stylesheet" type="text/css" href="resources/css/ext-all-gray.css">
		<link rel="stylesheet" type="text/css" href="lib/extensible-1.5.1/resources/css/calendar.css"/>
		<link rel="stylesheet" type="text/css" href="lib/extensible-1.5.1/resources/css/calendar-colors.css"/>
		<link rel="stylesheet" type="text/css" href="lib/extensible-1.5.1/resources/css/recurrence.css"/>
		<link rel="stylesheet" type="text/css" href="resources/css/style_newui.css">
		<link rel="stylesheet" type="text/css" href="resources/css/custom_app.css">
		<link rel="shortcut icon" href="favicon.ico">
	</head>
	<body>
		<!-- Loading Mask -->
		<div id="mainapp-loading-mask" class="x-mask mitos-mask"></div>
		<div id="mainapp-x-mask-msg">
			<div id="mainapp-loading" class="x-mask-msg mitos-mask-msg">
				<div>
					Loading Modules...
				</div>
			</div>
		</div>
		<!-- slide down message div -->
		<span id="app-msg" style="display:none;"></span>
		<!-- Ext library -->
		<script type="text/javascript" src="lib/extjs-4.1.1a/ext-all-debug.js"></script>
		<!-- JSrouter and Ext.deirect API files -->
		<script src="JSrouter.php"></script>
		<script src="data/api.php"></script>
		<script type="text/javascript">
			function i18n(key){	return lang[key] || '*'+key+'*'; }
			function say(a){ console.log(a); } 
			/**
			 * Ext Localization file
			 * Using a anonymous function, in javascript.
			 * Is not intended to be used globally just this once.
			 */
            (function(){
                document.write('<script type="text/javascript" src="lib/extjs-4.1.1a/locale/' + i18n('i18nExtFile') + '?_v' + version + '"><\/script>')
            })();            // Set and enable Ext.loader for dynamic class loading
            Ext.Loader.setConfig({
                enabled: true,
                disableCaching: false,
                paths: {
                    'Ext': 'lib/extjs-4.1.1a/src',
                    'Ext.ux': 'app/ux/ux',
                    'App' : 'app'
/*                    'App': 'app',
                    'Modules': 'modules',
                    'Extensible': 'lib/extensible-1.5.1/src'
*/
                }
            });
		</script>

		<script type="text/javascript" src="app/ux/Overrides.js"></script>
		<script type="text/javascript" src="app/ux/VTypes.js"></script>



		<script type="text/javascript">

        for(var x = 0; x < App.data.length; x++){
            Ext.direct.Manager.addProvider(App.data[x]);
        }
			requires = [
				'Ext.ux.SlidingPager',
				'Ext.ux.PreviewPlugin',
                'Ext.ux.grid.feature.Searching',
				'App.ux.grid.GridToHtml',
				'App.ux.grid.Printer',
				/**
				 * Load the models, the model are the representative of the database
				 * table structure with modifications behind the PHP counterpart.
				 * All table should be declared here, and Sencha's ExtJS models.
				 * This are spreaded in all the core application.
				 */
                'App.model.transaksi.salesorder.SalesOrder',
                'App.model.transaksi.salesorder.SOItems',
                'App.model.transaksi.salesorder.SOLocation',
                'App.model.transaksi.purchaseorder.PurchaseOrder',
                'App.model.transaksi.purchaseorder.POItems',
                'App.model.transaksi.goodsreceived.GoodsReceived',
                'App.model.transaksi.goodsreceived.GRDetail',
                'App.model.transaksi.goodsreceived.GRItems',
                'App.model.transaksi.goodsissued.GoodsIssued',
                'App.model.transaksi.goodsissued.GIDetail',
                'App.model.transaksi.goodsissued.GIItems',
				'App.model.navigation.Navigation',

                'App.store.transaksi.salesorder.SalesOrder',
                'App.store.transaksi.salesorder.SOItems',
                'App.store.transaksi.salesorder.SOLocation',
                'App.store.transaksi.purchaseorder.PurchaseOrder',
                'App.store.transaksi.purchaseorder.POItems',
                'App.store.transaksi.goodsreceived.GoodsReceived',
                'App.store.transaksi.goodsreceived.GRDetail',
                'App.store.transaksi.goodsreceived.GRItems',
                'App.store.transaksi.goodsissued.GoodsIssued',
                'App.store.transaksi.goodsissued.GIDetail',
                'App.store.transaksi.goodsissued.GIItems',
				'App.store.navigation.Navigation',
				/*
				 * Load the activity by the user
				 * This will detect the activity of the user, if the user are idle by a
				 * certain time, it will logout.
				 */
				'App.ux.ActivityMonitor',
				/*
				 * Load the classes that the CORE application needs
				 */
				'App.ux.AbstractPanel',

				'App.ux.LiveJenisSearch',
				'App.ux.LivebbSearch',
				'App.ux.LiveBentukSearch',
				'App.ux.LiveKemasanSearch',
				'App.ux.LiveSpesifikasiSearch',
				'App.ux.LiveSatuanSearch',
				'App.ux.LiveItemsSearch',
				'App.ux.LiveCustomerSearch',
				'App.ux.LiveVendorSearch',
				'App.ux.LiveFormulaSearch',
                'App.ux.LiveWilayahSearch',
                'App.ux.LiveSalesmanSearch',

				'App.ux.ManagedIframe',
				'App.ux.NodeDisabled',
				/*
				 * Load the RenderPanel
				 * This is the main panel when all the forms are rendered.
			     */
				'App.ux.RenderPanel',
				/*
				 * Load the charts related controls
				 */
				'Ext.fx.target.Sprite',
				/*
				 * Load the DropDown related components
				 */
				'Ext.dd.DropZone', 'Ext.dd.DragZone',
				/*
				 * Load the Extensible related controls and panels
				 * This is the Calendar Component that GaiaEHR uses.
				 */
				/*
				 * Load the form specific related fields
				 * Not all the fields are the same.
				 */
				'App.ux.form.fields.Help',
                'App.ux.form.fields.UpperCaseTextField',
				'App.ux.form.fields.Checkbox',
				'App.ux.form.fields.ColorPicker',
				'App.ux.form.fields.Currency',
				'App.ux.form.fields.DateTime',
				'App.ux.form.AdvanceForm',
				'App.ux.form.Panel',
				'App.ux.grid.EventHistory',
				'App.ux.grid.RowFormEditing',
				'App.ux.grid.RowFormEditor',
				/*
				 * Load the combo boxes spread on all the web application
				 * remember this are all reusable combo boxes.
				 */
/*
				'App.ux.combo.ActiveFacilities',
				'App.ux.combo.ActiveInsurances',
				'App.ux.combo.Allergies',
				'App.ux.combo.AllergiesAbdominal',
				'App.ux.combo.AllergiesLocal',
				'App.ux.combo.AllergiesLocation',
				'App.ux.combo.AllergiesSeverity',
				'App.ux.combo.AllergiesSkin',
				'App.ux.combo.AllergiesSystemic',
				'App.ux.combo.AllergiesTypes',
*/
//				'App.ux.combo.Authorizations',
/*
				'App.ux.combo.BillingFacilities',
*/
//				'App.ux.combo.CalendarCategories',
//				'App.ux.combo.CalendarStatus',
//				'App.ux.combo.CodesTypes',
/*
				'App.ux.combo.CVXManufacturers',
				'App.ux.combo.CVXManufacturersForCvx',
				'App.ux.combo.EncounterICDS',
				'App.ux.combo.EncounterPriority',
				'App.ux.combo.Ethnicity',
				'App.ux.combo.Facilities',
				'App.ux.combo.FloorPlanAreas',
				'App.ux.combo.FollowUp',
				'App.ux.combo.InsurancePayerType',
				'App.ux.combo.LabObservations',
				'App.ux.combo.LabsTypes',
*/				
				'App.ux.combo.Languages',
/*
				'App.ux.combo.Lists',
				'App.ux.combo.MedicalIssues',
				'App.ux.combo.Medications',
				'App.ux.combo.MsgNoteType',
				'App.ux.combo.MsgStatus',
				'App.ux.combo.Occurrence',
				'App.ux.combo.Outcome',
				'App.ux.combo.Outcome2',
				'App.ux.combo.PayingEntity',
				'App.ux.combo.PaymentCategory',
				'App.ux.combo.PaymentMethod',
				'App.ux.combo.Pharmacies',
 				'App.ux.combo.posCodes',
				'App.ux.combo.PrescriptionHowTo',
				'App.ux.combo.PrescriptionOften',
				'App.ux.combo.PrescriptionTypes',
				'App.ux.combo.PrescriptionWhen',
				'App.ux.combo.PreventiveCareTypes',
				'App.ux.combo.ProceduresBodySites',
				'App.ux.combo.Providers',
				'App.ux.combo.Race',
				'App.ux.combo.Roles',
				'App.ux.combo.Sex',
				'App.ux.combo.SmokingStatus',
				'App.ux.combo.Surgery',
				'App.ux.combo.TaxId',
     			'App.ux.combo.Templates',
				'App.ux.combo.Themes',
				'App.ux.combo.Time',
				'App.ux.combo.Titles',
				'App.ux.combo.TransmitMethod',
				'App.ux.combo.Types',
				'App.ux.combo.Units',
				'App.ux.combo.Users',
				'App.ux.combo.YesNoNa',
				'App.ux.combo.YesNo',
*/
				'App.ux.window.Window',
				'App.ux.NodeDisabled',
				/*
				 * Load the patient window related panels
				 */
/*
				'App.view.patient.windows.Medical',
				'App.view.patient.windows.Charts',
				'App.view.patient.windows.PreventiveCare',
				'App.view.patient.windows.NewDocuments',
				'App.view.patient.windows.DocumentViewer',
				'App.view.patient.windows.NewEncounter',
				'App.view.patient.windows.ArrivalLog',
*/
				/*
				 * Load the patient related panels
				 */
/*
				'App.view.dashboard.panel.PortalColumn',
				'App.view.dashboard.panel.PortalDropZone',
				'App.view.dashboard.panel.PortalPanel',
				'App.view.dashboard.panel.OnotesPortlet',
				'App.view.dashboard.panel.VisitsPortlet',
*/
				'App.view.dashboard.Dashboard',

				'App.view.master.Companies',
				'App.view.master.Bentuk',
				'App.view.master.BahanBaku',
				'App.view.master.Kemasan',
				'App.view.master.Jenis',
				'App.view.master.Satuan',
				'App.view.master.Customer',
				'App.view.master.Vendor',
				'App.view.master.Spesifikasi',
				'App.view.master.Items',
				'App.view.master.Formula',
                'App.view.master.Salesman',
                'App.view.master.Wilayah',

				/*
				* Load the root related panels
				*/
                'App.view.transaksi.salesorder.SalesOrder',
                'App.view.transaksi.purchaseorder.PurchaseOrder',
                'App.view.transaksi.goodsreceived.GoodsReceived',
                'App.view.transaksi.goodsissued.GoodsIssued',
				//'App.view.calendar.ExtensibleAll',
//				'App.view.calendar.Calendar',
//				'App.view.messages.Messages',
				/*
				 * Load the areas related panels
				 */
/*				
				'App.view.areas.FloorPlan',
     			'App.view.areas.PatientPoolDropZone',
*/
				/**
				 * Load vector charts panel
				 */
/*
				'App.view.patient.charts.BPPulseTemp',
				'App.view.patient.charts.HeadCircumference',
				'App.view.patient.charts.HeightForStature',
*/
				/*
				 * Load the patient related panels
				 */
/*
				'App.view.patient.encounter.CurrentProceduralTerminology',
				'App.view.patient.encounter.HealthCareFinancingAdministrationOptions',
				'App.view.patient.encounter.ICDs',
				'App.view.patient.ItemsToReview',
				'App.view.patient.EncounterDocumentsGrid',
				'App.view.patient.encounter.ICDs',
				'App.view.patient.CheckoutAlertsView',
				'App.view.patient.Vitals',
				'App.view.patient.NewPatient',
				'App.view.patient.Summary',
				'App.view.patient.ProgressNote',
				'App.view.patient.Visits',
				'App.view.patient.Encounter',
				'App.view.patient.windows.Medical',
				'App.view.patient.VisitCheckout',
*/
				/*
				 * Load the fees related panels
				 */
/*
				'App.view.fees.Billing',
				'App.view.fees.PaymentEntryWindow',
				'App.view.fees.Payments',
*/
				/*
				 * Load the administration related panels
				 */
/*
				'App.view.administration.Applications',
				'App.view.administration.DataManager',
				'App.view.administration.Documents',
				'App.view.administration.Facilities',
*/
				'App.view.administration.Globals',
/*
				'App.view.administration.Layout',
				'App.view.administration.Lists',
				'App.view.administration.Log',
				'App.view.administration.Medications',

				'App.view.administration.Modules',

				'App.view.administration.FloorPlans',
				'App.view.administration.Practice',
				'App.view.administration.PreventiveCare',
*/
//				'App.view.administration.Roles',
//				'App.view.administration.ExternalDataLoads',
				'App.view.administration.Users',
			
				/*
				 * Load the miscellaneous related panels
				 */
//				'App.view.miscellaneous.Addressbook',
				'App.view.miscellaneous.MyAccount'
//				'App.view.miscellaneous.MySettings',
/*
				'App.view.miscellaneous.OfficeNotes',
				'App.view.miscellaneous.Websearch',
				'App.view.signature.SignatureWindow',
*/
				/*
				 * Dynamically load the modules
				 */
//				'Modules.Module'
			];
            (function(){
                var scripts = document.getElementsByTagName('script'), localhostTests = [/^localhost$/, /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:\d{1,5})?\b/ // IP v4
                ], host = window.location.hostname, isDevelopment = null, queryString = window.location.search, test, path, i, ln, scriptSrc, match;
                for(i = 0, ln = scripts.length; i < ln; i++){
                    scriptSrc = scripts[i].src;
                    match = scriptSrc.match(/bootstrap\.js$/);
                    if(match){
                        path = scriptSrc.substring(0, scriptSrc.length - match[0].length);
                        break;
                    }
                }
                if(queryString.match('(\\?|&)debug') !== null){
                    isDevelopment = true;
                }else if(queryString.match('(\\?|&)nodebug') !== null){
                    isDevelopment = false;
                }
                if(isDevelopment === null){
                    for(i = 0, ln = localhostTests.length; i < ln; i++){
                        test = localhostTests[i];
                        if(host.search(test) !== -1){
                            isDevelopment = true;
                            break;
                        }
                    }
                }
                if(isDevelopment === null && window.location.protocol === 'file:'){
                    isDevelopment = true;
                }
                if(isDevelopment || !isDevelopment){
                    say('Loading Classes (Development)');
                    //				var jsb3Buffer = '"files": [';
//                    document.write('<script type="text/javascript" charset="UTF-8" src="app/view/calendar/ExtensibleAll.js?_v' + version + '"><\/script>');
                    for(var r = 0; r < requires.length; r++){
                        document.write('<script type="text/javascript" charset="UTF-8" src="' + Ext.Loader.getPath(requires[r]) + '?_v' + version + '"><\/script>');
                        //						var arrayBuffer = Ext.Loader.getPath(requires[r]).split('/'),
                        //								fileName = arrayBuffer.pop();
                        //								filePath = arrayBuffer.join('/');
                        //				        jsb3Buffer = jsb3Buffer + '{' +
                        //					        '"path": "'+filePath+'/",' +
                        //						    '"name": "'+fileName+'"' +
                        //				            '},';
                    }
                    //			   jsb3Buffer = jsb3Buffer+' ]';
                }else{
                    say('Loading Classes (Production)');
                    document.write('<script type="text/javascript" charset="UTF-8" src="app/app-all.js' + '?_v' + version + '"><\/script>');
                }
            })();
            /**
			 * Function to Copy to the clip board.
			 * This function is consumable in all the application.
			 */
            function copyToClipBoard(token){
                app.msg('Sweet!', token + ' copied to clipboard, Ctrl-V or Paste where need it.');
                if(window.clipboardData){
                    window.clipboardData.setData('text', token);
                    return null;
                }else{
                    return (token);
                }
            }
            /**
			 * onWebCamComplete
			 * ???
			 */
/*			
            function onWebCamComplete(msg){
                app.onWebCamComplete(msg);
            }
*/
            /**
			 * Function to pop-up a Window and enable the user to print the QR Code.
			 */
/*
            function printQRCode(pid){
                var src = settings.site_url + '/patients/' + app.patient.pid + '/patientDataQrCode.png?';
                app.QRCodePrintWin = window.open(src, 'QRCodePrintWin', 'left=20,top=20,width=800,height=600,toolbar=0,resizable=0,location=1,scrollbars=0,menubar=0,directories=0');
                Ext.defer(function(){
                    app.QRCodePrintWin.print();
                }, 1000);
            }
*/
            /**
			 * Sencha ExtJS OnReady Event
			 * When all the JS code is loaded execute the entire code once.
			 */
            Ext.onReady(function(){
                /**
                 * lets create the Application Viewport (render the application),
                 * and store the application viewport instance in "app".
                 * @type {*}
                 */
                CronJob.run(function(){
                    say('Loading');
                    app = Ext.create('App.view.Viewport');
                });
            });
		</script>
	</body>
</html>