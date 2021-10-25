import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
const {width, height} = Dimensions.get('window');

import {PEWTER_BLUE, CAMBRIDGE_BLUE} from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: #333;
  padding: 20px;
  align-items: center;
`;
export const Image = styled.ImageBackground`
  flex: 1;
  width: 32px;
  height: 32px;
  border-radius: 50px;
`;

export const Button = styled.TouchableOpacity`
  max-width: 168px;
  height: 48px;
  background-color: ${PEWTER_BLUE};
  align-self: stretch;
  padding: 0 20px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

export const TextButton = styled.Text`
  color: #fff;
  font-size: 12px;
  font-family: 'Inter';
`;
export const styles = {
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#1f1f1f',
  },
  fabAdd: {
    backgroundColor: CAMBRIDGE_BLUE,
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 65,
  },
  fabInfo: {
    backgroundColor: CAMBRIDGE_BLUE,
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 115,
  },
  annotationContainer: {
    width: 42,
    height: 42,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  annotationFill: {
    width: 30,
    height: 30,
    backgroundColor: '#7159C1',
    transform: [{scale: 0.5}],
    borderRadius: 50,
  },
  viewSearch: {
    width: width,
    position: 'absolute',
    bottom: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    padding: 10,
    left: 10,
  },
  searchBar: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#333',
    borderRadius: 24,
    width: width - 8,
    color: '#f8f8f8',
    paddingLeft: 48,
    paddingRight: 24,
    fontFamily: 'Catamaran-Regular',
    fontSize: 16,
  },
};
