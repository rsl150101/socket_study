import express from "express";

const app = express();
const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`✅ 서버가 연결되었습니다. http://localhost:${PORT}`)
})