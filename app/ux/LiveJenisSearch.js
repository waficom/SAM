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
Ext.define('App.ux.LiveJenisSearch',
{
	extend : 'Ext.form.ComboBox',
	alias : 'widget.jenislivetsearch',
	hideLabel : true,

	initComponent : function()
	{
		var me = this;

		Ext.define('liveJenisSearchModel',
		{
			extend : 'Ext.data.Model',
			fields : [
			{
				name : 'jenis_id'
			},
			{
				name : 'jenis_nama'
			}
			],
			proxy :
			{
				type : 'direct',
				api :
				{
					read : Jenis.getJenisLiveSearch
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
			model : 'liveJenisSearchModel',
			pageSize : 10,
			autoLoad : false
		});

		Ext.apply(this,
		{
			store : me.store,
			displayField : 'jenis_nama',
			valueField : 'jenis_id',
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
					return '<div class="search-item"><h3>{jenis_nama}</h3></div>';
				}
			},
			pageSize : 10
		}, null);

		me.callParent();
	}
}); 