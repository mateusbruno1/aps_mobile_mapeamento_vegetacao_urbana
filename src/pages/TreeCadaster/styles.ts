import {Dimensions, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
const {width, height} = Dimensions.get('window');
export const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: #1f1f1f;
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
  width: 168px;
  height: 35px;
  background-color: #333454;
  align-self: stretch;
  padding: 0 20px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
`;

export const TextButton = styled.Text`
  color: #fff;
  font-size: 28px;
  font-family: 'Montserrat-Bold';
  font-weight: bold;
`;

export const GroupButton = styled.View`
  justify-content: space-between;
  height: 52px;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  color: #777777;
  margin: 0 20px 20px;
`;
export const ButtonGroup = styled.TouchableOpacity`
  background-color: #faff04;
  elevation: 2;
  border-radius: 8px;
  padding: 10px;
  width: 150px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

export const TextButtonLocale = styled.Text`
  color: #000;
  font-family: 'Montserrat-Bold';
  text-align: center;
  font-size: 12px;
`;
export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-family: 'Montserrat-Regular';
`;
export const BackgroundStyles = {
  flex: 1,
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
  },
  around: {
    marginBottom: 76,
  },
  foto: {
    margin: 32,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoView: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    backgroundColor: '#1f1f1f',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  dividida: {
    alignSelf: 'center',
    flex: 1,
    width: width - 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  numero: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '33%',
    height: 52,
    backgroundColor: '#2e2e2e',
    paddingLeft: 16,
    paddingRight: 16,
    elevation: 2,
    marginBottom: 18,
    flexDirection: 'row',
    borderRadius: 8,
    alignItems: 'center',
  },
  bairro: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: 52,
    width: '63%',
    backgroundColor: '#2e2e2e',
    paddingLeft: 16,
    paddingRight: 16,
    elevation: 2,
    marginBottom: 18,
    flexDirection: 'row',
    borderRadius: 8,
    alignItems: 'center',
  },
  inputView: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: width - 40,
    height: 52,
    backgroundColor: '#2e2e2e',
    paddingLeft: 16,
    paddingRight: 16,
    elevation: 2,
    marginBottom: 18,
    flexDirection: 'row',
    borderRadius: 8,
    alignItems: 'center',
    color: '#777777',
  },
  inputImage: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: width - 40,
    height: 252,
    marginBottom: 20,
  },
  inputPicker: {
    alignSelf: 'center',
    width: width - 40,
    height: 52,
    backgroundColor: '#2e2e2e',
    paddingLeft: 16,
    paddingRight: 16,
    elevation: 2,
    marginBottom: 18,
    flexDirection: 'row',
    borderRadius: 8,
    alignItems: 'center',
    color: '#777777',
  },
  textInput: {
    flex: 1,
    color: '#fff',
    fontFamily: 'Montserrat-Regular',
  },
  placeholder: {
    color: '#777777',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'left',
    width: '100%',
  },
  botao: {
    width: width - 40,
    marginBottom: 15,
    flexDirection: 'row',
    height: 52,
    backgroundColor: '#FAFF04',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
  },
  botaoDel: {
    width: width - 40,
    marginBottom: 10,
    flexDirection: 'row',
    height: 52,
    backgroundColor: '#8f3c3d',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
  },
  botaoAlter: {
    width: width - 40,
    flexDirection: 'row',
    height: 40,
    backgroundColor: '#FAFF04',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
  },
  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#fff',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 40,
  },
  botaoText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#000',
  },
  headline: {
    alignSelf: 'center',
    fontSize: 26,
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
    marginBottom: 15,
  },
  button: {
    flexDirection: 'row',
    height: 52,
    backgroundColor: '#FAFF04',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
  },
  buttonMap: {
    width: 450,
    height: 80,
    fontFamily: 'Montserrat-Bold',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7159C1',
    transform: [{scale: 0.5}],
    borderRadius: 8,
  },
  viewSearch: {
    width: width,
    position: 'absolute',
    bottom: 5,
    marginBottom: 90,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapGoogle: {
    alignSelf: 'center',
    width: width - 40,
    height: 150,
    position: 'relative',
  },
});
