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
Ext.define('App.view.master.Companies', {
    extend: 'App.ux.RenderPanel',
    id: 'panelCompany',
    pageTitle: 'Company',
    uses: ['App.ux.GridPanel', 'App.ux.window.Window'],
    initComponent: function(){
        var me = this;
        Ext.define('CompanyModel', {
            extend: 'Ext.data.Model',
            fields: [
                {
                    name: 'co_id',
                    type: 'string'
                },
                {
                    name: 'co_nama',
                    type: 'string'
                },
                {
                    name: 'npwp',
                    type: 'string'
                },
                {
                    name: 'alamat',
                    type: 'string'
                },
                {
                    name: 'kota',
                    type: 'string'
                },
                {
                    name: 'telepon1',
                    type: 'string'
                },
                {
                    name: 'telepon2',
                    type: 'string'
                },
                {
                    name: 'fax',
                    type: 'string'
                },
                {
                    name: 'propinsi',
                    type: 'string'
                },
                {
                    name: 'kodepos',
                    type: 'string'
                },
                {
                    name: 'negara',
                    type: 'string'
                },
                {
                    name: 'keterangan',
                    type: 'string'
                },
                {
                    name: 'aes',
                    type: 'string'
                },
                {
                    name: 'aktif',
                    type: 'bool'
                }
            ],
            proxy: {
                type: 'direct',
                api: {
                    read: Companies.getCompanies,
                    create: Companies.addCompany,
                    update: Companies.updateCompany,
                    destroy: Companies.deleteCompany
                }
            }
        });
        me.CompanyStore = Ext.create('Ext.data.Store', {
            model: 'CompanyModel',
            remoteSort: true
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
        // Companies Grid Panel
        // *************************************************************************************
        me.CompanyGrid = Ext.create('Ext.grid.Panel', {
            store: me.CompanyStore,
            columns: [
                {
                    text: 'ID',
                    width: 100,
                    sortable: true,
                    dataIndex: 'co_id'
                },
                {
                    text: 'Nama',
					flex:1,
                    sortable: true,
                    dataIndex: 'co_nama'
                },
                {
                    text: 'Alamat',
                    width: 200,
                    sortable: true,
                    dataIndex: 'alamat'
                },
                {
                    text: 'Kota',
                    width: 100,
                    sortable: true,
                    dataIndex: 'kota'
                }
            ],            
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    me.onItemdblclick(me.CompanyStore, record, 'Edit Company');
                }
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            text: 'Tambah Data',
                            iconCls: 'save',
                            handler: function(){
                                var form = me.win.down('form');
                                me.onNew(form, 'CompanyModel', 'Tambah Data');
                            }
                        }
                    ]
                }
            ]
        });
        // *************************************************************************************
        // Window User Form
        // *************************************************************************************
        me.win = Ext.create('App.ux.window.Window', {
            width: 450,
            items: [{
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
                                        fieldLabel: 'ID',
                                       	name: 'co_id',
                                        allowBlank: false
                                    },
                                    {
                                        fieldLabel: 'Nama',
                                        name: 'co_nama'
                                    },
                                    {
                                        fieldLabel: 'Alamat',
                                        name: 'alamat'
                                    },
                                    {
                                        fieldLabel: 'Kota',
                                        name: 'kota'
                                    },
                                    {
                                        fieldLabel: 'Telpon 1',
                                        name: 'telpon1'
                                    },
                                    {
                                        fieldLabel: 'Telpon 2',
                                        name: 'telpon2'
                                    }
                                ]
                            },
                            {
                                defaults: {
                                    anchor: '100%'
                                },
                                items: [
                                    {
                                        fieldLabel: 'Propinsi',
                                        name: 'propinsi'
                                    },
                                    {
                                        fieldLabel: 'Fax',
                                        name: 'fax'
                                    },
                                    {
                                        fieldLabel: 'Kode Pos',
                                        name: 'kodepos'
                                    },
                                    {
                                        fieldLabel: 'Negara',
                                        name: 'negara'
                                    },
                                    {
                                        fieldLabel: 'AES',
                                        name: 'aes'
                                    },
                                    {
                                        xtype: 'mitos.checkbox',
                                        fieldLabel: 'Aktif',
                                        name: 'aktif'
                                    }
                                ]
                            }
                        ]
                    }
                ],
            buttons: [
                {
                    text: i18n('save'),
                    cls: 'winSave',
                    handler: function(){
                        var form = me.win.down('form').getForm();
                        if(form.isValid()){
                            me.oncompanySave(form, me.CompanyStore);
                        }
                    }
                },
                '-',
                {
                    text: i18n('cancel'),
                    scope: me,
                    handler: function(btn){
                        btn.up('window').close();
                    }
                }
            ],
            listeners: {
                scope: me,
                close: function(){
                    me.action('close');
                }
            }
        });
        me.pageBody = [me.CompanyGrid];
        me.callParent(arguments);
    },

/*    addCompany: function(){
        var me = this, grid = me.CompanyGrid, store = grid.store;
        grid.editingPlugin.cancelEdit();
        store.insert(0, {
            aktif: 1
        });
        grid.editingPlugin.startEdit(0, 0);
    },
    
    deleteCompany: function(){
        var me = this, grid = me.CompanyGrid, store = grid.store;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        coid = sr[0].get('co_id');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to quit' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
	                Companies.deleteCompanybyID(coid);
					Companies.deleteCompany();
	                store.remove(sm.getSelection());
	                store.sync();
	                if (store.getCount() > 0) {
	                    sm.select(0);
	                }
                }
            }
        })    	
    },
*/
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onNew: function(form, model, title){
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({
            }, model);
        form.getForm().loadRecord(newModel);
        this.action('new');
        this.win.show();
    },
    oncompanySave: function(form, store){
        var me = this;
			me.savecompany(form, store);
    },
    savecompany: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record);
        if(storeIndex == -1){
            store.add(values);
        }else{
            record.set(values);
        }
        store.sync({
            success:function(){
                me.win.close();
            },
            failure:function(){
                store.load();
                me.msg('Opps!', 'Error!!', true);
            }
        });
    },
    onItemdblclick: function(store, record, title){
        var form = this.win.down('form');
        this.setForm(form, title);
        form.getForm().loadRecord(record);
        this.action('old');
        this.win.show();
    },
    setForm: function(form, title){
        form.up('window').setTitle(title);
    },
    openWin: function(){
        this.win.show();
    },
    action: function(action){
        var win = this.win, form = win.down('form');
        if(action == 'close'){
            form.getForm().reset();
        }
    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.CompanyStore.load();
        callback(true);
    }
});
