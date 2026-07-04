import React from 'react';
import TextInputField, { TextInputFieldProps } from './TextInputField';

interface PhoneInputFieldProps extends Omit<TextInputFieldProps, 'keyboardType'> {}

const PhoneInputField: React.FC<PhoneInputFieldProps> = (props) => {
  return (
    <TextInputField
      keyboardType="phone-pad"
      maxLength={10}
      prefixIcon="📞"
      placeholder="+91 00000 00000"
      {...props}
    />
  );
};

export default PhoneInputField;
