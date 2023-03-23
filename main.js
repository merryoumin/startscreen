function zero(inTime) {
  if (inTime < 10) {
    inTime = "0" + inTime;
  }
  return inTime;
}

function getTime() {
  const time = document.querySelector(".time");
  //클래스 명이라 . /  #은 아이디 / 안붙이면 테크
  //html은 문서라 document로 접근

  const newDate = new Date();
  //new는 Date라는 객체를 새로 생성
  //특정한 날짜 값을 넣을 수 있음 / 없으면 현재시간

  //   let hours = newDate.getHours();
  //   let minutes = newDate.getMinutes();
  //   let seconds = newDate.getSeconds();

  //   if (seconds.toString().length === 1) {
  //     seconds = "0" + seconds;
  //   }
  //넘버를 toString 문자로 바꾸고 length길이를 구하고 1자리가 넘으면

  /////////////////-> 이미 있음 String()으로 글씨로 바꾸고 padStart

  const hours = String(newDate.getHours()).padStart(2, "0");
  const minutes = String(newDate.getMinutes()).padStart(2, "0");
  const seconds = String(newDate.getSeconds()).padStart(2, "0");

  //time.innerText = "is phin"; //->텍스트 변경 시 사용
  //time.innerText = hours + " : " + minutes + " : " + seconds;
  time.innerText = `${hours} : ${minutes} : ${seconds}`;
  //text는 글씨라고 생각하고 html은 html로 생각함
  //console.log(newDate);
}

getTime();

setInterval(getTime, 1000);

// setInterval(() => {
//   console.log("setInterval");
// }, 1000);

//화살표 함수랑 function이랑 완벽히 같지는 않음
//setInterval : 1000 은 1초
