Ext.define('App.view.transaksi.AP-Invoice.Penyusutan_Aset', {
    extend: 'App.ux.RenderPanel',
    id: 'panelPenyusutan_Aset2',
    pageTitle: 'Penyusutan_Aset2',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        Ext.define('Penyusutan_Aset2Model', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'inv_code',type: 'string'},
                {name: 'account',type: 'string'},
                {name: 'coa_nama',type: 'string'},
                {name: 'sisa_umur_aset',type: 'string'},
                {name: 'pa_id',type: 'string'},
                {name: 'sequence_no',type: 'string'},
                {name: 'debit',type: 'float'},
                {name: 'timeedit',type: 'date'}
            ]

        });
        me.Penyusutan_Aset2Store = Ext.create('Ext.data.Store', {
            model: 'Penyusutan_Aset2Model',
            proxy: {
                type: 'direct',
                api: {
                    read: Penyusutan_Aset2.getPenyusutan_Aset2,
                    create: Penyusutan_Aset2.addPenyusutan_Aset2
                }
            },
            autoLoad: false
        });

        // *************************************************************************************
        // Create the GridPanel
        // *************************************************************************************
        me.Penyusutan_Aset2Grid = Ext.create('App.ux.GridPanel', {
            store: me.Penyusutan_Aset2Store,
            selModel :  Ext.create( 'Ext.selection.CheckboxModel'),
            columns: [
                {width: 200,text: 'sequence_no',sortable: true,dataIndex: 'sequence_no', hidden:true},
                {text: 'Account',sortable: true,dataIndex: 'account'},
                {text: 'Description',sortable: true,dataIndex: 'coa_nama', flex:1},
                {

                    text: 'Umur', dataIndex:'pa_id',
                    editor: {
                        xtype: 'combobox'
                    }
                },
                {text: 'Sisa Umur Aset (bln)',sortable: true, dataIndex: 'sisa_umur_aset'},
                {text: 'Doc. Number',sortable: true, dataIndex: 'inv_code'},
                {text: 'Debit',sortable: true,dataIndex: 'debit', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {text: 'LastUpdate', width : 80, sortable: true, dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            listeners: {
                scope: me,
                itemdblclick: function(view, record){
                    me.onItemdblclick(me.Penyusutan_Aset2Store, record, 'Edit Penyusutan_Aset2');
                }
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype : 'fieldcontainer',
                            items : [
                                {
                                    xtype : 'xtCoaPopup',
                                    id : 'account_susut',
                                    fieldLabel : 'Account',
                                    labelWidth : 50,
                                    width : 200
                                }]
                        },
                        {
                            xtype : 'button',
                            width : 80,
                            margin : '0 0 3 0',
                            text: 'Searching',
                            listeners :
                            {
                                scope : me,
                                click : me.SeachingItem
                            }
                        },
                        {
                            text: 'Posting',
                            iconCls: 'icoArrowRightSmall',
                            scope: me,
                            handler: function(){
                                var form = me.win.down('form').getForm();
                                if(form.isValid()){
                                    me.PostingItem(form, me.Penyusutan_Aset2Store);
                                }
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
            width: 600,
            items: [
                {
                    xtype: 'mitos.form',
                    fieldDefaults: {
                        msgTarget: 'side',
                        labelWidth: 100
                    },
                    defaultType: 'textfield',
                    items: [
                        ,{
                            xtype: 'textfield',
                            hidden: true,
                            name: 'sequence_no'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'inv_code'
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            name: 'account'
                        },{
                            xtype: 'textfield',
                            hidden: true,
                            name: 'debit'
                        }
                    ]
                }
            ]
        });
        // END WINDOW
        me.pageBody = [me.Penyusutan_Aset2Grid];
        me.callParent(arguments);
    }, // end of initComponent


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
    SeachingItem: function(btn){
        var getAccount = Ext.getCmp('account_susut').getValue();
        this.Penyusutan_Aset2Store.load({params:{account : getAccount}});
    },
    PostingItem: function(form, store){
        var me = this, record = form.getRecord(), values = form.getValues(), storeIndex = store.indexOf(record);
        var data_selected = me.Penyusutan_Aset2Grid.getSelectionModel();
        var length = data_selected.selected.items.length;
        for (var i = 0, len = length; i < len; i++) {
            var data = data_selected.selected.items[i].data;
            form.findField('account').setValue(data.account);
            form.findField('inv_code').setValue(data.inv_code);
            form.findField('debit').setValue(data.debit);
            form.findField('sequence_no').setValue(data.sequence_no);
            var values = form.getValues();
            if(storeIndex == -1){
                store.add(values);
            }else{
                record.set(values);
            }
            store.sync({
                success:function(){
                    store.remove(data_selected.getSelection());
                    Ext.MessageBox.alert('Sukses', '!!!!');
                },
                failure:function(){
                    store.remove(data_selected.getSelection());
                    Ext.MessageBox.alert('Warning', '!!!!');
                }

            });
        };

    },
    onActive: function(callback){
        this.Penyusutan_Aset2Store.load();
        callback(true);
    }
});
//ens UserPage class