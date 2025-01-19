'use client'
import React, { useState, useEffect, useRef } from 'react';
import BarChartComponent from '@/components/graph/barChart'
import DoughnutChartComponent from '@/components/graph/doughnutChart'
import MixedLineBarChartComponent from '@/components/graph/mixedLineBarChart';

const ExamplePage = () => {

  return (
    <div style={{ width: '100%' }}>

        <BarChartComponent></BarChartComponent>

        <DoughnutChartComponent></DoughnutChartComponent>

        <MixedLineBarChartComponent></MixedLineBarChartComponent>

    </div>
  )
};

export default ExamplePage;