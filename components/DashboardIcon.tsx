import React, { useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { type LaunchOrigin } from "react-native-pixel-launch";
import { type AppItem } from "../data/apps";

type Props = {
  app: AppItem;
  onPress: (origin: LaunchOrigin) => void;
};

export function DashboardIcon({ app, onPress }: Props) {
  const ref = useRef<View>(null);
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.88,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 300,
      friction: 10,
    }).start();
  };

  const handlePress = () => {
    ref.current?.measure((_x, _y, width, height, pageX, pageY) => {
      onPress({ x: pageX, y: pageY, width, height });
    });
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={styles.wrapper}
    >
      <Animated.View style={[styles.iconBox, { backgroundColor: app.color, transform: [{ scale }] }]} ref={ref as any}>
        <Text style={styles.emoji}>{app.icon}</Text>
      </Animated.View>
      <Text style={styles.label}>{app.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "33.33%",
    alignItems: "center",
    marginBottom: 28,
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  emoji: {
    fontSize: 30,
    color: "#FFFFFF",
  },
  label: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    letterSpacing: 0.3,
  },
});
