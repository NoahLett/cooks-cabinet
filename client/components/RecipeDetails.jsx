import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function RecipeDetails(props) {

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`/api/recipes/${props.recipeId}`)
      .then(res => res.json())
      .then(recipe => setRecipe({ recipe }));
  }, [props.recipeId]);

  if (!recipe) return null;

  const { name, description, photoUrl, steps, ingredients } = recipe;

  return (
    <div className='rec-container'>
      <Link to='/'>Back</Link>
      <h1 className='rec-name'>{name}</h1>
      <h3 className='rec-desc'>{description}</h3>
      <img className='rec-photo' src={photoUrl} alt="rec-photo" />
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <ol>
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
