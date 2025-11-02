const mongoose = require('mongoose');

const contactFormSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
        },
        email:{
            type:String,
            required:true
        },
        message:{
            type:String,
            required:true
        }
    }
)

module.exports = mongoose.model('ContactForm', contactFormSchema);