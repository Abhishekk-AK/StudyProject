const mongoose = require('mongoose');

exports.subSectionSchema = new mongoose.Schema({

    title:{
        type:String
    },
    description:{
        type:String
    },
    timeDuration:{
        type:String
    },
    videoUrl:{
        type:String
    }
})