import express from "express";
import http from "http";
import SocketIO from "socket.io";

const app = express();
const PORT = 3000;

//* 뷰 엔진 설정
app.set("view engine", "pug");
app.set("views", __dirname + "/views"); //- views 경로 설정

//* static 폴더 지정
app.use("/public", express.static(__dirname + "/public"));

//* route API
app.get("/", (req, res) => {
  return res.render("socket-home");
});

//* Listen handle function
const handleListen = () => {
  console.log(`✅ HTTP 서버가 연결되었습니다. http://localhost:${PORT}`);
};

//* 서버 생성
const server = http.createServer(app);

//* socket.io 서버 생성
const io = SocketIO(server);

//* socket.io 서버 연결
io.on("connection", (socket) => {
  socket.on("enterRoom", (msg) => {
    console.log(msg);
  });
});

//* socket.io 위한 서버 구축
server.listen(PORT, handleListen);
