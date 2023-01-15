//* 서버로 socket.io 연결
const socket = io(); //- 템플릿에서 이미 설치했기 때문에 socket.io 함수를 바로 사용 가능함
//- io function 은 알아서 socket.io 를 실행하고 있는 서버를 찾음

const roomDiv = document.getElementById("welcome");
const roomForm = roomDiv.querySelector("form");

function handleRoomSubmit(event) {
  event.preventDefault();
  const roomInput = roomForm.querySelector("input");
  socket.emit("enterRoom", { payload: roomInput.value }); //- message 이벤트로만 보내는 send 와 달리 원하는 이벤트명과 함께 데이터를 전달할 수 있다.
  roomInput.value = "";
}

roomForm.addEventListener("submit", handleRoomSubmit);
