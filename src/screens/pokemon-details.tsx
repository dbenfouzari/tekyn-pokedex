import {Text, SafeAreaView, StyleSheet, Image, View, ScrollView} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../App";
import {useEffect, useState} from "react";
import {getPokemon, manualFetch} from "../api";
import {PokeAPI} from "../api/types";
import {Button} from "../components/button/button";
import {PokemonTypeButton} from "../components/pokemon-type-button";
import {POKEMON_TYPES_COLOR_MATRIX} from "../constants";

export interface PokemonDetailsPageProps extends NativeStackScreenProps<RootStackParamList, "PokemonDetails"> {}

const getFormattedName = (name?: string) => {
  if (!name) return '';
  return name.charAt(0).toUpperCase() + name.slice(1);
}

const getFormattedID = (id?: number) => {
  if (!id) return '';
  return id.toString().padStart(3, '0');
}

export const PokemonDetailsPage = ({ route, navigation }: PokemonDetailsPageProps) => {
  const { pokemonId } = route.params;

  const [pokemonDetails, setPokemonDetails] = useState<PokeAPI.Pokemon | undefined>(undefined);
  // Used to know Pokémon description
  const [pokemonSpecies, setPokemonSpecies] = useState<PokeAPI.PokemonSpecies | undefined>(undefined);
  // Didn't make it work because of API being so hard to learn.
  const [, setPokemonEvolutions] = useState<PokeAPI.ChainLink | undefined>(undefined);

  useEffect(() => {
    navigation.setOptions({
      title: `${getFormattedName(pokemonDetails?.name)} #${getFormattedID(pokemonDetails?.id)}`
    })
  }, [pokemonDetails])

  useEffect(() => {
    (async () => {
      const data = await getPokemon(pokemonId);
      setPokemonDetails(data);
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const speciesUrl = pokemonDetails?.species.url;
      if (speciesUrl) {
        const species = await manualFetch<PokeAPI.PokemonSpecies>(speciesUrl as string);
        const evolutionChain = await manualFetch<PokeAPI.ChainLink>(species.evolution_chain.url as string);
        setPokemonSpecies(species);
        setPokemonEvolutions(evolutionChain);
      }
    })()
  }, [pokemonDetails])

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          width={200}
          height={200}
          source={{ uri: pokemonDetails?.sprites.front_default }}
          style={styles.pokemonSprite}
        />

        <View style={styles.row}>
          {pokemonDetails?.types.map((pokemonType, index) => (
            <PokemonTypeButton
              key={pokemonType.type.name}
              type={pokemonType.type.name as keyof typeof POKEMON_TYPES_COLOR_MATRIX}
              style={index !== 0 && styles.typeButton}
            >
              {pokemonType.type.name}
            </PokemonTypeButton>
          ))}
        </View>

        <View>
          <View style={styles.row}>
            <Text>Weight</Text>
            <Text>{pokemonDetails?.weight}</Text>
          </View>

          <View style={styles.row}>
            <Text>Height</Text>
            <Text>{pokemonDetails?.height}</Text>
          </View>

          <View style={styles.row}>
            <Text>Abilities</Text>
            <Text>{pokemonDetails?.abilities.map(ability => ability.ability.name).join(', ')}</Text>
          </View>

          <View>
            <Text>Description</Text>
            <Text>{pokemonSpecies?.flavor_text_entries[0]?.flavor_text}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
  },
  pokemonSprite: {
    width: 200,
    height: 200,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeButton: {
    marginLeft: 16,
  },
})
