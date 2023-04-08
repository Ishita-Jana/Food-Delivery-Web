const express = require('express')
const router = express.Router()
const {response} = require('express')

router.post("/foodData", (req,res)=>{
    try {
        // console.log(global.food_items);
        console.log("hello roi")
        res.send([global.food_items, global.food_Category])
    } catch (error) {
        console.log("error");
        res.send("server error");
    }
    
})
module.exports = router;