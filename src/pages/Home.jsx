// src/pages/Home.jsx
import React, { useEffect, useRef } from "react";
import gsap, { Expo } from "gsap";
import styles from "../styles/ConicDemo.module.scss";
import "../styles/SearchBar.scss";

function Home() {
  const titleRef = useRef(null);

  useEffect(() => {
    // 페이지 진입 시 h1 텍스트가 50px 아래에서 시작하여 원래 위치로 이동하며 페이드인됨.
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 3, ease: Expo.easeOut }
    );
  }, []);

  return (
    <div className={styles["conic-container"]}>
      <div className={styles["conic-header"]}>
        <h1 className={styles["conic-title"]} ref={titleRef}>
          Explore and enjoy the taste of Korean food.
        </h1>
        <em className={styles["conic-subtitle"]}>What’s on Your Plate?</em>
        {/* 검색 UI */}
        <div className="search-wrapper">
          <input id="search-btn" type="checkbox" />
          <label htmlFor="search-btn">
            <span className="visually-hidden">Toggle Search</span>
          </label>
          <input id="search-bar" type="text" placeholder="Search..." />
        </div>
      </div>
    </div>
  );
}

export default Home;
