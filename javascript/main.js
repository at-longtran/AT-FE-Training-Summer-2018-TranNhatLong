function bai1(a, b) {
  return (a != b) ? (a + b) : (a + b) * 3;
}
function bai2(a) {
  return (a > 19) ? (a - 19) * 3 : Math.abs(a - 19);
}
function bai3(str) {
  result = [];
  for (let i = 0; i < 10; i++) {
    newInt = +str.replace("*", i);
    if (newInt % 3 == 0) {
      result.push(newInt);
    }  
  }
  
  return result;
}
function bai4(str) {
  result = [];
  for (let i = 0; i < 10; i++) {
    newInt = +str.replace("*", i);
    if (newInt % 6 == 0) {
      result.push(newInt);
    }  
  }
  
  return result;
}
console.log(bai1(5, 5));
console.log(bai2(21));
console.log(bai3('1*9'));
console.log(bai4('1*4'));
