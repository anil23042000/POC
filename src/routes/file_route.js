const express = require("express");
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const router = express.Router();
const controller = require("../controller/file_controller")
var mammoth = require("mammoth");
var multer = require('multer');
const fs = require('fs');
const path = require('path');
const xlsxFile = require('read-excel-file/node');
const { table } = require("console");

//creating storage
const storageEngin = multer.diskStorage({
    //giving destination for strong file
    destination: function (request, file, callback) {
        console.log("hi")
        callback(null, "./uploads/")
    },

    //giving filename
    filename: function (request, file, callback) {
        callback(null, file.originalname)
    }
});

const upload = multer({ storage: storageEngin })



router.get("/", controller.getData);
//routing post method for uploading new info and storing file to folder 
router.post("/upload", upload.single("fileName"), controller.uploadFile);

//routing get method for listing all project details
router.get("/list", controller.listAll);

//routing get method for reading one file 
router.get("/:id", controller.readData);

//routing get method for deleting single fileinfo
router.get("/delete/:id", controller.deletesingle);

//routing get method for getting one file for updateing
router.get("/update/:id", controller.updateFile);

//routing post method for updating fileinfo and storing new file to folder 
router.post("/updateone", upload.single("fileName"), controller.updateOneFile);



module.exports = router;