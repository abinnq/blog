## 微信网页获授权
  appID: 公众号唯一标识
  UnionID: 根据公众帐号在微信平台下 绑定的用户唯一标识id
  openID:(加密后的微信号) 用户唯一标识, 即使用户未关注也会有一个openID

  1. 用户同意授权, 获取code
    引导用户打开一个微信的url包含
      appid
      redirect_uri: 重定向url
      scope: 授权类型
        snsapi_base: 静默授权不弹出授权页面直接跳转redirect_uri
        snsapi_uerinfo: 跳转授权页面, 用户选择授权再跳转redirect_uri
        (对于已经关注的用户, 在公众号的会话和菜单进入是走静默授权)
    用户同意后会跳转回redirect_uri, 并拼接上code

  2. 通过code换取网页授权access_token
    根据url上的从的, 发起一个get请求通过code获取对应的
    access_token
    openID
    refresh_token

  3. 刷新access_token（如果需要)
    可以通过一个请求校验当前access_token是否过期

    通过上一步的refresh_token(30天有效期), 当access_token超时后发起请求拿到最新的access_token
  
  4. 通过access_token 和openId 获取用户信息
    发起请求通过access_token和openID获取 用户的一些信息

## 小程序获取用户授权
  1. 获取用户授权设置getSetting, 
    如何已授权,就调用getUserInfo,
    没有授权, 则发起授权

  2. 发起授权openSetting
    需要用户点击触发
    参数里传入 success 成功 fail 失败
  

  