import { User } from "../../module/authModule/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"

export const registerUser = async (req, res) => {
    try {
        const {name, email, password,} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
         
        const existingUser = await User.findOne({email})
        if(existingUser){
           return res.status(400).json({
            success: false,
            message: "User already exists"
           })
        }

        if(password.length < 8){
            return res.status(400).json({
                success: false,
                message:"Password length must be 8 character"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
      

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET, {expiresIn: "1d"})

        return res.status(201).json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                password: user.password
            },
            message: "User created successfully"
        })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message || "Something went wrong"
        })
    }
}