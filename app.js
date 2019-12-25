
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
  if(res.code){
    var that_ = that;
    wx.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      data: {
        //小程序唯一标识
        appid: 'wxdc60ce0cbe6d35b0',
        //小程序的 app secret
        secret: 'd5de40b91a7fe95f5bac91f07cf2bc0f',
        grant_type: 'authorization_code',
        js_code: res.code
      },
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (openIdRes) {

        that_.globalData.openid = openIdRes.data.openid;
        console.log(openIdRes);
      }
    })
  }
        //"alin appid":"wxdc60ce0cbe6d35b0"
        // "appid": "wx12c64dd9477fb11f",
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})