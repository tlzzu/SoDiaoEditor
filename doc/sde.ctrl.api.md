# SDE控件 API：

通过sde.getControlByEl或sde.getControlById获取到的控件不再是值，而是具体的对象。

## 控件的通用方法如下：

#### getOpt()

获取该控件的配置属性。每个控件所具有属性略有不同。下面会有详细解释。

#### setOpt(opt)

设置该控件的配置属性

#### getCtrlElement()

获取该控件的顶级Element对象。

#### getValueElement()

获取该控件Value所在的Element对象。

#### getNextElement()

获取该控件的下一个控件。

#### getPreviousElement()

获取该控件的上一个控件。

#### getDesc()

获取控件opt中的desc描述值

#### isNotDel()

控件是否不允许删除，返回true则为不可删除，false为可以删除。

#### isReadonly()

控件是否只读，如果编辑器当前为只读状态的话，该值也为true。

#### isEqual(ctrl)

控件是否相等。

#### isRequired()

控件是否必填。去取的是opt中的required值

#### setBindingData(data)

当控件中的项需要异步加载时，数据加载后需要调用的方法。在控件每次渲染时会取到。

> 本次设计时控件的异步加载的配置项是采用axios组件进行获取，且默认只在编辑器初始化完成后异步请求一次供控件使用。

#### getBindingData()

获取**setBindingData**方法设置的数据。

#### isLoadAsyncData()

获取当前控件异步数据是否已加载完成。

#### refreshData([isforce])

刷新数据（如果是异步渲染叙述，该方法会重新发起异步请求），如果isforce=true则为强制渲染，更新控件的暂时项（主要用于select、checkbox、radio）

#### TYPE_NAME

该值不是 **方法** ，是一个属性，表示控件类型名，具体值可能为：text、select、date、checkbox、radio、section等（随着控件本身的丰富，该属性的可能值也会逐渐增多）

#### getValue()

获取控件值。
> 不同的控件，值具有不同的结构，具体下面会根据控件类型挨个介绍。

#### setValue(val)

设置控件值。
> 不同的控件，值具有不同的结构，具体下面会根据控件类型挨个介绍。

---------------------------------------

## 以下为控件独有方法：

## text 单行文本控件

text配置项（sde-model）如下：
```js
{
    "mode":"EDITOR",//控件状态。EDITOR编辑;READONLY只读
    "notdel":0,//是否不许删除，默认0位可以删除
    "strictverify":0,//是否强制校验（不符合要求既不允许输入），默认为0不强制校验
    "verify":"^[0-9]*$",//验证输入是否符合要求，可自己定义表达式
    "required":0,//是否必填
    "desc":"整数控件",//控件描述值
}
```

text控件结构如下（新建控件必须符合以下结构）：
```html
 text运行时结构：
<span class="sde-ctrl" sde-type="text" sde-right="." id="abc1" sde-model="%7B%22mode%22%3A%22EDITOR%22%2C%22notdel%22%3A0%2C%22strictverify%22%3A0%2C%22verify%22%3A%22%5E%5B0-9%5D*%24%22%2C%22required%22%3A0%2C%22desc%22%3A%22%E6%95%B4%E6%95%B0%E6%8E%A7%E4%BB%B6%22%2C%22remotedata%22%3A%7B%22url%22%3A%22%2Fdata%2Fjson1.json%22%2C%22method%22%3A%22get%22%2C%22data%22%3A%7B%22name%22%3A%22tl%22%7D%7D%7D"
        contenteditable="false">
  <span class="sde-value" sde-left="[" sde-right="]" contenteditable="true" >整数控件</span>
</span>

其中新建控件时必须满足结构：
<span class="sde-ctrl" sde-type="text" sde-right="." id="abc1" contenteditable="false">
  <span class="sde-value" sde-left="[" sde-right="]" contenteditable="true" >整数控件</span>
</span>
其余内容会通过insertControl命令进行创建。理论上不显示你用span还是div来承载控件，但不同控件在页面中的表现形式不同，推荐使用系统默认配置
```
#### getValue()

获取控件值。返回string。

#### setValue(str)

设置控件值。入参为string类型

## select 单/多选控件

