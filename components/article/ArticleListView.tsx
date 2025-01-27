'use client'
import React, { useState, useEffect } from 'react';
import { posts } from '@/contents/posts'
import { pages } from '@/contents/pages'
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import ArticleCardSkeletonLoader from '@/components/article/ArticleCardSkeletonLoader';

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
  const [postCount, setPostCount] = useState(0);
  const [postList, setPostList] = useState([]);
  const [originPostList, setOriginPostList] = useState([]);
  const [activeTab, setActiveTab] = useState<string|undefined>(undefined);

  useEffect(() => {
    if (currentMenu == '')
      return;

    const pageCase = ['dev', 'essay', 'books', 'archive'];    
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
    window.open(`/post/${encodeURIComponent(currentMenu)}/${encodeURIComponent(postId)}`, '_blank');
  }

  const selectTab = async (tab: string = '') => { setActiveTab(tab); }
  useEffect(() => {
    
    if (activeTab === undefined)
      return;

    if (activeTab === '' && originPostList.length === 0) {
      updateOriginPostList();
      return;
    }
    
    updatePostList();
  }, [activeTab]);

  const fetchDemoPostList = () => {
    setOriginPostList(posts);
  }
  const fetchOriginPostList = async () => {
    try {
      const res = await fetch(`${remoteUrl}/posts/${currentMenu}/1`);
      if (!res.ok) throw new Error('Failed to fetch data');
      const posts = await res.json();
      setOriginPostList(posts.list);
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
    setPostCount(searched.length);    
  }


  const updateOriginPostList = () => { 
    const hostname = window.location.hostname; // 현재 도메인 가져오기
    if (hostname === 'localhost') fetchDemoPostList();
    else fetchOriginPostList(); 
  }
  useEffect(() => { updatePostList(); }, [originPostList]);
  

  return (
    <div className='ly_article-listview'>
        <div className='listview-desk'>
            <div className='name'>{name}</div>
            <div className='sub-name'>{subname} ({postCount})</div>
            <div className='pic-outer'>
            <img className='pic' src={thumbnail}/>
            </div>
            
            <div className='message-outer'>
            <div className='message'>{message}</div>
            </div>
            <div className='message-outer'>
            <div className='message-author'>{author}</div>
            </div> 
        </div>

        <div className='listview'>
            <div className='header'>
                <img className='pic' src={thumbnail}/>
                <div className='ly_name'>
                <div className='name'>{name}</div>
                <div className='sub-name'>{subname} ({postCount})</div>
                </div>
            </div>
            <div style={{ display: "flex", borderBottom: "2px solid #ddd" }}>
              {(Object.keys(tabs).length > 0) && (
                <button 
                  onClick={() => selectTab()}
                  className={`tab-button ${(activeTab === '') ? 'selected' : 'unselected'}`}
                  >전체</button>
              )}
              {Object.keys(tabs).map((key) => (
                <button 
                  onClick={() => selectTab(key)}
                  className={`tab-button ${(activeTab === key) ? 'selected' : 'unselected'}`}
                  >{tabs[key]}</button>
              ))}
            </div>
            <div className='lv_post-align'>
            {postList.length > 0 ? (
            
              postList.map((item: any, index: number) => (

                <a className='card' onClick={() => moveDetail(item['postId'])}>
                  <div className='outer'>
                    <div className='inner'>
                      <div className='thumbnail'>
                        <img 
                          className={(item.cover === '' ? 'no-image' : 'ext-image')}
                          style={{objectFit: item.fit}}
                          src={ item.cover === '' ? '/images/icon/thumbnail.svg' : item.cover}></img>
                      </div>
                      <div className='card-title'>
                        { item.subType !== '' && 
                          <span>[{tabs[item.subType]}]&nbsp;</span>
                        }
                        {item['title']}
                      </div>
                      <div className='card-date'><span>작성일:&nbsp;</span>{item.createAt}</div>
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