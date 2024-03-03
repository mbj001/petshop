const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const nunjucks = require("nunjucks");
const cors = require("cors");



dotenv.config();

const app = express();
const conn = require("./config/mysql_config");

const serverMain = require("./routes/serverMain")
const product = require("./routes/product");

app.set("port", 8080);
app.set("view engine", "html");

// app.use("/", express.static(path.join(__dirname, "public")));

nunjucks.configure("views", {
    express: app,
    watch: true
});



app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use("/serverMain", serverMain);
app.use("/product", product);

app.get("/main/mainBest", (req, res) => {
    console.log("app.get('/main/mainBest')");
    const select_menu_query = "select * from menu order by total_sale desc limit 5";
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