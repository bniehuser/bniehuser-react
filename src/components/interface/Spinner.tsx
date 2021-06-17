import React, { FC } from 'react';

type Props = {
  text?: string;
}

export const Spinner: FC<Props> = ({text}) => <div className={'spinner'}>{text}</div>;
