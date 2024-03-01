import { token } from "morgan";

export const authRequired = (req, res, next) => {

    const cookies= req.cookies;
    
    if (!token){
        return res.status(401).json({message: "No token, authorization denied"})
    }

    next()
}