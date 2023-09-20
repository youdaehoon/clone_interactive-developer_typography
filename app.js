const express = require("express");
const path = require("path");

const app = express();
const port = 3000; // 포트 번호는 필요에 따라 변경 가능

// 정적 파일 (예: HTML, CSS, JavaScript)을 제공하기 위해 Express에게 "public" 디렉토리를 사용하도록 지시합니다.
app.use(express.static(path.join(__dirname, "public")));

app.use("/images", express.static(path.join(__dirname, "public/images")));

// "/" 경로에 접속하면 "index.html" 파일을 반환합니다.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 서버를 시작합니다.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
