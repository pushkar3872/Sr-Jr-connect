import React, { useState, useEffect } from 'react';
import { X, Linkedin, Github, Calendar, MapPin, Mail, Info, GraduationCap, Briefcase } from 'lucide-react';

export default function UserModal({
    user,
    isOpen,
    onClose,
    isOwnProfile = false,
    onSave
}) {
    // Initialize form data based on the mongoose schema
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        biodata: '',
        Mobnum: '',
        dateOfBirth: null,
        gender: '',
        graduationYear: -1,
        skills: [],
        location: '',
        PlatformLinks: {
            linkedin: '',
            github: '',
            leetcode: '',
            codechef: '',
            codeforces: '',
            instagram: ''
        },
        academicDetails: {
            college: '',
            Department: '',
            gpa: 0.0,
            domain: ''
        }
    });

    // Platform links with icons for better display
    const platformIcons = {
        linkedin: <Linkedin size={20} />,
        github: <Github size={20} />,
        codeforces: (
            <svg
                fill="currentColor"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>Codeforces icon</title>
                <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.673 21 0 20.328 0 19.5V9c0-.828.673-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5v15c0 .828-.672 1.5-1.5 1.5h-3c-.827 0-1.5-.672-1.5-1.5v-15c0-.828.673-1.5 1.5-1.5h3zm9 7.5c.828 0 1.5.672 1.5 1.5v7.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V12c0-.828.672-1.5 1.5-1.5h3z" />
            </svg>
        ),
        leetcode: (
            <svg
                fill="currentColor"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>LeetCode icon</title>
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
            </svg>
        ),
        codechef: (
            <svg
                fill="currentColor"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>CodeChef icon</title>
                <path d="M11.007 0c-.787.031-1.515.37-2.222.685a12.27 12.27 0 01-1.864.703c-.635.176-1.3.354-1.814.788-.222.18-.356.439-.529.662-.309.486-.448 1.067-.457 1.638.036.61.216 1.2.376 1.786.368 1.262.807 2.503 1.197 3.759.366 1.161.703 2.344 1.294 3.416.197.394.35.808.535 1.206.027.067.052.158.142.149.136-.012.243-.115.368-.164.828-.414 1.74-.642 2.655-.749.708-.074 1.43-.078 2.131.054.72.163 1.417.426 2.092.724.36.172.719.348 1.088.498.048.04.135.058.16-.016.219-.327.469-.635.667-.976.495-1.061.522-2.279 1.038-3.331.358-.721.892-1.337 1.266-2.048.175-.266.431-.467.588-.747.437-.669.78-1.398 1.05-2.15.102-.293.172-.612.09-.919-.06-.299-.202-.57-.318-.848a2.481 2.481 0 00-.278-.66c-.407-.676-1.07-1.149-1.743-1.536-1.045-.59-2.196-.969-3.351-1.28A20.733 20.733 0 0011.426.01a5.005 5.005 0 00-.42-.01z" />
            </svg>
        ),
        instagram: (
            <svg
                fill="currentColor"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.405 2.227.056 1.266.07 1.646.07 4.85s-.014 3.585-.07 4.85c-.055 1.17-.249 1.805-.415 2.227-.217.562-.477.96-.896 1.382-.42.419-.824.679-1.381.896-.422.164-1.065.36-2.235.405-1.274.056-1.649.07-4.859.07-3.211 0-3.586-.014-4.86-.07-1.17-.055-1.814-.249-2.236-.415-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.824-.896-1.381-.164-.422-.36-1.065-.405-2.235-.056-1.274-.07-1.649-.07-4.86 0-3.21.014-3.585.07-4.859.055-1.17.249-1.814.405-2.236.217-.562.477-.96.896-1.382.42-.419.824-.679 1.382-.896.422-.164 1.065-.36 2.235-.405 1.274-.056 1.649-.07 4.86-.07l.045.035zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.795.646-1.44 1.44-1.44.793-.001 1.44.645 1.44 1.44z" />
            </svg>
        )
    };

    // New state for details view
    const [activeDetailsView, setActiveDetailsView] = useState('about');

    // Details view components
    const DetailsView = {
        about: (
            <div className="text-sm">
                <p className="whitespace-pre-wrap">
                    {user?.biodata || "No bio information available."}
                </p>
            </div>
        ),
        skills: (
            <div className="flex flex-wrap gap-2">
                {user?.skills && user.skills.length > 0 ? (
                    user.skills.map((skill, index) => (
                        <span
                            key={index}
                            className="badge badge-primary badge-outline"
                        >
                            {skill}
                        </span>
                    ))
                ) : (
                    <p className="text-sm text-base-content/70">No skills listed</p>
                )}
            </div>
        ),
        academic: (
            <div className="space-y-2 text-sm">
                <div>
                    <span className="font-semibold">College:</span> {user?.academicDetails?.college || 'N/A'}
                </div>
                <div>
                    <span className="font-semibold">Department:</span> {user?.academicDetails?.Department || 'N/A'}
                </div>
                <div>
                    <span className="font-semibold">GPA:</span> {user?.academicDetails?.gpa?.toFixed(2) || 'N/A'}
                </div>
                <div>
                    <span className="font-semibold">Domain:</span> {user?.academicDetails?.domain || 'N/A'}
                </div>
            </div>
        )
    };

    // Update form data when user changes or modal opens
    useEffect(() => {
        if (user && isOpen) {
            setFormData({
                fullName: user.fullName || '',
                email: user.email || '',
                biodata: user.biodata || '',
                Mobnum: user.Mobnum || '',
                dateOfBirth: user.dateOfBirth || null,
                gender: user.gender || '',
                graduationYear: user.graduationYear || -1,
                skills: user.skills || [],
                location: user.location || '',
                PlatformLinks: {
                    linkedin: user.PlatformLinks?.linkedin || '',
                    github: user.PlatformLinks?.github || '',
                    leetcode: user.PlatformLinks?.leetcode || '',
                    codechef: user.PlatformLinks?.codechef || '',
                    codeforces: user.PlatformLinks?.codeforces || '',
                    instagram: user.PlatformLinks?.instagram || ''
                },
                academicDetails: {
                    college: user.academicDetails?.college || '',
                    Department: user.academicDetails?.Department || '',
                    gpa: user.academicDetails?.gpa || 0.0,
                    domain: user.academicDetails?.domain || ''
                }
            });
        }
    }, [user, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle nested fields
        const handleNestedChange = (prevData, path, newValue) => {
            const keys = path.split('.');
            if (keys.length === 1) {
                return { ...prevData, [keys[0]]: newValue };
            }
            return {
                ...prevData,
                [keys[0]]: handleNestedChange(prevData[keys[0]] || {}, keys.slice(1).join('.'), newValue)
            };
        };

        // Check for nested paths
        if (name.includes('.')) {
            setFormData(prevData =>
                handleNestedChange(prevData, name, value)
            );
        } else if (name === 'skills') {
            // Handle skills as an array
            setFormData(prevData => ({
                ...prevData,
                skills: value.split(',').map(skill => skill.trim())
            }));
        } else {
            // Handle top-level fields
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Not available';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="modal-middle w-full max-w-xl bg-base-100 text-base-content rounded-2xl shadow-2xl relative p-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10"
                    onClick={onClose}
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                {/* <h3 className="font-bold text-xl mb-6 text-base-content text-center">
                    {isOwnProfile ? 'Edit Profile' : 'User Profile'}
                </h3> */}

                <div className="space-y-6">
                    {/* Profile Picture and Basic Info */}
                    <div className="flex flex-col items-center mb-4">
                        <div className="avatar mb-3">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img
                                    src={user?.profilePicture || "/avatar.png"}
                                    alt="Profile"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <h4 className="text-lg font-semibold text-base-content">{user?.fullName}</h4>
                            <p className="text-sm text-base-content/70">{user?.email}</p>
                        </div>
                    </div>

                    {/* New Details Navigation */}
                    <div className="flex justify-center mb-4">
                        <div className="tabs tabs-boxed">
                            <a
                                className={`tab ${activeDetailsView === 'about' ? 'tab-active' : ''}`}
                                onClick={() => setActiveDetailsView('about')}
                            >
                                <Info size={16} className="mr-2" /> About
                            </a>
                            <a
                                className={`tab ${activeDetailsView === 'skills' ? 'tab-active' : ''}`}
                                onClick={() => setActiveDetailsView('skills')}
                            >
                                <Briefcase size={16} className="mr-2" /> Skills
                            </a>
                            <a
                                className={`tab ${activeDetailsView === 'academic' ? 'tab-active' : ''}`}
                                onClick={() => setActiveDetailsView('academic')}
                            >
                                <GraduationCap size={16} className="mr-2" /> Academic
                            </a>
                        </div>
                    </div>

                    {/* Dynamic Details View */}
                    <div className="bg-base-200 p-4 rounded-lg min-h-[150px]">
                        {DetailsView[activeDetailsView]}
                    </div>

                    {/* Member Details */}
                    <div className="space-y-2 mb-4">
                        {/* Member Since */}
                        <div className="flex items-center gap-2 text-sm">
                            <Calendar size={18} className="opacity-70" />
                            <span>Member since {formatDate(user?.createdAt)}</span>
                        </div>

                        {/* Location (if available) */}
                        {user?.location && (
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin size={18} className="opacity-70" />
                                <span>{user.location}</span>
                            </div>
                        )}

                        {/* Contact (if available) */}
                        {/* {user?.email && (
                            <div className="flex items-center gap-2 text-sm">
                                <Mail size={18} className="opacity-70" />
                                <span>{user.email}</span>
                            </div>
                        )} */}
                    </div>

                    {/* Platform Links */}
                    <div className="mb-6">
                        <h3 className="text-sm font-semibold uppercase opacity-70 mb-3">Connect</h3>
                        <div className="grid grid-cols-2 gap-2">
                            {Object.entries(user?.PlatformLinks || {}).map(([platform, url]) => (
                                url && (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-sm btn-outline gap-2 flex-nowrap overflow-hidden"
                                    >
                                        <span className="flex-shrink-0">{platformIcons[platform]}</span>
                                        <span className="truncate capitalize">{platform}</span>
                                    </a>
                                )
                            ))}
                        </div>
                    </div>

                    {/* Edit Form (only for own profile) */}
                    {isOwnProfile && (
                        <form onSubmit={handleSubmit} className="space-y-6 border-t pt-6">
                            {/* Rest of the edit form remains the same as in the previous implementation */}
                            {/* ... (previous edit form code) */}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}