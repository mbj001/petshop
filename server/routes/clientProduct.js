const express = require("express");
const conn = require("../config/mysql_config");

const router = express.Router();



router.get("/:detail", (req, res) => {
    console.log("router.get('/serverProduct/:detail')");
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

router.get("/productDetail/:menu_id", (req, res) => {
    console.log("router.get('/serverProduct/productDetail/:menu_id')");
    
    const select_menu_query = "select * from menu where ?";
    conn.query(select_menu_query, [{menu_id: req.params.menu_id}], (err, select_menu_result, fields) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(select_menu_result);
        }
    })

    return ;
})


module.exports = router;