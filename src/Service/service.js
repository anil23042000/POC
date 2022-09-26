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
const Projects = mongoose.model('Projects');


async function insertData(req, res) {
    const project = new Projects();
    console.log(req.file.filename)
    project.projectInfo = req.body.fileInfo;
    project.filePath = req.file.path;
    project.fileName = req.file.filename;
    project.userName = req.body.name;
    project.save((err, data) => {
        if (err) throw err
        console.log(data);
    })
    res.redirect("/api/list");
}


async function allProjeects(req, res) {
    Projects.find((err, docs) => {
        if (!err) {
            res.render("Uploadfile/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving project list :' + err);
        }
    }).lean();

}



async function readOneFile(req, res) {

    console.log(req.params.id);
    var id = new mongoose.Types.ObjectId(req.params.id);
    console.log(id)
    const projects = await Projects.findOne({ "_id": id });
    console.log(projects.fileName);
    console.log(projects.filePath);

    xlsxFile(projects.filePath).then((rows) => {
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

async function deleteByid(req, res) {
    unlinkFile(req.params.id);
    Projects.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/api/list');
        }
        else { console.log('Error in user delete :' + err); }
    }).lean();
}

async function unlinkFile(id) {
    var fileId = new mongoose.Types.ObjectId(id);
    console.log(fileId)
    const projects = await Projects.findOne({ "_id": fileId }).exec();
    console.log(projects)

    fs.unlink(projects.filePath, (err) => {
        if (err) throw err
        console.log("Success")
    })


}



module.exports = {
    insertData,
    allProjeects,
    deleteByid,
    readOneFile,
    unlinkFile
}