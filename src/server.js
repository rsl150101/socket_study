import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();
const PORT = 3000;

//* 뷰 엔진 설정
app.set("view engine", "pug")
app.set("views", __dirname + "/views") //- views 경로 설정

//* static 폴더 지정
app.use("/public", express.static(__dirname + "/public"))

app.get("/",(req,res)=>{
    return res.render("home")
})

const handleListen = ()=>{
    console.log(`✅ 서버가 연결되었습니다. http://localhost:${PORT}`)
}

//* 기존의 서버 구축
//// app.listen(PORT,handleListen)

//* WebSocket 를 사용하기 위해 서버 생성
const server = http.createServer(app)
//- 기존의 app.listen 은 생성과 실행이 같이 되어 서버에 접근할 수 없었는데 http 메서드를 통해 서버를 생성하여 서버에 접근할 수 있음

//* WebSocket server
const wsSever = new WebSocket.Server({server})
//- http 서버와 WebSocket 서버를 같이 사용함
//- ws.Server({server : WebSocket 에 연결할 HTTP 서버, port : WebSocket 연결시 사용할 port 로 생략시 server 에 연결된 HTTP 서버의 포트를 사용 })
//! 항상 http 서버와 WebSocket 서버를 같은 port 로 함께 만들지 않아도 됨

//* WebSocket 위한 서버 구축
server.listen(PORT,handleListen)