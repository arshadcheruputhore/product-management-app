import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../services/allAPI';

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log('Sign In:', { email, password });

    try {
    const result = await loginAPI({ email, password });

    if (result && result.token) {
      alert("Login successful!");
      localStorage.setItem("token", result.token);
      navigate("/home"); // 👈 Go to home on success
    } else {
      throw new Error("Invalid login response");
    }
  } catch (err) {
    alert(err.message || "Login failed");
  }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log('Sign Up:', { name, email, password });

    try {
    const result = await registerAPI({ name, email, password });
    console.log(result);
    
    if (result && result.user?.id) {
      alert("Registered successfully!");
      setIsSignIn(true); // 👈 Switch to login screen
    } else {
      throw new Error("Invalid registration response");
    }
  } catch (err) {
    alert(err.message || "Registration failed");
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 md:p-10">
      <div className="relative w-full max-w-5xl md:h-[600px] h-[600px] bg-white shadow-xl rounded-2xl overflow-hidden transition-all duration-700">
        {/* Sign In Form */}
        <div className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 ${isSignIn ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col md:flex-row h-full">
            <div className="w-full md:w-3/5 px-6 py-8 md:px-20 flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl font-bold text-yellow-600 mb-6 text-center">Sign In to Your Account</h2>
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
                  <Mail className="text-gray-500 mr-2 min-w-5" />
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent flex-1 focus:outline-none" required />
                </div>
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
                  <Lock className="text-gray-500 mr-2 min-w-5" />
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent flex-1 focus:outline-none" required />
                </div>
                <div className="text-sm text-center text-gray-500 hover:text-yellow-600 underline cursor-pointer">
                  Forgot password?
                </div>
                <div className="flex justify-center">
                  <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-10 rounded-3xl transition w-full md:w-1/2">
                    SIGN IN
                  </button>
                </div>
              </form>
            </div>
            <div className="w-full md:w-2/5 bg-blue-900 text-white flex flex-col justify-center items-center p-10">
              <h1 className="text-3xl font-bold mb-4">Hello Friend!</h1>
              <p className="mb-6 text-center">Enter your details and start your journey with us</p>
              <button onClick={() => setIsSignIn(false)}
                className="border px-6 py-2 rounded-full hover:bg-white hover:text-blue-900 transition">
                SIGN UP
              </button>
            </div>
          </div>
        </div>

        {/* Sign Up Form */}
        <div className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 ${isSignIn ? 'translate-x-full' : 'translate-x-0'}`}>
          <div className="flex flex-col md:flex-row h-full">
            <div className="w-full md:w-2/5 bg-blue-900 text-white flex flex-col justify-center items-center p-10">
              <h1 className="text-3xl font-bold mb-4 text-center">Welcome Back!</h1>
              <p className="mb-6 text-center">To keep connected with us please log in</p>
              <button onClick={() => setIsSignIn(true)}
                className="border px-6 py-2 rounded-full hover:bg-white hover:text-blue-900 transition">
                SIGN IN
              </button>
            </div>
            <div className="w-full md:w-3/5 p-6 md:px-20 flex flex-col justify-center">
              <h2 className="text-3xl md:text-5xl font-bold text-yellow-600 mb-6 text-center">Create Account</h2>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
                  <User className="text-gray-500 mr-2 min-w-5" />
                  <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}
                    className="bg-transparent flex-1 focus:outline-none" required />
                </div>
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
                  <Mail className="text-gray-500 mr-2 min-w-5" />
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent flex-1 focus:outline-none" required />
                </div>
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
                  <Lock className="text-gray-500 mr-2 min-w-5" />
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                    className="bg-transparent flex-1 focus:outline-none" required />
                </div>
                <div className="flex justify-center">
                  <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-10 rounded-3xl transition w-full md:w-1/2">
                    SIGN UP
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
