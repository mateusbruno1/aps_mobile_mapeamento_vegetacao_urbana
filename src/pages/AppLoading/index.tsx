import React from 'react';
import {View, ActivityIndicator} from 'react-native';

// STYLES
import * as Colors from '../../styles/colors';

const AppLoading: React.FC = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator color={Colors.BLUE_500} size="large" />
    </View>
  );
};

export default AppLoading;
