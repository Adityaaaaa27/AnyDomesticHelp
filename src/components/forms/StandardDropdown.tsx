import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  SafeAreaView,
} from 'react-native';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import spacing from '../../constants/spacing';
import ValidationErrorText from './ValidationErrorText';

export interface DropdownOption {
  label: string;
  value: string;
}

interface StandardDropdownProps {
  label: string;
  options: DropdownOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  prefixIcon?: string;
}

const StandardDropdown: React.FC<StandardDropdownProps> = ({
  label,
  options,
  selectedValue,
  onValueChange,
  required = false,
  error,
  placeholder = 'Select option',
  prefixIcon = '⏰',
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const handleSelect = (val: string) => {
    onValueChange(val);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.asterisk}> *</Text>}
      </Text>

      <TouchableOpacity
        style={[styles.inputContainer, !!error && styles.errorBorder]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${selectedOption?.label || placeholder}`}
      >
        <View style={styles.leftRow}>
          {prefixIcon && <Text style={styles.icon}>{prefixIcon}</Text>}
          <Text
            style={[
              styles.valueText,
              !selectedValue && styles.placeholderText,
            ]}
          >
            {selectedOption?.label || placeholder}
          </Text>
        </View>
        <Text style={styles.chevron}>▼</Text>
      </TouchableOpacity>

      <ValidationErrorText error={error} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select {label}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeText}>Cancel</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    selectedValue === item.value && styles.selectedOptionItem,
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedValue === item.value && styles.selectedOptionText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
    justifyContent: 'space-between',
    height: spacing.inputHeight,
    borderRadius: spacing.inputBorderRadius,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: spacing.inputPaddingHorizontal,
  },
  errorBorder: {
    borderColor: colors.error,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: spacing.inputIconSize,
    marginRight: spacing.sm,
    color: colors.textTertiary,
  },
  valueText: {
    fontSize: typography.fontSize.body,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
  },
  placeholderText: {
    color: colors.textTertiary,
  },
  chevron: {
    fontSize: 10,
    color: colors.textTertiary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
    paddingBottom: spacing.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: typography.fontSize.h3,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  closeText: {
    color: colors.primary,
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.bold,
  },
  optionItem: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  selectedOptionItem: {
    backgroundColor: colors.primaryLight,
  },
  optionText: {
    fontSize: typography.fontSize.body,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  selectedOptionText: {
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
});

export default StandardDropdown;
