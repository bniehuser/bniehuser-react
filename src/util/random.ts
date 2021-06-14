const {floor, random} = Math;

const BASIC_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

export const randArrayItem: (a: any[]) => any = a => a[floor(random()*a.length)]

export const makeRandString: (l: number) => string = l => { return Array.apply(null, Array(l)).map(() => randArrayItem(BASIC_CHARS)).join(''); }

