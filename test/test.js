var s = "get-element-by-id"
function upperCase(str) {
  return str.replace(/-\w/g, function(x){
    // return x.slice(1).toUpperCase();
    console.log(x.slice(1))
    return x
  })
}
console.log(upperCase(s))