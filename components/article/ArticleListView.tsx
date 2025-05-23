'use client'
import React, { useState, useEffect } from 'react';
import { pages } from '@/posts/meta';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import ArticleCardSkeletonLoader from '@/components/article/ArticleCardSkeletonLoader';
import Image from 'next/image'
import { usePathname  } from 'next/navigation';

type Tabs = {
  [key: string]: string;
};


export default function ArticleListViewComponent({ tabs = {} } : {tabs : Tabs} ) {

  const remoteUrl = useSelector((state: RootState) => state.config.remoteUrl);
  const currentMenu: string = useSelector((state: RootState) => state.currentMenu.menu);
  const [name, setName] = useState('');
  const [subname, setSubname] = useState('');
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  // const [postCount, setPostCount] = useState(0);
  const [postList, setPostList] = useState([]);
  const [originPostList, setOriginPostList] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<string|undefined>(undefined);
  const [pageNo, setPageNo] = useState(1);
  const [totalPostCount, setTotalPostCount] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [subPageItemCount, setSubPageItemCount] = useState<any>({});
  const pathname = usePathname();

  useEffect(() => {
    if (currentMenu == '' || currentMenu != pathname.replace('/', ''))
      return;

    const pageCase = ['dev', 'memo', 'insight', 'ontology'];    
    if(!pageCase.includes(currentMenu)) return;

    const page = pages[currentMenu];
    setName(page['name']);
    setSubname(page['subname']);
    setMessage(page['message']);
    setAuthor(page['author']);
    setThumbnail(page['thumbnail']);    
    selectTab();

  }, [currentMenu])

  const splitDate = (items: []) => {
    items.map((item: any) => { 
      item.createAt = item.createAt.split(' ')[0];
      return item;
    });
  }

  const moveDetail = (postId: string) => {
    window.open(`/post/${encodeURIComponent(currentMenu)}/${currentMenu}-${encodeURIComponent(postId)}`, '_blank');
  }

  const selectTab = async (tab: string = '') => { 
    setActiveTab(tab); 
  }
  useEffect(() => {
    
    if (activeTab === undefined)
      return;

    if (activeTab === '' && originPostList.length === 0) {
      updateOriginPostList();
      return;
    }
    
    updatePostList();
  }, [activeTab]);

  // const fetchDemoPostList = () => {
    // setOriginPostList(posts);
    // setOriginPostList(prevList => [...prevList, ...posts]);
  // }
  const appendOriginPostList = (newPosts: any[]) => {
    setOriginPostList(prevList => [...prevList, ...newPosts]);
  }
  const fetchOriginPostList = async () => {

    if (totalPostCount > 0 && totalPostCount <= originPostList.length) {      
      return;
    }

    try {
      const res = await fetch(`${remoteUrl}/posts/${currentMenu}/${pageNo}`);
      if (!res.ok) throw new Error('Failed to fetch data');
      
      const result = await res.json();
      setTotalPostCount(result.totalItemCount);
      setTotalPageCount(result.totalPageCount);
      setSubPageItemCount(result.subTypeCounts);
      appendOriginPostList(result.list);
    } catch (error) {
      console.error(error);
    }    
  };

  const updatePostList = () => {
    let searched: any = originPostList
    .filter((item: any) => item.articleType === currentMenu && (activeTab === '' ? true : item.subType === activeTab))
    .sort((a: any, b: any) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());   
    
    splitDate(searched);
    setPostList(searched);
    // setPostCount(searched.length);    
  }


  const updateOriginPostList = () => { 
    // const hostname = window.location.hostname; // 현재 도메인 가져오기
    // if (hostname === 'localhost') fetchDemoPostList();
    // else 
    fetchOriginPostList(); 
  }
  useEffect(() => { updatePostList(); }, [originPostList]);
  

  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = () => {
    const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
    setIsAtBottom(bottom);
  };

  useEffect(() => {
    // window 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {

    if (!isAtBottom) return;
    setIsAtBottom(false);

    if (totalPageCount <= pageNo) return;
    setPageNo(pageNo + 1);

  }, [isAtBottom]);

  useEffect(() => {    
    if (pageNo == 1) {
      setOriginPostList([]);
      return;
    }
    
    updateOriginPostList();
  }, [pageNo]);

  

  return (
    <div className='ly_article-listview'>
        <div className='listview-desk'>
            {
              name &&
              <div className='name'>{name}</div>
            }
            { 
              subname && totalPostCount && 
              <div className='sub-name'>{subname} ({totalPostCount})</div>
            }
            { 
              thumbnail && 
              <div className='pic-outer'>
                <Image className='pic' src={thumbnail} width={72} height={72} alt="thumbnail"/>
              </div>
            }
            {
              message &&
              <div className='message-outer'>
                <div className='message'>{message}</div>
              </div>
            }
            {
              author &&
              <div className='message-outer'>
                <div className='message-author'>{author}</div>
              </div> 
            }
        </div>

        <div className='listview'>
            <div className='header'>
                <Image className='pic' src={thumbnail} width={72} height={72} alt="thumbnail"/>
                <div className='ly_name'>
                <div className='name'>{name}</div>
                <div className='sub-name'>{subname} ({totalPostCount})</div>
                </div>
            </div>
            <div style={{ display: "flex", borderBottom: "2px solid #ddd" }}>
              {(Object.keys(tabs).length > 0) && (
                <button 
                  onClick={() => selectTab()}
                  className={`tab-button ${(activeTab === '') ? 'selected' : 'unselected'}`}
                  >전체({totalPostCount})</button>
              )}
              {Object.keys(tabs).map((key) => (
                <button 
                  onClick={() => selectTab(key)}
                  className={`tab-button ${(activeTab === key) ? 'selected' : 'unselected'}`}
                  >{tabs[key]}({subPageItemCount[key]})</button>
              ))}
            </div>
            <div className='lv_post-align'>
            {postList.length > 0 ? (
            
              postList.map((item: any, index: number) => (

                <a className='card' onClick={() => moveDetail(item['postId'])}>
                  <div className='outer'>
                    <div className='inner'>
                      <div className='thumbnail'>

                          {
                            (item.cover === null || item.cover === '') ? (
                              <Image 
                                className="no-image"
                                width={0} height={0}
                                src="/images/icon/thumbnail.svg"
                                alt="thumbnail"
                              />
                            ) : (
                              <Image 
                                className="ext-image"
                                width={260} height={180}
                                src={item.cover}
                                alt="thumbnail"
                              />
                            )
                          }

                      </div>
                      <div className='txt-box'>
                        <div className='card-title'>
                          { (item.subType != null && item.subType !== '') && 
                            <span>[{tabs[item.subType]}]&nbsp;</span>
                          }
                          {item['title']}
                        </div>
                        <div className='card-date'><span>작성일:&nbsp;</span>{item.createAt}</div>
                      </div>
                    </div>
                  </div>
                </a>

              ))
                  
            ) : (
              Array(3).fill(0).map((_, index) => ( <ArticleCardSkeletonLoader/> ))            
            )}
            </div>      
        </div>
    </div>
  )
}