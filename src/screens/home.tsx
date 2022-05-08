import {StyleSheet, Text, TextInput, View} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import Pokeball from "../vectors/pokeball.svg";
import Random from "../vectors/random.svg";
import {useController, useForm} from "react-hook-form";
import {Button} from "../components/button/button";
import {useCallback} from "react";
import {getPokemon} from "../api";
import {POKEMON_COUNT} from "../constants";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";

type FormData = {
  search: string | number;
}

export interface HomePageProps extends NativeStackScreenProps<RootStackParamList, "Home"> {}

function HomeScreen({ navigation }: HomePageProps) {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      search: '',
    }
  });
  const { field: searchField } = useController({ name: 'search', control, defaultValue: '' });

  const handleSearchSubmit = useCallback(async (formData: FormData) => {
    const { id } = await getPokemon(formData.search.toString().toLowerCase());

    if (id) {
      navigation.navigate('PokemonDetails', { pokemonId: id });
    }
  }, []);

  const handleRandomPress = useCallback(() => {
    // Get a random Pokémon ID between 1 and POKEMON_COUNT
    const pokemonId = Math.floor(Math.random() * POKEMON_COUNT + 1);
    return handleSearchSubmit({ search: pokemonId })
  }, [])

  return (
    <LinearGradient colors={['#F4A261', '#141A2B']} style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Pokeball width={75} height={75} style={styles.pokeball} />

          <Text>Pokemon name or ID</Text>
          <TextInput
            autoCorrect={false}
            style={styles.input}
            accessibilityLabel="Name or ID"
            value={String(searchField.value)}
            onChangeText={searchField.onChange}
            onSubmitEditing={handleSubmit(handleSearchSubmit)}
          />

          <View style={styles.buttons}>
            <Button style={styles.submit} onPress={handleSubmit(handleSearchSubmit)}>Search !</Button>
            <Button onPress={handleRandomPress}>
              <Random />
            </Button>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    marginTop: 24,
  },
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
  wrapper: {
    flex: 1,
    width: '100%',
  },
});

// const DefaultComponent = env.ENABLE_STORYBOOK ? StorybookUIRoot : HomeScreen;
export default HomeScreen;
