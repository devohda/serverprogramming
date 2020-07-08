// API 주소 및 메소드 정의 라우터
const router = require("express").Router();
const rank = require("./rank");

router.get("/list", rank.list);
router.get("/tour", rank.tour);

module.exports = router;
