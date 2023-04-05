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

export default RecipeFeed;
