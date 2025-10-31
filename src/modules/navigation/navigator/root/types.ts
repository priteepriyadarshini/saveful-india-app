import { NavigatorScreenParams } from "@react-navigation/native";
import { MakeStackParamList } from "../../../make/navigation/MakeNavigation";
import { FeedStackParamList } from "../../../feed/navigation/FeedNavigation";

export type RootStackParamList = {
  //ExampleHome: undefined;
  //Developer: undefined;
  Feed: NavigatorScreenParams<FeedStackParamList>;
  Make: NavigatorScreenParams<MakeStackParamList>;
  Hack: undefined;
  Track: undefined;
};
