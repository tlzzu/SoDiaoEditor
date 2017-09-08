# SoDiaoEditor.v2
> 更多精彩请移步[博客园文章](http://www.cnblogs.com/tlzzu/p/6654208.html)，阅读英文版请移步[这里](https://github.com/tlzzu/SoDiaoEditor.v2/blob/master/README-en.md)。很欣慰，该项目已经至少在2所三甲医院得到了应用，愿医疗行业越来越好，谨以此献给那些还在医疗行业奋斗的小伙伴。
## 愿景
1. 成为电子病历编辑的通用标准；
2. 愿医疗行业更健康；
3. 愿各位码农少加班；
	
## 交流
QQ群：370844065
## 更新
#### 首次更新（2017-3-30）
1. 新增以下toolbar：
```
编辑
  i. 剪切板
      1. 复制、粘贴、切剪
  ii. 字体
      1. 字体、字号、增大字体、缩小字体
插入
  i. 字符
  ii. 链接
      1. 取消链接
  iii. 图片
      1. 图片、涂鸦
  iv. 表格
表格
  i. 表格
      1. 插入表格
```
2. 设计器中新增SED对象，并增加以下接口：
3. 修复事件兼容性（暂不支持IE8及其以下的浏览器，后续会有解决方案）
4. 增加toolbar可配置性。
5. 解决上一个版本中的bug。
6. 等

#### 设计器中对涂鸦双向编辑（2017-7-17）
```
1. 在设计器中对涂鸦双向编辑，可对之前的涂鸦进行二次修改。
```
#### 编辑器增加移动化支持（2017-7-3）

对编辑器中的控件增加移动化支持，对移动设备访问编辑，无需配置，自动启用移动化适配。[可在移动端访问此页面](http://editor.sodiao.org/example/design-editor.html)

#### 增加日期控件、复选框控件（2017-5-14）
```
1. 增加日期控件。可以设置最大、最小范围。
2. 增加复选框控件。
```
#### 增加表格中的对齐方向（2017-4-28）
```
表格中字体的对齐方向可在 表格-》对齐方向 中设置
```
#### 增加自定义toolbar标题&支持对字体的操作（2017-4-26）
```
1. 增加了对自定义toolbar标题的支持，支持多语言，参考[设计模式--电子病历设计器(扩展toolbar)](http://editor.sodiao.org/example/design-design.html)，只需在html中引用/lang/sde-zh-cn.js文件即可，可以更改文件中显示的内容值，达到自定义toolbar标题的功能
2. 原来对控件字体格式化时会损坏控件，现该bug已经修复。
```
#### 编辑器支持设计模式（2017-4-21）
```
可在 [设计模式--电子病历编辑器]中选中文字，即可出现编辑下过，如果需要这个效果，需设置初始化的mode为DESIGN
```
#### 新增moveToControlPosition 方法，定位到指定的控件（2017-9-5）
```
因为页面可能存在多个id相同的控件，所以可以多次调用，定位到需要的位置。
```
## 展示
![ ](example/img/1.gif)
![ ](example/img/3.gif)
![ ](example/img/2.gif)
## [预览](http://editor.sodiao.org/example/index.html)
1. [设计模式--电子病历设计器(扩展toolbar)](http://editor.sodiao.org/example/design-design.html)
```
建议给病历模板设计者（开发人员，或者科主任）使用。
可用来设计电子病历模板，也可以当做电子病历编辑器使用。
此时输入的值可利用SDE对象暴露出的接口获取。
增加自定义toolbar标题功能，可支持多语言。
```
2. [编辑模式--电子病历设计器](http://editor.sodiao.org/example/editor-design.html))
```
建议给医生使用。
此时医生可以在原有模板中添加已有的控件，也可以给科主任用来设计模板。
亦可通过SDE对象暴露出来的接口获取数据。
```
3. [只读模式--电子病历设计器](http://editor.sodiao.org/example/readonly-design.html))
```
建议该模式给医生查看使用，在该模式下电子病历中所有控件均不可编辑。
```
4. [按钮控制--电子病历设计器](http://editor.sodiao.org/example/btn-design.html)
```
按钮通过事件控制！
```
5. [设计模式--电子病历编辑器](http://editor.sodiao.org/example/design-editor.html)
```
建议给医生使用，此模式下医生可以编辑控件中的值，并且可编译控件的内容。选中文字后有惊喜。
```
6. [编辑模式--电子病历编辑器](http://editor.sodiao.org/example/editor-editor.html)
```
建议给医生使用，此模式下医生只能编辑控件中的值，其余均不可修改。
```
7. [只读模式--电子病历编辑器](http://editor.sodiao.org/example/readonly-editor.html)
```
该模式只允许查看，控件不可被编辑。
```
8. [按钮控制--电子病历编辑器](http://editor.sodiao.org/example/btn-editor.html)
```
按钮通过事件控制！
```
## 结构
```shell
data                    模拟异步请求的数据，正式项目中可忽略
dialogs                 扩展百度ueditor的dialogs
lang                 	toolbar多语言支持，可自定义toolbar标题
dist                    核心js文件
    js
        sde.design.js   SoDiaoEditor设计器核心js
        sde.editor.js   SoDiaoEditor编辑器核心js
example                 一些demo
ueditor                 百度ueditor库，可替换成自己版本
sde.config.js           核心配置文件
```
## 使用
##### 电子病历设计器：
```
<!DOCTYPE html>
<html lang="zh-CN">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>设计模式--电子病历设计器</title>
    <!-- 注意以下各脚本之间的加载顺序！ -->
    <script type="text/javascript" src="sde.config.js"></script>
    <link rel="stylesheet" href="ueditor/themes/default/css/ueditor.css" />
    <script type="text/javascript" src="ueditor/ueditor.all.js"></script>
    <script type="text/javascript" src="ueditor/lang/zh-cn/zh-cn.js"></script>
    <script type="text/javascript"  src="dist/js/sde.design.js"></script>
</head>
<body>
    <script id="myEditor" type="text/plain" style="width:680px;height:1000px;">
        病历模板...
    </script>
    <script type="text/javascript">
        window.onload = function() {
            var sde = new SDE({
                id: "myEditor",
                title: '<div style="height: 45px;overflow: hidden;background-color: #16742B;">' +
                    '<div class="left" style="position:absolute;top:0;left:0;">' +
                    '<img src="../data/img/SoDiaoL.png" style="height:35px;margin:5px;border:none;" />' +
                    '</div>' +
                    '<h1 style="font-size: 14px;height: 45px;line-height: 45px;margin: 0 auto;text-align: center;font-weight: normal;color:#fff;" >SoDiaoEditor电子病历编辑器</h1>' +
                    '</div>', //自定义title
				iframe_js_src: "", //iframe中添加js脚本，可以为string或Array类型。例如："xx/xx.js"或者["aa/aa.js","bb/bb.js"]
				iframe_css_src: "" //iframe中添加css脚本，可以为string或Array类型。例如："xx/xx.css"或者["aa/aa.css","bb/bb.css"]
            });
        };
    </script>
</body>
</html>
```
###### 注意：
> 各个脚本之间的加载顺序，已本例为准。
配置项(sde.config.js)：
```
/*
默认配置项
*/
(function() {
    var URL = window.UEDITOR_HOME_URL || getUEBasePath();
    /*
    SDE_CONFIG 配置项
    */
    window.SDE_CONFIG = {
        HOME_URL: URL,
        HOME_URL_DIALOGS: URL + 'dialogs/',//SoDiaoEditor扩展ueditor的dialogs位置
        EDITOR_URL: URL + 'dist/js/sde.editor.js',
        MODE: "DESIGN", //DESIGN:设计|EDITOR:编辑|READONLY:只读（所有节点都不可编辑）
        CONTROL_TEMPLATES: []//控件模板
    };
    /**
     * 配置项主体。注意，此处所有涉及到路径的配置别遗漏URL变量。
     */
    window.UEDITOR_CONFIG = {
        UEDITOR_HOME_URL: URL + 'ueditor/', //为编辑器实例添加一个路径，这个不能被注释
        serverUrl: URL + "data/config.json", //URL + "net/controller.ashx", // 服务器统一请求接口路径
        toolbars: [], //工具栏上的所有的功能按钮和下拉框，可以在new编辑器的实例时选择自己需要的重新定义
        autoClearinitialContent: false, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
        //iframeJsUrl: URL + window.SDE_CONFIG.EDITOR_URL + '?temp=' + new Date().getTime(), //给编辑区域的iframe引入一个js文件
        // iframeCssUrl: URL + 'EMR/css/default.css?temp=' + new Date().getTime(), //给编辑区域的iframe引入一个css文件
        allowDivTransToP: false, //允许进入编辑器的div标签自动变成p标签
        wordCount: false, //关闭字数统计
        elementPathEnabled: false, //关闭elementPath
        autoClearinitialContent: false
    };
    function getUEBasePath(docUrl, confUrl) {
        return getBasePath(docUrl || self.document.URL || self.location.href, confUrl || getConfigFilePath());
    }
    function getConfigFilePath() {
        var configPath = document.getElementsByTagName('script');
        return configPath[configPath.length - 1].src;
    }
    function getBasePath(docUrl, confUrl) {
        var basePath = confUrl;
        if (/^(\/|\\\\)/.test(confUrl)) {
            basePath = /^.+?\w(\/|\\\\)/.exec(docUrl)[0] + confUrl.replace(/^(\/|\\\\)/, '');
        } else if (!/^[a-z]+:/i.test(confUrl)) {
            docUrl = docUrl.split("#")[0].split("?")[0].replace(/[^\\\/]+$/, '');
            basePath = docUrl + "" + confUrl;
        }
        return optimizationPath(basePath);
    }
    function optimizationPath(path) {
        var protocol = /^[a-z]+:\/\//.exec(path)[0],
            tmp = null,
            res = [];
        path = path.replace(protocol, "").split("?")[0].split("#")[0];
        path = path.replace(/\\/g, '/').split(/\//);
        path[path.length - 1] = "";
        while (path.length) {
            if ((tmp = path.shift()) === "..") {
                res.pop();
            } else if (tmp !== ".") {
                res.push(tmp);
            }

        }
        return protocol + res.join("/");
    }
    window.UE = {
        getUEBasePath: getUEBasePath
    };
})();
```
注意：
> 请重点关注window.SDE_CONFIG 和 window.UEDITOR_CONFIG 。 建议window.UEDITOR_CONFIG不要修改，可根据需求该window.SDE_CONFIG对象
##### 电子病历编辑器：

```
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>编辑模式--电子病历编辑器</title>
    <script type="text/javascript" src="dist/js/sde.editor.js"></script>
</head>
<body>
    <div id="myEditor" style="width:680px;height:1000px;margin:0 auto;">
        病历内容...
    </div>
    <script type="text/javascript">
        window.onload = function() {
            var sde = new SDE({
                id: "myEditor",
                title: '<div style="height: 45px;overflow: hidden;background-color: #16742B;">' +
                    '<div class="left" style="position:absolute;top:0;left:0;">' +
                    '<img src="../data/img/SoDiaoL.png" style="height:35px;margin:5px;border:none;" />' +
                    '</div>' +
                    '<h1 style="font-size: 14px;height: 45px;line-height: 45px;margin: 0 auto;text-align: center;font-weight: normal;color:#fff;" >SoDiaoEditor电子病历编辑器</h1>' +
                    '</div>', //自定义title
                mode: 'EDITOR'//配置模式
            });
        };
    </script>
</body>
</html>
```





## 文档
##### 电子病历设计器：
方法 | 说明 | 描述
---|---|---
ready(function(){}) | 编辑器加载完成 | (之后的所有方法必须在ready加载完成后使用）
html([html]) | 获取/设置所有编辑器中的html模板 | 如果html不传递，则为获取，有值则为设置
getControl([id]) | 获取编辑器中的控件 | id为可选，若为无则是获取所有控件
setControl(ctl) | 设置编辑器中指定id的控件值 | ctl：{ID:'',VALUE:''}如果是select控件类型ctl：{ID:'',VALUE:'',TEXT:''}。ctl可以为数组也可以为对象，设置冻结REQUIRED：1为冻结，只读不可操作
setMode(mode) | 设置编辑器模式 | mode可选：DESIGN（设计）、EDITOR（编辑）、READONLY（只读）
showSource() | 切换源码模式和正常编辑模式 | 切换源码模式和正常编辑模式
moveToControlPosition(id) | 定位到指定控件位置 | 因为页面可能存在多个id相同的控件，所以可以多次调用，定位到需要的位置。id为控件的id

##### 设计器完整配置
```
//默认配置
    defaultOptions: {
        id: '',
        title: '', //  //电子病历标题
        control_templates: [],
        controls: [], //需要设置的controls的值
        mode: '', //优先去里面值
        footer: 'SoDiaoEditor v2.0 电子病历编辑器',
        //其顺序保证了页面序列化时的顺序
        toolbars: {
            'sde-toolbar-file': 'file',
            'sde-toolbar-editor': ['history', 'clipboard', 'fonts', 'paragraphs', 'styles'],
            'sde-toolbar-insert': ['horizontal', 'spechars', 'link', 'img', 'map', 'code', 'table', 'formula', 'comment'],
            'sde-toolbar-tables': ['table', 'blockmergecells', 'alignmergecells'],
            'sde-toolbar-views': ['directory', 'showcomment', 'preview'],
            'sde-toolbar-tools': ['drafts', 'print', 'searchreplace', 'wordcount'],
            'sde-toolbar-records': ['sdetemplate', 'sdecontrols'],
        },
        iframe_js_src: "", //iframe中添加js脚本
        iframe_css_src: "" //iframe中添加css脚本
    }
```

##### toolbar完整配置项
```
toolbars: {
    'sde-toolbar-file': 'file',//文件
    'sde-toolbar-editor': ['history', 'clipboard', 'fonts', 'paragraphs', 'styles'],//编辑
    'sde-toolbar-insert': ['horizontal', 'spechars', 'link', 'img', 'map', 'code', 'table', 'formula', 'comment'],//插入
    'sde-toolbar-tables': ['table', 'blockmergecells', 'alignmergecells'],//表格
    'sde-toolbar-views': ['directory', 'showcomment', 'preview'],//视图
    'sde-toolbar-tools': ['drafts', 'print', 'searchreplace', 'wordcount'],//工具
    'sde-toolbar-records': ['sdetemplate', 'sdecontrols']//病历控件
}
```
##### 电子病历编辑器：
方法 | 说明 | 描述
---|---|---
html([html]) | 获取/设置所有编辑器中的html模板 | 如果html不传递，则为获取，有值则为设置
getControl([id]) | 获取编辑器中的控件 | id为可选，若为无则是获取所有控件
setControl(ctl) | 设置编辑器中指定id的控件值 | ctl：{ID:'',VALUE:''}如果是select控件类型ctl：{ID:'',VALUE:'',TEXT:''}。ctl可以为数组也可以为对象，设置冻结REQUIRED：1为冻结，只读不可操作
setMode(mode) | 设置编辑器模式 | mode可选：DESIGN（设计）、EDITOR（编辑）、READONLY（只读）
moveToControlPosition(id) | 定位到指定控件位置 | 因为页面可能存在多个id相同的控件，所以可以多次调用，定位到需要的位置。id为控件的id
## 贡献&bug提交
1. 可邮件至[dd@sodiao.org](mailto://dd@sodiao.org/)；
2. 可以在github中的Iss中提交；
## 打赏
![image](data/img/ds.png)