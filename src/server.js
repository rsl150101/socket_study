import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();
const PORT = 3000;

//* 뷰 엔진 설정
app.set("view engine", "pug");
app.set("views", __dirname + "/views"); //- views 경로 설정

//* static 폴더 지정
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  return res.render("home");
});

const handleListen = () => {
  console.log(`✅ HTTP 서버가 연결되었습니다. http://localhost:${PORT}`);
};

//* 기존의 서버 구축
//// app.listen(PORT,handleListen)

//* WebSocket 를 사용하기 위해 서버 생성
const server = http.createServer(app);
//- 기존의 app.listen 은 생성과 실행이 같이 되어 서버에 접근할 수 없었는데 http 메서드를 통해 서버를 생성하여 서버에 접근할 수 있음

//* WebSocket server
const wsSever = new WebSocket.Server({ server });
//- http 서버와 WebSocket 서버를 같이 사용함
//- ws.Server({server : WebSocket 에 연결할 HTTP 서버, port : WebSocket 연결시 사용할 port 로 생략시 server 에 연결된 HTTP 서버의 포트를 사용 })
//! 항상 http 서버와 WebSocket 서버를 같은 port 로 함께 만들지 않아도 됨

//* 브라우저가 연결된건 알지만 몇 명이 연결되었는진 알 수 없어 가짜 socket 데이터 베이스로 구현
const sockets = []; //- socket 이 연결될 때 마다 담길 배열

//* WebSocket Connection Event
wsSever.on("connection", (socket) => {
  //- 매개변수 socket 은 연결된 브라우저를 뜻함
  sockets.push(socket); //- 가짜 socket 데이터베이스에 추가
  socket.ninkname = "Anonymous"; //- 익명의 유저가 메시지를 보낼 경우도 존재하기 때문에 초기에 익명 설정
  console.log("✅ WebSocket : 서버가 브라우저에 연결되었습니다.");
  socket.on("close", () => {
    //- 브라우저와 socket 연결이 해제되었을 때 이벤트
    console.log("❌ WebSocket : 브라우저와 연결이 해제되었습니다.");
  });
  //socket.send("이 메시지는 서버로부터 전달됨"); //- send 는 브라우저로 message 이벤트와 함께 내용을 전달
  socket.on("message", (message) => {
    const parsed = JSON.parse(message);
    console.log(parsed.type);
    switch (parsed.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(`${socket.ninkname} : ${parsed.payload}`)
        );
        break;
      case "nickname":
        socket.ninkname = parsed.payload;
        break;
    }
  });
});
//- on method 는 backend 에 연결된 사람의 정보(socket)를 주는데 callback 함수로 정보(socket)를 받음

//* WebSocket 위한 서버 구축
server.listen(PORT, handleListen);
