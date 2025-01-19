'use client'
import React, { useState, useEffect } from 'react';
import ArticleCardSkeletonLoader from '@/components/article/ArticleCardSkeletonLoader';

interface Post {
  id: number;
  title: string;
}

const ExamplePage = () => {

  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
  //   // 데이터를 로드하는 시뮬레이션 (2초 딜레이)
    setTimeout(() => {
      setPosts([
        { id: 1, title: 'Post 1' },
        { id: 2, title: 'Post 2' },
        { id: 3, title: 'Post 3' },
      ]);
    }, 10000);
  }, []);

  return (
    <div>
      sssssss
      {!posts && Array(3).fill(0).map((_, index) => <ArticleCardSkeletonLoader key={index} />)}
    </div>
  )
};

export default ExamplePage;