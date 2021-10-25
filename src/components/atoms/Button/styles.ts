import styled from 'styled-components/native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SLATE_GRAY, PEWTER_BLUE, CELADON_GREEN, BLACK } from '../../../styles/colors';

interface Props {
  disabled: boolean
}

export const Container = styled.TouchableOpacity`
align-items: center;
justify-content: center;
  width: 100%;
  height: 45;
  background-color: ${({disabled}: Props) => disabled ? SLATE_GRAY : CELADON_GREEN};

  border-radius: 8;

  margin-top: ${wp('2')}
`;

export const Title = styled.Text`
  font-family: 'Inter';
  font-size: 16;
  font-weight: bold;
  color: ${({disabled}: Props) => disabled ? PEWTER_BLUE : BLACK};
`;