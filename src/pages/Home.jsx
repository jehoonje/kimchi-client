// src/pages/Home.jsx
import React from "react";
import styles from "../styles/ConicDemo.module.scss";
import "../styles/SearchBar.scss";
// SCSS 모듈 import (전역 x, 로컬 스코프)

function Home() {
  return (
    <div className={styles["conic-container"]}>
      {/* 원본 Jade: header → 여기서는 div.conic-header 로 */}
      <div className={styles["conic-header"]}>
        <h1 className={styles["conic-title"]}>
          Explore and enjoy the taste of Korean food.
        </h1>
        <em className={styles["conic-subtitle"]}>What’s on Your Plate?</em>
        {/* 검색 UI */}
        <div className="search-wrapper">
          {/* 검색 버튼 (토글) */}
          <input id="search-btn" type="checkbox" />

          {/* 돋보기 아이콘 (라벨) */}
          <label htmlFor="search-btn">
            <span className="visually-hidden">Toggle Search</span>
          </label>

          {/* 검색 입력창 */}
          <input id="search-bar" type="text" placeholder="Search..." />
        </div>
      </div>
    </div>
  );
}

export default Home;
