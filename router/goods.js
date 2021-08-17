const express = require("express");
const Goods = require("../model/goods");
const router = express.Router();
const goodsOpt = require("../service/goods");
const tagOpt = require("../service/tag");

/**
 * 获取商品
 */
router.get("/goods",async (req,res)=>{
    const username = req.username;
    const { page=1,limit=5 } = req.query;
    const result = await goodsOpt.getGoods(username,page,limit);
    // console.log(result.issale)
    res.send({
        status : "success",
        data : result
    })
});

/**
 * 获取过滤的商品列表信息
 */
router.get("/goods/filter",async (req,res)=>{
    const { condition,limit=5,page=1 } = req.query;
    const username = req.username;
    // console.log("123",condition);
    // console.log(JSON.parse(condition));
    const result = await goodsOpt.filter(username,JSON.parse(condition),limit,page);
    res.send({
        status : "success",
        msg :  "查询成功",
        data : result
    })
});

/**
 * 根据Id获取商品信息
 */
router.get("/goods/:id",async (req,res)=>{
    const goodsId = req.params.id;
    const info = await goodsOpt.getGoodsById(goodsId);
    res.send({
        status : "success",
        data : info
    })
});

/**
 * 添加商品
 */
router.post("/goods",async (req,res)=>{
    // console.log(req.body);
    const info = req.body;
    const username = req.username;
    const result = await goodsOpt.addGoods(username,info);
    res.send({
        status : "success",
        msg : "添加成功",
        data : result.id
    })
});

/**
 * 修改商品
 */
router.put("/goods",async (req,res)=>{
    const info = req.body;
    if(!info.id){
        throw Error("必须提供商品Id");
    }
    const username = req.username;
    //更改商品信息
    const result = await goodsOpt.updateGoods(username,info.id,info);
    console.log("结果",result)
    await tagOpt.updateGoodsTags(info.id,info.tags);
    console.log("修改了商品")
    res.send({
        status : "success",
        msg : "修改成功",
        data : null
    })
});



/**
 * 删除商品
 */
router.delete("/goods/:id",async (req,res)=>{
    const id = req.params.id;
    console.log(id)
    const username = req.username;
    await goodsOpt.deleteGoods(username,id);
    res.send({
        status : "success",
        msg : "删除成功",
        data : null
    })
});

/**
 * 根据关键字查询商品信息
 */
// router.get("/goods/findByKw",async (req,res)=>{
//     const { keyword,limit=5,page=0} = req.query;
//     const result = await goodsOpt.findGoodsByKw(keyword,limit,page);
//     res.send({
//         status : "success",
//         msg :  "查询成功",
//         data : result
//     })
// });

/**
 * 根据类名查询商品信息
 */
// router.get("/goods/findByCategory",async (req,res)=>{
//     const {category,limit = 5,page = 1} = req.query;
//     const result = await goodsOpt.findByCategory(category,limit,page);
//     res.send({
//         status : "success",
//         msg :  "查询成功",
//         data : result
//     })
// })


module.exports = router;