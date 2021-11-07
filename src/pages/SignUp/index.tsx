import React, {useState} from 'react';
import {Alert} from 'react-native';

// VALIDATORS
import {MaskCelNumber} from '../../utils/Validators/MaskCelNumber';

// STYLES
import * as S from './styles';

// COMPONENTS
import Input from '../../components/atoms/Inputs/Base';
import Button from '../../components/atoms/Button';

// INTERFACE
import {Navigation} from '../../interfaces/Navigation';

// HOOKS
import {useCreateUser} from '../../hooks/useCreateUser';
import {Notification, useNotification} from '../../hooks/useNotification';

interface Props {
  navigation: Navigation
}

const SignUp: React.FC<Props> = ({
  navigation
}) => {
  // STATES
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // HOOKS
  const {createUser, postCreateUser, postCreateUserLoading} = useCreateUser();
  const notification: Notification = useNotification();

  const handlePhone = (phone: string) => {
    const formatedPhone = MaskCelNumber(phone);

    setPhone(formatedPhone);
  }

  const onSubmit = async () => {
    if (postCreateUserLoading) {
      return;
    }
    if (name && phone.length === 15 && email && password.length >= 8) {
      try {
        await postCreateUser(name, email, phone, password);
        notification.success('Sucesso ao criar usúario');
        Alert.alert('Sucesso ao criar usúario');
        navigation.navigate('LogIn');
      } catch (error) {
        // err
        notification.error('Ops, o usuário já existe');
        Alert.alert('Ops, o usuário já existe');
      }
    }
    notification.error('Preencha todos os campos');
    Alert.alert('Preencha todos os campos');
    return;
  }
  return (
    <S.Container>
      <Input value={name} placeholder="Nome completo" onChange={e => setName(e)}/>
      <Input value={email} placeholder="E-mail" onChange={e => setEmail(e)}/>
      <Input maxLength={15} isNumeric value={phone} placeholder="Telefone" onChange={handlePhone}/>
      <Input value={password} placeholder="Senha" isPassword onChange={e => setPassword(e)}/>
      <Button onPress={onSubmit} loading={postCreateUserLoading}>
        Cadastrar
      </Button>
    </S.Container>
  );
};

export default SignUp;
