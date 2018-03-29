# SoDiaoEditor.v3

简单闲聊两句……

记得刚参加工作那会儿，去医院实施，信息科不远处就是手术室，门口每天都挤满了人，他们中大多数都是等待手术结果的患者家属，有的还会把折叠床带来，应该是陪床有段时间了。有时路过，还会听到一群人在手术室门口哭，那是我毕业前最接近死亡的一段时间，当时就想着有天能为医疗行业做点什么。

后来有几次接触到医院自研的电子病历，编辑器那叫一个丑啊，而且设计模板的方式也很奇葩，但当时咱也是个初入医疗行业的菜鸟，不敢瞎逼逼，何况也给不出更好的方案。不过想做一款更好的电子病历编辑器的想法就这么萌生了。

再后来 16 年因为个人+公司的缘故，迷茫了一段时间。当时想着抽空把编辑器做出来，了结了这件事，按照以往怀胎十月也该生了，何况我这都一年多了，然后就利用闲时初步写了一款编辑器（就是现在的 SoDiaoEditor 啦--以下简称 SDE），还取了一个贼恶心的名字，为了恶心到底，我还买了个更恶心的域名，豁出去了。。。

好啦，恍恍惚惚，SDE 从建立到现在也有 18 个月了，中间提交了上百次的 commit，也经历了多个小伙伴们的二级&三级&云电子病历项目的上线，加上中间遇到的各种 bug，，，一路走来，感谢各位小伙伴的信任、理解与支持。也算是为医疗行业尽了一份力。共勉！

[愿景](#愿景)

[交流](#交流)

[更新](#更新)

[Vue 中使用](#Vue中使用)

[效果展示](#效果展示)

[在线预览](#在线预览)

[目录结构](#目录结构)

[使用说明](#使用说明)

[API 文档](#API文档)

[需求&bug 提交](#需求bug提交)

[打赏](#打赏)

[展望](#展望)

## 愿景

1.  成为电子病历编辑器的通用标准；
2.  愿为医疗行业做点力所能及的事；
3.  愿各位码农少加班；

## 交流

QQ 群：**370844065** （已有近百家医疗企业开发人员，欢迎进群探讨）

## 更新记录

[查看详情](document/updatelist.md)

## Vue 中使用

详见另一个 github 项目：[SoDiaoEditor-Vue](https://github.com/tlzzu/SoDiaoEditor-vue)

**待完善！**

## 效果展示

#### V3 版本：

//todo v3 版本 gif

## [在线预览](http://editor.sodiao.org/example/index.html)

SDE 分为两大编辑器：

**截止到目前的旧模式**

* _设计器_
  * _设计模式-DESIGN_
  * _编辑模式-EDITOR_
  * _只读模式-READONLY_
* _编辑器_
  * _设计模式-DESIGN（可编辑控件及病历内容）_
  * _编辑模式-EDITOR（只允许操作非只读控件）_
  * _只读模式-READONLY（不可编辑）_

**新模式将在 4 月底实现**

因为时间关系，SDE 的模式调整将于 4 月底完成，届时各位的使用将不受影响，只需根据自己的选择适当调整即可。

* **设计器**
  * **设计模式-DESIGN**
    * 建议设计电子病历模板时使用该模式。可自由添加模板，设计控件。
  * **编辑模式-EDITOR**
    * 建议操作人员（医生、护士、检查科室等）使用该模式。编辑模板，不可添加/删除控件。
  * **输入模式-INPUT**
    * 建议操作人员使用该模式。该模式只允许修改非只读控件的值。
  * **只读模式-READONLY**
    * 建议在部分查看、调阅电子病历的场景下使用。该模式下模板不可编辑。
* **编辑器**
  * **编辑模式-EDITOR**
    * 建议给医生使用，或移动版使用。该模式下可编辑控件及病历内容。
  * **输入模式-INPUT**
    * 建议给医生使用。只允许操作非只读控件。
  * **只读模式-READONLY**
    * 建议在部分查看、调阅电子病历的场景下使用。该模式下不可编辑。

## 目录结构

```shell
data                    //模拟异步请求的数据，正式项目中可忽略
dialogs                 //扩展百度ueditor的dialogs
lang                 	//toolbar多语言支持，可自定义toolbar标题
dist
    js
        sde.design.js   //SoDiaoEditor设计器核心js
        sde.editor.js   //SoDiaoEditor编辑器核心js
example                 //一些demo
ueditor                 //因ue存在部分bug，请使用经过本人调整过的版本。
sde.config.js           //配置文件
```

## 使用说明

**设计器：**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SoDiaoEditor.v3 电子病历设计器</title>
    <!-- 注意以下各脚本之间的加载顺序！ -->
    <script type="text/javascript" src="sde.config.js"></script>
    <link rel="stylesheet" href="ueditor/themes/default/css/ueditor.css" />
    <script type="text/javascript" src="ueditor/ueditor.all.js"></script>
    <script type="text/javascript" src="ueditor/lang/zh-cn/zh-cn.js"></script>
    <script type="text/javascript" src="lang/sde-zh-cn.js"></script>
    <script type="text/javascript"   src="dist/js/sde.design.js"></script>
</head>
<body>
    <script id="myEditor" type="text/plain" style="width:680px;height:1000px;">
        病历模板/后续调用sde.html设置...
    </script>
    <script type="text/javascript">
        window.onload = function() {
            var sde = new SDE({
                id: "myEditor",
                title: '<div>SoDiaoEditor.v3 电子病历设计器</div>',
                ready:function(){
                    //sde为异步渲染，若想在sde加载完成后 设置html或修改模式等，可在这里触发
                }
            });
        };
    </script>
</body>
</html>
```

**编辑器：**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SoDiaoEditor.v3 电子病历编辑器</title>
    <script type="text/javascript" src="dist/js/sde.editor.js"></script>
</head>
<body>
    <div id="myEditor" style="width:680px;height:1000px;margin:0 auto;">
        病历模板/后续调用sde.html设置...
    </div>
    <script type="text/javascript">
        window.onload = function() {
            var sde = new SDE({
                id: "myEditor"
            });
            //注：在编辑器SDE为同步渲染
        };
    </script>
</body>
</html>
```

[**点击查看更多示例**](document/demo.v3.md)

## API 文档

SDE 尽量保证 **设计器** 与 **编辑器** 接口一致，以降低各位同学的学习成本。

[点击查看详情](document/api.v3.md)

## 需求&bug 提交

1.  可邮件至[dd@sodiao.org](mailto://dd@sodiao.org/)；
2.  可以在 github 中的 Iss 中提交；

## 打赏

![image](data/img/ds.png)

## 展望

18 年的重点在兼容 IE8 上，并努力将功能向三级医院的需求靠拢。

2018，愿与各位一路同行！
