const tagOpt = require("../service/tag");
const express = require("express");
const router = express.Router();

router.get("/tag",async (req,res)=>{
    const goodsId = req.query.goodsId;
    const result = await tagOpt.getTags(goodsId);
    const tags = result.tags;
    res.send({
        status : "success",
        data : tags.map(val=>val.name)
    })
})

module.exports = router;