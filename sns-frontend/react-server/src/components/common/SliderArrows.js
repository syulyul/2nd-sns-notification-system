import React from 'react';

const arrowStyle = {
  color: '#426b1f', // 텍스트 색상
  fontSize: '24px',
  cursor: 'pointer',
  padding: '8px 16px', // 버튼 패딩
};


const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
      <div className={className} onClick={onClick} style={arrowStyle}>
      </div>
  );
};

const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
      <div className={className} onClick={onClick} style={arrowStyle}>
      </div>
  );
};

export { PrevArrow, NextArrow };