import mongoose from "mongoose";

const srJrUserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: ''
    },
    biodata: {
        type: String,
        default: ''
    },
    graduationYear: {
        type: Number,
        default: -1
    },
    skills: [{
        type: String,
        default: []
    }],
    PlatformLinks: {
        linkedin: { type: String, default: '' },
        github: { type: String, default: '' },
        leetcode: { type: String, default: '' },
        codechef: { type: String, default: '' },
        codeforces: { type: String, default: '' },
        instagram: { type: String, default: '' }
    },
    academicDetails: {
        college: {
            type: String,
            default: ''
        },
        Department: {
            type: String,
            default: ''
        },
        gpa: {
            type: Number,
            default: 0.0
        }
    },
    dateOfBirth: {
        type: Date,
        default: Date.now
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
        default: 'Prefer not to say'
    },
}, {
    timestamps: true
});

const SrJrUser = mongoose.model('SrJrUser', srJrUserSchema);
export default SrJrUser;
