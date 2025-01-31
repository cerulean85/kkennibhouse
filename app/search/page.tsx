'use client'
import React, { useState } from 'react';
// import { posts } from '@/posts/meta'

export default function SearchPage() {
  const [searchText, setSearchText] = useState('');
  const [postCount, setPostCount] = useState(0);
  const [postList, setPostList] = useState([]);

  const moveDetail = (item: any) => {    
    const articleType = encodeURIComponent(item['articleType']);
    const postId = encodeURIComponent(item['postId']);
    window.open(`/article?from=${articleType}&postId=${postId}`, '_blank');
  }

  const includes = (target: string) => target.includes(searchText);
  const search = () => {

    // const filteredItems1 = posts.filter((item: any) => !item.articleType.includes('about'))
    // const filteredItems2 = filteredItems1.filter((item: any) => includes(item.title) || includes(item.contents));
    // setPostList(filteredItems2);
    // setPostCount(filteredItems2.length);
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      search();
    }
  };
  
  return (
    <div className='ly_article'>
      <div className='article-content'>
        <div className='ly_article-search'>
          <div className='inner'>
            <input 
              className='search-input' 
              type='text' 
              placeholder='검색어를 입력하세요.' 
              value={searchText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              ></input>
            <a onClick={search}>
              <img src='/images/icon/search_btn.svg' className='search-icon'/>
            </a>
          </div>
          <hr/>

          <div className='ly_article-listview'>
            <div className='listview'>
              <div className='search-header'>
                <div className='result'>
                  {postCount > 0 ? (
                    <div>총 <strong>{postCount}</strong>개의 포스트를 찾았습니다.</div>
                  ) : (<div>검색 결과가 존재하지 않습니다.</div>)}
                
                </div>
              </div>
              {postCount > 0 &&
                <ul>
                  {postList.map((item: any, index: number) => (
                  <li key={index} onClick={() => moveDetail(item)}>
                    <div>
                      <div className='item-outer'>
                          <div className='item-inner'>
                            {item['title']}
                          </div>
                      </div>
                    </div>
                  </li>
                  ))}
                </ul>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
