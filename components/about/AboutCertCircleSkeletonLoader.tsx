import React from 'react';
import ContentLoader from 'react-content-loader';

const AboutCertCircleSkeletonLoader: React.FC = () => (

  <div style={{ position: 'relative', width: '130px', height: '130px' }}>
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
        style={{height: '60px'}}
        src={`/images/icon/thumbnail.svg`} />
    </div>
    <ContentLoader
      speed={2}
      width={130}
      height={130}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="65" ry="65" width="130" height="130" />
    </ContentLoader>
  </div>
  
);

export default AboutCertCircleSkeletonLoader;