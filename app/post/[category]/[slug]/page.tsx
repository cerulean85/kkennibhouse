import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from "remark-gfm";
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
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                code({ className, children }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      style={atomDark}
                      language={match[1]}
                      PreTag="div"
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
                        background: "#7afca19b",
                        padding: "1px 15px",
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
                }
              }}
            >
              {content
                .replace(/\n/gi, "\n\n")
                .replace(/\*\*/gi, "@$_%!^")
                .replace(/@\$_%!\^/gi, "**")
                .replace(/<\/?u>/gi, "*")}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}
