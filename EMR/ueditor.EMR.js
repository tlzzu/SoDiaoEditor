/*
该js是在iframe中运行，独立于ueditor
*/

//整合 ajax to：https://github.com/littleBlack520/ajax
(function (window, undefined) {
    function ajax(options) {

        //编码数据
        function setData() {
            //设置对象的遍码
            function setObjData(data, parentName) {
                function encodeData(name, value, parentName) {
                    var items = [];
                    name = parentName === undefined ? name : parentName + "[" + name + "]";
                    if (typeof value === "object" && value !== null) {
                        items = items.concat(setObjData(value, name));
                    } else {
                        name = encodeURIComponent(name);
                        value = encodeURIComponent(value);
                        items.push(name + "=" + value);
                    }
                    return items;
                }
                var arr = [], value;
                if (Object.prototype.toString.call(data) == '[object Array]') {
                    for (var i = 0, len = data.length; i < len; i++) {
                        value = data[i];
                        arr = arr.concat(encodeData(typeof value == "object" ? i : "", value, parentName));
                    }
                } else if (Object.prototype.toString.call(data) == '[object Object]') {
                    for (var key in data) {
                        value = data[key];
                        arr = arr.concat(encodeData(key, value, parentName));
                    }
                }
                return arr;
            };
            //设置字符串的遍码，字符串的格式为：a=1&b=2;
            function setStrData(data) {
                var arr = data.split("&");
                for (var i = 0, len = arr.length; i < len; i++) {
                    name = encodeURIComponent(arr[i].split("=")[0]);
                    value = encodeURIComponent(arr[i].split("=")[1]);
                    arr[i] = name + "=" + value;
                }
                return arr;
            }

            if (data) {
                if (typeof data === "string") {
                    data = setStrData(data);
                } else if (typeof data === "object") {
                    data = setObjData(data);
                }
                data = data.join("&").replace("/%20/g", "+");
                //若是使用get方法或JSONP，则手动添加到URL中
                if (type === "get" || dataType === "jsonp") {
                    url += url.indexOf("?") > -1 ? (url.indexOf("=") > -1 ? "&" + data : data) : "?" + data;
                }
            }
        }
        // JSONP
        function createJsonp() {
            var script = document.createElement("script"),
                timeName = new Date().getTime() + Math.round(Math.random() * 1000),
                callback = "JSONP_" + timeName;

            window[callback] = function (data) {
                clearTimeout(timeout_flag);
                document.body.removeChild(script);
                success(data);
            }
            script.src = url + (url.indexOf("?") > -1 ? "&" : "?") + "callback=" + callback;
            script.type = "text/javascript";
            document.body.appendChild(script);
            setTime(callback, script);
        }
        //设置请求超时
        function setTime(callback, script) {
            if (timeOut !== undefined) {
                timeout_flag = setTimeout(function () {
                    if (dataType === "jsonp") {
                        delete window[callback];
                        document.body.removeChild(script);

                    } else {
                        timeout_bool = true;
                        xhr && xhr.abort();
                    }
                    console.log("timeout");

                }, timeOut);
            }
        }

        // XHR
        function createXHR() {
            //由于IE6的XMLHttpRequest对象是通过MSXML库中的一个ActiveX对象实现的。
            //所以创建XHR对象，需要在这里做兼容处理。
            function getXHR() {
                if (window.XMLHttpRequest) {
                    return new XMLHttpRequest();
                } else {
                    //遍历IE中不同版本的ActiveX对象
                    var versions = ["Microsoft", "msxm3", "msxml2", "msxml1"];
                    for (var i = 0; i < versions.length; i++) {
                        try {
                            var version = versions[i] + ".XMLHTTP";
                            return new ActiveXObject(version);
                        } catch (e) { }
                    }
                }
            }
            //创建对象。
            xhr = getXHR();
            xhr.open(type, url, async);
            //设置请求头
            if (type === "post" && !contentType) {
                //若是post提交，则设置content-Type 为application/x-www-four-urlencoded
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
            } else if (contentType) {
                xhr.setRequestHeader("Content-Type", contentType);
            }
            //添加监听
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (timeOut !== undefined) {
                        //由于执行abort()方法后，有可能触发onreadystatechange事件，
                        //所以设置一个timeout_bool标识，来忽略中止触发的事件。
                        if (timeout_bool) {
                            return;
                        }
                        clearTimeout(timeout_flag);
                    }
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {

                        success(xhr.responseText);
                    } else {
                        error(xhr.status, xhr.statusText);
                    }
                }
            };
            //发送请求
            xhr.send(type === "get" ? null : data);
            setTime(); //请求超时
        }


        var url = options.url || "", //请求的链接
            type = (options.type || "get").toLowerCase(), //请求的方法,默认为get
            data = options.data || null, //请求的数据
            contentType = options.contentType || "", //请求头
            dataType = options.dataType || "", //请求的类型
            async = options.async === undefined ? true : options.async, //是否异步，默认为true.
            timeOut = options.timeOut, //超时时间。 
            before = options.before || function () { }, //发送之前执行的函数
            error = options.error || function () { }, //错误执行的函数
            success = options.success || function () { }; //请求成功的回调函数
        var timeout_bool = false, //是否请求超时
            timeout_flag = null, //超时标识
            xhr = null; //xhr对角
        setData();
        before();
        if (dataType === "jsonp") {
            createJsonp();
        } else {
            createXHR();
        }
    }
    window.ajax = ajax;
})(window);

