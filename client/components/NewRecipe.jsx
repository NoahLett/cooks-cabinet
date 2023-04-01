import React, { useState } from 'react';
import axios from 'axios';

export default function NewRecipeForm() {
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
      const response = await axios.post('/api/new-recipe', {
        name,
        description,
        photoUrl,
        steps: steps.split(','),
        ingredients: ingredients.split(',')
      });

      const recipe = response.data;
      // eslint-disable-next-line no-console
      console.log(recipe);
      setSuccess(true);
    } catch (error) {
      setErrMsg(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {errMsg && <p className='error'>{errMsg}</p>}
        {success && <p className='success'>Recipe submitted successfully!</p>}
        <label htmlFor="name">Recipe Name:</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required />
        <label htmlFor="photoUrl">Photo URL:</label>
        <input type="text" id="photoUrl" value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} required />
        <label htmlFor="steps">Steps (comma separated):</label>
        <input type="text" id="steps" value={steps} onChange={e => setSteps(e.target.value)} required />
        <label htmlFor="ingredients">Ingredients (comma separated):</label>
        <input type="text" id="ingredients" value={ingredients} onChange={e => setIngredients(e.target.value)} required />
        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
}
