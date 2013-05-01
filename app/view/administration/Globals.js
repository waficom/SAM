 /*
 GaiaEHR (Electronic Health Records)
 Globals.js
 Gloabl Settings
 Copyright (C) 2012 Ernesto J. Rodriguez (Certun)

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
Ext.define('App.view.administration.Globals',
{
	extend : 'App.ux.RenderPanel',
	id : 'panelGlobals',
	pageTitle : i18n('global_settings'),
	uses : ['App.ux.form.fields.Checkbox'],
	initComponent : function()
	{
		var me = this;
		// *************************************************************************************
		// Global Model and Data store
		// *************************************************************************************
		Ext.define('GlobalSettingsModel',
		{
			extend : 'Ext.data.Model',
			fields : [
			{
				name : 'fullname',
				type : 'string'
			},
			{
				name : 'default_top_pane',
				type : 'string'
			},
			{
				name : 'main_navigation_menu_left',
				type : 'string'
			},
			{
				name : 'css_header',
				type : 'string'
			},
			{
				name : 'gbl_nav_area_width',
				type : 'int'
			},
			{
				name : 'GaiaEHR_name',
				type : 'string'
			},
			{
				name : 'full_new_patient_form',
				type : 'string'
			},
			{
				name : 'online_support_link',
				type : 'string'
			},
			{
				name : 'language_default',
				type : 'string'
			},
			{
				name : 'units_of_measurement',
				type : 'string'
			},
			{
				name : 'disable_deprecated_metrics_form',
				type : 'auto'
			},
			{
				name : 'phone_country_code',
				type : 'string'
			},
			{
				name : 'date_display_format',
				type : 'string'
			},
			{
				name : 'time_display_format',
				type : 'string'
			},
			{
				name : 'currency_decimals',
				type : 'string'
			},
			{
				name : 'currency_dec_point',
				type : 'auto'
			},
			{
				name : 'currency_thousands_sep',
				type : 'auto'
			},
			{
				name : 'gbl_currency_symbol',
				type : 'auto'
			},
			{
				name : 'specific_application',
				type : 'auto'
			},
			{
				name : 'inhouse_pharmacy',
				type : 'auto'
			},
			{
				name : 'disable_chart_tracker',
				type : 'auto'
			},
			{
				name : 'disable_phpmyadmin_link',
				type : 'auto'
			},
			{
				name : 'disable_immunizations',
				type : 'auto'
			},
			{
				name : 'disable_prescriptions',
				type : 'auto'
			},
			{
				name : 'omit_employers',
				type : 'auto'
			},
			{
				name : 'select_multi_providers',
				type : 'auto'
			},
			{
				name : 'disable_non_default_groups',
				type : 'auto'
			},
			{
				name : 'ignore_pnotes_authorization',
				type : 'auto'
			},
			{
				name : 'support_encounter_claims',
				type : 'auto'
			},
			{
				name : 'advance_directives_warning',
				type : 'auto'
			},
			{
				name : 'configuration_import_export',
				type : 'auto'
			},
			{
				name : 'restrict_user_facility',
				type : 'auto'
			},
			{
				name : 'set_facility_cookie',
				type : 'auto'
			},
			{
				name : 'discount_by_money',
				type : 'auto'
			},
			{
				name : 'gbl_visit_referral_source',
				type : 'auto'
			},
			{
				name : 'gbl_mask_patient_id',
				type : 'auto'
			},
			{
				name : 'gbl_mask_invoice_number',
				type : 'auto'
			},
			{
				name : 'gbl_mask_product_id',
				type : 'auto'
			},
			{
				name : 'force_billing_widget_open',
				type : 'auto'
			},
			{
				name : 'activate_ccr_ccd_report',
				type : 'auto'
			},
			{
				name : 'disable_calendar',
				type : 'auto'
			},
			{
				name : 'schedule_start',
				type : 'auto'
			},
			{
				name : 'schedule_end',
				type : 'auto'
			},
			{
				name : 'calendar_interval',
				type : 'auto'
			},
			{
				name : 'calendar_appt_style',
				type : 'auto'
			},
			{
				name : 'docs_see_entire_calendar',
				type : 'auto'
			},
			{
				name : 'auto_create_new_encounters',
				type : 'auto'
			},
			{
				name : 'timeout',
				type : 'auto'
			},
			{
				name : 'secure_password',
				type : 'auto'
			},
			{
				name : 'password_history',
				type : 'auto'
			},
			{
				name : 'password_expiration_days',
				type : 'auto'
			},
			{
				name : 'password_grace_time',
				type : 'auto'
			},
			{
				name : 'is_client_ssl_enabled',
				type : 'auto'
			},
			{
				name : 'certificate_authority_crt',
				type : 'auto'
			},
			{
				name : 'certificate_authority_key',
				type : 'auto'
			},
			{
				name : 'client_certificate_valid_in_days',
				type : 'auto'
			},
			{
				name : 'Emergency_Login_email_id',
				type : 'auto'
			},
			{
				name : 'practice_return_email_path',
				type : 'auto'
			},
			{
				name : 'EMAIL_METHOD',
				type : 'auto'
			},
			{
				name : 'SMTP_HOST',
				type : 'auto'
			},
			{
				name : 'SMTP_PORT',
				type : 'auto'
			},
			{
				name : 'SMTP_USER',
				type : 'auto'
			},
			{
				name : 'SMTP_PASS',
				type : 'auto'
			},
			{
				name : 'EMAIL_NOTIFICATION_HOUR',
				type : 'auto'
			},
			{
				name : 'SMS_NOTIFICATION_HOUR',
				type : 'auto'
			},
			{
				name : 'SMS_GATEWAY_USENAME',
				type : 'auto'
			},
			{
				name : 'SMS_GATEWAY_PASSWORD',
				type : 'auto'
			},
			{
				name : 'SMS_GATEWAY_APIKEY',
				type : 'auto'
			},
			{
				name : 'enable_auditlog',
				type : 'auto'
			},
			{
				name : 'audit_events_patient-record',
				type : 'auto'
			},
			{
				name : 'audit_events_scheduling',
				type : 'auto'
			},
			{
				name : 'audit_events_order',
				type : 'auto'
			},
			{
				name : 'audit_events_security-administration',
				type : 'auto'
			},
			{
				name : 'audit_events_backup',
				type : 'auto'
			},
			{
				name : 'audit_events_other',
				type : 'auto'
			},
			{
				name : 'audit_events_query',
				type : 'auto'
			},
			{
				name : 'enable_atna_audit',
				type : 'auto'
			},
			{
				name : 'atna_audit_host',
				type : 'auto'
			},
			{
				name : 'atna_audit_port',
				type : 'auto'
			},
			{
				name : 'atna_audit_localcert',
				type : 'auto'
			},
			{
				name : 'atna_audit_cacert',
				type : 'auto'
			},
			{
				name : 'mysql_bin_dir',
				type : 'auto'
			},
			{
				name : 'perl_bin_dir',
				type : 'auto'
			},
			{
				name : 'temporary_files_dir',
				type : 'auto'
			},
			{
				name : 'backup_log_dir',
				type : 'auto'
			},
			{
				name : 'state_data_type',
				type : 'auto'
			},
			{
				name : 'state_list',
				type : 'auto'
			},
			{
				name : 'state_custom_addlist_widget',
				type : 'auto'
			},
			{
				name : 'country_data_type',
				type : 'auto'
			},
			{
				name : 'country_list',
				type : 'auto'
			},
			{
				name : 'print_command',
				type : 'auto'
			},
			{
				name : 'default_chief_complaint',
				type : 'auto'
			},
			{
				name : 'default_new_encounter_form',
				type : 'auto'
			},
			{
				name : 'patient_id_category_name',
				type : 'auto'
			},
			{
				name : 'patient_photo_category_name',
				type : 'auto'
			},
			{
				name : 'MedicareReferrerIsRenderer',
				type : 'auto'
			},
			{
				name : 'post_to_date_benchmark',
				type : 'auto'
			},
			{
				name : 'enable_hylafax',
				type : 'auto'
			},
			{
				name : 'hylafax_server',
				type : 'auto'
			},
			{
				name : 'hylafax_basedir',
				type : 'auto'
			},
			{
				name : 'hylafax_enscript',
				type : 'auto'
			},
			{
				name : 'enable_scanner',
				type : 'auto'
			},
			{
				name : 'scanner_output_directory',
				type : 'auto'
			},
			{
				name : 'autosave',
				type : 'auto'
			}]
		});

		me.store = Ext.create('Ext.data.Store',
		{
			model : 'GlobalSettingsModel',
			proxy :
			{
				type : 'direct',
				api :
				{
					read : Globals.getGlobals
				}
			},
			autoLoad : false
		});

		//------------------------------------------------------------------------------
		// When the data is loaded semd values to de form
		//------------------------------------------------------------------------------
		me.store.on('load', function()
		{
			var rec = me.store.getAt(0);
			// get the record from the store
			me.globalFormPanel.getForm().loadRecord(rec);
		});
		// *************************************************************************************
		// DataStores for all static combos
		// *************************************************************************************
		me.default_top_pane_store = Ext.create('Ext.data.Store',
		{
			fields : ['title', 'option_id'],
			data : [
			{
				"title" : i18n('dashboard'),
				"option_id" : "app/dashboard/dashboard.ejs.php"
			}]
		});
		me.fullname_store = Ext.create('Ext.data.Store',
		{
			fields : ['format', 'option_id'],
			data : [
			{
				"format" : i18n('last_first_middle'),
				"option_id" : "0"
			},
			{
				"format" : i18n('first_middle_last'),
				"option_id" : "1"
			}]
		});
		me.main_navigation_menu_left_store = Ext.create('Ext.data.Store',
		{
			fields : ['title', 'option_id'],
			data : [
			{
				"title" : i18n('main_navigation_menu_left'),
				"option_id" : "west"
			},
			{
				"title" : i18n('main_navigation_menu_right'),
				"option_id" : "east"
			}]
		});
		me.css_header_store = Ext.create('Ext.data.Store',
		{
			fields : ['title', 'option_id'],
			data : [
			{
				"title" : i18n('grey_default'),
				"option_id" : "ext-all-gray.css"
			},
			{
				"title" : i18n('blue'),
				"option_id" : "ext-all.css"
			},
			{
				"title" : i18n('access'),
				"option_id" : "ext-all-access.css"
			}]
		});
		me.date_display_format_store = Ext.create('Ext.data.Store',
		{
			fields : ['title', 'option_id'],
			data : [
			{
				"title" : i18n('yyyy_mm_dd'),
				"option_id" : "Y-m-d"
			},
			{
				"title" : i18n('mm_dd_yyyy'),
				"option_id" : "m/d/Y"
			},
			{
				"title" : i18n('dd_mm_yyyy'),
				"option_id" : "d/m/Y"
			}]
		});
		me.time_display_format_store = Ext.create('Ext.data.Store',
		{
			fields : ['title', 'option_id'],
			data : [
			{
				"title" : i18n('24_hr'),
				"option_id" : "H:i"
			},
			{
				"title" : i18n['12_hr'],
				"option_id" : "g:i a"
			}]
		});
		me.currency_decimals_store = Ext.create('Ext.data.Store',
		{
			fields : ['title', 'option_id'],
			data : [
			{
				"title" : i18n('0'),
				"option_id" : "0"
			},
			{
				"title" : i18n('1'),
				"option_id" : "1"
			},
			{
				"title" : i18n('2'),
				"option_id" : "2"
			}]
		});
		me.currency_dec_point_store = Ext.create('Ext.data.Store',
		{
			fields : ['title', 'option_id'],
			data : [
			{
				"title" : i18n('comma'),
				"option_id" : ","
			},
			{
				"title" : i18n('period'),
				"option_id" : "."
			}]
		});
		me.currency_thousands_sep_store = Ext.create('Ext.data.Store',
		{
			fields : ['title', 'option_id'],
			data : [
			{
				"title" : i18n('comma'),
				"option_id" : ","
			},
			{
				"title" : i18n('period'),
				"option_id" : "."
			},
			{
				"title" : i18n('space'),
				"option_id" : " "
			},
			{
				"title" : i18n('none'),
				"option_id" : ""
			}]
		});
		//**************************************************************************
		// Dummy Store
		//**************************************************************************
		me.dummyStore = new Ext.data.ArrayStore(
		{
			fields : ['title', 'option_id'],
			data : [[i18n('option_1'), 'Option 1'], [i18n('option_2'), 'Option 2'], [i18n('option_3'), 'Option 3'], [i18n('option_5'), 'Option 5'], [i18n('option_6'), 'Option 6'], [i18n('option_7'), 'Option 7']]
		});
		//**************************************************************************
		// Global Form Panel
		//**************************************************************************
		me.globalFormPanel = Ext.create('App.ux.form.Panel',
		{
			layout : 'fit',
			autoScroll : true,
			bodyStyle : 'padding: 0;',
			fieldDefaults :
			{
				msgTarget : 'side',
				labelWidth : 220,
				width : 520
			},
			defaults :
			{
				anchor : '100%'
			},
			items : [
			{
				xtype : 'tabpanel',
				activeTab : 0,
				defaults :
				{
					bodyStyle : 'padding:10px',
					autoScroll : true
				},
				items : [
				{
					title : i18n('appearance'),
					defaults :
					{
						anchor : '100%'
					},
					items : [
                        {
                            xtype : 'combo',
                            fieldLabel : i18n('main_top_pane_screen'),
                            name : 'default_top_pane',
                            displayField : 'title',
                            valueField : 'option_id',
                            editable : false,
                            store : me.default_top_pane_store
                        },
                        {
                            xtype : 'combo',
                            fieldLabel : i18n('layout_style'),
                            name : 'main_navigation_menu_left',
                            displayField : 'title',
                            valueField : 'option_id',
                            editable : false,
                            store : me.main_navigation_menu_left_store
                        },
                        {
                            xtype : 'combo',
                            fieldLabel : i18n('theme'),
                            name : 'css_header',
                            displayField : 'title',
                            valueField : 'option_id',
                            editable : false,
                            store : me.css_header_store
                        },
                        {
                            xtype : 'textfield',
                            fieldLabel : i18n('navigation_area_width'),
                            name : 'gbl_nav_area_width'
                        }
                    ]
				},
				{
					title : 'Locale',
					defaultType : 'textfield',
					items : [
					{
						xtype : 'combo',
						fieldLabel : i18n('fullname_format'),
						name : 'fullname',
						displayField : 'format',
						valueField : 'option_id',
						editable : false,
						store : me.fullname_store
					},
					{
						xtype : 'languagescombo',
						fieldLabel : i18n('default_language'),
						name : 'language_default'
					},
					{
						xtype : 'combo',
						fieldLabel : i18n('date_display_format'),
						name : 'date_display_format',
						displayField : 'title',
						valueField : 'option_id',
						editable : false,
						store : me.date_display_format_store
					},
					{
						xtype : 'combo',
						fieldLabel : i18n('time_display_format'),
						name : 'time_display_format',
						displayField : 'title',
						valueField : 'option_id',
						editable : false,
						store : me.time_display_format_store
					},
					{
						xtype : 'combo',
						fieldLabel : i18n('currency_decimal_places'),
						name : 'currency_decimals',
						displayField : 'title',
						valueField : 'option_id',
						editable : false,
						store : me.currency_decimals_store
					},
					{
						xtype : 'combo',
						fieldLabel : i18n('currency_decimal_point_symbol'),
						name : 'currency_dec_point',
						displayField : 'title',
						valueField : 'option_id',
						editable : false,
						store : me.currency_dec_point_store
					},
					{
						xtype : 'combo',
						fieldLabel : i18n('currency_thousands_separator'),
						name : 'currency_thousands_sep',
						displayField : 'title',
						valueField : 'option_id',
						editable : false,
						store : me.currency_thousands_sep_store
					},
					{
						xtype : 'textfield',
						fieldLabel : i18n('currency_designator'),
						name : 'gbl_currency_symbol'
					}]
				},
				{
					title : 'Features',
					defaultType : 'mitos.checkbox',
					items : [
                        {
                            fieldLabel : i18n('autosave_forms'),
                            name : 'autosave'
                        }
                    ]
				},
				{
					title : 'Security',
					defaultType : 'textfield',
					items : [
					{
						fieldLabel : i18n('idle_session_timeout_seconds'),
						name : 'timeout'
					}]
				}],
				dockedItems : [
				{
					xtype : 'toolbar',
					dock : 'top',
					items : [
					{
						text : i18n('save_configuration'),
						iconCls : 'save',
						handler : function()
						{
							var form = me.globalFormPanel.getForm();
							me.onGloblasSave(form, me.store);
						}
					}]
				}]
			}]
		});
		me.pageBody = [me.globalFormPanel];
		me.callParent(arguments);
	}, // end of initComponent
	onGloblasSave : function(form, store)
	{
		var record = form.getRecord(), values = form.getValues();
		Globals.updateGlobals(values, function()
		{
			store.load();
		});

		this.msg(i18n('new_global_configuration_saved'), i18n('refresh_the_application'));
	},
	/**
	 * This function is called from Viewport.js when
	 * this panel is selected in the navigation panel.
	 * place inside this function all the functions you want
	 * to call every this panel becomes active
	 */
	onActive : function(callback)
	{
		this.store.load();
		callback(true);
	}
});
//ens LogPage class