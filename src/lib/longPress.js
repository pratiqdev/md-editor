import { useState, useEffect } from 'react';

const useLongPress = (callback1 = () => {}, callback2 = () => {}, ms = 200) => {
  const [startLongPress, setStartLongPress] = useState(false);
  const [alreadyClick, setAlreadyClick] = useState(true)


  const handlePress = () => {
      setAlreadyClick(true)
      callback2()
  }

  useEffect(() => {
    setAlreadyClick(false)
    let timerId;
    if (startLongPress) {
      timerId = setTimeout(handlePress, ms);
    } else {
        clearTimeout(timerId);
        if(!alreadyClick){
            callback1()
        }
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [ ms, startLongPress]);

  return {
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false),
  };
}

export default useLongPress