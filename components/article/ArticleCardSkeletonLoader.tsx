// components/SkeletonLoader.tsx
import React from 'react';
import ContentLoader from 'react-content-loader';

const ArticleCardSkeletonLoader: React.FC = () => (

  <div className='card' style={{cursor: 'default'}}>
    <div className='outer'>
      <div className='inner'>
        <div className='thumbnail'>
        <img className='no-image fit-cover'
             src='/images/icon/thumbnail.svg'/>
        </div>
        <div className='card-title'>
          <ContentLoader
            speed={2}
            width='100%'
            height={160}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="5" ry="5" width="100%" height="22" />
            <rect x="0" y="30" rx="5" ry="5" width="100%" height="22" />
          </ContentLoader>
        </div>
        <div className='card-date'>
          <ContentLoader
              speed={2}
              width='100%'
              height={10}
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="50%" y="0" rx="5" ry="5" width="50%" height="10" />
          </ContentLoader>
        </div>
      </div>
    </div>
  </div>
);

export default ArticleCardSkeletonLoader;