select配置项（sde-model）如下：
```js
{
    "mode":"EDITOR",//控件状态。EDITOR编辑;READONLY只读
    "notdel":0,//不许删除
    "strictverify":0,//强制校验
    "required":0,//是否必填
    "multi":0,//是否多选，默认0为单选，1为多选
    "desc":"性别",//描述值
    "bindingdata":[//默认绑定数据。
      {label:'显示值',value:'实际值'}
    ],//bindingdata和remotedata为二选一，如果remotedata存在的话则优先取remotedata值。
    "remotedata":{//sde v4的异步请求采用目前主流的axios，remotedata为发起异步请求时的配置项目
        "url":"/data/sex.json",//这里建议配置初始化SDE时options中的ctrl_remote_handle一起用，因为存在你设置模板跟你打开模板时当前路径不一致的情况，导致如果用相对路径会出错的情况（如果用绝对路径也会存在换一家医院实施所有模板都需要改的情况）。故所有控件中的异步请求数据在发起请求前都会调用options.ctrl_remote_handle方法进行处理（也可以加一些权限控制）
        "method":"get",
        "headers":{
        },
        "data":{
        }
    }
}
```
如果发生异步请求，返回的数据格式必须为：
```js
{
    "data":[//考虑到一些元数据接口可能会给iOS等设备使用，而iOS无法解析非标准json数据。所以要求返回数据不能直接为数组。必须为对象。
        {
            "label":"感觉很好",
            "value":1
        },
        {
            "label":"感觉一般",
            "value":2
        }
    ]
}
```

select控件结构如下（新建控件必须符合以下结构）：
```html
section运行时结构：
<div class="sde-ctrl sde-section" contenteditable="false" sde-type="section" id="section1" sde-model="%7B%22mode%22%3A%22EDITOR%22%2C%22originalmode%22%3A%22EDITOR%22%7D">
  <p contenteditable="true" class="sde-value">
    内容
  </p>
</div>
其中新建控件时必须满足结构：
<div class="sde-ctrl sde-section" contenteditable="false" sde-type="section" id="section1">
  <p contenteditable="true" class="sde-value">
    内容
  </p>
</div>
其余内容会通过insertControl命令进行创建。
注意：此时sde-value必须是P标签。
```

#### setValue(val)

设置select控件的值。val必须符合以下要求：
```js
[
    {
        "label":"感觉很好",
        "value":1
    },
    {
        "label":"感觉一般",
        "value":2
    }
]
```

#### getValue()

获取当前值。返回值格式为：
```js
[
    {
        "label":"感觉很好",
        "value":1
    },
    {
        "label":"感觉一般",
        "value":2
    }
]
```
#### isMulti()

是否为多选，true为是，false为单选

## section 区域控件

select配置项（sde-model）如下：
```js
{
    "mode":"EDITOR",//当前模式
    "originalmode":"EDITOR"//原始模式
}//区域控件有时会随着当前业务的要求而进行模式的变更，在控件被渲染时默认将mode与originalmode进行同步。originalmode的存在也是为了方便区域控件模式重置
```
section控件结构如下（新建控件必须符合以下结构）：
```html
section运行时结构：
<div class="sde-ctrl sde-section" contenteditable="false" sde-type="section" id="section1" sde-model="%7B%22mode%22%3A%22EDITOR%22%2C%22originalmode%22%3A%22EDITOR%22%7D">
  <p contenteditable="true" class="sde-value">
    内容
  </p>
</div>
其中新建控件时必须满足结构：
<div class="sde-ctrl sde-section" contenteditable="false" sde-type="section" id="section1">
  <p contenteditable="true" class="sde-value">
    内容
  </p>
</div>
其余内容会通过insertControl命令进行创建。
注意：此时sde-value必须是P标签。
```

#### setValue(val)

设置区域控件的值。val必须为html内容。具体为sde-value中的innerHTML。

#### getValue()

获取区域控件内容，该值为sde-value中的innerHTML。

#### getTextValue()

获取区域控件中的文本内容。该值为sde-value中的innerText。

#### html([h])

获取/设置区域控件中的html值，h为可选值，为空则为获取，不为空则为设置。功能与setValue/getValue类似。

#### mode(m, isforever = false) 

