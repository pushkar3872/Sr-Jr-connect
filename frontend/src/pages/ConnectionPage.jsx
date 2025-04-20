import React, { useState } from 'react';
import { ArrowUpFromLine, ArrowsUpFromLine, ArrowDownFromLine, EqualApproximately } from 'lucide-react';
import Alumni from './connections/Alumni.jsx';
import Classmates from './connections/Classmates.jsx';
import Juniors from './connections/Juniors.jsx';
import Seniors from './connections/Seniors.jsx';
import WelcomeDashboard from './connections/WelcomeDashboard.jsx';
import Sidebar from './connections/Sidebar.jsx'
import AlluserStore from '../store/AlluserStore.js';
import { useAuthstore } from '../store/useAuthstore.js';

export default function ConnectionPage() {
    const { authUser } = useAuthstore();
    const { users } = AlluserStore();
    const seniors = users.filter(user => user.graduationYear >= new Date().getFullYear() && user.graduationYear < authUser.graduationYear);
    const juniors = users.filter(user => user.graduationYear > authUser.graduationYear);
    const classmates = users.filter(user => user.graduationYear === authUser.graduationYear);
    const [activeTab, setActiveTab] = useState('welcome');
    const navigationItems = [
        { id: 'seniors', name: 'Seniors', icon: <ArrowUpFromLine fill='currentColor' size={18} /> },
        { id: 'juniors', name: 'Juniors', icon: <ArrowDownFromLine fill='currentColor' size={18} /> },
        { id: 'classmates', name: 'Class-Mates', icon: <EqualApproximately fill='currentColor' size={18} /> },
        { id: 'alumni', name: 'Alumni', icon: <ArrowsUpFromLine fill='currentColor' size={18} /> }
    ];

    // Handle tab switching
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div className="bg-base-100 mt-2 mx-4 sm:mx-16 shadow-lg rounded-2xl p-6 flex flex-row md:flex-row h-[85vh]">
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