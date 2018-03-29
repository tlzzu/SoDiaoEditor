## V3 版本：

## V2 版本：

#### [2017-03-30]首次更新

1.  新增以下 toolbar：

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

2.  设计器中新增 SED 对象，并增加以下接口：
3.  修复事件兼容性（暂不支持 IE8 及其以下的浏览器，后续会有解决方案）
4.  增加 toolbar 可配置性。
5.  解决上一个版本中的 bug。
6.  等

#### [2017-07-17]设计器中对涂鸦双向编辑

```
1. 在设计器中对涂鸦双向编辑，可对之前的涂鸦进行二次修改。
```

#### [2017-07-03]编辑器增加移动化支持

对编辑器中的控件增加移动化支持，对移动设备访问编辑，无需配置，自动启用移动化适配。[可在移动端访问此页面](http://editor.sodiao.org/example/design-editor.html)

#### [2017-05-14]增加日期控件、复选框控件

```
1. 增加日期控件。可以设置最大、最小范围。
2. 增加复选框控件。
```

#### [2017-04-28]增加表格中的对齐方向

```
表格中字体的对齐方向可在 表格-》对齐方向 中设置
```

#### [2017-04-26]增加自定义 toolbar 标题&支持对字体的操作

```
1. 增加了对自定义toolbar标题的支持，支持多语言，参考[设计模式--电子病历设计器(扩展toolbar)](http://editor.sodiao.org/example/design-design.html)，只需在html中引用/lang/sde-zh-cn.js文件即可，可以更改文件中显示的内容值，达到自定义toolbar标题的功能
2. 原来对控件字体格式化时会损坏控件，现该bug已经修复。
```

#### [2017-04-21]编辑器支持设计模式

```
可在 [设计模式--电子病历编辑器]中选中文字，即可出现编辑下过，如果需要这个效果，需设置初始化的mode为DESIGN
```

#### [2017-09-05]新增 moveToControlPosition 方法，定位到指定的控件

```
因为页面可能存在多个id相同的控件，所以可以多次调用，定位到需要的位置。
```

#### [2017-09-26]修改原有的 toolbar 扩展方法，支持在原有 toolbar 的 tab 中继续新增控件

```
修改原有的toolbar扩展方法，支持在原有toolbar的tab中继续新增控件，注意更新sde.config.js文件，新增 window.SDE_CONFIG.TOOLBAR_PLUGINS 对象，name值可参见下文中的【toolbar完整配置项】。具体可以参见[编辑模式--电子病历设计器中的源码](http://editor.sodiao.org/example/editor-design.html))
```

#### [2017-10-12]实现 checkControl 方法的正则校验

```
sde.checkControl({
	id:"可选，如果不填就是校验所有控件！"
	error:function(obj){//错误信息时触发，其中obj：{model:{json对象},msg:"错误信息！"}
		console.log(obj);
	},success:function(){//校验成功时触发
		console.log('success!!!');
	}
},false/true);//默认为false，如果为true表示校验所有控件，如果为false表示发现不符合规则的控件值即停止往下检查。为true且发现同时有多个控件不符合要求时 error会被触发多次
请同时更新dialogs/text.html文件！
```

#### [2017-10-23]新增 showControl、hideControl、deleteControl 接口

```
分别为显示、隐藏、删除控件接口
```
