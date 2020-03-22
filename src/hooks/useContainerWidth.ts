import { RefObject, useLayoutEffect, useState } from "react";

export const useContainerWidth = (
  ref: RefObject<HTMLDivElement>
): { width: number; height: number } => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (ref.current) {
      setDimensions({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight
      });
    }
  }, [ref.current]);
  return dimensions;
};
