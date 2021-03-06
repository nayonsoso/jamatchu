const express = require("express")
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

router.get("/", function(req, res) {
    res.send({ err: "ERR" })
})

router.post("/", function(req, res) {
    if(req.session.user_id) { // 로그인 했을 때
        var sql = 'SELECT user_mbti FROM user WHERE user_id = ?';
        var user_id = req.session.user_id;
        conn.query(sql, [user_id], function (err, rs) {
            var user_mbti = rs[0].user_mbti;
            var _sql = 'SELECT * FROM result WHERE mbti = ?';
            conn.query(_sql, [user_mbti], function (err, rs) {
                var _menu = rs[0].menu;
                var _desc = rs[0].desc;
                var _map = rs[0].map;
                let _li = rs[0].li;
                res.send({menu: _menu, desc: _desc, map: _map, id: user_id, li:_li});
            })
        })
    }
    else { // 로그인 안했을 떄
        var user_mbti = req.session.user_mbti;
        var sql = 'SELECT * FROM result WHERE mbti = ?';
        conn.query(sql, [user_mbti], function (err, rs) {
            var _menu = rs[0].menu;
            var _desc = rs[0].desc;
            var _map = rs[0].map;
            let _li = rs[0].li;
            res.send({menu: _menu, desc: _desc, map: _map, id: user_id, li:_li});
        })
    }
})
module.exports = router
