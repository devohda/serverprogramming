// 주소 정의 라우터
const router = require("express").Router();
const random = require("./random");
const rank = require("./rank");
const search = require("./search");

router.use("/random", random);
router.use("/rank", rank);
router.use("/search", search);

module.exports = router;
