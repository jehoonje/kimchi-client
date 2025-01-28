// src/pages/RecipeDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import recipesData from "../routes/recipes_en.json";

function RecipeDetail() {
  const { rcpSeq } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [mainImageError, setMainImageError] = useState(false);

  const keyMapping = {
    rcpNm: "Name",
    rcpWay2: "Cooking",
    rcpPat2: "Type",
    rcpPartsDtls: "Ingredients",
    rcpNaTip: "Tip",
  };

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

  // 이미지 필드 목록 (attFileNoMain 제외)
  const imageFields = ["attFileNoMk"];
  const excludedFields = ["attFileNoMain"]; // 완전히 제외할 필드

  // URL 유효성 검사 함수
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  // 이미지 렌더링 함수
  const renderImage = (field) => {
    if (rest[field] && isValidUrl(rest[field])) {
      const imageUrl = rest[field];
      console.log(`Rendering image from: ${imageUrl}`); // 디버깅을 위한 콘솔 로그

      return (
        <div key={field} className="flex justify-center my-4">
          <img
            src={imageUrl}
            alt={`${rest.rcpNm} - ${field}`}
            className="max-w-full p-12 h-auto rounded-lg"
            loading="eager"
            width={400} // 미리 크기 지정 (예제)
            height={400}
            onError={(e) => {
              console.error(`Failed to load image: ${imageUrl}`);
              setMainImageError(true);
              e.target.style.display = "none";
            }}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl text-center font-semibold mb-2">{rest.rcpNm}</h2>

      {/* attFileNoMain 이미지 렌더링 */}
      {renderImage("attFileNoMk")}

      {/* 나머지 정보를 순서대로 표시 (attFileNoMain 제외) */}
      <ul className="space-y-2 mb-[100px]">
        {Object.entries(rest).map(([key, value]) => {
          // 이미지 필드 및 제외 필드는 렌더링하지 않음
          if (imageFields.includes(key) || excludedFields.includes(key)) {
            return null;
          }

          const displayKey = keyMapping[key] || key;

          // manualSteps 배열일 경우 따로 처리
          if (key === "manualSteps") {
            return (
              <li key={key}>
                <strong>{displayKey}:</strong>
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
              <strong>{displayKey}:</strong> {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RecipeDetail;
