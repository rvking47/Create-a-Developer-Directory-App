import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FaUser, FaBriefcase, FaCode, FaClock, FaPaperPlane, FaTimes } from 'react-icons/fa'
import { FaCalendar, FaFileAlt, FaImage } from 'react-icons/fa'
import "../App.css"

const base_url = "http://localhost:7002";

const DeveloperForm = ({ isOpen, onClose, onDeveloperAdded, viewRole }) => {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [techStack, setTechStack] = useState("");
    const [experience, setExperince] = useState("");
    const [description, setDescription] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [file, setFile] = useState(null);
    const [validationName, setValidationName] = useState("");
    const [validationRole, setValidationRole] = useState("");
    const [validationTechStack, setValidationTechStack] = useState("");
    const [validationExperience, setValidationExperince] = useState("");
    const [validationDescription, setValidationDescription] = useState("");
    const [validationJoingDate, setValidationJoinngDate] = useState("");
    const [validationFile, setValidationFile] = useState("");
    const token = localStorage.getItem("token");
    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setValidationFile('Image size should be less than 5MB');
                return;
            }
            setFile(file);
            setValidationFile('');
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!file) {
            setValidationFile("Please select an image");
            return;
        }

        setLoading(true);
        setValidationName("");
        setValidationRole("");
        setValidationTechStack("");
        setValidationExperince("");
        setValidationDescription("");
        setValidationJoinngDate("");
        setValidationFile("");


        const uplode = new FormData();
        uplode.append("name", name);
        uplode.append("role", role);
        uplode.append("techStack", techStack);
        uplode.append("experience", experience);
        uplode.append("description", description);
        uplode.append("joiningDate", joiningDate);
        uplode.append("file", file);
        try {
            const result = await axios.post(`${base_url}/api/create`, uplode, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
                validateStatus: () => true
            });
            if (result.status === 201) {
                toast.success(result.data.message);
                setName("");
                setRole("");
                setTechStack("");
                setExperince("");
                setDescription("");
                setJoiningDate("");
                setFile(null);
                setImagePreview("");
                onClose();
                onDeveloperAdded && onDeveloperAdded();
            }
            else if (result.status === 400) {

            }
            else {
                if (result.data?.errors) {
                    result.data.errors.forEach(err => {
                        if (err.field === "name") setValidationName(err.message);
                        if (err.field === "role") setValidationRole(err.message);
                        if (err.field === "techStack") setValidationTechStack(err.message);
                        if (err.field === "experience") setValidationExperince(err.message);
                        if (err.field === "description") setValidationDescription(err.message);
                        if (err.field === "joiningDate") setValidationJoinngDate(err.message);
                    });
                }
            }
        } catch (err) {
            toast.error("Server Error");
        } finally {
            setLoading(false);
        }
    };
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
                    <div className="top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
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
                    <form className="p-6 space-y-6">
                        {/* Image Upload Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Profile Image
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    {imagePreview ? (
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                                        />
                                    ) : (
                                        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-gray-200">
                                            <FaUser className="text-3xl text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <label className="cursor-pointer">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all duration-200 border-2 border-blue-200 w-fit">
                                            <FaImage className="text-lg" />
                                            <span className="font-medium">Choose Image</span>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>
                                    <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF (Max 5MB)</p>
                                </div>
                            </div>
                            {validationFile && (
                                <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                    {validationFile}
                                </p>
                            )}
                        </div>

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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                    Joining Date
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <FaCalendar className="text-gray-400" />
                                    </div>
                                    <input
                                        type="date"
                                        value={joiningDate}
                                        onChange={(e) => setJoiningDate(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                                    />
                                </div>
                                {validationJoingDate && (
                                    <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                        {validationJoingDate}
                                    </p>
                                )}
                            </div>
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
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Description
                            </label>
                            <div className="relative">
                                <div className="absolute top-3 left-0 pl-4 pointer-events-none">
                                    <FaFileAlt className="text-gray-400" />
                                </div>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Brief description about the developer..."
                                    rows="2"
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                                />
                            </div>
                            {validationDescription && (
                                <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                    {validationDescription}
                                </p>
                            )}
                        </div>
                        <div style={{ marginTop: "-20px" }} className="flex gap-3">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreate}
                                type="submit"
                                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
                            >
                                <FaPaperPlane className="text-sm" />
                                {loading ? "Loading..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default DeveloperForm;