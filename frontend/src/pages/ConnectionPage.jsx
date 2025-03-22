// ConnectionPage.jsx
import React, { useState } from 'react';
import { UserPlus, Users, GraduationCap, Building } from 'lucide-react';
import Alumni from './connections/Alumni';
import Classmates from './connections/Classmates';
import Juniors from './connections/Juniors';
import Seniors from './connections/Seniors';
import WelcomeDashboard from './connections/WelcomeDashboard';
import Sidebar from './connections/Sidebar'
import UserCard from './connections/UserCard';

export default function ConnectionPage() {
    const [activeTab, setActiveTab] = useState('welcome');

    const navigationItems = [
        { id: 'seniors', name: 'Seniors', icon: <GraduationCap size={18} />, color: 'bg-blue-500 hover:bg-blue-600' },
        { id: 'juniors', name: 'Juniors', icon: <Users size={18} />, color: 'bg-green-500 hover:bg-green-600' },
        { id: 'classmates', name: 'Class-Mates', icon: <UserPlus size={18} />, color: 'bg-purple-500 hover:bg-purple-600' },
        { id: 'alumni', name: 'Alumni', icon: <Building size={18} />, color: 'bg-orange-500 hover:bg-orange-600' }
    ];

    // Handle tab switching
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        // <div className="p-4 flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-6 flex w-11/12 h-[85vh] overflow-hidden m-auto mt-7">
                {/* Left Side Navigation */}
                <Sidebar
                    navigationItems={navigationItems}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                />

                {/* Right Side Content */}
                <div className="w-3/4 overflow-hidden">
                    {activeTab === 'welcome' && <WelcomeDashboard />}
                    {activeTab === 'alumni' && <Alumni />}
                    {activeTab === 'seniors' && <Seniors />}
                    {activeTab === 'juniors' && <Juniors />}
                    {activeTab === 'classmates' && <Classmates />}
                </div>
            </div>
        // </div>
    );
}