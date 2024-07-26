import React, { useState } from 'react';
import { getRecommendations } from '../services/api';

const Recommendations = () => {
  const [prompt, setPrompt] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const handleGenerate = async () => {
    const result = await getRecommendations(prompt);
    setRecommendation(result);
  };

  return (
    <div>
      <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      <button onClick={handleGenerate}>Get Recommendations</button>
      <p>{recommendation}</p>
    </div>
  );
};

export default Recommendations;
