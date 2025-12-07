import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdLogin } from 'react-icons/md';

const base_url = "https://create-a-developer-directory-app-backend.onrender.com";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [validationEmail, setValidationEmail] = useState("");
    const [validationPassword, setValidationPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setValidationEmail("");
        setValidationPassword("");
        setLoading(true);
        try {
            const result = await axios.post(`${base_url}/api/auth/logIn`, { email, password }, {
                headers: { "Content-Type": "application/json" },
                validateStatus: () => true
            });
            if (result.status === 200) {
                toast.success(result.data.message);
                localStorage.setItem("token", result.data.token);
                localStorage.setItem("user", JSON.stringify(result.data.user));
                setEmail("");
                setPassword("");
                setTimeout(() => {
                    navigate("/home");
                });
            } else if (result.status === 402) {
                toast.error(result.data.message);
            }
            else {
                result.data.errors.forEach(err => {
                    if (err.field === "email") setValidationEmail(err.message);
                    if (err.field === "password") setValidationPassword(err.message);
                });
            }
        } catch (err) {
            toast.error("Server Error!!");
        } finally {
            setLoading(false);
        }
    };

    const handleSingupPage = () => navigate("/signup");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/home");
        }
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 nunito-uniquifier">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-2">
                            <MdLogin className="text-white text-3xl" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800">Login Account</h1>
                        <p className="text-gray-500 text-sm">Join us today and get started</p>
                    </div>

                    <div className="space-y-5">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className={`w-full pl-10 pr-4 py-3 border ${validationEmail ? 'border-red-500' : 'border-gray-300'
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                                />
                            </div>
                            {validationEmail && (
                                <p className="text-red-500 text-xs mt-1 flex items-center">
                                    <span className="mr-1">⚠</span> {validationEmail}
                                </p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a strong password"
                                    className={`w-full pl-10 pr-12 py-3 border ${validationPassword ? 'border-red-500' : 'border-gray-300'
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {validationPassword && (
                                <p className="text-red-500 text-xs mt-1 flex items-center">
                                    <span className="mr-1">⚠</span> {validationPassword}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            onClick={handleLogin}
                            disabled={loading}
                            className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-blue-600 hover:to-purple-700'
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Login Account...
                                </span>
                            ) : (
                                'LogIn'
                            )}
                        </button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Create new account?</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={handleSingupPage}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline transition duration-200"
                        >
                            Sign Up instead
                        </button>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    );
};


export default Login;
