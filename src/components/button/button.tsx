import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from "react-native";

export interface ButtonProps {
  children: TouchableOpacityProps['children'] | string;
  onPress: VoidFunction;
  style?: TouchableOpacityProps['style'];
}

export const Button = ({ children, onPress, style }: ButtonProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
    {typeof children === 'string' ? <Text style={styles.text}>{children}</Text> : children}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    borderRadius: 80,
    backgroundColor: '#F4A261',
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  }
})
