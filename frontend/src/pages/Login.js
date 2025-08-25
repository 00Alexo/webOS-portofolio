import { useState, useEffect, useRef } from "react";
import mpapi from '../assets/mpapi.jpg';
import { User, Eye, EyeOff, ArrowRight } from "lucide-react";

const Login = ({user, setUser}) => {
    const [password, setPassword] = useState('');
    const [inLogin, setInLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const divRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (divRef.current) {
            divRef.current.focus();
        }
    }, []);

    const handleLogin = (e) => {
        if (e) e.preventDefault();
        if(!password){
            setError(`Password can't be empty (any password works)`);
            setTimeout(() => {
                setError(null);
            }, 7000);
            return;
        }
        setUser(true);
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
        overflow-hidden" style={{ backgroundImage: `url(${mpapi})` }} tabIndex={0}
        onKeyDown={(e) => {
            if(e.key === 'Enter' && !inLogin) {
                setInLogin(true);
            } else if (e.key === 'Escape' && inLogin) {
                setInLogin(false);
            }
        }}>
            <div className={`absolute inset-0 backdrop-blur-md transition-opacity duration-500 ease-in-out ${inLogin ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}></div>

            <div className={`absolute inset-0 flex justify-center transition-opacity duration-500 ease-in-out ${inLogin ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
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
                            Press enter to continue
                        </p>
                    </div>
                </div>
            </div>

            <div className={`absolute inset-0 flex justify-center items-center flex-col transition-opacity duration-500 ease-in-out ${inLogin ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <form onSubmit={handleLogin} className="relative z-10 flex gap-4 flex-col items-center">
                    <div className="rounded-full bg-white p-7 w-fit">
                        <User size={96} color="grey"> </User>
                    </div>
                    <p className="text-2xl text-center text-white"> User</p>
                    
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {setPassword(e.target.value); if(error) setError(null)}}
                            className="w-full px-4 py-2 pr-20 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-white"
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                            <button
                                type="submit"
                                onClick={handleLogin}
                                className="text-white/70 hover:text-white transition-colors"
                            >
                                <ArrowRight size={20} />
                            </button>   
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-300 text-sm mt-2 bg-red-900/30 px-3 py-1 rounded border border-red-400/50
                        [text-shadow:_1px_1px_2px_rgb(0_0_0_/_80%)]">
                            {error}
                        </p>
                    )}
                </form>
                <p className="text-slate-200 mt-6 font-thin text-sm [text-shadow:_1px_1px_2px_rgb(0_0_0_/_80%),_0_0_4px_rgb(0_0_0_/_30%)]">
                    Press enter to continue
                </p>
            </div>
        </div>
    );
}
 
export default Login;