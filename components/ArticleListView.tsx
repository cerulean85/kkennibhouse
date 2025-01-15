'use client'
import React, { useState, useEffect } from 'react';
import { posts } from '@/contents/posts'
import { pages } from '@/contents/pages'
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';

export default function ArticleListViewComponent() {

  const currentMenu: string = useSelector((state: RootState) => state.currentMenu.menu);
  const [name, setName] = useState('');
  const [subname, setSubname] = useState('');
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [postCount, setPostCount] = useState(0);
  const [postList, setPostList] = useState([]);

  useEffect(() => { 

    const pageCase = ['dev', 'essay', 'books'];    
    if(!pageCase.includes(currentMenu)) return;

    const page = pages[currentMenu];
    setName(page['name']);
    setSubname(page['subname']);
    setMessage(page['message']);
    setAuthor(page['author']);
    setThumbnail(page['thumbnail']);

    let searched = posts
      .filter((item: any) => item['articleType'] === currentMenu)
      .sort((a: any, b: any) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());

    searched = searched.map((item: any) => { 
      item.createAt = item.createAt.split(' ')[0];
      return item;
    });
    setPostList(searched);
    setPostCount(searched.length);

  }, [currentMenu])

  const moveDetail = (postId: string) => {
    window.open(`/article?from=${encodeURIComponent(currentMenu)}&postId=${encodeURIComponent(postId)}`, '_blank');
  }

  const capitalizeFirstLetter = (txt: string) => {
    if (!txt) return ""; // 문자열이 비어있을 때 처리
    return txt.charAt(0).toUpperCase() + txt.slice(1);
}

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
      
            {postList.length > 0 ? (
            <div className='lv_post-align'>
                {postList.map((item: any, index: number) => (

                  <div className='tech-research-outer' key={index}>
                    <div className='tech-research-inner'>
                      <div className='thumb-box'>
                        <img src='/images/icon/file_shape_128.svg'></img>
                      </div>

                      <div className='txt-box'>
                        <div className='corp-box'>{capitalizeFirstLetter(item['createAt'])}</div>
                        <div className='topic-box'>
                          <a onClick={() => moveDetail(item['postId'])}>
                          {item['title']}
                          </a>
                        </div>
                      </div>          
                    </div>        
                  </div>


                ))}
            </div>            
            ) : (<div className='no-item'>항목이 존재하지 않습니다.</div>)}
        </div>
    </div>
  )
}
