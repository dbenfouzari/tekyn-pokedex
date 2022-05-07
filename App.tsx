import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { env } from "./config/env";
import StorybookUIRoot from "./storybook";
import {LinearGradient} from "expo-linear-gradient";
import Pokeball from "./src/vectors/pokeball.svg";
import Random from "./src/vectors/random.svg";
import {useController, useForm} from "react-hook-form";
import {
  Button
} from "./src/components/button/button";

function App() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      search: '',
    }
  });
  const { field: searchField } = useController({ name: 'search', control, defaultValue: '' });

  return (
    <LinearGradient colors={['#F4A261', '#141A2B']} style={{ flex: 1, width: '100%' }}>
      <View style={styles.container}>
          <View style={styles.card}>
            <Pokeball width={75} height={75} style={styles.pokeball} />

            <Text>Pokemon name or ID</Text>
            <TextInput style={styles.input} accessibilityLabel="Name or ID" value={searchField.value} onChangeText={searchField.onChange} />

            <View style={{ flexDirection: 'row', marginTop: 24 }}>
              <Button style={styles.submit} onPress={handleSubmit(v => console.log(v))}>Search !</Button>
              <Button onPress={() => {}}>
                <Random />
              </Button>
            </View>
          </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    paddingHorizontal: 48,
    paddingVertical: 48,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#dedede',
    borderRadius: 4,
    marginTop: 8,
    height: 56,
    fontSize: 24,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submit: {
    marginRight: 48,
  },
  pokeball: {
    alignSelf: 'center',
    marginBottom: 24,
  },
});

const DefaultComponent = env.ENABLE_STORYBOOK ? StorybookUIRoot : App;
export default App;
