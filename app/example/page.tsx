import React from 'react';
import { getData } from '@/lib/notion';
import Renderer from '@/components/notion/Renderer';

import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';


const ExamplePage = async () => {

    const pageId = '1729e384125980ecb764d84ad120ec96';
    const data = await getData(pageId);
    console.log(data);
  
  

  return (
    <div>
      
      <Renderer recordMap={data} rootPageId={pageId} />

    </div>
  )
};

export default ExamplePage;