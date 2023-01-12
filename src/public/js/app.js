//* frontend 에서 backend 연결
const socket = new WebSocket(`ws://${window.location.host}`) //- 여기서 socket은 서버로의 연결을 뜻함

//* 서버로 socket 연결이 되었을 때
socket.addEventListener("open",()=>{
    console.log("✅ WebSocket : 브라우저가 서버에 연결되었습니다.")
})

//* 서버로부터 전달된 message 이벤트를 받았을 때
socket.addEventListener("message",(message)=>{ //- 서버에서 send 로 보낸 message 이벤트와 data를 받아옴
    console.log(`서버로부터 전달된 메시지 : `,message.data)
})

//* 서버로 socket 연결이 해제되었을 때
socket.addEventListener("close",()=>{
    console.log("❌ WebSocket : 서버와 연결이 해제되었습니다.")
})

setTimeout(()=>{
    socket.send("이 메시지는 브라우저로부터 전달됨")
},5000
)