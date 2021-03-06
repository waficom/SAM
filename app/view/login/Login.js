/*
 GaiaEHR (Electronic Health Records)
 Login.js
 Logon page
 Copyright (C) 2012 Ernesto Rodriguez

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
Ext.define('App.view.login.Login',
{
	extend : 'Ext.Viewport',
	requires : ['App.ux.combo.Languages'],
	initComponent : function()
	{
		var me = this;
		me.currSite = null;
		me.currLang = null;

		// setting to show site field
		me.showSite = true;

		me.siteError = window.site === false || window.site === '';

		Ext.define('SitesModel',
		{
			extend : 'Ext.data.Model',
			fields : [
			{
				name : 'site_id',
				type : 'int'
			},
			{
				name : 'site',
				type : 'string'
			}],
			proxy :
			{
				type : 'direct',
				api :
				{
					read : authProcedures.getSites
				}
			}
		});

		/**
		 * The Copyright Notice Window
		 */
		me.winCopyright = Ext.create('widget.window',
		{
			id : 'winCopyright',
			title : 'Saraswanti Copyright Notice',
			bodyStyle : 'background-color: #ffffff; padding: 5px;',
			autoLoad : 'gpl-licence-en.html',
			closeAction : 'hide',
			width : 900,
			height : '75%',
			modal : false,
			resizable : true,
			draggable : true,
			closable : true,
			autoScroll : true
		});
		/**
		 * Form Layout [Login]
		 */
		me.formLogin = Ext.create('Ext.form.FormPanel',
		{
			bodyStyle : 'background: #ffffff; padding:5px 5px 0',
			defaultType : 'textfield',
			waitMsgTarget : true,
			frame : false,
			border : false,
			width : 383,
			padding : '0 0 5 0',
			bodyPadding : '5 5 0 5',
			baseParams :
			{
				auth : 'true'
			},
			fieldDefaults :
			{
				msgTarget : 'side',
				labelWidth : 100
			},
			defaults :
			{
				anchor : '100%'
			},
			items : [
			{
				xtype : 'textfield',
				fieldLabel : 'Username',
				blankText : 'Enter your username',
				name : 'authUser',
				itemId : 'authUser',
				minLengthText : 'Username must be at least 3 characters long.',
				minLength : 3,
				maxLength : 25,
				allowBlank : false,
				validationEvent : false,
				listeners :
				{
					scope : me,
					specialkey : me.onEnter
				}
			},
			{
				xtype : 'textfield',
				blankText : 'Enter your password',
				inputType : 'password',
				name : 'authPass',
				fieldLabel : 'Password',
				minLengthText : 'Password must be at least 4 characters long.',
				validationEvent : false,
				allowBlank : false,
				minLength : 4,
				maxLength : 50,
				listeners :
				{
					scope : me,
					specialkey : me.onEnter
				}
			},
			{
				xtype : 'languagescombo',
				name : 'lang',
				itemId : 'lang',
				fieldLabel : 'Language',
				allowBlank : false,
				editable : false,
				listeners :
				{
					scope : me,
					specialkey : me.onEnter,
					select : me.onLangSelect
				}
			}],
			buttons : [
/*
			{
				xtype : 'checkbox',
				name : 'checkin'
			}, 'Check-In Mode', '->',
*/
			{

				text : 'Login',
				name : 'btn_login',
				scope : me,
				handler : me.loginSubmit
			}, '-',
			{
				text : 'Reset',
				name : 'btn_reset',
				scope : me,
				handler : me.onFormReset
			}]
		});

		if (me.showSite)
		{
			me.storeSites = Ext.create('Ext.data.Store',
			{
				model : 'SitesModel',
				autoLoad : false
			});
			me.formLogin.insert(3,
			{
				xtype : 'combobox',
				name : 'site',
				itemId : 'site',
				displayField : 'site',
				valueField : 'site',
				queryMode : 'local',
				fieldLabel : 'Site',
				store : me.storeSites,
				allowBlank : false,
				editable : false,
				msgTarget : 'side',
				labelWidth : 100,
				anchor : '100%',
				listeners :
				{
					scope : me,
					specialkey : me.onEnter,
					select : me.onSiteSelect
				}
			});
		}
		else
		{
			me.formLogin.insert(3,
			{
				xtype : 'textfield',
				name : 'site',
				itemId : 'site',
				hidden : true,
				value : window.site
			});
		}

		/**
		 * The Logon Window
		 */
		me.winLogon = Ext.create('widget.window',
		{
			title : 'Saraswanti Logon',
			closeAction : 'hide',
			plain : true,
			modal : false,
			resizable : false,
			draggable : false,
			closable : false,
			width : 395,
			bodyStyle : 'background: #ffffff;',
			items : [
			{
				xtype : 'box',
				width : 383,
				height : 135,
				html : '<img src="resources/images/logon_header.png" width="100%" height="100%" />'
			}, (me.siteError) ?
			{
				xtype : 'container',
				padding : 15,
				html : 'Sorry no site configuration file found. Please contact Support Desk'
			} : me.formLogin],
			listeners :
			{
				scope : me,
				afterrender : me.afterAppRender
			}
		}).show();

