import {
  OnBoarding,
  Login,
  GameDetail,
  Profile,
  AuthConfirm,
  Training,
  BookMark,
  WebView,
} from 'src/containers';
import {ListFriend} from 'src/containers/Profile';
import {TrainingItem} from 'src/containers/Training';
import DrawerStack from '../scenes/DrawerStack';
import {navigationRoutes, navBarTitle} from './constants';
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
    name: navigationRoutes.ON_BOARDING,
    component: OnBoarding,
    options: {
      headerShown: false,
    },
  },
  {
    name: navigationRoutes.LOGIN,
    component: Login,
    options: {
      headerShown: false,
    },
  },
  {
    name: navigationRoutes.AUTH_CONFIRM,
    component: AuthConfirm,
    options: {...showOnlyBackButton},
  },
];

const privateRoutes = [
  {
    name: navigationRoutes.DRAWER_STACK,
    component: DrawerStack,
    options: ({route}) => ({
      title: route.params?.headerTitle || navBarTitle.DRAWER_STACK,
      headerShown: false,
    }),
  },
  {
    name: navigationRoutes.HOME_PAGE,
    component: TabNavigator,
    options: ({route}) => ({
      title: stringOverShowDot(
        route.params?.headerTitle || navBarTitle.HOME_PAGE,
      ),
      headerShown: false,
    }),
  },
  {
    name: navigationRoutes.PROFILE,
    component: Profile,
    options: ({route}) => ({
      title: stringOverShowDot(
        route.params?.headerTitle || navBarTitle.PROFILE,
      ),
    }),
  },
  {
    name: navigationRoutes.GAME_DETAIL,
    component: GameDetail,
    options: ({route}) => ({
      title: route.params?.headerTitle || navBarTitle.GAME_DETAIL,
      ...lightHeaderStyle,
    }),
  },
  {
    name: navigationRoutes.TRAINING,
    component: Training,
    options: ({route}) => ({
      title: route.params?.headerTitle || navBarTitle.TRAINING,
    }),
  },
  {
    name: navigationRoutes.LIST_FRIEND,
    component: ListFriend,
    options: ({route}) => ({
      title: route.params?.headerTitle || navBarTitle.LIST_FRIEND,
    }),
  },
  {
    name: navigationRoutes.TRAINING_ITEM,
    component: TrainingItem,
    options: ({route}) => ({
      title: route.params?.headerTitle || navBarTitle.TRAINING_ITEM,
      ...lightHeaderStyle,
    }),
  },
  {
    name: navigationRoutes.BOOK_MARK,
    component: BookMark,
    options: ({route}) => ({
      title: route.params?.headerTitle || navBarTitle.BOOK_MARK,
      ...lightHeaderStyle,
    }),
  },
  {
    name: navigationRoutes.WebView,
    component: WebView,
    options: ({route}) => ({
      title: route.params?.headerTitle || navBarTitle.WebView,
      ...lightHeaderStyle,
    }),
  },
];
export {publicRoutes, privateRoutes};
