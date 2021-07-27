const categoryOpt = require("../service/category");
const express = require("express");
const Category = require("../model/category");
const router = express.Router();

/**
 * 获取所有的类别
 */
router.get("/getAllCategory",async (req,res)=>{
    const result = await categoryOpt.getAllCategory();
    res.send({
        status : "success",
        data : result.map(val=>val.name)
    })
});

/**
 * 获取一个类别下的所有子类别
 */
router.get("/getSubCategory",async (req,res)=>{
    const category = req.query.category;
    console.log(category);
    const result = await categoryOpt.getSubCategory(category);
    res.send({
        status : "success",
        data : result
    })
})


module.exports = router;