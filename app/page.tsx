'use client'
import Link from 'next/link';
import Example2Component from '@/deprecated/Example2';
import { Provider } from 'react-redux';
import store from '../stores/store';

export default function Home() {
  
  return (
    <div className='home-container-outer'>
      <div className='home-container'>

        {/* <div className='home-label-outer'>
          <div className='home-label'>오늘의 명언</div>
        </div> */}

        <div className='home-sentence-outer'>
          <div className='home-sentence'>

            "우리의 적들을 용서하고 잊을 수 있는 한 가지 확실한 방법은 우리 자신보다 무한히 큰 어떤 대의에 몰두하는 것이다."
          </div>
        </div>

        <div className='home-author-outer'>
          <div className='home-author'>- 데일카네기 -</div>
        </div>
      </div>
    </div>
  );
}
