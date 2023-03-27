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
  const time = document.querySelector(".time");
  newQuotes.style.display = "inline-block";
  time.style = "font-size: 0";
}

function onClickRegist() {
  const quotesMsg = document.querySelector(".quotesMsg");
  const newQuotes = document.querySelector(".newQuotes");
  const newQuotesInput = document.querySelector(".newQuotesInput");
  const time = document.querySelector(".time");

  if (
    !newQuotesInput.value ||
    newQuotesInput.value.split(" ").join("").length === 0
    //공백이 포함 되있는 문장 중 공백을 기준으로 split해서 하나의 배열로 만든다음
    // 그 배열들을 공백없는('') 구분자를 통해 연결을 하면 공백이 제거되는 방법
  ) {
    alert("내용을 적어주세요");
    newQuotesInput.focus();
    newQuotesInput.value = null;
    return;
  }

  let savedQuotes = localStorage.getItem(QUOTES);
  let quotesArray = JSON.parse(savedQuotes); //자바스크립트 객체 생성

  quotesArray.push(newQuotesInput.value); //quotesArray 추가
  localStorage.setItem(QUOTES, JSON.stringify(quotesArray)); //문자로 변환해서 저장

  quotesMsg.innerHTML = `<span>${newQuotesInput.value}</span>`;
  newQuotes.style.display = "none";
  newQuotesInput.value = null;
}

function onClickClose() {
  const newQuotes = document.querySelector(".newQuotes");
  const time = document.querySelector(".time");
  newQuotes.style.display = "none";
  time.style = "font-size: 80px";
}

let isLoading = false;

async function onClickSearch() {
  const searchInput = document.querySelector(".searchInput");
  const searchResult = document.querySelector(".searchResult");

  // if (!newQuotesInput.value) return;
  // 이렇게 사용가능
  if (
    !searchInput.value ||
    searchInput.value.split(" ").join("").length === 0
  ) {
    alert("검색 내용을 적어주세요");
    searchInput.focus();
    searchInput.value = null;
    return;
  }

  if (isLoading) return;
  isLoading = true;

  const question = searchInput.value;
  searchInput.value = "검색 중 입니다.. 잠시만 기다려주세요.";
  // const라도 . 속성으로는 바꿀수 있음

  //프론트엔드에서 백엔드
  const response = await axios.post(
    //await(시간 차) 쓰기 위해 async function 붙어야함
    "https://holy-fire-2749.fly.dev/chat",
    {
      //question: question, //키(백엔드에서 정의해놓음)랑 벨류랑 같으면 생략도 가능
      question,
      //첫번째 : 주소 /두번째: 바디 (질문), 개인정보 /해더에 정보의 정보
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer BLOCKCHAINSCHOOL3", //이렇게 쓰면 털림 (안증용)
      },
    }
  );

  if (response.status === 200) {
    searchResult.style.display = "inline";
    searchResult.innerText = response.data.choices[0].message.content;
  }

  searchInput.value = null;
  isLoading = false;
}

function onChickToggle(value) {
  const nft = document.querySelector(".nft");
  const nftView = document.querySelector(".nftView");

  if (value) {
    nft.style.display = "inline-block";
    nftView.style.display = "none";
  } else {
    nft.style.display = "none";
    nftView.style.display = "inline-block";
  }
}
