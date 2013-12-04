
Ext.define('App.ux.grid.RowFormEditing2', {
    extend: 'Ext.grid.plugin.Editing',
    alias: 'plugin.rowformediting2',

    requires: [
        'App.ux.grid.RowFormEditor2'
    ],

    editStyle: 'row',

	saveBtnEnabled:false,
    /**
     * @cfg {Boolean} autoSync
     * True to automatically Sync any pending changes during complete edit method.
     * False to force the user to explicitly sync all pending changes. Defaults to true.
     */
    autoSync: true,
    /**
     * @cfg {Boolean} autoCancel
     * True to automatically cancel any pending changes when the row editor begins editing a new row.
     * False to force the user to explicitly cancel the pending changes. Defaults to true.
     */
    autoCancel: true,

    /**
     * @cfg {Number} clicksToMoveEditor
     * The number of clicks to move the row editor to a new row while it is visible and actively editing another row.
     * This will default to the same value as {@link Ext.grid.plugin.Editing#clicksToEdit clicksToEdit}.
     */

    /**
     * @cfg {Boolean} errorSummary
     * True to show a {@link Ext.tip.ToolTip tooltip} that summarizes all validation errors present
     * in the row editor. Set to false to prevent the tooltip from showing. Defaults to true.
     */
    errorSummary: true,

    /**
     * @event beforeedit
     * Fires before row editing is triggered.
     *
     * @param {Ext.grid.plugin.Editing} editor
     * @param {Object} e An edit event with the following properties:
     *
     * - grid - The grid this editor is on
     * - view - The grid view
     * - store - The grid store
     * - record - The record being edited
     * - row - The grid table row
     * - column - The grid {@link Ext.grid.column.Column Column} defining the column that initiated the edit
     * - rowIdx - The row index that is being edited
     * - colIdx - The column index that initiated the edit
     * - cancel - Set this to true to cancel the edit or return false from your handler.
     */
    
    /**
     * @event canceledit
     * Fires when the user has started editing a row but then cancelled the edit
     * @param {Object} grid The grid
     */
    
    /**
     * @event edit
     * Fires after a row is edited. Usage example:
     *
     *     grid.on('edit', function(editor, e) {
     *         // commit the changes right after editing finished
     *         e.record.commit();
     *     };
     *
     * @param {Ext.grid.plugin.Editing} editor
     * @param {Object} e An edit event with the following properties:
     *
     * - grid - The grid this editor is on
     * - view - The grid view
     * - store - The grid store
     * - record - The record being edited
     * - row - The grid table row
     * - column - The grid {@link Ext.grid.column.Column Column} defining the column that initiated the edit
     * - rowIdx - The row index that is being edited
     * - colIdx - The column index that initiated the edit
     */
    /**
     * @event validateedit
     * Fires after a cell is edited, but before the value is set in the record. Return false to cancel the change. The
     * edit event object has the following properties
     *
     * Usage example showing how to remove the red triangle (dirty record indicator) from some records (not all). By
     * observing the grid's validateedit event, it can be cancelled if the edit occurs on a targeted row (for example)
     * and then setting the field's new value in the Record directly:
     *
     *     grid.on('validateedit', function(editor, e) {
     *       var myTargetRow = 6;
     *
     *       if (e.rowIdx == myTargetRow) {
     *         e.cancel = true;
     *         e.record.data[e.field] = e.value;
     *       }
     *     });
     *
     * @param {Ext.grid.plugin.Editing} editor
     * @param {Object} e An edit event with the following properties:
     *
     * - grid - The grid this editor is on
     * - view - The grid view
     * - store - The grid store
     * - record - The record being edited
     * - row - The grid table row
     * - column - The grid {@link Ext.grid.column.Column Column} defining the column that initiated the edit
     * - rowIdx - The row index that is being edited
     * - colIdx - The column index that initiated the edit
     * - cancel - Set this to true to cancel the edit or return false from your handler.
     */

    constructor: function() {
        var me = this;
        me.callParent(arguments);

        if (!me.clicksToMoveEditor) {
            me.clicksToMoveEditor = me.clicksToEdit;
        }

        me.autoCancel = !!me.autoCancel;
    },

    init: function(grid) {
        this.callParent([grid]);
    },

    /**
     * @private
     * AbstractComponent calls destroy on all its plugins at destroy time.
     */
    destroy: function() {
        var me = this;
        Ext.destroy(me.editor);
        me.callParent(arguments);
    },

    /**
     * Starts editing the specified record, using the specified Column definition to define which field is being edited.
     * @param {Ext.data.Model} record The Store data record which backs the row to be edited.
     * @param {Ext.data.Model} columnHeader The Column object defining the column to be edited. @override
     */
    startEdit: function(record, columnHeader) {
        var me = this,
            editor = me.getEditor();

        if (me.callParent(arguments) === false) {
            return false;
        }

        // Fire off our editor
        if (editor.beforeEdit() !== false) {
            editor.startEdit(me.context.record, me.context.column);
        }
    },

    // private
    cancelEdit: function() {
        var me = this;

        if (me.editing) {
            me.getEditor().cancelEdit();
            me.callParent(arguments);
            
            me.fireEvent('canceledit', me.context);
        }
    },

    // private
    completeEdit: function() {
        var me = this;

        if (me.editing && me.validateEdit()) {
            me.editing = false;
            me.fireEvent('edit', me, me.context);
        }
    },

    completeRemove:function(){
        var me = this;

        if (me.editing) {
            me.getEditor().completeRemove();
            me.fireEvent('completeremove', me, me.context);
        }

    },

    // private
    validateEdit: function() {
        var me             = this,
            editor         = me.editor,
            context        = me.context,
            record         = context.record,
            newValues      = {},
            originalValues = {},
            editors        = editor.getForm().getFields().items,
            e,
            eLen           = editors.length,
            name, item;

        for (e = 0; e < eLen; e++) {
            item = editors[e];
            name = item.name;

            newValues[name]      = item.getValue();
            originalValues[name] = record.get(name);
        }

        Ext.apply(context, {
            newValues      : newValues,
            originalValues : originalValues
        });

        return me.callParent(arguments) && me.getEditor().completeEdit();
    },

    // private
    getEditor: function() {
        var me = this;

        if (!me.editor) {
            me.editor = me.initEditor();
        }
        return me.editor;
    },

    // private
    initEditor: function() {
        var me       = this,
            grid     = me.grid,
            view     = me.view,
            headerCt = grid.headerCt,
            btns     = ['saveBtnText', 'cancelBtnText', 'errorsText', 'dirtyText'],
            b,
            bLen     = btns.length,
            cfg      = {
                autoCancel: me.autoCancel,
                errorSummary: me.errorSummary,
	            saveBtnEnabled: me.disableValidation,
                fields: headerCt.getGridColumns(),
                hidden: true,

                // keep a reference..
                editingPlugin: me,
                renderTo: view.el
            },
            item;

        for (b = 0; b < bLen; b++) {
            item = btns[b];

            if (Ext.isDefined(me[item])) {
                cfg[item] = me[item];
            }
        }
        return Ext.create('App.ux.grid.RowFormEditor2', cfg);
    },

    // private
    initEditTriggers: function() {
        var me = this,
            moveEditorEvent = me.clicksToMoveEditor === 1 ? 'click' : 'dblclick';

        me.callParent(arguments);

        if (me.clicksToMoveEditor !== me.clicksToEdit) {
            me.mon(me.view, 'cell' + moveEditorEvent, me.moveEditorByClick, me);
        }
    },

    addHeaderEvents: function(){
        var me = this;
        me.callParent();

        me.mon(me.grid.headerCt, {
            scope: me,
            columnresize: me.onColumnResize,
            columnhide: me.onColumnHide,
            columnshow: me.onColumnShow,
            columnmove: me.onColumnMove
        });
    },

    startEditByClick: function() {
        var me = this;
        if (!me.editing || me.clicksToMoveEditor === me.clicksToEdit) {
            me.callParent(arguments);
        }
    },

    moveEditorByClick: function() {
        var me = this;
        if (me.editing) {
            me.superclass.startEditByClick.apply(me, arguments);
        }
    },

    // private
    onColumnAdd: function(ct, column) {
        if (column.isHeader) {
            var me = this,
                editor;

            me.initFieldAccessors(column);
            editor = me.getEditor();

            if (editor && editor.onColumnAdd) {
                editor.onColumnAdd(column);
            }
        }
    },

    // private
    onColumnRemove: function(ct, column) {
        if (column.isHeader) {
            var me = this,
                editor = me.getEditor();

            if (editor && editor.onColumnRemove) {
                editor.onColumnRemove(column);
            }
            me.removeFieldAccessors(column);
        }
    },

    // private
    onColumnResize: function(ct, column, width) {
        if (column.isHeader) {
            var me = this,
                editor = me.getEditor();

            if (editor && editor.onColumnResize) {
                editor.onColumnResize(column, width);
            }
        }
    },

    // private
    onColumnHide: function(ct, column) {
        // no isHeader check here since its already a columnhide event.
        var me = this,
            editor = me.getEditor();

        if (editor && editor.onColumnHide) {
            editor.onColumnHide(column);
        }
    },

    // private
    onColumnShow: function(ct, column) {
        // no isHeader check here since its already a columnshow event.
        var me = this,
            editor = me.getEditor();

        if (editor && editor.onColumnShow) {
            editor.onColumnShow(column);
        }
    },

    // private
    onColumnMove: function(ct, column, fromIdx, toIdx) {
        // no isHeader check here since its already a columnmove event.
        var me = this,
            editor = me.getEditor();

        if (editor && editor.onColumnMove) {
            editor.onColumnMove(column, fromIdx, toIdx);
        }
    },

    // private
    setColumnField: function(column, field) {
        var me = this;
        me.callParent(arguments);
        me.getEditor().setField(column.field, column);
    }
});

