const express = require("express");
const conn = require("../config/mysql_config");

const router = express.Router();

router.get("/popular", (req, res) => {
    console.log("router.get('/serverMain/popular')");

    const select_popular_query = "select * from menu order by total_sale desc limit 50";
    conn.query(select_popular_query, (err, select_popular_result, fields) => {
        if(err){
            console.error(err);
        }
        else{
            res.send(select_popular_result);
        }
    })
    return ;
})

module.exports = router;