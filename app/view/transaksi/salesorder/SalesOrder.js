Ext.define('App.view.transaksi.salesorder.SalesOrder', {
    extend:'App.ux.RenderPanel',
    id:'panelSO',
    pageTitle:'Sales Order',

    initComponent : function()
    {
        var me = this;
        me.so_num=null;
        me.cust_id= null;

        Ext.define('SalesOrderModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'co_id', type : 'string'},
                { name : 'so_num', type : 'string'},
                { name : 'tanggal',type : 'date'},
                { name : 'cust_id',type : 'string'},
                { name : 'cust_nama',type : 'string'},
                { name : 'wilayah_id',type : 'string'},
                { name : 'sales_id',type : 'string'},
                { name : 'tgl_jt_kirim',type : 'date'},
                { name : 'pembayaran', type : 'string'},
                { name : 'status', type : 'string'},
                { name : 'keterangan', type : 'string'},
                { name : 'userinput', type : 'string'},
                { name : 'useredit', type : 'string'},
                { name : 'timeedit', type : 'date'},
                { name : 'prod_id', type : 'string'},
                { name : 'sat_id', type : 'string'},
                { name : 'qty', type : 'integer'},
                { name : 'hrg', type : 'float'},
                { name : 'n_brutto', type : 'float'},
                { name : 'n_netto', type : 'float'},
                { name : 'hrg_loco', type : 'float'},
                { name : 'hrg_transport', type : 'float'},
                { name : 'hrg_promosi', type : 'float'},
                { name : 'hrg_sosialisasi', type : 'float'},
                { name : 'hrg_lain', type : 'float'},
                { name : 'lokasi_nama', type : 'string'},
                { name : 'lokasi_kec', type : 'string'},
                { name : 'lokasi_kab', type : 'string'},
                { name : 'ppn_exc', type : 'string'},
                { name : 'informasi_harga', type : 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read : SalesOrder.getFilterSOData,
                    create: SalesOrder.addSO,
                    update: SalesOrder.updateSO,
                    destroy: SalesOrder.deleteSO
                }
            }

        });
        Ext.define('SOLocModel', {
            extend : 'Ext.data.Model',
            fields : [
                { name : 'co_id', type : 'string'},
                { name : 'so_num', type : 'string'},
                { name : 'cust_id',type : 'string'},
                { name : 'custloc_id',type : 'string'},
                { name : 'custloc_nama',type : 'string'},
                { name : 'alamat',type : 'string'},
                { name : 'keterangan',type : 'string'},
                { name : 'qty', type : 'string'}
            ],
            proxy:{
                type:'direct',
                api:{
                    read : SalesOrder.getSOLoc,
                    update: SalesOrder.updateSOLoc
                }
            }

        });

        me.SalesOrderStore = Ext.create('Ext.data.Store', {
            storeId : 'SoStore',
            model : 'SalesOrderModel',
            remoteSort : false
        });
        me.SOLocStore = Ext.create('Ext.data.Store', {
            storeId : 'SoLocStore',
            model : 'SOLocModel',
            remoteSort : false
        });
        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit','tanggal','tgl_jt_kirim']
        }
        me.SalesOrderGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('SoStore'),
            title:'Sales Order',
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
            features:[searching],
            plugins:[
                Ext.create('App.ux.grid.RowFormEditing', {
                    autoCancel:false,
                    errorSummary:false,
                    clicksToEdit:1,
                    formItems:[
                        {
                            xtype:'container',
                            layout:'hbox',
                            width:1200,
                            items:[
                                {
                                    xtype:'container',
                                    width:360,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'No. Dokumen',
                                            name:'so_num',
                                            valueText:'otomatis',
                                            readOnly: true,
                                            width:350
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tgl Pemesanan',
                                            format : 'd-m-Y',
                                            itemId:'tgl_input_so',
                                            name:'tanggal',
                                            allowBlank:false,
                                            width:200
                                        },
                                        {
                                            xtype : 'datefield',
                                            fieldLabel : 'Tanggal JT Kirim',
                                            format : 'd-m-Y',
                                            value : new Date(),
                                            name:'tgl_jt_kirim',
                                            width:200
                                        },
                                        {
                                            xtype : 'xtCustomerPopup',
                                            fieldLabel : 'Customer',
                                            name:'cust_id',
                                            width:250
                                        },
                                        {
                                            xtype : 'xtWilayahPopup',
                                            fieldLabel : 'Wilayah',
                                            name:'wilayah_id',
                                            allowBlank:false,
                                            width:250
                                        },
                                        {
                                            xtype : 'xtSalesPopup',
                                            fieldLabel : 'Sales',
                                            name:'sales_id',
                                            allowBlank:false,
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Pembayaran',
                                            name:'pembayaran',
                                            allowBlank:false,
                                            width:350
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Lokasi Kirim',
                                            name:'lokasi_nama',
                                            allowBlank:false,
                                            width:350
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Kecamatan',
                                            name:'lokasi_kec',
                                            allowBlank:false,
                                            width:350
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Kabupaten',
                                            name:'lokasi_kab',
                                            allowBlank:false,
                                            width:350
                                        }
                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:300,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype : 'xtlistproduct',
                                            fieldLabel : 'Produk',
                                            name:'prod_id',
                                            allowBlank:false,
                                            width:275
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            fieldLabel:'Qty',
                                            hideTrigger: true,
                                            xtAlign : 'right',
                                            name:'qty',
                                            width:275,
                                            itemId:'qty_so'
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            fieldLabel:'Harga / Qty',
                                            hideTrigger: true,
                                            xtAlign : 'right',
                                            name:'hrg',
                                            width:275,
                                            itemId:'hrg_so',
                                            enableKeyEvents: true,
                                            listeners: {
                                                'keyup':function(field, event){
                                                    var qty_so = Ext.ComponentQuery.query('#qty_so')[0].getValue();
                                                    Ext.ComponentQuery.query('#n_netto_so')[0].setValue(qty_so * field.value );
                                                   }
                                            }
                                        },
                                        {
                                            width:275,
                                            xtype: "radiogroup",
                                            fieldLabel: "Informasi Harga",
                                            defaults: {xtype: "radio", name:'informasi_harga'
                                            },
                                            items: [
                                                {
                                                    boxLabel: "Indikasi",
                                                    checked: true,
                                                    inputValue:'I'
                                                },
                                                {
                                                    boxLabel: "Fix",
                                                    inputValue:'F'

                                                }
                                            ]
                                        },
                                        {
                                            width:275,
                                            xtype: "radiogroup",
                                            fieldLabel: "PPN",
                                            defaults: {xtype: "radio", name:'ppn_exc'
                                            },
                                            items: [
                                                {
                                                    boxLabel: "Exclude",
                                                    checked: true,
                                                    inputValue:'N'
                                                },
                                                {
                                                    boxLabel: "Include",
                                                    inputValue:'Y'

                                                }
                                            ]
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel:'Total',
                                            xtAlign : 'right',
                                            name:'n_netto',
                                            itemId:'n_netto_so',
                                            width:275,
                                            readOnly:true
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel:'Harga Loco',
                                            name:'hrg_loco',
                                            xtAlign : 'right',
                                            width:275,
                                            itemId:'loco_so',
                                            enableKeyEvents: true,
                                            listeners: {
                                                'keyup':function(field, event){
                                                    var hrg_so = Ext.ComponentQuery.query('#hrg_so')[0].getValue(),
                                                        satu = Ext.ComponentQuery.query('#transport_so')[0].getValue(),
                                                        dua = Ext.ComponentQuery.query('#promosi_so')[0].getValue(),
                                                        tiga = Ext.ComponentQuery.query('#sosialisasi_so')[0].getValue();
                                                    if(hrg_so < (satu+dua+tiga+field.value)){
                                                        Ext.Msg.alert('Warning', 'rincian harga melebihi hrg order');
                                                    }
                                                 }
                                            }
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel:'Biaya Transport',
                                            name:'hrg_transport',
                                            xtAlign : 'right',
                                            width:275,
                                            itemId:'transport_so',
                                            enableKeyEvents: true,
                                            listeners: {
                                                'keyup':function(field, event){
                                                    var hrg_so = Ext.ComponentQuery.query('#hrg_so')[0].getValue(),
                                                        satu = Ext.ComponentQuery.query('#loco_so')[0].getValue(),
                                                        dua = Ext.ComponentQuery.query('#promosi_so')[0].getValue(),
                                                        tiga = Ext.ComponentQuery.query('#sosialisasi_so')[0].getValue();
                                                    if(hrg_so < (satu+dua+tiga+field.value)){
                                                        Ext.Msg.alert('Warning', 'rincian harga melebihi hrg order');
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel:'Biaya promosi',
                                            name:'hrg_promosi',
                                            xtAlign : 'right',
                                            width:275,
                                            itemId:'promosi_so',
                                            enableKeyEvents: true,
                                            listeners: {
                                                'keyup':function(field, event){
                                                    var hrg_so = Ext.ComponentQuery.query('#hrg_so')[0].getValue(),
                                                        satu = Ext.ComponentQuery.query('#loco_so')[0].getValue(),
                                                        dua = Ext.ComponentQuery.query('#transport_so')[0].getValue(),
                                                        tiga = Ext.ComponentQuery.query('#sosialisasi_so')[0].getValue();
                                                    if(hrg_so < (satu+dua+tiga+field.value)){
                                                        Ext.Msg.alert('Warning', 'rincian harga melebihi hrg order');
                                                    }
                                                }
                                            }
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel:'Biaya Sosialisasi',
                                            name:'hrg_sosialisasi',
                                            xtAlign : 'right',
                                            width:275,
                                            itemId:'sosialisasi_so',
                                            enableKeyEvents: true,
                                            listeners: {
                                                'keyup':function(field, event){
                                                    var hrg_so = Ext.ComponentQuery.query('#hrg_so')[0].getValue(),
                                                        satu = Ext.ComponentQuery.query('#loco_so')[0].getValue(),
                                                        dua = Ext.ComponentQuery.query('#transport_so')[0].getValue(),
                                                        tiga = Ext.ComponentQuery.query('#promosi_so')[0].getValue();
                                                    if(hrg_so < (satu+dua+tiga+field.value)){
                                                        Ext.Msg.alert('Warning', 'rincian harga melebihi hrg order');
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype:'container',
                                    width:350,
                                    layout:'anchor',
                                    items:[
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Satuan',
                                            name:'sat_id',
                                            width:180,
                                            itemId:'sat_id_so',
                                            readOnly:true
                                        },
                                        {
                                            xtype:'textfield',
                                            fieldLabel:'Reference',
                                            name:'keterangan',
                                            value: 'Keterangan',
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
                {
                    header:'Company',
                    hidden:true,
                    dataIndex:'co_id'
                },
                {
                    header:'No. Dokumen',
                    width:100,
                    dataIndex:'so_num'
                },
                {
                    header : 'Tanggal',
                    dataIndex : 'tanggal',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                },
                {
                    header : 'Tgl JT Kirim',
                    dataIndex : 'tgl_jt_kirim',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                },
                {
                    header : 'Customer',
                    dataIndex : 'cust_nama',
                    flex:1
                },
                {
                    header : 'Produk',
                    dataIndex : 'prod_id',
                    width : 200
                },
                {
                    header : 'qty',
                    dataIndex : 'qty',
                    width : 200
                },
                {
                    header : 'Keterangan',
                    dataIndex : 'keterangan',
                    flex:1
                },
                {
                    header:'Status',
                    hidden:true,
                    dataIndex:'status'
                },
                {
                    header : 'Lastupdate',
                    dataIndex : 'timeedit',
                    renderer:Ext.util.Format.dateRenderer('d-m-Y'),
                    width : 100
                }

            ],
            tbar:[
                {
                    text:'Tambah Data',
                    iconCls:'save',
                    action:'SalesOrderModel',
                    scope:me,
                    handler:me.onNewRec
                },                {
                    text:'Hapus Data',
                    iconCls:'delete',
                    action:'delete',
                    scope:me,
                    handler:me.onDeleteRec
                },
                '->',
                {
                    xtype:'displayfield',
                    itemId:'itemuserinput',
                    margin : '0 5 0 0'
                }

            ]
        });
        me.SOLocGrid = Ext.create('Ext.grid.Panel', {
            store: Ext.data.StoreManager.lookup('SoLocStore'),
            title:'Rincian Lokasi',
            border:false,
            frame:false,
            plugins:[
                Ext.create('App.ux.grid.RowFormEditing2', {
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
                                            xtype:'textfield',
                                            fieldLabel:'Kode Sub Customer',
                                            name:'custloc_id',
                                            readOnly: true,
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Customer',
                                            name:'custloc_nama',
                                            width:385,
                                            readOnly:true
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Alamat',
                                            name:'alamat',
                                            readOnly: true,
                                            width:250
                                        },
                                        {
                                            xtype:'mitos.currency',
                                            hideTrigger: true,
                                            fieldLabel : 'Qty',
                                            name:'qty',
                                            allowBlank:false,
                                            width:250
                                        },
                                        {
                                            xtype : 'textfield',
                                            fieldLabel : 'Keterangan',
                                            name:'keterangan',
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
                {
                    header:'Company',
                    hidden:true,
                    dataIndex:'co_id'
                },
                {
                    header : 'Kode Sub Customer',
                    dataIndex : 'custloc_id'
                },
                {
                    header : 'Customer',
                    dataIndex : 'custloc_nama',
                    flex:1
                },
                {
                    header : 'Alamat',
                    dataIndex : 'alamat',
                    flex:1
                },
                {
                    header : 'qty',
                    dataIndex : 'qty',
                    width : 200
                },
                {
                    header : 'Keterangan',
                    dataIndex : 'keterangan',
                    flex:1
                }
            ]
        });

        me.FormulirPanel = Ext.create('Ext.tab.Panel', {
            activeTab:0,
            items:[ me.SalesOrderGrid, me.SOLocGrid]
        });

        me.pageBody = [me.FormulirPanel];
        me.callParent(arguments);

    }, // end of initComponent

    onGridClick: function(grid, selected){
        var me = this;
        me.so_num= selected.data.so_num;
        me.cust_id= selected.data.cust_id;
        var  deletebtn = me.query('button[action="delete"]')[0];
        if(selected.data.status==1 || selected.data.status==2){
            deletebtn.setDisabled(true);
        }else{
            deletebtn.setDisabled(false);
        }
        me.SOLocStore.load({params:{so_num:me.so_num, cust_id:me.cust_id}});

        /* tampilkan user input dan useredit*/
        var user = '<span style="color: #ff2110">User Input : </span>'+selected.data.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+selected.data.useredit;
        Ext.ComponentQuery.query('#itemuserinput')[0].setValue(user);
    },
    onNewRec:function(btn){
        var me = this, grid = btn.up('grid'), store = grid.store, model = btn.action, plugin = grid.editingPlugin, newModel;
        newModel = Ext.ModelManager.create({
        }, model);
        store.insert(0, newModel);
        plugin.startEdit(0, 0);

        Ext.ComponentQuery.query('#tgl_input_so')[0].setValue(new Date());
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
        this.SalesOrderStore.load();
        this.SOLocStore.load();
        callback(true);
    }
});
//ens LogPage class