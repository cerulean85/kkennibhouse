'use client'
import React, { useState, useEffect } from 'react';
import { Post, posts } from '@/contents/posts'
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
  const [postList, setPostList] = useState<Post[]>([]);

  useEffect(() => { 

    const pageCase = ['dev', 'essay', 'books'];    
    if(!pageCase.includes(currentMenu)) return;

    const page = pages[currentMenu];
    setName(page['name']);
    setSubname(page['subname']);
    setMessage(page['message']);
    setAuthor(page['author']);
    setThumbnail(page['thumbnail']);

    const searched = posts.filter((item: any) => item['articleType'] == currentMenu);
    setPostList(searched);
    setPostCount(searched.length);

  }, [currentMenu])

  const moveDetail = (postId: string) => {
    window.open(`/article?from=${encodeURIComponent(currentMenu)}&postId=${encodeURIComponent(postId)}`, '_blank');
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
            <ul>
                {postList.map((item: any, index: number) => (
                    <li key={index} onClick={() => moveDetail(item['postId'])}>
                    <div>
                    <div className='item-outer'>
                        <div className='item-inner'>
                        {item['title']}
                        </div>
                    </div>
                    </div>
                </li>
                ))}
            </ul>            
            ) : (<div className='no-item'>항목이 존재하지 않습니다.</div>)}
        </div>
    </div>
  )
}
