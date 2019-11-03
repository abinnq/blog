
/**
 * 递归算法实现, 限制:15行代码、10分钟内
 *  a) 生成一个长度为5的空数组arr
 *  b) 生成一个(2-32)之间的随机整数
 *  c) 把随机树rand 插入到数组arr内, 如果数组arr 内存在与rand相同的数字, 
 *     需要重新生成随机数rand再插入arr内[递归实现], 不能用for/while等循环
 *  d) 最终输出一个长度为5,内容不重复的数组arr
 * 
 * A: Math.random() 是0-1之间, 包含0, 但是不包含1
 *    Math.floor()  是向下取整
 */
function buildArray(arr, length, min, max) {
  let num = Math.floor(Math.random()*(max - min + 1)) + min;
  if(!arr.includes(num)) {arr.push(num)}
  if(arr.length === length) {
    return arr
  } else {
    return buildArray(arr, length, min, max)
  }
}
buildArray([], 5, 2, 32)

