// this.is.spread.js

let arr = [1,2,3];
let arrcp = arr;
// arrcp[0] = 10;
// console.log(arr);
// console.log(arrcp);

function aDc(){
  let arrDeepcp = [ ... arr];
  arrDeepcp[0] = 100;
  console.log(arr)
  console.log(arrDeepcp)
}

function objectShallowCopy(){
  let emp = { name:"홍길동", age:20 }
  let empCp = emp;
  empCp.age = 30;
  console.log(emp);
  console.log(empCp);

}

function objectDeepCopy(){
  let emp = { name:"홍길동", age:20 }
  let empCp = { ... emp};
  empCp.age = 30;
  console.log(emp);
  console.log(empCp);

}

objectShallowCopy();

objectDeepCopy();