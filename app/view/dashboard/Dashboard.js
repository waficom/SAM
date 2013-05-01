/*
	GaiaEHR (Electronic Health Records)
	Dashboard.js
	Dashboard
    Copyright (C) 2012 Ernesto J Rodriguez

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
Ext.define('App.view.dashboard.Dashboard',
{
	extend        : 'App.ux.RenderPanel',
	id            : 'panelDashboard',
	pageTitle     : i18n('dashboard'),
	getTools      : function() 
	{
		return [
/*
		{
			xtype  : 'tool',
			type   : 'gear',
			handler: function(e, target, panelHeader) 
			{
				var portlet = panelHeader.ownerCt;
				portlet.setLoading( i18n('working') + '...');
				Ext.defer(function() 
				{
					portlet.setLoading(false);
				}, 2000);
			}
		}
*/
		];
	},
	initComponent : function() 
	{
		var content = '<div class="portlet-content">HELLO WORLD!</div>';
		Ext.apply(this, 
		{
			pageBody: []
		}, 
		null);
		this.callParent();
	},
	
	onPortletClose: function(portlet) 
	{
		this.msg(i18n('message') + '!', portlet.title + ' ' + i18n('was_removed'));
	},
	
	/**
	 * This function is called from Viewport.js when
	 * this panel is selected in the navigation panel.
	 * place inside this function all the functions you want
	 * to call every this panel becomes active
	 */
	onActive      : function(callback) 
	{
		callback(true);
	}
}); //ens UserPage class
