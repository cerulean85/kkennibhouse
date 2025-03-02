import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from "remark-gfm";

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // Katex CSS를 임포트해야 수식이 잘 렌더링됩니다.

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function generateStaticParams() {
  
  const postsDirectory = path.join(process.cwd(), 'posts');
  console.log(`postsDirectory: ${postsDirectory}`);

  const getDirectories = (source: string) =>
    fs.readdirSync(source)
      .filter(name => fs.statSync(path.join(source, name)).isDirectory());
  const categories = getDirectories(postsDirectory);
  const paths = [];

  for (const category of categories) {
    const categoryPath = path.join(postsDirectory, category);
    const files = fs.readdirSync(categoryPath);

    for (const file of files) {
      const slug = file.replace('.md', '');
      paths.push({ category, slug });
    }
  }

  return paths;
}

// 페이지 컴포넌트
export default async function PostPage({ params }: any) {

  const { category, slug } = await params;

  // 파일 읽기
  const filePath = path.join(process.cwd(), 'posts', category, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // Frontmatter와 콘텐츠 분리
  const { data, content } = matter(fileContent);

  return (
    <div className='ly_article'>
      <div className='article-content'>
        <div className='ly_article-title'>
          <div className='inner'>
            <img src='/images/icon/file_shape_24.png' className='icon'/>
            <div className='title'>{data.title}</div>
          </div>
        </div>
        <hr/>
        <div className='contents'>
          <div className='preview'>      
            <ReactMarkdown
            children={content}
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeRaw, rehypeKatex]}
              components={{
                code({ className, children }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      style={atomDark}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        // marginTop: '100px',    // Top margin 추가
                        // padding: '40px',      // Padding 값을 추가
                        // top: '100px'
                      }}
                    >
                      {String(children)
                        .replace(/\n$/, "")
                        .replace(/\n&nbsp;\n/g, "")
                        .replace(/\n&nbsp\n/g, "")}
                        
                    </SyntaxHighlighter>
                  ) : (
                    <SyntaxHighlighter
                      style={atomDark}
                      background="green"
                      language="textile"
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  );
                },
                blockquote({ children, ...props }) {
                  return (
                    <blockquote
                      style={{
                        background: "#adb5bd",
                        padding: "1px 30px",
                        borderRadius: "10px",
                      }}
                      {...props}
                    >
                      {children}
                    </blockquote>
                  );
                },
                img({ ...props }) {
                  return (
                    <div style={{textAlign: "center"}}>
                      <img
                        className="md-img"
                        src={props.src?.replace("../../../../public/", "/")}
                        {...props}
                        />
                    </div>
                  );
                },
                em({ children, ...props }) {
                  return (
                    <span style={{ fontStyle: "italic" }} {...props}>
                      {children}
                    </span>
                  );
                },
                iframe({ ...props }) {
                  return (
                    <div style={{textAlign: "center"}}>
                      <iframe
                        style={{ width: "80%", height:"315px" }}
                        {...props}>
                      </iframe>   
                    </div>
                  )
                },
                table({ node, ...props }) {
                  return (
                    <table
                      {...props}
                      style={{
                        width: '100%',
                        borderCollapse: 'collapse',
                        border: '1px solid #000', // 테두리 색상 지정
                      }}
                    />
                  );
                },
                th({ node, ...props }) {
                  return (
                    <th
                      {...props}
                      style={{
                        border: '1px solid #000', // 테두리 색상 지정
                        padding: '10px',
                        textAlign: 'center',
                        backgroundColor: '#f8f9fa'
                      }}
                    />
                  );
                },
                td({ node, ...props }) {
                  return (
                    <td
                      {...props}
                      style={{
                        border: '1px solid #000', // 테두리 색상 지정
                        padding: '10px',
                        textAlign: 'center',
                      }}
                    />
                  );
                },
              }}
            >
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}
