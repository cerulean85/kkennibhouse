'use client'
import React, { useState, useEffect } from 'react';
import AboutResearchCardSkeletonLoader from '@/components/about/AboutResearchCardSkeletonLoader';

export default function AboutResearchListViewComponent({ items }: { items: []}) {

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
      {list.length > 0 ? (
        list.map((item: any, index: any) => (          
          <div className='tech-research-outer'>
            <div className='tech-research-inner'>
              <div className='thumb-box'>
                <img src='/images/icon/file_shape_128.svg'></img>
              </div>
              <div className='txt-box'>
                <div className='corp-box'>{item.journal}</div>
                <div className='topic-box'>
                  <a href={item.link} target='_blank'>
                    <div dangerouslySetInnerHTML={{ __html: item.title}}></div>
                  </a>
                </div>
              </div>          
            </div>        
          </div>
        ))  
      )
      :
      (
        Array(1).fill(0).map((_, index) => ( <AboutResearchCardSkeletonLoader/> ))
      )}
     
  </div>
  )
}

                  // <div className='tech-research-outer' key={index}>
                  //   <div className='tech-research-inner'>
                  //     <div className='thumb-box'>
                  //       <img src='/images/icon/file_shape_128.svg'></img>
                  //     </div>

                  //     <div className='txt-box'>
                  //       <div className='corp-box'>{capitalizeFirstLetter(item['createAt'])}</div>
                  //       <div className='topic-box'>
                  //         <a onClick={() => moveDetail(item['postId'])}>
                  //         {item['title']}
                  //         </a>
                  //       </div>
                  //     </div>          
                  //   </div>        
                  // </div>
