import { useState, useEffect, useRef } from "react";
import mpapi from '../assets/mpapi.jpg';
import { User, Eye, EyeOff, ArrowRight, Pencil, ArrowLeft } from "lucide-react";
import { useSignIn } from "../hooks/useSignIn";
import { useSignup } from "../hooks/useSignUp";
import { localStorageManager } from "../utils/localStorageManager";

const Login = () => {
    const [password, setPassword] = useState('');
    const manager = new localStorageManager();
    const [username, setUsername] = useState('');
    const [inLogin, setInLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const divRef = useRef(null);
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const [bgImg, setBgImg] = useState(manager.getBackgroundImage());
    const [stImg, setStImg] = useState(manager.getStarterImage());

    const { signin, error : signInError } = useSignIn();
    const { signup, error : signUpError } = useSignup();

    const error = isRegister ? signUpError : signInError;

    useEffect(() => {
        if (divRef.current) {
            divRef.current.focus();
        }
    }, []);

    const handleLogin = async (e) => {
        e?.preventDefault();
        await signin(username, password);
    }

    const handleRegister = async (e) => {
        e?.preventDefault();
        await signup(username, password, confirmPassword);
    }

    const [time, setTime] = useState(new Date());

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long', 
            day: 'numeric'
        });
    };
    
    return (
        <div ref={divRef} className="relative flex w-screen h-screen justify-center items-center bg-cover bg-center select-none
        overflow-hidden" style={{ backgroundImage: `url(${stImg || mpapi})` }} tabIndex={0}
        onKeyDown={(e) => {
            if(e.key === 'Enter' && !inLogin) {
                setInLogin(true);
            }
        }}
        onClick={(e) => {
            if (!inLogin && e.target === e.currentTarget) {
                setInLogin(true);
            }
        }}>
            <div className={`absolute inset-0 backdrop-blur-md transition-opacity duration-500 ease-in-out ${inLogin ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}></div>
            <div className={`absolute inset-0 flex justify-center transition-opacity duration-500 ease-in-out ${inLogin ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                 onClick={() => setInLogin(true)}>
                <div className="flex flex-col text-center justify-between mt-[7vh] text-white [text-shadow:_2px_2px_4px_rgb(0_0_0_/_80%)]">
                    <div>
                        <div className="text-[7rem] font-light leading-none mb-2">
                            {formatTime(time)}
                        </div>
                        <div className="text-2xl font-light">
                            {formatDate(time)}
                        </div>
                    </div>
                    <div>
                        <p className="text-slate-200 mb-6 font-thin text-sm [text-shadow:_1px_1px_2px_rgb(0_0_0_/_80%),_0_0_4px_rgb(0_0_0_/_30%)]">
                            Click or press enter to continue
                        </p>
                    </div>
                </div>
            </div>

            {!isRegister &&
            <div className={`absolute inset-0 flex justify-center items-center flex-col transition-opacity duration-500 ease-in-out ${inLogin ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute left-2 top-2 text-white font-semibold flex flex-row gap-2 items-center cursor-pointer"
                onClick={() => setInLogin(false)}> 
                    <ArrowLeft size={24}/>
                    <p className="text-lg">BACK</p>
                </div>
                
                <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-[400px] shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-light text-white mb-2">webOS</h1>
                        <p className="text-white/70 text-sm">Sign in to continue</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="flex justify-center mb-6">
                            <div className="rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-lg">
                                <div className="rounded-full bg-white/90 p-6">
                                    <User size={64} className="text-gray-700" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-white/80 text-sm font-medium block">Username</label>
                            {isEditingUsername ? (
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onBlur={() => setIsEditingUsername(false)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            setIsEditingUsername(false);
                                        }
                                        if (e.key === 'Escape') {
                                            setIsEditingUsername(false);
                                        }
                                    }}
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm text-white placeholder-white/50 
                                             border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                                             focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your username"
                                    autoFocus
                                />
                            ) : (
                                <div 
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm text-white 
                                             border border-white/20 rounded-lg cursor-pointer hover:bg-white/15 
                                             transition-all duration-200 flex items-center justify-between"
                                    onClick={() => setIsEditingUsername(true)}
                                >
                                    <span className={username ? "text-white" : "text-white/50"}>
                                        {username || "Enter your username"}
                                    </span>
                                    <Pencil size={16} className="text-white/50" />
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-white/80 text-sm font-medium block">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => {setPassword(e.target.value)}}
                                    className="w-full px-4 py-3 pr-12 bg-white/10 backdrop-blur-sm text-white placeholder-white/50 
                                             border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                                             focus:border-transparent transition-all duration-200"
                                    onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                                <p className="text-red-200 text-sm text-center">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            onClick={handleLogin}
                            className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium py-3 px-4 
                                     rounded-lg border border-white/20 transition-all duration-200 
                                     focus:outline-none focus:ring-2 focus:ring-white/50"
                        >
                            Sign In
                        </button>

                        <div className="mt-6 text-center">
                            <span className="text-white/60 text-sm">Don't have an account? </span>
                            <button
                                type="button"
                                onClick={() => setIsRegister(true)}
                                className="text-white/90 hover:text-white text-sm font-medium underline underline-offset-2 
                                         hover:underline-offset-4 transition-all duration-200"
                            >
                                Create one
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            }

            {isRegister &&
            <div className={`absolute inset-0 flex justify-center items-center flex-col transition-opacity duration-500 ease-in-out ${inLogin ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                
                <div className="absolute left-2 top-2 text-white font-semibold flex flex-row gap-2 items-center cursor-pointer"
                onClick={() => setInLogin(false)}> 
                    <ArrowLeft size={24}/>
                    <p className="text-lg">BACK</p>
                </div>

                <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-8 w-[400px] shadow-2xl max-h-[90vh] overflow-y-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-light text-white mb-2">Join webOS</h1>
                        <p className="text-white/70 text-sm">Create your account to get started</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-6">
                        <div className="flex justify-center mb-6">
                            <div className="rounded-full bg-gradient-to-br from-green-500 to-blue-600 p-1 shadow-lg">
                                <div className="rounded-full bg-white/90 p-6">
                                    <User size={64} className="text-gray-700" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-white/80 text-sm font-medium block">Username</label>
                            {isEditingUsername ? (
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onBlur={() => setIsEditingUsername(false)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            setIsEditingUsername(false);
                                        }
                                        if (e.key === 'Escape') {
                                            setIsEditingUsername(false);
                                        }
                                    }}
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm text-white placeholder-white/50 
                                             border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 
                                             focus:border-transparent transition-all duration-200"
                                    placeholder="Choose a username"
                                    autoFocus
                                />
                            ) : (
                                <div 
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm text-white 
                                             border border-white/20 rounded-lg cursor-pointer hover:bg-white/15 
                                             transition-all duration-200 flex items-center justify-between"
                                    onClick={() => setIsEditingUsername(true)}
                                >
                                    <span className={username ? "text-white" : "text-white/50"}>
                                        {username || "Choose a username"}
                                    </span>
                                    <Pencil size={16} className="text-white/50" />
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-white/80 text-sm font-medium block">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a secure password"
                                    value={password}
                                    onChange={(e) => {setPassword(e.target.value)}}
                                    className="w-full px-4 py-3 pr-12 bg-white/10 backdrop-blur-sm text-white placeholder-white/50 
                                             border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 
                                             focus:border-transparent transition-all duration-200"
                                    onKeyDown={(e) => e.key === 'Enter' && handleRegister(e)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-white/80 text-sm font-medium block">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => {setConfirmPassword(e.target.value)}}
                                    className="w-full px-4 py-3 pr-12 bg-white/10 backdrop-blur-sm text-white placeholder-white/50 
                                             border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 
                                             focus:border-transparent transition-all duration-200"
                                    onKeyDown={(e) => e.key === 'Enter' && handleRegister(e)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                                <p className="text-red-200 text-sm text-center">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            onClick={handleRegister}
                            className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium py-3 px-4 
                                     rounded-lg border border-white/20 transition-all duration-200 
                                     focus:outline-none focus:ring-2 focus:ring-white/50"
                        >
                            Create Account
                        </button>

                        <div className="mt-6 text-center">
                            <span className="text-white/60 text-sm">Already have an account? </span>
                            <button
                                type="button"
                                onClick={() => setIsRegister(false)}
                                className="text-white/90 hover:text-white text-sm font-medium underline underline-offset-2 
                                         hover:underline-offset-4 transition-all duration-200"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            }
        </div>
    );
}
 
export default Login;