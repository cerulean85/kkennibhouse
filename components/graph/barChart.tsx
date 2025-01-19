'use client'
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const BarChartComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // 차트 인스턴스 생성
    const myChart = echarts.init(chartRef.current);

    // 차트 옵션 설정
    const option = {
      title: {
        text: '막대그래프 예시',
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: ['A', 'B', 'C', 'D', 'E'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [10, 52, 200, 334, 390],
          type: 'bar',
        },
      ],
    };

    // 차트 적용
    myChart.setOption(option);

    // 컴포넌트 언마운트 시 차트 리소스 해제
    return () => {
      myChart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default BarChartComponent;