设置【当前】区域的模式。isforever为强制同步，如果为true会将originalmode与mode同步。可选模式一共有以下几种：
```js
1. EDITOR 正常
2. READONLY 只读
3. UNVISIBLE 不可见（保留位置，但不显示内容项）
4. HIDE 隐藏
```

#### reset()

模式重置。该方法会将originalmode模式取出，并将其设置为当前控件的模式。

####  getControl([id])

获取区域中的控件。如果id为空，则为获取当前区域中的所有控件。

## radio 单选控件

单选控件。sde-model要求：
```js
{
    "mode":"EDITOR",//当前模式
    "notdel":0,//不许删除
    "strictverify":0,//强制校验
    "desc":"感觉",//描述
    "bindingdata":[//绑定数据
        {
            "label":"感觉很好",
            "value":1
        },
        {
            "label":"感觉一般",
            "value":2
        }
    ],
     "remotedata":{//sde v4的异步请求采用目前主流的axios，remotedata为发起异步请求时的配置项目
        "url":"/data/sex.json",//这里建议配置初始化SDE时options中的ctrl_remote_handle一起用，因为存在你设置模板跟你打开模板时当前路径不一致的情况，导致如果用相对路径会出错的情况（如果用绝对路径也会存在换一家医院实施所有模板都需要改的情况）。故所有控件中的异步请求数据在发起请求前都会调用options.ctrl_remote_handle方法进行处理（也可以加一些权限控制）
        "method":"get",
        "headers":{
        },
        "data":{
        }
    }
}
```
单选控件结构要求如下：
```html
 radio运行时结构：
<span id="gj" sde-right="." sde-type="radio" class="sde-ctrl" sde-model="%7B%22mode%22%3A%22EDITOR%22%2C%22notdel%22%3A0%2C%22strictverify%22%3A0%2C%22required%22%3A0%2C%22multi%22%3A1%2C%22desc%22%3A%22%E6%84%9F%E8%A7%89%22%2C%22bindingdata%22%3A%5B%7B%20%22label%22%3A%20%22%E6%84%9F%E8%A7%89%E5%BE%88%E5%A5%BD%22%2C%20%22value%22%3A%201%20%7D%2C%20%7B%20%22label%22%3A%20%22%E6%84%9F%E8%A7%89%E4%B8%80%E8%88%AC%22%2C%20%22value%22%3A%202%20%7D%5D%7D"
          bindingdata='[{ "label": "感觉很好", "value": 1 }, { "label": "感觉一般", "value": 2 }]' contenteditable="false">
  <span contenteditable="true" sde-left="[" sde-right="]"  class="sde-value">
    <label contenteditable="false"><input type="radio"  name="radio_33"  value='{ "label": "感觉很好", "value": 1 }'>感觉很好</label>
    <label contenteditable="false"><input type="radio" name="radio_33" value='{ "label": "感觉一般", "value": 2 }'>感觉一般</label>
  </span>
</span>
其中新建控件时必须满足结构：
<span id="gj" sde-right="." sde-type="radio" class="sde-ctrl"  contenteditable="false">
  <span contenteditable="true" sde-left="[" sde-right="]"  class="sde-value">
  </span>
</span>
其余内容会通过insertControl命令进行创建
```
#### setValue(val)

设置选中值。因为是单选，所以val是一个对象不是数组，这里请注意。

#### getValue()

获取选中的值。

## checkbox 多选控件

