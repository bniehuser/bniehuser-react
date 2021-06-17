import React, { FC } from 'react';

type Props = {
  e: string;
}

export const Error: FC<Props> = ({e}) => <div className={'error'}>{e}</div>;
