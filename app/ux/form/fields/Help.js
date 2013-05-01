/**
 * Created by JetBrains PhpStorm.
 * User: Ernesto J. Rodriguez (Certun)
 * File:
 * Date: 11/1/11
 * Time: 12:37 PM
 */
Ext.define('App.ux.form.fields.UpperCaseTextField', {
    extend: 'Ext.form.field.Text',
    alias : 'widget.mitos.UpperCaseTextField',
    fieldStyle: {
        textTransform: "uppercase"
    },
    initComponent: function() {
        this.callParent(arguments);
    },
    listeners: {
        change: function (obj, newValue) {
//            console.log(newValue);
            obj.setRawValue(newValue.toUpperCase());
        }
    }
});