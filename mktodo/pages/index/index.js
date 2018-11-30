const updateLog = require("../../utils/util.js").updateLog
const formatTime = require("../../utils/util.js").formatTime
Page({
  data: {
    taskName: "",
    itemsArr: [],
    clearFlag: false
  },

  inputchange: function(e) {
    this.setData({
      taskName: e.detail.value
    })
  },
  // 新增任务
  addTask: function() {
    if (this.data.taskName) {
      var copy = this.data.itemsArr.slice()
      var oldname = this.data.taskName
      var that = this
      var oldlog
      copy.push({
        name: oldname,
        completed: false
      })
      this.setData({
        itemsArr: copy
      })

      wx.getStorage({
        key: 'log',
        success: function(res) {
          oldlog = res.data.slice()
        },
        fail: function() {
          oldlog = []
        },
        complete: function() {
          oldlog.push({
            name: oldname,
            time: formatTime(new Date()),
            operation: "Add"
          })
          wx.setStorage({
            key: 'log',
            data: oldlog,
          })
        }
      })
      this.setData({
        taskName: ""
      })
    }
  },
  deleteItem: function(e) {
    var index = e.currentTarget.dataset.index
    var copy = this.data.itemsArr.slice()
    wx.getStorage({
      key: 'log',
      success: function(res) {
        updateLog(res, copy, index, "Remove")
      }
    })
    copy.splice(index, 1)
    this.setData({
      itemsArr: copy
    })
  },
  toggleItem: function(e) {
    var index = e.currentTarget.dataset.index
    var copy = this.data.itemsArr.slice()
    var finish
    copy[index].completed = !copy[index].completed
    this.setData({
      itemsArr: copy
    })
    finish = copy[index].completed ? "Finish" : "Restart"
    wx.getStorage({
      key: 'log',
      success: function(res) {
        updateLog(res, copy, index, finish)
      }
    })
    // 能否清除已完成
    if (copy.some(item => {
        return item.completed == true
      })) {
      this.setData({
        clearFlag: true
      })
    } else {
      this.setData({
        clearFlag: false
      })
    }
  },
  clearCompleted: function() {
    var remain = []
    this.data.itemsArr.forEach((item, index) => {
      console.log(item.completed)
      if (!item.completed) {
        remain.push(item)
      } else {
        var res = wx.getStorageSync('log')
        if (res) {
          var oldlog = res.slice()
          oldlog.push({
            name: item.name,
            time: formatTime(new Date()),
            operation: "Clear"
          })
          wx.setStorageSync('log', oldlog)
        }
      }
    })
    this.setData({
      itemsArr: remain,
      clearFlag: false
    })
  }
})