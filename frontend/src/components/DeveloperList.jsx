import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaCode, FaUser, FaBriefcase, FaLaptopCode, FaClock, FaSearch, FaUsers, FaPlus } from 'react-icons/fa';
import DeveloperForm from './DeveloperForm';

const base_url = "http://localhost:7002";

const DeveloperList = () => {
    const [developers, setDevelopers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewRole, setViewRole] = useState([]);

    const handleView = async () => {
        try {
            setLoading(true);
            const result = await axios.get(`${base_url}/api/view`, {
                validateStatus: () => true
            });

            if (result.status === 200) {
                setDevelopers(result.data);
            } else {
                toast.error(result.data.message || 'Failed to fetch developers');
            }
        } catch (err) {
            toast.error("Server Error! Unable to fetch developers.");
        } finally {
            setLoading(false);
        }
    };


    const handleRole = async () => {
        try {
            const result = await axios.get(`${base_url}/api/role`, {
                validateStatus: () => true
            });
            if (result.status == 200) {
                setViewRole(result.data);
            }
        }
        catch (err) {
            toast.error("Server Error");
        }
    }

    useEffect(() => {
        handleView();
        handleRole();
    }, []);

    const filteredDevelopers = developers.filter(dev =>
        dev.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dev.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dev.techStack?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8 nunito-uniquifier">
            <div className="max-w-7xl mx-auto">

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-600 p-3 rounded-lg">
                                <FaUsers className="text-white text-2xl" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Developer Directory</h1>
                                <p className="text-gray-500 text-sm mt-1">
                                    {developers.length} {developers.length === 1 ? 'developer' : 'developers'} registered
                                </p>
                            </div>
                        </div>

                        <div className="relative w-full sm:w-auto sm:min-w-[300px]">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search developers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                            />
                        </div>
                        {/* Create Developer Button */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
                        >
                            <FaPlus className="text-lg" />
                            Create Developer
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <p className="mt-4 text-gray-600">Loading developers...</p>
                    </div>
                ) : filteredDevelopers.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <FaUser className="mx-auto text-gray-300 text-6xl mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Developers Found</h3>
                        <p className="text-gray-500">
                            {searchTerm ? 'Try adjusting your search criteria' : 'No developers have been registered yet'}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="hidden lg:block bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">S.No</th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    <FaUser />
                                                    Name
                                                </div>
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    <FaBriefcase />
                                                    Role
                                                </div>
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    <FaCode />
                                                    Tech Stack
                                                </div>
                                            </th>
                                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    <FaClock />
                                                    Experience
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {filteredDevelopers.map((dev, index) => (
                                            <tr key={dev._id} className="hover:bg-blue-50 transition-colors duration-150">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                                            {dev.name?.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{dev.name}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                                        {dev.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-wrap gap-1">
                                                        {dev.techStack?.split(',').map((tech, idx) => (
                                                            <span key={idx} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                                {tech.trim()}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                        {dev.experience}  {dev.experince === '1' ? 'year' : 'years'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="lg:hidden space-y-4">
                            {filteredDevelopers.map((dev, index) => (
                                <div key={dev._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                                {dev.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold text-lg">{dev.name}</h3>
                                                <p className="text-blue-100 text-sm">#{index + 1}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 space-y-3">
                                        <div className="flex items-start gap-3">
                                            <FaBriefcase className="text-purple-600 mt-1 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Role</p>
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                                    {dev.role}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <FaCode className="text-blue-600 mt-1 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Tech Stack</p>
                                                <div className="flex flex-wrap gap-1">
                                                    {dev.techStack?.split(',').map((tech, idx) => (
                                                        <span key={idx} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                            {tech.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <FaClock className="text-green-600 mt-1 flex-shrink-0" />
                                            <div className="flex-1">
                                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Experience</p>
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                    {dev.experience} {dev.experince === '1' ? 'year' : 'years'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <Toaster position="top-right" />
            <DeveloperForm
                isOpen={isModalOpen}
                viewRole={viewRole}
                onClose={() => setIsModalOpen(false)}
                onDeveloperAdded={handleView}
            />
        </div>
    );
};

export default DeveloperList;