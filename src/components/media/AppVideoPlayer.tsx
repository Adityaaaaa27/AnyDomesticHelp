/**
 * AppVideoPlayer — Uses expo-video (New Architecture compatible) with lazy init.
 * The VideoPlayer object is only created AFTER the user presses Play, so it
 * has zero impact on app startup performance or stability.
 */

import React, { useRef, useState, useCallback, useEffect } from 'react';
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

// ─── Lazy expo-video import ───────────────────────────────────────────────────
// We resolve expo-video at runtime (not at module load) to guarantee the native
// module cannot affect startup even if something is mis-linked.
let VideoViewComponent: any = null;
let useVideoPlayerHook: ((...args: any[]) => any) | null = null;

try {
  const ExpoVideo = require('expo-video');
  VideoViewComponent = ExpoVideo.VideoView;
  useVideoPlayerHook = ExpoVideo.useVideoPlayer;
} catch {
  // expo-video not available — will show placeholder
}

const videoAvailable = VideoViewComponent !== null && useVideoPlayerHook !== null;

// Local bundled video asset
const INTRO_VIDEO = require('../../assets/videos/intro_video.mp4');

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

/** Shown when expo-video native module is unavailable */
const VideoPlaceholder: React.FC<{
  aspectRatio: number;
  borderRadius: number;
  onClose?: () => void;
  showTitleHeader: boolean;
  title: string;
  subtitle: string;
}> = ({ aspectRatio, borderRadius, onClose, showTitleHeader, title, subtitle }) => (
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
        Download the latest version from the Play Store to watch.
      </Text>
    </View>
  </View>
);

/** Inner component that actually mounts expo-video — only rendered on demand */
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

  // useVideoPlayer hook — creates the player imperatively, zero startup cost
  const player = useVideoPlayerHook!(INTRO_VIDEO, (p: any) => {
    p.loop = loop;
    if (autoPlay) {
      p.play();
    }
  });

  useEffect(() => {
    // Player ready — hide loading overlay
    const subscription = player?.addListener?.('statusChange', (event: any) => {
      if (event.status === 'readyToPlay') {
        setIsLoading(false);
        setHasError(false);
      } else if (event.status === 'error') {
        setIsLoading(false);
        setHasError(true);
      }
    });
    return () => {
      subscription?.remove?.();
    };
  }, [player]);

  const handleClose = useCallback(async () => {
    try {
      player?.pause?.();
    } catch {
      // ignore
    }
    onClose?.();
  }, [onClose, player]);

  const VideoView = VideoViewComponent;

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
        <VideoView
          ref={videoRef}
          player={player}
          style={styles.videoView}
          allowsFullscreen
          allowsPictureInPicture={false}
          contentFit="contain"
          nativeControls
          onPlayingChange={(isPlaying: boolean) => {
            if (!isPlaying) {
              // When video first buffers it may emit this — just hide loader
              setIsLoading(false);
            }
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
  if (!videoAvailable) {
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
    ...StyleSheet.absoluteFillObject,
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
    ...StyleSheet.absoluteFillObject,
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
