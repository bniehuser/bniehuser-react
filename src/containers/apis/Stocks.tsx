import React, { FC, useState } from 'react';
import { StockView } from '../../components/data-views/StockView';
import { Error, Spinner } from '../../components/interface';
import useApiMethod from '../../hooks/useApiMethod';
import { Stock, StocksService } from '../../openapi';

export const Stocks: FC = () => {
  const [stock, setStock] = useState<Stock | undefined>();
  const [ticker, setTicker] = useState<string>('GOOG');

  const {request: getStockData, error, inProgress} = useApiMethod(StocksService.getTickerStocksTickerGet);

  const getStock = (ticker: string) => getStockData({ticker}).then(r => setStock(r));

  return <div>
    <input type={'text'} value={ticker} onChange={e => setTicker(e.target.value)}/>
    <button type={'submit'} onClick={() => getStock(ticker)}>Fetch</button>
    {inProgress ? <Spinner text={'loading...'}/> : (error ? <Error e={error}/> :
      stock && <div style={{maxWidth: '640px'}} className={'interface'}>
            <StockView data={stock}/>
        </div>)}
  </div>;
}
