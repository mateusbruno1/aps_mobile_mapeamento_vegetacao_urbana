import styled from 'styled-components/native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-left: ${wp('7')};
  padding-right: ${wp('7')};
`;

export const Button = styled.Button`
  background-color: aliceblue;
  width: 100%;
`