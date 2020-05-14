import { useEffect, useState, useCallback } from "react";

export const useRightLeftKeys = (resources: any[]) => {
  const [current, setCurrent] = useState<number>(0);

  const left = useCallback(() => {
    if (current > 0) {
      setCurrent((prevState) => prevState - 1);
    }
  }, [current]);

  const right = useCallback(() => {
    if (current < resources.length - 1) {
      setCurrent((prevState) => prevState + 1);
    }
  }, [current, resources.length]);

  const handleLeftClick = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        left();
      }
    },
    [left]
  );

  const handleRightClick = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        right();
      }
    },
    [right]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleLeftClick);
    window.addEventListener("keydown", handleRightClick);

    return () => {
      window.removeEventListener("keydown", handleLeftClick);
      window.removeEventListener("keydown", handleRightClick);
    };
  }, [
    current,
    handleLeftClick,
    handleRightClick,
    left,
    resources.length,
    right,
  ]);

  return { left, right, current };
};
