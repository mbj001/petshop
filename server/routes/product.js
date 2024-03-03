const express = require("express");
const conn = require("../config/mysql_config");

const router = express.Router();



router.get("/:detail", (req, res) => {
    console.log("router.get('/product/:detail')");
    // console.log(req.params.detail);
    const select_feed_query = 'select * from menu where ?';
    conn.query(select_feed_query, [{division: req.params.detail}], (err, select_feed_result, fields) => {
        if(err){
            console.error(err);
        }
        else{
            res.send(select_feed_result);
        }
    })
    return ;
})


module.exports = router;