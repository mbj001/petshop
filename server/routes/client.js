const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const conn = require("../config/mysql_config");

const { isLoggedIn, isNotLoggedIn } = require("../middleWares/index");
const { login, logout } = require("../controller/auth");

router.post("/signup", (req, res) => {
    console.log("router.post('/client/signup')");
    // console.log(req.body);
    // console.log(process.env.SALT_ROUNDS);
    let signup_info = req.body.signup_info;
    console.log(signup_info);

    const user_pass_bcrypt = bcrypt.hashSync(signup_info.user_pw, Number(process.env.SALT_ROUNDS));

    const insert_query = `insert into client (user_id, user_pw, user_pw_confirm_number, user_pw_confirm_answer, user_name, user_address, user_phone, user_email, user_gender, user_birth, user_pet_info)
    values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
    conn.query(insert_query, [signup_info.user_id, user_pass_bcrypt, Number(signup_info.user_pw_confirm_number), signup_info.user_pw_confirm_answer, signup_info.user_name, signup_info.user_address, 
        signup_info.user_phone, signup_info.user_email, signup_info.user_gender, signup_info.user_birth, signup_info.user_pet_info], (err, insert_result, fields) => {
            if(err){
                console.log(err);
                res.json(-1);
            }
            else{
                res.json(1);
            }
        })
        return ;
})

// router.post("/login", (req, res) => {
//     console.log("router.post('/client/login')");

//     const select_client_query = `select user_pw from client where ?`;
//     console.log(req.body);
//     conn.query(select_client_query, [{user_id: req.body.user_id}], (err, select_client_result, fields) => {
//         if(err){
//             console.log(err);
//             res.json(-1);
//         }
//         else{
//             pw_compare_bcrypt = bcrypt.compareSync(req.body.user_pw, select_client_result[0].user_pw);

//             if(pw_compare_bcrypt === true){
//                 res.json(1);
//             }
//             else{
//                 res.json(-1);
//             }
//         }
//     })
// })

router.post("/login", isNotLoggedIn, login);
// router.get('/logout', isLoggedIn, logout);

router.post('/logout', (req,res)=>{
    console.log("router.post('/client/logout')");
    const removeSessionQuery = `DELETE FROM sessions WHERE session_id = ?`;
    conn.query(removeSessionQuery, [req.body.token], (error, rs, fields)=>{
        if(error){
            console.log(error);
            res.send({logoutSuccess: false});
        }else{
            res.send({logoutSuccess: true});
        }
    })
});

router.post("/getInfo", (req, res) => {
    console.log("router.post('/client/getInfo')");

    const select_user_query = `select *, date_format(user_birth, "%Y-%m-%d") as user_birth_format from client where ?`;
    conn.query(select_user_query, [{user_id: req.body.user_id}], (err, select_user_result, fields) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(select_user_result[0]);
        }
    })
})

router.post("/addOrder", (req, res) => {
    console.log("router.post('/client/addOrder')");

    const insert_basket_query = `insert into basket (user_id, menu_id, count, total_price) values (?, ?, ?, ?)`;
    conn.query(insert_basket_query, [req.body.user_id, req.body.menu_id, req.body.count, Number(req.body.total_price)], (err, insert_basket_result, fields) => {
        if(err){
            console.log(err);
            res.json(-1);
        }
        else{
            // console.log(insert_basket_result);
            res.json(1);
        }
    })
    return ;
})

router.post("/basketInfo", (req, res) => {
    console.log("router.post('/client/basketInfo')");

    if(req.body.buyitnow === true){     // buy it now 클릭
        const select_basket_query = `select * from basket inner join menu on menu.menu_id = basket.menu_id where ? and payment = false order by basket_id desc limit 1`;
        conn.query(select_basket_query, [{user_id: req.body.user_id}], (err, select_basket_result, fields) => {
            if(err){
                console.log(err);
            }
            else{
                // console.log(select_basket_result);
                res.send(select_basket_result);
            }
        })
    }
    else if(req.body.buyitnow === false){
        const select_basket_query = 'select * from basket inner join menu on menu.menu_id = basket.menu_id where ? and payment = false order by basket_id desc';
        conn.query(select_basket_query, [{user_id: req.body.user_id}], (err, select_basket_result, fields) => {
            if(err){
                console.error(err);
            }
            else{
                if(select_basket_result.length ==0){
                    res.json(0);
                }
                else{
                    res.send(select_basket_result);
                }
            }
        })
    }
    return ;
})

router.post("/purchase", (req, res) => {
    console.log("router.post('/client/purchae')");

    const order_list = req.body.order_list;

    let update_basket_query = "update basket set payment = true where ";

    for(let i=0; i<order_list.length; i++){
        update_basket_query += "basket_id = " +order_list[i].basket_id;
        if(i !== order_list.length -1){
            update_basket_query += " or "
        }
    }

    

    conn.query(update_basket_query, (err, update_basket_result, fields) => {
        if(err){
            console.log(err);
        }
        else{
            res.json(1);
        }
    });
    return ;
})
module.exports = router;