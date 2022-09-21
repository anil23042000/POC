const express = require("express");
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const router = express.Router();
const controller = require("../Controller/controller")


router.get("/get", controller.getData);
router.post("/upload", controller.insertData)


module.exports= router;