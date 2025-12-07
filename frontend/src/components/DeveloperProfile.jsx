import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaTimes, FaUser, FaBriefcase, FaCode, FaClock, FaCalendar, FaFileAlt} from 'react-icons/fa';

const base_url = "http://localhost:7002";

function DeveloperProfile({ developer, onClose }) {
    if (!developer) return null;

    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [techStack, setTechStack] = useState("");
    const [experience, setExperince] = useState("");
    const [description, setDescription] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [file, setFile] = useState(null);
    const token = localStorage.getItem("token");


    const handleSingle = async () => {
        try {
            const result = await axios.get(`${base_url}/api/single/${developer}`, {
                headers: { "Authorization": `Bearer ${token}` },
                validateStatus: () => true
            });
            if (result.status === 200) {
                setName(result.data.name);
                setRole(result.data.role);
                setTechStack(result.data.techStack);
                setExperince(result.data.experience);
                setDescription(result.data.description);
                setJoiningDate(result.data.joiningDate);
                setFile(result.data.profileImg);
            }
        }
        catch (err) {
            toast.error("Server Error");
        }
    };

    useEffect(() => {
        handleSingle();
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-slideUp">
                <div className="top-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <FaUser className="text-xl" />
                        Developer Profile
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200"
                    >
                        <FaTimes className="text-xl" />
                    </button>
                </div>
                <div className="p-6">
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative mb-4">
                            {file ? (
                                <img
                                    src={file}
                                    alt={name}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-green-100 shadow-lg"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center border-4 border-green-100 shadow-lg">
                                    <FaUser className="text-5xl text-white" />
                                </div>
                            )}
                            <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2 border-4 border-white">
                                <FaUser className="text-white text-sm" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-800 mb-1">{name}</h3>
                        <p className="text-lg text-green-600 font-semibold">{role}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-blue-500 rounded-lg p-2">
                                    <FaCode className="text-white text-lg" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-800">Tech Stack</h4>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{techStack || 'Not specified'}</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-purple-500 rounded-lg p-2">
                                    <FaClock className="text-white text-lg" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-800">Experience</h4>
                            </div>
                            <p className="text-gray-700 text-2xl font-bold">{experience || 0} Years</p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-orange-500 rounded-lg p-2">
                                    <FaCalendar className="text-white text-lg" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-800">Joining Date</h4>
                            </div>
                            <p className="text-gray-700 font-medium">
                                {joiningDate ? new Date(joiningDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) : 'Not specified'}
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-green-500 rounded-lg p-2">
                                    <FaBriefcase className="text-white text-lg" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-800">Role</h4>
                            </div>
                            <p className="text-gray-700 font-medium">{role || 'Not specified'}</p>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-gray-500 rounded-lg p-2">
                                <FaFileAlt className="text-white text-lg" />
                            </div>
                            <h4 className="text-lg font-semibold text-gray-800">Description</h4>
                        </div>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{description}</p>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200"
                        >
                            Close Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeveloperProfile;