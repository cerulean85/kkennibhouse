'use client'
import React, { useState, useEffect } from 'react';
import AboutCareerCardSkeletonLoader from '@/components/about/AboutCareerCardSkeletonLoader';

export default function AboutCareerListViewComponent({ items }: { items: []}) {

  const [list, setList] = useState([]);
  useEffect(() => {
    setTimeout(() => {
        setList(items);
    }, 2000);
  }, []);

  const moveDetail = (postId: string) =>
    window.open(`/article?from=about&postId=${encodeURIComponent(postId)}`, '_blank');

  return (
    <div className='ly_tech-align'>
      {list.length > 0 ? 
        (list.map((item: any, index: any) => (
          <div className='tech-corp-outer'>
            <div className='tech-corp-inner'>
            <div className='thumb-box'>
                <img src={`/images/symbol/${item.symbol}`}></img>
            </div>            
            <div className='topic-box'>
                <a onClick={() => moveDetail(`${item.postId}`) }>
                <div dangerouslySetInnerHTML={{ __html: item.title}}></div>
                </a>
            </div>            
            <div className='corp-box'>
                <a href={item.corpLink} target='_blank'>{item.corpName}</a>
            </div>
            <div className='time-box'>({item.corpWorktime})</div>
            </div>              
          </div>
        )))
        :
        (Array(2).fill(0).map((_, index) => ( <AboutCareerCardSkeletonLoader/> )))}
  </div>
  )
}
