import { getData } from '@/lib/notion';
import Renderer from '@/components/notion/Renderer';

import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';


export default async function NotionViewComponent({ pageId }: { pageId: string}) {

    // const pageId = '1729e384125980ecb764d84ad120ec96';
    const data = await getData(pageId);
    console.log(data);
  
    return (
        <div className='ly_article-listview'>
          <div className='notion-style'>
      <Renderer recordMap={data} rootPageId={pageId} />
      </div>
        </div>
    )
}
