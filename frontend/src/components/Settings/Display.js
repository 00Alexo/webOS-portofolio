import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import mpapi from '../../assets/mpapi.jpg'
import rashy from '../../assets/rashy.jpg'
import { useState, useRef } from 'react';   
import { localStorageManager } from '../../utils/localStorageManager';

const Display = () => {
    const [changingBg, setChangingBg] = useState(false);
    const fileInputRef = useRef(null);
    const manager = new localStorageManager();

    const [bgImg, setBgImg] = useState(manager.getBackgroundImage());
    const [stImg, setStImg] = useState(manager.getStarterImage());

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64Image = e.target.result;
                console.log('Base64 image:', base64Image);
                manager.setBackgroundImage(base64Image);
                setBgImg(base64Image);
            };
            reader.readAsDataURL(file);
        }
    };

    const [changingSt, setChangingSt] = useState(false);
    const stInputRef = useRef(null);

    const handleBrowseStClick = () => {
        stInputRef.current?.click();
    };

    const handleStChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64Image = e.target.result;
                console.log('Base64 image:', base64Image);
                manager.setStarterImage(base64Image);
                setStImg(base64Image);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <div>
                <h1 className="text-3xl font-bold mb-4">Display</h1>
            </div>
            <div className="w-full flex flex-row justify-between">
                <div className="w-[35%] rounded-lg border-[8px] border-black h-48 flex justify-end items-end
                bg-cover bg-center bg-no-repeat shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] p-4" 
                    style={{ backgroundImage: `url(${bgImg || rashy})` }}>
                    <div className='bg-[#1e1e1e] w-20 h-24 rounded-lg flex flex-col justify-between p-3'>
                        <div className="flex flex-col gap-2">
                            <div className='w-full h-[0.25px] bg-white'/>
                            <div className='w-full h-[0.25px] bg-white'/>
                            <div className='w-full h-[0.25px] bg-white'/>
                            <div className='w-4/6 h-[0.25px] bg-white'/>
                        </div>
                        <div className='bg-blue-400 w-5 h-1.5 rounded-lg ml-auto'/>
                    </div>
                </div>

                <div className="w-[35%] rounded-lg border-[8px] border-black h-48 flex justify-end items-end
                bg-cover bg-center bg-no-repeat shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] p-4" 
                    style={{ backgroundImage: `url(${stImg || mpapi})` }}>
                    <div className='bg-[#1e1e1e] w-20 h-24 rounded-lg flex flex-col justify-between p-3'>
                        <div className="flex flex-col gap-2">
                            <div className='w-full h-[0.25px] bg-white'/>
                            <div className='w-full h-[0.25px] bg-white'/>
                            <div className='w-full h-[0.25px] bg-white'/>
                            <div className='w-4/6 h-[0.25px] bg-white'/>
                        </div>
                        <div className='bg-blue-400 w-5 h-1.5 rounded-lg ml-auto'/>
                    </div>
                </div>
            </div>
            <div>
                <div className={`items-center flex flex-row bg-white/10 p-4 cursor-pointer justify-between transition-all duration-200
                ${changingBg ? 'rounded-t-md' : 'rounded-md'}`}
                onClick={() => setChangingBg(prev => !prev)}>
                    <div>
                        <div>
                            <p className="font-semibold text-sm"> Personalize your background</p>
                        </div>
                        <div>
                            <p className="text-sm">Choose a new background image from your storage</p>
                        </div>
                    </div>
                    <div>
                        {changingBg ? 
                            <ArrowDown size={20} className="text-white"/> 
                            : 
                            <ArrowRight size={20} className="text-white"/>
                        }
                    </div>
                </div>
                {changingBg &&
                    <div className=' mt-0.5 flex flex-row justify-between items-center bg-white/10 p-4 rounded-b-md'>
                        <div>
                            Choose a photo
                        </div>
                        <button onClick={handleBrowseClick}
                        className='bg-white/10 rounded-lg py-2 text-sm font-semibold px-4 cursor-pointer'>
                            Browse photos
                        </button>
                        <input 
                            type="file" 
                            className='hidden' 
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                        />
                    </div>
                }
            </div>
            <div>
                <div className={`items-center flex flex-row bg-white/10 p-4 cursor-pointer justify-between transition-all duration-200
                ${changingSt ? 'rounded-t-md' : 'rounded-md'}`}
                onClick={() => setChangingSt(prev => !prev)}>
                    <div>
                        <div>
                            <p className="font-semibold text-sm"> Personalize your starter screen</p>
                        </div>
                        <div>
                            <p className="text-sm">Choose a new starter screen image from your storage</p>
                        </div>
                    </div>
                    <div>
                        {changingSt ? 
                            <ArrowDown size={20} className="text-white"/> 
                            : 
                            <ArrowRight size={20} className="text-white"/>
                        }
                    </div>
                </div>
                {changingSt &&
                    <div className=' mt-0.5 flex flex-row justify-between items-center bg-white/10 p-4 rounded-b-md'>
                        <div>
                            Choose a photo
                        </div>
                        <button onClick={handleBrowseStClick}
                        className='bg-white/10 rounded-lg py-2 text-sm font-semibold px-4 cursor-pointer'>
                            Browse photos
                        </button>
                        <input 
                            type="file" 
                            className='hidden' 
                            ref={stInputRef}
                            onChange={handleStChange}
                            accept="image/*"
                        />
                    </div>
                }
            </div>
        </div>
    );
}
 
export default Display;