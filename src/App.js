// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import RecipeDetail from './pages/RecipeDetail';
import Header from './components/Header';

function App() {
  return (
    <div className="bg-white min-h-screen flex justify-center">
      {/* 최대 폭 50%, 모바일 기본 */}
      <div className="w-full md:w-1/2 px-2.5">
        {/* Header 영역 */}
        <Header />
        
        {/* 라우트 정의 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/recipe/:rcpSeq" element={<RecipeDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
