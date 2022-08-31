const mongoose = require('mongoose')


const User = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
    
    
})

module.exports = mongoose.model('user',User);