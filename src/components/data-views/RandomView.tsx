import React, { FC, useState } from 'react';
import Chance from 'chance';

const chance = new Chance();

type RandomContent = {
  paragraphs: Array<{
    title: string;
    data: string;
  }>
};

const createRandomContent = (): RandomContent => {
  const content: RandomContent = { paragraphs: [] };
  const numP = chance.integer({min: 1, max: 5});
  for(let i = 0; i < numP; i++) {
    content.paragraphs.push({
      title: chance.sentence({words: chance.integer({min: 3, max: 8})}),
      data: chance.paragraph({ sentences: chance.integer({min: 2, max: 6})})
    })
  }
  return content;
}

export const RandomView: FC = () => {
  const [content] = useState<RandomContent>(createRandomContent());
  return <>{content.paragraphs.map(p => <div><h3>{p.title}</h3><p>{p.data}</p></div>)}</>;
}
