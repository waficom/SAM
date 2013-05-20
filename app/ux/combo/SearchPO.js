/**
 * Created with JetBrains PhpStorm.
 * User: dharma
 * Date: 5/15/13
 * Time: 4:38 PM
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.ux.combo.SearchPO',
    {
        extend : 'Ext.form.ComboBox',
        alias : 'widget.mitos.comboSearchPO',
        initComponent : Ext.form.TwinTriggerField.prototype.initComponent,

        getTrigger: Ext.form.TwinTriggerField.prototype.getTrigger,
        initTrigger: Ext.form.TwinTriggerField.prototype.initTrigger,
        onTrigger1Click: Ext.form.ComboBox.prototype.onTriggerClick,
        trigger1Class: Ext.form.ComboBox.prototype.triggerClass,
        onTrigger2Click : function(){
            helpGrid.showAt([this.getPosition()[0],this.getPosition()[1]+this.getHeight()]);
        },
        validationEvent:false,
        validateOnBlur:false,
        trigger1Class:'x-form-clear-trigger',
        trigger2Class:'x-form-search-trigger',
        hideTrigger1:true
});

