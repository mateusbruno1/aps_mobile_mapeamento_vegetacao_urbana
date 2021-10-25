import styled from 'styled-components/native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {PEWTER_BLUE} from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-left: ${wp('7')};
  padding-right: ${wp('7')};

  background-color: ${PEWTER_BLUE};
`;

export const Button = styled.Button`
  background-color: aliceblue;
  width: 100%;
`