"use client"
import React, { useState, useEffect } from "react"
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import DetailViewComponent from "@/deprecated/DetailView";


export default function CommonSection({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    // Margin, Scrollbar, 조절바 고정값, Left Content의 최소값
    const [fixedMarginWidth, fixedScrollbarWidth, fixedAdjustBarWidth, fixedLeftContentMinWidth] = [20, 17, 0, 300];

    const [fixedWindowInnerWidth, setFixedWindowInnerWidth] = useState(window.innerWidth);

    // Left/Right Content 넓이 초기값
    const [fixedLeftContentWidth,  setFixedLeftContentWidth]  = useState(0);
    const [fixedRightContentWidth, setFixedRightContentWidth] = useState(0);

    // 고정값에 의해 결정된 Window 넓이, Left Content의 최대값, 최소값
    const [fixedContentWindowWidth, setFixedContentWindowWidth] = useState(0);
    const [fixedLeftContentMaxWidth, setFixedLeftContentMaxWidth] = useState(0);    

    // Right Content 펼침 여부
    const openedDetailView = useSelector((state: RootState) => state.openedDetailView.value);

    const currentMenu = useSelector((state: RootState) => state.currentMenu.menu);

    useEffect(() => {
        let timeoutId: any = undefined;
        const handleResize = () => {
            if (timeoutId == undefined)
                return;

            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setFixedWindowInnerWidth(window.innerWidth);
            }, 300); // 디바운스 시간 (300ms)
        };
    
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);


    // Left/Right Content 넓이 세팅
    useEffect(() => {         
        setFixedContentWindowWidth(window.innerWidth - (fixedMarginWidth * 2) - fixedScrollbarWidth);
    }, [fixedWindowInnerWidth]);

    useEffect(() => { 
        setFixedLeftContentMaxWidth(fixedContentWindowWidth * 0.5);
    }, [fixedContentWindowWidth])

    useEffect(() => { 
        setFixedLeftContentWidth(fixedContentWindowWidth);        
    }, [fixedLeftContentMaxWidth])

    useEffect(() => { 
        setFixedRightContentWidth(getFixedRightContentWidth());
    }, [fixedLeftContentWidth])

    // Detail View의 펼침 상태에 따른 Content Width 변경
    useEffect(() => {
        if (!openedDetailView) {
            setFixedLeftContentWidth(fixedContentWindowWidth);      
            setFixedRightContentWidth(0);      
        } else {
            setFixedLeftContentWidth(0);
            setFixedRightContentWidth(fixedContentWindowWidth);
        }
    }, [openedDetailView]);
    
    useEffect(() => {
        // Home일 때는 Content Window Width로 설정
        setFixedLeftContentWidth(fixedContentWindowWidth);        
    }, [currentMenu]);
    

    // 조절바 스크롤 여부
    const [isResizing, setIsResizing] = useState(false);

    // Left Content, 조절바, Margin 값에 의해 결정된 Right Content 넓이 반환
    const getFixedRightContentWidth = () => {
        const fixedRightContentWidth = 
            fixedContentWindowWidth - fixedLeftContentWidth - fixedAdjustBarWidth - (fixedMarginWidth * 2);
        return Math.max(fixedRightContentWidth, 0);
    }

    // 마우스 이벤트
    const onMouseMove = (e: any) => {
        // if (!isResizing) return;        
        // const drivenLeftContentWidth = Math.max(e.clientX - fixedMarginWidth, fixedLeftContentMinWidth);
        // const currentLeftContentWidth = Math.min(drivenLeftContentWidth, fixedLeftContentMaxWidth);
        // setFixedLeftContentWidth(currentLeftContentWidth);
        // setFixedRightContentWidth(getFixedRightContentWidth());
    };
    const onMouseUp = () => { 
        // setIsResizing(false); 
    };
    const onMouseDown = () => { 
        // setIsResizing(true); 
    };

    return (
        <section>
            <div 
                style={{ display: 'flex', width: "100%" }} 
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}>

                <div className='left-div'
                     style={{ width: `${fixedLeftContentWidth}px` }}>

                    <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                    {children}
                    </div>
                </div>
            </div>
        </section>
    )
}
