#  微信小程序ToDoLists Demo

最近开始学习小程序，模仿[参考链接](https://www.jishux.com/p/cb2e3469eee9e7c3)做的第一个入门Demo

记录过程中遇到的问题：

1.input需要绑定事件如bindinput才能实现数据绑定

2.`<icon type='{{item.completed ? "success" : "circle"}}' bindtap='toggleItem' data-index='{{index}}'></icon>`

> 注意属性值中存在三元运算符的写法以及向事件处理函数中传值的写法！

3.block标签常作为条件渲染和列表渲染的外层容器

4.注意setStorage，getStorage等一系列**异步**事件使用时处理放在回调函数中&程序运行顺序！

5.css还需巩固加强！