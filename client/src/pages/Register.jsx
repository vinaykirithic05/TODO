// client/src/pages/Register.jsx
import React from "react";
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../context/AuthContext";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { Mail, User, Lock, Eye, EyeOff } from "lucide-react";

const Register = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!username.trim() ||!email.trim() || !password.trim()) {
      setError("Please fill in all Fields");
      toast.error("Please fill in all Fields");
      return;
    }
    if (username.length < 3) {
      setError("Username must be at least 3 characters long");
      toast.error("Username must be at least 3 characters long");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email !");
      toast.error("Please enter a valid email !");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 Characters long");
      toast.error("Password must be at least 8 Characters long");
      return;
    }
    try {
      await register(username, email, password);
      toast.success("Created Account Successfully !");
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Registration Failed");
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="w-full mesh-gradient min-h-screen flex flex-col items-center text-on-surface">
      <div className="flex flex-col items-center justify-center py-10 gap-2">
        <img className="w-12 h-12" src={assets.logo} alt="" />
        <h1 className="text-3xl md:text-4xl font-black text-[#9E4BED]">
          TaskFlow
        </h1>
        <p className="text-xs md:text-sm tracking-wider text-[#B76DFF]  ">
          Optimize your workflow with precsion
        </p>
      </div>
      <div className="w-full max-w-[480px] border border-white/20 bg-transparent py-10 rounded-2xl flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="font-black uppercase tracking-tighter">
            Create your Account
          </h1>
          <p className="pt-2 font-semibold ">
            Join the Community of high - performance
          </p>
        </div>
        <div className="w-full flex flex-col space-y-4 p-10 text-left">
          <div className="flex flex-col space-y-2 gap-2">
            <label className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wide">
              Username
            </label>
            <div className="relative flex items-center ">
              <User className="absolute left-4 w-4 h-4" />
              <input
                type="text"
                className="border border-white/5 bg-surface-container-lowest w-full py-3.5 pl-12 pr-4 rounded-2xl placeholder-on-surface focus:outline-hidden focus:border-primary transition-colors duration-300"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="John Doe"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2 gap-2">
            <label className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wide">
              Email Address
            </label>
            <div className="relative flex items-center ">
              <Mail className="absolute left-4 w-4 h-4" />
              <input
                type="text"
                className="border border-white/5 bg-surface-container-lowest w-full py-3.5 pl-12 pr-4 rounded-2xl placeholder-on-surface focus:outline-hidden focus:border-primary transition-colors duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2 gap-2">
            <label className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wide">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 w-4 h-4" />
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e)=>setPassword(e.target.value)}
                className="border border-white/5 bg-surface-container-lowest w-full py-3.5 pl-12 pr-4 rounded-2xl placeholder-on-surface focus:outline-hidden focus:border-primary transition-colors duration-500"
                placeholder="......."
              />
              <button
                type="button"
                className="absolute right-4 "
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <button type="button"
                  className="w-full py-3.5 primary-gradient rounded-2xl hover:scale-105 text-background/80 font-bold transition-all duration-300"
                  onClick={handleSubmit}
          >Create Account</button>
          <div className="flex items-center justify-center gap-4 w-full">
            <div className="h-px bg-white/10 flex-1"></div>
            <span className="uppercase text-[10px] tracking-widest">or continue with</span>
            <div className="h-px bg-white/10 flex-1"></div>
          </div>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="flex items-center justify-center gap-2 border border-white/10 py-2 rounded-2xl hover:primary-gradient hover:text-background transition-colors duration-300 cursor-pointer">
              <img className="w-5 h-5 rounded-full" src={assets.G} alt="" />
              <p>Google</p>
            </div>
            <div className="flex items-center justify-center gap-2 border border-white/10 py-2 rounded-2xl hover:primary-gradient hover:text-background transition-colors duration-300 cursor-pointer">
              <img className="w-5 h-5 rounded-full" src={assets.apple} alt="" />
              <p>Apple</p>
            </div>
          </div>
          <p className="text-center text-sm font-bold">Already have an account ? <span onClick={()=>navigate('/login')} className="text-blue-500 underline cursor-pointer">Log in</span></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
