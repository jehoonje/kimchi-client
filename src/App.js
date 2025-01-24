// src/App.js

import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import RecipeDetail from './pages/RecipeDetail';
import Header from './components/Header';
import gsap from 'gsap';

function App() {
  const location = useLocation();

  useEffect(() => {
    // 라우트 변경 시 page-container의 opacity를 1로 애니메이션
    gsap.fromTo(
      '.page-container',
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
  }, [location]);

  return (
    <div className="bg-white min-h-screen flex flex-col items-center">
      {/* 내부 컨테이너: 헤더와 페이지 콘텐츠를 동일한 너비로 설정 */}
      <div className="w-full md:w-1/2 px-2.5">
        {/* Header 영역 */}
        <Header />

        {/* 라우트 정의 */}
        <div className="page-container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/recipe/:rcpSeq" element={<RecipeDetail />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
