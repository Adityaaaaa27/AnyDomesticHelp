import React from 'react';
import TextInputField, { TextInputFieldProps } from './TextInputField';

interface EmailInputFieldProps extends Omit<TextInputFieldProps, 'keyboardType' | 'autoCapitalize'> {}

const EmailInputField: React.FC<EmailInputFieldProps> = (props) => {
  return (
    <TextInputField
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
      prefixIcon="✉️"
      placeholder="example@domain.com"
      {...props}
    />
  );
};

export default EmailInputField;
