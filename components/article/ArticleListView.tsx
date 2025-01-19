'use client'
import React, { useState, useEffect } from 'react';
import { posts } from '@/contents/posts'
import { pages } from '@/contents/pages'
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import ArticleCardSkeletonLoader from '@/components/article/ArticleCardSkeletonLoader';

type SubTypes = {
  [key: string]: {[value: string]: string;};
};

export default function ArticleListViewComponent() {

  const currentMenu: string = useSelector((state: RootState) => state.currentMenu.menu);
  const [name, setName] = useState('');
  const [subname, setSubname] = useState('');
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [postCount, setPostCount] = useState(0);
  const [postList, setPostList] = useState([]);
  const [subTypes, setSubTypes] = useState<SubTypes>({});

  useEffect(() => {

    const pageCase = ['dev', 'essay', 'books', 'archive'];    
    if(!pageCase.includes(currentMenu)) return;

    const page = pages[currentMenu];
    setName(page['name']);
    setSubname(page['subname']);
    setMessage(page['message']);
    setAuthor(page['author']);
    setThumbnail(page['thumbnail']);
    setSubTypes({ 'dev': { 'share': '공유', 'contribute': '기여'} });

    setTimeout(() => {  

      setPostList([]);
      let searched = posts
        .filter((item: any) => item['articleType'] === currentMenu)
        .sort((a: any, b: any) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());

      searched = searched.map((item: any) => { 
        item.createAt = item.createAt.split(' ')[0];
        return item;
      });
      setPostList(searched);
      setPostCount(searched.length);
    }, 500);

  }, [currentMenu])

  const moveDetail = (postId: string) => {
    window.open(`/post/${encodeURIComponent(currentMenu)}/${encodeURIComponent(postId)}`, '_blank');
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
                          <span>[{subTypes[item.articleType][item.subType]}]&nbsp;</span>
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