import React, { FC, useEffect, useState } from 'react';
import { SeriesData, StockChart } from '../../components/charts/StockChart';
import useApiMethod from '../../hooks/useApiMethod';
import { Stock, StocksService } from '../../openapi';
import { Number} from '../../components/util/Number';

const r = (n: number): number => Math.round(n*100)/100;

export const Stocks: FC = () => {
  const [stock, setStock] = useState<Stock|undefined>();
  const [series, setSeries] = useState<{series: SeriesData[], linear: SeriesData[]}>({series:[], linear:[]});
  const [ticker, setTicker] = useState<string>('GOOG');

  const { request: getStockData, error, inProgress } = useApiMethod(StocksService.getTickerStocksTickerGet);

  const getStock = (ticker: string) => getStockData({ticker}).then(r => setStock(r));

  useEffect(() => {
    if(stock) {
      console.log('should set series from ', stock.history)
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

  return <div>
    <input type={'text'} value={ticker} onChange={e => setTicker(e.target.value)}/> <button type={'submit'} onClick={() => getStock(ticker)}>Fetch</button>
    {inProgress ? 'Loading...' : (error ? <div><strong style={{color:'red'}}>Error:</strong> {error}</div> :
      stock && <div style={{maxWidth:'640px'}} className={'interface'}>
        <div style={{display:'flex',flexDirection:'column',margin:'.25em'}}>
            <div style={{display:'flex',flexDirection:'row'}}>
                <div style={{marginRight:'.5em',marginBottom:'.25em'}}><img src={stock.logo_url} alt={stock.name_short}/></div>
            <div>
                <h2 style={{marginBottom:'.25em'}}>{stock.symbol}</h2>
                <strong style={{display:'block', marginBottom:'1em'}}>{stock.name}</strong>
                <div>
                    <strong style={{fontSize:'200%', paddingRight:'.5em'}}><Number currency={true}>{stock.price}</Number></strong>
                    <span style={{fontSize:'150%'}}><Number currency={true} colorize={true}>{stock.change}</Number></span>
                </div>
            </div>
            </div>
        </div>
      {series.series?.length && <div style={{borderRadius:'.5em', paddingRight:'.25em', margin:'.25em', background:'#222'}}><StockChart seriesData={series.series} seriesDataLinear={series.linear}/></div>}
    </div>)}
  </div>;
}
