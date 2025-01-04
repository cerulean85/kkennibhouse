'use client'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../stores/store';
import { close } from '../stores/openedDetailView';

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function DetailViewComponent() {
  const dispatch: AppDispatch = useDispatch();
  const title = useSelector((state: RootState) => state.openedDetailView.title);
  const cover = useSelector((state: RootState) => state.openedDetailView.cover);
  const contents = useSelector((state: RootState) => state.openedDetailView.contents);

  const [markdownText, setMarkdownText] = useState('');

  useEffect(() => { 
    setMarkdownText(contents);
  }, [contents])

  return (
    <div className='detail-view'>
      <div className='detail-view-title-outer'>
      <div className='detail-view-title-inner'>
        <img src='/images/icon/file_shape_24.png' className='dv-icon'/>
        <h1 className='dv-title'>{title}</h1>
        <a className='close-btn' onClick={() => dispatch(close())}><img src='/images/icon/close_btn_24.svg'/></a>
      </div>
      </div>
      <hr/>
      <div>
        <div className={`${cover != '' ? 'detail-view-cover-outer' : ''}`}>
          <img src={cover}></img>
        </div>
        <ReactMarkdown remarkPlugins={[remarkGfm]} className={`${cover != '' ? 'detail-view-contents-outer' : ''}`}>
          {markdownText}
        </ReactMarkdown>
      </div>
    </div>
  );
}
