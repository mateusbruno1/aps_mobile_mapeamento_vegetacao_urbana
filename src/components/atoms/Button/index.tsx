import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import * as S from './styles';

interface Props {
  loading?: boolean;
  onPress: () => void;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  loading,
  children,
  onPress,
  disabled
}) => {
  return <S.Container disabled={disabled} onPress={() => disabled ? {} : onPress()}>
    {loading ? <ActivityIndicator color="#fff" /> : <S.Title disabled={disabled}>{children}</S.Title>}
    
  </S.Container>;
}

export default Button;