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
const Projects = mongoose.model('Projects');

// inserting file and information about fil
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

// TO get all projects details 
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


//reading single file from read-excel-file/node
async function readOneFile(req, res) {
    // var id = new mongoose.Types.ObjectId(req.params.id);
    // console.log(id)

    //finding data in mongoodb 
    const projects = await Projects.findOne({ "_id": req.params.id });
    console.log(projects.fileName);
    console.log(projects.filePath);

    //here reading data after find out 
    xlsxFile(projects.filePath).then((rows) => {
        //const a = [];
        // for (let index = 0; index < rows.length; index++) {
        //     if (index == 0) {
        //         continue;
        //     } else {
        //         a.push(rows[index]);
        //     }
        // }
        //console.table(a);
        res.render('uploadFile/alldata', { list: rows });
    })
}



//Deleting project info from database
async function deleteByid(req, res) {

    //this function will delete file in repo 
    unlinkFile(req.params.id);

    //here deleting 
    try {
        const project = await Projects.findByIdAndRemove(req.params.id);
        if (project) res.redirect("/api/list");
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}


//this function will unlike the file from folder using unlink function
async function unlinkFile(id) {
    console.log(id);
    //finding file details for getting file __dir
    const projects = await Projects.findOne({ "_id": id });

    // const projects = await Projects.findOne({ "_id": fileId }).exec();
    console.log(projects)
    //unlinking
    fs.unlink(projects.filePath, (err) => {
        if (err) throw err
        console.log("Success")
    })
}

// here finding data and rendered for updating 
async function getOneFile(req, res) {
    const fileinfo = await Projects.findById(req.params.id).lean();
    res.render("uploadfile/update",
        { Projects: fileinfo }
    );
    //here unlinking the file bcoz we will upload new updated file 
    unlinkFile(req.params.id);
}


// here updating or replacing the project info and file
async function replaceFile(req, res) {

    //collecting info for updating 
    const fileInfo = {
        projectInfo: req.body.fileInfo,
        filePath: req.file.path,
        fileName: req.file.filename,
        userName: req.body.name
    }

    //updating old file and info to new info and file
    Projects.findOneAndUpdate({ _id: req.body._id }, fileInfo, { new: true }, (err, doc) => {
        if (!err) { res.redirect('/api/list'); }
        else {
            res.render("User/addOrEdit", {
                viewTitle: 'Update User',
                user: req.body
            });
        }
    });


}


// exporting all functions
module.exports = {
    insertData,
    allProjeects,
    deleteByid,
    readOneFile,
    unlinkFile,
    replaceFile,
    getOneFile
}