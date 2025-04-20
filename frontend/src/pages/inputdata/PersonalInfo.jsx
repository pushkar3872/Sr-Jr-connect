import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthstore } from "../../store/useAuthstore.js";
import { Loader, Save, Phone, Calendar, User, Mail } from "lucide-react";

const PersonalInfo = () => {
    const { authUser, update, isUpdatingProfile } = useAuthstore();

    // Convert date string to YYYY-MM-DD format for the date input
    const formatDateForInput = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date instanceof Date && !isNaN(date)
            ? date.toISOString().split('T')[0]
            : "";
    };
    
    const [formData, setFormData] = useState({
        fullName: authUser?.fullName || "",
        email: authUser?.email || "",
        mobilenumber: authUser?.Mobnum || "",
        dateOfBirth: formatDateForInput(authUser?.dateOfBirth),
        gender: authUser?.gender || "Prefer not to say",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation for required fields
        if (!formData.fullName || !formData.email) {
            toast.error("Name and email are required fields");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        // Mobile number validation (optional field but if provided should be valid)
        if (formData.mobilenumber && !/^\d{10}$/.test(formData.mobilenumber)) {
            toast.error("Please enter a valid 10-digit mobile number");
            return;
        }

        try {
            update(formData);
            toast.success("Personal information updated successfully!");
        } catch (error) {
            console.error("Failed to update personal information:", error);
            toast.error("Failed to update personal information. Please try again.");
        }
    };

    return (
        <div className="bg-base-100">
            <div className="bg-primary/10 p-4">
                <h2 className="text-2xl font-bold text-primary flex items-center">
                    <User size={24} className="mr-2" />
                    Personal Information
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                    <label className="block mb-2 font-medium text-base-content/80">Full Name</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/50 z-10">
                            <User size={18} />
                        </span>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className="w-full input input-bordered pl-10"
                            placeholder="Your full name"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-2 font-medium text-base-content/80">Email Address</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/50 z-10">
                            <Mail size={18} />
                        </span>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full input input-bordered pl-10"
                            placeholder="your.email@example.com"
                            required
                        />
                    </div>
                </div>
                
                <div>
                    <label className="block mb-2 font-medium text-base-content/80">Mobile Number</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/50 pointer-events-none z-10">
                            <Phone size={18} />
                        </span>
                        <input
                            type="tel"
                            name="mobilenumber"
                            value={formData.mobilenumber}
                            onChange={handleChange}
                            className="w-full input input-bordered pl-10"
                            placeholder="Your 10-digit mobile number"
                        />
                    </div>
                    <p className="text-xs text-base-content/60 mt-1">
                        Optional: Enter your 10-digit mobile number
                    </p>
                </div>

                <div>
                    <label className="block mb-2 font-medium text-base-content/80">Date of Birth</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content/50 z-10">
                            <Calendar size={18} />
                        </span>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="w-full input input-bordered pl-10"
                        />
                    </div>
                </div>

                <div>
                    <label className="block mb-2 font-medium text-base-content/80">Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full select select-bordered"
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={isUpdatingProfile}
                    className="w-full btn btn-primary flex items-center justify-center gap-2 mt-2"
                >
                    {isUpdatingProfile ? (
                        <>
                            <Loader className="animate-spin" size={20} />
                            <span>Updating...</span>
                        </>
                    ) : (
                        <>
                            <Save size={20} />
                            <span>Save Information</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default PersonalInfo;