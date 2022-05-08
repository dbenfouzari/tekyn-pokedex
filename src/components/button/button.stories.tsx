import { Text } from "react-native";
import {storiesOf} from "@storybook/react-native";
import {Button} from "./button";

storiesOf('Button', module)
  .add('default', () => (
    <Button>Hello</Button>
  ))
  .add('with custom text children', () => (
    <Button><Text style={{ color: 'red' }}>Hello in red</Text></Button>
  ));