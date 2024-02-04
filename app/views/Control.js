import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function ControlScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Control Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}