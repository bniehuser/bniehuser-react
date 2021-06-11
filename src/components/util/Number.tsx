import React, { FC } from 'react';

type NumberProps = {
  currency?: boolean;
  colorize?: boolean;
  precision?: number;
}

export const Number: FC<NumberProps> = ({children, currency = false, colorize = false, precision = 0}) => {
  const usePrecision = currency ? 2 : precision;
  const val = parseFloat(children as string);
  const showVal = val * (colorize && val < 0 ? -1 : 1);
  return <span className={'number'+(colorize ? (val > 0 ? ' pos' : (val < 0 ? ' neg' : '')) : '')}>{currency?'$':''}{showVal.toLocaleString(undefined, {minimumFractionDigits: currency ? 2 : 0, maximumFractionDigits: usePrecision})}</span>
}
