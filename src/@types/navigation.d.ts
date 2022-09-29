import { Game } from "../screens/home/Home";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      Game: { game: Game };
    }
  }
}
