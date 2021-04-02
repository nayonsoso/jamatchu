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
    let n_pwd = req.body.new_pwd;
    let id = req.body.i_id;
    var sql = "UPDATE user SET user_password = ? WHERE user_id=?;"
    conn.query(sql,[n_pwd, id ],function(err, rs){
        if(err){
            res.send({check:1, pwd:n_pwd});
        }
        res.send({check:0,pwd:n_pwd});
    })
})
module.exports = router

