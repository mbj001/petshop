const express = require("express");
const router = express.Router();
const conn = require("../config/mysql_config");

router.get("/", (req, res) => {
    console.log("router.get('/serverMenu')");

    const select_menu_query = "select * from menu";

    conn.query(select_menu_query, (err, select_menu_result, fields) => {
        if(err){
            console.error(err);
        }
        else{
            res.render("menulist", {Menulist: select_menu_result});
        }
    })
    return ;
})

router.post("/search", (req, res) => {
    console.log("router.post('/serverMenu/search')");
    
    const select_search_query = `select * from menu where name like "%${req.body.search_val}%"`;
    conn.query(select_search_query, (err, select_search_result, fields) => {
        if(err){
            console.error(err);
        }
        else{
            res.render("menulist", {Menulist: select_search_result, search_val: req.body.search_val});
        }
    })
})

router.post("/addMenu", (req, res) => {
    console.log("router.post('/serverMenu/addMenu')");

    const insert_search_query = `insert into menu (division, name, price, accumulate_mileage, image) values (?, ?, ?, ?, ?)`;
    conn.query(insert_search_query, [req.body.add_division, req.body.add_name, req.body.add_price, req.body.accumulate_mileage, req.body.add_image], (err, insert_search_result, fields) => {
        if(err){
            console.error(err);
        }
        else{
            res.send("<script> alert('메뉴 등록 완료'); location.href='/serverMenu'; </script>");
        }
    })
})

router.post("/edit", (req, res) => {
    console.log("router.post('/serverMenu/edit')");
    // console.log(req.body);
    const update_query = `update menu set division="${req.body.division}", name="${req.body.name}", price=${req.body.price}, accumulate_mileage=${req.body.accumulate_mileage}, total_sale=${req.body.total_sale}, image="${req.body.image}", likey=${req.body.likey} where menu_id=${req.body.menu_id}`;
    conn.query(update_query, (err, update_result, fields) => {
        if(err){
            console.error(err);
        }
        else{
            res.json(1);
        }
    })
})

router.get("/delete/:menu_id", (req, res) => {
    console.log("router.get('/delete/:menu_id')");

    const delete_query = `delete from menu where ?`;
    conn.query(delete_query, [{menu_id: req.params.menu_id}], (err, delete_result, fields) => {
        if(err){
            console.error(err);
        }
        else{
            res.json(1);
        }
    })
})

module.exports = router;