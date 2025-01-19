'use client'
import React, { useState, useEffect } from 'react';
import AboutTechCircleSkeletonLoader from '@/components/about/AboutTechCircleSkeletonLoader';

export default function AboutTechStackListViewComponent({ items }: { items: []}) {

  const [list, setList] = useState([]);
  useEffect(() => {
    setTimeout(() => {
        setList(items);
    }, 2000);
  }, []);

  return (
    <div className='ly_tech-align'>
      {list.length > 0 ? (
        list.map((item: any, index: any) => (          
          <div className='tech-symbol-box' title={item.name}>
        <a href={item.link} target='_blank'>
            <img className='tech-symbol' src={`/images/symbol/${item.symbol}`}></img>
        </a>
          </div>
      )))
      :
      (Array(3).fill(0).map((_, index) => ( <AboutTechCircleSkeletonLoader/> )))}
    </div>
  )
}
