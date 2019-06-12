import React from 'react';
import './Dog.css';

function Dog({ id, url, isSelected, isMatched, onDogSelect }) {
  const opacity = isSelected || isMatched ? 0.5 : 1;
  const outline = isSelected ? '2px solid blue' : null;
  const filter = isMatched ? 'blur(5px)' : null;

  return (
    <div className='dog'>
      <img
        src={url}
        height='200px'
        style={{ opacity, outline, filter }}
        onClick={() => onDogSelect(id)}
        onDragStart={e => e.preventDefault()}
      />
    </div>
  );
}

export default Dog;
