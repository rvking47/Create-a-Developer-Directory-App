import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaCode, FaUser, FaBriefcase, FaClock, FaSearch, FaUsers, FaPlus } from 'react-icons/fa';
import { TrashIcon, PencilIcon, UserIcon } from 'lucide-react';
import DeveloperForm from './DeveloperForm';
import { MdCallToAction, MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import DeveloperEdit from './DeveloperEdit';
import DeveloperProfile from './DeveloperProfile';

const base_url = "https://create-a-developer-directory-app.onrender.com";

const DeveloperList = () => {
    const [developers, setDevelopers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewRole, setViewRole] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedDeveloper, setSelectedDeveloper] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [techStack, setTechStack] = useState("");
    const [experience, setExperince] = useState("");
    const [description, setDescription] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [file, setFile] = useState(null);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const handleView = async () => {
        try {
            setLoading(true);
            const result = await axios.get(`${base_url}/api/view`, {
                headers: { "Authorization": `Bearer ${token}` },
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
                headers: { "Authorization": `Bearer ${token}` },
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

    const filteredDevelopers = developers.filter(dev =>
        dev.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dev.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dev.techStack?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDevelopers = filteredDevelopers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredDevelopers.length / itemsPerPage);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login")
    }

    const handleDelete = async (id) => {
        try {
            const result = await axios.delete(`${base_url}/api/distroy/${id}`, {
                headers: { "Authorization": `Bearer ${token}` },
                validateStatus: () => true
            });
            if (result.status === 200) {
                toast.success(result.data.message);
                handleView();
            }
            else {
                toast.error(result.data.message);
            }
        }
        catch (err) {
            toast.error("Server Error");
        }
    }

    const handleEditClick = async (id) => {
        setSelectedDeveloper(id);
        setIsEditModalOpen(true);
        try {
            const result = await axios.get(`${base_url}/api/single/${id}`, {
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

    const handleCloseModal = () => {
        setIsEditModalOpen(false);
        setSelectedDeveloper(null);
    };

    const handleProfileClick = (developer) => {
        setSelectedDeveloper(developer);
        setIsProfileModalOpen(true);
    };

    const handleCloseProfileModal = () => {
        setIsProfileModalOpen(false);
        setSelectedDeveloper(null);
    };

    useEffect(() => {
        handleView();
        handleRole();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);
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
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
                        >
                            <FaPlus className="text-lg" />
                            Create Developer
                        </button>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-400 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-700 transform hover:scale-105 transition-all duration-200"
                        >
                            <MdLogout className="text-lg" />
                            Logout
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
                                            <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                                                <div className="flex items-center gap-2">
                                                    <MdCallToAction />
                                                    Action
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {currentDevelopers.map((dev, index) => (
                                            <tr key={dev._id} className="hover:bg-blue-50 transition-colors duration-150">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {indexOfFirstItem + index + 1}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                                          <img src={dev.profileImg} className='rounded-full w-10 h-10' />
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
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex gap-2">
                                                        <button onClick={() => handleDelete(dev._id)} className="flex items-center gap-1 px-2 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200">
                                                            <TrashIcon className="w-4 h-4" />
                                                            <span className="hidden sm:inline">Delete</span>
                                                        </button>
                                                        <button
                                                            onClick={() => handleEditClick(dev._id)}
                                                            className="flex items-center gap-1 px-2 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                                                        >
                                                            <PencilIcon className="w-4 h-4" />
                                                            <span className="hidden sm:inline">Edit</span>
                                                        </button>

                                                        <button
                                                            onClick={() => handleProfileClick(dev._id)}
                                                            className="flex items-center gap-1 px-2 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200"
                                                        >
                                                            <UserIcon className="w-4 h-4" />
                                                            <span className="hidden sm:inline">Profile</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="lg:hidden space-y-4">
                            {currentDevelopers.map((dev, index) => (
                                <div key={dev._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                                                {dev.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold text-lg">{dev.name}</h3>
                                                <p className="text-blue-100 text-sm">#{indexOfFirstItem + index + 1}</p>
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

                                        <div className="flex items-start gap-3">
                                            <div className="flex gap-2">
                                                <button onClick={() => handleDelete(dev._id)} className="flex items-center gap-1 px-2 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200">
                                                    <TrashIcon className="w-4 h-4" />
                                                    <span className="hidden sm:inline">Delete</span>
                                                </button>
                                                <button
                                                    onClick={() => handleEditClick(dev._id)}
                                                    className="flex items-center gap-1 px-2 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                                                >
                                                    <PencilIcon className="w-4 h-4" />
                                                    <span className="hidden sm:inline">Edit</span>
                                                </button>

                                                <button
                                                    onClick={() => handleProfileClick(dev._id)}
                                                    className="flex items-center gap-1 px-2 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200"
                                                >
                                                    <UserIcon className="w-4 h-4" />
                                                    <span className="hidden sm:inline">Profile</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {totalPages > 1 && (
                            <div className="mt-6 bg-white rounded-lg shadow-md p-4">
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="text-sm text-gray-700">
                                        Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                                        <span className="font-medium">
                                            {Math.min(indexOfLastItem, filteredDevelopers.length)}
                                        </span>{' '}
                                        of <span className="font-medium">{filteredDevelopers.length}</span> developers
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                        >
                                            Previous
                                        </button>

                                        <div className="flex gap-1">
                                            {[...Array(totalPages)].map((_, idx) => {
                                                const pageNumber = idx + 1;
                                                if (
                                                    pageNumber === 1 ||
                                                    pageNumber === totalPages ||
                                                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                                ) {
                                                    return (
                                                        <button
                                                            key={pageNumber}
                                                            onClick={() => setCurrentPage(pageNumber)}
                                                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${currentPage === pageNumber
                                                                ? 'bg-blue-600 text-white'
                                                                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                                                                }`}
                                                        >
                                                            {pageNumber}
                                                        </button>
                                                    );
                                                } else if (
                                                    pageNumber === currentPage - 2 ||
                                                    pageNumber === currentPage + 2
                                                ) {
                                                    return (
                                                        <span key={pageNumber} className="px-2 py-2 text-gray-500">
                                                            ...
                                                        </span>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>

                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
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
            {isEditModalOpen && (
                <DeveloperEdit
                    id={selectedDeveloper} name={name} role={role} techStack={techStack} experience={experience} joiningDate={joiningDate} pfile={file} description={description} viewRole={viewRole}
                    setName={setName} setRole={setRole} setTechStack={setTechStack} setExperince={setExperince} setJoiningDate={setJoiningDate} setFile={setFile} setDescription={setDescription}
                    handleView={handleView}
                    onClose={handleCloseModal}
                    onUpdate={(updatedData) => {
                        handleCloseModal();
                    }}
                />)}
            {isProfileModalOpen && (
                <DeveloperProfile
                    developer={selectedDeveloper}
                    onClose={handleCloseProfileModal}
                />
            )}
        </div>
    );
};


export default DeveloperList;
