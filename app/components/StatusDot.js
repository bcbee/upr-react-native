import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";

import { colors } from "../theme";

// Status indicator dot. Waiting state pulses like the website's
// `uprpulse` keyframe (opacity 1 -> .35, scale 1 -> .7 over 1.4s).
export default function StatusDot({ connected }) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (connected) {
      pulse.stopAnimation();
      pulse.setValue(0);
      return;
    }
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [connected, pulse]);

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          backgroundColor: connected ? colors.green : colors.waitingDot,
          opacity: pulse.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.35],
          }),
          transform: [
            {
              scale: pulse.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.7],
              }),
            },
          ],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  dot: {
    width: 11,
    height: 11,
    borderRadius: 999,
  },
});
