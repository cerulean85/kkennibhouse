'use client'
import React from 'react';
import { pages } from '@/contents/pages'
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { copyToClipboard } from '@/lib/util';

export default function AboutPage() {
  
  const currentMenu: string = useSelector((state: RootState) => state.currentMenu.menu);  
  const page = pages[currentMenu];
  if (!page) return;
  
  const subname: string = page['subname'];
  const message: string = page['message'];
  const thumbnail: string = page['thumbnail'];
  const snsList: any = page['sns'];
  if (!snsList) return;

  const techList: any = page['technology'];
  const careerList: any = page['career'];
  const researchList: any = page['research'];
  const certificateList: any = page['certificate'];

  const moveDetail = (postId: string) =>
    window.open(`/article?from=${encodeURIComponent(currentMenu)}&postId=${encodeURIComponent(postId)}`, '_blank');

  const copyOrMove = (type: string, link: string) => 
    type == 'gmail' ? copyToClipboard(link) : window.open(link, '_blank');

  return (
    <div className='ly_about'>
      <div className='about-content profile'>
        <div className='my-pic'>
          <img className='profile-pic' src={thumbnail}/>
        </div>
        <div className='my-name'>{subname}</div>
        <div className='my-message'>{message}</div>
        <div className='my-history'>
          {snsList.map((item: any, index: any) => (          
            <div title={item.name}>
            <a onClick={() => copyOrMove(item.type, item.link)} target='_blank'>
              <img key={index} src={`/images/symbol/${item.symbol}`}/>
            </a>
            </div>
          ))}
        </div>
      </div>

      <div className='about-content list'>
        <div className='about-content header'>
          <img className='pic' src={thumbnail}/>
          <div className='ly_name'>
            <div className='name'>{subname}</div>
          </div>
        </div>

        <h2 className='center'>주요 기술 스택</h2>
        <div className='ly_tech-align'>
          {techList.map((item: any, index: any) => (          
            <div className='tech-symbol-box' title={item.name}>
              <a href={item.link} target='_blank'>
                <img className='tech-symbol' src={`/images/symbol/${item.symbol}`}></img>
              </a>
            </div>
          ))}
        </div>
        
        <h2 className='mg-top center'>주요 경력</h2>
        <div className='ly_tech-align'>

        {careerList.map((item: any, index: any) => (          
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
          ))}
        </div>

        <h2 className='mg-top center'>연구 실적</h2>
        <div className='ly_tech-align'>
          {researchList.map((item: any, index: any) => (          
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
          ))}         
        </div>

        <h2 className='mg-top center'>주요 인증</h2>
        <div className='ly_tech-align'>
          {certificateList.map((item: any, index: any) => (
            <div className='cert-symbol-box'>
              <img className='cert-symbol' src={`/images/symbol/${item.symbol}`}></img>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
