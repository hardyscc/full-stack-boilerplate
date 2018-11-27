import React from 'react';
import { Button, ButtonProps } from 'rebass';

const ButtonRed: React.FunctionComponent<ButtonProps> = props => (
  <Button bg="red" {...props} />
);

export default ButtonRed;
