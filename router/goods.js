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
    console.log(username);
    // console.log(result.issale)
    res.send({
        status : "success",
        data : result
    })
});


/**
 * 添加商品
 */
router.post("/goods",async (req,res)=>{
    console.log(req.body);
    const info = req.body;
    const username = req.username;
    await goodsOpt.addGoods(username,info);
    res.send({
        status : "success",
        msg : "添加成功",
        data : null
    })
});

/**
 * 修改商品
 */
router.put("/goods",async (req,res)=>{
    const info = req.body;
    if(!info.id){
        throw Error("必须提供商品Id")
    }
    const username = req.username;
    //更改商品信息
    await goodsOpt.updateGoods(username,info.id,info);
    await tagOpt.updateGoodsTags(info.id,info.tags);
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
})
module.exports = router;