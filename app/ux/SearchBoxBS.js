Ext.define('App.ux.SearchBoxBS',
    {
        extend : 'Ext.form.field.Trigger',
        alias : 'widget.srchbox',
        trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',
        trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger',
        hasSearch : false,
        paramName : 'query',

        initComponent : function()
        {
            var me = this;

            Ext.define('bsSearchModel',
                {
                    extend : 'Ext.data.Model',
                    fields : [
                        {
                            name : 'bb_id'
                        },
                        {
                            name : 'bb_nama'
                        }
                    ],
                    proxy :
                    {
                        type : 'direct',
                        api :
                        {
                            read : BahanBaku.getbbLiveSearch
                        },
                        reader :
                        {
                            totalProperty : 'totals',
                            root : 'rows'
                        }
                    }
                });

            me.store = Ext.create('Ext.data.Store',
                {
                    model : 'livebbSearchModel',
                    pageSize : 10,
                    autoLoad : false
                });

            me.callParent(arguments);
            me.on('specialkey', function(f, e){
                if(e.getKey() == e.ENTER){
                    me.onTrigger2Click();
                }
            }, me);
        },
        afterRender: function(){
            this.callParent();
            this.triggerEl.item(0).setDisplayed('none');
        },
        onTrigger1Click : Ext.form.field.Trigger.prototype.onTriggerClick,
        onTrigger2Click : function(){
            helpGrid.showAt([this.getPosition()[0],this.getPosition()[1]+this.getHeight()]);
        }
    }
)