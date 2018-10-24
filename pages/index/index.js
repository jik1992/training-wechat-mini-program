//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'openid',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // });
    let that=this;
    wx.request({
      url: 'http://test.mine.api.logic.alorvalley.com/api/card/member/getOauthUserInfo',
      data: {
        k: 'wx7f136ddff110168c',
        v: '99df63c93ca86781802f45cd211c1b44',
        encryptedData: wx.getStorageSync("encryptedData"),
        code: wx.getStorageSync("code"),
        iv: wx.getStorageSync("iv")
      },
      success(res) {
        that.setData({
          motto: res.data.data[0].openId
        })
      }
    })

  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

   

  },
  queryCardList: function(e) {
    //打开会员卡
    wx.openCard({
      cardList: [{
        cardId: 'ppiOM1VDVqRXMwEGkvyfCSeRXp7Q',
        code: '541242473121'
      }, {
        cardId: 'ppiOM1dt_k8zkQAoqitKlu88uM0A',
        code: '356643646877'
      }],
      success(res) {}
    })
  },
  addCard: function() {
    wx.addCard({
      cardList: [{
        cardId: 'ppiOM1dt_k8zkQAoqitKlu88uM0A',
        cardExt: '{"code": "", "openid": "opiOM1cAuWgeY6FFuX3GmUEaN22I", "timestamp": "", "signature":""}'
      }],
      success(res) {
        console.log(res.cardList) // 卡券添加结果
      }
    })
  },
  editAddress: function() {
    wx.chooseAddress({
      success(res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
      }
    })
  },
  map1: function() {
    wx.chooseLocation()
  },
  scancode: function() {
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['barCode', 'qrCode'],
      success: function(e) {
        console.info(e)
      }
    })

  },
  selectInovice: function() {
    wx.chooseInvoiceTitle()
  },
  selectInoviceList: function() {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 28
        })
      }
    })
  }
})