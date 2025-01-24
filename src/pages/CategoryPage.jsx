// src/pages/CategoryPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// recipes_en.json을 우선 사용
import recipesData from '../routes/recipes_en.json';

function CategoryPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    // JSON 파일의 구조가 { "recipes": [ ... ] } 형태라고 가정
    const allRecipes = recipesData.recipes || [];

    // rcpSeq 중복 제거하기 위해 사용
    const visited = new Set();
    const results = [];

    // Category별 필터 로직
    allRecipes.forEach((recipe) => {
      const { rcpSeq, rcpNm, rcpPat2 } = recipe;
      // 이미 사용된 rcpSeq면 스킵
      if (visited.has(rcpSeq)) return;

      switch (categoryName) {
        case 'Soup':
          // rcpPat2가 "Soup and stew"인 경우
          if (rcpPat2 && rcpPat2.toLowerCase().includes('soup and stew')) {
            results.push(recipe);
            visited.add(rcpSeq);
          }
          break;
        case 'Noodle':
          // rcpNm에 "noodles" 단어가 포함되어 있는지
          if (rcpNm && rcpNm.toLowerCase().includes('noodles')) {
            results.push(recipe);
            visited.add(rcpSeq);
          }
          break;
        case 'Main':
          // rcpPat2에 "a masterpiece" 단어가 포함되어 있는지
          if (rcpPat2 && rcpPat2.toLowerCase().includes('a masterpiece')) {
            results.push(recipe);
            visited.add(rcpSeq);
          }
          break;
        case 'Banchan':
          // rcpPat2가 "side dish" 단어가 포함되어 있는지
          if (rcpPat2 && rcpPat2.toLowerCase().includes('side dish')) {
            results.push(recipe);
            visited.add(rcpSeq);
          }
          break;
        case 'Dessert':
          // rcpPat2에 "Dessert" 단어가 포함되어 있는지
          if (rcpPat2 && rcpPat2.toLowerCase().includes('dessert')) {
            results.push(recipe);
            visited.add(rcpSeq);
          }
          break;
        default:
          break;
      }
    });

    setFilteredRecipes(results);
  }, [categoryName]);

  const goToDetail = (rcpSeq) => {
    navigate(`/recipe/${rcpSeq}`);
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4">
        {categoryName} Category
      </h2>

      {filteredRecipes.length === 0 ? (
        <p className="text-gray-500">No matching recipes.</p>
      ) : (
        filteredRecipes.map((recipe) => (
          <button
            key={recipe.rcpSeq}
            className="block w-full text-left px-4 py-2 mb-2 bg-pink-50 hover:bg-pink-100 rounded"
            onClick={() => goToDetail(recipe.rcpSeq)}
          >
            {recipe.rcpNm}
          </button>
        ))
      )}
    </div>
  );
}

export default CategoryPage;
