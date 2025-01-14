"use client"
import { useRouter, usePathname  } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/stores/store';
import { close } from '@/stores/openedDetailView';
import { setMenu } from '@/stores/currentMenuSlice'
import { useState, useEffect } from 'react';

const CommonNav = () => {
    const dispatch: AppDispatch = useDispatch();
    const currentMenu = useSelector((state: RootState) => state.currentMenu.menu);

    const router = useRouter();
    const movePage = (pageName: string) => { 

        if (currentMenu == pageName)
            return;

        dispatch(setMenu(pageName));
        dispatch(close());
        setIsMenuOpen(false);
        router.push(`/${pageName}`); 
    };

    useEffect(() => { 
        setIsAbout(currentMenu == 'about');
        setIsDev(currentMenu == 'dev');
        setIsEssay(currentMenu == 'essay');
        setIsBooks(currentMenu == 'books');
        setIsSearch(currentMenu == 'search');
    }, [currentMenu])

    const [isAbout,  setIsAbout]  = useState(false);
    const [isDev,  setIsDev]  = useState(false);
    const [isEssay,  setIsEssay]  = useState(false);
    const [isBooks,  setIsBooks]  = useState(false);
    const [isSearch,  setIsSearch]  = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        dispatch(setMenu(pathname.replace('/', '')));
    }, []);
    
    const menuList = [
        { name: "About.", endpoint: 'about', state: isAbout },
        { name: "Dev.", endpoint: 'dev', state: isDev },
        { name: "Essay", endpoint: 'essay', state: isEssay },
        { name: "Books", endpoint: 'books', state: isBooks },
    ]

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav>                
            <div className="ly_nav">
                {!isMenuOpen && (
                <div className="menu">
                    <ul>
                        {menuList.map((item, index) => (
                            <li key={index}>
                                <a onClick={() => movePage(item['endpoint'])}>
                                    <label className={`nav-cursor ${item['state'] ? 'nav-bold' : ''}`}>{item['name']}</label>
                                </a>
                            </li>
                        ))}                        
                    </ul>
                </div>
                )}
                <div className="profile">
                    <div className="left">
                        <img src="/images/profile_img.jfif"/>
                        <h3><a onClick={() => movePage('about') }className="home-link">깬닙하우스</a></h3>
                    </div>

                    <div className="right">
                        <a onClick={() => movePage('search')}>
                            <img className="util-btn" src='/images/icon/search_btn.svg'></img>
                        </a>
                        
                        <button className="util-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
                    </div>
                </div>          
            </div>

            {isMenuOpen && (
                <div className="slide-menu-overlay" onClick={() => setIsMenuOpen(false)}></div>
            )}

            <div className={`slide-menu ${isMenuOpen ? 'open' : ''}`}>
                <button className="slide-close-btn" onClick={() => setIsMenuOpen(false)}>
                ✕
                </button>

                <div className="slide-profile">
                    <img src="/images/profile_img.jfif"/>
                </div>
                <div className="slide-profile">
                    <h3><a onClick={() => movePage('')}>깬닙하우스</a></h3>
                </div>

                <ul>
                    {menuList.map((item, index) => (
                        <li key={index}>
                            <a onClick={() => movePage(item['endpoint'])}>
                                <label className={`nav-cursor ${item['state'] ? 'nav-bold' : ''}`}>{item['name']}</label>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>   


        </nav>            
    )
}

export default CommonNav