//text
(function (window, undefined) {
    if (window.EMR == undefined) window.EMR = {};
    //修改text的值之后触发改事件
    function datamodified(e) {
        var value = e.newValue;
        var node = this.parentNode.getAttribute('tl-model');
        var json = JSON.parse(node);
        if (json != null) {
            json.VALUE = value;
            this.parentNode.setAttribute('tl-model', JSON.stringify(json));
        }
    }
    function removeFloatWindow() {
        document.body.onclick = function () {
            var sNodes = document.getElementsByClassName('tl-ui-select');
            if (sNodes != null && sNodes.length > 0) {
                for (var i = 0, l = sNodes.length; i < l; i++) {
                    sNodes[0].remove();
                }
                document.body.onclick = null;
            }
            if (window.frameElement != null) {
                sNodes = window.parent.window.document.getElementsByClassName('tl-ui-select');
                if (sNodes != null && sNodes.length > 0) {
                    for (var i = 0, l = sNodes.length; i < l; i++) {
                        sNodes[0].remove();
                    }
                    //window.parent.window.document.body.onclick = null;
                }
            }
        };
    }
    function showHistory(t, historyData) {
        historyData = [{}, {}]
        
        console.log('showHistory');
        if (historyData == undefined || historyData.length <= 0) return;
        //var width = t.offsetWidth, height = t.offsetHeight, left = getLeft(t), top = getTop(t) + height;
        var newNode = document.createElement('div');
        newNode.setAttribute('class', "tl-ui-select");
        newNode.style.right = 5 + 'px';
        newNode.style.top = 432 + 'px';
        newNode.style.overflow = 'hidden';
        newNode.style.maxHeight = 100 + 'px';
        newNode.style.minWidth = 50 + 'px';
        newNode.style.height = 120 + 'px';
        newNode.style.width = 80 + 'px';
        newNode.style.display = 'block';
        newNode.innerHTML = "<div style='text-align:center;border-bottom:1px solid #ccc;'>历史痕迹</div><div style='padding: 5px;font-size: 12px;'>你瞅啥？...</div>";

        if (window.frameElement == null) {//没有在frame 中
            t.insertBefore(newNode, t.childNodes[t.childNodes.length - 1]);
        } else {
            var p = window.parent.window.document.body;
            p.insertBefore(newNode, p.childNodes[p.childNodes.length - 1]);
        }
        setTimeout(removeFloatWindow(),100);
    }

    var text = {
        tlclick: function (t) {

        }, tlspanclick: function (t,event) {
            //console.log('tlspanclick');
            //点击span，如果里面是默认值则需要去掉
            var value = t.innerHTML;
            if (value == '' || value == null||t.tagName=='BODY'||t.tagName=='HTML')
                return;
            var jsonstr = t.parentNode.getAttribute('tl-model');
            if (jsonstr == null || jsonstr == "")
                return;
            var json = JSON.parse(jsonstr);
            if (json.READONLY == 0 && value == json.DESCNAME)
                t.innerText = '';
            //绑定内容变化后的事件
            t.removeEventListener("DOMCharacterDataModified", datamodified, false);
            t.addEventListener("DOMCharacterDataModified", datamodified, false);
            if (json.READONLY == 0) {
                //阻止事件传递
                showHistory(t);
                event = event || window.event;
                if (event.stopPropagation) { //W3C阻止冒泡方法  
                    event.stopPropagation();
                } else {
                    event.cancelBubble = true; //IE阻止冒泡方法  
                }
            }
        }, tlspanblur: function (t) {
            //alert('blur');
        }
    };
    window.EMR.text = text;
})(window);

