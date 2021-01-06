
const request = require('request');
const { path } = require('../../app');
const server = 'http://localhost:8080';
const jwt = require('jsonwebtoken');

exports.getLogin = (req, res, next) => {

    let data = '';


    if(req.query.success) data = 'Signup successful!';
   if(req.query.exists) data = 'User already exists!';
   if(req.query.fail) data = 'EmailId or password is incorrect!';
   if(req.query.logout !== undefined) data = 'You have been logged out';
    
   console.log('Get Login');
    
    res.render('login',{
        data:data
    });

}

exports.getSignup = (req, res, next) => {

    res.render('signup');

}

exports.getHome = (req, res, next) => {

    let data = '';
    
    if(req.query.success !== undefined) data = 'Login Successful';
    
   
    
    res.render('home',{
        data:data
    });

}

exports.postSignup = async(req,res,next)=>{

    let data = {
        emailId:req.body.emailId,
        password:req.body.password
    }

    const path = '/api/signup';
    const postRequest = {

        url: server + path,
        method:'post',
        json: data
    }


        request(postRequest,(err,response,body) => {

            if(response.statusCode == 201){
                res.redirect('/login?success=true');
            }

            else res.redirect('/login?exists=true');

        });


};


exports.postLogin = (req,res,next)=>{

    const path = '/api/login';

    let data = {
        password:req.body.password,
        emailId : req.body.emailId
    }

    let requestBody = {

        url: server + path,
        method: 'post',
        json : data
    }
    
    request(requestBody, (err,response,body)=>{
            
        console.log();
        if(response.statusCode == 200){
             
            const user = response.body.user;
            const jwtToken = jwt.sign(user,'secret');
                
                req.session.jwtToken = jwtToken;
                req.session.isLoggedIn = true;
                req.session.user = user;
                  req.session.save(()=>{
                    res.redirect('/?success');
                  });
               
                  
            }

            else res.redirect('/login?fail=true');
    });

};



exports.logout = async(req,res,next)=>{
    
    await req.session.destroy();
    res.redirect('/login?logout');
};
