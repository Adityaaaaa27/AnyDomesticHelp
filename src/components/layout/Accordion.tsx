/**
 * Accordion — Expandable Q&A item with animated collapse.
 */

import React, { useState, useRef } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import colors from '../../constants/colors';
import typography from '../../constants/typography';
import spacing from '../../constants/spacing';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionProps {
  question: string;
  answer: string;
  defaultExpanded?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  question,
  answer,
  defaultExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const rotateAnim = useRef(new Animated.Value(defaultExpanded ? 1 : 0)).current;

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.timing(rotateAnim, {
      toValue: expanded ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setExpanded(!expanded);
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.questionRow}
        onPress={toggleExpand}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`${question}. ${expanded ? 'Collapse' : 'Expand'}`}
        accessibilityState={{ expanded }}
      >
        <Text style={styles.questionText}>{question}</Text>
        <Animated.Text
          style={[styles.chevron, { transform: [{ rotate: rotation }] }]}
        >
          ▼
        </Animated.Text>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.screenHorizontalPadding,
    marginBottom: spacing.sm,
    backgroundColor: colors.cardBackground,
    borderRadius: spacing.accordionBorderRadius,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.accordionPadding,
    minHeight: spacing.minTouchTarget,
  },
  questionText: {
    flex: 1,
    fontSize: typography.fontSize.body,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    lineHeight: typography.lineHeight.body,
    paddingRight: spacing.sm,
  },
  chevron: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  answerContainer: {
    paddingHorizontal: spacing.accordionPadding,
    paddingBottom: spacing.accordionPadding,
    paddingTop: 0,
  },
  answerText: {
    fontSize: typography.fontSize.bodySmall,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.body,
  },
});

export default Accordion;
