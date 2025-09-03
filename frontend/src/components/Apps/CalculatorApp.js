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

    const executeCalc = () => {
        try {
            if (!forExec) return;
            
            let expression = forExec
                .replace(/x/g, '*')
                .replace(/÷/g, '/')
                .replace(/,/g, '.')
                .replace(/\+\/-/g, '(-1)*');
            
            expression = expression.replace(/(\d)\(/g, '$1*(');
            expression = expression.replace(/\)(\d)/g, ')*$1');
            expression = expression.replace(/\)\(/g, ')*(');
            
            if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
                setForExec('Error');
                return;
            }

            const openParens = (expression.match(/\(/g) || []).length;
            const closeParens = (expression.match(/\)/g) || []).length;
            if (openParens !== closeParens) {
                setForExec('Error');
                return;
            }
            
            const result = Function(`"use strict"; return (${expression})`)();
            
            if (isNaN(result) || !isFinite(result)) {
                setForExec('Error');
                return;
            }
            
            const formattedResult = Number(result).toString();
            setForExec(formattedResult);
            
        } catch (error) {
            console.error('Calculation error:', error);
            setForExec('Error');
        }
    }

    const buttons = [
        {
            label: 'R',
            color: '#ED2939',
            hoverColor: '#C41E3A',
            activeColor: '#B01E3A',
            onClick: () => setForExec('')
        },
        {
            label: '(',
            color: '#ED2939',
            hoverColor: '#C41E3A',
            activeColor: '#B01E3A',
            onClick: () => {
                if(forExec.at(-1) !== '(')
                setForExec((prev) => prev + '(')
            }
        },
        {
            label: ')',
            color: '#ED2939',
            hoverColor: '#C41E3A',
            activeColor: '#B01E3A',
            onClick: () => {
                if(forExec.at(-1) !== '(')
                setForExec((prev) => prev + ')')
            }
        },
        {
            label: '÷',
            color: '#3B82F6',
            hoverColor: '#2563EB',
            activeColor: '#1D4ED8',
            onClick: () => {
                if(forExec.at(-1) !== '(' && forExec.at(-1) !== 'x' && forExec.at(-1) !== '÷' && forExec.at(-1) !== '+' && forExec.at(-1) !== '-')
                    setForExec((prev) => prev + '÷')
            }
        },
        {
            label: '7',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937',
            onClick: () => {
                setForExec((prev) => prev + '7')
            }
        },
        {
            label: '8',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937',
            onClick: () => {
                setForExec((prev) => prev + '8')
            }
        },
        {
            label: '9',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937',
            onClick: () => {
                setForExec((prev) => prev + '9')
            }
        },
        {
            label: 'x',
            color: '#3B82F6',
            hoverColor: '#2563EB',
            activeColor: '#1D4ED8',
            onClick: () => {
                if(forExec.at(-1) !== '(' && forExec.at(-1) !== 'x' && forExec.at(-1) !== '÷' && forExec.at(-1) !== '+' && forExec.at(-1) !== '-')
                    setForExec((prev) => prev + 'x')
            }
        },
        {
            label: '4',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937',
            onClick: () => {
                setForExec((prev) => prev + '4')
            }
        },
        {
            label: '5',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937',
            onClick: () => {
                setForExec((prev) => prev + '5')
            }
        },
        {
            label: '6',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937',
            onClick: () => {
                setForExec((prev) => prev + '6')
            }
        },
        {
            label: '-',
            color: '#3B82F6',
            hoverColor: '#2563EB',
            activeColor: '#1D4ED8',
            onClick: () => {
                if(forExec.at(-1) !== '(' && forExec.at(-1) !== 'x' && forExec.at(-1) !== '÷' && forExec.at(-1) !== '+' && forExec.at(-1) !== '-')
                    setForExec((prev) => prev + '-')
            }
        },
        {
            label: '1',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937',
            onClick: () => {
                setForExec((prev) => prev + '1')
            }
        },
        {
            label: '2',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937',
            onClick: () => {
                setForExec((prev) => prev + '2')
            }
        },
        {
            label: '3',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937',
            onClick: () => {
                setForExec((prev) => prev + '3')
            }
        },
        {
            label: '+',
            color: '#3B82F6',
            hoverColor: '#2563EB',
            activeColor: '#1D4ED8',
            onClick: () => {
                if(forExec.at(-1) !== '(' && forExec.at(-1) !== 'x' && forExec.at(-1) !== '÷' && forExec.at(-1) !== '+' && forExec.at(-1) !== '-')
                    setForExec((prev) => prev + '+')
            }
        },
        {
            label: '+/-',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937',
            onClick: () => {
                if (forExec && !isNaN(forExec) && forExec.at(-1) !== '(' && forExec.at(-1) !== 'x' && forExec.at(-1) !== '÷' && forExec.at(-1) !== '+' && forExec.at(-1) !== '-') {
                    const currentValue = parseFloat(forExec);
                    setForExec((currentValue * -1).toString());
                }
            }
        },
        {
            label: '0',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937',
            onClick: () => {
                setForExec((prev) => prev + '0')
            }
        },
        {
            label: ',',
            color: '#4B5563',
            hoverColor: '#374151',
            activeColor: '#1F2937',
            onClick: () => {
                if(forExec.at(-1) !== '(' && forExec.at(-1) !== ')' && forExec.at(-1) !== 'x' && forExec.at(-1) !== '÷' && forExec.at(-1) !== '+' && forExec.at(-1) !== '-')
                    setForExec((prev) => prev + ',')
            }
        },
        {
            label: '=',
            color: '#1E40AF',
            hoverColor: '#1E3A8A',
            activeColor: '#1E3A8A',
            onClick: () => {
                executeCalc();
            }
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
                <div className="absolute right-2.5 flex flex-col top-5 gap-2">
                    <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 
                        shadow-inner border border-green-600 transition-all duration-150 hover:scale-110"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenApps(prev => prev.map(app => {
                                if (app.name === 'Calculator') {
                                    return { ...app, isMinimized: true };
                                }
                                return app;
                            }));
                    }}/>
                    <button className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400
                        shadow-inner border border-red-600 transition-all duration-150 hover:scale-110"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenApps(prev => prev.filter(app => app.name !== 'Calculator'));
                    }}/>
                </div>
                <div className="w-full px-8 py-4 text-black drag-handle cursor-move border-b-[3px] border-[#727272]">
                    <div className="w-full bg-[#727272] text-lg border-[#414141] border flex justify-end 
                    items-center p-1.5 cursor-default min-h-[42px] overflow-hidden">
                        <span className="truncate max-w-full text-right">
                            {forExec || '0.'}
                        </span>
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
                                onClick={() => {
                                    if(forExec?.includes("Error"))
                                        setForExec('');
                                    button.onClick()
                                }}
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