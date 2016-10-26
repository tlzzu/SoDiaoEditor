
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
/// <summary>
/// 基础模板
/// </summary>
public class ControlDesignBaseModel
{
    public string ID { get; set; }
    /// <summary>
    /// 标签
    /// </summary>
    public string TAG { get; set; }
    /// <summary>
    /// 类型 text（支持模板）、textarea（回车可换行）、select（下拉是否允许自由输入、可配置数据来源）、radio（单选）、checkbox（多选）、template（模板）、date年月日、datetime年月日时分秒、time（时分秒）
    /// </summary>
    public string TYPE { get; set; }
    /// <summary>
    /// 控件名
    /// </summary>
    public string NAME { get; set; }
    
    /// <summary>
    /// 传递值
    /// 如果是多选，value里面就是json数组["aa","bb","cc"]
    /// </summary>
    public string VALUE { get; set; }
    
    /// <summary>
    /// 必填 1必填，0非必填
    /// </summary>
    public int REQUIRED { get; set; }




}
/// <summary>
/// 没有模板的（有的话就是下拉选项）
/// </summary>
public class ControlDesignTextModel : ControlDesignBaseModel
{

    ///// <summary>
    ///// 选择的传递值，跟VALUE联动
    ///// </summary>
    //public string DESCVALUE { get; set; }
    /// <summary>
    /// 控件描述名
    /// </summary>
    public string DESCNAME { get; set; }
    /// <summary>
    /// 验证字段 text、email、int、float、idcard
    /// </summary>
    public string VERIFYTYPE { get; set; }
}
/// <summary>
/// 比text多了个回车换行
/// </summary>
public class ControlDesignTextareaModel : ControlDesignTextModel { }

/// <summary>
/// 有模板进行选择的
/// </summary>
public class ControlDesignSelectModel: ControlDesignBaseModel
{
    public ControlDesignSelectModel(){
        this.REMOTEURL = string.Empty;
    }
    /*
     1.是否允许自由输入 true或者false
     2.可配置数据来源
     3.手动输入选项
     */
    /// <summary>
    /// 是否允许自由输入 1允许自由输入，2必须根据模板内容选择输入
    /// </summary>
    public int FREEINPUT { get; set; }
    /// <summary>
    /// 远程url，如果为空则不是从远程url总获取的数据 get请求，数据结构是[{VALUE:"值",DESC:"显示值",SELECTED:1}]
    /// </summary>
    public string REMOTEURL { get; set; }
    /// <summary>
    /// 绑定数据，如果
    /// </summary>
    public SelectModel[] BINDINGDATA { get; set; }

}
public class SelectModel {
    /// <summary>
    /// 选中值
    /// </summary>
    public string VALUE { get; set; }
    /// <summary>
    /// 描述
    /// </summary>
    public string DESC { get; set; }
    /// <summary>
    /// 1默认选中，0未选中
    /// </summary>
    public int SELECTED { get; set; }
}
/// <summary>
/// 单选 包含排列方式，允许自由排列这样模板编辑者可自由在旁边（上边）加上img等
/// </summary>
public class ControlDesignRadioModel : ControlDesignBaseModel {
    /// <summary>
    /// 远程url，如果为空则不是从远程url总获取的数据 get请求，数据结构是[{VALUE:"值",DESC:"显示值",SELECTED:1}]
    /// </summary>
    public string REMOTEURL { get; set; }
    /// <summary>
    /// 绑定数据，如果
    /// </summary>
    public SelectModel[] BINDINGDATA { get; set; }

}
/// <summary>
/// 多选
/// </summary>
public class ControlDesignCheckboxModel : ControlDesignBaseModel {
    /// <summary>
    /// 是否允许自由输入 1允许自由输入，2必须根据模板内容选择输入
    /// </summary>
    public int FREEINPUT { get; set; }
    /// <summary>
    /// 远程url，如果为空则不是从远程url总获取的数据 get请求，数据结构是[{VALUE:"值",DESC:"显示值",SELECTED:1}]
    /// </summary>
    public string REMOTEURL { get; set; }
    /// <summary>
    /// 绑定数据，如果
    /// </summary>
    public SelectModel[] BINDINGDATA { get; set; }
}
/// <summary>
/// 模板
/// </summary>
public class ControlDesignTemplateModel : ControlDesignBaseModel {

}

/// <summary>
/// 年月日
/// </summary>
public class ControlDesignDateModel : ControlDesignBaseModel {
    /*
     1.输入范围
     */
     /// <summary>
     /// 最小 yyyy-MM-dd
     /// </summary>
    public string MIN { get; set; }
    /// <summary>
    /// 最大 yyyy-MM-dd
    /// </summary>
    public string MAX { get; set; }
}
/// <summary>
/// 年月日 时分秒
/// </summary>
public class ControlDesignDatetimeModel : ControlDesignDateModel { }
/// <summary>
/// 时分秒
/// </summary>
public class ControlDesignTimeModel : ControlDesignDateModel { }