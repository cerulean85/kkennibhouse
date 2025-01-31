'use client'
import React from 'react';
import ArticleListViewComponent from '@/components/article/ArticleListView';

export default function DevPage() {
  const tabs = { 'share': '공유', 'contribute': '기여', 'archive': '기록' };
  return (
    <ArticleListViewComponent tabs={tabs}></ArticleListViewComponent>
  )
}
