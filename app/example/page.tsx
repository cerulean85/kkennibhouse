'use client'
import Link from 'next/link';
import { Provider } from 'react-redux';
import Example2Component from '@/components/Example2';
import store from '@/components/store';

export default function AboutPage() {
  return (
    <div>
        About Page
        <Provider store={store}>
      <div>
        <Example2Component></Example2Component>
      </div>
      </Provider>
    </div>
  )
}