import React, { FC, ReactNode, ReactNodeArray, useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';
import { PrivateChat } from '../chat/PrivateChat';
import { PublicChat } from '../chat/PublicChat';
import { RandomView } from '../data-views/RandomView';
import { RecipeView } from '../data-views/RecipeView';
import { StockView } from '../data-views/StockView';
import { DashLeaf, DashNode } from './types';

type Props = {
  config: DashLeaf;
  parent: DashNode;
}

type ListingProps = {
  name: string;
  opts?: ReactNode|ReactNodeArray;
  onClick: () => void;
}


const AddListing: FC<ListingProps> = p =>
  <div className={'panel-option'}>
    <div className={'panel-option-title'}>
      {p.name}
    </div>
    <div className={'panel-option-input'}>
      {p.opts}
    </div>
    <button onClick={p.onClick}>insert</button>
  </div>;

export const Content: FC<Props> = ({config, parent}) => {
  const [dash,setDashNode] = useDashboard();
  const [newRecipeSearch, setNewRecipeSearch] = useState<string>('chimichanga');
  const [newTicker, setNewTicker] = useState<string>('AMC');
  const [newRandomParagraphs, setNewRandomParagraphs] = useState<string>('');
  const findParent = (n: DashNode|DashLeaf, d: DashNode = dash): DashNode|DashLeaf|undefined => d.nodes?.indexOf(n) > -1 ? d : d.nodes?.reduce((a, s) => a || findParent(n, s as DashNode));
  const split = (direction: 'row'|'column') => {
    if(parent.orientation === direction) {
      const size = (parseFloat(config?.size as string || '0')/2) + '%';
      setDashNode(config, [{...config, size} as DashLeaf, {size, name:'Select...', component:'',arguments:{}} as DashLeaf]);
    } else {

      setDashNode(config, [{
        size:config.size,
        orientation: direction,
        nodes: [{...config, size:'50%'}, {size:'50%',component:'',name:'Select...',arguments:{}}]
      }]);
    }
  }
  const splitHorizontal = () => split('column');
  const splitVertical = () => split('row');
  const deleteContent = () => {
    let up: DashNode|DashLeaf|undefined = parent;
    let lc: DashNode|DashLeaf = config;
    while(up && (up as DashNode).nodes?.length === 1) {
      lc = up;
      up = findParent(up);
    }
    // should get us back to parent node where needed
    if(up) {
      const size = parseFloat(lc?.size as string || '0');
      const nodes = (up as DashNode).nodes.filter(n => n !== lc).map(n => ({
        ...n,
        size: ((parseFloat(n?.size as string || '0') / (100 - size)) * 100).toFixed(2) + '%'
      }));
      setDashNode(up, [{...up, nodes}])
    } else {
      console.error('could not find multi-child parent', parent, dash);
    }

  }

  const startResize = (e: React.MouseEvent, config: DashNode|DashLeaf, dir: 'horizontal'|'vertical') => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.nativeEvent.cancelBubble = true;
    e.nativeEvent.returnValue = false;
    // now what though? i guess we pass through to the context provider?
    const rect = (e.target as HTMLDivElement)?.parentElement?.getBoundingClientRect();
    if(rect) {
      let parent: DashNode|DashLeaf|undefined;
      let checker = findParent(findParent(config) || config);
      let lastCheck = checker;
      while(checker && (parent === undefined)) {
        if(dir === 'horizontal' && (checker as DashNode).orientation === 'column') {
          parent = checker;
        } else if(dir === 'vertical' && (checker as DashNode).orientation === 'row') {
          parent = checker;
        } else {
          lastCheck = checker;
          checker = findParent(checker);
        }
      }
      if(parent) {
        const testy = document.createElement('div');
        testy.style.position = 'absolute';
        testy.style.background = 'rgba(66,66,66,.25)';
        testy.style.border = '2px dashed rgba(132,132,132,.6)';
        testy.style.top = rect.y+'px';
        testy.style.left = rect.x+'px';
        testy.style.width = rect.width+'px';
        testy.style.height = rect.height+'px';
        document.getElementsByTagName('body')[0].appendChild(testy);
        const s = parseFloat(lastCheck?.size.toString() || '1');
        const rs = dir === 'horizontal' ? rect.height : rect.width;
        const oX = e.clientX;
        const oY = e.clientY;
        let fscale = s;
        let os = 0;
        let scale = 1;
        const mm = (e: MouseEvent) => {
          os = dir === 'horizontal' ? e.clientY - oY : e.clientX - oX;
          scale = (rs+os)/rs;
          if(dir === 'horizontal') {
            testy.style.height = (rs+os)+'px';
          } else {
            testy.style.width = (rs+os)+'px';
          }
          fscale = s * scale;
          // can we do this all the time?
          // setDashNode(parent as DashNode, [{...(parent as DashNode), size: fscale+'%'}]);
        };
        const rm = () => {
          console.error('old/new settings', s, fscale);
          console.error('old/new pixels', rs, rs + os);
          testy?.parentElement?.removeChild(testy);
          const lci = (parent as DashNode)?.nodes?.indexOf(lastCheck as DashNode);
          if(lci>-1) {
            const ss = scale -1;
            const rem = (parent as DashNode)?.nodes?.length-(lci+1);
            (parent as DashNode)?.nodes?.forEach((n, i) => {
              if(i === lci) {
                setDashNode(n, [{...n, size: fscale+'%'}]);
              } else if(rem && lci < i) {
                n.size = (parseFloat(n.size.toString()) * (1+(ss/rem)))+'%';
                setDashNode(n, [{...n, size: (parseFloat(n.size.toString()) * (1+(ss/rem)))+'%'}]);
              }
            })
            if(ss>0) {

            }
          }
          document.removeEventListener('mousemove', mm);
          document.removeEventListener('mouseup', rm);
        }
        document.addEventListener('mousemove', mm)
        document.addEventListener('mouseup', rm)
      } else {
        console.error('could not find parent');
      }
    }
    return false;
  }

  const styles: React.CSSProperties = {};
  if(parent.orientation === 'row') { styles.width = config.size; }
  if(parent.orientation === 'column') { styles.height = config.size; }
  const type = config?.component;
  return <div className={'dash-leaf'} style={{...styles, position:'relative'}}><div style={{display:'block',position:'relative'}}>
    <div className={'dash-panel-title'}>
      {config?.name || 'select contents'}
      <div className={'dash-panel-button-tray'}>
        <button className={'dash-panel-button hidden'} onClick={splitHorizontal}>—</button>
        <button className={'dash-panel-button hidden'} onClick={splitVertical}>|</button>
        <button className={'dash-panel-button hidden'} onClick={deleteContent}>✖</button>
        <button className={'dash-panel-button'}>⚙</button>
      </div>
    </div>
    {(() => {
      switch(type) {
        case 'recipe':
          return <RecipeView {...config?.arguments}/>;
        case 'stock':
          return <StockView {...config?.arguments}/>;
        case 'publicChat':
          return <PublicChat/>;
        case 'privateChat':
          return <PrivateChat/>;
        case 'random':
          return <RandomView {...config?.arguments}/>;
        default:
          return <div className={'panel-selector'}>
            <AddListing
              name={'Recipe'}
              opts={<>search:  <input size={10} value={newRecipeSearch} onChange={e => setNewRecipeSearch(e.target.value)}/></>}
              onClick={() => setDashNode(config, [{...config, name:`Recipe: ${newRecipeSearch}`, component: 'recipe', arguments: { search: newRecipeSearch}}])}
            />
            <AddListing
              name={'Stock'}
              opts={<>ticker:  <input size={4} value={newTicker} onChange={e => setNewTicker(e.target.value)}/></>}
              onClick={() => setDashNode(config, [{...config, name:`Stock: ${newTicker}`, component: 'stock', arguments: { ticker: newTicker }}])}
            />
            <AddListing
              name={'Public Chat'}
              onClick={() => setDashNode(config, [{...config, name:'Public Chat', component: 'publicChat'}])}
            />
            <AddListing
              name={'Private Chat'}
              onClick={() => setDashNode(config, [{...config, name:'Private Chat', component: 'privateChat'}])}
            />
            <AddListing
              name={'Random'}
              opts={<>paragraphs: <input type={'number'} size={2} style={{width:'50px'}} value={newRandomParagraphs} onChange={e => setNewRandomParagraphs(e.target.value)}/><span style={{fontSize:'75%'}}>(blank for random)</span></>}
              onClick={() => setDashNode(config, [{...config, name:`Random${newRandomParagraphs ? `: ${newRandomParagraphs}` : ''}`, component: 'random', arguments: { paragraphs: newRandomParagraphs ? parseInt(newRandomParagraphs, 10) : undefined}}])}
            />
          </div>;
      }
    })()}
  </div>
    <div className={'panel-right-shim'} onMouseDown={e => startResize(e, config, 'vertical')}/>
    <div className={'panel-bottom-shim'} onMouseDown={e => startResize(e, config, 'horizontal')}/>
  </div>;
}
