import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Image } from 'expo-image';
import colors from '../../constants/colors';
import spacing from '../../constants/spacing';
import typography from '../../constants/typography';
import { useLanguage } from '../../context/LanguageContext';

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_GAP = 12;
const CARD_WIDTH = SCREEN_WIDTH - spacing.screenHorizontalPadding * 2;
const SNAP_INTERVAL = CARD_WIDTH + CARD_GAP;

interface SlideItem {
  id: string;
  tagEn: string;
  tagHi: string;
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  subtitleHi: string;
  badgeEn: string;
  badgeHi: string;
  bgColor: string;
  imageUrl: string;
  serviceKey?: string;
  serviceLabel?: string;
}

const SLIDES: SlideItem[] = [
  {
    id: '1',
    tagEn: '✨ VERIFIED MANPOWER',
    tagHi: '✨ सत्यापित घरेलू सहायक',
    titleEn: 'Find Trusted\nHome Helpers',
    titleHi: 'विश्वसनीय\nघरेलू सहायक खोजें',
    subtitleEn: 'Verified professionals for your peace of mind.',
    subtitleHi: 'आपकी मन की शांति के लिए सत्यापित पेशेवर।',
    badgeEn: '🛡️ 100% Background Checked',
    badgeHi: '🛡️ 100% बैकग्राउंड सत्यापित',
    bgColor: '#2E4733',
    imageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=85',
    serviceKey: 'HouseMaid',
    serviceLabel: 'House Maid',
  },
  {
    id: '2',
    tagEn: '🍳 TASTE & HYGIENE',
    tagHi: '🍳 स्वादिष्ट व पौष्टिक',
    titleEn: 'Expert Cooks\n& Home Chefs',
    titleHi: 'कुशल कुक व\nरसोइया सेवाएं',
    subtitleEn: 'Fresh, healthy meals customized to your taste.',
    subtitleHi: 'ताजा और स्वादिष्ट भोजन आपके स्वाद अनुसार।',
    badgeEn: '★ 4.9 Top Rated Cooks',
    badgeHi: '★ 4.9 टॉप रेटेड रसोइया',
    bgColor: '#253D2A',
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=85',
    serviceKey: 'Cook',
    serviceLabel: 'Cook',
  },
  {
    id: '3',
    tagEn: '👶 NURTURE & CARE',
    tagHi: '👶 स्नेह व पूरी देखभाल',
    titleEn: 'Loving Babysitters\n& Nannies',
    titleHi: 'अनुभवी नैनी व\nबेबी सिटर',
    subtitleEn: 'Trained, compassionate care for your little ones.',
    subtitleHi: 'आपके नन्हे बच्चों की समर्पित व सुरक्षित देखभाल।',
    badgeEn: '🤱 Certified Childcare',
    badgeHi: '🤱 प्रमाणित बाल देखभाल',
    bgColor: '#1E3524',
    imageUrl: 'https://www.anydomestichelp.com/images/3.jpeg',
    serviceKey: 'BabySitter',
    serviceLabel: 'Baby Sitter',
  },
  {
    id: '4',
    tagEn: '🚗 SAFETY & COMFORT',
    tagHi: '🚗 सुरक्षा व आराम',
    titleEn: 'Chauffeurs &\nDaily Drivers',
    titleHi: 'सत्यापित पर्सनल\nड्राइवर सेवाएं',
    subtitleEn: 'Punctual, licensed personal & commercial drivers.',
    subtitleHi: 'समय के पाबंद, लाइसेंसधारी व सुरक्षित चालक।',
    badgeEn: '⚡ Instant Assistance',
    badgeHi: '⚡ त्वरित सेवा उपलब्ध',
    bgColor: '#172B1B',
    imageUrl: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=600&q=85',
    serviceKey: 'Driver',
    serviceLabel: 'Driver',
  },
];

