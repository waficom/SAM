/*
 GaiaEHR (Electronic Health Records)
 LiveLabsSearch.js
 UX
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
Ext.define('App.ux.LiveSalesmanSearch',
{
	extend : 'Ext.form.ComboBox',
	alias : 'widget.salesmanlivetsearch',
	hideLabel : true,

	initComponent : function()
	{
		var me = this;

		Ext.define('liveSalesmanSearchModel',
		{
			extend : 'Ext.data.Model',
			fields : [
			{
				name : 'sales_id'
			},
			{
				name : 'sales_nama'
			}
			],
			proxy :
			{
				type : 'direct',
				api :
				{
					read : Salesman.getSalesmanLiveSearch
				},
				reader :
				{
					totalProperty : 'totals',
					root : 'rows'
				}
			}
		});

		me.store = Ext.create('Ext.data.Store',
		{
			model : 'liveSalesmanSearchModel',
			pageSize : 10,
			autoLoad : false
		});

		Ext.apply(this,
		{
			store : me.store,
			displayField : 'sales_nama',
			valueField : 'sales_id',
			emptyText : 'search...',
			typeAhead : false,
			hideTrigger : true,
			minChars : 1,
			listConfig :
			{
				loadingText : 'searching...',
				//emptyText	: 'No matching posts found.',
				//---------------------------------------------------------------------
				// Custom rendering template for each item
				//---------------------------------------------------------------------
				getInnerTpl : function()
				{
					return '<div class="search-item"><h3>{sales_nama}</h3></div>';
				}
			},
			pageSize : 10
		}, null);

		me.callParent();
	}
}); 