import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/home";
import {PokemonDetailsPage} from "./src/screens/pokemon-details";
import {env} from "./config/env";
import StorybookUIRoot from "./storybook";

export type RootStackParamList = {
  Home: undefined;
  PokemonDetails: { pokemonId: number; };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{
          headerShown: false,
        }} />
        <Stack.Screen name="PokemonDetails" component={PokemonDetailsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const DefaultComponent = env.ENABLE_STORYBOOK ? StorybookUIRoot : App;
export default DefaultComponent;
