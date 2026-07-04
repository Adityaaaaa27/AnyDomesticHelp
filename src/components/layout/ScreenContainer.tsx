/**
 * ScreenContainer — SafeAreaView + ScrollView wrapper.
 * Used as the root layout for every screen.
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  View,
} from 'react-native';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';

interface ScreenContainerProps {
  children: React.ReactNode;
  scrollEnabled?: boolean;
  keyboardAvoiding?: boolean;
  backgroundColor?: string;
  contentContainerStyle?: object;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scrollEnabled = true,
  keyboardAvoiding = false,
  backgroundColor = colors.background,
  contentContainerStyle,
}) => {
  const content = scrollEnabled ? (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.contentContainer, contentContainerStyle]}>
      {children}
    </View>
  );

  if (keyboardAvoiding) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {content}
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      {content}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: spacing.xxl,
  },
});

export default ScreenContainer;
