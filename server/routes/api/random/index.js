// API 주소 및 메소드 정의 라우터
const router = require("express").Router();
const random = require("./random");

router.get("/pick", random.pick);

module.exports = router;
