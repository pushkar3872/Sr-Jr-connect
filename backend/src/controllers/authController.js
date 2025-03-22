import bcrypt from "bcryptjs"
import cloudinary from "../config/cloudinary.js"
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

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        generateToken(user._id, res);

        // Exclude password before sending user data
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json(userWithoutPassword);

    } catch (error) {
        console.log("Error in login controller function:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
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
        const userId = req.SrJrUser._id;
        if (!userId) {
            return res.status(400).json({ message: "User not found" });
        }

        // Extract fields from request
        const { fullName, email, profilePicture, biodata, graduationYear, skills, PlatformLinks, branch, dateOfBirth, gender, mobilenumber, domain, college, gpa } = req.body;

        // Create an empty object to store updated fields
        const updatedFields = {};

        // Check and update only provided fields
        if (fullName) updatedFields.fullName = fullName;
        if (email) updatedFields.email = email;
        if (biodata) updatedFields.biodata = biodata;
        if (graduationYear) updatedFields.graduationYear = graduationYear;
        if (skills) updatedFields.skills = skills;
        if (PlatformLinks) updatedFields.PlatformLinks = PlatformLinks;
        if (dateOfBirth) updatedFields.dateOfBirth = dateOfBirth;
        if (gender) updatedFields.gender = gender;
        if (mobilenumber) updatedFields.Mobnum = mobilenumber;

        // Initialize academicDetails if any related field is provided
        if (branch || college || domain || gpa) {
            // First find the current user to get existing academicDetails
            const currentUser = await SrJrUser.findById(userId);

            // Start with existing academicDetails or empty object if none
            updatedFields.academicDetails = currentUser.academicDetails || {};

            // Update only the fields that are provided
            if (branch) updatedFields.academicDetails.Department = branch;
            if (college) updatedFields.academicDetails.college = college;
            if (domain) updatedFields.academicDetails.domain = domain;
            if (gpa) updatedFields.academicDetails.gpa = gpa;
        }

        // Handle profile picture upload separately
        if (profilePicture) {
            const uploadResponse = await cloudinary.uploader.upload(profilePicture);
            updatedFields.profilePicture = uploadResponse.secure_url;
        }

        // Update user only with provided fields
        const updatedUser = await SrJrUser.findByIdAndUpdate(
            userId,
            { $set: updatedFields },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in Update Profile Controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const checkAuth = (req, res) => {
    try {
        // console.log(req.SrJrUser)
        if (!req.SrJrUser) {
            return res.status(401).json({ message: "Unauthorized: No user data found" });
        }
        res.status(200).json(req.SrJrUser);
    } catch (error) {
        console.error("Error in checkAuth controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteSrJruser = async (req, res) => {
    try {
        // const { email } = req.body

        const userId = req.SrJrUser.id;
        const deletedUser = await SrJrUser.findByIdAndDelete(userId)

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.error("Error in deleting user:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
