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
}
