import React, { FC, useState } from 'react';
import { Stock, StocksService } from '../../openapi';

export const Stocks: FC = () => {
  const [stock, setStock] = useState<Stock|undefined>();
  const [ticker, setTicker] = useState<string>('GOOG');

  const getStock = (ticker: string) => StocksService.getTickerStocksTickerGet({ticker}).then(r => setStock(r));

  return <div>
    <input type={'text'} value={ticker} onChange={e => setTicker(e.target.value)}/> <button type={'submit'} onClick={() => getStock(ticker)}>Fetch</button>
    {stock && <div>
      <h2>{stock.symbol}</h2>
        <h3>{stock.name}</h3>
        <img src={stock.logo_url}/>
        <div>{stock.price}</div>
        <div>{stock.change}</div>
    </div>}
  </div>;
}
