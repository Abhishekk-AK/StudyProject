const mongoose = require('mongoose');

exports.categorySchema = new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    description:{
        type:String
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ]
})