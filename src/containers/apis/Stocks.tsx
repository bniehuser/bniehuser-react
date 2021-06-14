import React, { FC, useEffect, useState } from 'react';
import { SeriesData, StockChart } from '../../components/charts/StockChart';
import { StockView } from '../../components/data-views/StockView';
import useApiMethod from '../../hooks/useApiMethod';
import { Stock, StocksService } from '../../openapi';
import { Number} from '../../components/util/Number';

export const Stocks: FC = () => {
  const [stock, setStock] = useState<Stock|undefined>();
  const [ticker, setTicker] = useState<string>('GOOG');

  const { request: getStockData, error, inProgress } = useApiMethod(StocksService.getTickerStocksTickerGet);

  const getStock = (ticker: string) => getStockData({ticker}).then(r => setStock(r));

  return <div>
    <input type={'text'} value={ticker} onChange={e => setTicker(e.target.value)}/> <button type={'submit'} onClick={() => getStock(ticker)}>Fetch</button>
    {inProgress ? 'Loading...' : (error ? <div><strong style={{color:'red'}}>Error:</strong> {error}</div> :
      stock && <div style={{maxWidth:'640px'}} className={'interface'}>
        <StockView data={stock}/>
    </div>)}
  </div>;
}
