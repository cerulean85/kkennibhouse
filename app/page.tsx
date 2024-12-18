'use client'
import Link from 'next/link';
import Example2Component from '@/components/Example2';
import { Provider } from 'react-redux';
import store from '../components/store';

export default function Home() {
  
  return (
    <div id="main">
      <h1 className="title">About Me</h1>
      <hr />

      <h1 className="title">나는 누구인가</h1>
      <button className="button">Click Me</button>
      

      {/* <Provider store={store}>
      <div>
        <Example2Component></Example2Component>
      </div>
      </Provider> */}
    </div>
  );
}
