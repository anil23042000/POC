const express = require("express");
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const fs = require('fs');
const path = require('path');
var mammoth = require("mammoth");
var multer = require('multer');
const xlsxFile = require('read-excel-file/node');
const projectSchema = require('../model/file_Schema');
const mongoose = require('mongoose');
const Project = mongoose.model('Projects');
const service = require('../service/file_service')

//file  controller 


//rendering to hbs file
async function getData(req, res) {
    res.render("uploadFile/upload", {
        viewTitle: "Insert Users"
    });
}

//calling service file for inserting new info
async function uploadFile(req, res, next) {
    service.insertData(req, res);
}

//calling service file for listing out all projects
async function listAll(req, res, next) {
    service.allProjeects(req, res);
}


//calling service file for deleting single project
async function deletesingle(req, res, next) {
    service.deleteByid(req, res);
}


//calling service file for reading file
async function readData(req, res, next) {
    service.readOneFile(req, res);
}

//calling service file for getting single file info
async function updateFile(req, res, next) {
    service.getOneFile(req, res);
}

//calling service file for updating
async function updateOneFile(req, res, next) {
    service.replaceFile(req, res);
}



module.exports = {
    getData,
    listAll,
    uploadFile,
    deletesingle,
    readData,
    updateFile,
    updateOneFile
}