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
  isNumeric?: boolean;
  maxLength?: number;
}

const Input: React.FC<Props> = ({value, placeholder, onChange, isPassword, isNumeric, maxLength = 120}) => {
  return (
    <S.Container>
      <S.Input
        maxLength={maxLength}
        keyboardType={isNumeric ? 'numeric' : 'default'}
        value={value}
        onChangeText={onChange}
        placeholderTextColor={Colors.SLATE_GRAY}
        placeholder={placeholder}
        secureTextEntry={isPassword}
      />
    </S.Container>
  );
};

export default Input;
