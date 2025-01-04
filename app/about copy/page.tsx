'use client'
import React from 'react';
import { pages } from '@/contents/pages'
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';

export default function AboutPage() {
  
  const currentMenu: string = useSelector((state: RootState) => state.currentMenu.menu);
  const moveDetail = (postId: string) => {    
    window.open(`/article?from=${encodeURIComponent(currentMenu)}&postId=${encodeURIComponent(postId)}`, '_blank');
  }

    const page = pages[currentMenu];
    if (page == undefined) return;
    
    const subname: string = page['subname'];
    const message: string = page['message'];
    const thumbnail: string = page['thumbnail'];

    const hitoryList: any = page['history'];
    if (hitoryList == undefined) return;

    const contactList: any = page['contact'];
    if (contactList == undefined) return;

  return (
    <div className='ly_about'>
      <div className='about-content profile'>
        <div className='my-pic'>
          <img className='profile-pic' src={thumbnail}/>
        </div>
        <div className='my-name'>{subname}</div>
        <div className='my-message'>{message}</div>
        <div className='my-history'>
          <ul>
          {hitoryList.map((item: any, index: any) => (
            <li key={index}>{item}</li> // key prop을 추가
          ))}
          {contactList.map((item: any, index: any) => (
            <li key={index}>{item.type}: {item.contents}</li> // key prop을 추가
          ))}
          </ul>
        </div>
      </div>

      <div className='about-content'>
        <div className='about-content header'>
          <img className='pic' src={thumbnail}/>
          <div className='ly_name'>
            <div className='name'>{subname}</div>
          </div>
        </div>

        <h2>주요 개발 S/W</h2>
        <ul>
          <li>빅데이터 분석 플랫폼 개발</li>
          <li>물류 자동화 S/W 개발</li>
          <li><a onClick={() => moveDetail('학습관리시스템')}>학습관리시스템 개발</a></li>
        </ul>

        <h2>빅데이터 분석 플랫폼</h2>
        <ul>
          <li><a onClick={() => moveDetail('학위논문') }>AI/ML 데이터 분석 플랫폼 연구</a></li>
          <li>졸업 후 <a href='https://theimc.co.kr' target='_blank' style={{textDecoration: 'none'}}>빅데이터 분석 회사</a> 근무</li>
          <ul>
          <li>빅데이터 분석 <a onClick={() => moveDetail('플랫폼개발운영') }>플랫폼 개발/운영</a></li>
          <li><a onClick={()=> moveDetail('분산처리')}>분산 처리 연구 및 적용</a>을 통한 시스템 개선</li>
          </ul>
        </ul>

        <h2>물류 자동화 및 효율화 S/W</h2>
        <ul>    
          <li>제조 현장 설비와 센서 등 대량의 데이터 수집/처리를 해보고자,</li>
          <li>현재 <a onClick={() => moveDetail('HES') }>물류 자동화 및 효율화를 위한 프로젝트</a> 참여중</li>
        </ul>

        <h2>다양한 언어 및 프레임워크</h2>
        <ul>
          <li>C#, <a onClick={() => moveDetail('WPF') }>WPF</a>, Java, Python, Node.js, React.js, Spring Boot 등,</li>
          <li>개인적인 관심, 현업 요구 충족을 위해 다양하고 풍부한 기술스택 보유</li>
          <li>가장 선호하는 건 Java, Spring Boot, Node.js</li>
        </ul>

        <h2>글 잘 쓰고 싶은 개발자</h2>
        <ul>
          <li>개발만큼 책과 글을 사랑하며, 주로 독서를 하며 휴식을 취함 </li>
          <li>새로운 툴, 기술 탐구를 즐기다보니 박학다식하다는 평가를 자주 듣지만,</li>
          <li>개발 관련 지식/경험을 글과 도식으로 잘 표현하기 위해 부단이 갈고 닦는 중 </li>
        </ul>
      </div>

  </div>
  )
}
