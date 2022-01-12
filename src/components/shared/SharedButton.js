import React from 'react';

import Button from '@mui/material/Button';

const SharedButton = (props) => {
  return (
    <Button variant="contained" onClick={props.handleShow}>
      {props.buttonText}
    </Button>
  );
};

export default SharedButton;
