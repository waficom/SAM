/**
 * Created with JetBrains PhpStorm.
 * User: dharma
 * Date: 4/20/13
 * Time: 9:46 AM
 * To change this template use File | Settings | File Templates.
 */
/**
 * Ext.ux.toolbar.GridSearching: Usage example *  * @author Fabio Frijo */
Ext.define("App.example.Grid", {
    title       : "I'm a grid!",
    extend      : "App.common.Grid",
    buttonText  : "Add item",
    proxyUrl    : "example/grid/GetData.do",
    windowClass : "App.example.Window",
    pagingGrid  : true,
// Search toolbar
        initTopToolbar: function(){
            return Ext.create('Ext.ux.toolbar.GridSearching', {
                grid            : this,
                menuPosition    : 'right',
                menuIconCls     : 'icon-config',
                inputWidth      : 200,
                showSelectAll   : false,
                menuText        : null,
                menuTip         : 'Configurazione ricerca',
                inputTip        : 'Scrivi qui per effettuare la ricerca',
                disableIndexes  : ['trad_strumento','trad_metodo'],
                items           : ['->', this.getAddButton()
                ]
            });
        }
    }
);
