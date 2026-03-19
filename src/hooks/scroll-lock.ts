import { useEffect, useRef } from "react";

const useScrollLock = (isLocked: boolean) => {
  const scrollYRef = useRef<number>(0);

  useEffect(() => {
    if (isLocked) {
      scrollYRef.current = window.scrollY;

      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      const targetScrollY = scrollYRef.current;

      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";

      window.scrollTo({ top: targetScrollY, behavior: "instant" as ScrollBehavior });
    }
  }, [isLocked]);
};

export default useScrollLock;