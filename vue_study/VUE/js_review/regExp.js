let text = "Visit W3Schools";
const exp  = /^w3schools/i;
let n = text.search(exp);
console.log(n);

let bool = exp.test;
console.log(bool);

let numExp = /^[\s][\d]{2}$/
let numText = 'aa1'
bool = numExp.test(numText)
console.log('숫자표현',bool);