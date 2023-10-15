import React, { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';

const SingleHeart = ({ x, y, size, onComplete }) => {
  const props = useSpring({
    from: { opacity: 1, transform: `translate3d(0px, 0px, 0) scale(1)` },
    to: { opacity: 0, transform: `translate3d(${x}px,${y - 50}px,0) scale(${size})` },
    config: { duration: 2000 },
    onRest: onComplete
  });

  return (
      <animated.span style={{...props, position: 'absolute', top: '50%', left: '50%', transformOrigin: 'center center', size:'100px'}}>
        ❤️
      </animated.span>
  );
};

const FloatingHeart = ({ onComplete }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const newHearts = Array(10).fill(0).map(() => ({
      size: Math.random() + 3,
      x: (Math.random() - 0.5) * 300,
      y: (Math.random() - 1) * 400,
    }));
    setHearts(newHearts);
  }, []);

  return (
      <div style={{ position: 'relative', width: '30px', height: '30px' }}>
        {hearts.map((heart, index) => (
            <SingleHeart
                key={index}
                x={heart.x}
                y={heart.y}
                size={heart.size}
                onComplete={onComplete}
            />
        ))}
      </div>
  );
};

export default FloatingHeart;
