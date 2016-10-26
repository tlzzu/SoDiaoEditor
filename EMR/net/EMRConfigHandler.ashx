<%@ WebHandler Language="C#" Class="EMRConfigHandler"  %>

using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;

/// <summary>
/// 控件数据
/// </summary>
public class ControlDesignDB
{
    private static List<ControlDesignBaseModel> _db = null;
    public static List<ControlDesignBaseModel> DB
    {
        get
        {
            if (_db == null)
            {
                _db = new List<ControlDesignBaseModel>();
                _db.Add(new ControlDesignBaseModel() { });
            }
            return _db;
        }
    }
}
public class EMRConfigHandler : IHttpHandler
{


    /// <summary>
    /// 利用反射调用方法
    /// </summary>
    /// <param name="context"></param>
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/json";

        string action = context.Request["action"];
        if (string.IsNullOrWhiteSpace(action))
        {
            context.Response.Write("action参数为空！");
            return;
        }
        Type t = this.GetType();
        MethodInfo method = t.GetMethod(action);
        if (method == null)
        {
            context.Response.Write("无此方法！");
            return;
        }
        object[] args = new object[1];
        args[0] = context;
        method.Invoke(this, args);
    }


    #region 控件设计器
    /// <summary>
    /// 添加
    /// </summary>
    /// <param name="context"></param>
    public void ControlDesign_add(HttpContext context)
    {

    }
    /// <summary>
    /// 编辑
    /// </summary>
    /// <param name="context"></param>
    public void ControlDesign_edit(HttpContext context)
    {
    }
    /// <summary>
    /// 删除
    /// </summary>
    /// <param name="context"></param>
    public void ControlDesign_delete(HttpContext context)
    {
    }
    /// <summary>
    /// 根据id获取控件
    /// </summary>
    /// <param name="context"></param>
    public void ControlDesign_getByID(HttpContext context)
    {
    }
    /// <summary>
    /// 获取所有控件
    /// </summary>
    /// <param name="context"></param>
    public void ControlDesign_getAll(HttpContext context)
    {
    }
    /// <summary>
    /// 根据控件名称搜索控件
    /// </summary>
    /// <param name="context"></param>
    public void ControlDesign_search(HttpContext context)
    {
    }
    /// <summary>
    /// 根据标签获取控件
    /// </summary>
    /// <param name="context"></param>
    public void ControlDesign_getByTag(HttpContext context)
    {
    }
    /// <summary>
    /// 获取所有的标签值
    /// </summary>
    /// <param name="context"></param>
    public void ControlDesign_getAllTags(HttpContext context)
    {

    }

    #endregion


    #region 

    #endregion


    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}