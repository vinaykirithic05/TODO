// client/src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../context/AuthContext";
import { assets } from "../assets/assets";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  // Handling Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if(!email || !password){
      setError("Please Provide the Details !")
      toast.error("Please Provide the Details !")
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      setError("Please provide valid email Id !")
      toast.error("Please provide valid email Id !")
      return;
    }
    if(password.length < 8){
      setError("Password Length must be greater than 8")
      toast.error("Password Length must be greater than 8)")
      return
    }
    try {
      await login(email, password);
      toast.success("Logined Successfully !")
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Invalid email or password");
      toast.error(error.response?.data?.message || "Invalid Email and Password ");
    }
  };
  return (
    <div className="w-full  min-h-screen mesh-gradient flex flex-col  items-center text-on-background ">
      <div className=" flex flex-col justify-center items-center py-10">
        <img className="w-12 h-12" src={assets.logo} alt="" />
        <h1 className="font-black tracking-tight text-3xl md:text-4xl text-[#9E4BED]">
          TaskFlow
        </h1>
        <p className="pt-2 text-xs tracking-wider md:text-sm text-[#B76DFF]">
          Optimize your workflow with precision
        </p>
      </div>
      <div className=" w-full  max-w-[480px] p-10  bg-transparent border border-white/20 rounded-2xl text-on-background flex flex-col items-center mb-5">
        <div className="text-center">
          <h1 className="font-semibold">Login to your Account</h1>
          <p className="text-sm pt-1.5 tracking-tight">
            Join the Community of high-performers
          </p>
        </div>
        <form onSubmit={handleSubmit} className=" w-full flex flex-col space-y-4 py-10 text-left">
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wide">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 w-4 h-4 text-on-surface-variant/60" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-white/5 bg-surface-container-lowest py-3.5 pl-12 pr-4 rounded-2xl focus:outline-hidden text-sm placeholder-on-surface-variant transition-all duration-300 focus:border-primary"
                placeholder="name@company.com"
              />
            </div>
          </div>
          <div className="flex-col flex space-y-2">
            <div className="flex justify-between">
              <label className="text-[10px] uppercase text-on-surface-variant font-bold tracking-wide">
                Password
              </label>
              <span className="text-[10px] underline cursor-pointer font-bold ">
                Forgot Password ?{" "}
              </span>
            </div>
            <div className="relative flex items-center">
              <Lock className=" absolute left-4 w-4 h-4" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3.5 pl-12 pr-12 bg-surface-container-lowest border border-white/5 rounded-xl text-sm text-on-surface placeholder-on-surface-variant/30 focus:border-primary/40 focus:outline-hidden transition-all duration-300"
                placeholder="........"
              />
              <button
                type="button"
                onClick={()=>setShowPassword(!showPassword)}
                className="absolute right-4 text-on-surface-variant/60 hover:text-on-surface transition-all duration-300 "
              >
                {showPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <button type='submit' className="w-full primary-gradient text-on-surface-variant font-black shadow-lg shadow-primary-container/20 transition-all duration-300 hover:scale-105 cursor-pointer border border-white/5 py-2 rounded-2xl"
            
          >Login</button>
        </form>
        <div className="w-full flex items-center justify-center gap-4 py-2">
          <div className="h-px flex-1 bg-white/10"></div>
          <span className="text-[10px]  mx-4 font-bold text-outline uppercase tracking-widest px-2">or continue with</span>
          <div className="h-px flex-1 bg-white/10"></div>
        </div>
        <div className="w-full grid grid-cols-2 gap-4 ">
          <button className="flex items-center justify-center gap-2 border border-white/20 rounded-2xl py-2 hover:primary-gradient transition-all duration-300 ">
            <img className="w-5 rounded-full h-5 " src={assets.G} alt="google-logo" />
            <span>Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 border border-white/20 rounded-2xl py-2 hover:primary-gradient transition-colors duration-300 ">
            <img className="w-5 rounded-full h-5 " src={assets.apple} alt="google-logo" />
            <span>Apple</span>
          </button>
        </div>
        <div className="mt-4 flex items-center justify-cente cursor-pointer">
          <p>Don't have an Account ? <span className="text-primary-container underline" onClick={()=>navigate('/register')}>Signup</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
