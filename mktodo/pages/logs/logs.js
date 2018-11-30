Page({
  data:{
    log:[]
  },
  onShow:function () {
    var that = this
    wx.getStorage({
      key: 'log',
      success: function(res) {
        that.setData({
          log:res.data
        })
      },
    })
  }
})
