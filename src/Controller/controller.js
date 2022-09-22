const express = require("express");
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const fs = require('fs');
const path = require('path');
var mammoth = require("mammoth");
var multer = require('multer');
const xlsxFile = require('read-excel-file/node');

const storageEngin = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, "./uploads/")
    },
    filename: function (request, file, callback) {
        callback(null, file.originalname)
    }
});
const upload = multer({ storage: storageEngin })


async function getData(req, res) {
    res.render("uploadFile/upload", {
        viewTitle: "Insert Users"
    });

}


async function uploadFile(req, res) {
    console.log(req.file.filename)

    xlsxFile('./uploads/' + req.file.filename).then((rows) => {
        const a = [];
        for (let index = 0; index < rows.length; index++) {
            if (index == 0) {
                continue;
            } else {
                a.push(rows[index]);
            }
        }
        console.table(a);
        res.render('uploadFile/alldata', { list: a });
    })
}


module.exports = {
    getData,
    uploadFile
}