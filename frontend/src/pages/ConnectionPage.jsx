import React, { useState } from 'react';
import Alumni from './connections/Alumni';
import Classmates from './connections/Classmates';
import Juniors from './connections/Juniors';
import Seniors from './connections/Seniors';
import Mycon from './connections/Mycon';

export default function ConnectionPage() {

    const [Alm, setAlm] = useState(false);
    const [Jun, setJun] = useState(false);
    const [Sen, setSen] = useState(false);
    const [Cls, setCls] = useState(false);

    const [fl, setFl] = useState(true);

    const handleAlumni = () => {
        setAlm(true);
        setJun(false);
        setSen(false);
        setCls(false);
        setFl(false);
    };

    const handleJuniors = () => {
        setAlm(false);
        setJun(true);
        setSen(false);
        setCls(false);
        setFl(false);
    };

    const handleSeniors = () => {
        setAlm(false);
        setJun(false);
        setSen(true);
        setCls(false);
        setFl(false);
    };

    const handleClassmates = () => {
        setAlm(false);
        setJun(false);
        setSen(false);
        setCls(true);
        setFl(false);
    };

    return (
        <div className="p-12 flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 flex w-4/5 h-full overflow-hidden">

                {/* Left Side Navigation (Fixed) */}
                <div className="w-1/4 border-r pr-6">
                    <h2 className="text-xl font-bold mb-4">Connections</h2>
                    <ul className="space-y-3">
                        <li className="p-3 bg-blue-500 text-white rounded-lg text-center cursor-pointer hover:bg-blue-600">
                            <button className="w-full h-full" onClick={handleSeniors}>Seniors</button>
                        </li>
                        <li className="p-3 bg-green-500 text-white rounded-lg text-center cursor-pointer hover:bg-green-600">
                            <button className="w-full h-full" onClick={handleJuniors}>Juniors</button>
                        </li>
                        <li className="p-3 bg-purple-500 text-white rounded-lg text-center cursor-pointer hover:bg-purple-600">
                            <button className="w-full h-full" onClick={handleClassmates}>Class-Mates</button>
                        </li>
                        <li className="p-3 bg-orange-500 text-white rounded-lg text-center cursor-pointer hover:bg-orange-600">
                            <button className="h-full w-full" onClick={handleAlumni}>Alumni</button>
                        </li>
                    </ul>
                </div>

                {/* Right Side User List (Scrollable) */}
                <div className="w-3/4 p-6 overflow-auto">

                    {Alm && <Alumni />}
                    {Sen && <Seniors />}
                    {Jun && <Juniors />}
                    {Cls && <Classmates />}
                    {fl && <Mycon />}

                </div>
            </div>
        </div>
    );
}