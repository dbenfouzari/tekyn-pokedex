import {render} from "@testing-library/react-native";
import HomeScreen from "./home";

describe('Home page', () => {
  it('should', () => {
    const navigate = jest.fn();
    const {} = render(<HomeScreen navigation={{ navigate } as any} route={{} as any} />);
  })
})