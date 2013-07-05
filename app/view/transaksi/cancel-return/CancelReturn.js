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
Ext.define('App.view.transaksi.cancel-return.CancelReturn', {
    extend: 'App.ux.RenderPanel',
    id: 'panelCancelReturn',
    pageTitle: 'Cancel Return Transaksi',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.currPosted = null;
        me.currInv_Code= null;
        me.userinput =null;
        me.useredit=null;
        Ext.define('CancelReturnModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id', type: 'string'},
                {name: 'inv_code', type: 'string'},
                {name: 'canceled_date', type: 'date'},
                {name: 'canceled_by', type: 'string'},
                {name: 'status', type: 'string'},
                {name: 'reason', type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'inv_type', type: 'string'},
                {name: 'nominal', type: 'string'}
            ]

        });
        me.CancelReturnStore = Ext.create('Ext.data.Store', {
            model: 'CancelReturnModel',
            proxy: {
                type: 'direct',
                api: {
                    read: CancelReturn.getCancelReturn,
                    create: CancelReturn.addCancelReturn,
                    update: CancelReturn.updateCancelReturn,
                    destroy: CancelReturn.deleteCancelReturn
                }
            },
            autoLoad: false
        });

        // *************************************************************************************
        // Create the GridPanel
        // *************************************************************************************
        me.CancelReturnGrid = Ext.create('App.ux.GridPanel', {
            store: me.CancelReturnStore,
            columns: [
                {width: 150,text: 'Doc. Number',sortable: true,dataIndex: 'inv_code'},
                {width: 100,text: 'Date',sortable: true,dataIndex: 'canceled_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {width: 150,text: 'Reason',sortable: true,dataIndex: 'reason'},
                {width: 150,text: 'Menu',sortable: true,dataIndex: 'inv_type'},
                {width: 150,text: 'Nominal',sortable: true,dataIndex: 'nominal', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {width: 100,text: 'LastUpdate',sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1'  ? 'child-row' :'';
                }
            },
            listeners: {
                scope: me,
                select: me.onGridClick,
                itemdblclick: function(view, record){
                    if(record.get('status')!='1'){
                        me.onItemdblclick(me.CancelReturnStore, record, 'Edit Cancel Return Transaksi');
                    }
                    Ext.getCmp('cancel_cr').enable();
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
                                me.onNew(form, 'CancelReturnModel', 'Tambah Data');
                                Ext.getCmp('cancel_cr').disable();
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'Hapus Data',
                            id:'delete_cr',
                            iconCls: 'delete',
                            handler: function() {
                                me.deleteCancelReturn(me.CancelReturnStore);
                            }
                        },'->',
                        {
                            xtype:'displayfield',
                            itemId:'itemuserinput',
                            margin : '0 5 0 0'
                        }
                    ]
                }
            ]
        });
        // *************************************************************************************
        // Window User Form
        // *************************************************************************************
        me.win = Ext.create('App.ux.window.Window', {
            width: 600,
            items: [
                {
                    xtype: 'mitos.form',
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 100
                    },
                    defaultType: 'textfield',
                    defaults: {
                        labelWidth: 89,
                        anchor: '100%',
                        layout: {
                            type: 'hbox',
                            defaultMargins: {
                                top: 0,
                                right: 5,
                                bottom: 0,
                                left: 0
                            }
                        }
                    },
                    items: [
                        {
                            xtype: "radiogroup",
                            fieldLabel: "Type ",
                            defaults: {xtype: "radio", name:'inv_type'
                            },
                            items: [
                                {
                                    boxLabel: "AP Inv",
                                    checked: true,
                                    inputValue:'1',
                                    handler: function(field, value) {
                                        if (value) {
                                            var me=this;
                                            Ext.getCmp('inv_code_cr').remove(0);
                                            Ext.getCmp('inv_code_cr').add({xtype:'xtAPPopup',name:'inv_code',value: this.getValue()});
                                        }
                                    }

                                },
                                {
                                    boxLabel: "AP PayMent",
                                    inputValue:'2',
                                    handler: function(field, value) {
                                        if (value) {
                                            var me=this;
                                            Ext.getCmp('inv_code_cr').remove(0);
                                            Ext.getCmp('inv_code_cr').add({xtype:'xtAPPayPopup',name:'inv_code',value: this.getValue()});
                                        }
                                    }

                                },
                                {
                                    boxLabel: "AP UM",
                                    inputValue:'3',
                                    handler: function(field, value) {
                                        if (value) {
                                            var me=this;
                                            Ext.getCmp('inv_code_cr').remove(0);
                                            Ext.getCmp('inv_code_cr').add({xtype:'xtAPPayUMPopup',name:'inv_code',value: this.getValue()});
                                        }
                                    }

                                },
                                {
                                    boxLabel: "AP Alocation",
                                    inputValue:'4',
                                    handler: function(field, value) {
                                        if (value) {
                                            var me=this;
                                            Ext.getCmp('inv_code_cr').remove(0);
                                            Ext.getCmp('inv_code_cr').add({xtype:'xtAPAlPopup',name:'inv_code',value: this.getValue()});
                                        }
                                    }

                                },
                                {
                                    boxLabel: "AP Reclass",
                                    inputValue:'5',
                                    handler: function(field, value) {
                                        if (value) {
                                            var me=this;
                                            Ext.getCmp('inv_code_cr').remove(0);
                                            Ext.getCmp('inv_code_cr').add({xtype:'xtAPRCPopup',name:'inv_code',value: this.getValue()});
                                        }
                                    }

                                },
                                {
                                    boxLabel: "AP Manufactur",
                                    inputValue:'6',
                                    handler: function(field, value) {
                                        if (value) {
                                            var me=this;
                                            Ext.getCmp('inv_code_cr').remove(0);
                                            Ext.getCmp('inv_code_cr').add({xtype:'xtAPMnfPopup',name:'inv_code',value: this.getValue()});
                                        }
                                    }

                                }
                            ]
                        },
                        {
                            xtype: "radiogroup",
                            fieldLabel: "type",
                            defaults: {xtype: "radio", name:'inv_type', hideLabel:true
                            },
                            items: [
                                {
                                    boxLabel: "AR Sale",
                                    inputValue:'7',
                                    handler: function(field, value) {
                                        if (value) {
                                            Ext.getCmp('inv_code_cr').remove(0);
                                            Ext.getCmp('inv_code_cr').add({xtype:'xtARPopup',name:'inv_code', value: this.getValue()});
                                        }
                                    }

                                },
                                {
                                    boxLabel: "AR PayMent",
                                    inputValue:'8',
                                    handler: function(field, value) {
                                        if (value) {
                                            Ext.getCmp('inv_code_cr').remove(0);
                                            Ext.getCmp('inv_code_cr').add({xtype:'xtARPayPopup',name:'inv_code', value: this.getValue()});
                                        }
                                    }

                                },
                                {
                                    boxLabel: "AR UM",
                                    inputValue:'9',
                                    handler: function(field, value) {
                                        if (value) {
                                            Ext.getCmp('inv_code_cr').remove(0);
                                            Ext.getCmp('inv_code_cr').add({xtype:'xtARPayUMPopup',name:'inv_code', value: this.getValue()});
                                        }
                                    }

                                },
                                {
                                    boxLabel: "AR Alocation",
                                    inputValue:'10',
                                    handler: function(field, value) {
                                        if (value) {
                                            Ext.getCmp('inv_code_cr').remove(0);
                                            Ext.getCmp('inv_code_cr').add({xtype:'xtARAlPopup',name:'inv_code', value: this.getValue()});
                                        }
                                    }

                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'No. Doc. :'
                                },
                                {
                                    id:'inv_code_cr'

                                }
                            ]
                        },{
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Date '
                                },
                                {
                                    xtype : 'datefield',
                                    width : 100,
                                    name : 'canceled_date',
                                    format : 'd-m-Y',
                                    submitFormat : 'Y-m-d H:i:s',
                                    allowBlank: false
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            defaults: {
                                hideLabel: true
                            },
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 100,
                                    xtype: 'displayfield',
                                    value: 'Reason :'
                                },
                                {
                                    width: 250,
                                    xtype: 'textfield',
                                    name: 'reason'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldcontainer',
                            msgTarget: 'under',
                            items: [
                                {
                                    width: 150,
                                    xtype: 'mitos.checkbox',
                                    fieldLabel: 'Canceled ',
                                    id:'cancel_cr',
                                    name: 'status'
                                }                            ]
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
                            me.onCancelReturnSave(form, me.CancelReturnStore);
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
        // END WINDOW
        me.pageBody = [me.CancelReturnGrid];
        me.callParent(arguments);
    }, // end of initComponent

    onNew: function(form, model, title){
        this.setForm(form, title);
        form.getForm().reset();
        var newModel = Ext.ModelManager.create({
        }, model);
        form.getForm().loadRecord(newModel);
        this.action('new');
        this.win.show();
    },
    onCancelReturnSave: function(form, store){
        var me = this;
        me.saveCancelReturn(form, store);
    },
    saveCancelReturn: function(form, store){
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
                me.msg('Opps!', 'Error!!', true);
            }
        });
        store.load();
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
    deleteCancelReturn: function(store){
        var me = this, grid = me.CancelReturnGrid;
        sm = grid.getSelectionModel();
        sr = sm.getSelection();
        bid = sr[0].get('inv_code');
        Ext.Msg.show({
            title: 'Please Confirm' + '...',
            msg: 'Are you sure want to delete' + ' ?',
            icon: Ext.MessageBox.QUESTION,
            buttons: Ext.Msg.YESNO,
            fn: function(btn){
                if(btn == 'yes'){
//                    CancelReturn.deleteCancelReturn(bid);
                    store.remove(sr);
                    store.sync();
                    if (store.getCount() > 0) {
                        sm.select(0);
                    }
                }
            }
        });
//        store.load();
    },
    onGridClick: function(grid, selected){
        var me = this;
        if(selected.data.status == 1){
            Ext.getCmp('delete_cr').disable();
        }
        var TopBarItems = this.CancelReturnGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);

    },
    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        this.CancelReturnStore.load();
        callback(true);
    }
});
//ens UserPage class