import React, { FC, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useApiMethod from '../../hooks/useApiMethod';
import { Recipe, RecipesService } from '../../openapi';
import { recipesState } from '../../state/recipes';
import { Spinner, Error } from '../interface';

type Props = {
  id: number;
}

export const RecipeView: FC<Props> = ({id}) => {
  const [recipe, setRecipe] = useState<Recipe|undefined>(undefined);
  const [recipes, setRecipes] = useRecoilState(recipesState);
  const data = useApiMethod(RecipesService.getRecipeRecipesRecipeIdGet);
  useEffect(() => {
    if(recipes[id] !== undefined) {
      setRecipe(recipes[id]);
    } else {
      data.request({id: id.toString()}).then(r => {
        if(r) {
          setRecipes({...recipes, [id]: r})
        }
        setRecipe(r);
      }).catch(() => {
        setRecipe(undefined);
      })
    }
  }, [id])
  return <div>
    {data.inProgress ? <Spinner text={'loading...'}/> : (data.error ? <Error e={data.error}/> : recipe && (
      <div className={'panel-selector'} style={{padding:'2px',position:'relative'}}>
        <div className={'panel-option'} style={{display:'block',padding:'1em',position:'relative'}}>
        <h2>{recipe.title}</h2>
        <div style={{display:'flex', flexDirection:'row'}}>
          <div style={{flexBasis:'33%',maxWidth:'33%',margin:'0 1em 1em 0'}}><img src={recipe.image} alt={recipe.title} style={{width:'100%'}}/></div>
          <div style={{flexBasis:'67%'}} dangerouslySetInnerHTML={{__html: recipe.summary}}/>
        </div>
        <h3>Ingredients</h3>
        <ul>{recipe.ingredients.map(i => <li><strong>{i.amount} {i.unit}</strong> {i.original_name}</li>)}</ul>
        {recipe.instructions || recipe.full_instructions?.length ? <>
          <h3>Instructions</h3>
          <div dangerouslySetInnerHTML={{__html: recipe.instructions}}/>
          {recipe.full_instructions.map(i => <div>
            {i.name && <h4>{i.name}</h4>}
            <ul style={{listStyle:'none'}}>
              {i.steps.map(s => <li><strong>{s.number})</strong> {s.step}</li>)}
            </ul>
          </div>)}
        </> : ''}
      </div>
      </div>
    ))}
  </div>;
}
