const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    console.log("router.get('/')");

    res.render("main");
})


module.exports = router;
