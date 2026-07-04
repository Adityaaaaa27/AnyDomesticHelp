/**
 * ServiceEmojiButton — Emoji above label in a card.
 * Tappable for service selection on the home screen.
 */

import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import spacing from '../../constants/spacing';

interface ServiceEmojiButtonProps {
  emoji: string;
  label: string;
  bgColor?: string;
  onPress: () => void;
}

const ServiceEmojiButton: React.FC<ServiceEmojiButtonProps> = ({
  emoji,
  label,
  bgColor = colors.backgroundGrey,
  onPress,
}) => {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="button"
      accessibilityLabel={`Register for ${label} service`}
    >
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: bgColor, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.label} numberOfLines={2}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: spacing.serviceButtonSize,
    height: spacing.serviceButtonSize + 10,
    borderRadius: spacing.serviceButtonBorderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  emoji: {
    fontSize: spacing.serviceEmojiSize,
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: typography.fontSize.caption,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 14,
  },
});

export default ServiceEmojiButton;
