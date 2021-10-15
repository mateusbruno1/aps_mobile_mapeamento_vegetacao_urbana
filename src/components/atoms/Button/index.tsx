import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import * as S from './styles';

interface Props {
  loading?: boolean;
  onPress: () => void;
}

const Button: React.FC<Props> = ({
  loading,
  children,
  onPress
}) => {
  return <S.Container onPress={onPress}>
    {loading ? <ActivityIndicator color="#fff" /> : <S.Title>{children}</S.Title>}
    
  </S.Container>;
}

export default Button;