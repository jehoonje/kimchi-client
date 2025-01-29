import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { ChevronDownIcon } from "@heroicons/react/outline"; // 기존 import 주석 처리
import ChevronDownIcon from "@heroicons/react/outline/ChevronDownIcon"; // 아이콘 필요한 곳에서만 import
// import gsap from "gsap"; // 주석 처리 (원본 코드 보존용)
import "./HamburgerMenu.scss";

function Header() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isDrawerExisted, setIsDrawerExisted] = useState(false);
  const [pendingPath, setPendingPath] = useState(null); // 드로어 닫힘 후 이동할 경로
  const navigate = useNavigate();
  const location = useLocation();

  // /recipe/ 로 시작하면 true
  const isRecipeDetail = location.pathname.startsWith("/recipe/");

  // === 레퍼런스 ===
  const headerRef = useRef(null); // 헤더 전체
  const drawerRef = useRef(null); // 드로어 컨테이너
  const leftBlockRef = useRef(null); // 왼쪽(햄버거+타이틀) 블록

  // ===============================
  // [추가] GSAP를 동적 로드하기 위한 Ref
  // ===============================
  const gsapRef = useRef(null);

  // ===============================
  // [추가] 마운트 시점에 GSAP 비동기 로드
  // ===============================
  useEffect(() => {
    import("gsap").then((mod) => {
      gsapRef.current = mod.default;
    });
  }, []);

  // (1) 페이지 전환 시 GSAP 페이드 아웃
  // ======================================
  // 원본 함수에서는 gsap.to()를 사용했지만,
  // 지금은 gsapRef.current를 통해 동적 로드된 gsap 사용
  // ======================================
  const doFadeOut = (path) => {
    // gsap.to(".page-container", {
    //   duration: 0.5,
    //   opacity: 0,
    //   onComplete: () => navigate(path),
    // });
    if (gsapRef.current) {
      gsapRef.current.to(".page-container", {
        duration: 0.5,
        opacity: 0,
        onComplete: () => navigate(path),
      });
    } else {
      // 만약 아직 gsap가 로드되지 않았다면 즉시 페이지 이동
      navigate(path);
    }
  };

  // (2) 헤더 바운스 애니메이션: y: [0, -10, 0]
  const bounceHeader = () => {
    // gsap.fromTo(
    //   headerRef.current,
    //   { y: 0 },
    //   {
    //     keyframes: { y: [0, -10, 0] },
    //     duration: 0.8,
    //     ease: "power1.inOut",
    //   }
    // );

    if (!gsapRef.current) return;
    gsapRef.current.fromTo(
      headerRef.current,
      { y: 0 },
      {
        keyframes: { y: [0, -10, 0] },
        duration: 0.8,
        ease: "power1.inOut",
      }
    );
  };

  // (3) 드로어 열기/닫기 토글
  const toggleDrawer = () => {
    // 헤더 바운스
    bounceHeader();

    if (!openDrawer) {
      setIsDrawerExisted(true); // DOM 마운트
    }
    setOpenDrawer((prev) => !prev);
  };

  // (4) 페이지 이동을 트리거하는 함수
  const handleNavigation = (path) => {
    // 드로어가 열려 있다면 => 먼저 닫고, 닫히면 페이드 아웃
    if (openDrawer) {
      setPendingPath(path);
      setOpenDrawer(false);
    } else {
      // 이미 닫혀 있으면 바로 페이드 아웃
      doFadeOut(path);
    }
  };

  // === 드로어 열림/닫힘 애니메이션: openDrawer state가 바뀔 때마다 실행 ===
  useEffect(() => {
    if (!drawerRef.current) return;

    if (openDrawer) {
      // (a) 열기: scaleY 0 -> 1
      // gsap.fromTo(
      //   drawerRef.current,
      //   { scaleY: 0 },
      //   {
      //     scaleY: 1,
      //     transformOrigin: "top",
      //     duration: 0.5,
      //     ease: "power2.inOut",
      //   }
      // );
      if (gsapRef.current) {
        gsapRef.current.fromTo(
          drawerRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            duration: 0.5,
            ease: "power2.inOut",
          }
        );
      }
    } else {
      // (b) 닫기: scaleY 1 -> 0
      // gsap.to(drawerRef.current, {
      //   scaleY: 0,
      //   transformOrigin: "top",
      //   duration: 0.5,
      //   ease: "power2.inOut",
      //   onComplete: () => {
      //     setIsDrawerExisted(false); // DOM 언마운트
      //     if (pendingPath) {
      //       // 이 시점에서 페이지 전환 페이드 아웃
      //       doFadeOut(pendingPath);
      //       setPendingPath(null);
      //     }
      //   },
      // });

      if (gsapRef.current) {
        gsapRef.current.to(drawerRef.current, {
          scaleY: 0,
          transformOrigin: "top",
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            setIsDrawerExisted(false); // DOM 언마운트
            if (pendingPath) {
              // 이 시점에서 페이지 전환 페이드 아웃
              doFadeOut(pendingPath);
              setPendingPath(null);
            }
          },
        });
      } else {
        // 만약 gsap가 아직 로드 안 됐다면 즉시 DOM 언마운트 처리
        setIsDrawerExisted(false);
        if (pendingPath) {
          doFadeOut(pendingPath);
          setPendingPath(null);
        }
      }
    }
  }, [openDrawer, pendingPath]);

  // === 왼쪽(햄버거+타이틀) 영역의 opacity도 Framer Motion 대신 간단히 style로 ===
  const leftBlockStyle = {
    opacity: openDrawer ? 0 : 1,
    transition: "opacity 0.3s",
  };

  // === border-radius도 기존처럼 애니메이션 (CSS transition) ===
  const headerBorderRadius = isDrawerExisted ? "0.5rem 0.5rem 0 0" : "0.5rem";

  return (
    <header
      ref={headerRef}
      className="relative z-[9999] mt-4 bg-pink-200 bg-opacity-45 p-2.5 flex justify-between items-center w-full cursor-pointer"
      style={{
        borderRadius: headerBorderRadius,
        transition: "border-radius 1s ease-in-out",
      }}
      onClick={toggleDrawer}
    >
      {/* 왼쪽 (햄버거 + 타이틀) */}
      <div ref={leftBlockRef} className="flex items-center gap-2" style={leftBlockStyle}>
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
          <input type="checkbox" className="input" checked={isRecipeDetail} readOnly />
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
      </div>

      {/* 오른쪽 버튼(드로어 토글) */}
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

      {/* 드로어: openDrawer일 때만 DOM 렌더링 */}
      {isDrawerExisted && (
        <div
          ref={drawerRef}
          className="drawer-menu absolute left-0 top-full w-full text-center bg-pink-100 bg-opacity-90 shadow-md p-4 flex flex-col gap-2 origin-top overflow-hidden"
          style={{
            // 초기 상태 (mount 시 바로 scaleY 애니메이션 시작)
            scaleY: 0,
            transformOrigin: "top",
          }}
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
        </div>
      )}
    </header>
  );
}

export default Header;
