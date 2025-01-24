// src/pages/RecipeDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import recipesData from '../routes/recipes_en.json';

function RecipeDetail() {
  const { rcpSeq } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const allRecipes = recipesData.recipes || [];
    const found = allRecipes.find((r) => String(r.rcpSeq) === rcpSeq);
    if (found) setRecipe(found);
  }, [rcpSeq]);

  if (!recipe) {
    return (
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Recipe not found</h2>
      </div>
    );
  }

  // rcpSeq는 제외하고 랜더링하기 위해 구조 분해
  const { rcpSeq: _, ...rest } = recipe;

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">{rest.rcpNm}</h2>

      {/* 나머지 정보를 순서대로 표시 (간단하게 key-value 형태) */}
      <ul className="space-y-2">
        {Object.entries(rest).map(([key, value]) => {
          // manualSteps 배열일 경우 따로 처리
          if (key === 'manualSteps') {
            return (
              <li key={key}>
                <strong>{key}:</strong>
                <ul className="list-disc ml-6">
                  {value.map((step) => (
                    <li key={step.stepIndex}>{step.content}</li>
                  ))}
                </ul>
              </li>
            );
          }

          return (
            <li key={key}>
              <strong>{key}:</strong> {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RecipeDetail;
