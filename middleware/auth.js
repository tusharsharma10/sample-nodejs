const jwt = require('jsonwebtoken');


const { JsonWebTokenError } = require("jsonwebtoken");

module.exports.isAuthenticated = (req,res,next)=>{
    let loggedIn = req.session.isLoggedIn;

        if(!loggedIn){
            res.redirect('/login');
        }

        next();
};


//Authorization using JWT
module.exports.isAuthorized = (req,res,next)=>{
    console.log('token');
    const token = req.session.jwtToken;
    
    if(!token) return res.sendStatus(401);

    jwt.verify(token,'secret',(err,user)=>{

        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });

    if(req.user.emailId == 'diary@mail.com') res.status(403).send('Unauthorized');

};