interface HeroCarouselProps {
  onSelectService: (key: string, label: string) => void;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ onSelectService }) => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-advance slider every 3.8s
  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [activeIndex]);

  const startAutoSlide = () => {
    stopAutoSlide();
    timerRef.current = setTimeout(() => {
      const nextIndex = (activeIndex + 1) % SLIDES.length;
      flatListRef.current?.scrollToOffset({
        offset: nextIndex * SNAP_INTERVAL,
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, 3800);
  };

  const stopAutoSlide = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / SNAP_INTERVAL
    );
    if (slideIndex >= 0 && slideIndex < SLIDES.length && slideIndex !== activeIndex) {
      setActiveIndex(slideIndex);
    }
  };

  const renderSlide = ({ item, index }: { item: SlideItem; index: number }) => {
    const isHi = language === 'hi';
    const tag = isHi ? item.tagHi : item.tagEn;
    const title = isHi ? item.titleHi : item.titleEn;
    const subtitle = isHi ? item.subtitleHi : item.subtitleEn;
    const badge = isHi ? item.badgeHi : item.badgeEn;
    const btnText = isHi ? 'बुक करें →' : 'Book Now →';
    const isLast = index === SLIDES.length - 1;

    return (
      <View
        style={[
          styles.card,
          {
            backgroundColor: item.bgColor,
            marginRight: isLast ? 0 : CARD_GAP,
          },
        ]}
      >
        {/* Background Image with Dark Gradient Tint */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.bgImage}
            contentFit="cover"
            cachePolicy="disk"
            transition={300}
          />
          <View style={[styles.imageOverlay, { backgroundColor: item.bgColor }]} />
        </View>

        {/* Content Column */}
        <View style={styles.contentContainer}>
          {/* Top Tag */}
          <Text style={styles.tagText}>{tag}</Text>

          {/* Main Title */}
          <Text style={styles.titleText}>{title}</Text>

          {/* Subtitle */}
          <Text style={styles.subtitleText}>{subtitle}</Text>

          {/* Bottom Row: Floating Badge + Action Button */}
          <View style={styles.bottomRow}>
            <View style={styles.badgePill}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>

            <TouchableOpacity
              style={styles.bookButton}
              activeOpacity={0.8}
              onPress={() => {
                if (item.serviceKey && item.serviceLabel) {
                  onSelectService(item.serviceKey, item.serviceLabel);
                }
              }}
            >
              <Text style={styles.bookButtonText}>{btnText}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Subtle Decorative Ambient Rings */}
        <View style={styles.ambientCircle1} />
        <View style={styles.ambientCircle2} />
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onTouchStart={stopAutoSlide}
        onTouchEnd={startAutoSlide}
        contentContainerStyle={styles.listContent}
        getItemLayout={(data, index) => ({
          length: SNAP_INTERVAL,
          offset: SNAP_INTERVAL * index,
          index,
        })}
      />

      {/* Pagination Indicator Dots */}
      <View style={styles.paginationContainer}>
        {SLIDES.map((_, index) => {
          const isActive = index === activeIndex;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                flatListRef.current?.scrollToOffset({
                  offset: index * SNAP_INTERVAL,
                  animated: true,
                });
                setActiveIndex(index);
              }}
              style={[
                styles.dot,
                isActive ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: spacing.sm,
  },
  listContent: {
    paddingHorizontal: spacing.screenHorizontalPadding,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 24,
    minHeight: 185,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  imageWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: CARD_WIDTH * 0.55,
    overflow: 'hidden',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    opacity: 0.45,
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 60,
    opacity: 0.95,
  },
  contentContainer: {
    padding: 20,
    zIndex: 2,
    flex: 1,
    justifyContent: 'space-between',
  },
  tagText: {
    fontSize: 11,
    fontWeight: typography.fontWeight.bold,
    color: colors.accent,
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  titleText: {
    fontFamily: typography.fontFamilyHeading,
    fontSize: 23,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
    lineHeight: 28,
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  subtitleText: {
    fontSize: 12.5,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 17,
    marginBottom: 14,
    maxWidth: CARD_WIDTH * 0.75,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  badgePill: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  badgeText: {
    fontSize: 11,
    color: colors.textWhite,
    fontWeight: typography.fontWeight.medium,
  },
  bookButton: {
    backgroundColor: colors.textWhite,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  bookButtonText: {
    fontSize: 12,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary,
  },
  ambientCircle1: {
    position: 'absolute',
    left: -40,
    top: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.03)',
    zIndex: 1,
  },
  ambientCircle2: {
    position: 'absolute',
    right: 40,
    bottom: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.03)',
    zIndex: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    gap: 6,
  },
  dot: {
    height: 5,
    borderRadius: 3,
  },
  activeDot: {
    width: 22,
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    width: 6,
    backgroundColor: 'rgba(51, 74, 54, 0.25)',
  },
});

export default HeroCarousel;
