const {JWT_SECRET} = require('./config');
const jwt = require('jsonwebtoken')

const authMiddleware = (req,res,next)=>{
    const headerAuthorization = req.headers.authorization;
    if(!headerAuthorization || !headerAuthorization.startsWith('Bearer ')){
        res.status(403).json({mssg: "invalid jwt token"})
    }
    const headerAuth = headerAuthorization.split(' ')[1];
    try{
        const decoded = jwt.verify(headerAuth,JWT_SECRET)
        if(decoded.id){
            req.userID = decoded.id;
            next();
        }
        else{
            res.status(403).json({
                mssg: "Error in getting userID from decoded jwt"
            });
        }
        
    }
    catch(err){
        return res.status(403).json({
            mssg: "Error in decoding jwt token"
        });
    }
}

module.exports = {authMiddleware}