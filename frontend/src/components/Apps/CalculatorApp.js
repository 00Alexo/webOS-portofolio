import { ChevronRight, X, Minus, Square, Plus } from "lucide-react";
import {useState, useEffect, useRef} from 'react';
import Draggable from 'react-draggable';
import useWindowSize from '../../hooks/useWindowSize';

const CalculatorApp = ({setOpenApps, bringToFront, appId, openApps}) => {
    const windowSize = useWindowSize();
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const draggableRef = useRef(null);

    const handleCalculatorClick = () => {
        if (bringToFront && appId) {
            bringToFront(appId);
        }
    };

    const handleDrag = (e, data) => {
        setPosition({ x: data.x, y: data.y });
    };

    const [forExec, setForExec] = useState('');

    const buttons = [
        {
            label: 'R',
            color: '#ED2939',
            hoverColor: '#C41E3A',
            activeColor: '#B01E3A'
        },
        {
            label: '(',
            color: '#ED2939',
            hoverColor: '#C41E3A',
            activeColor: '#B01E3A'
        },
        {
            label: ')',
            color: '#ED2939',
            hoverColor: '#C41E3A',
            activeColor: '#B01E3A'
        },
        {
            label: '÷',
            color: '#3B82F6',
            hoverColor: '#2563EB',
            activeColor: '#1D4ED8'
        },
        {
            label: '7',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937'
        },
        {
            label: '8',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937'
        },
        {
            label: '9',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937'
        },
        {
            label: 'x',
            color: '#3B82F6',
            hoverColor: '#2563EB',
            activeColor: '#1D4ED8'
        },
        {
            label: '4',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937'
        },
        {
            label: '5',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937'
        },
        {
            label: '6',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937'
        },
        {
            label: '-',
            color: '#3B82F6',
            hoverColor: '#2563EB',
            activeColor: '#1D4ED8'
        },
        {
            label: '1',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937'
        },
        {
            label: '2',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937'
        },
        {
            label: '3',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937'
        },
        {
            label: '+',
            color: '#3B82F6',
            hoverColor: '#2563EB',
            activeColor: '#1D4ED8'
        },
        {
            label: '+/-',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937'
        },
        {
            label: '0',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937'
        },
        {
            label: ',',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937'
        },
        {
            label: '=',
            color: '#1E40AF',
            hoverColor: '#1E3A8A',
            activeColor: '#1E3A8A'  
        },
    ]

    return (
        <Draggable 
            bounds={{
                top: -25,
                left: windowSize.width < 1000 ? -300 : -500,
                right: windowSize.width < 1000 ? 300 : 500,
                bottom: windowSize.height < 700 ? windowSize.height - 525 : windowSize.height - 525
            }}
            handle=".drag-handle"
            position={position}
            onDrag={handleDrag}
            onStop={handleDrag}
            ref={draggableRef}
        >
            <div className={`bg-[#101010] border-white/15 backdrop-blur-xl border rounded-xl bg-gradient-to-br
            shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] text-white w-[300px]`} 
            onClick={handleCalculatorClick}>
                <div className="w-full px-8 py-4 text-black drag-handle cursor-move border-b-[3px] border-[#727272]">
                    <div className="w-full bg-[#727272] text-lg border-[#414141] border flex justify-end 
                    items-center p-1.5 cursor-default min-h-[42px]">
                        {forExec || '0.'}
                    </div>
                </div>
                <div className="grid grid-cols-4 place-items-center py-2">
                    {buttons.map((button) => {
                        return (
                            <div 
                                className={`rounded-lg border border-[#414141] mt-2 mb-2
                                    cursor-pointer select-none text-white font-semibold text-center min-w-[50px] transition-all duration-150
                                    shadow-[inset_3px_3px_6px_rgba(0,0,0,0.4),inset_-2px_-2px_3px_rgba(255,255,255,0.15)]
                                    hover:shadow-[inset_5px_5px_10px_rgba(0,0,0,0.6),inset_-3px_-3px_5px_rgba(255,255,255,0.2)]
                                    active:shadow-[inset_8px_8px_16px_rgba(0,0,0,0.8),inset_-4px_-4px_8px_rgba(255,255,255,0.1)]
                                    ${button.label === '÷' ? 'text-xl p-1' : 'p-2'}`
                                }
                                style={{
                                    backgroundColor: button.color,
                                    '--hover-color': button.hoverColor,
                                    '--active-color': button.activeColor
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = button.hoverColor}
                                onMouseLeave={(e) => e.target.style.backgroundColor = button.color}
                                onMouseDown={(e) => e.target.style.backgroundColor = button.activeColor}
                                onMouseUp={(e) => e.target.style.backgroundColor = button.hoverColor}
                            >    
                            {button.label}
                            </div>
                        )
                    })}
                </div>
            </div>
        </Draggable>
    );
}
 
export default CalculatorApp;