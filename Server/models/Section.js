const mongoose = require('mongoose');

exports.sectionSchema = new mongoose.Schema({

    SectionName:{
        type:String
    },
    subSection:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubSection",
            required:true
        }
    ]
})