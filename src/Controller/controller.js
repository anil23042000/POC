const express = require("express");
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const fs = require('fs');
const path = require('path');
var mammoth = require("mammoth");
var multer = require('multer');
const xlsxFile = require('read-excel-file/node');
const projectSchema = require('../Model/projectSchema');
const mongoose = require('mongoose');
const Project = mongoose.model('Projects');
const service = require('../Service/service')

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


async function uploadFile(req, res,next) {

  service.insertData(req,res);
    // xlsxFile('./uploads/' + req.file.filename).then((rows) => {
    //     const a = [];
    //     for (let index = 0; index < rows.length; index++) {
    //         if (index == 0) {
    //             continue;
    //         } else {
    //             a.push(rows[index]);
    //         }
    //     }
    //     console.table(a);
    //     res.render('uploadFile/alldata', { list: a });
    // })
}
async function listAll(req,res,next){
    service.allProjeects(req,res);
}

async function deletesingle(req,res,next){
    service.deleteByid(req,res);
}


async function readData(req,res,next){
    service.readOneFile(req,res);
}



module.exports = {
    getData,
    listAll,
    uploadFile,
    deletesingle,
    readData
}