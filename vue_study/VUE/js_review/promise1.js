function wakeUp(callback) {
  setTimeout(() => {
    console.log("1. 일어났어요! ⏰");
  }, 1000);
  callback();
}

function washFace(callback) {
  setTimeout(() => {
    console.log("2. 세수했어요! 💦");
    callback();
  }, 1000);
}

function shower(callback) {
  setTimeout(() => {
    console.log("3. 샤워했어요! 💦");
    callback();
  }, 1000);
}

function eatBreakfast(callback) {
  setTimeout(()=>{
    console.log("3. 아침 먹었어요! 🍞");
    callback();
  },1000);
}

//비동기 처리
wakeUp(()=>{
  washFace(()=>{
    eatBreakfast(()=>{
      console.log("준비완료")
    });
  })
});