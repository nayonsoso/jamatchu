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
    let id = req.body.i_id;
    let question = req.body.i_question;
    let asw = req.body.i_asw;
    var sql = "SELECT * FROM user WHERE user_id = ? AND user_q=? AND user_a=?;"
    conn.query(sql,[id, question, asw],function(err, rs){
        if(Object.keys(rs).length===0){
            let _check = 1;
            res.send({check:_check});
        }
        else{
            let _check = 0;
            let _q = rs[0].user_q; //왜 이걸 찾을 수 없다는거지? // 왜 비정상일때도 넘어가는거지?
            let _a = rs[0].user_a;
            let _id = rs[0].user_id;
                res.send({q:_q,a:_a,check:_check, id:_id});
            }
        })
    })
module.exports = router

