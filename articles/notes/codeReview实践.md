# Code Review 实践

> code review 是学习编码风格和实现的很直接的方式

## table of contents
  - [一、为什么要进行code review](#%e4%b8%80%e4%b8%ba%e4%bb%80%e4%b9%88%e8%a6%81%e8%bf%9b%e8%a1%8ccode-review)
  - [二、code review需要注意的几点](#%e4%ba%8ccode-review%e9%9c%80%e8%a6%81%e6%b3%a8%e6%84%8f%e7%9a%84%e5%87%a0%e7%82%b9)
  - [三、Reference](#%e4%b8%89reference)

## 一、为什么要进行code review
1. 是团队知识共享的角度

  每个人侧重领域不同, 方便大家对侧重领域之外的知识了解,也方便人员流动可以快速上手。
  *避免重复造轮子*, 这个尤为重要。内部已实现的库也方便推广。

2. 代码质量的角度

  部分逻辑的书写, 是否可以优化, 及性能是否过关, 都需要把控这些

3. 团队规范的角度

  简单的代码规范, eslint之类已经帮我们实现了。
  例如项目划分, 命名规范之类, 组件拆分, 就需要在code review时及时的发现和修正这些问题。

## 二、code review需要注意的几点
1. 遇到紧急情况，来不及代码审查怎么办？

  原则上必须code review 过后才可以提测和合并操作, 如遇到线上代码修复, 可以先创建一个Ticket,用于后续追踪, 并对结果进行更新。

2. 先设计再编码

  基于功能性的开发需要先设计下思路, 然后找资深过一遍设计审查, 其实就是实现思路是不是相对较优的。

3. 提交review前, 先自测一遍

  通过diff对比可以明显看出差异性, 明显缺陷,及疏忽bug很容易在这一步发现

4. pr要小

  大量文件修改review起来 相对困难。 根据commit分批提交, 以减轻审查的压力

5. 评论分级

  对评论进行打tag 标记, 以便直观的了解review 结果
  - blocker: 阻碍性的, 必须要修改
  - optional: 可以选择性修改
  - question: 有疑问的代码, 需要被审查者解释当前代码作用

6. 评论要友好, 讲不清问题当面沟通

  评论用语要使用相对友好的, 避免负面词汇

7. 最好给出解决方式

  对有问题代码,在评论里最好给出解决方式, 善于写伪代码

8. 不要吝啬自己的赞美

  当遇到优秀的实现方式要多多点赞

## 三、Reference
- [Code Review最佳实践](https://zhuanlan.zhihu.com/p/73809355)
- [Google Code Review指南](https://google.github.io/eng-practices/review/reviewer/)