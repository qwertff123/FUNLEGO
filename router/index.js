const userRouter = require("./user");
const goodsRouter = require("./goods");
const imgRouter = require("./img");
const tagRouter = require("./tag");
const categoryRouter = require("./category");
const authorization = require("./middleware/authorization");
const session = require("express-session")
const express = require("express");
const app = express();

//允许跨域
app.use((req,res,next)=>{
    res.set("Access-Control-Allow-Origin","http://127.0.0.1:8080");
    res.set("Access-Control-Allow-Headers",["content-type","authorization"]);
    next();
});

//校验用户身份
app.use(authorization({
    whiteList : ["/api/login","/api/register","/api/getCode"]
}));
app.use(express.urlencoded({
    extended : true
}));
app.use(express.json());

app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : "qwertff"
}));


app.use("/api",userRouter);
app.use("/api",goodsRouter);
app.use("/api",imgRouter);
app.use("/api",tagRouter);
app.use("/api",categoryRouter);

app.use((err,req,res,next)=>{
    res.send({
        status : "error",
        msg : err.message,
    })
});

app.listen(8886);