/*
 
		me.notice1 = Ext.create('Ext.Container',
		{
			floating : true,
			cls : 'logout-warning-window',
			style : 'text-align:center; width:800',
			html : 'This demo version is 300% slower because files are not fully minified (compressed) or compiled.<br>' + 'Please allow about 15sec for the app to download. Compiled version loads between 3 - 5 seconds.',
			seconds : 10
		}).show();
		
		me.notice1.alignTo(Ext.getBody(), 't-t', [0, 10]);
*/
		if (Ext.isIE)
		{
			me.notice2 = Ext.create('Ext.Container',
			{
				floating : true,
				cls : 'logout-warning-window',
				style : 'text-align:center; width:800',
				html : '<span style="font-size: 18px;">WAIT!!! There is a known bug with Internet Explorer - <a href="http://gaiaehr.org:8181/browse/GAIAEH-119" target="_blank" style="color: white;">more info...</a></span><br>' + 'Please, access the application through any of these browsers... ' + '<span style="text-decoration: underline;"><a href="https://www.google.com/intl/en/chrome/" target="_blank" style="color: white;">Google Chrome</a></span>, ' + '<span style="text-decoration: underline;"><a href="http://www.mozilla.org/en-US/firefox/new/" target="_blank" style="color: white;">Firefox</a></span>, or ' + '<span style="text-decoration: underline;"><a href="http://www.opera.com/" target="_blank" style="color: white;">Opera</a></span>'
			}).show();
			me.notice2.alignTo(Ext.getBody(), 't-t', [0, 85]);
		}
		else
		if (!Ext.isChrome && !Ext.isOpera && !Ext.isGecko)
		{
			me.notice2 = Ext.create('Ext.Container',
			{
				floating : true,
				cls : 'logout-warning-window',
				style : 'text-align:center; width:800',
				html : 'This Application really heavily on javascript and web 2.0 / ajax requests, although any browser will do the work<br>' + 'we strongly recommend to use any of the fastest browsers to day, <span style="text-decoration: underline;">' + '<span style="text-decoration: underline;"><a href="https://www.google.com/intl/en/chrome/" target="_blank" style="color: white;">Google Chrome</a></span>, ' + '<span style="text-decoration: underline;"><a href="http://www.mozilla.org/en-US/firefox/new/" target="_blank" style="color: white;">Firefox</a></span>, or ' + '<span style="text-decoration: underline;"><a href="http://www.opera.com/" target="_blank" style="color: white;">Opera</a></span>'
			}).show();
			me.notice2.alignTo(Ext.getBody(), 't-t', [0, 85]);
		}

		me.listeners =
		{
			resize : me.onAppResize
		};

		me.callParent(arguments);
	},
	/**
	 * when keyboard ENTER key press
	 * @param field
	 * @param e
	 */
	onEnter : function(field, e)
	{
		if (e.getKey() == e.ENTER)
		{
			this.loginSubmit();
		}
	},
	/**
	 * Form Submit/Logon function
	 */
	loginSubmit : function()
	{
		var me = this, formPanel = this.formLogin, form = formPanel.getForm(), params = form.getValues(), 
		//    checkInMode = me.formLogin.query('checkbox')[0].getValue();
		      checkInMode = 0;
		if (form.isValid())
		{
			formPanel.el.mask('Sending credentials...');
			params.checkInMode = checkInMode;
			authProcedures.login(params, function(provider, response)
			{
				if (response.result.success)
				{
					window.location = './';
					//window.close();
					//window.appWindow = window.open('./','app','fullscreen=yes,directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no');
				}
				else
				{
					Ext.Msg.show(
					{
						title : 'Oops!',
						msg : response.result.error,
						buttons : Ext.Msg.OK,
						icon : Ext.Msg.ERROR
					});
					me.onFormReset();
					formPanel.el.unmask();
				}
			});
		}
		else
		{
			this.msg('Oops!', 'Username And Password are required.');
		}
	},
	/**
	 * gets the site combobox value and store it in currSite
	 * @param combo
	 * @param value
	 */
	onSiteSelect : function(combo, value)
	{
		this.currSite = value[0].data.site;
	},

	onLangSelect : function(combo, value)
	{
		this.currLang = value[0].data.value;
	},
	/**
	 * form rest function
	 */
	onFormReset : function()
	{
		var me = this, form = me.formLogin.getForm();
		form.reset();
		form.setValues(
		{
			site : window.site
//			,
//			lang : me.currLang
		});
		me.formLogin.getComponent('authUser').focus();
	},
	/**
	 * After form is render load store
	 */
	afterAppRender : function()
	{
		var me = this, langCmb = me.formLogin.getComponent('lang');
		if (!me.siteError)
		{
			if (me.showSite)
			{
				me.storeSites.load(
				{
					scope : me,
					callback : function(records, operation, success)
					{
						if (success === true)
						{
							/**
							 * Lets add a delay to make sure the page is fully render.
							 * This is to compensate for slow browser.
							 */
							Ext.Function.defer(function()
							{
								me.currSite = records[0].data.site;
								if (me.showSite)
								{
									me.formLogin.getComponent('site').setValue(this.currSite);
								}
							}, 100, this);
						}
						else
						{
							this.msg('Opps! Something went wrong...', 'No site found.');
						}
					}
				});
			}
			langCmb.store.load(
			{
				callback : function()
				{
					me.currLang = 'en_US';
					me.formLogin.getComponent('lang').setValue(me.currLang);
				}
			});
			Ext.Function.defer(function()
			{
				me.formLogin.getComponent('authUser').inputEl.focus();
			}, 200);
		}
	},
	/**
	 *  animated msg alert
	 * @param title
	 * @param format
	 */
	msg : function(title, format)
	{
		if (!this.msgCt)
		{
			this.msgCt = Ext.core.DomHelper.insertFirst(document.body,
			{
				id : 'msg-div'
			}, true);
		}
		this.msgCt.alignTo(document, 't-t');
		var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
		var m = Ext.core.DomHelper.append(this.msgCt,
		{
			html : '<div class="msg"><h3>' + title + '</h3><p>' + s + '</p></div>'
		}, true);

		m.slideIn('t').pause(3000).ghost('t',
		{
			remove : true
		});
	},

	onAppResize : function()
	{
		this.winLogon.alignTo(this, 'c-c');
//		this.notice1.alignTo(Ext.getBody(), 't-t', [0, 10]);
		if (this.notice2)
			this.notice2.alignTo(Ext.getBody(), 't-t', [0, 85]);
	}
}); 