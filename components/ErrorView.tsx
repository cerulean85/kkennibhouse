'use client'
import React from 'react';

export default function ErrorViewComponent(props: { message: string, onClick: () => void }) {

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={props.onClick}>
        Try again
      </button>
    </div>
  )
}
