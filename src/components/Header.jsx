// src/components/Header.jsx

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';

// 아이콘 라이브러리 사용 (Heroicons)
import { MenuIcon, ChevronDownIcon } from '@heroicons/react/outline';

function Header() {
  const [openDrawer, setOpenDrawer] = useState(false);
  
  // Framer Motion의 애니메이션 컨트롤
  const headerControls = useAnimation();

  // Ref 설정
  const headerRef = useRef(null);
  const drawerRef = useRef(null);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  // 드로어가 열릴 때 헤더에 바운스 애니메이션 적용
  useEffect(() => {
    if (openDrawer) {
      headerControls.start({
        y: [0, -10, 0], // 위로 10px, 다시 원래 위치
        transition: {
          duration: 0.5,
          ease: 'easeInOut',
        },
      });
    }
  }, [openDrawer, headerControls]);

  // Drawer 애니메이션 Variants
  const drawerVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
      },
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.5,
      },
    },
  };

  // 드로어 외부 클릭 시 드로어 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openDrawer &&
        headerRef.current &&
        !headerRef.current.contains(event.target) &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target)
      ) {
        setOpenDrawer(false);
      }
    };

    // 클릭 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);

    // 클린업
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDrawer]);

  return (
    // 헤더를 motion.header로 감싸 애니메이션 제어
    <motion.header
      ref={headerRef}
      className="relative m-2.5 bg-pink-200 bg-opacity-50 p-2.5 flex justify-between items-center cursor-pointer"
      animate={headerControls}
      onClick={(e) => {
        // 헤더의 빈 공간을 클릭했을 때 드로어 닫기
        if (e.target === headerRef.current) {
          setOpenDrawer(false);
        }
      }}
    >
      {/* 왼쪽 햄버거 + 중앙 타이틀을 묶어서, openDrawer 시 투명도 변경 */}
      <motion.div
        className="flex items-center gap-2"
        animate={{ opacity: openDrawer ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* 왼쪽 햄버거 버튼 */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // 이벤트 전파 방지
            alert('Hamburger clicked!');
          }}
          className="p-1"
          aria-label="Open Menu"
        >
          <MenuIcon className="w-6 h-6 text-gray-600" />
        </button>

        {/* 가운데 헤더 타이틀 */}
        <h1 className="text-[#333] font-bold">Kimchi</h1>
      </motion.div>

      {/* 오른쪽 화살표 아이콘 (드로어 열기/닫기) */}
      <button 
        onClick={(e) => {
          e.stopPropagation(); // 이벤트 전파 방지
          toggleDrawer();
        }} 
        className="p-1" 
        aria-label="Toggle Drawer"
      >
        <ChevronDownIcon 
          className={`w-6 h-6 text-gray-600 transform transition-transform duration-300 ${openDrawer ? 'rotate-180' : 'rotate-0'}`} 
        />
      </button>

      {/* AnimatePresence를 사용하여 Drawer의 입장/퇴장 애니메이션 관리 */}
      <AnimatePresence>
        {openDrawer && (
          <motion.div
            ref={drawerRef}
            className="drawer-menu absolute left-0 top-full w-full text-center bg-pink-100 bg-opacity-90 shadow-md p-4 flex flex-col gap-2"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()} // 드로어 내부 클릭 시 이벤트 전파 방지
          >
            {/* 카테고리 링크들 */}
            <Link to="/category/Soup" className="hover:underline text-2xl my-2">
              Soup
            </Link>
            <Link to="/category/Noodle" className="hover:underline text-2xl my-2">
              Noodle
            </Link>
            <Link to="/category/Main" className="hover:underline text-2xl my-2">
              Main
            </Link>
            <Link to="/category/Banchan" className="hover:underline text-2xl my-2">
              Banchan
            </Link>
            <Link to="/category/Dessert" className="hover:underline text-2xl my-2">
              Dessert
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;
