const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    emailId: {type:String,required:true},
    password: {type:String,required:true},
});


const User = mongoose.model('users',userSchema);