/**
 * 用于抓取图片网站的图片资源并随机组成 
 */
const Mock = require("mockjs");
const axios = require("axios");
const cheerio = require("cheerio");
const resource = new Promise(async (resolve) => {
    const html1 = await axios.get("https://www.hippopx.com/zh/");
    const $ = cheerio.load(html1.data);
    const src = [];
    $("#flow li img").each(function () {
        src.push($(this).prop("src"));
    });
    resolve(src);
});

module.exports = async function getSrc() {
    const srcList = await resource;
    return function (min,max) {
        return randomArray(srcList,min,max);
    }
};

function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function shuffle(array) {
    const arr = [...array];
    return arr.sort(() => 0.5 - Math.random());
}

function randomArray(array, min, max) {
    const length = random(min, max);
    const arr = shuffle(array);
    return arr.splice(0, length);
}