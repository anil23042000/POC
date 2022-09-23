const mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    projectInfo: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    dateAndTime: {
        type: String,
        default: Date.now()
    }
});


mongoose.model('Projects', projectSchema);