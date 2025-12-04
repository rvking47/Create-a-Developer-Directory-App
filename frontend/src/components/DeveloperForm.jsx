import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaUser, FaBriefcase, FaCode, FaClock, FaPaperPlane, FaTimes } from 'react-icons/fa'
import "../App.css"

const base_url = "http://localhost:7002";

const DeveloperForm = ({ isOpen, onClose, onDeveloperAdded, viewRole }) => {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [techStack, setTechStack] = useState("");
    const [experience, setExperince] = useState("");
    const [validationName, setValidationName] = useState("");
    const [validationRole, setValidationRole] = useState("");
    const [validationTechStack, setValidationTechStack] = useState("");
    const [validationExperience, setValidationExperince] = useState("");


    const handleCreate = async (e) => {
        e.preventDefault();
        setValidationName("");
        setValidationRole("");
        setValidationTechStack("");
        setValidationExperince("");
        try {
            const result = await axios.post(`${base_url}/api/create`, { name, role, techStack, experience }, {
                headers: { "Content-Type": "application/json" },
                validateStatus: () => true
            });
            if (result.status === 201) {
                toast.success(result.data.message);
                setName("");
                setRole("");
                setTechStack("");
                setExperince("");
                onClose();
                if (onDeveloperAdded) {
                    onDeveloperAdded();
                }
            }
            else {
                result.data.errors.forEach(err => {
                    if (err.field === "name") setValidationName(err.message);
                    if (err.field === "role") setValidationRole(err.message);
                    if (err.field === "techStack") setValidationTechStack(err.message);
                    if (err.field === "experience") setValidationExperince(err.message);
                });
            }
        }
        catch (err) {
            toast.error("Server Error");
        }
    }

    const handleClose = () => {
        setValidationName("");
        setValidationRole("");
        setValidationTechStack("");
        setValidationExperince("");
        onClose();
    }

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn nunito-uniquifier">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
                    <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <FaUser className="text-xl" />
                            Create New Developer
                        </h2>
                        <button
                            onClick={handleClose}
                            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                    </div>
                    <form onSubmit={handleCreate} className="p-6 space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaUser className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter developer name"
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                                />
                            </div>
                            {validationName && (
                                <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                    {validationName}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Role
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                    <FaBriefcase className="text-gray-400" />
                                </div>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 appearance-none bg-white cursor-pointer"
                                >
                                    <option value="">Select a role</option>
                                    {viewRole.length > 0 ? (
                                        viewRole.map(((val) => (
                                            <option value={val.role}>{val.role}</option>
                                        )))
                                    ) : (
                                        <option value="Role not found">Role not found</option>
                                    )}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {validationRole && (
                                <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                    <span>⚠</span> {validationRole}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Tech Stack
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaCode className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={techStack}
                                    onChange={(e) => setTechStack(e.target.value)}
                                    placeholder="e.g., React, Node.js, MongoDB"
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                                />
                            </div>
                            {validationTechStack && (
                                <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                    {validationTechStack}
                                </p>
                            )}
                        </div>

                        {/* Experience Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Experience (Years)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaClock className="text-gray-400" />
                                </div>
                                <input
                                    type="number"
                                    value={experience}
                                    onChange={(e) => setExperince(e.target.value)}
                                    placeholder="Enter years of experience"
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                                />
                            </div>
                            {validationExperience && (
                                <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                    {validationExperience}
                                </p>
                            )}
                        </div>

                        {/* Modal Footer - Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
                            >
                                <FaPaperPlane className="text-sm" />
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default DeveloperForm;