import mongoose from "mongoose";

const srJrUserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profileUrl: {
        type: String,
        default: ''
    },
    profilePicture: {
        type: String,
        default: 'default-profile-pic-url'
    },
    bio: {
        type: String,
        default: ''
    },
    graduationYear: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ['Senior', 'Junior'],
        required: true
    },
    skills: [{
        type: String,
        default: []
    }],
    technicalSkills: [{
        type: String,
        default: []
    }],
    softSkills: [{
        type: String,
        default: []
    }],
    mentorshipStatus: {
        type: String,
        enum: ['Mentor', 'Mentee', 'None'],
        default: 'None'
    },
    profileCompletion: {
        type: Number,
        default: 0 // Percentage from 0 to 100
    },
    achievements: [{
        title: String,
        date: Date,
        description: String
    }],
    volunteerActivities: [{
        organization: String,
        role: String,
        startDate: Date,
        endDate: Date,
        description: String
    }],
    socialLinks: {
        linkedin: { type: String, default: '' },
        github: { type: String, default: '' },
        twitter: { type: String, default: '' },
        instagram: { type: String, default: '' },
    },
    academicDetails: {
        major: {
            type: String,
            default: ''
        },
        university: {
            type: String,
            default: ''
        },
        gpa: {
            type: Number,
            default: 0.0
        }
    },
    currentJobRole: {
        type: String,
        default: ''
    },
    expectedJobRole: {
        type: String,
        default: ''
    },
    location: {
        type: String,
        default: ''
    },
    contactInfo: {
        phone: {
            type: String,
            default: ''
        },
        linkedin: {
            type: String,
            default: ''
        },
        github: {
            type: String,
            default: ''
        }
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Active', 'Alumni'],
        default: 'Active'
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
        default: 'Prefer not to say'
    },
    otp: {
        type: String,
        default: '', // OTP value sent to the user
    },
    otpExpires: {
        type: Date, // Expiration time of the OTP
    },
    isVerified: {
        type: Boolean,
        default: false, // Whether the user's email is verified or not
    },
    notifications: {
        email: {
            type: Boolean,
            default: true
        },
        push: {
            type: Boolean,
            default: true
        },
        sms: {
            type: Boolean,
            default: false
        }
    },
    activityLog: [{
        action: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    referralCode: {
        type: String,
        default: ''
    },
    invitedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SrJrUser'
    },
    connectionHistory: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SrJrUser'
        },
        connectionType: {
            type: String,
            enum: ['Request Sent', 'Request Received', 'Accepted', 'Blocked'],
            default: 'Request Sent'
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    events: [{
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event' // Reference to the Event model
        },
        participationStatus: {
            type: String,
            enum: ['Registered', 'Attended', 'Missed'],
            default: 'Registered'
        },
        feedback: {
            type: String,
            default: ''
        }
    }]
}, {
    timestamps: true
});

const SrJrUser = mongoose.model('SrJrUser', srJrUserSchema);
export default SrJrUser;
