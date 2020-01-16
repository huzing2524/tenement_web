### 微信小程序前端界面
   
- V1.0 初始版本，此项目后台都部署在搬瓦工VPS，域名使用namesilo购买解析，待以后迁移到国内，练习使用。

- 主页
  1. 图片点击全屏预览,左右滑动切换预览图片
  2. 点击主页内容跳转到详情页
    
    
     ![](https://huzing2524.oss-cn-shenzhen.aliyuncs.com/wechat_projects/tenement_web/%E4%B8%BB%E9%A1%B5.png)

- 详情页
  1. 点击电话图标拨打电话
  2. 图片平铺展示预览
  3. 点击删除按钮会判断是否有token，如果有token可以删除当前条目数据，如果没有token会跳转到个人中心-登录界面，管理员才能登录并存储token
    
    
     ![](https://huzing2524.oss-cn-shenzhen.aliyuncs.com/wechat_projects/tenement_web/%E8%AF%A6%E6%83%85%E9%A1%B5.png)
    
- 发布页
  1. 填写内容，有JS校验判断
  2. 添加、删除、预览图片，图片经过base64转码添加到列表后一起上传
  3. 发布按钮有阻止重复提交
    
    
     ![](https://huzing2524.oss-cn-shenzhen.aliyuncs.com/wechat_projects/tenement_web/%E5%8F%91%E5%B8%83%E9%A1%B5.png)
    
- 个人中心
  1. 个人中心主页，其它功能待添加，不知道罗黎明想做啥
    
    
     ![](https://huzing2524.oss-cn-shenzhen.aliyuncs.com/wechat_projects/tenement_web/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83.png)

- 管理员登录
  1. 密码输入框内可切换可见/不可见
  2. 密码SHA256加密存储
  3. 登录成功后localStorage存储token，保持登录状态（过期时间30天）
    
    
     ![](https://huzing2524.oss-cn-shenzhen.aliyuncs.com/wechat_projects/tenement_web/%E7%AE%A1%E7%90%86%E5%91%98%E7%99%BB%E5%BD%95.png)
