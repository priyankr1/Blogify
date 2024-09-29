const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue=req.cookies[cookieName];
        if (!tokenCookieValue) {
           return  next();
        }

        try{
            const usePayload=validateToken(tokenCookieValue);
           
            req.user=usePayload;
            return next();
        }catch(error){
        }
        return next()
    }
}
module.exports={
    checkForAuthenticationCookie,
}