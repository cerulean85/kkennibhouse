'use client';
 
import Link from 'next/link';
import { NotionRenderer } from 'react-notion-x';
import { Code } from 'react-notion-x/build/third-party/code'
import { Collection } from 'react-notion-x/build/third-party/collection'
import { Equation } from 'react-notion-x/build/third-party/equation'
import { Modal } from 'react-notion-x/build/third-party/modal'
import { Pdf } from 'react-notion-x/build/third-party/pdf'
 
interface RendererProps {
  recordMap: any; // 임의로 any
  rootPageId: string;
}
 
export const Renderer = ({ recordMap, rootPageId }: RendererProps) => {
  return (
    <div className="notion__container">
      {/* <Link href="/">뒤로가기</Link> */}
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={false}
        rootPageId={rootPageId}
        previewImages
        disableHeader
        components={{
            Code,
            Modal
          }}
      />
    </div>
  );
};
 
export default Renderer;