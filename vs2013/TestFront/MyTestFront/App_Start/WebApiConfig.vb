Imports System
Imports System.Collections.Generic
Imports System.Linq
Imports System.Web.Http

Public Class WebApiConfig
    Public Shared Sub Register(ByVal config As HttpConfiguration)
        config.Routes.MapHttpRoute( _
            name:="DefaultApi", _
            routeTemplate:="api/{controller}/{id}", _
            defaults:=New With {.id = RouteParameter.Optional} _
        )
        
        '取消注释下面的代码行可对具有 IQueryable 或 IQueryable(Of T) 返回类型的操作启用查询支持。
        '若要避免处理意外查询或恶意查询，请使用 QueryableAttribute 上的验证设置来验证传入查询。
        '有关详细信息，请访问 http://go.microsoft.com/fwlink/?LinkId=279712。
        'config.EnableQuerySupport()
    End Sub
End Class