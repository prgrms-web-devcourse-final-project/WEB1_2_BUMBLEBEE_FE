import React from 'react';

interface ButtonInCardProps {
  name: string;
  onClickFunction?: React.MouseEventHandler<HTMLButtonElement>;
}

const ButtonInCard = ({ name, onClickFunction }: ButtonInCardProps) => {
  return (
    <button
      type='button'
      className='card-button'
      onClick={onClickFunction}
    >
      {name}
    </button>
  );
};

export default ButtonInCard;
