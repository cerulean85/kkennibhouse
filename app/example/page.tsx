'use client'
import React, { useState, useEffect, useRef } from 'react';
import BarChartComponent from '@/components/graph/barChart'
import DoughnutChartComponent from '@/components/graph/doughnutChart'
import MixedLineBarChartComponent from '@/components/graph/mixedLineBarChart';
import { RootState } from '@/stores/store';
import { useSelector } from 'react-redux';

const ExamplePage = () => {

  const remoteUrl = useSelector((state: RootState) => state.config.remoteUrl);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${remoteUrl}/posts/about/1`);
        if (!res.ok) throw new Error('Failed to fetch data');
        const result = await res.json();
        console.log(result);
        
      } catch (error) {
        console.error(error);
      } finally {
        
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%' }}>

        <BarChartComponent></BarChartComponent>

        <DoughnutChartComponent></DoughnutChartComponent>

        <MixedLineBarChartComponent></MixedLineBarChartComponent>

    </div>
  )
};

export default ExamplePage;