const tagOpt = require("../service/tag");
const express = require("express");
const router = express.Router();

/**
 * 获取商品标签
 */
router.get("/getTags", async (req, res) => {
    const goodsId = req.query.goodsId;
    const result = await tagOpt.getTags(goodsId);
    const tags = result.tags;
    res.send({
        status: "success",
        data: tags.map(tag => tag.name)
    })
})

/**
 * 获取所有的标签
 */
router.get("/getAllTags", async (req, res) => {
    const tags = await tagOpt.getAllTags();
    res.send({
        status: "success",
        data: tags.map(tag => tag.name)
    })
});

/**
 * 添加标签
 */
router.post("/tag", async (req, res) => {
    const name = req.body.name;
    await tagOpt.addTag(name);
    res.send({
        status: "success",
        msg: "添加成功"
    })
})

/**
 * 删除标签
 */
router.delete("/tag", async (req, res, next) => {
    const name = req.body.name;
    await tagOpt.deleteTag(name);

    res.send({
        status: "success",
        msg: "删除成功"
    })
})
module.exports = router;