import React, {useState, useMemo, useEffect} from 'react';

// NAVIGATION
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

// SERVICES
import api from '../services/api';
import {AuthContext} from '../services/context';

// UTILS
import {deleteData, getData} from '../utils/AsyncStorage';

// ICONS
import Ionicons from 'react-native-vector-icons/Ionicons';

// STYLES
import * as Colors from '../styles/colors';

// PAGES
import AppLoading from '../pages/AppLoading';

import HomeScreen from '../pages/Home';
import AccountScreen from '../pages/Account';
import CartScreen from '../pages/Cart';
import DrawerScreen from '../pages/Drawer';
import LogInScreen from '../pages/LogIn';
import SignUpScreen from '../pages/SignUp';

const Routes = () => {
  // STATES
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [isSignOut, setIsSignOut] = useState(false);

  const Stack = createNativeStackNavigator();
  const Tab = createMaterialBottomTabNavigator();

  const authContext = useMemo(() => {
    return {
      signIn: async () => {
        const token = await getData('token');
        // if (token) {
        //   api.defaults.headers.Authorization = `Bearer ${token.token}`;
        // }
        setIsSignOut(false);
        setIsLoading(false);
        setUserToken(token);
      },
      signUp: () => {
        setIsSignOut(false);
        setIsLoading(false);
        setUserToken('adas');
      },
      signOut: async () => {
        setIsSignOut(true);
        setIsLoading(false);
        await deleteData('token');
        setUserToken(null);
      },
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const stateVerify = async () => {
        const token = await getData('token');
        if (token) {
          // api.defaults.headers.Authorization = `Bearer ${token.token}`;
          setUserToken(token);
        } else {
          setUserToken(null);
        }
        setIsLoading(false);
      };

      stateVerify();
    }, 1000);
  }, []);

  const AuthNav = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LogIn" component={LogInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );

  const TabNav = () => {
    return (
      <Tab.Navigator
        labeled={false}
        activeColor={Colors.BLUE_500}
        inactiveColor={Colors.BLUE_200}
        barStyle={{backgroundColor: Colors.BLUE_100}}
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Account') {
              iconName = focused ? 'ios-person' : 'ios-person-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'ios-cart' : 'ios-cart-outline';
            } else if (route.name === 'Drawer') {
              iconName = focused
                ? 'ios-ellipsis-horizontal'
                : 'ios-ellipsis-horizontal-outline';
            }

            return <Ionicons name={iconName} size={24} color={color} />;
          },
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarBadge: 2,
          }}
        />
        <Tab.Screen name="Drawer" component={DrawerScreen} />
      </Tab.Navigator>
    );
  };

  const Root = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {userToken ? (
        <Stack.Screen name="App" component={TabNav} />
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthNav}
          options={{
            animationTypeForReplace: isSignOut ? 'pop' : 'push',
          }}
        />
      )}
    </Stack.Navigator>
  );

  if (isLoading) {
    return <AppLoading />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Routes;
