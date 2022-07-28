import React from 'react';
import { BaseButton } from './Button.styled';
import { Props } from './Button.type';

export const Button = ({ text, onClick }: Props) => {
  return (
    <BaseButton data-testid="button" variant="contained" onClick={onClick}>
      {text}
    </BaseButton>
  );
};
