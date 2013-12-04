Ext.define('App.view.transaksi.cancel-return.CancelReturn', {
    extend: 'App.ux.RenderPanel',
    id: 'panelCancelReturn',
    pageTitle: 'Cancel Transaksi',
    uses: ['App.ux.GridPanel'],
    initComponent : function()
    {
        var me = this;

        Ext.define('CancelTransaksiModel', {
            extend : 'Ext.data.Model',
            fields : [
                {name: 'co_id', type: 'string'},
                {name: 'inv_code', type: 'string'},
                {name: 'inv_date', type: 'date'},
                {name: 'canceled_date', type: 'date'},
                {name: 'canceled_by', type: 'string'},
                {name: 'status', type: 'string'},
                {name: 'reason', type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'useredit',type: 'string'},
                {name: 'userinput',type: 'string'},
                {name: 'inv_type', type: 'string'},
                {name: 'nominal', type: 'string'},
                {name: 'posted_date',type: 'date'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read: CancelReturn.getCancelReturn,
                    create: CancelReturn.addCancelReturn,
                    update: CancelReturn.updateCancelReturn,
                    destroy: CancelReturn.deleteCancelReturn
                }
            }

        });
        me.CancelTransaksiStore = Ext.create('Ext.data.Store', {
            storeId : 'CTStore',
            model : 'CancelTransaksiModel',
            remoteSort : false
        });

        me.CTGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('CTStore'),
            border:false,
            frame:false,
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1' ? 'child-row' : (record.get('status') == '2' ? 'adult-row':'');
                }
            },
            listeners: {
                scope: me,
                select: me.onGridClick
            },
            plugins:[
                Ext.create('App.ux.grid.RowFormEditing', {
                    autoCancel:false,
                    errorSummary:false,
                    clicksToEdit:1,
                    formItems:[
                        {
                            xtype:'container',
                            layout:'hbox',
                            flex:1,
                            items:[
                                {
                                    xtype:'container',
                                    flex:1,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tgl Input',
                                            format : 'd-m-Y',
                                            itemId:'tgl_input_ct',
                                            maxValue : new Date(),
                                            name:'inv_date',
                                            width:200
                                        },
                                        {
                                            xtype: "radiogroup",
                                            fieldLabel: "Modul AP",
                                            width:600,
                                            defaults: {xtype: "radio", name:'inv_type'
                                            },
                                            items: [
                                                {
                                                    boxLabel: "AP Invoice",
                                                    inputValue:'1',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtAPCancelPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "AP Bayar",
                                                    inputValue:'2',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#cancel_tmp')[0].setValue('N');
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtAPPaymentCancelPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "AP UM",
                                                    inputValue:'3',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#cancel_tmp')[0].setValue('U');
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtAPPaymentCancelPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "AP Alokasi",
                                                    inputValue:'4',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#cancel_tmp')[0].setValue('A');
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtAPPaymentCancelPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                        }
                                                    }
                                                }

                                            ]
                                        },
                                        {
                                            xtype: "radiogroup",
                                            fieldLabel: "Modul AR ",
                                            width:800,
                                            defaults: {xtype: "radio", name:'inv_type'
                                            },
                                            items: [
                                                {
                                                    boxLabel: "AR Invoice",
                                                    inputValue:'7',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtARCancelPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "AR Bayar",
                                                    inputValue:'8',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#cancel_tmp')[0].setValue('N');
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtARPaymentCancelPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "AR UM",
                                                    inputValue:'9',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#cancel_tmp')[0].setValue('U');
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtARPaymentCancelPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "AR Alokasi",
                                                    inputValue:'10',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#cancel_tmp')[0].setValue('A');
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtARPaymentCancelPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "AR Deduction",
                                                    inputValue:'14',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#cancel_tmp')[0].setValue('P');
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtARPaymentCancelPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "DO",
                                                    inputValue:'12',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtDOPopup', name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                        }
                                                    }
                                                }
                                                ]
                                        },
                                        {
                                            xtype: "radiogroup",
                                            fieldLabel: "Modul Lain2 ",
                                            width:450,
                                            defaults: {xtype: "radio", name:'inv_type'
                                            },
                                            items: [
                                                {
                                                    boxLabel: "AP Reclass",
                                                    inputValue:'5',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtAPRCPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                        }
                                                    }
                                                },
                                                {
                                                    boxLabel: "AP Manufacture",
                                                    inputValue:'6',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtAPMnfPopup',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                        }
                                                    }
                                                },{
                                                    boxLabel: "Stok In",
                                                    inputValue:'19',
                                                    handler: function(field, value) {
                                                        if (value) {
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].remove(0);
                                                            Ext.ComponentQuery.query('#inv_code_ct')[0].add({xtype:'xtStock_Cancel',  name:'inv_code', fieldLabel:'Kode Dokumen', value: this.getValue()});
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            itemId:'inv_code_ct',
                                            width:300
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Keterangan',
                                            name:'reason',
                                            width:385
                                        },
                                        {
                                            width: 150,
                                            xtype: 'mitos.checkbox',
                                            fieldLabel: 'Posting',
                                            name: 'status',
                                            handler: function(field, value) {
                                                if (value == true) {
                                                    Ext.ComponentQuery.query('#posting_ct')[0].setDisabled(false);
                                                    Ext.ComponentQuery.query('#posting_ct')[0].setValue(new Date());
                                                }else{
                                                    Ext.ComponentQuery.query('#posting_ct')[0].setDisabled(true);
                                                }

                                            }
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tgl Posting',
                                            format : 'd-m-Y',
                                            value : new Date(),
                                            maxValue : new Date(),
                                            name:'canceled_date',
                                            itemId:'posting_ct',
                                            disabled:true,
                                            width:200
                                        },
                                        {
                                            xtype : 'textfield',
                                            hidden:true,
                                            itemId:'cancel_tmp',
                                            width:385
                                        }


                                    ]
                                }
                            ]
                        }
                    ]
                })
            ],
            columns:[
                {text: 'Kode Dokumen',sortable: true,dataIndex: 'inv_code'},
                {width: 80,text: 'Tgl Input',sortable: true,dataIndex: 'inv_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {flex: 1,text: 'Keterangan',sortable: true,dataIndex: 'reason'},
                {text: 'Menu',sortable: true,dataIndex: 'inv_type'},
                {width: 150,text: 'Nominal',sortable: true,dataIndex: 'nominal', renderer: Ext.util.Format.numberRenderer('0,000.00')},
                {width: 80,text: 'Tgl Posting',sortable: true,dataIndex: 'canceled_date', renderer:Ext.util.Format.dateRenderer('d-m-Y')},
                {width: 80,text: 'LastUpdate',sortable: true,dataIndex: 'timeedit', renderer:Ext.util.Format.dateRenderer('d-m-Y')}
            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'CancelTransaksiModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'CancelTransaksiModel',
                    scope:me,
                    handler:me.onDeleteRec
                }

            ]
        });

        me.pageBody = [me.CTGrid];
        me.callParent(arguments);

    }, // end of initComponent

    onGridClick: function(grid, selected){
        var me = this;

    },
    onNewRec:function(btn){
        var me = this;
        var grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
        newModel = Ext.ModelManager.create({
        }, model);
        store.insert(0, newModel);
        plugin.startEdit(0, 0);
        Ext.ComponentQuery.query('#tgl_input_ct')[0].setValue(new Date());
    },

    onDeleteRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, plugin = grid.editingPlugin,
            sm = grid.getSelectionModel(),
            selection = grid.getView().getSelectionModel().getSelection()[0];

        plugin.cancelEdit();
        if (selection) {
            Ext.Msg.show({
                title: 'Please Confirm' + '...',
                msg: 'Are you sure want to delete' + ' ?',
                icon: Ext.MessageBox.QUESTION,
                buttons: Ext.Msg.YESNO,
                fn: function(btn){
                    if(btn == 'yes'){
                        store.remove(selection);
                        store.sync();
                        if (store.getCount() > 0) {
                            sm.select(0);
                        }
                    }
                }
            });

        }

    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive : function(callback)
    {
        this.CancelTransaksiStore.load();
        callback(true);
    }
});
//ens LogPage class