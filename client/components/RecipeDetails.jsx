import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RecipeDetails(props) {

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`/api/recipes/${props.recipeId}`)
      .then(res => res.json())
      .then(recipe => setRecipe({ recipe }));
  });

}
