import React, { FC, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export type SeriesData = {
  x: Date,
  y: [number, number?, number?, number?],
}

type StockState = {
  series: {
    name?: string,
    data: SeriesData[],
  }[],
  options: ApexOptions,
  seriesBar: {
    name?: string,
    data: SeriesData[],
  }[],
  optionsBar: ApexOptions,
}

type Props = {
  seriesData: SeriesData[],
  seriesDataLinear: SeriesData[],
}

export const StockChart: FC<Props> = ({seriesData, seriesDataLinear}) => {
  const data:StockState = {

      series: [{
        data: seriesData
      }],
      options: {
        chart: {
          type: 'candlestick',
          height: 290,
          id: 'candles',
          toolbar: {
            autoSelected: 'pan',
            show: false
          },
          zoom: {
            enabled: false
          },
        },
        plotOptions: {
          candlestick: {
            colors: {
              upward: '#66cc66',
              downward: '#cc6666'
            }
          }
        },
        xaxis: {
          type: 'datetime',
          labels: { style: { colors: '#999' } }
        },
        yaxis: {
          labels: { style: { colors: '#999' } }
        }
      },

      seriesBar: [{
        name: 'volume',
        data: seriesDataLinear
      }],
      optionsBar: {
        chart: {
          height: 140,
          type: 'bar',
          brush: {
            enabled: true,
            target: 'candles'
          },
          selection: {
            enabled: true,
            xaxis: {
              min: seriesDataLinear[0].x.getTime()-(12*60*60*1000),
              max: seriesDataLinear[seriesDataLinear.length-1].x.getTime()+(12*60*60*1000)
            },
            fill: {
              color: '#ccc',
              opacity: 0.25
            },
            stroke: {
              color: '#333',
            }
          },
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          bar: {
            columnWidth: '80%',
          }
        },
        stroke: {
          width: 0
        },
        colors: ['#666'],
        xaxis: {
          type: 'datetime',
          axisBorder: {
            offsetX: 13
          },
          labels: { style: { colors: '#999' } }
        },
        yaxis: {
          labels: {
            show: false
          }
        }
      },


    };



    return (


      <div className="chart-box">
        <div id="chart-candlestick">
          <ReactApexChart options={data.options} series={data.series} type="candlestick" height={290} />
        </div>
        <div id="chart-bar">
          <ReactApexChart options={data.optionsBar} series={data.seriesBar} type="bar" height={140} />
        </div>
      </div>


    );
}
