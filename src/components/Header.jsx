// src/components/Header.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// GSAP 예시 (필수 아님)
import { gsap } from 'gsap';

// 간단히 아이콘 대체 (실제로는 SVG나 아이콘 라이브러리 사용 권장)
const HamburgerIcon = () => (
  <div className="w-6 h-6 bg-gray-600" />
);
const ArrowIcon = () => (
  <div className="w-6 h-6 bg-gray-600 rotate-90" />
);

function Header() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
    // GSAP 예시 (간단 적용)
    gsap.fromTo('.drawer-menu', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 });
  };

  return (
    <header className="m-2.5 bg-pink-200 bg-opacity-50 p-2.5 flex justify-between items-center">
      {/* 왼쪽 햄버거 아이콘 */}
      <button onClick={() => alert('Hamburger clicked!')} className="p-1">
        <HamburgerIcon />
      </button>
      
      <h1 className="text-[#333] font-bold">Header</h1>
      
      {/* 오른쪽 화살표 아이콘 (드로어 열기) */}
      <button onClick={toggleDrawer} className="p-1">
        <ArrowIcon />
      </button>

      {/* Drawer 메뉴 (카테고리 목록) */}
      {openDrawer && (
        <motion.div
          className="drawer-menu absolute top-16 right-0 w-40 bg-pink-100 bg-opacity-90 shadow-md p-4 flex flex-col gap-2"
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          {/* 카테고리 링크들 */}
          <Link to="/category/Soup" className="hover:underline">
            Soup
          </Link>
          <Link to="/category/Noodle" className="hover:underline">
            Noodle
          </Link>
          <Link to="/category/Main" className="hover:underline">
            Main
          </Link>
          <Link to="/category/Banchan" className="hover:underline">
            Banchan
          </Link>
          <Link to="/category/Dessert" className="hover:underline">
            Dessert
          </Link>
        </motion.div>
      )}
    </header>
  );
}

export default Header;
