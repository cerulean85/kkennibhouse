'use client'
import Link from 'next/link';
import { Provider } from 'react-redux';
import Example2Component from '@/components/Example2';
import store from '@/components/store';

export default function AboutPage() {
  return (
    <div id="main">
    <h1 className="title">About Me</h1>
    <hr />

    <div>
      <ul>
        <h4>나는 누구인가? 하하</h4>

        개발을 할 떄 필요한 건 개발을 해본 경험보다 얼마나 많은 도큐먼트를 보고 이해했느냐가 더 중요하다.
        
        <li>사용자가 보다 수준 높은 글을 작성할 수 있도록 생성형 AI의 Feedback을 지원</li>
        <li>사용자가 글을 작성하고 이미지를 업로드하고, 검색하는 기능을 제공</li>
        <li>Open API를 이용하여 OpenAI의 ChatGPT와 Google의 Gemini의 API를 이용하여 상호작용</li>
      </ul>
      <ul>
        <h4>2. MeFeed 개발진의 의무</h4>
        <li>사용자 지향적인 Feedback 지원을 위해 Prompt를 지속적으로 탐구하여 AI 성능을 향상시킴</li>
        <li>사용자가 능숙하게 글을 작성하여 콘텐츠를 제작할 수 있도록 Editor 기능을 끊임없이 연구하여 업데이트함</li>
      </ul>
      <ul>
        <h4>3. MeFeed의 현재</h4>
        <li>MeFeed는 아직 개발 단계로, 사용자의 호의적인 반응을 얻는 멋진 서비스가 되기까지 서비스를 공개함</li>
      </ul>

      <ul>
        <h4>1. MeFeed의 기능</h4>
        <li>사용자가 보다 수준 높은 글을 작성할 수 있도록 생성형 AI의 Feedback을 지원</li>
        <li>사용자가 글을 작성하고 이미지를 업로드하고, 검색하는 기능을 제공</li>
        <li>Open API를 이용하여 OpenAI의 ChatGPT와 Google의 Gemini의 API를 이용하여 상호작용</li>
      </ul>
      <ul>
        <h4>2. MeFeed 개발진의 의무</h4>
        <li>사용자 지향적인 Feedback 지원을 위해 Prompt를 지속적으로 탐구하여 AI 성능을 향상시킴</li>
        <li>사용자가 능숙하게 글을 작성하여 콘텐츠를 제작할 수 있도록 Editor 기능을 끊임없이 연구하여 업데이트함</li>
      </ul>
      <ul>
        <h4>3. MeFeed의 현재</h4>
        <li>MeFeed는 아직 개발 단계로, 사용자의 호의적인 반응을 얻는 멋진 서비스가 되기까지 서비스를 공개함</li>
      </ul>

      <ul>
        <h4>1. MeFeed의 기능</h4>
        <li>사용자가 보다 수준 높은 글을 작성할 수 있도록 생성형 AI의 Feedback을 지원</li>
        <li>사용자가 글을 작성하고 이미지를 업로드하고, 검색하는 기능을 제공</li>
        <li>Open API를 이용하여 OpenAI의 ChatGPT와 Google의 Gemini의 API를 이용하여 상호작용</li>
      </ul>
      <ul>
        <h4>2. MeFeed 개발진의 의무</h4>
        <li>사용자 지향적인 Feedback 지원을 위해 Prompt를 지속적으로 탐구하여 AI 성능을 향상시킴</li>
        <li>사용자가 능숙하게 글을 작성하여 콘텐츠를 제작할 수 있도록 Editor 기능을 끊임없이 연구하여 업데이트함</li>
      </ul>
      <ul>
        <h4>3. MeFeed의 현재</h4>
        <li>MeFeed는 아직 개발 단계로, 사용자의 호의적인 반응을 얻는 멋진 서비스가 되기까지 서비스를 공개함</li>
      </ul>
    </div>
  </div>
  )
}