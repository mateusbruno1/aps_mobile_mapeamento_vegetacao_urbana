/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {useColorScheme} from 'react-native';
import Routes from './src/routes';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return <Routes />;
};

export default App;
