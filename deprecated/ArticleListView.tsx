'use client'
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/stores/store';
import { open } from '@/stores/openedDetailView';
import { data } from '@/contents/dev'
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';

export default function ArticleListViewComponent() {
  const dispatch: AppDispatch = useDispatch();
  const getContents = (name: string) => {
    dispatch(open(data[`${name}`]))    
  }

  const devList = [
    {
      title: '낡디 낡은 플랫폼의 추억(1): 분산의 필요성',
      postCode: 'Post1'
    }, 
    {
      title: '낡디 낡은 플랫폼의 추억(2): 운영환경의 필요성',
      postCode: 'Post2'
    }, 
    {
      title: '낡디 낡은 플랫폼의 추억(3): 컨테이너의 필요성',
      postCode: 'Post3'
    }, 
    {
      title: '내것 같은 네것: gRPC의 유용성',
      postCode: 'Post4'
    }, 
    {
      title: '타입 체크! gRPC의 유용성',
      postCode: 'Post5'
    }, 
    {
      title: '어디까지 읽어 봤니? 도큐먼트의 중요성',
      postCode: 'Post6'
    }, 
    {
      title: '님아 그건 건들지마오: 레거시의 무서움',
      postCode: 'Post7'
    }, 
  ]

  return (
    <div className='dev-container'>

    <div className='dev-content'>
      <div className='dev-name'>Dev.</div>
      <div className='dev-desk'>개발 경험과 지식의 공유</div>
      <div className='dev-pic-outer'>
        <img className='dev-pic' src='/images/dev_img.jpg'/>
      </div>
      
      <div className='dev-message-outer'>
        <div className='dev-message'>"더 많은 시간을 생각하는 데 쓰고, 적은 시간을 코딩하는 데 써라."</div>
      </div>
      <div className='dev-message-outer'>
        <div className='dev-message-author'>- 제프 앳우드(Jeff Atwood)</div>
      </div>
    </div>

    
    <div className='dev-content-list-outer'>

        {/* <div className='div-pic-small-outer'>
          <img className='dev-pic-small' src='/images/dev_img.jpg'/>
          <div className='dev-small-name-desk'>
            <div className='dev-name-small'>Dev.</div>
          </div>
        </div> */}
     
      <ul className='dev-content-list'>
        {devList.map((item, index) => (
          <li onClick={() => getContents(item['postCode'])}>
          <div>
            <div className='content-list-outer'>
              <div className='content-list-inner'>
                {item['title']}
              </div>
            </div>
          </div>
        </li>
        ))}
      </ul>
    </div>
  </div>
  )
}
