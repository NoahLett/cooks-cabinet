import React, { useState, useRef } from 'react';
import './NewRecipe.css';
import axios from 'axios';

export default function NewRecipe() {

  const errRef = useRef();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [steps, setSteps] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/new-recipe', {
        name,
        description,
        photoUrl,
        steps: steps.split(','),
        ingredients: ingredients.split(',')
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const recipe = response.data;
      // eslint-disable-next-line no-console
      console.log(recipe);
      setSuccess(true);
    } catch (error) {
      setErrMsg('Oops! Please make sure to sign in first!');
    }
  };

  return (
    <div className='new-recipe-container'>
      {success
        ? (
          <div className='new-recipe-section'>
            <h1 className='new-recipe-success'>Nice Recipe!</h1>
          </div>
          )
        : (
          <div className='new-recipe-section'>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
            <h1 className='new-recipe-header'>New Recipe</h1>
            <img className='new-recipe-image' src={photoUrl || '/images/food.png'} alt="food-img" />
            <form className='new-recipe-form' onSubmit={handleSubmit}>
              <label className='new-recipe-label' htmlFor="name">Recipe Name:</label>
              <input
                placeholder="Fried Chicken"
                className='new-recipe-input-field'
                type="text"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                required />
              <label className='new-recipe-label' htmlFor="photoUrl">Photo URL:</label>
              <input
                placeholder="https://food-picture.com/"
                className='new-recipe-input-field'
                type="text"
                id="photoUrl"
                value={photoUrl}
                onChange={e => setPhotoUrl(e.target.value)}
                required />
              <label className='new-recipe-label' htmlFor="description">Description:</label>
              <textarea
                className='new-recipe-textarea'
                placeholder="The best comfort food you'll ever make!"
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required />
              <label className='new-recipe-label' htmlFor="ingredients">Ingredients (comma separated):</label>
              <textarea
                placeholder="6 Chicken Thighs, 2 cups of bread crumbs, 3 eggs, ..."
                className='new-recipe-textarea'
                type="text"
                id="ingredients"
                value={ingredients}
                onChange={e => setIngredients(e.target.value)}
                required />
              <label className='new-recipe-label' htmlFor="steps">Steps (comma separated):</label>
              <textarea
                placeholder="1. Crack two eggs and whisk, 2. Evenly coat chicken thighs in the whisked eggs, 3. ..."
                className='new-recipe-textarea'
                type="text"
                id="steps"
                value={steps}
                onChange={e => setSteps(e.target.value)}
                required />
              <button className='new-recipe-submit' type="submit">Submit Recipe</button>
            </form>
          </div>
          )}
    </div>
  );
}
