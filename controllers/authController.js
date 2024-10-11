import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        let user = await User.findOne({email}); 
        if(!user) {
            return res.status(201).json({msg: "user doesn't exist"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.status(200).json({ token });    
    } catch (error) {
        next(error);
    }
}

export const register = async (req, res, next) => {
    const {name, email, password} = req.body;
    try {
        let user = await User.findOne({email})
        if(user) {
            return res.status(400).json({msg: "user already exists"});
        }

        let newUser = new User({name, email, password});
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        const payLoad = {userId: newUser._id};
        const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });
        await newUser.save();

        res.status(201).json({token});

    } catch (error) {
        next(error);
    }
}