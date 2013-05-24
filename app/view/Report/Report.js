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

Ext.define('app.view.Report.Report', {
    extend   : 'App.ux.RenderPanel',
    id       : 'panelReportCenter',
    pageTitle: i18n('report_center'),

    initComponent            : function() {
        var me = this;

        me.reports = Ext.create('Ext.panel.Panel', {
            layout: 'auto'
        });
        me.pageBody = [ me.reports ];
        /*
         * Patient Reports List
         * TODO: Pass the report indicator telling what report should be rendering
         * this indicator will also be the logic for field rendering.
         */
        me.patientCategory = me.addCategory(i18n('Report 1'), 260);
        me.ClientListReport = me.addReportByCategory(me.patientCategory, i18n('Report 2'), function(btn) {

            if(!me.clientListStore) me.clientListStore = Ext.create('Modules.reportcenter.store.ClientList');

            me.goToReportPanelAndSetPanel({
                title:i18n('client_list_report'),
                items : [
                    {
                        xtype     : 'datefield',
                        fieldLabel: i18n('from'),
                        name      : 'from',
                        format:'Y-m-d'
                    },
                    {
                        xtype     : 'datefield',
                        fieldLabel: i18n('to'),
                        name      : 'to',
                        format:'Y-m-d'
                    }
                ],
                fn:Factory_location.getFactorylocation,
                store:me.clientListStore,
                columns:[
                    {text: 'co_id',width: 100,sortable: true,dataIndex: 'co_id', hidden:true},
                    {text: 'pabrik_sequence',width: 100,sortable: true,dataIndex: 'pabrik_sequence', hidden:true},
                    {text: 'Description',width: 100,sortable: true,dataIndex: 'description'},
                    {text: 'Location',width: 100,sortable: true,dataIndex: 'location'},
                    {text: 'Remarks',width: 100,sortable: true,dataIndex: 'remarks'},
                    {text: 'LastUpdate',width: 100,sortable: true,dataIndex: 'timeedit'}
                ]
            });
        });
/*
         * Clinic Reports List
         * TODO: Pass the report indicator telling what report should be rendering
         * this indicator will also be the logic for field rendering.
         */

        me.callParent(arguments);

    },

    /*
     * Function to add categories with the respective with to the
     * Report Center Panel
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