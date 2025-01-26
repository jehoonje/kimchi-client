// src/pages/CategoryPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import recipesData from '../routes/recipes_en.json';
import gsap from "gsap";

function CategoryPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    // JSON 파일의 구조가 단순 배열 [ { ... }, { ... }, ... ] 이라고 가정
    const allRecipes = recipesData || [];

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
          // rcpPat2에 "Soup and stew" 라는 단어가 포함되어 있으면 Soup 카테고리로 분류
          if (rcpPat2 && rcpPat2.toLowerCase().includes('soup and stew')) {
            results.push(recipe);
            visited.add(rcpSeq);
          }
          break;
        case 'Noodle':
          // rcpNm에 "noodles" 단어가 포함되어 있으면 Noodle 카테고리로 분류
          if (rcpNm && rcpNm.toLowerCase().includes('noodles')) {
            results.push(recipe);
            visited.add(rcpSeq);
          }
          break;
        case 'Main':
          // rcpPat2에 "a masterpiece" 라는 단어가 포함되어 있으면 Main 카테고리로 분류
          if (rcpPat2 && rcpPat2.toLowerCase().includes('a masterpiece')) {
            results.push(recipe);
            visited.add(rcpSeq);
          }
          break;
        case 'Banchan':
          // rcpPat2에 "side dish" 단어가 포함되어 있으면 Banchan 카테고리로 분류
          if (rcpPat2 && rcpPat2.toLowerCase().includes('side dish')) {
            results.push(recipe);
            visited.add(rcpSeq);
          }
          break;
        case 'Dessert':
          // rcpPat2에 "dessert" 단어가 포함되어 있으면 Dessert 카테고리로 분류
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

  const handleNavigation = (rcpSeq) => {
    gsap.to(".page-container", {
      duration: 0.5,
      opacity: 0,
      onComplete: () => navigate(`/recipe/${rcpSeq}`), // 경로를 올바르게 설정
    });
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
            onClick={() => handleNavigation(recipe.rcpSeq)}
          >
            {recipe.rcpNm}
          </button>
        ))
      )}
    </div>
  );
}

export default CategoryPage;
