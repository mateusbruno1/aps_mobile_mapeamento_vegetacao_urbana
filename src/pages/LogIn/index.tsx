import React, {useContext, useState} from 'react';
import {View, Text, Alert} from 'react-native';

// INTERFACES
import {Navigation} from '../../interfaces/Navigation';

// STYLES
import * as S from './styles';

// HOOKS
import {useAuthentication} from '../../hooks/useAuthentication';
import { Notification, useNotification } from '../../hooks/useNotification';

// COMPONENTS
import Input from '../../components/atoms/Inputs/Base';
import Button from '../../components/atoms/Button';

interface Props {
  navigation: Navigation;
}

const LogIn: React.FC<Props> = ({
  navigation
}) => {

  // STATES
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // HOOKS
  const {newSession, newSessionLoading} = useAuthentication();
  const notification: Notification = useNotification();

  const onChangeEmail = (text:string) => {
    setEmail(text);
  };

  const onChangePassword =  (text:string) => {
    setPassword(text);
  };

  const onSubmit = async () => {
    try {
      await newSession(email, password);
    } catch (error) {
      // err
      notification.error('Ops, algo deu errado')
      Alert.alert('Ops, algo deu errado')
    }
  };

  return (
    <S.Container>
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
      <Button onPress={onSubmit} disabled={!email.length || !password.length} loading={newSessionLoading}>
        Entrar
      </Button>
      <Button onPress={() => navigation.navigate('SignUp')}>
        Cadastre-se
      </Button>
    </S.Container>
  );
};

export default LogIn;
