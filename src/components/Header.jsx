// src/components/Header.jsx

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MenuIcon, ChevronDownIcon } from "@heroicons/react/outline";
import gsap from "gsap";

function Header() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const headerControls = useAnimation();
  const navigate = useNavigate();

  // 드로어가 열릴 때 헤더에 바운스 애니메이션 적용
  useEffect(() => {
    if (openDrawer) {
      headerControls.start({
        y: [0, -10, 0], // 위로 10px, 다시 원래 위치
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      });
    }
  }, [openDrawer, headerControls]);

  // 드로어 애니메이션 Variants using scaleY
  const drawerVariants = {
    hidden: {
      scaleY: 0,
      opacity: 0,
      transformOrigin: "top",
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 15,
      },
    },
    visible: {
      scaleY: 1,
      opacity: 1,
      transformOrigin: "top",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.5,
      },
    },
    exit: {
      scaleY: 0,
      opacity: 0,
      transformOrigin: "top",
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 15,
      },
    },
  };

  // GSAP 애니메이션 후 페이지 이동 함수
  const handleNavigation = (path) => {
    // 드로어가 열려있으면 먼저 닫기
    if (openDrawer) {
      setOpenDrawer(false);
    }

    // GSAP 애니메이션 실행 (페이드 아웃)
    gsap.to(".page-container", {
      duration: 0.5,
      opacity: 0,
      onComplete: () => navigate(path),
    });
  };

  return (
    // 헤더 자체를 motion.header로 감싸서 애니메이션 제어
    <motion.header
      className={`relative mt-4 bg-pink-200 bg-opacity-50 p-2.5 flex justify-between items-center w-full cursor-pointer ${
        openDrawer ? "rounded-t-lg" : "rounded-lg"
      }`}
      animate={headerControls}
      onClick={() => {
        // 헤더 아무 곳이나 누르면 드로어 토글
        toggleDrawer();
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
            // 헤더 onClick이 실행되지 않도록 중단
            e.stopPropagation();
            // 클릭 시 드로어 무조건 닫기
            setOpenDrawer(false);
            alert("Hamburger clicked!");
          }}
          className="p-1"
          aria-label="Open Menu"
        >
          <MenuIcon className="w-6 h-6 text-gray-600" />
        </button>

        {/* 가운데 헤더 타이틀을 button으로 감싸 메인 페이지로 이동 */}
        <button
          className="text-[#333] font-bold text-xl"
          onClick={(e) => {
            e.stopPropagation(); // 헤더 onClick 방지
            handleNavigation("/"); // GSAP 애니메이션 후 이동
          }}
        >
          <span>Kimchi</span>
        </button>
      </motion.div>

      {/* 오른쪽 화살표 아이콘 (드로어 열기/닫기) */}
      <button
        onClick={(e) => {
          // 헤더 onClick이 실행되지 않도록 중단
          e.stopPropagation();
          // 클릭 시 드로어 무조건 닫기
          setOpenDrawer(false);
        }}
        className="p-1"
        aria-label="Toggle Drawer"
      >
        <ChevronDownIcon
          className={`w-6 h-6 text-gray-600 transform transition-transform duration-300 ${
            openDrawer ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {/* AnimatePresence를 사용하여 Drawer의 입장/퇴장 애니메이션 관리 */}
      <AnimatePresence>
        {openDrawer && (
          <motion.div
            className="drawer-menu absolute left-0 top-full w-full text-center bg-pink-100 bg-opacity-90 shadow-md p-4 flex flex-col gap-2 origin-top overflow-hidden"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => {
              // 드로어 내부 클릭 시 헤더 onClick 이벤트가 실행되지 않도록
              e.stopPropagation();
            }}
          >
            {/* 카테고리 버튼들 → 클릭하면 GSAP 애니메이션 후 이동 */}
            <button
              className="hover:underline text-2xl my-2 text-left"
              onClick={() => handleNavigation("/category/Soup")}
            >
              Soup
            </button>
            <button
              className="hover:underline text-2xl my-2 text-left"
              onClick={() => handleNavigation("/category/Noodle")}
            >
              Noodle
            </button>
            <button
              className="hover:underline text-2xl my-2 text-left"
              onClick={() => handleNavigation("/category/Main")}
            >
              Main
            </button>
            <button
              className="hover:underline text-2xl my-2 text-left"
              onClick={() => handleNavigation("/category/Banchan")}
            >
              Banchan
            </button>
            <button
              className="hover:underline text-2xl my-2 text-left"
              onClick={() => handleNavigation("/category/Dessert")}
            >
              Dessert
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );

  // 드로어 열고 닫는 토글 함수
  function toggleDrawer() {
    setOpenDrawer(!openDrawer);
  }
}

export default Header;
