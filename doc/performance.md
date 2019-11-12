#性能测试

####1.关于$.extend,object.assign,deepClone的性能对比
测试环境：i7 2600
$.extend 复制10000次User 平均耗时185  
object.assign 复制10000次User 平均耗时155  
deepClone 复制10000次User 平均耗时475  

Object.assign 里层对象使用浅复制，不符合使用要求，改写后 耗时高达1000
deepClone 无法复制原型链
