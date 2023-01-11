import express from "express";

const app = express();
const PORT = 3000;

//* 뷰 엔진 설정
app.set("view engine", "pug")
app.set("views", __dirname + "/views") // views 경로 설정

//* static 폴더 지정 
app.use("/public", express.static(__dirname + "/public"))

app.get("/",(req,res)=>{
    return res.render("home")
})

app.listen(PORT,()=>{
    console.log(`✅ 서버가 연결되었습니다. http://localhost:${PORT}`)
})