/**
 * 026-删除排序数组中的重复项-简单
 * 给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
 * 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
 */

 /**
  * 双指针-快慢指针
  * 快慢指针: 两个指针从同一侧开始遍历数组, 将两个指针定义为快指针(fast)和慢指针(slow),
  * 两个指针以不同的策略移动, 直到两个指针相等或其他特殊条件为止
  * 1. 前置条件(已排好序的数组)
  * 2. 定义fast=0,slow=0
  * 3. 快指针每次增长一个,慢指针只有当快指针上的值不同时才增长一个(不同说明找到了新值)
  */


/**
 * @param {number[]} nums
 * @return {number}
 */
let removeDuplicates = function(nums) {
  let slow = 0;
  for(let fast = 1; fast < nums.length; fast++) {
    if(nums[slow] !== nums[fast]) {
      slow++;
      nums[slow] = nums[fast]
    }
  }
  return slow+1;
};



const nums = [0,0,1,1,1,2,2,3,3,4];
console.log(removeDuplicates(nums));