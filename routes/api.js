var express = require("express");
var authRouter = require("./auth");
var adminRouter = require("./admin");
var jobsRouter = require("./jobs");



var app = express();

app.use("/auth/", authRouter);
app.use("/admin/", adminRouter);
app.use("/jobs/", jobsRouter);



module.exports = app;