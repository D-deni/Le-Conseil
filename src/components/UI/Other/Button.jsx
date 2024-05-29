import React from 'react';

const Button = ({styles, content}) => {
  return (
    <button type="submit" className={styles}>
      {content}
    </button>
  );
};

export default Button;