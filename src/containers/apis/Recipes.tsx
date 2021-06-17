import React, { FC, useState } from 'react';
import { useRecoilState } from 'recoil';
import { RecipeView } from '../../components/data-views/RecipeView';
import { Spinner } from '../../components/interface/Spinner';
import { Error } from '../../components/interface/Error';
import useApiMethod from '../../hooks/useApiMethod';
import { Recipe, RecipesService } from '../../openapi';
import { recipesState } from '../../state/recipes';

export const Recipes: FC = () => {
  const [recipe, setRecipe] = useState<Recipe|undefined>(undefined);
  const [recipes, setRecipes] = useRecoilState(recipesState);
  const data = useApiMethod(RecipesService.getRandomRecipeRecipesRandomGet);
  const getRandomRecipe = () => {
    data.request().then(r => {
      if(r) {
        setRecipes({...recipes, [r.id]: r});
        setRecipe(r);
      }
    }).catch(e => console.error(e))
  }
  return <div>
    <button onClick={() => getRandomRecipe()}>Get a random recipe</button>
    {data.inProgress && <Spinner text={'loading...'}/>}
    {data.error && <Error e={data.error}/>}
    {recipe && <RecipeView id={recipe.id}/>}
  </div>;
}
