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

    const insert_query = `insert into client (user_id, user_pw, user_pw_confirm_number, user_pw_confirm_answer, user_name, user_address_zone_code, user_address_basic, user_address_detail, user_phone, user_email,
        user_gender, user_birth, user_pet_info) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`
    conn.query(insert_query, [signup_info.user_id, user_pass_bcrypt, Number(signup_info.user_pw_confirm_number), signup_info.user_pw_confirm_answer, signup_info.user_name, signup_info.user_address_zone_code, 
        signup_info.user_address_basic, signup_info.user_address_detail, signup_info.user_phone, signup_info.user_email, signup_info.user_gender, signup_info.user_birth, signup_info.user_pet_info], (err, insert_result, fields) => {
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

router.post("/addBasket", (req, res) => {
    console.log("router.post('/client/addBasket')");

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
        const select_basket_query = `select * from basket inner join menu on menu.menu_id = basket.menu_id where ? order by basket_id desc limit 1`;
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
        const select_basket_query = 'select * from basket inner join menu on menu.menu_id = basket.menu_id where ? order by basket_id desc';
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

// 결제 완료
router.post("/purchase", (req, res) => {
    console.log("router.post('/client/purchae')");

    const order_list = req.body.order_list;

    let delete_basket_query = "delete from basket where ";
    let insert_order_query = "insert into order_payment (user_id, menu_id, count, amount_price) values ";
    let select_menu_query = "select menu_id, name, total_sale from menu where "
    for(let i=0; i<order_list.length; i++){
        delete_basket_query += "basket_id = " +order_list[i].basket_id;
        insert_order_query += "('" + order_list[i].user_id + "', " + order_list[i].menu_id + ", " + order_list[i].count + ", " + order_list[i].total_price + ")";
        select_menu_query += "menu_id = " + order_list[i].menu_id;
        if(i !== order_list.length -1){
            delete_basket_query += " or "
            insert_order_query += ", "
            select_menu_query += " or "
        }
    }

    
    // basket 테이블 delete
    conn.query(delete_basket_query, (err, delete_basket_result, fields) => {
        if(err){
            console.log(err);
        }
        else{
            // order_payment 테이블 insert
            conn.query(insert_order_query, (err, insert_order_result, fields) => {
                if(err){
                    console.log(err);
                }
                else{
                    // menu 테이블 total_sale 증가
                    conn.query(select_menu_query, (err, select_menu_result, fields) => {
                        if(err){
                            console.log(err);
                        }
                        else{
                            for(let i=0; i<order_list.length; i++){
                                for(let j=0; j<select_menu_result.length; j++){
                                    if(order_list[i].menu_id === select_menu_result[j].menu_id){
                                        select_menu_result[j].total_sale += order_list[i].count;
                                        break;
                                    }
                                }
                            }
                            let update_menu_query = "update menu set total_sale = CASE";
                            for(let i=0; i<select_menu_result.length; i++){
                                update_menu_query += " WHEN menu_id = " + select_menu_result[i].menu_id + " THEN " + select_menu_result[i].total_sale;
                            }
                            
                            update_menu_query += " END WHERE menu_id IN ("
                            for(let i=0; i<select_menu_result.length; i++){
                                update_menu_query += select_menu_result[i].menu_id;
                                if(i !== select_menu_result.length - 1){
                                    update_menu_query += ", "
                                }
                            }
                            update_menu_query += ")";
    
                            conn.query(update_menu_query, (err, update_menu_result, fields) => {
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    res.json(1);
                                }
                            })
                        }
                
                    })
                    
                }
            })

        }
    });
    return ;
})

router.post("/basketCount", (req, res) => {
    console.log("router.post('/client/basketCount')");

    const select_basket_query = `select count(*) as count from basket where ?`;
    conn.query(select_basket_query, [{user_id: req.body.user_id}], (err, select_basket_result, fields) => {
        if(err){
            console.log(err);
        }
        else{
            res.json(select_basket_result[0].count)
        }
    })
})

router.post("/addWishList", (req, res) => {
    console.log("router.post('/client/addWishList')");
    const insert_wishlist_query = `insert into wishlist (user_id, menu_id) values (?, ?)`;
    conn.query(insert_wishlist_query, [req.body.user_id, req.body.menu_id], (err, insert_wishlist_result, fields) => {
        if(err){
            console.log(err);
            res.json(-1);
        }
        else{
            res.json(1);
        }
    })
    return; 
})

// 관심상품 페이지
router.post("/wishlistInfo", (req, res) => {
    console.log("router.post('/client/wishlistInfo')");

    const select_wishlist_query = `select * from wishlist inner join menu on menu.menu_id = wishlist.menu_id where ?`;
    conn.query(select_wishlist_query, [{user_id: req.body.user_id}], (err, select_wishlist_result, fields) => {
        if(err){
            console.error(err);
            res.json(-1);
        }
        else{
            res.json(select_wishlist_result);
        }
    })
    return ;
})

// 관심상품 -> 삭제버튼 클릭
router.post("/delwishlist", (req, res) => {
    console.log("router.post('/client/delwishlist')");

    const delete_wishlist_query = `delete from wishlist where ? and ?`;
    conn.query(delete_wishlist_query, [{user_id: req.body.user_id}, {wishlist_id: req.body.wishlist_id}], (err, delete_wishlist_result, fields) => {
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

// 관심상품 -> 관심상품비우기 클릭
router.post("/clearWishList", (req, res) => {
    console.log("router.post('/client/clearWishList')");

    const delete_wishlist_query = `delete from wishlist where ?`;
    conn.query(delete_wishlist_query, [{user_id: req.body.user_id}], (err, delete_wishlist_result, fields) => {
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

router.post("/checkid", (req, res) => {
    console.log("router.post('/client/checkid')");

    const select_client_query = `select user_id from client where ?`;
    conn.query(select_client_query, [{user_id: req.body.user_id}], (err, select_client_result, fields) => {
        if(err){
            console.log(err);
            res.json(-1);
        }
        else{
            if(select_client_result.length === 0){
                res.json(1);
            }
            else{
                res.json(0);
            }
        }
    })
})
module.exports = router;