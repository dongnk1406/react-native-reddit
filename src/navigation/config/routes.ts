import {
  OnBoarding,
  Login,
  GameDetail,
  Profile,
  AuthConfirm,
  Training,
  BookMark,
  WebView,
} from '../../containers';
import {ListFriend} from 'src/containers/Profile';
import {TrainingItem} from 'src/containers/Training';
import DrawerStack from '../scenes/DrawerStack';
import {navigationStrings, navBarTitle} from './constants';
import {config} from 'app-config';
import TabNavigator from '../scenes/TabNavigator';
import {stringOverShowDot} from 'src/helper';

const showOnlyBackButton = {
  title: '',
  headerBackTitle: '',
  headerShadowVisible: false,
  headerTintColor: config.color.black,
};

const lightHeaderStyle = {
  headerBackTitle: '',
  headerTitleStyle: {},
  headerTitleAlign: 'center',
  headerTintColor: config.color.white,
  headerStyle: {
    backgroundColor: config.color.primary,
  },
};

const publicRoutes = [
  {
    name: navigationStrings.ON_BOARDING,
    component: OnBoarding,
    options: {
      headerShown: false,
    },
  },
  {
    name: navigationStrings.LOGIN,
    component: Login,
    options: {
      headerShown: false,
    },
  },
  {
    name: navigationStrings.AUTH_CONFIRM,
    component: AuthConfirm,
    options: {...showOnlyBackButton},
  },
];

const privateRoutes = [
  {
    name: navigationStrings.DRAWER_STACK,
    component: DrawerStack,
    options: ({route}) => ({
      title: route.params?.headerTitle || navBarTitle.DRAWER_STACK,
      headerShown: false,
    }),
  },
  {
    name: navigationStrings.HOME_PAGE,
    component: TabNavigator,
    options: ({route}) => ({
      title: stringOverShowDot(
        route.params?.headerTitle || navBarTitle.HOME_PAGE,
      ),
      headerShown: false,
    }),
  },
  {
    name: navigationStrings.PROFILE,
    component: Profile,
    options: ({route}) => ({
      title: stringOverShowDot(
        route.params?.headerTitle || navBarTitle.PROFILE,
      ),
    }),
  },
  {
    name: navigationStrings.GAME_DETAIL,
    component: GameDetail,
    options: ({route}) => ({
      title: route.params?.headerTitle || navBarTitle.GAME_DETAIL,
      ...lightHeaderStyle,
    }),
  },
  {
    name: navigationStrings.TRAINING,
    component: Training,
    options: ({route}) => ({
      title: route.params?.headerTitle || navBarTitle.TRAINING,
    }),
  },
  {
    name: navigationStrings.LIST_FRIEND,
    component: ListFriend,
    options: ({route}) => ({
      title: route.params?.headerTitle || navBarTitle.LIST_FRIEND,
    }),
  },
  {
    name: navigationStrings.TRAINING_ITEM,
    component: TrainingItem,
    options: ({route}) => ({
      title: route.params?.headerTitle || navBarTitle.TRAINING_ITEM,
      ...lightHeaderStyle,
    }),
  },
  {
    name: navigationStrings.BOOK_MARK,
    component: BookMark,
    options: ({route}) => ({
      title: route.params?.headerTitle || navBarTitle.BOOK_MARK,
      ...lightHeaderStyle,
    }),
  },
  {
    name: navigationStrings.WebView,
    component: WebView,
    options: ({route}) => ({
      title: route.params?.headerTitle || navBarTitle.WebView,
      ...lightHeaderStyle,
    }),
  },
];
export {publicRoutes, privateRoutes};
