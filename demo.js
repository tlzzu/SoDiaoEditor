window.onload = function() {
  var sde = window.sde = new SDE({
    el: document.querySelector('#sde'),
    iframe_css_src: null, //string/Array数组 扩展css
    iframe_js_src: 'demoforeditor.js',
    page_start_num: 6, //页面起始页//默认为1
    ctrl_remote_handle: function(data) {
      //这里可以处理url，对url进行再加工。如果此时执行 this.isLoadAsyncData(true)，则表示代替sde自带的异步请求方法，
      //场景1，二次处理发起异步请求前的参数设置，比如因模板打开路径不同，导致的控件中的url路径不对的问题；
      console.log(data);
      data.url = data.url + '?' + new Date().getTime();
      return data;
      //场景2，在该方法中执行异步请求。并量数据赋值
      // this.isLoadAsyncData(true);
      // var ctrl = this;
      // ajax(function (data) {
      //   //这里是请求成功
      //   ctrl.setBindingData(data.data);//这里是去除data的数据，一般为数组。
      //   if (ctrl.render) {
      //     ctrl.render(); //重新渲染
      //   }
      // }, function (err) {
      //   //这里是失败
      // });
    },
    default_open_toolbar: 'sde-toolbar-tools', //默认打开的toolbar的集合，如果不填，默认使用第一个集合
  });
  var sde1 = new SDE({
    el: document.querySelector('#sde1'),
    iframe_js_src: 'demoforeditor.js',
  });
  sde.addListener('ready', function() {
    // sde.execCommand('seniorprint', {
    //   resettingPrint(opt, viewDom) {}, //默认重置（包括首次设置）打印页面前触发。优先级高于render系列函数
    //   resetedPrint(opt, viewDom) {}, //默认重置（包括首次设置）打印页面后触发。优先级高于render系列函数
    //   renderHeader(index, page) {
    //     return `<div style="line-height:55px;background:red;border:1px solid yellow;">这里是header</div>`;
    //   }, //返回要渲染的页眉。默认从零开始
    //   renderFooter(index, page) {
    //     return `<div style="line-height:35px;background:blue;border:1px solid green;"><center>第${index+1}页<center></div>`;
    //   }, //返回要渲染的页脚。默认从零开始
    //   renderedHeader(index, count, page, header) {}, //渲染后
    //   renderedFooter(index, count, page, footer) {}, //渲染后
    //   scale: 2, //放大比例，默认2倍，越大越清晰，相应的渲染也更慢
    //   autoPrint: true, //是否默认打开pdfviewer即执行打印操作
    //   isDownload: false, //是否下载，如果为true，则不再打开pdfviewer页面
    //   fileName: 'SDE 测试打印', //如果isDownload=true时的pdf文件下载名称
    //   pageMode: 'A4', //页面模式:A3|A4|A5 ……
    //   width: 794, //以下默认值
    //   height: 1123,
    //   top: 100,
    //   right: 100,
    //   bottom: 100,
    //   left: 100,
    //   printMode: 'normal', //打印模式：normal|neat|revise|comment
    //   ctrlMode: 'normal', //控件模式：normal|hidden|remove
    //   printDirection: 'vertical', //打印方向 vertical|horizontal
    //   printCssUrl: null, //打印的样式表，可以是string，也可以是array
    //   printJsUrl: null, //打印的js，可以是string，也可以是array
    // });
    sde.seniorPrint({
      resettingPrint(opt, viewDom) {}, //默认重置（包括首次设置）打印页面前触发。优先级高于render系列函数
      resetedPrint(opt, viewDom) {}, //默认重置（包括首次设置）打印页面后触发。优先级高于render系列函数
      renderHeader(index, page) {
        return `<div style="line-height:55px;background:red;border:1px solid yellow;">这里是header</div>`;
      }, //返回要渲染的页眉。默认从零开始
      renderFooter(index, page) {
        return `<div style="line-height:35px;background:blue;border:1px solid green;"><center>第${index + 1}页<center></div>`;
      }, //返回要渲染的页脚。默认从零开始
      renderedHeader(index, count, page, header) {}, //渲染后
      renderedFooter(index, count, page, footer) {}, //渲染后
      scale: 2, //放大比例，默认2倍，越大越清晰，相应的渲染也更慢
      autoPrint: true, //是否默认打开pdfviewer即执行打印操作
      isDownload: false, //是否下载，如果为true，则不再打开pdfviewer页面
      fileName: 'SDE 测试打印', //如果isDownload=true时的pdf文件下载名称
      pageMode: 'A4', //页面模式:A3|A4|A5 ……
      width: 794, //以下默认值
      height: 1123,
      top: 100,
      right: 100,
      bottom: 100,
      left: 100,
      printMode: 'normal', //打印模式：normal|neat|revise|comment
      ctrlMode: 'normal', //控件模式：normal|hidden|remove
      printDirection: 'vertical', //打印方向 vertical|horizontal
      printCssUrl: null, //打印的样式表，可以是string，也可以是array
      printJsUrl: null, //打印的js，可以是string，也可以是array
    });
    //sde.mode('EDITOR'); //执行到这一行时 sde对象才加载成功！
    console.log(this);
    console.log('design ready ok!');
  });
  sde.addListener('headerfooteropen', function() {
    console.log(this);
    console.log('design headerfooteropen ok!');
  });

  sde.addListener('beforerender', function() {
    //debugger;
    console.log('beforerender ok!');
  });
  sde.addListener('rendered', function() {
    console.log(arguments);
    //debugger;
    console.log('rendered ok!');
  });
  // sde.addListener('loaddata', function(controls, error) {
  //   debugger;
  //   console.log('loaddata ok!');
  // });
  sde.addListener('click', function() {
    console.log(arguments);
    console.log('click ok!');
  });
  // sde.addListener('openform', function() {
  //   debugger;
  //   console.log('openform ok!');
  // });
  sde.addListener('valuechange', function() {
    console.log(arguments)
    console.log('valuechange ok!');
  });
  // sde.addListener('closeform', function() {
  //   debugger;
  //   console.log('closeform ok!');
  // });

  sde.addListener('contentchange', function() {
    console.log('contentchange ok!');
  });

  window.sde = sde;
  //window.sde1 = sde1;
  console.log('design load success!');
};