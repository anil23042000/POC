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
//  async (req, res, next) => {

//     console.log(req.file.filename)


//     xlsxFile('./uploads/' + req.file.filename).then((rows) => {
//         const a = [];
//         for (let index = 0; index < rows.length; index++) {
//             if (index == 0) {
//                 continue;
//             } else {
//                 a.push(rows[index]);
//             }
//         }
//         console.table(a);
//         res.render('uploadFile/alldata', { list: a });
//     })




//     // let filePath = path.join(__dirname, req.file.path, req.file.filename);
//     // fs.readFile(filePath, 'utf-8', function (err, data) {
//     //     if (err) throw err;
//     //     console.log(data)
//     // })

//     // var result = await mammoth.extractRawText({ path: req.file.path });
//     // //path : req.file.path
//     // const { file, name } = req.body;
//     // var text = result.value;
//     // return res.send(text)


//     //    const result = mammoth.extractRawText({ path: req.file.path })
//     //         // .then(function (result) {
//     //         //     var html = result.value;
//     //         //     var messages = result.messages;
//     //         //     console.log(html);
//     //         // })
//     //         // .done();

//     // const data = (await result).value;
//     // console.log(data)
//     // res.send(data)
// })


module.exports = router;