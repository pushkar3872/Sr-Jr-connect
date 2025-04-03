import React, { useState } from 'react';
import { UserPlus, Users, GraduationCap, Building } from 'lucide-react';
import Alumni from './connections/Alumni';
import Classmates from './connections/Classmates';
import Juniors from './connections/Juniors';
import Seniors from './connections/Seniors';
import WelcomeDashboard from './connections/WelcomeDashboard';
import Sidebar from './connections/Sidebar'
import UserCard from './connections/UserCard';
import AlluserStore from '../store/AlluserStore';
import { useAuthstore } from '../store/useAuthstore';

export default function ConnectionPage() {
    const { authUser } = useAuthstore();
    const { users} = AlluserStore();
    const seniors = users.filter(user => user.graduationYear >= new Date().getFullYear() && user.graduationYear < authUser.graduationYear);
    const juniors = users.filter(user => user.graduationYear > authUser.graduationYear);
    const classmates = users.filter(user => user.graduationYear === authUser.graduationYear);
    const [activeTab, setActiveTab] = useState('welcome');
    const navigationItems = [
        { id: 'seniors', name: 'Seniors', icon: <GraduationCap size={18} />, color: 'bg-primary hover:bg-primary-focus' },
        { id: 'juniors', name: 'Juniors', icon: <Users size={18} />, color: 'bg-success hover:bg-success-focus' },
        { id: 'classmates', name: 'Class-Mates', icon: <UserPlus size={18} />, color: 'bg-secondary hover:bg-secondary-focus' },
        { id: 'alumni', name: 'Alumni', icon: <Building size={18} />, color: 'bg-accent hover:bg-accent-focus' }
    ];

    // Handle tab switching
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div className="bg-base-100 mt-2 mx-16 shadow-lg rounded-2xl p-6 flex flex-row md:flex-row h-[85vh]">
            {/* Sidebar Container */}
            <div className="w-0 pr-2.5 md:w-64 mb-4 md:mb-0">
                <Sidebar
                    navigationItems={navigationItems}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                />
            </div>
            
            {/* Content Area */}
            <div className="flex-grow pl-0 md:pl-4">
                {activeTab === 'welcome' && <WelcomeDashboard />}
                {activeTab === 'alumni' && <Alumni />}
                {activeTab === 'seniors' && <Seniors />}
                {activeTab === 'juniors' && <Juniors />}
                {activeTab === 'classmates' && <Classmates />}
            </div>
        </div>
    );
}