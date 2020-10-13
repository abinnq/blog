/**
 * 881-救生艇-中等
 * 第 i 个人的体重为 people[i]，每艘船可以承载的最大重量为 limit。
 * 每艘船最多可同时载两人，但条件是这些人的重量之和最多为 limit。
 * 返回载到每一个人所需的最小船数。(保证每个人都能被船载)。
 * 链接：https://leetcode-cn.com/problems/boats-to-save-people
 */

/**
 * 双指针解决：遍历过程中不是普通的使用单个指针进行访问，而是使用两个相同方向(快慢指针),或者相反方向(对撞指针)
 * 1. 对数组进行升序排序
 * 2. 初始化左右指针,船的数量
 * 3. 每次都让最重值与最轻值配对，小于limit最轻的上船leftIndex++, 无论结果如何最重的都会上船rightIndex--，并且船的数量都会增加num++
 */

 /**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
let numRescueBoats = function(people, limit) {
  people.sort((a, b) => (a - b)) 
  let leftIndex = 0;
  let rightIndex = people.length - 1;
  let num = 0;
  while(leftIndex <= rightIndex) {
    if(people[leftIndex] + people[rightIndex] <= limit) {
      leftIndex++;
    }
    rightIndex--;
    num++;
  }
  return num;
};

const people = [1,5,3,4], limit = 5;
console.log(numRescueBoats(people, limit));

