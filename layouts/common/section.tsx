"use client"
import React, { useState, useEffect } from "react"
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';

export default function CommonSection({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <section>
            <div className="ly_section">
                <div className='section-main'>
                    {children}
                </div>
            </div>
        </section>
    )
}
