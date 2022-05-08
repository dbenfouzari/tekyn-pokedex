import {StyleSheet, ViewStyle} from "react-native";
import {POKEMON_TYPES_COLOR_MATRIX} from "../constants";
import {Button, ButtonProps} from "./button/button";

export interface PokemonTypeButtonProps extends ButtonProps {
  type: keyof typeof POKEMON_TYPES_COLOR_MATRIX;
}

export const PokemonTypeButton = ({ type, style, ...props }: PokemonTypeButtonProps) => (
  <Button style={[styles[type], style]} {...props} />
);

const styles = StyleSheet.create(Object.entries(POKEMON_TYPES_COLOR_MATRIX).reduce((acc, [name, color]) => {
  acc[name] = {
    backgroundColor: color,
    shadowColor: 'rgba(100, 100, 100, 0.3)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
  } as ViewStyle;

  return acc;
}, {}))