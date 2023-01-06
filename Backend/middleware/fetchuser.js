const jwt = require('jsonwebtoken');
const jwt_secret = "Haiderisaverygoodman";

const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token')
    if(!token){
        res.status(401).send({error:"Please use a valid authentication token"})
    }
    try {
        const data=jwt.verify(token,jwt_secret);
        req.user=data.user;
        // we are storing the data in the req.user
        // and we will fetch it by req.user.id
        next()
    } catch (error) {
        res.status(401).send({error:"Please use a valid authentication token"})
    }
   

}

module.exports=fetchuser;