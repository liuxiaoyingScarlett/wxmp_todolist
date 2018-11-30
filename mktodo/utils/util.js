const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const updateLog = function (res,copy,index,str) {
  var oldlog = res.data.slice()
  oldlog.push({
    name: copy[index].name,
    time: formatTime(new Date()),
    operation: str
  })
  wx.setStorage({
    key: 'log',
    data: oldlog,
  })
}
module.exports = {
  formatTime: formatTime,
  updateLog: updateLog
}
