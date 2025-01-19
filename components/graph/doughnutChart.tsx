'use client'
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const DoughnutChartComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // 차트 인스턴스 생성
    const myChart = echarts.init(chartRef.current);

    // 차트 옵션 설정
    const option = {
      title: {
        text: '도넛차트 예시',
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
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

export default DoughnutChartComponent;