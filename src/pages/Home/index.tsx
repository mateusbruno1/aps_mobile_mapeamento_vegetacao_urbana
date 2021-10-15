import React from 'react';
import {View, Text, Button} from 'react-native';

// import { Container } from './styles';

// INTERFACES
import {Navigation} from '../../interfaces/Navigation';

interface Props {
  navigation: Navigation;
}

const Home: React.FC<Props> = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button title="Go to Cart" onPress={() => navigation.navigate('Cart')} />
    </View>
  );
};

export default Home;
