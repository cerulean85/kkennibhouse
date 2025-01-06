'use client'
import React, { useState, useEffect } from 'react';
import { posts } from '@/contents/posts'
import { useSearchParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { setMenu } from '@/stores/currentMenuSlice'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/stores/store';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

export default function ArticlePage() {
  const searchParams = useSearchParams();
  const from: string = searchParams.get('from') ?? '';
  const postId: string = searchParams.get('postId') ?? '';
  const post = posts.find((item: any) => (item['articleType'] == from) && (item['postId'] == postId));

  const title: string = post['title'];
  const contents: string = post['contents']
  const cover: string = post['cover']
  const [markdownText, setMarkdownText] = useState('');
  const dispatch: AppDispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setMenu(from));
  })

  useEffect(() => { 
    setMarkdownText(contents);
  }, [contents])
  
  return (

    <div className='ly_article'>            
      <div className='article-content'>
        <div className='ly_article-title'>
          <div className='inner'>
            <img src='/images/icon/file_shape_24.png' className='icon'/>
            <div className='title'>{title}</div>
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
                    // 코드 (```)
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
                        style={{ width: "50%", minWidth: "320px" }}
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
              {markdownText
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
