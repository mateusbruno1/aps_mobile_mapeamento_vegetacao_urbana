import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';

// import { Container } from './styles';

// CONTEXT
import {AuthContext} from '../../services/context';

const Drawer: React.FC = () => {
  // CONTEXT
  const {signOut} = useContext(AuthContext);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Drawer Screen</Text>
      <Button title="SignOut" onPress={() => signOut()} />
    </View>
  );
};

export default Drawer;
