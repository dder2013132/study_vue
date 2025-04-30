const defaultValue = 1;
function add(num1, num2){
  return num1+num2;
}

function min(num1, num2){
  return num1-num2;
}
// commonJS 모듈(node) (ES module(Vue))
module.exports = { defaultValue, add, min }