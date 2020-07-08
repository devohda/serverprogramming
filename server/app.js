const express = require("express");
const http = require("http");
const middleware = require("./middleware/time");

const app = express();

// 팀원들의 localhost 환경에서도 cors 정책에 문제되지 않도록 함
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// API 라우터
app.use("/api", middleware.dateNow, require("./routes/api"));

// promise error 핸들링
process.on("unhandledRejection", (reason, promise) => {
  // console.log(reason, promise);
});

// 지정하지 않은 API 경로에 대한 response
app.use((req, res, next) => {
  res.status(404).json({
    error: "404 not found",
  });
});

// Express 서버 구동
app.set("port", process.env.PORT || 8080);

http.createServer(app).listen(app.get("port"), () => {
  console.log("2020-여름학기 서버프로그래밍설계 TEAM 3");
});
