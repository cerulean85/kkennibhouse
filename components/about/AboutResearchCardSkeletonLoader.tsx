// components/SkeletonLoader.tsx
import React from 'react';
import ContentLoader from 'react-content-loader';

const AboutResearchCardSkeletonLoader: React.FC = () => (

  <div className='tech-research-outer'>
  <div className='tech-research-inner'>
    <div className='thumb-box'>
      <ContentLoader
        speed={2}
        width='100%'
        height={90}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="5" ry="5" width="100%" height="100" />
      </ContentLoader>
    </div>
    <div className='txt-box'>
      <div className='corp-box'>
        <ContentLoader
          speed={2}
          width='100%'
          height={20}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          >
            <rect x="20" y="0" rx="5" ry="5" width="50%" height="20" />
        </ContentLoader>        
      </div>
      <div className='topic-box'>
        <ContentLoader
          speed={2}
          width='100%'
          height={20}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          >
            <rect x="20" y="0" rx="5" ry="5" width="100%" height="20" />
        </ContentLoader>
      </div>
    </div>          
  </div>        
</div>
);

export default AboutResearchCardSkeletonLoader;
