# SDE V3 API

> 该文档适用于 SDE v3.0

注意中括号[]为可选内容

## 导航

[options-配置](#options-配置)

[sde-对象](#sde-对象)

[toolbar-工具栏](#toolbar-工具栏)

[control-控件](#control-控件)

[event-事件](#event-事件)

[扩展组件](#扩展组件)

## options-配置

options 具体配置如下：

```js
{
    id: "",//可为页面中具体的id，或者Element对象
    title: "SoDiaoEditor.v3 电子病历编辑器", //电子病历标题
    width: 664,//病历中内部页面宽度
    open_toolbar: "", //默认打开的toolbar的name（如 sde-toolbar-editor、sde-toolbar-insert）
    toolbar_plugins: [], //对编辑器实例本身的新增扩展
    controls: [], // 初始化需要设置的controls的值
    mode: "", // 设置编辑器模式 DESIGN、EDITOR、READONLY
    footer: "SoDiaoEditor v3.0 电子病历编辑器",//编辑器底部的footer
    toolbars: {// 其顺序保证了页面序列化时的顺序
      "sde-toolbar-file": "file",
      "sde-toolbar-editor": [
        "history",
        "clipboard",
        "fonts",
        "paragraphs",
        "styles"
      ],
      "sde-toolbar-insert": [
        "horizontal",
        "spechars",
        "link",
        {
          img: [//新版中对img进行了拆分，可单独显示
            "insertimage",
            "simpleupload",
            "snapscreen",
            "emotion",
            "sdescrawl"
          ]
        },
        "map",
        "code",
        "table",
        "formula",
        "comment"
      ],
      "sde-toolbar-tables": ["table", "blockmergecells","alignmergecells"],
      "sde-toolbar-views": ["directory", "showcomment", "preview"],
      "sde-toolbar-tools": ["drafts", "print", "searchreplace", "wordcount"],
      "sde-toolbar-records": ["sdetemplate", "sdecontrols"]
    },
    iframe_js_src: "", // iframe中添加js脚本，可以是数组
    iframe_css_src: "", // iframe中添加css脚本，可以是数组
    ready(){},//如果是设计器，SDE的初始化为异步，初始化完成后会执该方法
    print: {//打印配置，宽度为模板中的默认宽度
      title: "",//打印页面title
      header(index, count, page) {},//打印页面渲染时的表头回调，需要返回一个Element对象，其中index为第几页（从零开始），count为一共有多少页，page为当年页面的Element对象
      footer(index, count, page) {},//打印页面渲染时的页脚回调，参数参考header
      height: 1142,//每一页的高度，建议固定该值
      header_height: 35,//打印表头的高度
      footer_height: 35 //打印页脚的高度
    }
}
```

## sde-对象

sde 对象可通过

> var sde=new SDE(options);

获取，[options](#options配置)为必填项。V3 版中支持多实例，自由定制 sde 的宽高。

---

sde 对象中的方法如下：

#### destroy()

_销毁 sde 对象方法_

可在 vue 组件生命周期中的 destroy 中调用 sde.destroy()来销毁 sde 对象。

#### getCursorControl()

_获取当前光所在的控件_

用于给控件插入内容，利用该方法获取到控件后可以调用 sde.setControl()方法设置控件值。

#### insertHtml(html)

_在当前光标位置插入该 html 内容，建议以后使用该方法插入 html 片段_

html 为插入的模板中的 html 内容。

#### openDialogs(opt)

_打开一个新的 dialogs 页面，方便各位扩展 toolbar 等_

opt 具体格式如下：

```js
{
  name: "", //该弹出唯一的name
  url: "",//弹出的url
  title: "",//弹出dialogs的标题
  height: "650px",//默认高度
  width: "800px"//默认宽度
}
```

#### setHeight(height)

_设置 sde 的高度，应用场景：当 sde 加载后，内容为空，此时内页高度会变低，可通过该方法设置 sde 默认的高度_

height：int 类型。单位 px

```js
sde.setHeight(500); //设置设计器默认高度为500px
```

#### print([opt])

_执行打印_

opt 为可选参数，为空，则取[options](#options).print 中的配置信息，不为空则取当前值，默认值如下：

```js
{//打印配置，宽度为模板中的默认宽度
  title: "",//打印页面title
  header(index, count, page) {},//打印页面渲染时的表头回调，需要返回一个Element对象，其中index为第几页（从零开始），count为一共有多少页，page为当年页面的Element对象
  footer(index, count, page) {},//打印页面渲染时的页脚回调，参数参考header
  height: 1142,//每一页的高度，建议固定该值，单位px
  header_height: 35,//打印表头的高度，单位px
  footer_height: 35 //打印页脚的高度，单位px
}
```

**注意：目前仅为简单实现，后续将提供更优方案。**

#### getArea([id])

_获取（全部）模板中的区域对象，区域中可插入控件_

id 为可选参数，为空则为获取模板中的所有 area 对象，否则为获取指定 id 的区域对象。

```
sde.getArea();//获取全部area对象，返回数组[]
sde.getArea(id);//获取单个area对象，返回具体area对象，若不存在，则返回null
```

返回的 area 对象结构及方法如下：

```js
{
    __dom__:Element,//该区域的Element对象，具体结构：<div class="sde-area sde-area-mode-normal" [sde-model=""] mode="NORMAL" _backmode="NORMAL" title="区域title"><div contenteditable="true">内容</div></div>
    __options__:{},//为sde-model中的值，可自由设置，如果sde-model中的值无法被JSON.parse，则返回字符串。
    getControl([id]){},//（全部）获取该区域中的控件，如果id为空则为获取区域中的全部控件
    html([h]){},//获取/设置区域中的html内容，h为空则为获取，否则则为设置
    mode([m]){},//设置区域中模式，默认为正常，可选:
                //NORMAL正常
                //READONLY只读
                //UNVISIBLE不可见
                //HIDE隐藏
    reset(){} //重置区域状态，重置后的状态为sde实例中初始化后的状态
}
```

#### getTitleControl([id])

_获取（全部）标题组件，返回为一个数组（考虑到同一标题可能会在模板中出现多次）_

id 为可选参数，为空则为获取标题控件中的所有 title 对象，否则为获取指定 id 的标题对象。标题组件应用于固定的表头、固定的内容等，其在设计器中的非设计模式下均不可修改。区域控件支持通过代码设置区域内容，设置接口如下：

```js
sde.getTitleControl(); //获取全部Title对象，返回数组[]
sde.getTitleControl(id); //获取指定id的Title对象，返回具体Title对象，若不存在，则返回空数组
```

Title 对象结构及方法如下：

```js
{
  dom:function([d]){},//获取或设置标题对象的Element属性
  html:function([h]){},//获取或设置html内容
  options:function([opt]){},//获取或设置title的dom对象中的sde-model属性
  setValue:function(v){},//设置标题控件显示内容
  getValue:function(){}//获取标题控件显示文本内容
}
```

以下为 V2 版的原有接口：

#### ready(function(){}) 该方法已被取消，请移步[options](#options配置).ready(function(){})

#### html([html])

_获取/设置 sde 对象中的模板_

html 为可选参数，空为获取 html；不为空，则为设置模板中的内容。

```
sde.html()//返回具体的html内容
sde.html('123')//设置模板中的内容为 123
```

#### getControl([id])

_获取编辑器中的控件_

id 为可选，若为空则是获取所有控件

#### setControl([ctl])

_设置编辑器中指定 id 的控件值_

ctl 可以为数组也可以为对象，设置冻结 READONLY：1 为冻结，只读不可操作.

```js
普通控件：
{ID:'',VALUE:''}
如果是select控件类型ctl：
{ID:'',VALUE:'',TEXT:''}
```

#### deleteControl(id)

_删除编辑器中的控件_

id 为必填

#### showControl(id)

_显示编辑器中的控件_

id 为必填

#### hideControl(id)

_隐藏编辑器中的控件_

id 为必填

#### setMode(mode)

_设置设计器/编辑器模式_

mode 可选：DESIGN（设计）、EDITOR（编辑）、READONLY（只读）

#### showSource()

_切换源码模式和正常编辑模式_

切换源码模式和正常编辑模式

#### moveToControlPosition(id)

_定位到指定控件位置_

因为页面可能存在多个 id 相同的控件，所以可以多次调用，定位到需要的位置。id 为控件的 id

#### checkControl(obj)

_校验控件值是否符合要求_

具体使用方法：

```js
sde.checkControl({
	id:"可选，也可不写，如果不填就是校验所有控件！"
	error:function(obj){//错误信息时触发，其中obj：{model:{json对象},msg:"错误信息！"}
		console.log(obj);
	},success:function(){//校验成功时触发
		console.log('success!!!');
	}
},false/true);//默认为false，如果为true表示校验所有控件，如果为false表示发现不符合规则的控件值即停止往下检查。为true且发现同时有多个控件不符合要求时 error会被触发多次请同时更新dialogs/text.html文件！
```

#### unCheckControl()

_去除执行[checkControl](#checkControl-obj)时发现错误值加的背景色，否则第二次加载模板时该错误背景色仍然会存在_

## toolbar-工具栏

toolbar 中的控件基本已全部实现。部分功能后续将持续完善。

工具栏详细配置如下：

```js
{
  "sde-toolbar-file": "file",
  "sde-toolbar-editor": [
    "history",
    "clipboard",
    "fonts",
    "paragraphs",
    "styles"
  ],
  "sde-toolbar-insert": [
    "horizontal",
    "spechars",
    "link",
    {
      img: [
        "insertimage",
        "simpleupload",
        "snapscreen",
        "emotion",
        "sdescrawl"
      ]
    },
    "map",
    "code",
    "table",
    "formula",
    "comment"
  ],
  "sde-toolbar-tables": ["table", "blockmergecells", "alignmergecells"],
  "sde-toolbar-views": ["directory", "showcomment", "preview"],
  "sde-toolbar-tools": ["drafts", "print", "searchreplace", "wordcount"],
  "sde-toolbar-records": ["sdetemplate", "sdecontrols"]
}
```

可根据自身需要调整实现顺序。

#### 局部扩展

该扩展是对于特定 sde 实例，新版中增加了对 sde 多实例支持，这点尤其对 SPA 单页面应用程序尤为重要。V3 版本已全面支持单页面多实例，实例如下：

```js
var toolbarext = [
  {
    name: 'sde-toolbar-test',
    title: '扩展控件',
    init: function(option) {
      var div = document.createElement('div');
      div.className = 'tab-content-item';
      div.setAttribute('id', 'sde-toolbar-test');
      var btn1 = document.createElement('div');
      btn1.className = 'tab-content-item-panel';
      btn1.innerHTML =
        ' <div class="tab-content-item-panel-label">链接</div>' +
        '<div class="tab-content-item-panel-content">' +
        '<div style="float:left;">' +
        '<div class="tab-content-item-panel-content-control" onclick="window.location.href = \'http://www.baidu.com/\';" title="百度">' +
        '<div class="sde-icon sde-icon-emrdesign" style="width: 64px;height: 32px;"></div>' +
        '<div style="text-align: center;">百度1</div>' +
        ' </div>' +
        '</div>' +
        '</div>';
      div.appendChild(btn1);
      return div;
    },
  },
];
var sde = new SDE({
  id: 'myEditor',
  title: '', //自定义title
  footer: '',
  toolbars: {
    'sde-toolbar-records': ['sdetemplate', 'sdecontrols'],
    'sde-toolbar-editor': ['history', 'clipboard', 'fonts', 'paragraphs'],
  },
  toolbar_plugins: toolbarext, //给该实例扩展的toolbar
});
```

#### 全局扩展

该方法会扩展所有 SDE 实例中的 toolbar。

```js
window.SDE_CONFIG.TOOLBAR_PLUGINS = [
  {
    name: 'sde-toolbar-test2',
    title: '文件3',
    init: function(option) {
      var div = document.createElement('div');
      div.className = 'tab-content-item';
      div.setAttribute('id', 'sde-toolbar-test2');
      var btn1 = document.createElement('div');
      btn1.className = 'tab-content-item-panel';
      btn1.innerHTML =
        ' <div class="tab-content-item-panel-label">链接</div>' +
        '<div class="tab-content-item-panel-content">' +
        '<div style="float:left;">' +
        '<div class="tab-content-item-panel-content-control"  title="百度">' +
        '<div class="sde-icon sde-icon-emrdesign" style="width: 64px;height: 32px;"></div>' +
        '<div style="text-align: center;">百度3</div>' +
        ' </div>' +
        '</div>' +
        '</div>';
      div.appendChild(btn1);
      var self = this;
      div.addEventListener('click', function() {
        console.log(self);
      });
      return div;
    },
  },
];
//以下实例均会有相应的toolbar扩展
var sde = new SDE({
  id: 'myEditor',
  title: '', //自定义title
  footer: '',
  toolbars: {
    //这里的顺序决定了toolbar中的顺序
    'sde-toolbar-records': ['sdetemplate', 'sdecontrols'],
    'sde-toolbar-editor': ['history', 'clipboard', 'fonts', 'paragraphs'],
  },
});
```

#### 新增[表格-表格样式-设置样式]

目前提供清楚样式、隐藏表格线、实现、虚线等功能，详细配置如下：

```js
// sde.config.js文件
window.SDE_CONFIG = {
  TABLE_STYLES: [
    { name: 'sde-tb-solid', title: '实线', label: '实线1' },
    { name: 'sde-tb-dotted', title: '虚线' },
  ], // 默认提供两种
};
```

另外，请仔细阅读 **sde.config.js** 文件，该配置相比 V2 版本减少、替换了一些内容。

## control-控件

#### title 标题控件

特点是只有在设计模式下为可编辑状态，否则均为只读状态。注意：

> 1.  建议 dom 元素使用 span，也可以采用其他元素，只需保证 **_class="sde-title"_** 即可；
> 2.  如果在表格中的 td 里插入标题控件，则会以 td 节点为控件元素；
> 3.  标题控件要求单行。

参考设置：

```html
//可以不是span，允许有多个相同的标题控件
<span class="sde-title" id="" sde-model='配置'></span>
```

可通过 sde 中的 sde.getTitleControl([id])来获取元素，注意，考虑同一个标题控件可以会在模板中出现多次，故这里返回的是一个数组。

#### text 单行文本

该控件中只能输入单行文件，且不支持嵌套其他控件。

默认对 **VERIFYTYPE:int** 类型的单行文本控件会强制限制只允许输入数字、.等数值，强制不能输入 abc 等非数值字符。

单行文本控件中的 VERIFYTYPE 对象为校验属性，推荐自定义正则表达式来做单行文件控件中的值做校验，校验时需配合 **sde.checkControl()** 方法一起使用。

具体格式如下：

```html
<span id="age1" title="年龄" sde-model="{'ID':'age1','TYPE':'text','NAME':'年龄','TAG':'','DESCNAME':'年龄','VERIFYTYPE':'int','VALUE':'','REQUIRED':0,'READONLY':0,'COLOR':'000000'}" contenteditable="false" class="sde-bg">
	<span class="sde-left" style="color:#0000FF" contenteditable="false">[</span>
	<span title="年龄" style="color:#000000;" class="sde-value" contenteditable="true">年龄</span>
	<span style="color:#0000FF" contenteditable="false" class="sde-right">]</span>
</span>
```

#### textarea 多行文本

该控件会占用一整行，允许输入回车，但不支持嵌套其他控件。

具体格式如下：

```html
<div id="textarea1" title="多行文本框"
sde-model="{'ID':'textarea1','TYPE':'textarea','NAME':'多行test','DESCNAME':'多行文本框','VALUE':''}" contenteditable="false" class="sde-ctrl-textarea sde-bg">
	<div title="多行文本框" class="sde-value" contenteditable="true">多行文本框</div>
</div>
```

#### date 日期控件

日期控件，可选四种格式：

1.  yyyy-MM-dd 格式，对应值：Y-m-d
2.  yyyy 年 MM 月 dd 日 格式，对应值：Y 年 m 月 d 日
3.  yyyy-MM-dd hh:mm:ss 格式，对应值：Y-m-d H:i:S
4.  yyyy 年 MM 月 dd 日 hh:mm:ss 格式，对应值：Y 年 m 月 d 日 H:i:S

具体格式如下：

```html
<span id="recordTime" title="记录时间" sde-model="{'ID':'recordTime','TYPE':'date','NAME':'记录时间','TAG':'','DESCNAME':'记录时间','MAX':'','MIN':'','FORMAT':'Y-m-d H:i:S','VALUE':'2017-05-18 00:00:00','REQUIRED':0,'READONLY':0,'COLOR':'8F83FF'}" contenteditable="false" class="sde-bg">
	<span class="sde-left" style="color:#0000FF" contenteditable="false">[</span>
	<span title="记录时间" style="color:#8F83FF;" class="sde-value" contenteditable="false">2017-05-18 00:00:00</span>
	<span style="color:#0000FF" contenteditable="false" class="sde-right">]</span>
</span>
```

#### select 下拉单选控件

下拉选项控件可以绑定异步数据源。如果 REMOTEURL 不为空，则优先使用异步数据源。为空则使用 BINDINGDATA 内置数据源。

具体格式如下：

```html
<span id="patientNation" title="民族" sde-model="{'ID':'patientNation','TYPE':'select','NAME':'民族','TAG':'','DESCNAME':'民族','REQUIRED':0,'FREEINPUT':0,'COLOR':'000000','VALUE':'汉族','TEXT':'汉族','REMOTEURL':'','BINDINGDATA':[{'VALUE':'汉族','TEXT':'汉族','SELECTED':1},{'VALUE':'苗族','TEXT':'苗族','SELECTED':0},{'VALUE':'回族','TEXT':'回族','SELECTED':0},{'VALUE':'蒙古族','TEXT':'蒙古族','SELECTED':0}]}" contenteditable="false" class="sde-bg">
	<span class="sde-left" style="color:#0000FF" contenteditable="false">[</span>
	<span title="民族" style="color:#000000;" class="sde-value" contenteditable="false">汉族</span>
	<span style="color:#0000FF" contenteditable="false" class="sde-right">]</span>
</span>
```

#### checkbox 复选框

复选框同样支持绑定异步数据源。

具体格式如下：

```html
<span id="jc" title="进餐" sde-model="{'ID':'jc','TYPE':'checkbox','NAME':'进餐','TAG':'','DESCNAME':'进餐','COLOR':'2821FF','VALUE':[{'VALUE':'需要帮助或较长时间才能完成','TEXT':'需要帮助或较长时间才能完成（5分）'}],'REMOTEURL':'','BINDINGDATA':[{'TEXT':'事物放在盘子上，在正常时间内完成就餐（10分）','VALUE':'事物放在盘子上，在正常时间内完成就餐','CHECKED':0},{'TEXT':'需要帮助或较长时间才能完成（5分）','VALUE':'需要帮助或较长时间才能完成','CHECKED':0}]}" contenteditable="false" class="sde-bg">
	<span class="sde-left" style="color:#0000FF" contenteditable="false">[</span>
	<span title="进餐" style="color:#2821FF;" class="sde-value" contenteditable="false">
		<label>
			<input type="checkbox" value="事物放在盘子上，在正常时间内完成就餐" text="事物放在盘子上，在正常时间内完成就餐（10分）">事物放在盘子上，在正常时间内完成就餐（10分）
		</label>
		<label>
			<input type="checkbox" value="需要帮助或较长时间才能完成" text="需要帮助或较长时间才能完成（5分）" checked="checked">&#8203;需要帮助或较长时间才能完成（5分）
		</label>
	</span>
	<span style="color:#0000FF" contenteditable="false" class="sde-right">]</span>
</span>
```

#### radio 单选框

单选框。可自定义单选框样式。

具体格式如下：

```html
<span 555="" id="dd3" title="测试radio" sde-model="{'ID':'dd3','TYPE':'radio','NAME':'测试radio','TAG':'','DESCNAME':'测试radio','COLOR':'2821FF','VALUE':" class="sde-bg" contenteditable="false">
	<span class="sde-left" contenteditable="false">[</span>
		<span class="sde-value">
			<label>
				<input type="radio" name="radio_dd3" value="444" text="事物放在盘子上，在正常时间内完成就餐（10分）">事物放在盘子上，在正常时间内完成就餐（10分）
			</label>
			<label>
				<input type="radio" name="radio_dd3" value="555" text="需要帮助或较长时间才能完成（5分）">需要帮助或较长时间才能完成（5分）
			</label>
		</span>
	<span class="sde-right" contenteditable="false">]</span>
</span>
```

#### area 区域控件

area 区域控件（一下简称区域）可以在模板中特定的区域存在，区域中可包含控件、图片、表格等多种元素。

html 结构如下：

```
<div class="sde-area sde-area-mode-normal" [id="可选"] [sde-model="{可自由设置}"] mode="NORMAL"  [title="区域title"] contenteditable="false">
    <div contenteditable="true">
      具体内容
    </div>
</div>
```

可通过 sde 实例中的 sde.[getArea([id])](<#getArea([id])>)获取。mode 为初始化当前区域时的状态。

## event-事件

未来会补充控件等被触发的事件，可自由绑定。应用场景：控件多级联动等效果等

**敬请期待！**

## 扩展组件

鉴于部分弹出效果可能不符合项目的样式要求，现提供部分扩展组件，扩展方式如下：

```js
window.SDE_EXT_COMPONENTS = {
  //替换 confirm 方法，所有调用confirm地方，均会改成回调该方法
  confirm: function(msg, success, error) {
    //默认使用浏览器自带confirm，此处可改为自己的方法
    if (confirm(msg)) {
      success(); //成功时回调
    } else {
      error(); //失败时回调
    }
  },
  alert: function(msg, success) {
    //默认使用浏览器自带alert，此处可改为自己的方法
    alert(msg);
    success();
  },
};
```
