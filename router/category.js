const categoryOpt = require("../service/category");
const express = require("express");
const router = express.Router();

/**
 * 获取所有的类别
 */
router.get("/category", async (req, res) => {
    let result = await categoryOpt.getAllCategory();
    result = JSON.parse(JSON.stringify(result));
    res.send({
        status: "success",
        data: result
    })
});


/**
 * 获取所有的类别与子类
 */
// router.get("/getAllCategoryAndSub", async (req, res) => {
//     const result = await categoryOpt.getAllCategoryAndSub();
//     // console.log(result);
//     res.send({
//         status: "success",
//         data: result.map(val => {
//             return {
//                 name: val.name,
//                 subCategories: val.sub_categories
//             }
//         })
//     })
// })

/**
 * 获取一个类别下的所有子类别
 */
// router.get("/getSubCategory", async (req, res) => {
//     const category = req.query.category;
//     console.log(category);
//     const result = await categoryOpt.getSubCategory(category);
//     res.send({
//         status: "success",
//         data: result
//     })
// })

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
router.post("/category", async (req, res) => {
    const categoryInfo = req.body;
    const id = await categoryOpt.createCategory(categoryInfo);
    const result = await categoryOpt.getCategoryById(id);
    res.send({
        status: "success",
        msg: "添加成功",
        data : result
    })
});
/**
 * 更改类信息
 */
router.put("/category", async (req, res, next) => {
    const {
        id
    } = req.body;
    try {
        await categoryOpt.updateCategory(req.body);
    } catch {
        return next(Error("子类已被占用，无法删除"));
    }

    const result = await categoryOpt.getCategoryById(id);
    res.send({
        status: "success",
        msg: "修改成功",
        data: result
    })
})

router.delete("/subCategory", async (req, res,next) => {
    try {
        await categoryOpt.removeSubCategory(req.body.id);
    } catch (err) {
        return next(err);
    }
    res.send({
        status : "success",
        mag : "删除成功"
    })
})

/**
 * 根据类Id获取详细信息
 */
router.get("/category/:id", async (req, res) => {
    const result = await categoryOpt.getCategoryById(req.params.id);
    res.send({
        status: "success",
        data: result
    })
})
module.exports = router;