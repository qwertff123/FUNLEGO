const imgOpt = require("../service/img");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const process = require("process");
const Img = require("../model/img");
const imgPath = path.join(process.cwd(), "/public/images");
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, imgPath);
    },
    filename(req, file, cb) {
        console.log(file)
        const extname = path.extname(file.originalname);
        const filename = Date.now() + extname;
        req.filePath = "http://127.0.0.1:8886/public/images/" + filename;
        cb(null, filename)
    }
});
const upload = multer({
    storage
})
/**
 * 获取商品的图片
 */
router.get("/img", async (req, res) => {
    const goodsId = req.query.goodsId;
    const result = await imgOpt.getImgSrc(goodsId);
    res.send({
        status: "success",
        data: result
    })
});

/**
 * 上传商品图片
 */
router.post("/imgForGoods", upload.single("img"), async (req, res) => {
    const {
        goodsId
    } = req.body;
    const result = await imgOpt.createImgSrc_goods(goodsId, req.filePath);
    res.send({
        status: "success",
        msg: "上传成功",
        data : result
    })
});

router.delete("/img", async (req, res) => {
    const imgId = req.body.id;
    console.log(imgId)
    const {
        src
    } = await imgOpt.getImgById(imgId);
    await fs.rm(path.join(process.cwd(), new URL(src).pathname));
    await imgOpt.removeImgSrc(imgId);
    res.send({
        status: "success",
        msg: "删除成功",
    });
});

router.get("/img/:id", async (req, res) => {
    const info = await imgOpt.getImgById(req.params.id);
    res.send({
        status: "success",
        data: info
    })
})
module.exports = router;