// components/SkeletonLoader.tsx
import React from 'react';
import ContentLoader from 'react-content-loader';

const AboutCareerCardSkeletonLoader: React.FC = () => (

  <div className='tech-corp-outer'>
  <div className='tech-corp-inner'>
  <div 
    className='thumb-box'       
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none'
    }}>

      <ContentLoader
        speed={2}
        width={188}
        height={108}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="5" ry="5" width="208" height="128" />
      </ContentLoader>
  </div>            
  <div className='topic-box'>
    <ContentLoader
      speed={2}
      width='90%'
      height={50}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="5" ry="5" width="100%" height="22" />
      <rect x="0" y="30" rx="5" ry="5" width="100%" height="22" />
    </ContentLoader>
  </div>            
  <div className='corp-box'>
    <ContentLoader
      speed={2}
      width='100%'
      height={10}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      >
        <rect x="15%" y="0" rx="5" ry="5" width="70%" height="10" />
    </ContentLoader>
  </div>
  <div className='time-box'>
    <ContentLoader
      speed={2}
      width='100%'
      height={10}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      >
        <rect x="15%" y="0" rx="5" ry="5" width="70%" height="10" />
    </ContentLoader>    

  </div>
  </div>              
</div>


  // <ContentLoader
  //   speed={2}
  //   width={400}
  //   height={160}
  //   viewBox="0 0 400 160"
  //   backgroundColor="#f3f3f3"
  //   foregroundColor="#ecebeb"
  // >
  //   <rect x="0" y="0" rx="5" ry="5" width="400" height="20" />
  //   <rect x="0" y="30" rx="5" ry="5" width="400" height="20" />
  //   <rect x="0" y="60" rx="5" ry="5" width="400" height="20" />
  // </ContentLoader>
);

export default AboutCareerCardSkeletonLoader;
