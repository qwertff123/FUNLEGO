const categoryOpt = require("../service/category");
const express = require("express");
const Category = require("../model/category");
const router = express.Router();

/**
 * 获取所有的类别
 */
router.get("/category",async (req,res)=>{
    const result = await categoryOpt.getAllCategory();
    res.send({
        status : "success",
        data : result.map(val=>val.name)
    })
});


/**
 * 获取所有的类别与子类
 */
router.get("/getAllCategoryAndSub",async (req,res)=>{
    const result = await categoryOpt.getAllCategoryAndSub();
    // console.log(result);
    res.send({
        status : "success",
        data :result.map(val=>{
            return {
                name : val.name,
                subCategories : val.sub_categories
            }
        })
    })
})

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

/**
 * 新增一个类目
 */
// router.post("/category",async (req,res)=>{
//     const category = req.body.category;
//     const result = await categoryOpt.addCategory(category);
//     console.log(result);
//     res.send({
//         status : "success",
//         msg : "添加成功"
//     })
// });

/**
 * 新增类目信息（包括子类）
 */
router.post("/category",async (req,res)=>{
    console.log(req.admin);
    const categoryInfo = req.body;
    const result = await categoryOpt.createCategoryAndSub(categoryInfo);
    console.log(result);
    res.send({
        status : "success",
        msg : "添加成功"
    })
});
/**
 * 更改类目名字
 */
router.put("/category",async (req,res)=>{
    const { newCategory,oldCategory } = req.body;
    const result = await categoryOpt.updateCategory(oldCategory,newCategory);
    res.send({
        status : "success",
        msg : "修改成功"
    })

})
module.exports = router;