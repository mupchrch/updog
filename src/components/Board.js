import React from 'react';
import Dog from './Dog';
import './Board.css';

function Board({ dogs, ...props }) {
  return (
    <div className='board'>
      {
        dogs.map((dog) =>
          <Dog
            key={dog.id}
            id={dog.id}
            url={dog.url}
            isSelected={dog.isSelected}
            isMatched={dog.isMatched}
            {...props}
          />
        )
      }
    </div>
  );
}

export default Board;