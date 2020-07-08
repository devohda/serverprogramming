// API 주소 및 메소드 정의 라우터
const router = require("express").Router();
const search = require("./search");

router.get("/list", search.list);
router.get("/tour", search.tour);

module.exports = router;
