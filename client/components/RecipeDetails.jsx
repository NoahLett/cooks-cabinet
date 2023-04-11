import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RecipeDetails.css';

export default function RecipeDetails(props) {

  const [recipe, setRecipe] = useState(null);

  const urlArray = window.location.href.split('/');
  const recipeId = urlArray[4];

  useEffect(() => {
    fetch(`/api/recipes/${Number(recipeId)}`)
      .then(res => res.json())
      .then(recipe => setRecipe(recipe));
  }, [recipeId]);

  if (!recipe) return null;

  const { name, description, photoUrl, steps, ingredients } = recipe;

  return (
    <div className='rec-container'>
      <img className='rec-photo' src={photoUrl} alt="rec-photo" />
      <h1 className='rec-name'>{name}</h1>
      <h3 className='rec-desc'>{description}</h3>
      <ul className='ingredients-list'>
        {ingredients && ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <ol className='steps-list'>
        {steps && steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <Link className='back-link' to='/'>Back</Link>
    </div>
  );
}
