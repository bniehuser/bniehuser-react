export type DashNode = {
  orientation: 'row'|'column';
  size: number|string; // corresponds with flex-basis
  nodes: Array<DashNode|DashLeaf>
}

export type DashLeaf = {
  size: number|string;
  component: string; // should be better qualified
  arguments: {
    [key: string]: any
  }
}

