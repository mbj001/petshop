const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');
// const mysql2 = require("mysql2/promise");
const conn = require("../config/mysql_config");
require("dotenv").config();
// const pool = require("../config/mysqlPool");

module.exports = () =>{
    passport.use( new LocalStrategy({
        usernameField: 'user_id',
        passwordField: 'user_pw',
        passReqToCallback: true,
        session: true
    }, async(req, inputAdminId, inputAdminPw, done)=>{
        const configLogin = {
            isAdmin: req.body.isAdmin
        };
        try{
            console.log("passport -> localstorage.js");
            const verifiedUserInfo = {
                id: '',
                isAdmin: ''
            };
            // 아직 필요 x 서버 구현할 때 수정
            if(configLogin.isAdmin === 'administrator'){
                const selectAdminQuery = `SELECT admin_id, admin_pw FROM administrator WHERE admin_id = '${inputAdminId}'`;
                // const [selectedInfo] = await pool.query(selectAdminQuery);
                conn.query(selectAdminQuery, (err, selectedInfo, fields) => {
                    if(err){
                        console.log(err);
                    }
                    else{
                        if(selectedInfo){
                            if(selectedInfo[0].admin_pw == inputAdminPw){ 
                                verifiedUserInfo.id = selectedInfo[0].user_id;
                                verifiedUserInfo.isAdmin = 'admin';
                                done(null, verifiedUserInfo);
                            }else{
                                done(null, false, {message: "비밀번호가 일치하지 않습니다."});
                            }
                        }else{
                            done(null, false, {message: "존재하지 않는 사용자입니다."});
                        }
                    }
                })
            }else if(configLogin.isAdmin === 'client'){
                const getClientDataQuery = `SELECT user_id, user_pw FROM client WHERE user_id = '${inputAdminId}'`;
                // const [clientData] = await pool.query(getClientDataQuery);
                conn.query(getClientDataQuery, async (err, clientData, fields) => {
                    if(err){
                        console.error(err);
                    }
                    else{
                        if(clientData[0]?.user_id){
                            const doesMatch = await bcrypt.compare(inputAdminPw, clientData[0].user_pw);
                            if(doesMatch){ 
                                verifiedUserInfo.id = clientData[0].user_id;
                                verifiedUserInfo.isAdmin = 'client';
                                done(null, verifiedUserInfo);
                            }else{
                                done(null, false, {message: "비밀번호가 일치하지 않습니다."});
                            }
                        }else{
                            done(null, false, {message: "존재하지 않는 사용자입니다."});
                        }
                        
                    }
                })
            }            
        }catch(error){
            console.error(error);
            done(error);
        }
    }));
}