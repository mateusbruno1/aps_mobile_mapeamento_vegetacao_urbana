import React, {useContext, useState} from 'react';
import {View, Text, Button} from 'react-native';

// INTERFACES
import {Navigation} from '../../interfaces/Navigation';

// STYLES
// import { Container } from './styles';

// CONTEXT
import {AuthContext} from '../../services/context';

// HOOKS
import {useAuthentication} from '../../hooks/useAuthentication';

// COMPONENTS
import Input from '../../components/atoms/Inputs/Base';

interface Props {
  navigation: Navigation;
}

const LogIn: React.FC = () => {
  // CONTEXT
  const {signIn} = useContext(AuthContext);

  // STATES
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // HOOKS
  const {newSession, newSessionLoading} = useAuthentication();

  const onChangeEmail = (text:string) => {
    setEmail(text);
  };

  const onChangePassword =  (text:string) => {
    setPassword(text);
  };

  const onSubmit = async () => {
    const session = await newSession(email, password);
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Login Screen</Text>
      <Input
        value={email}
        placeholder="Digite o e-mail"
        onChange={onChangeEmail}
      />
      <Input
        value={password}
        placeholder="Digite a senha"
        isPassword
        onChange={onChangePassword}
      />
      <Button title={newSessionLoading ? "Carregando...":"LogIn"} onPress={onSubmit} />
    </View>
  );
};

export default LogIn;
