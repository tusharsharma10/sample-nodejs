const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/user-auth',{ useUnifiedTopology: true ,useNewUrlParser: true})
.then(res =>{
    console.log('Connection Successful');
}) .catch(err=>{
    console.log('Connection Failed');
});
