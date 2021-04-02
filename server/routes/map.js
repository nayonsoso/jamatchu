const express = require("express")
const bodyParser = require("body-parser")
const router = express.Router()

const mysql = require("mysql")
const conn = mysql.createConnection({
    connectionLimit: 10,
    host: "rds-mysql.czcx3u99qijn.ap-northeast-2.rds.amazonaws.com",
    user: "admin",
    port: "3306",
    password: "12345678",
    database: "table_connect",
})
conn.connect()

router.get("/", function(req, res) {
    res.send({ err: "ERR" })
})

router.post("/", function(req, res) {
    var _mbti = req.session.user_mbti;
    // 로그인 했을때, db에 mbti 저장
    res.send({mbti:_mbti});
})

module.exports = router

