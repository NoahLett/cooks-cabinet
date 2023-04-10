import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RecipeFeed.css';

function RecipeFeed() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/api/recipes')
      .then(res => res.json())
      .then(recipes => setRecipes(recipes));
  }, []);

  return (
    <div className="card-container">
      <h1 className='recipes-title'>Recipes</h1>
      <div className="cards">
        {recipes.map(recipe => (
          <div key={recipe.recipeId}>
            <Recipe recipe={recipe} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Recipe(props) {
  const { recipeId, name, photoUrl, description } = props.recipe;
  return (
    <div className='card'>
      <Link
      to={`/recipes/${recipeId}`}
      className='recipe-link'
    >
        <img src={photoUrl} className='card-img-top' alt={name} />
        <div className='card-body'>
          <h5 className='card-title'>{name}</h5>
          <p className='card-text'>{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default RecipeFeed;
