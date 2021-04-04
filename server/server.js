const express = require("express")
const app = express()
const path = require('path');
const bodyParser = require("body-parser")
const session = require("express-session")
const MySQLStore = require("express-mysql-session")(session)
const cors = require("cors")
app.use(cors())
const PORT = process.env.PORT || 5000;

app.use(
  session({
    secret: "any", // 보안을 위한 키
    resave: false, // 권장값
    saveUninitialized: true, // 권장값
    store: new MySQLStore({
      connectionLimit: 10,
      host: "rds-mysql.czcx3u99qijn.ap-northeast-2.rds.amazonaws.com",
      user: "admin",
      port: "3306",
      password: "12345678",
      database: "table_connect",
    }),
  })
)

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

//템플릿엔진 설정
app.set("view engine", "pug")
app.use(express.json())
//정적 미들웨어
app.use(express.static("public"))
//post 미들웨어
app.use(bodyParser.urlencoded({ extended: false }))

var addBoardRouter = require("./routes/addBoard")
var boardDetailRouter = require("./routes/boardDetail")
var boardListRouter = require("./routes/boardList")
var deleteBoardRouter = require("./routes/deleteBoard")
var updateBoardRouter = require("./routes/updateBoard")
var commentRouter = require("./routes/comment")
var authRouter = require("./routes/auth")
var testRouter = require("./routes/test")
var testResultRouter = require("./routes/testResult")
var idFindRouter = require("./routes/find_id")
var pwdFindRouter = require("./routes/find_password")
var pwdResetRouter = require("./routes/reset_pwd")
var mapRouter = require("./routes/map")


app.use("/add", addBoardRouter)
app.use("/detail", boardDetailRouter)
app.use("/list", boardListRouter)
app.use("/delete", deleteBoardRouter)
app.use("/update", updateBoardRouter)
app.use("/comment", commentRouter)
app.use("/auth", authRouter)
app.use("/test", testRouter)
app.use("/test_result", testResultRouter)
app.use("/find_id", idFindRouter)
app.use("/find_password", pwdFindRouter)
app.use("/reset_pwd", pwdResetRouter)
app.use("/map", mapRouter)



//home
app.post("/", function(req, res) {
  // session 유무에 따라 달라지게
  if (req.session.user_id) {
    // 로그아웃 뜨게
    res.send({ id: req.session.user_id, nickName: req.session.user_name, loginCheck: true })
  } else {
    res.send({ id: "", nickName: "", loginCheck: false })
  }
})

// 리액트 정적 파일 제공
app.use(express.static(path.join(__dirname, 'food/build')));
// 라우트 설정
app.get('*', (req, res) => {
  res.sendFile(path.join('./'+__dirname+'/food/build/index.html'));
});

/*
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
*/

// 로그아웃
app.post("/logout", function(req, res) {
  delete req.session.user_id
  delete req.session.user_name
  req.session.save(function() {
    res.send()
  }) // redirect 가 있는경우, 저장하기 전에 redirect가 되는걸 방지
})
app.listen(PORT, console.log(PORT,"번 포트가 실행되었습니다."));