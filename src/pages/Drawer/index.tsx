import React, {useContext} from 'react';
import {View, Text} from 'react-native';

// import { Container } from './styles';

// CONTEXT
import {AuthContext} from '../../services/context';

// COMPONENTS
import Button from '../../components/atoms/Button';

// STYLES
import {PEWTER_BLUE, GREEN_200, SLATE_GRAY, CAMBRIDGE_BLUE} from '../../styles/colors';

const Drawer: React.FC = () => {
  // CONTEXT
  const {signOut} = useContext(AuthContext);

  return (
    <View style={{flex: 1, paddingLeft: 16, paddingRight: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: CAMBRIDGE_BLUE, position: 'relative'}}>
      <Button onPress={signOut}>
        Sair
      </Button>
      <Text style={{position: 'absolute', bottom: 16, left: 16, color: SLATE_GRAY}}>v0.1 beta</Text>
    </View>
  );
};

export default Drawer;
