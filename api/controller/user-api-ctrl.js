const mongoose = require('mongoose');
const userModel = require('../model/user');
const User = mongoose.model('users');


exports.postLogin = async (req, res, next) => {

    const emailId = req.body.emailId;
    const password = req.body.password;

    try {
        let user = await User.findOne({ emailId: emailId });

        if (!user) return res.status(400).send('No user with email id exists!');

        if (user.password == password) {
           
            let responseBody = {
                user:user

            }

            return res.status(200).send(responseBody);
        }
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

};

exports.postSignup = async (req, res, next) => {

    const emailId = req.body.emailId;
    const password = req.body.password;

    try {

        let u = await User.findOne({ emailId: emailId });
        //console.log(u);

        if (u) return res.status(400).send('User already exists');

        u = new User({
            emailId: emailId,
            password: password
        });

        await u.save();
        console.log(u);
        return res.status(201).send('Signup Successful');

    }

    catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

};


exports.postLogout = async(req,res)=>{

   
   return res.sendStatus(200);
};

