import { calculateMA } from './candleChartUtil.js';

const color = {
  up: '#EE3739',
  down: '#0A7DF2',
  day5: '#00C50D',
  day20: '#FF333A',
  day60: '#F48416',
  day120: '#BB69FF'
}

const basicOption = {
  animation: false,
  legend: {
    bottom: 10,
    left: 'center',
    data: ['이동평균선', '5일', '20일', '60일', '120일']
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    textStyle: {
      color: '#000'
    },
    position(pos, params, el, elRect, size) {
      const obj = { top: 10 };
      obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
      return obj;
    }
  },
  axisPointer: {
    link: { xAxisIndex: 'all' },
    label: {
      backgroundColor: '#777'
    }
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: false
      },
      brush: {
        type: ['lineX', 'clear']
      }
    }
  },
  brush: {
    xAxisIndex: 'all',
    brushLink: 'all',
    outOfBrush: {
      colorAlpha: 0.1
    }
  },
  visualMap: {
    show: false,
    seriesIndex: 5,
    dimension: 2,
    pieces: [{
      value: 1,
      color: color.down
    }, {
      value: -1,
      color: color.up
    }]
  },
  grid: [
    {
      left: '10%',
      right: '8%',
      height: '50%'
    },
    {
      left: '10%',
      right: '8%',
      top: '63%',
      height: '16%'
    }
  ],
  yAxis: [
    {
      scale: true,
      splitArea: {
        show: true
      }
    },
    {
      scale: true,
      gridIndex: 1,
      splitNumber: 2,
      axisLabel: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false }
    }
  ],
  dataZoom: [
    {
      type: 'inside',
      xAxisIndex: [0, 1],
      start: 97,
      end: 100
    },
    {
      show: true,
      xAxisIndex: [0, 1],
      type: 'slider',
      top: '85%',
      start: 97,
      end: 100
    }
  ],

}

function makeXAxis(data) {
  return [
    {
      type: 'category',
      data: data.categoryData,
      scale: true,
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false },
      splitNumber: 20,
      min: 'dataMin',
      max: 'dataMax',
      axisPointer: {
        z: 100
      }
    },
    {
      type: 'category',
      gridIndex: 1,
      data: data.categoryData,
      scale: true,
      boundaryGap: false,
      axisLine: { onZero: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      splitNumber: 20,
      min: 'dataMin',
      max: 'dataMax'
    }
  ]
}

function makeSeries(data) {
  return [
    {
      name: '이동평균선',
      type: 'candlestick',
      data: data.values,
      itemStyle: {
        color: color.up,
        color0: color.down,
        borderColor: null,
        borderColor0: null
      },
      tooltip: {
        formatter: function (param) {
          param = param[0];
          return [
            'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
            'Open: ' + param.data[0] + '<br/>',
            'Close: ' + param.data[1] + '<br/>',
            'Lowest: ' + param.data[2] + '<br/>',
            'Highest: ' + param.data[3] + '<br/>'
          ].join('');
        }
      }
    },
    {
      name: '5일',
      type: 'line',
      symbol: 'none',
      data: calculateMA(5, data),
      color: color.day5,
      smooth: true,
      lineStyle: {
        opacity: 0.4
      }
    },
    {
      name: '20일',
      type: 'line',
      symbol: 'none',
      data: calculateMA(20, data),
      color: color.day20,
      smooth: true,
      lineStyle: {
        opacity: 0.4
      }
    },
    {
      name: '60일',
      type: 'line',
      symbol: 'none',
      data: calculateMA(60, data),
      color: color.day60,
      smooth: true,
      lineStyle: {
        opacity: 0.4
      }
    },
    {
      name: '120일',
      type: 'line',
      symbol: 'none',
      data: calculateMA(120, data),
      color: color.day120,
      smooth: true,
      lineStyle: {
        opacity: 0.4
      }
    },
    {
      name: '거래량',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: data.volumes
    }
  ]
}

export { basicOption, makeXAxis, makeSeries };