//select
(function (window, undefined) {
    if (window.EMR == undefined) window.EMR = {};
    //修改text的值之后触发改事件
    function datamodified(e) {
        var value = e.newValue;
        var node = this.parentNode.getAttribute('tl-model');
        var json = JSON.parse(node);
        if (json != null) {
            json.VALUE = value;
            json.TEXT = value;
            this.parentNode.setAttribute('tl-model', JSON.stringify(json));
        }
    }
    //获取元素的纵坐标 
    function getTop(e) {
        var offset = e.offsetTop;
        if (e.offsetParent != null) offset += getTop(e.offsetParent);
        return offset;
    }
    //获取元素的横坐标 
    function getLeft(e) {
        var offset = e.offsetLeft;
        if (e.offsetParent != null) offset += getLeft(e.offsetParent);
        return offset;
    }
    function removeFloatWindow() {
        document.body.onclick = function () {
            var sNodes = document.getElementsByClassName('tl-ui-select');
            if (sNodes != null && sNodes.length > 0) {
                for (var i = 0, l = sNodes.length; i < l; i++) {
                    sNodes[0].remove();
                }
                document.body.onclick = null;
            }
            if (window.frameElement != null) {
                sNodes =window.parent.window.document.getElementsByClassName('tl-ui-select');
                if (sNodes != null && sNodes.length > 0) {
                    for (var i = 0, l = sNodes.length; i < l; i++) {
                        sNodes[0].remove();
                    }
                    window.parent.window.document.body.onclick = null;
                }
            }
        };
    }
    function showHistory(t, historyData) {
        historyData = [{}, {}]
       
        console.log('showHistory');
        if (historyData == undefined || historyData.length <= 0) return;
        //var width = t.offsetWidth, height = t.offsetHeight, left = getLeft(t), top = getTop(t) + height;
        var newNode = document.createElement('div');
        newNode.setAttribute('class', "tl-ui-select");
        newNode.style.right = 5 + 'px';
        newNode.style.top = 432 + 'px';
        newNode.style.overflow = 'hidden';
        newNode.style.maxHeight = 100 + 'px';
        newNode.style.minWidth = 50 + 'px';
        newNode.style.height = 120 + 'px';
        newNode.style.width = 80 + 'px';
        newNode.style.display = 'block';
        newNode.innerHTML = "<div style='text-align:center;border-bottom:1px solid #ccc;'>历史痕迹</div><div style='padding: 5px;font-size: 12px;'>你瞅啥？...</div>";

        if (window.frameElement == null) {//没有在frame 中
            t.insertBefore(newNode, t.childNodes[t.childNodes.length - 1]);
        } else {
            var p = window.parent.window.document.body;
            p.insertBefore(newNode, p.childNodes[p.childNodes.length - 1]);
        }

    }
    //画出html，绑定事件
    function showHTML(t, data, va) {
        if (data == undefined || data.length <= 0) return;
        var width = t.offsetWidth, height = t.offsetHeight, left = getLeft(t), top = getTop(t) + height;
        var html = [];
        html.push('<ul class="tl-ui-select-content">');
        for (var i = 0,l=data.length; i < l; i++) {
            html.push('<li onclick="EMR.select.tlselectechange(this);" ');
            html.push(' tl-value="' + data[i].VALUE + '" ');
            html.push(' tl-text="' + data[i].TEXT + '" ');
            html.push(' title="' + data[i].TEXT + '" ');
            html.push(' style="height: ' + height + 'px; line-height: ' + height + 'px;" ');
            if ((va == undefined || va == '') && data[i].SELECTED != undefined && data[i].SELECTED == 1) {
                html.push(' class="tl-ui-select-selecteitem" ');
            } else if (va == data[i].VALUE) {
                html.push(' class="tl-ui-select-selecteitem" ');
            } else {
                html.push(' class="tl-ui-select-item" ');
            }
            html.push('>');
            html.push(data[i].TEXT);
            html.push('</li>');
        }
        html.push('</ul>');
        //html.push('</div>');
        var htmlstr = html.join('');
        //document.body.insertBefore(newNode,document.body.childNodes[50])
        var newNode = document.createElement('div');
        newNode.setAttribute('class', "tl-ui-select");
        newNode.style.left = left + 'px';
        newNode.style.top = top + 'px';
        newNode.style.overflow = 'hidden';
        newNode.style.maxHeight = (height * data.length) + 'px';
        newNode.style.minWidth = width + 'px';
        newNode.style.display = 'block';
        newNode.innerHTML = html.join('');
        //document.body.insertBefore(newNode, document.body.childNodes[0]);
        t.insertBefore(newNode, t.childNodes[t.childNodes.length-1]);
        //document.body.onclick = function () {
        //    var sNodes = document.getElementsByClassName('tl-ui-select');
        //    if (sNodes != null && sNodes.length > 0) {
        //        for (var i = 0, l = sNodes.length; i < l; i++) {
        //            sNodes[i].remove();
        //        }
        //        document.body.onclick = null;
        //    }
        //};
    }
    //根据json值画出下拉框
    function drowHTML(t, json) {
        if (json == null)
            return "";
        if (json.REMOTEURL != '') {
            window.ajax({
                type: "get",
                url: json.REMOTEURL, //添加自己的接口链接
                timeOut: 5000,
                //async:false,
                before: function () {
                    //console.log("before");
                },
                success: function (str) {
                    if (str != '') {
                        showHTML(t, JSON.parse(str),json.VALUE);
                    }
                    //画出html
                },
                error: function () {
                    //console.log("error");
                }
            });
        } else {
            showHTML(t,json.BINDINGDATA,json.VALUE);
        }
    }
    var select = {
        tlclick: function (t) {

        }, tlspanclick: function (t) {
            //console.log('tlspanclick');
            //点击span，如果里面是默认值则需要去掉
            var value = t.innerHTML;
            if (value == '' || value == null || t.tagName == 'BODY' || t.tagName == 'HTML')
                return;
            var jsonstr = t.parentNode.getAttribute('tl-model');
            if (jsonstr == null || jsonstr == "")
                return;
            var json = JSON.parse(jsonstr);
            if (json.FREEINPUT != 1)
                return;
            if (value == json.DESCNAME)
                t.innerText = '';
            //绑定内容变化后的事件
            t.removeEventListener("DOMCharacterDataModified", datamodified, false);
            t.addEventListener("DOMCharacterDataModified", datamodified, false);
        }, tlspandblclick: function (t) {
            //点击span，如果里面是默认值则需要去掉
            var value = t.innerHTML;
            if (value == '' || value == null || t.tagName == 'BODY' || t.tagName == 'HTML')
                return;
            var jsonstr = t.parentNode.getAttribute('tl-model');
            if (jsonstr == null || jsonstr == "")
                return;
            //console.log(jsonstr);
            var json = JSON.parse(jsonstr);
            //1.show之后给body绑定一个点击事件，触发后所有的select都【删除】
            drowHTML(t, json);
            showHistory(t);
            setTimeout(removeFloatWindow(), 100);
        },tlselectechange:function(t){
            //保存网页
            var value = t.getAttribute('tl-value'), text = t.getAttribute('tl-text');
           var node= t.parentNode.parentNode.parentNode.parentNode.getAttribute('tl-model');
            var json = JSON.parse(node);
            if (json != null) {
                json.VALUE = value;
                json.TEXT = value;
                t.parentNode.parentNode.parentNode.parentNode.setAttribute('tl-model', JSON.stringify(json));
            }
            t.parentNode.parentNode.parentNode.innerHTML = text;
        }, tlspanblur: function (t) {
            
        }
    };
    window.EMR.select = select;
})(window);