sde-model要求如下：
```js
{
    "mode":"EDITOR",//当前模式
    "notdel":0,//不许删除
    "strictverify":0,//强制校验
    "desc":"感觉",//描述
    "bindingdata":[//绑定数据
        {
            "label":"感觉很好",
            "value":1
        },
        {
            "label":"感觉一般",
            "value":2
        }
    ],
     "remotedata":{//sde v4的异步请求采用目前主流的axios，remotedata为发起异步请求时的配置项目
        "url":"/data/sex.json",//这里建议配置初始化SDE时options中的ctrl_remote_handle一起用，因为存在你设置模板跟你打开模板时当前路径不一致的情况，导致如果用相对路径会出错的情况（如果用绝对路径也会存在换一家医院实施所有模板都需要改的情况）。故所有控件中的异步请求数据在发起请求前都会调用options.ctrl_remote_handle方法进行处理（也可以加一些权限控制）
        "method":"get",
        "headers":{
        },
        "data":{
        }
    }
}
```
控件必须满足结构要求如下：
``` html
checkbox运行时结构：
<span id="gj" sde-right="." sde-type="checkbox" class="sde-ctrl" sde-model="%7B%22mode%22%3A%22EDITOR%22%2C%22notdel%22%3A0%2C%22strictverify%22%3A0%2C%22required%22%3A0%2C%22multi%22%3A1%2C%22desc%22%3A%22%E6%84%9F%E8%A7%89%22%2C%22bindingdata%22%3A%5B%7B%20%22label%22%3A%20%22%E6%84%9F%E8%A7%89%E5%BE%88%E5%A5%BD%22%2C%20%22value%22%3A%201%20%7D%2C%20%7B%20%22label%22%3A%20%22%E6%84%9F%E8%A7%89%E4%B8%80%E8%88%AC%22%2C%20%22value%22%3A%202%20%7D%5D%7D"
    bindingdata='[{ "label": "感觉很好", "value": 1 }, { "label": "感觉一般", "value": 2 }]' contenteditable="false">
  <span contenteditable="true" sde-left="[" sde-right="]"  class="sde-value">
    <label contenteditable="false"><input type="checkbox" value='{ "label": "感觉很好", "value": 1 }'>感觉很好</label>
    <label contenteditable="false"><input type="checkbox" value='{ "label": "感觉一般", "value": 2 }'>感觉一般</label>
  </span>
</span>
其中新建控件时必须满足结构：
<span id="gj" sde-right="." sde-type="checkbox" class="sde-ctrl"  contenteditable="false">
  <span contenteditable="true" sde-left="[" sde-right="]"  class="sde-value">
  </span>
</span>
其余内容会通过insertControl命令进行创建
```
#### setValue(val)

设置选中值。因为是多选，所以val是一个数组而不是对象，这里请注意。

#### getValue()

获取选中的值。

## label 控件

标签控件，该控件只有在DESIGN模式下是可编辑，除此之外均为不可编辑。


控件必须满足结构如下：
```html
label结构：
<span id="label1" sde-type="label" class="sde-ctrl sde-label" title="[可选]">
  label内容
</span>
其中：id，class 为必须项，class可以扩展，有自定义样式。
```

#### setValue(val)

设置标签显示内容，替换的是sde-ctrl元素的innerHTML值。

#### getValue()

获取标签控件中的sde-ctrl里的innerHTML值。

## date 日期控件

sde-model必须满足的格式要求：
```js
{
    "mode":"EDITOR",//当前模式
    "notdel":0,//是否可以删除
    "strictverify":0,//是否强制校验
    "required":0,//是否必填
    "desc":"",//描述
    "defvalue":"2018-5-7 16:08:09",//默认值
    "format":"{yyyy}-{MM}-{dd} {hh}:{mm}:{ss}",//格式化要求。必须以大括号包裹。
    "min":"",//最小日期
    "max":""//最大日期
}
```
日期控件必须满足的结构：
```html
date控件运行时结构如下：
<span class="sde-ctrl" id="kssj" sde-type="date" sde-model="%7B%22mode%22%3A%22EDITOR%22%2C%22notdel%22%3A0%2C%22strictverify%22%3A0%2C%22required%22%3A0%2C%22desc%22%3A%22%22%2C%22defvalue%22%3A%222018-5-7%2016%3A08%3A09%22%2C%22format%22%3A%22%7Byyyy%7D-%7BMM%7D-%7Bdd%7D%20%7Bhh%7D%3A%7Bmm%7D%3A%7Bss%7D%22%2C%22min%22%3A%22%22%2C%22max%22%3A%22%22%7D">
  <span class="sde-value" contenteditable="true" sde-left="[" sde-right="]">开始时间</span>
</span>
其中新建控件时必须满足结构：
<span class="sde-ctrl" id="kssj" sde-type="date" >
  <span class="sde-value" contenteditable="true" sde-left="[" sde-right="]">描述内容</span>
</span>
```
#### setValue(val)

设置日期控件的具体时间。

#### getValue()

获取日期控件的时间。