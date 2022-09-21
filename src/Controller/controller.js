const express = require("express");
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const fs = require('fs');
const path = require('path');

async function getData(req, res) {
    res.render("uploadFile/upload", {
        viewTitle: "Insert Users"
    });

}


async function insertData(req, res) {
    const { file, name } = req.body;
    const path = req.file.path;

    fs.readFile(path,file, function (err, data) {
        if (err) throw err;
        console.log(data)
    })



    res.send(name)
}


module.exports = {
    getData,
    insertData
}