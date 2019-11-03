## HTML5 新增特性
  *语义标签*
    header、footer、nav、section、time、mark
  
  *input标签属性*
    color、date、datetime、number、month、search、time、url、email、week、tel

  *图像标签*
    canvas、svg
  
  *媒体标签*
    audio、embed、video

## canvas 与svg
  canvas 是使用js程序绘图, 
  svg 是使用xml文档描述绘图的
    
# css

## 1. CSS3
  *选择器*
  last-child、first-child

  
  *transform*
  - translate(位移) translate3d(3D转换)
  - scale(缩放)
  - rotate(旋转)
  - skew(倾斜)

  *transition*
    过渡的变化效果 适用于from to
    duration(过度时间)、delay(开始), timing-function(动画曲线 ease-out、linear、ease-in)

  *Animation*
  相对复杂的关键帧的动画效果
  `keyframes`: 关键帧 0% {} 20% 
  `animation-fill-mode`: backwards: 表示结尾样式是用`from0%` forwards 还是 `to100%` 
  `animation-play-state: paused` 暂停

## 2.css 选择器优先级
!important > 内联style > id > 类class > 伪类 > 属性[type='text'] > 标签 > 通配符 > 浏览器自定义

## CSS垂直居中
   - position: absolute; top: 50%; transform: translateY(-50%);
   - display: flex; align-times: center; justify-content: center;(水平居中)
   - position: absolute; top: 0; bottom: 0; margin: auto;

## 3.css 双飞燕布局和圣杯布局
  两者都是: 三列布局, 两边固定宽度, 中间自适应
  重点: 中间栏放在文档流前面, 保证优先渲染

  *圣杯*
    利用父容器的左、右内边距定位

    container 
      padding-left、padding-right
    main
      float: left、width:100%
    left
      position: relative
      left: -w
      margin-left: -w
    right
      position: relative
      right: -w
      margin-right: -w

  *双飞燕*
    主列嵌套在div后利用主列左、右外边距定位
    main-wrap
      float: left
    main
      margin-left、margin-right
    left
      float: left
      margin-left: -w　
    right
      float: left
      margin-right: -w
    
## 4.BFC 块级格式化上下文
  BFC: 隔离了的独立容器, 容器里面的元素布局不会影响到容器外
  *应用*
  - 同一个BFC里 上下边距会发生重叠, 双margin问题(解决: 放在不同的BFC里)
  - 避免文字环绕 在文字元素加上overflow: hidden
  - BFC 可以包含浮动元素(清除浮动)

## 5.弹性布局flex
  容器: flex
  子元素: item
  默认存在两根轴: 水平轴和垂直轴
  flex-direction: 轴的方向 
    row(左到右) row-reverse(右到左)
    column(上到下) column-reverse(下到上)
  
  flex-wrap: 多行排列
    nowrap(默认 单行排列所有)
    wrap(多行排列)

  flex-flow: flex-direction + flex-wrap 简写

  justify-content: 水平轴对齐方式
    flex-start(左对齐)
    flex-end(右对齐)
    center(居中)
    space-between(两头对齐)
    space-around(间隔相等)

  align-items: 垂直轴
    同justify-content一样

## 6.响应式布局
  根据不同的浏览设备呈现不同的网页布局
  根据媒体查询写几套对应的代码
  @media screen max-width

## rem
  字体单位根据html根元素大小而定, 一般是宽度
  默认1rem = html的font-size 16px

## margin 和 padding 百分比
  无论是top 还是bottom百分比都是
  容器宽度的百分比(父元素的宽度)