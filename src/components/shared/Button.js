import React from 'react';

const Button = ({ handleShow, buttonText }) => {
  return (
    <Button variant="contained" onClick={handleShow}>
      {buttonText}
    </Button>
  );
};

export default Button;
