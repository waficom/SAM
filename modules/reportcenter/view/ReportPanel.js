Ext.define('Modules.reportcenter.view.ReportPanel', {
    extend: 'App.ux.RenderPanel',
    id: 'panelReportPanel',
    pageTitle: i18n('report_center'),
    pageLayout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function(){
        var me = this;
        var Typefile = [
            {"tipe":"XLS","name":"Microsoft Excel .xls"},
            {"tipe":"DOC","name":"Microsoft Word .xls"},
            {"tipe":"PPT","name":"Microsoft PowerPoint .ppt"},
            {"tipe":"RTF","name":"Rich Text Format .rtf"},
            {"tipe":"HTML","name":"HTML .html"},
            {"tipe":"PDF","name":"PDF .pdf"},
            {"tipe":"TXT","name":"Text Files .txt"},
            {"tipe":"CSV","name":"Comma Delimited .csv"},
            {"tipe":"ODS","name":"Libre Office Writer .ods"},
            {"tipe":"ODT","name":"Libre Office Calc .odt"}
        ];
        var cbexptype = 'PDF';

        Ext.define('FileType', {
            extend: 'Ext.data.Model',
            fields: [
                {type: 'string', name: 'tipe'},
                {type: 'string', name: 'name'}
            ]
        });

        function createStore() {
            // The data store holding the states; shared by each of the ComboBox examples below
            return Ext.create('Ext.data.Store', {
                autoDestroy: true,
                model: 'FileType',
                data: Typefile
            });
        }

        me.comboExport = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Export to',
            id : 'cb_exporttype',
            displayField: 'name',
            width: 250,
            labelWidth: 60,
            store: createStore(),
            queryMode: 'local',
            margin : '0 5 0 0',
            typeAhead: true
        });

        me.renderContainer = Ext.create('Ext.panel.Panel',{
            flex : 1,
//            anchor : '100%',
            border : true,
            autoScroll: true,
            autoHeight: true
        });

        // END PDF Panel
        //-----------------------------------------------------------------------
        // Filter panel for the report
        //-----------------------------------------------------------------------
        me.formPanel = Ext.create('Ext.form.Panel', {
            bodyPadding: 10,
            margin: '0 0 3 0',
            collapsible: true,
            floatable : false,
            buttonAlign: 'left',
            title: i18n('filter'),
            // Draw the buttons to render and clear the report panel view.
            buttons: [
                {
                    text: i18n('generate_report'),
                    iconCls: 'icoReport',
                    scope: me,
                    handler: me.generateReport
                },
                '-',
                {
                    text: i18n('reset'),
                    iconCls: 'delete',
                    scope: me,
                    handler: me.resetRenderContainer
                },
                '->',
                me.comboExport,
                {
                    text: 'Export',
                    iconCls: 'save',
                    scope: me,
                    handler : me.generateReport
                }
            ],
            listeners: {
            collapse : function(){
                this.updateLayout();
                console.log('collapse');
            },
            expand : function(){
                    this.updateLayout();
                    console.log('expand');
                }
            }
        });
        me.pageBody = [me.formPanel, me.renderContainer];
        me.callParent(arguments);
        me.getPageBody().addDocked({
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        text: i18n('back'),
                        iconCls: 'icoArrowLeftSmall',
                        handler: me.goToReportCenter
                    }
                ]
            });
    },

    setReportPanel: function(config){
        var me = this;
        if(config.title) me.formPanel.setTitle(config.title);
        if(config.action) me.formPanel.action = config.action;
        if(config.fn) me.formPanel.reportFn = config.fn;
//        if(config.store) me.store = config.store;
//        if(config.columns) me.columns = config.columns;
        me.formPanel.removeAll();
        me.formPanel.add(config.items);
        me.resetRenderContainer();
        say(config);


    },

    goToReportCenter: function(){
        app.MainPanel.getLayout().setActiveItem('panelReportCenter');
    },
/*
    getGridPanel:function(){
        var me = this;
        return this.renderContainer.add(Ext.create('Ext.grid.Panel',{
            store:me.store,
            columns:me.columns,
            border:false
        }));
    },
*/
    /**
     * PDF render panel
     * Just create the panel and do not display the PDF yet, until
     * the user click create report.
     * @return {*}
     */
    getPDFPanel:function(src){
       //-----------------------------------------------------------------------
        // PDF render panel
        // Just create the panel and do not display the PDF yet, until
        // the user click create report.
        //-----------------------------------------------------------------------
        return this.renderContainer.add(Ext.create('App.ux.ManagedIframe', {
            src: src
        }));
    },

    generateReport:function(btn){
        var me = this, form = me.formPanel, params = form.getForm().getValues()
        var cbexptype = Ext.getCmp('cb_exporttype').getValue();
        console.log(cbexptype);
        this.renderContainer.removeAll(true);
        delete this.pdf;
//        me.grid = this.getGridPanel();
//        me.store.load({params:values});
//        botton.setDisabled(false);
        if(typeof form.reportFn == 'function'){
            this.renderContainer.removeAll(true);
//            delete this.grid;
            form.reportFn({params:params}, function(provider, response){

                me.pdf = me.getPDFPanel(response.result.url);
            });
        }else{
            Ext.Msg.alert('Oops!', 'No function provided');
        }
//        btn.setDisabled(true);

    },
    generatePDF: function(btn){
        var me = this, form = me.formPanel, params = form.getForm().getValues();
        if(typeof form.reportFn == 'function'){
            this.renderContainer.removeAll(true);
            delete this.grid;
            form.reportFn({}, function(provider, response){

                me.pdf = me.getPDFPanel(response.result.url);
            });
        }else{
            Ext.Msg.alert('Oops!', 'No function provided');
        }
    },


    resetRenderContainer:function(btn){
//        this.formPanel.down('toolbar').getComponent('pdf').setDisabled(true);
//        var botton = btn.up('toolbar').getComponent('pdf')
        this.formPanel.getForm().reset();
        this.renderContainer.removeAll(true);
//        delete this.grid;
        delete this.pdf;
//        botton.setDisabled(false);

    },
    /**
     * This function is called from MitosAPP.js when
     * this panel is selected in the navigation panel.
     * place inside this function all the functions you want
     * to call every this panel becomes active
     */
    onActive: function(callback){
        callback(true);
    }
});
