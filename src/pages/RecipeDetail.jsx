// src/pages/RecipeDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import recipesData from '../routes/recipes_en.json';

function RecipeDetail() {
  const { rcpSeq } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // JSON 파일이 배열 [ { ... }, { ... }, ... ] 형태라고 가정
    const allRecipes = recipesData || [];

    // rcpSeq가 일치하는 레시피 찾기
    const found = allRecipes.find((r) => String(r.rcpSeq) === rcpSeq);
    if (found) setRecipe(found);
  }, [rcpSeq]);

  // 레시피가 없으면 메시지 표시
  if (!recipe) {
    return (
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Recipe not found</h2>
      </div>
    );
  }

  // rcpSeq는 제외하고 나머지를 순서대로 렌더링
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
