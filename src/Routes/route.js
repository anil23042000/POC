const express = require("express");
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const router = express.Router();
const controller = require("../Controller/controller")
var mammoth = require("mammoth");
var multer = require('multer');
const fs = require('fs');
const path = require('path');
const xlsxFile = require('read-excel-file/node');
const { table } = require("console");

const storageEngin = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, "./uploads/")
    },
    filename: function (request, file, callback) {
        callback(null, file.originalname)
    }
});
const upload = multer({ storage: storageEngin })

router.get("/", controller.getData);
router.post("/upload", upload.single("fileName"), controller.uploadFile);
router.get("/list", controller.listAll);
router.get("/:id", controller.readData);
router.get("/delete/:id", controller.deletesingle);


module.exports = router;