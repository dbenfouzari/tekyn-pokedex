import { StyleSheet, Text, View } from 'react-native';
import { env } from "./config/env";
import StorybookUIRoot from "./storybook";

function App() {
  return (
    <View style={styles.container}>
      <Text>Enabled ? {env.ENABLE_STORYBOOK}</Text>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const DefaultComponent = env.ENABLE_STORYBOOK ? StorybookUIRoot : App;
export default DefaultComponent;
