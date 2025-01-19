'use client'
import React, { useState, useEffect } from 'react';
import AboutCertCircleSkeletonLoader from '@/components/about/AboutCertCircleSkeletonLoader';

export default function AboutCertStackListViewComponent({ items }: { items: []}) {

  const [list, setList] = useState([]);
  useEffect(() => {
    setTimeout(() => {
        setList(items);
    }, 500);
  }, []);

  return (
    <div className='ly_tech-align'>
      {list.length > 0 ? (
        list.map((item: any, index: any) => (          
          <div className='cert-symbol-box'>
            <img className='cert-symbol' src={`/images/symbol/${item.symbol}`} />
          </div>
      )))
      :
      (Array(2).fill(0).map((_, index) => ( <AboutCertCircleSkeletonLoader/> )))}
    </div>
  )
}
