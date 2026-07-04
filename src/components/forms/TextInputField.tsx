import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import spacing from '../../constants/spacing';
import ValidationErrorText from './ValidationErrorText';

export interface TextInputFieldProps extends TextInputProps {
  label: string;
  required?: boolean;
  error?: string;
  prefixIcon?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  required = false,
  error,
  prefixIcon,
  containerStyle,
  style,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.asterisk}> *</Text>}
      </Text>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focusedBorder,
          !!error && styles.errorBorder,
        ]}
      >
        {prefixIcon && <Text style={styles.icon}>{prefixIcon}</Text>}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={colors.textTertiary}
          onFocus={handleFocus}
          onBlur={handleBlur}
          accessibilityLabel={label}
          {...rest}
        />
      </View>
      <ValidationErrorText error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.formFieldGap,
    paddingHorizontal: spacing.screenHorizontalPadding,
  },
  label: {
    fontSize: typography.fontSize.label,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  asterisk: {
    color: colors.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: spacing.inputHeight,
    borderRadius: spacing.inputBorderRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: spacing.inputPaddingHorizontal,
  },
  focusedBorder: {
    borderColor: colors.borderFocused,
  },
  errorBorder: {
    borderColor: colors.error,
  },
  icon: {
    fontSize: spacing.inputIconSize,
    marginRight: spacing.sm,
    color: colors.textTertiary,
  },
  input: {
    flex: 1,
    height: '100%',
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
    fontFamily: typography.fontFamily,
    paddingVertical: 0,
  },
});

export default TextInputField;
