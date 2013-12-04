Ext.define('App.view.transaksi.goodsreceived.Jurnal_GRN', {
    extend: 'App.ux.RenderPanel',
    id: 'panelJurnal_GRN',
    pageTitle: 'Jurnal Goods Received',
    pageLayout: 'border',
    uses: ['App.ux.GridPanel'],
    initComponent: function(){
        var me = this;
        me.currInv_Code = null;
        me.userinput =null;
        me.useredit=null;
        //me.myWinChooseItem=null;

        me.GRNStore = Ext.create( 'App.store.transaksi.goodsreceived.GoodsReceived' );

        Ext.define('GRN_JurnalModel', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'co_id',type: 'string'},
                {name: 'inv_date',type: 'date'},
                {name: 'inv_code',type: 'string'},
                {name: 'inv_code_link',type: 'string'},
                {name: 'vend_id',type: 'string'},
                {name: 'coa',type: 'string'},
                {name: 'coa_nama',type: 'string'},
                {name: 'debit',type: 'float'},
                {name: 'credit',type: 'float'},
                {name: 'sequence_no',type: 'string'},
                {name: 'timeedit',type: 'date'},
                {name: 'remaks',type: 'string'}
            ]

        });
        me.GRN_JurnalStore = Ext.create('Ext.data.Store', {
            model: 'GRN_JurnalModel',
            proxy: {
                type: 'direct',
                api: {
                    read: Jurnal.getJurnal
                },
                reader : {
                    totalProperty : 'totals',
                    root : 'rows'
                }
            },
            pageSize : 10,
            autoLoad: false
        });
        var searching={
            ftype : 'searching',
            mode: 'local'
            ,           width:  200,
            disableIndexes:['timeedit','inv_date']

        }

        /**
         * Lists Grid
         */
        me.GRNGrid = Ext.create('App.ux.GridPanel', {
            store: me.GRNStore,
            itemId: 'GRNGrid',
            height: 300,
            margin: '0 0 3 0',
            region: 'north',
            columns: [
                {header : 'Goods Recv #',dataIndex : 'gr_num'},
                {header : 'Tanggal',dataIndex : 'tgl',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100},
                {header : 'PO#',dataIndex : 'po_num'},
                {header : 'Supplier',dataIndex : 'vend_nama', flex:1},
                {header : 'Transporter',dataIndex : 'vend_tr_nama'},
                {header : 'Type', dataIndex : 'gr_type_desc'},
                { header : 'Gudang',dataIndex : 'gudang_id', width : 100,hidden: true},
                {header : 'Gudang', dataIndex : 'gudang_nama'},
                {header : 'status',dataIndex : 'status',hidden: true},
                {header : 'rc_type',dataIndex : 'rc_type',hidden: true},
                {header : 'LastUpdate',dataIndex : 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100}
        ],
            viewConfig :
            {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return record.get('status') == '1'? 'child-row' : record.get('status') == '2'? 'adult-row' : '';
                }
            },
            listeners: {
                scope: me,
                select: me.onGRNGridClick
            },
            features:[searching],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [

                        '->',
                        {
                            xtype:'displayfield',
                            itemId:'itemuserinput',
                            margin : '0 5 0 0'
                        }
                    ]
                },{
                    xtype: 'pagingtoolbar',
                    store: me.GRNStore,
                    beforePageText: 'Page',
                    afterPageText: 'of {0}',
                    displayMsg: 'Diplay {0} - {1} Of {2}',
                    emptyMsg: 'No Record Found',
                    dock: 'bottom',
                    displayInfo: true,
                    pageSize: 5

                }
            ]
        });

        me.GRN_JurnalGrid = Ext.create('App.ux.GridPanel', {
            store: me.GRN_JurnalStore,
            region: 'center',
            enablePaging: true,
            columns: [
                {header : 'co_id', dataIndex : 'co_id',width : 200, hidden: true},
                {header : 'Doc. Date',dataIndex : 'inv_date',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100},
                {header : 'Doc. Number', dataIndex : 'inv_code',width : 150},
                {header : 'Coa', dataIndex : 'coa',width : 100},
                {header : 'Description', dataIndex : 'coa_nama',width : 200, summaryRenderer: function(){
                    return '<b>Total</b>';
                }},
                {header : 'Debit', dataIndex : 'debit',width : 150,renderer: Ext.util.Format.numberRenderer('0,000.00'),  summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'Credit', dataIndex : 'credit',width : 150,renderer: Ext.util.Format.numberRenderer('0,000.00'), summaryType: 'sum', summaryRenderer: Ext.util.Format.numberRenderer('0,000.00')},
                {header : 'sequence_no', dataIndex : 'sequence_no',width : 150, hidden: true},
                {header : 'Remarks', dataIndex : 'remaks',width : 200},
                {header : 'LastUpdate',dataIndex : 'timeedit',renderer:Ext.util.Format.dateRenderer('d-m-Y'), width : 100}
            ],
            viewConfig: {
                stripeRows: false,
                getRowClass: function(record, index) {
                    return me.currPosted == '1'? 'child-row' : me.currPosted == '2'? 'adult-row' : '';
                }
            },
            features: [{
                ftype: 'summary'
            }, searching]
        });

        // *************************************************************************************
        // Window User Form
        // *************************************************************************************
        me.pageBody = [me.GRNGrid, me.GRN_JurnalGrid];
        me.callParent(arguments);
    },
    onGRNGridClick: function(grid, selected){
        var me = this;
        me.currGRN = selected.data.gr_num;
        me.currPosted = selected.data.status;
        var TopBarItems = this.GRNGrid.getDockedItems('toolbar[dock="top"]')[0];
        me.userinput = selected.data.userinput;
        me.useredit = selected.data.useredit;
        me.ditulis = '<span style="color: #ff2110">User Input : </span>'+me.userinput+'  ||  '+'<span style="color: #e52010">User Edit : </span>'+me.useredit;
        TopBarItems.getComponent('itemuserinput').setValue(me.ditulis);
        if(selected.data.status == 1 || selected.data.status == 2){
            Ext.getCmp('delete_do').disable();
        }else{
            Ext.getCmp('delete_do').enable();
        }
        me.GRN_JurnalStore.load({params:{inv_code: me.currGRN}});

    },

    /**
     * This function is called from Viewport.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        var me = this;
        this.GRNStore.load();
        this.GRN_JurnalStore.load();

        callback(true);
    }
});
