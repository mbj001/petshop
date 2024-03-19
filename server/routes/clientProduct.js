const express = require("express");
const conn = require("../config/mysql_config");

const router = express.Router();



router.get("/:detail", (req, res) => {
    console.log("router.get('/clientProduct/:detail')");
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
    console.log("router.get('/clientProduct/productDetail/:menu_id')");
    
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

router.get("/imagelist/:menu_id", (req, res) => {
    console.log("router.get('/clientProduct/imagelist/:menu_id')");

    const select_detail_query = `select * from menu_detail where ? order by image_num asc`;
    conn.query(select_detail_query, [{menu_id: req.params.menu_id}], (err, select_detail_result, fields) => {
        if(err){
            console.error(err)
        }
        else{
            res.send(select_detail_result);
        }
    })
})

router.get("/relativeList/:division", (req, res) => {
    console.log("router.get('/clientProduct/relativeList/:division')");

    const select_menu_query = `select * from menu where ? order by rand() limit 6`;
    console.log(req.params);
    conn.query(select_menu_query, [{division: req.params.division}], (err, select_menu_result, fields) => {
        if(err){
            console.log(err);
        }
        else{
            res.json(select_menu_result);
        }
    })
    return ;
})

module.exports = router;