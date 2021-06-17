import React, { FC, useEffect, useState } from 'react';
import useApiMethod from '../../hooks/useApiMethod';
import { RecipeIngredientSearchResult, RecipesService } from '../../openapi';
import { Error, Spinner } from '../interface';

type Props = {
  search: string;
  onSelect?: (r: RecipeIngredientSearchResult) => void
}

export const RecipeSearchView: FC<Props> = ({search, onSelect}) => {
  const [recipeResults, setRecipeResults] = useState<RecipeIngredientSearchResult[]>([]);
  const data = useApiMethod(RecipesService.searchRecipesSearchIngredientsGet);
  useEffect(() => {
    data.request({ingredients: search}).then(r => {
      if(r) {
        setRecipeResults(r)
      }
    }).catch(() => {
      setRecipeResults([]);
    })
  }, [search])
  return <div className={'panel-selector'}>
    {data.inProgress ? <Spinner text={'loading...'}/> : (data.error ? <Error e={data.error}/> : recipeResults.length ?
      recipeResults.map(r => (<div className={'panel-option'}>
        <div className={'panel-option-input'}>
          <h4>{r.title}</h4>
          <span>used: <em>{r.used_ingredients.map(i => i.name).join(', ')}</em></span>{' '}
          <span>unused: <em>{r.unused_ingredients.map(i => i.name).join(', ')}</em></span>{' '}
          <span>needed: <em>{r.missed_ingredients.map(i => i.name).join(', ')}</em></span>
        </div>
        <button onClick={() => onSelect ? onSelect(r) : null}>insert</button>
      </div>)) : <Error e='No Results Found'/>)}
  </div>;
}
