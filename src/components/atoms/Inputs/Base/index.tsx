import React from 'react';
import {View} from 'react-native';

// STYLES
import * as S from './styles';
import * as Colors from '../../../../styles/colors';

interface Props {
  value: string;
  placeholder: string;
  onChange: (text: string) => void;
  isPassword?: boolean;
}

const Input: React.FC<Props> = ({value, placeholder, onChange, isPassword}) => {
  return (
    <S.Container>
      <S.Input
        value={value}
        onChangeText={onChange}
        placeholderTextColor={Colors.GRAY_100}
        placeholder={placeholder}
        secureTextEntry={isPassword}
      />
    </S.Container>
  );
};

export default Input;
