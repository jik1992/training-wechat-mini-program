//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.login({
            success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              console.info("code", res.code)
              var code = res.code;
              if (code) {

                // 获取用户信息
                wx.getSetting({
                  success: res => {
                    console.log(res)
                    if (res.authSetting['scope.userInfo']) {
                      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                      wx.getUserInfo({
                        success: res => {
                          // 可以将 res 发送给后台解码出 unionId
                          this.globalData.userInfo = res.userInfo
                          console.info("前台用户信息", res.userInfo)

                          var iv = res.iv;
                          var encryptedData = res.encryptedData;
                          console.info("code", code)
                          console.info("iv", iv)
                          console.info("encryptedData", encryptedData)
                        }
                      })
                    }
                  },
                  fail: function () {
                    console.log('微信用户未授权')
                  }
                })
              }
              else {
                console.log('登陆失败')
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