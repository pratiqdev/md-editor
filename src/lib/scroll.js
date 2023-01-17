import { useState, useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';

export function useScroll() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
    return position
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll, { passive: true });

  })

    // const [offset, setOffset] = useState(0);

    // useEffect(() => {
    //   window.onscroll = () => {
    //     setOffset(window.pageYOffset);
    //   };
    // }, []);

    // return offset
}



//*=========================================================================================================================

export const useScrollSync = (a,b) => {
  let pos = {a:0, b:0}

  return pos
}



//*=========================================================================================================================



export const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  // const [windowSize, setWindowSize] = useState({
  //   width: undefined,
  //   height: undefined,
  // });
  let windowSize = {
    width: undefined,
    height: undefined,
  }

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      // setWindowSize({
      //   width: window.innerWidth,
      //   height: window.innerHeight,
      // });
        windowSize.width= window.innerWidth
        windowSize.height= window.innerHeight
    }

    // Add event listener
    window.addEventListener("resize", handleResize);
    // window.addEventListener("resize", console.log('resize detected'));

    // Call handler right away so state gets updated with initial window size
    handleResize();


    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}
