/*
对ueditor的扩展
*/
(function (win, UE) {
    UE.EMRDesignTemplateUrl = 'EMR/dialogs/';
    ///获取弹出层
    function getDialog(editor, uiName, url, title, cssRules, buttons) {
        var dialog = new UE.ui.Dialog({
            iframeUrl: win.UEDITOR_CONFIG.UEDITOR_HOME_URL + UE.EMRDesignTemplateUrl + url,
            name: uiName,
            editor: editor,
            title: title,
            cssRules: cssRules,
            buttons: buttons
        });
        return dialog;
    }
   
    //创建一个在选中的图片单击时添加边框的插件，其实质就是在baidu.editor.plugins塞进一个闭包
    UE.plugins["tl_text"] = function () {
        var me = this, thePlugins = 'tl_text', dialog = getDialog(me, thePlugins, "text.html?temp=" + new Date().getTime(), "文本输入框", 'width:600px;height:480px;', [
            {
                className: 'edui-okbutton',
                label: '确定',
                onclick: function () {
                    dialog.close(true);
                }
            },
            {
                className: 'edui-cancelbutton',
                label: '取消',
                onclick: function () {
                    dialog.close(false);
                }
            }
        ]);
        me.commands[thePlugins] = {
            execCommand: function () {
                dialog.render();
                dialog.open();
            }
        };
        var popup = new baidu.editor.ui.Popup({
            editor: this,
            content: '',
            className: 'edui-bubble',
            _edit: function () {
                var anchorEl=popup.anchorEl;
                if(anchorEl.getAttribute('tl-model')==null)
                    anchorEl = anchorEl.parentNode;
                
                baidu.editor.plugins[thePlugins].editdom = anchorEl;
                me.execCommand(thePlugins);
                this.hide();
            },
            _delete: function () {
                if (window.confirm('是否删除？')) {
                    var anchorEl = this.anchorEl;
                    if (anchorEl.getAttribute('tl-model') == null)
                        anchorEl = anchorEl.parentNode;
                    baidu.editor.dom.domUtils.remove(anchorEl, false);
                }
                this.hide();
            }
        });
        popup.render();
        if (win.EMR.isdesign) {
            me.addListener('mouseover', function (t, evt) {
                evt = evt || window.event;
                var el = evt.target || evt.srcElement;
                if (el.tagName == 'BODY' || el.tagName == 'HTML') {
                    return;
                }
                var model = el.getAttribute('tl-model');
                if (model == '' || model == undefined) {
                    model = el.parentNode.getAttribute('tl-model');
                }
                if (model == '' || model == undefined) {
                    return;
                } else {
                    //debugger;
                    var json = JSON.parse(model);
                    if (json && json.TYPE == 'text') {
                        var html = popup.formatHtml('<nobr>' + json.NAME + ' 文本框: <span onclick=$$._edit() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>');
                        if (html) {
                            popup.getDom('content').innerHTML = html;
                            popup.anchorEl = el;
                            popup.showAnchor(popup.anchorEl);
                        } else {
                            popup.hide();
                        }
                    }
                }
            });
        }
    };
    //单选输入框
    UE.plugins["tl_select"] = function () {
        var me = this, thePlugins = 'tl_select', dialog = getDialog(me, thePlugins, "select.html?temp=" + new Date().getTime(), "下拉单选输入框", 'width:600px;height:600px;', [
            {
                className: 'edui-okbutton',
                label: '确定',
                onclick: function () {
                    dialog.close(true);
                }
            },
            {
                className: 'edui-cancelbutton',
                label: '取消',
                onclick: function () {
                    dialog.close(false);
                }
            }
        ]);
        me.commands[thePlugins] = {
            execCommand: function () {
                dialog.render();
                dialog.open();
            }
        };
        var popup = new baidu.editor.ui.Popup({
            editor: this,
            content: '',
            className: 'edui-bubble',
            _edit: function () {
                var anchorEl = popup.anchorEl;
                if (anchorEl.getAttribute('tl-model') == null)
                    anchorEl = anchorEl.parentNode;

                baidu.editor.plugins[thePlugins].editdom = anchorEl;
                me.execCommand(thePlugins);
                this.hide();
            },
            _delete: function () {
                if (window.confirm('是否删除？')) {
                    var anchorEl = this.anchorEl;
                    if (anchorEl.getAttribute('tl-model') == null)
                        anchorEl = anchorEl.parentNode;
                    baidu.editor.dom.domUtils.remove(anchorEl, false);
                }
                this.hide();
            }
        });
        popup.render();
        if (win.EMR.isdesign) {
            me.addListener('mouseover', function (t, evt) {
                evt = evt || window.event;
                var el = evt.target || evt.srcElement;
                if (el.tagName == 'BODY' || el.tagName == 'HTML') {
                    return;
                }
                var model = el.getAttribute('tl-model');
                if (model == '' || model == undefined) {
                    model = el.parentNode.getAttribute('tl-model');
                }
                if (model == '' || model == undefined) {
                    return;
                } else {
                    //debugger;
                    var json = JSON.parse(model);
                    if (json && json.TYPE == 'select') {
                        var html = popup.formatHtml('<nobr>' + json.NAME + ' 下拉单选输入框: <span onclick=$$._edit() class="edui-clickable">编辑</span>&nbsp;&nbsp;<span onclick=$$._delete() class="edui-clickable">删除</span></nobr>');
                        if (html) {
                            popup.getDom('content').innerHTML = html;
                            popup.anchorEl = el;
                            popup.showAnchor(popup.anchorEl);
                        } else {
                            popup.hide();
                        }
                    }
                }
            });
        }
    };

    UE.plugins["tl_templatecontrol"] = function () {
        var me = this, thePlugins = 'tl_templatecontrol', dialog = getDialog(me, thePlugins, "templatecontrol.html?temp=" + new Date().getTime(), "控件模板选择", 'width:600px;height:480px;', [
            {
                className: 'edui-okbutton',
                label: '确定',
                onclick: function () {
                    dialog.close(true);
                }
            },
            {
                className: 'edui-cancelbutton',
                label: '取消',
                onclick: function () {
                    dialog.close(false);
                }
            }
        ]);
        me.commands[thePlugins] = {
            execCommand: function () {
                dialog.render();
                dialog.open();
            }
        };
        var popup = new baidu.editor.ui.Popup({
            editor: this,
            content: '',
            className: 'edui-bubble'
        });
        popup.render();
    };





    //添加按钮
    UE.registerUI('tl_text', function (editor, uiName) {

        var dialog = getDialog(editor, uiName, "text.html?temp="+new Date().getTime(), "文本输入框", 'width:600px;height:480px;', [
            {
                className: 'edui-okbutton',
                label: '确定',
                onclick: function () {
                    dialog.close(true);
                }
            },
            {
                className: 'edui-cancelbutton',
                label: '取消',
                onclick: function () {
                    dialog.close(false);
                }
            }
        ]);
        //参考addCustomizeButton.js
        var btn = new UE.ui.Button({
            name: '文本输入框',
            title: '文本输入框',
            //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
            cssRules: 'background-position: 0 216px;',//-25是一个图标
            onclick: function () {
                var range = editor.selection.getRange();
                var start = range.startContainer.parentNode;
                if (start.getAttribute('class') != 'tl-value') {
                    dialog.render();
                    dialog.open();
                } else {
                    alert("控件内不允许再插入控件！");
                    //editor.trigger('showmessage', {
                    //    content: '控件内不能再插入控件！',
                    //    timeout: 2000
                    //});
                }
            }
        });

        return btn;
    });
    //选择项
    UE.registerUI('tl_select', function (editor, uiName) {
        var dialog = getDialog(editor, uiName, "select.html?temp=" + new Date().getTime(), "下拉单选输入框", 'width:600px;height:600px;', [
            {
                className: 'edui-okbutton',
                label: '确定',
                onclick: function () {
                    dialog.close(true);
                }
            },
            {
                className: 'edui-cancelbutton',
                label: '取消',
                onclick: function () {
                    dialog.close(false);
                }
            }
        ]);
        //参考addCustomizeButton.js
        var btn = new UE.ui.Button({
            name: '下拉单选输入框',
            title: '下拉单选输入框',
            //需要添加的额外样式，指定icon图标，这里默认使用一个重复的icon
            cssRules: 'background-position: -25px 216px;',//-25是一个图标
            onclick: function () {
                var range = editor.selection.getRange();
                var start = range.startContainer.parentNode;
                if (start.getAttribute('class') != 'tl-value') {
                    dialog.render();
                    dialog.open();
                } else {
                    alert("控件内不允许再插入控件！");
                }
            }
        });

        return btn;
    });
    



    ////键盘控制
    //UE.plugins["tl_enterkey"] = function () {
    //    var me = this;
    //    me.addListener('keyup', function (type, evt) {
    //        var keyCode = evt.keyCode || evt.which;
    //        if (keyCode == 13) {
    //            //如果是text里面不允许出现回车
    //            debugger;
    //        }
    //    });
    //    me.addListener('keydown', function (type, evt) {
    //        var keyCode = evt.keyCode || evt.which;
    //        if (keyCode == 13) {
    //            //如果是text里面不允许出现回车
    //            debugger;
    //        }
    //    });
        
    //};
})(window,UE);





