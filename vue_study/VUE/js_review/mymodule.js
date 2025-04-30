//캡슐화 접근(노출) 범위 제어
function myfunc(msg){
  console.log(msg);
}

function myfunc1(msg){
  console.log(msg);
}

function defFunction(msg){
  console.log('default:',msg);
}

// export default defFunction;
export {myfunc,myfunc1};