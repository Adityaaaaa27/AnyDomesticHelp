/**
 * ContactInfoRow — Icon + label + tappable value.
 * Variants: phone, whatsapp, email, address.
 */

import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import spacing from '../../constants/spacing';
import { callPhone, openWhatsApp, sendEmail, openMaps } from '../../utils/deepLinks';

type ContactType = 'phone' | 'whatsapp' | 'email' | 'address';

interface ContactInfoRowProps {
  type: ContactType;
  label: string;
  value: string;
}

const ICONS: Record<ContactType, string> = {
  phone: '📞',
  whatsapp: '💬',
  email: '✉️',
  address: '📍',
};

const ContactInfoRow: React.FC<ContactInfoRowProps> = ({ type, label, value }) => {
  const handlePress = () => {
    switch (type) {
      case 'phone':
        callPhone(value);
        break;
      case 'whatsapp':
        openWhatsApp(value);
        break;
      case 'email':
        sendEmail(value);
        break;
      case 'address':
        openMaps(value);
        break;
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
      accessibilityRole="link"
      accessibilityLabel={`${label}: ${value}`}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{ICONS[type]}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.screenHorizontalPadding,
    marginHorizontal: spacing.screenHorizontalPadding,
    marginBottom: spacing.sm,
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.cardBorderRadius,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: spacing.minTouchTarget,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  icon: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: typography.fontSize.caption,
    color: colors.textTertiary,
    marginBottom: 2,
  },
  value: {
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  chevron: {
    fontSize: 20,
    color: colors.textTertiary,
    marginLeft: spacing.sm,
  },
});

export default ContactInfoRow;
