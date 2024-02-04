import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from 'react-native';

export default function Instruction1({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Instruction 1 Screen</Text>
      <Button
        title="Next"
        onPress={() => navigation.navigate('Instruction2')}
      />
      <StatusBar style="auto" />
    </View>
  );
}