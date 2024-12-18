"use client"
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function TodoPage() {

    const [markdownText, setMarkdownText] = useState(`# Hello, Markdown!
  
  This is a **markdown** example.
  
  - List item 1
  - List item 2
  
  \`\`\`js
  const hello = "world";
  console.log(hello);
  \`\`\`
  `);

  return (
    <div id="main" className="todo">
    <h1 className="title">ToDo</h1>
    <hr />
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdownText}
        </ReactMarkdown>
    </div>
  )
}