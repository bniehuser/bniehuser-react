import React, { FC, useState } from 'react';
import useApiMethod from '../../hooks/useApiMethod';
import { Recipe, RecipesService } from '../../openapi';

export const Recipes: FC = () => {
  const [recipe, setRecipe] = useState<Recipe|undefined>(undefined);
  const {request: getRandomRecipe, inProgress, error} = useApiMethod(RecipesService.getRandomRecipeRecipesRandomGet);
  return <div>
    <button onClick={async () => setRecipe(await getRandomRecipe())}>Get a random recipe</button>
    {inProgress ? 'Loading...' : (error ? <></> : recipe && (
      <div className={'interface'} style={{padding:'2em'}}>
        <h2>{recipe.title}</h2>
        <div style={{display:'flex', flexDirection:'row'}}>
          <div><img src={recipe.image} alt={recipe.title} style={{maxWidth:'480px',margin:'0 1em 1em 0'}}/></div>
        <div dangerouslySetInnerHTML={{__html: recipe.summary}}/>
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
    ))}
  </div>;
}
