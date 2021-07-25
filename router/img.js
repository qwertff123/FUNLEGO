const imgOpt = require("../service/img");
const express = require("express");
const router = express.Router();

router.get("/img",async (req,res)=>{
    const goodsId = req.query.goodsId;
    console.log(goodsId);
    const result = await imgOpt.getImgSrc(goodsId);
    res.send({
        status : "success",
        data : result.map(val=>val.src)
    })
});

module.exports = router;