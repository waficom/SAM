/*
 GaiaEHR (Electronic Health Records)
 Users.js
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
Ext.define('App.view.transaksi.workorder.StockPeriode', {
    extend: 'App.ux.RenderPanel',
    id: 'panelStock',
    pageTitle: 'Stock',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        var searching = {
            ftype: 'searching',
            mode: 'local',
            width: 200
        };
        Ext.define('StockModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'no_pp',type: 'string'},
                {name: 'no_ppd',type: 'string'},
                {name: 'so_num',type: 'string'},
                {name: 'stock_in',type: 'string'},
                {name: 'stock_out',type: 'string'},
                {name: 'stock_total',type: 'string'},
                {name: 'stockdate',type: 'date'}

            ],
            proxy: {
                type: 'direct',
                api: {
                    read: StockPeriode.getStock
                }
            }
        });
        me.StockStore = Ext.create('Ext.data.Store', {
            model: 'StockModel'
        });
        function authCk(val){
            if(val == '1'){
                return '<img src="resources/images/icons/yes.gif" />';
            }else if(val == '0'){
                return '<img src="resources/images/icons/no.gif" />';
            }
            return val;
        }


        // *************************************************************************************
        // Create the GridPanel
        // *************************************************************************************
        me.StockGrid = Ext.create('Ext.grid.Panel', {
            store: me.StockStore,
            columns: [
                //{text: 'co_id',sortable: false,dataIndex: 'co_id',hidden: true },
                {text: 'No.R.Produksi',width: 100,sortable: true,dataIndex: 'no_pp'},
                {text: 'Sales Order',width: 100,sortable: true,dataIndex: 'so_num'},
                //{text: 'no_ppd',width: 100,sortable: true,dataIndex: 'no_ppd', hidden: true},
                {text: 'tanggal',width: 100,sortable: true,dataIndex: 'stockdate'},
                {text: 'IN',width: 100,sortable: true,dataIndex: 'stock_in'},
                {text: 'OUT',width: 100,sortable: true,dataIndex: 'stock_out'},
                {text: 'TOTAL',width: 100,sortable: true,dataIndex: 'stock_total'}
            ],
            features: [searching]

        });
        // *************************************************************************************
        // Window User Form
        // *************************************************************************************
        // END WINDOW
        me.pageBody = [me.StockGrid];
        me.callParent(arguments);
    }, // end of initComponent
    setForm: function(form, title){
        form.up('window').setTitle(title);
    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.StockStore.load();
        callback(true);
    }
});
