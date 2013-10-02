/**
 GaiaEHR (Electronic Health Records)
 Copyright (C) 2013 Certun, inc.

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

Ext.define('Modules.reportcenter.model.ClientList', {
	extend: 'Ext.data.Model',
	fields: [
        {name: 'co_id',type: 'string'},
        {name: 'pabrik_sequence',type: 'string'},
        {name: 'description',type: 'string'},
        {name: 'location',type: 'string'},
        {name: 'remarks',type: 'string'},
        {name: 'userinput',type: 'string'},
        {name: 'useredit',type: 'string'},
        {name: 'timeinput',type: 'date'},
        {name: 'timeedit',type: 'date'}
	],
	proxy : {
		type: 'direct',
		api : {
			read  : Factory_location.getFactorylocation
		}
	}
});