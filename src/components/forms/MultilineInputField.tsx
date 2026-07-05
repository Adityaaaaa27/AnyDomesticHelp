import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';
import typography from '../../constants/typography';

interface Props {
  label: string;
  required?: boolean;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  maxLength?: number;
  minHeight?: number;
  error?: string;
  showCounter?: boolean;
}

export default function MultilineInputField({
  label, required, value, onChangeText,
  placeholder, maxLength = 500, minHeight = 100,
  error, showCounter = true,
}: Props) {
  const count = value.length;
  const nearLimit = count > maxLength * 0.9;

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.star}> ★</Text>}
      </Text>
      <TextInput
        style={[
          styles.input,
          { minHeight },
          error ? styles.inputError : null,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        multiline
        textAlignVertical="top"
        maxLength={maxLength}
        scrollEnabled={false}
      />
      <View style={styles.footer}>
        <Text style={styles.errorText}>{error ?? ''}</Text>
        {showCounter && (
          <Text style={[styles.counter, nearLimit && styles.counterWarn]}>
            {count} / {maxLength}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing.xs, paddingHorizontal: spacing.screenHorizontalPadding },
  label: { fontSize: typography.fontSize.label, color: colors.textPrimary, fontWeight: typography.fontWeight.semibold as any },
  star: { color: colors.error },
  input: {
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.sm,
    fontSize: typography.fontSize.body,
    color: colors.textPrimary,
    backgroundColor: colors.background,
  },
  inputError: { borderColor: colors.error },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: spacing.xs },
  errorText: { fontSize: typography.fontSize.caption, color: colors.error, flex: 1 },
  counter: { fontSize: typography.fontSize.caption, color: colors.textSecondary },
  counterWarn: { color: colors.error },
});
