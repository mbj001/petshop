const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const nunjucks = require("nunjucks");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passportConfig = require("./passport/index");
const MySQLStore = require('express-mysql-session');
const MySQLStoreSession = MySQLStore(session);

const conn = require("./config/mysql_config");

const app = express();

// server
const serverMain = require("./routes/serverMain");
const serverMenu = require("./routes/serverMenu");

// client
const clientMain = require("./routes/clientMain")
const clientProduct = require("./routes/clientProduct");
const client = require("./routes/client");
const clientModal = require("./routes/clientModal")

app.set("port", 8080);
app.set("view engine", "html");

app.use("/", express.static(path.join(__dirname, "public")));

nunjucks.configure("views", {
    express: app,
    watch: true
});



app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    store: new MySQLStoreSession({
        host: '127.0.0.1',
        port: 3306,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASS,
        database: process.env.MYSQL_DB
    }),
    cookie:{
        maxAge: (3.6e+6) * process.env.COOKIE_MAXAGE,
        httpOnly: false,
        secure: false
    }
}));
app.use(passport.initialize());
app.use(passport.session());
passportConfig();


app.use("/", serverMain);
app.use("/serverMenu", serverMenu);


app.use("/clientMain", clientMain);
app.use("/clientProduct", clientProduct);
app.use("/client", client);


app.get("/main/mainBest", (req, res) => {
    console.log("app.get('/main/mainBest')");
    const select_menu_query = "select * from menu order by total_sale desc limit 6";
    conn.query(select_menu_query, (err, select_menu_result, fields) => {
        if(err){
            console.error(err);
        }
        else{
            res.send(select_menu_result);
        }
    })
    return;
})

app.use((req, res, next) => {
    const error = new Error("에러입니다.");
    error.status = 404;
    next(error);
})
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send('error');
})

app.listen(app.get("port"), () => {
    console.log(app.get("port") + "번 PORT OPEN !!!");
})