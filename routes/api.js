var express = require("express");
var authRouter = require("./auth");
var adminRouter = require("./admin");


var app = express();

app.use("/auth/", authRouter);
app.use("/admin/", adminRouter);


module.exports = app;