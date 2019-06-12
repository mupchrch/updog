import React from 'react';
import './Dog.css';

function Dog({ id, url, isSelected, isMatched, onDogSelect }) {
  const style = {
    opacity: isSelected || isMatched ? 0.5 : 1,
    outline: isSelected ? '5px solid black' : null,
    filter: isMatched ? 'blur(5px)' : null,
    cursor: isMatched ? null : 'pointer',
    backgroundImage: `url(${url})`
  };

  return (
    <button
      disabled={isMatched}
      className='dog'
      style={style}
      onClick={() => onDogSelect(id)}
      onDragStart={e => e.preventDefault()}
    />
  );
}

export default Dog;
