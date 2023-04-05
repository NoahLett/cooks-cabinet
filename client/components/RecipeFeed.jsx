import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RecipeFeed() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('/api/recipes')
      .then(res => res.json())
      .then(recipes => setRecipes(recipes));
  }, []);

  return (
    <div className="container">
      <h1>Catalog</h1>
      <hr />
      <div className="row">
        {recipes.map(recipe => (
          <div key={recipe.recipeId} className="col-12 col-md-6 col-lg-4">
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
    <Link
      to={`/recipes?recipeId=${recipeId}`}
      className='recipe-link'
    >
      <img src={photoUrl} className='card-img-top' alt={name} />
      <div className='card-body'>
        <h5 className='card-title'>{name}</h5>
        <p className='card-text'>{description}</p>
      </div>
    </Link>
  );
}

export default RecipeFeed;
