import React, { FC, useEffect, useState } from 'react';
import useApiMethod from '../../hooks/useApiMethod';
import { Stock, StocksService } from '../../openapi';
import { SeriesData, StockChart } from '../charts/StockChart';
import { Number } from '../util/Number';

type Props = {
  data?: Stock
  ticker?: string
}

const r = (n: number): number => Math.round(n*100)/100;

export const StockView: FC<Props> = ({data, ticker}) => {
  const [series, setSeries] = useState<{series: SeriesData[], linear: SeriesData[]}>({series:[], linear:[]});
  const [stock, setStock] = useState<Stock|undefined>(data);

  const { request: getStockData, error, inProgress } = useApiMethod(StocksService.getTickerStocksTickerGet);

  const getStock = (ticker: string) => getStockData({ticker}).then(r => setStock(r));

  useEffect(() => {
    if(ticker && !stock) {
      getStock(ticker);
    }
  }, [ticker])

  useEffect(() => {
    if(stock) {
      setSeries({
        series: stock.history.map((h, i) => {
          const d = new Date();
          d.setHours(0,0,0,0);
          d.setTime(d.getTime()-(24*60*60*1000*(stock.history.length-i)));
          return { x: d, y: [r(h.open), r(h.high), r(h.low), r(h.close)] };
        }),
        linear: stock.history.map((h, i) => {
          const d = new Date();
          d.setHours(0,0,0,0);
          d.setTime(d.getTime()-(24*60*60*1000*(stock.history.length-i)));
          return { x: d, y: [h.volume] };
        })
      })
    } else {
      setSeries({series:[], linear:[]});
    }
  }, [stock]);

  if(inProgress) {
    return <>Loading...</>;
  } else if(error) {
    return <div><strong style={{color:'red'}}>Error:</strong> {error}</div>;
  } else if(!stock) {
    return <div><strong style={{color:'red'}}>Error:</strong> unable to load stock</div>;
  } else {
    return <>
      <div style={{display: 'flex', flexDirection: 'column', margin: '.25em'}}>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <div style={{marginRight: '.5em', marginBottom: '.25em'}}><img src={stock.logo_url} alt={stock.name_short}/>
          </div>
          <div>
            <h2 style={{marginBottom: '.25em'}}>{stock.symbol}</h2>
            <strong style={{display: 'block', marginBottom: '1em'}}>{stock.name}</strong>
            <div>
              <strong style={{fontSize: '200%', paddingRight: '.5em'}}><Number
                currency={true}>{stock.price}</Number></strong>
              <span style={{fontSize: '150%'}}><Number currency={true} colorize={true}>{stock.change}</Number></span>
            </div>
          </div>
        </div>
      </div>
      {series.series?.length &&
      <div style={{borderRadius: '.5em', paddingRight: '.25em', margin: '.25em', background: '#222'}}><StockChart
          seriesData={series.series} seriesDataLinear={series.linear}/></div>}
    </>;
  }
}
