import React from "react";
import styles from "../styles/ConicDemo.module.scss";

function Home() {
  return (
    <div className={styles["conic-container"]}>
      <div className={styles["conic-header"]}>
        <h1 className={styles["conic-title"]}>
          Explore and enjoy the taste of Korean food.
        </h1>
        <em className={styles["conic-subtitle"]}>
          What’s on Your Plate?
        </em>

        {/* --- [검색 바 영역] --- */}
        <div className="relative inline-flex items-center space-x-2 mt-4">
          {/* 체크박스로 on/off 제어 */}
          <input
            type="checkbox"
            id="search-btn"
            className="absolute w-0 h-0 opacity-0 peer"
          />

          {/* 라벨(버튼): 체크되면 rotate(45deg) 되는 간단한 예시 */}
          <label
            htmlFor="search-btn"
            className="
              flex justify-center items-center
              w-12 h-12
              bg-purple-600 
              rounded-full 
              cursor-pointer 
              text-white 
              transform transition-transform duration-300 
              peer-checked:rotate-45
            "
          >
            {/* 돋보기 아이콘 (Heroicons 예시) */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 4a6 6 0 014.472 9.772l4.388 4.387a1 1 0 01-1.415 1.415l-4.388-4.387A6 6 0 1110 4z"
              />
            </svg>
          </label>

          {/* 검색창: 체크되면 width(또는 scale) 늘어나도록 간단 처리 */}
          <input
            type="text"
            placeholder="Search..."
            className="
              bg-gray-200 
              rounded-full 
              px-4 py-2 
              text-black
              focus:outline-none 
              transform transition-all duration-300 
              origin-left 
              scale-x-0 
              peer-checked:scale-x-100 
              peer-checked:w-48
            "
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
