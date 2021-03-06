import styled from 'styled-components/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import * as Typography from '../../../../styles/typography';
import * as Colors from '../../../../styles/colors';

export const Container = styled.View`
  height: 45;
  width: 100%;
  background-color: ${Colors.WHITE};
  border-radius: 8;

  border: 1px solid ${Colors.PEWTER_BLUE};

  padding-left: ${wp('1')};
  padding-right: ${wp('1')};

  margin-top: ${wp('2')};
`;

export const Input = styled.TextInput`
  font-family: ${Typography.INTER_FONT};
`;
