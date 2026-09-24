import React, { useRef, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';
import typography from '../../constants/typography';

// ─── Safe native module check ───────────────────────────────────────────────
// expo-av requires native code that is NOT available in Expo Go (SDK 50+).
// In the real built app (APK / Play Store) it works perfectly.
// When running in Expo Go this flag is false and we show a styled placeholder.
let VideoComponent: any = null;
let ResizeModeContain: any = 'contain';
let nativeVideoAvailable = false;

try {
  const ExpoAV = require('expo-av');
  VideoComponent = ExpoAV.Video;
  ResizeModeContain = ExpoAV.ResizeMode?.CONTAIN ?? 'contain';
  nativeVideoAvailable = true;
} catch {
  nativeVideoAvailable = false;
}

// Bundled local video (loaded only when native module is available)
const INTRO_VIDEO_SOURCE = nativeVideoAvailable
  ? require('../../assets/videos/intro_video.mp4')
  : null;
// ─────────────────────────────────────────────────────────────────────────────

interface AppVideoPlayerProps {
  autoPlay?: boolean;
  loop?: boolean;
  aspectRatio?: number;
  borderRadius?: number;
  style?: object;
  showTitleHeader?: boolean;
  title?: string;
  subtitle?: string;
  onClose?: () => void;
}

/** Shown in Expo Go (no native video support) */
const VideoPlaceholder: React.FC<{ aspectRatio: number; borderRadius: number; onClose?: () => void; showTitleHeader: boolean; title: string; subtitle: string }> = ({
  aspectRatio,
  borderRadius,
  onClose,
  showTitleHeader,
  title,
  subtitle,
}) => (
  <View>
    {showTitleHeader && (
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>OFFICIAL INTRO</Text>
          </View>
          <Text style={styles.titleText}>{title}</Text>
          {subtitle ? <Text style={styles.subtitleText}>{subtitle}</Text> : null}
        </View>
        {onClose && (
          <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
            <Text style={styles.closeBtnText}>✕ Close</Text>
          </TouchableOpacity>
        )}
      </View>
    )}
    <View style={[styles.playerContainer, { aspectRatio, borderRadius }, styles.placeholderContainer]}>
      <Text style={styles.placeholderIcon}>🎬</Text>
      <Text style={styles.placeholderTitle}>Video Available in App</Text>
      <Text style={styles.placeholderSubtitle}>
        This video plays in the installed app.{'\n'}Download from the Play Store to watch.
      </Text>
    </View>
  </View>
);

export const AppVideoPlayer: React.FC<AppVideoPlayerProps> = ({
  autoPlay = false,
  loop = false,
  aspectRatio = 16 / 9,
  borderRadius = 16,
  style,
  showTitleHeader = false,
  title = 'Who We Are & What We Provide',
  subtitle = 'Discover how Any Domestic Help connects households with verified help',
  onClose,
}) => {
  // ── Expo Go fallback ──────────────────────────────────────────────────────
  if (!nativeVideoAvailable) {
    return (
      <View style={[styles.outerContainer, style]}>
        <VideoPlaceholder
          aspectRatio={aspectRatio}
          borderRadius={borderRadius}
          onClose={onClose}
          showTitleHeader={showTitleHeader}
          title={title}
          subtitle={subtitle}
        />
      </View>
    );
  }
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <NativeVideoPlayer
      autoPlay={autoPlay}
      loop={loop}
      aspectRatio={aspectRatio}
      borderRadius={borderRadius}
      style={style}
      showTitleHeader={showTitleHeader}
      title={title}
      subtitle={subtitle}
      onClose={onClose}
    />
  );
};

/** Real native video player — only rendered when expo-av native module is available */
const NativeVideoPlayer: React.FC<AppVideoPlayerProps> = ({
  autoPlay = false,
  loop = false,
  aspectRatio = 16 / 9,
  borderRadius = 16,
  style,
  showTitleHeader = false,
  title = 'Who We Are & What We Provide',
  subtitle = 'Discover how Any Domestic Help connects households with verified help',
  onClose,
}) => {
  const videoRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handlePlaybackStatusUpdate = useCallback((status: any) => {
    if (status.isLoaded) {
      setIsLoading(false);
      setHasError(false);
    } else if (status.error) {
      setIsLoading(false);
      setHasError(true);
    }
  }, []);

  const handleClose = useCallback(async () => {
    try {
      await videoRef.current?.pauseAsync();
    } catch {
      // ignore
    }
    onClose?.();
  }, [onClose]);

  const VideoComp = VideoComponent;

  return (
    <View style={[styles.outerContainer, style]}>
      {showTitleHeader && (
        <View style={styles.headerRow}>
          <View style={styles.titleContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>OFFICIAL INTRO</Text>
            </View>
            <Text style={styles.titleText}>{title}</Text>
            {subtitle ? <Text style={styles.subtitleText}>{subtitle}</Text> : null}
          </View>
          {onClose && (
            <TouchableOpacity
              onPress={handleClose}
              style={styles.closeBtn}
              activeOpacity={0.7}
              accessibilityLabel="Close video"
            >
              <Text style={styles.closeBtnText}>✕ Close</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <View style={[styles.playerContainer, { aspectRatio, borderRadius }]}>
        <VideoComp
          ref={videoRef}
          source={INTRO_VIDEO_SOURCE}
          style={styles.videoView}
          resizeMode={ResizeModeContain}
          shouldPlay={autoPlay}
          isLooping={loop}
          useNativeControls={true}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />

        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Loading video...</Text>
          </View>
        )}

        {hasError && (
          <View style={styles.errorOverlay}>
            <Text style={styles.errorText}>Unable to load video. Please try again.</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    marginVertical: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
    paddingHorizontal: 4,
  },
  titleContainer: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
    letterSpacing: 0.5,
  },
  titleText: {
    fontSize: 16,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  subtitleText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  closeBtn: {
    backgroundColor: '#EAE6DB',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },
  closeBtnText: {
    fontSize: 12,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  playerContainer: {
    width: '100%',
    backgroundColor: '#000000',
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  placeholderContainer: {
    backgroundColor: colors.backgroundGrey,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  placeholderIcon: {
    fontSize: 36,
    marginBottom: 4,
  },
  placeholderTitle: {
    fontSize: 15,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  placeholderSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: spacing.md,
  },
  videoView: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(246, 244, 238, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  loadingText: {
    marginTop: spacing.xs,
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  errorOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(246, 244, 238, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
    zIndex: 2,
  },
  errorText: {
    fontSize: 13,
    color: colors.error,
    textAlign: 'center',
    fontWeight: typography.fontWeight.medium,
  },
});

export default AppVideoPlayer;
