import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  SafeAreaView,
} from 'react-native';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import spacing from '../../constants/spacing';
import ValidationErrorText from './ValidationErrorText';

interface SearchableDropdownProps {
  label: string;
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  prefixIcon?: string;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  label,
  options,
  selectedValue,
  onValueChange,
  required = false,
  error,
  placeholder = 'Select or search city',
  prefixIcon = '📍',
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelect = (val: string) => {
    onValueChange(val);
    setModalVisible(false);
    setSearchText('');
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
        accessibilityLabel={`${label}: ${selectedValue || placeholder}`}
      >
        <View style={styles.leftRow}>
          {prefixIcon && <Text style={styles.icon}>{prefixIcon}</Text>}
          <Text
            style={[
              styles.valueText,
              !selectedValue && styles.placeholderText,
            ]}
          >
            {selectedValue || placeholder}
          </Text>
        </View>
        <Text style={styles.chevron}>▼</Text>
      </TouchableOpacity>

      <ValidationErrorText error={error} />

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select {label}</Text>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setSearchText('');
              }}
              style={styles.closeButton}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.searchBarContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor={colors.textTertiary}
              value={searchText}
              onChangeText={setSearchText}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <FlatList
            data={filteredOptions}
            keyExtractor={(item) => item}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.optionItem,
                  selectedValue === item && styles.selectedOptionItem,
                ]}
                onPress={() => handleSelect(item)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedValue === item && styles.selectedOptionText,
                  ]}
                >
                  {item}
                </Text>
                {selectedValue === item && <Text style={styles.checkIcon}>✓</Text>}
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No matching options found</Text>
            }
          />
        </SafeAreaView>
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
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
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
  closeButton: {
    padding: spacing.sm,
  },
  closeText: {
    color: colors.primary,
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.bold,
  },
  searchBarContainer: {
    padding: spacing.md,
    backgroundColor: colors.backgroundGrey,
  },
  searchInput: {
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    color: colors.textPrimary,
    fontSize: typography.fontSize.body,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  selectedOptionText: {
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  checkIcon: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: spacing.xl,
    color: colors.textTertiary,
    fontSize: typography.fontSize.body,
  },
});

export default SearchableDropdown;
