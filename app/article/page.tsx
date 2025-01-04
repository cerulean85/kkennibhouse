'use client'
import React, { useState, useEffect } from 'react';
import { posts } from '@/contents/posts'
import { useSearchParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { setMenu } from '@/stores/currentMenuSlice'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/stores/store';

export default function ArticlePage() {
  const searchParams = useSearchParams();
  const from: string = searchParams.get('from') ?? '';
  const postId: string = searchParams.get('postId') ?? '';
  const post = posts.find((item: any) => (item['articleType'] == from) && (item['postId'] == postId));

  const title: string = post['title'];
  const contents: string = post['contents']
  const cover: string = post['cover']
  const [markdownText, setMarkdownText] = useState('');
  const dispatch: AppDispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setMenu(from));
  })

  useEffect(() => { 
    setMarkdownText(contents);
  }, [contents])
  
  return (
    <div className='ly_article'>
      <div className='article-content'>
        <div className='ly_article-title'>
          <div className='inner'>
            <img src='/images/icon/file_shape_24.png' className='icon'/>
            <div className='title'>{title}</div>
          </div>
          <hr/>
          {!(cover == '') && 
            <div className='thumbnail'>
              <img src={cover}></img>
            </div>
          }
          <div className='contents'>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {markdownText}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}
