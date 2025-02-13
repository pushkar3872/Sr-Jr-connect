import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { generateToken } from "../lib/utils.js";
import SrJrUser from "../models/UserModel.js";

export const register = async (req, res) => {
    // res.send("register route");

    const { fullName, email, password } = req.body

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All Fields are Required"
            })
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 charachters " });
        }

        // checking if user exist elready
        const existingUser = await SrJrUser.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // hashing password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new SrJrUser({
            fullName,
            email,
            password: hashedPassword
        })

        if (newUser) {
            // generate jwt token here main function in utils.js
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        }

        else {
            res.status(400).json({ message: "Invalid existingUser data" })
        }
    } catch (error) {
        console.log("error in register controller function", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await SrJrUser.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const ispasswordCorrect = await bcrypt.compare(password, user.password);
        if (!ispasswordCorrect) {
            return res.status(400).json({
                message: "Invalid Credentials"
            })
        }

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePicture,
        });

    } catch (error) {
        console.log("error in login controller funciton ", error.message)
        res.status(500).json({ message: "Internal Server Error" })
    }
};


export const logout = (req, res) => {
    // res.send("logout route");
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged Out Successfully" });
    } catch (error) {
        console.log("Error in Logout Controller")
        res.status(500).json({ message: "Internal Server Error " });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id
        if (!profilePic) {
            res.status(400).json({ message: "Profile Picture Requred " });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true })

        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("Error in Update Profile in controller")
        res.status(500).json({ message: "Internal Server Error " });
    }
}

export const checkAuth = (req, res) => {
    try {

        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller")
        res.status(500).json({ message: "Internal Server Error " });
    }
};

