import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import ServiceImageCard from '../buttons/ServiceImageCard';
import spacing from '../../constants/spacing';
import colors from '../../constants/colors';

const { width } = Dimensions.get('window');
const CAROUSEL_WIDTH = width - spacing.screenHorizontalPadding * 2;

interface CarouselItem {
  key: string;
  label: string;
  imageUrl: string;
}

interface ImageCarouselProps {
  items: CarouselItem[];
  onItemPress: (key: string, label: string) => void;
  autoPlayInterval?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  items,
  onItemPress,
  autoPlayInterval = 3000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<CarouselItem>>(null);

  useEffect(() => {
    if (items.length === 0) return;

    const timer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % items.length;
      setActiveIndex(nextIndex);
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [activeIndex, items, autoPlayInterval]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / CAROUSEL_WIDTH);
    if (index >= 0 && index < items.length) {
      setActiveIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={items}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ServiceImageCard
              imageUrl={item.imageUrl}
              label={item.label}
              onPress={() => onItemPress(item.key, item.label)}
            />
          </View>
        )}
      />

      <View style={styles.pagination}>
        {items.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
    alignItems: 'center',
  },
  cardWrapper: {
    width: CAROUSEL_WIDTH,
    paddingHorizontal: spacing.xs,
  },
  pagination: {
    flexDirection: 'row',
    marginTop: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 20,
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    width: 8,
    backgroundColor: colors.border,
  },
});

export default ImageCarousel;
