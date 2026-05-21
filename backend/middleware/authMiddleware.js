// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req,res,next) =>{
   let token;
   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
    try {
        // Extract the Token
        token = req.headers.authorization.split(' ')[1];
        // Verify using Secret Key
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        // Find the user in the database by the decodedId and attach to the request
        // We Exclude the password for the Security
        req.user = await User.findById(decoded.id).select('-password');
        // Pass the Execution to the next middleware or the controller
        return next()
    } catch (error) {
        console.error("Token Verification Failed", error.message);
        return res.status(401).json({message : "Not Authorized , Token Failed"})
    }
   
   }
    if(!token){
        return res.status(401).json({message : 'Not Authorized , no Token Provided'})
    }
}

export default protect;