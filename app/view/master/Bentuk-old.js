/*
 GaiaEHR (Electronic Health Records)
 Facilities.js
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
Ext.define('App.view.master.Bentuk', {
    extend: 'App.ux.RenderPanel',
    id: 'panelBentuk',
    pageTitle: 'Bentuk',
    uses: ['App.ux.GridPanel', 'App.ux.window.Window'],
    initComponent: function(){
        var me = this;
        Ext.define('BentukModel', {
            extend: 'Ext.data.Model',
            fields: [
                {
                    name: 'co_id',
                    type: 'string'
                },
                {
                    name: 'bentuk_id',
                    type: 'string'
                },
                {
                    name: 'bentuk_nama',
                    type: 'string'
                },
                {
                    name: 'keterangan',
                    type: 'string'
                },
                {
                    name: 'old_bentuk_id',
                    type: 'string'
                }
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: Bentuk.getBentuk,
                    create: Bentuk.addBentuk,
                    update: Bentuk.updateBentuk,
                    destroy: Bentuk.deleteBentuk
                }
            }
        });
        me.BentukStore = Ext.create('Ext.data.Store', {
            model: 'BentukModel',
            remoteSort: true
        });
        // *************************************************************************************
        // Facility Grid Panel
        // *************************************************************************************
        me.BentukGrid = Ext.create('Ext.grid.Panel', {
            store: me.BentukStore,
            columns: [
                {
                    text: 'co_id',
                    sortable: false,
                    dataIndex: 'co_id',
                    hidden: true
                },
                {
                    text: 'Bentuk ID',
                    width: 100,
                    sortable: true,
                    dataIndex: 'bentuk_id'
                },
                {
                    text: 'Nama Bentuk',
					flex:1,
                    sortable: true,
                    dataIndex: 'bentuk_nama'
                },
                {
                    text: 'Keterangan',
                    width: 200,
                    sortable: true,
                    dataIndex: 'keterangan'
                }
            ],
            plugins: Ext.create('App.ux.grid.RowFormEditing', {
                autoCancel: false,
                errorSummary: false,
                clicksToEdit: 1,
                formItems: [
                    {
                        xtype: 'container',
                        layout: 'column',
                        defaults: {
                            xtype: 'container',
                            columnWidth: 0.5,
                            padding: 5,
                            layout: 'anchor',
                            defaultType: 'textfield'
                        },
                        items: [
                            {
                                defaults: {
                                    anchor: '100%'
                                },
                                items: [
                                    {
                                        fieldLabel: 'ID Bentuk',
                                       	name: 'bentuk_id',
                                       	fieldStyle : 'text-transform: uppercase',
                                        allowBlank: false
                                    },
                                    {
                                        fieldLabel: 'Nama Bentuk',
                                        name: 'bentuk_nama'
                                    },
                                    {
                                        fieldLabel: 'Keterangan',
                                        name: 'keterangan'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }),
            tbar: Ext.create('Ext.PagingToolbar', {
                pageSize: 30,
                store: me.BentukStore,
                displayInfo: true,
                plugins: Ext.create('Ext.ux.SlidingPager', {
                    }),
                items: ['-', {
                    text: 'Add Bentuk',
                    iconCls: 'save',
                    scope: me,
                    handler: me.addBentuk
                }]

            })
        });
        me.pageBody = [me.BentukGrid];
        me.callParent(arguments);
    },
    addBentuk: function(){
        var me = this, grid = me.BentukGrid, store = grid.store;
        grid.editingPlugin.cancelEdit();
        store.insert(0, {
        });
        grid.editingPlugin.startEdit(0, 0);
    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.BentukStore.load();
        callback(true);
    }
});
