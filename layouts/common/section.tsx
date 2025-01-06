"use client"
import React, { useState, useEffect } from "react"
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';

export default function CommonSection({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    
    const [fixedMarginWidth, fixedScrollbarWidth ] = [20, 17]; // Margin, Scrollbar 고정값
    const [fixedWindowInnerWidth, setFixedWindowInnerWidth] = useState(0);
    const [fixedMainContentWidth,  setFixedMainContentWidth]  = useState(0);    
    const [fixedContentWindowWidth, setFixedContentWindowWidth] = useState(0); // 고정값 뺀 Window 넓이
    const currentMenu = useSelector((state: RootState) => state.currentMenu.menu);

    useEffect(() => {

        setFixedWindowInnerWidth(window.innerWidth)

        let timeoutId: any = undefined;
        const handleResize = () => {
            if (timeoutId != undefined)
                clearTimeout(timeoutId);
            
            timeoutId = setTimeout(() => {
                setFixedWindowInnerWidth(window.innerWidth);
            }, 300);
        };
    
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    useEffect(() => {         
        setFixedContentWindowWidth(window.innerWidth - fixedScrollbarWidth);
    }, [fixedWindowInnerWidth]);

    useEffect(() => {  setFixedMainContentWidth(fixedContentWindowWidth); }, [fixedContentWindowWidth])
    useEffect(() => { setFixedMainContentWidth(fixedContentWindowWidth); }, [currentMenu]);

    return (
        <section>
            <div className="ly_section">
                <div style={{ width: `${fixedMainContentWidth}px` }}>
                    <div className='section-main'>
                        {children}
                    </div>
                </div>
            </div>
        </section>
    )
}
