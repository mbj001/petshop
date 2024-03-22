const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const conn = require("../config/mysql_config");

router.post("/availableMileage", (req, res) => {
    console.log("router.post('/clientModal/availableMileage')");
    
    const select_client_query = `select available_mileage from client where ?`;
    conn.query(select_client_query, [{user_id: req.body.user_id}], (err, select_client_result, fields) => {
        if(err){
            res.json(-1);
        }
        else{
            res.json(select_client_result[0].avilable_mileage);
        }
    })
})


module.exports = router;