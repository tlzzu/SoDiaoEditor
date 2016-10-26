(function (window, undefined) {
    if (window.EMR == undefined) window.EMR = {isdesign:true};
    function initTitle(title) {
        var html = ['<div style="position:fixed;top:0;left:0;z-index:1000;width:100%;">',
        '<div id="header" style="height: 45px;overflow: hidden;background-color: #16742B;">',
            '<div class="left" style="position:absolute;top:0;left:0;">',
                '<img src="/EMR/img/SoDiaoL.png" style="height:35px;margin:5px;border:none;" />',
            '</div>',
            '<h1 style="font-size: 14px;height: 45px;line-height: 45px;margin: 0 auto;text-align: center;font-weight: normal;color:#fff;" id="wordonline-filename">', title, '</h1>',
            '<div style="float:right;position: absolute;top: 10px;right: 10px;"><input style="margin-left: 10px;" type="button" value="获取HTML" onclick="alert(EMR.getEditorHTML())" /><input style="margin-left: 10px;" type="button" value="获取控件" onclick="alert(JSON.stringify(EMR.getControlsValue()))" /></div>',
        '</div>', window.EMR.initToolbar(), '</div>'];
        return html.join('');
    }
    function initEditor(editorHtml) {
        var html = [' <div style="width:800px;margin:0px auto 0 auto;">',
        '<div id="panelEditor" style="margin-top:88px;">', editorHtml,
        '</div>',
        '<div style="text-align: center;font-size: 12px; color: #999; margin: 20px 0;">SoDiao v2.0 电子病历编辑器</div>',
        '</div>'];
        return html.join('');
    }
    window.EMR.Init = function (opt) {
        if (opt == undefined) {
            console.log('参数为空，无法初始化编辑器！');
            return;
        }
        window.EMR.isdesign = (opt.isdesign != undefined && opt.isdesign == false) ? false : true;
        //初始化header 初始化编辑器
        var editorDom = document.getElementById(opt.id);
        var div = document.createElement("div");
        div.innerHTML = initTitle(opt.title) + initEditor(editorDom.outerHTML);
        editorDom.parentNode.insertBefore(div, editorDom);
        editorDom.remove();
        var editor = UE.getEditor(opt.id, opt.editor);
        editor.addListener('keydown', function (type, evt) {
            var keyCode = evt.keyCode || evt.which;
            //console.log(keyCode);
            if (keyCode == 13) {
                //如果是text里面不允许出现回车
                var range = editor.selection.getRange();
                //debugger;
                var start = range.startContainer;
                if (start == null)
                    return;
                var startSpan = domUtils.findParentByTagName(start, 'span', true);
                if (startSpan == null)
                    return;
                var startP = startSpan.parentNode;
                if (startP == null)
                    return;
                var model = startP.getAttribute('tl-model');
                if (model != null) {
                    console.log("不允许输入回车！");
                    evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
                    evt.stopPropagation();
                    return;
                }
            }
        });
        editor.addListener('keyup', function (type, evt) {
            var keyCode = evt.keyCode || evt.which;
            //console.log(keyCode);
            if (keyCode == 8) {
                //如果是text里面不允许出现回车
                var range = editor.selection.getRange();
                var start = range.startContainer;
                var node = start.parentNode;
                if (node.getAttribute('class') == 'tl-value') {
                    var temp = node.parentNode;
                    var lefts = temp.getElementsByClassName('tl-left');
                    var rights = temp.getElementsByClassName('tl-right');
                    var valuess = temp.getElementsByClassName('tl-value');
                    if (!(lefts != null && lefts.length == 1 && rights != null && rights.length == 1 && valuess != null && valuess.length == 1)) {
                        if (confirm("您确定要删除此节点吗？")) {
                            domUtils.remove(temp);
                        } else {
                            editor.execCommand('undo');
                            evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
                            evt.stopPropagation();
                        }
                    }
                    return;
                }
                var models = node.querySelectorAll("span[tl-model]");
                if (models != null && models.length > 0) {
                    for (var i = 0, l = models.length; i < l; i++) {
                        var temp = models[i];
                        var lefts = temp.getElementsByClassName('tl-left');
                        var rights = temp.getElementsByClassName('tl-right');
                        var valuess = temp.getElementsByClassName('tl-value');
                        if (!(lefts != null && lefts.length == 1 && rights != null && rights.length == 1 && valuess != null && valuess.length == 1)) {
                            if (confirm("您确定要删除此节点吗？")) {
                                domUtils.remove(temp);
                            } else {
                                editor.execCommand('undo');
                                evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
                                evt.stopPropagation();
                            }
                        }
                    }
                }
            }
        });
        window.EMR.editor = editor;
    };
    //获取html
    window.EMR.getEditorHTML = function () {
        return window.EMR.editor.getContent();
    };
    //获取控件
    window.EMR.getControlsValue = function () {
        var tempDom = document.createElement('div');
        tempDom.innerHTML = window.EMR.editor.getContent();
        var models = tempDom.getElementsByTagName('span');
        var controls = [];
        for (var i = 0, l = models.length; i < l; i++) {
            var jsonStr=models[i].getAttribute('tl-model');
            if (jsonStr != null && jsonStr!='') {
                var json = JSON.parse(jsonStr);
                controls.push({ id: json.ID, value: json.VALUE });
            }
        }
        return controls;
    };
    //window.EMR.getControlsValue = function () {
    //    var tempDom = document.createElement('div');
    //    tempDom.innerHTML = window.EMR.editor.getContent();
    //    var models = tempDom.getElementsByTagName('span');
    //    var controls = [];
    //    for (var i = 0, l = models.length; i < l; i++) {
    //        var jsonStr = models[i].getAttribute('tl-model');
    //        if (jsonStr != null && jsonStr != '') {
    //            var json = JSON.parse(jsonStr);
    //            controls.push({ ID: json.ID, NAME: json.NAME, TYPE: json.TYPE, TAG: json.TAG, DESCNAME: json.DESCNAME, HTML: models[i].outerHTML });
    //        }
    //    }
    //    debugger;
    //    return controls;
    //};





    window.selectTab= function (e) {
        var tool = document.getElementById('toolbar');
        tool.setAttribute('style', 'height:142px;');
        var current = e.target;
        var lis = current.parentNode.childNodes;
        for (var i = 0, l = lis.length; i < l; i++) {
            if (lis[i].setAttribute != undefined)
                lis[i].setAttribute('class', 'tab-list-item');//tab-list-item tab-list-item-active
        }
        current.setAttribute('class', 'tab-list-item tab-list-item-active');
        if (current.nodeName != 'LI')
            return;
        var id = current.getAttribute('tag');
        var doc = document.getElementById(id);
        var children = doc.parentNode.childNodes;
        for (var i = 0, l = children.length; i < l; i++) {
            if (children[i].setAttribute != undefined)
                children[i].setAttribute('style', '');
        }
        doc.setAttribute('style', 'display:inline!important;');
    }
    //固定工具栏
    window.dockToolbar = function dockToolbar(t) {
        t.setAttribute('style', 'display:none!important;;');
        document.getElementById('fold-toolbar').setAttribute('style', 'display:block!important;;');
        document.getElementById('panelEditor').setAttribute('style', 'margin-top:200px;');
    }
    //折叠工具栏
    window.foldToolbar= function (t) {
        document.getElementById('fold-toolbar').setAttribute('style', '');
        document.getElementById('dock-toolbar').setAttribute('style', '');
        document.getElementById('toolbar').setAttribute('style', 'height:30px;');
        document.getElementById('panelEditor').setAttribute('style', 'margin-top:88px;');
    }
})(window,undefined);