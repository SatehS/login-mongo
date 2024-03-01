import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";
import { token } from "morgan";


export const register= async (req, res) => {
    const {email , password, username} = req.body

    try {
        
        const passwordHashs= await bcrypt.hash(password, 10);

        const newUser= new User({
            username,
            email,
            password: passwordHashs,
        })
    
        const userSaved= await newUser.save();
        const token= await createAccesToken({id: userSaved._id})
        res.cookie('token', token)
        res.json({
            id: userSaved._id,
            username: userSaved._username,
            email: userSaved.email,
            createdAt: userSaved._createdAt,
            updateAt: userSaved._updateAt,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const login= async (req, res) => {
    const {email , password} = req.body

    try {
        const userFound= await User.findOne({email});
        if(!userFound) return res.status(400).json({message: "User not found"});

        
         const isMatch= await bcrypt.compare(password, userFound.password);
         if (!isMatch) return  res.status(400).json({message: "Incorrect password"});


    

        const token= await createAccesToken({id: userFound._id})
        res.cookie('token', token)
        res.json({
            id: userFound._id,
            username: userFound._username,
            email: userFound.email,
            createdAt: userFound._createdAt,
            updateAt: userFound._updateAt,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


export const logout = (req, res) => {
    res.cookie('token', "", {
    expires: new Date(0)
    })
    return res.sendStatus(200);
};


export const profile= (req, res) => {
    res.send('profile')
}