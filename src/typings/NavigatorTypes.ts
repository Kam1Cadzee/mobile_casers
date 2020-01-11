import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

export type RootTabParam = {
  Main: {};
  List: {};
  Create: {
    id: string | null;
  };
};

type MainScreenNavigationProp = StackNavigationProp<RootTabParam, 'Main'>;
type MainScreenRouteProp = RouteProp<RootTabParam, 'Main'>;

export type MainScreenProp = {
  route: MainScreenRouteProp;
  navigation: MainScreenNavigationProp;
};

type ListScreenNavigationProp = StackNavigationProp<RootTabParam, 'List'>;
type ListScreenRouteProp = RouteProp<RootTabParam, 'List'>;

export type ListScreenProp = {
  route: ListScreenRouteProp;
  navigation: ListScreenNavigationProp;
};

type CreateScreenNavigationProp = StackNavigationProp<RootTabParam, 'Create'>;
type CreateScreenRouteProp = RouteProp<RootTabParam, 'Create'>;

export type CreateScreenProp = {
  route: CreateScreenRouteProp;
  navigation: CreateScreenNavigationProp;
};
