# SDE API

## addListener(types, listener)

给SDE的触发器中绑定事件：
1. **beforerender**：在编辑器渲染控件之前触发；
2. **rendered**：已经渲染好控件对象，但是一些数据还没初始化；
3. **click**：点击编辑器中的编辑区域触发的事件；
4. **ctrlchange**：当前激活的控件发生改变是触发；
5. **valuechange**：控件值发生改变时触发；
6. **contentchange**：编辑器中内容发送改变时触发；
7. **openassistant**：打开小助手时触发（实验功能）；
8. **ready**：编辑器初始化完成后触发；
9. **headerfooteropen**：页眉页脚点击打开时触发；
10. **headerfooterclose**：页眉页脚关闭时触发；
10. **selectionchange**：选中区域发生变化时触发；

使用示例：
```js
var sde=new SDE({options...});
sde.addListener('ready',function(){
  console.log('编辑器初始化完成！');
});
```

## createListener(types, listener)

客户创建自己的触发器，不可与 **addListener** 中的触发器名称相同。

示例：
```js
var sde=new SDE({options...});
sde.createListener('readymyeditor',function(){
  console.log('2');
});
console.log('1');
sde.fireEvent('readymyeditor');//触发自定义触发器
//程序显示结果：
//1
//2
```

## fireEvent(types, args...)

触发特定的触发器。使用方法见 **createListener**

## on(types, listener)

给SDE的触发器中绑定事件，与 **addListener** 的用法和功能一致

## off(types, listener)

移除SDE的触发器中绑定事件。

使用示例：
```js
var sde=new SDE({options...});
var ready=function(){
  console.log('编辑器初始化完成！');
};
sde.addListener('ready',ready);
sde.off('ready',ready);//移除之前绑定的事件
```

## trigger(types, args...)

与 **fireEvent** 功能类似，具体使用，请参照 **fireEvent** 。

**注意**:不建议使用该方法，建议直接使用 **fireEvent** 。

## removeListener(types, listener)

与 **off** 功能一致，使用方法相同。

## destroy()

销毁当前SDE的实例，如果是在vue中使用可以在vue生命周期中的destroyed中使用。

## getDialog(opt) 

获取弹窗对象，使用示例如下：
```js
var dialog =  sde.getDialog({
  title: '测试弹窗',
  name: 'test-dialogs',
  url: 'https://www.baidu.com/',//如果不带有http，则为相对路径比如 'text/index.html'//这个就是文本控件维护
  style: 'width:400px;height:300px',
  buttons: [{
    className: 'edui-okbutton',
    label: '确定',
      onclick: function () {
        dialog.close(true)
      }
    },
    {
    className: 'edui-cancelbutton',
    label: '取消',
      onclick: function () {
        dialog.close(false)
      }
    }
  ]
});
dialog.open();//打开弹窗
```

## insertHTML(html)

在光标处插入html代码片段。

## insertControl(element, [opt])

1. Element element 控件的Element对象
2. Object obj 控件的sde-model值。如果是已经绑定好的控件，opt可不填。

在光标处插入控件。

## html([h])

1. string h 为可选值，不填则为获取模板内容，填入则为设置当前模板内容

获取/设置编辑器内的模板。

## mode([m])

1. string m 要设置的模式值
``` js
1. DESIGN 设计模式；
2. EDITOR 编辑模式；
3. STRICT 严格模式（表单模式）；
4. READONLY 只读模式；
```

获取或设置当前模式

## assistant([m])

实验功能，无需关注。

## getControlById([id])

根据控件id获取具体控件对象。如果id为空，则为获取所有控件。

## getControlByEl(el)

根据模板中的具体控件的Element对象获取SDE控件对象。

## importXML(xml)

1. string xml 需要导入的xml值

导入xml

## exportXML()

导出xml结构，返回string

## downloadXML()

将导出的xml对象下载至本机。

## createCtrl(el, opt)

1. Element el Element对象
2. Object opt 对象的配置属性

创建一个控件，返回为一个具体的控件对象。

## execCommand(cmd,args...)

执行SDE及UE( UE命令请参照[这里](http://ueditor.baidu.com/doc/) )的命令。

## revise([r])

1. boolean r 是否启用修订模式

设置或获取修订模式。

## selectionUnrevise()

取消选中区域中的修订项。主要应用场景是：用户启用修订模式，添加或者删除元素后发现有操作失误，需要取消选中区域中的修订项，将其设置为初始状态。
