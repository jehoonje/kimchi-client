import React, { useState } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/outline";
import gsap from "gsap";
import "./HamburgerMenu.scss";

function Header() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isDrawerExisted, setIsDrawerExisted] = useState(false);
  const headerControls = useAnimation();
  const navigate = useNavigate();
  const location = useLocation();

  // /recipe/ 로 시작하면 true
  const isRecipeDetail = location.pathname.startsWith("/recipe/");

  // 드로어 애니메이션 Variants
  const drawerVariants = {
    hidden: {
      scaleY: 0,
      opacity: 1,
      transformOrigin: "top",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    visible: {
      scaleY: 1,
      opacity: 1,
      transformOrigin: "top",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
    exit: {
      scaleY: 0,
      opacity: 1,
      transformOrigin: "top",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  // 페이지 이동 (GSAP 페이드 아웃)
  const handleNavigation = (path) => {
    if (openDrawer) {
      setOpenDrawer(false);
    }
    gsap.to(".page-container", {
      duration: 0.5,
      opacity: 0,
      onComplete: () => navigate(path),
    });
  };

  // **드로어 토글 + 헤더 바운스 유지** 함수
  function toggleDrawer() {
    // 헤더 바운스 애니메이션 (열 때도, 닫을 때도 유지)
    headerControls.start({
      y: [0, -10, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    });

    if (!openDrawer) {
      // 드로어 열릴 때
      setIsDrawerExisted(true);
    }

    setOpenDrawer((prev) => !prev);
  }

  return (
    <motion.header
      className="relative z-[9999] mt-4 bg-pink-200 bg-opacity-45 p-2.5 flex justify-between items-center w-full cursor-pointer"
      style={{
        borderRadius: isDrawerExisted ? "0.5rem 0.5rem 0 0" : "0.5rem", // border-radius 애니메이션 적용
        transition: "border-radius 1s ease-in-out", // border-radius만 애니메이션 적용
      }}
      animate={headerControls}
      onClick={toggleDrawer}
    >
      {/* 왼쪽 햄버거 + 중앙 타이틀 */}
      <motion.div
        className="flex items-center gap-2"
        animate={{ opacity: openDrawer ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* 햄버거 버튼 */}
        <label
          className="hamburger"
          onClick={(e) => {
            e.preventDefault(); // 체크박스 토글 막기
            e.stopPropagation(); // 헤더 onClick 막기
            if (isRecipeDetail) {
              navigate(-1);
            }
          }}
        >
          <input
            type="checkbox"
            className="input"
            checked={isRecipeDetail}
            readOnly
          />
          <svg
            className="hamburger-icon"
            width="28px"
            stroke="#000000"
            fill="transparent"
            height="20px"
            viewBox="0 0 28 20"
            version="1.1"
          >
            <path
              className="path1"
              d="M2,3 L26,3 C26.5517153,3 27,2.55171525 27,2 
                 C27,1.44828475 26.5517153,1 26,1 
                 L2,1 C1.44828475,1 1,1.44828475 1,2 
                 C1,2.55171525 1.44828475,3 2,3 Z"
              fillRule="nonzero"
            ></path>
            <path
              className="path2"
              d="M26,9 L2,9 C1.44828475,9 1,9.44828475 1,10 
                 C1,10.5517153 1.44828475,11 2,11 
                 L26,11 C26.5517153,11 27,10.5517153 27,10 
                 C27,9.44828475 26.5517153,9 26,9 
                 Z"
            ></path>
            <path
              className="path3"
              d="M26,17 L2,17 C1.44828475,17 1,17.4482847 1,18 
                 C1,18.5517153 1.44828475,19 2,19 
                 L26,19 C26.5517153,19 27,18.5517153 27,18 
                 C27,17.4482847 26.5517153,17 26,17 Z"
            ></path>
          </svg>
          <span className="hamburger-bg"></span>
        </label>

        {/* 중앙 타이틀 */}
        <button
          className="text-[#333] font-bold text-xl"
          onClick={(e) => {
            e.stopPropagation(); // 헤더 onClick 막기
            handleNavigation("/");
          }}
        >
          Random Korean Saturday
        </button>
      </motion.div>

      {/* 오른쪽 버튼 */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // 헤더 onClick 막기
          toggleDrawer();
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

      {/* 드로어 */}
      <AnimatePresence onExitComplete={() => setIsDrawerExisted(false)}>
        {openDrawer && (
          <motion.div
            className="drawer-menu absolute left-0 top-full w-full text-center bg-pink-100 bg-opacity-90 shadow-md p-4 flex flex-col gap-2 origin-top overflow-hidden"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="hover:underline text-2xl my-2 text-center"
              onClick={() => handleNavigation("/category/Soup")}
            >
              Soup
            </button>
            <button
              className="hover:underline text-2xl my-2 text-center"
              onClick={() => handleNavigation("/category/Noodle")}
            >
              Noodle
            </button>
            <button
              className="hover:underline text-2xl my-2 text-center"
              onClick={() => handleNavigation("/category/Main")}
            >
              Main
            </button>
            <button
              className="hover:underline text-2xl my-2 text-center"
              onClick={() => handleNavigation("/category/Banchan")}
            >
              Banchan
            </button>
            <button
              className="hover:underline text-2xl my-2 text-center"
              onClick={() => handleNavigation("/category/Dessert")}
            >
              Dessert
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;
