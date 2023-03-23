const QUOTES = "quotes";

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

function getQuotes() {
  //   console.log("getQuotes");
  const quotesMsg = document.querySelector(".quotesMsg");

  let savedQuotes = localStorage.getItem(QUOTES);

  if (!savedQuotes) {
    localStorage.setItem(
      QUOTES,
      JSON.stringify([
        "이 또한 지나가리라",
        "강아지 고양이 섬 사기",
        "주님이 사용하시게!!",
      ])
    );
    savedQuotes = localStorage.getItem(QUOTES);
  }

  let quotesArray = JSON.parse(savedQuotes);
  quotesMsg.innerText =
    quotesArray[Math.floor(Math.random() * quotesArray.length)];
}

// round, ceil, floor
setInterval(getQuotes, 1500);
getQuotes();

function onClickAdd() {
  const newQuotes = document.querySelector(".newQuotes");

  newQuotes.style.display = "inline-block";
}

function onClickRegist() {
  const quotesMsg = document.querySelector(".quotesMsg");
  const newQuotes = document.querySelector(".newQuotes");
  const newQuotesInput = document.querySelector(".newQuotesInput");

  if (!newQuotesInput.value || newQuotesInput.value.length === 0) {
    alert("내용을 적어주세요");
    newQuotesInput.focus();
    return;
  }

  let savedQuotes = localStorage.getItem(QUOTES);
  let quotesArray = JSON.parse(savedQuotes);

  quotesArray.push(newQuotesInput.value);
  localStorage.setItem(QUOTES, JSON.stringify(quotesArray));

  quotesMsg.innerHTML = `<span>${newQuotesInput.value}</span>`;
  newQuotes.style.display = "none";
}
