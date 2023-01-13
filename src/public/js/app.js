const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message-form");
const nicknameForm = document.querySelector("#nickname-form");

//* frontend 에서 backend 연결
const socket = new WebSocket(`ws://${window.location.host}`); //- 여기서 socket은 서버로의 연결을 뜻함

//* 메시지를 JSON 형태의 String 으로 보내기 위해 변환해주는 함수
function makeMessage(type, payload) {
  const msg = { type, payload };
  //- 단순한 문자열로 메시지를 전송했을 때 구분할 수 없었던 점을 개선하기 위해 JSON 형태로 작성하고
  //- type 에 값을 할당하여 구분해준다.
  return JSON.stringify(msg);
}

//* 서버로 socket 연결이 되었을 때
socket.addEventListener("open", () => {
  console.log("✅ WebSocket : 브라우저가 서버에 연결되었습니다.");
});

//* 서버로부터 전달된 message 이벤트를 받았을 때
socket.addEventListener("message", (message) => {
  //- 서버에서 send 로 보낸 message 이벤트와 data를 받아옴
  const li = document.createElement("li");
  li.textContent = message.data;
  messageList.prepend(li);
});

//* 서버로 socket 연결이 해제되었을 때
socket.addEventListener("close", () => {
  console.log("❌ WebSocket : 서버와 연결이 해제되었습니다.");
});

//* event handle function
function handleMessageSubmit(event) {
  event.preventDefault(); //- 기본 이벤트 막음
  const messageInput = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", messageInput.value));
  messageInput.value = "";
}
function handleNicknameSubmit(event) {
  event.preventDefault();
  const nicknameInput = nicknameForm.querySelector("input");
  socket.send(makeMessage("nickname", nicknameInput.value));
}

//* DOM event
messageForm.addEventListener("submit", handleMessageSubmit);
nicknameForm.addEventListener("submit", handleNicknameSubmit);
