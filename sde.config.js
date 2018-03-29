/*
默认配置项
*/


;
(function() {
  /**
   * 编辑器资源文件根路径。它所表示的含义是：以编辑器实例化页面为当前路径，指向编辑器资源文件（即dialog等文件夹）的路径。
   * 鉴于很多同学在使用编辑器的时候出现的种种路径问题，此处强烈建议大家使用"相对于网站根目录的相对路径"进行配置。
   * "相对于网站根目录的相对路径"也就是以斜杠开头的形如"/myProject/ueditor/"这样的路径。
   * 如果站点中有多个不在同一层级的页面需要实例化编辑器，且引用了同一UEditor的时候，此处的URL可能不适用于每个页面的编辑器。
   * 因此，UEditor提供了针对不同页面的编辑器可单独配置的根路径，具体来说，在需要实例化编辑器的页面最顶部写上如下代码即可。当然，需要令此处的URL等于对应的配置。
   * window.UEDITOR_HOME_URL = "/xxxx/xxxx/"
   */
  var URL = window.UEDITOR_HOME_URL || getUEBasePath()

  /*
  SDE_CONFIG 配置项
  */
  window.ISDEBUGGER = true
  window.SDE_CONFIG = {
    HOME_URL: URL,
    HOME_URL_DIALOGS: URL + 'dialogs/',
    EDITOR_URL: URL + 'dist/js/sde.editor.js',
    //MODE: 'DESIGN', // DESIGN:设计|EDITOR:编辑|READONLY:只读（所有节点都不可编辑）  这个删除，sde本身模式应该是属于实例的
    //CONTROL_TEMPLATES: [],// 这个删除
    //PLUGINS: [], // 新增组件扩展接口，这里可以扩展组件
    TOOLBAR_PLUGINS: [], //todo 改用这个
    TABLE_STYLES: [{ name: 'sde-tb-solid', title: '实线', label: '实线1' }, { name: 'sde-tb-dotted', title: '虚线' }], // 默认提供2中表格样式
    DEFAULT_FONT_SIZE: 12
      //defaultFontSize: 12 // 默认字体为16
  }

  /**
   * 配置项主体。注意，此处所有涉及到路径的配置别遗漏URL变量。
   */

  window.UEDITOR_CONFIG = {
    UEDITOR_HOME_URL: URL + 'ueditor/', // 为编辑器实例添加一个路径，这个不能被注释
    serverUrl: URL + 'data/config.json', // URL + "net/controller.ashx", // 服务器统一请求接口路径
    toolbars: [], // 工具栏上的所有的功能按钮和下拉框，可以在new编辑器的实例时选择自己需要的重新定义
    autoClearinitialContent: false, // 是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
    // iframeJsUrl: URL + window.SDE_CONFIG.EDITOR_URL + '?temp=' + new Date().getTime(), //给编辑区域的iframe引入一个js文件
    // iframeCssUrl: URL + 'EMR/css/default.css?temp=' + new Date().getTime(), //给编辑区域的iframe引入一个css文件
    allowDivTransToP: false, // 允许进入编辑器的div标签自动变成p标签
    wordCount: false, // 关闭字数统计
    elementPathEnabled: false, // 关闭elementPath
    autoClearinitialContent: false,
    enableAutoSave: false // 关闭自动保存
  }

  function getUEBasePath(docUrl, confUrl) {
    return getBasePath(docUrl || self.document.URL || self.location.href, confUrl || getConfigFilePath())
  }

  function getConfigFilePath() {
    var configPath = document.getElementsByTagName('script')

    return configPath[configPath.length - 1].src
  }

  function getBasePath(docUrl, confUrl) {
    var basePath = confUrl

    if (/^(\/|\\\\)/.test(confUrl)) {
      basePath = /^.+?\w(\/|\\\\)/.exec(docUrl)[0] + confUrl.replace(/^(\/|\\\\)/, '')
    } else if (!/^[a-z]+:/i.test(confUrl)) {
      docUrl = docUrl.split('#')[0].split('?')[0].replace(/[^\\\/]+$/, '')

      basePath = docUrl + '' + confUrl
    }

    return optimizationPath(basePath)
  }

  function optimizationPath(path) {
    var protocol = /^[a-z]+:\/\//.exec(path)[0],
      tmp = null,
      res = []

    path = path.replace(protocol, '').split('?')[0].split('#')[0]

    path = path.replace(/\\/g, '/').split(/\//)

    path[path.length - 1] = ''

    while (path.length) {
      if ((tmp = path.shift()) === '..') {
        res.pop()
      } else if (tmp !== '.') {
        res.push(tmp)
      }
    }

    return protocol + res.join('/')
  }

  window.UE = {
    getUEBasePath: getUEBasePath
  }
})()