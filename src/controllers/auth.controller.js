import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const register= async (req, res) => {
    const {email , password, username} = req.body

    const passwordHashs= await bcrypt.hash(password, 10)

    try {
        const newUser= new User({
            username,
            email,
            password: passwordHashs,
        })
    
        const userSaved= await newUser.save();
        res.json(userSaved)

    } catch (error) {
        console.log(error);
    }
}
export const login= (req, res) => res.send('login');