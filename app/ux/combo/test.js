/**
 * Created with JetBrains PhpStorm.
 * User: dharma
 * Date: 5/15/13
 * Time: 5:10 PM
 * To change this template use File | Settings | File Templates.
 */
LoginForm.views.Receipts =  Ext.extend(Ext.NestedList,
    {
        id:'Receipts',
        grouped: true,
        iconCls:'receipts',
        //cls:'x-tab-receipts',

        //fullscreen: true,
        title: 'Receipts',
        store: LoginForm.music_store,
        initComponent: function()
        {

            Ext.apply(this,
                {
                    dockedItems:
                        [{
                            xtype: "toolbar",
                            id:"receiptsToolbar",
                            title: "My Receipts",
                            items:[{ xtype:'button' ,ui:'normal' ,cls:'x-cameraButton',handler:this.onCameraClicked,scope:this },
                                {xtype:'spacer'},
                                { xtype:'button', ui:'normal',cls:'x-settingButton',handler:this.onSettings,scope:this}]
                            //items:cameraButton
                        },
                            {
                                xtype: "toolbar",
                                id:"searchToolbar",
                                items:[{
                                    xtype:'searchfield',
                                    id:'search',
                                    placeHolder:'Search',
                                    name:'toolbarSearchField',
                                    cls:'x-searchButton',
                                    listeners : {
                                        scope: this,


                                        keyup: function(field)
                                        {
                                            console.log("inside keyup");
                                            LoginForm.music_store.load();

                                            var value = field.getValue();
                                            if (!value)
                                            {
                                                console.log("inside if block");
                                                LoginForm.music_store.filterBy(function()
                                                {
                                                    return true;
                                                });
                                            }
                                            else
                                            {
                                                var rootNode=LoginForm.music_store.getRootNode();
                                                var subStore=LoginForm.music_store.getSubStore(rootNode);
                                                this.findLeafStore(rootNode,subStore,value);
                                            }


                                        }
                                    }

                                }]
                            }]

                });
            LoginForm.views.Receipts.superclass.initComponent.apply(this, arguments);
        },


        getDetailCard: function(item, parent) {
            var itemData = item.attributes.record.data,
                parentData = parent.attributes.record.data,
                detailCard = new Ext.Panel({
                    scroll: 'vertical',
                    styleHtmlContent: true,

                    tpl: ["<h2 >{text}</h2>","{info}"]
                });
            detailCard.update(itemData);
            this.backButton.setText(parentData.text);
            return detailCard;
        },
        getItemTextTpl: function() {
            var tplConstructor = '{text}' +
                '<tpl if="model === \'Artist\'">'+
                '<div class="metadata">' +
                ' {[values.items.length]} albums' +
                '</div>' +
                '</tpl>' +
                '<tpl if="model === \'Album\'">'+
                '<div class="metadata">' +
                ' {[values.items.length]} tracks' +
                '</div>' +
                '</tpl>' +
                '<tpl if="model === \'Track\'">'+
                '<div class="metadata">' +
                ' Duration: {[Math.floor(values.duration/60)]}:{[values.duration%60]}' +
                '</div>' +
                '</tpl>';
            return '<div class="listimage"><div><img src="images/morrisons.jpg" align="left"></div><h2 align="center">'+tplConstructor+'</h2></div>';
        },
        onSearch:function()
        {



        },

        onCameraClicked:function()
        {

            Ext.dispatch({ controller: 'Users',action: 'showCamera'});

        },
        onSettings:function()
        {
            Ext.dispatch({ controller: 'Users',action: 'settingButtonClicked'});
        },
        findLeafStore:function(rootNode,subStore,value)
        {
            subStore.filterBy(function(record)
            {
                console.log("inside substore method");
                var recordIsLeaf=false;
                var leaf=record.get('leaf');
                if(Ext.isDefined(leaf) && leaf == true)
                {
                    console.log("inside if block");
                    var subSubstore = LoginForm.music_store.getSubStore(record);
                    this.findLeafStore(rootNode,subSubstore,value);
                }
                else
                {
                    console.log("inside else block");
                    //alert("onSearch fun.");
                    console.log("inside leaf if");
                    var searches = value.split(' '),
                        regexps = [],
                        i;

                    for (i = 0; i < searches.length; i++)
                    {
                        console.log("inside for loop");

                        if (!searches[i]) return;
                        regexps.push(new RegExp(searches[i], 'i'));
                    }


                    console.log("inside filter by method");
                    var matched = [];
                    for (i = 0; i < regexps.length; i++)
                    {
                        var search = regexps[i];
                        //alert(record.get('text'));
                        if (record.get('text').match(search)) matched.push(true);
                        else matched.push(false);
                    };

                    if (regexps.length > 1 && matched.indexOf(false) != -1)
                    {
                        return false;
                    }
                    else
                    {
                        return matched[0];
                    }
                }
            });
        },


    });