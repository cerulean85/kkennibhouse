import React from 'react';
import ContentLoader from 'react-content-loader';

const AboutTechCircleSkeletonLoader: React.FC = () => (

  <div style={{ position: 'relative', width: '105px', height: '105px' }}>
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <img
        className='tech-symbol'
        style={{height: '48px'}}
        src={`/images/icon/thumbnail.svg`} />
    </div>
    <ContentLoader
      speed={2}
      width={105}
      height={105}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="52.5" ry="52.5" width="105" height="105" />
    </ContentLoader>
  </div>
  
);

export default AboutTechCircleSkeletonLoader;

  {/* <img className='tech-symbol' src={`/images/icon/thumbnail.svg`}/> */}