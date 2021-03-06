import React, {useState, useEffect} from 'react';
import { View, SafeAreaView, Dimensions, PermissionsAndroid, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Plus from 'react-native-vector-icons/Entypo';
import {launchImageLibrary} from 'react-native-image-picker';
import {Headline, Appbar} from 'react-native-paper';
import api from '../../services/api';
// import { Container } from './styles';
import {
  GroupButton,
  ButtonGroup,
  TextButtonLocale,
  styles,
} from './styles';
import * as Colors from '../../styles/colors';

// INTERFACES
import { Navigation } from '../../interfaces/Navigation';

// COMPONENTS
import Input from '../../components/atoms/Inputs/Base';
import Button from '../../components/atoms/Button';

// HOOKS
import { getData } from '../../utils/AsyncStorage';
import {useNotification, Notification} from '../../hooks/useNotification'

interface Props {
  navigation: Navigation;
}

const {width, height} = Dimensions.get('window');
const TreeCadaster: React.FC<Props> = ({
  navigation
}) => {
  // STATES
  interface SelectMapPositionProps {
    latitude: number;
    longitude: number;
  }
  interface ImageProps {
    fileName: string;
    fileUri: string;
    type: string;
  }
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [selectMap, setSelectMap] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [selectMapPosition, setSelectMapPosition] = useState<SelectMapPositionProps>({
    latitude: 0,
    longitude: 0
  });
  const [image, setImage] = useState<ImageProps>({
    fileName: '',
    fileUri: '',
    type: ''
  })
  const [avatarId, setAvatarId] = useState<number | null>(null);

  // HOOKS
  const notification: Notification = useNotification();

  useEffect(() =>{
    requestLocationPermission()
  },[])
  const getLocation = async () => {
    let latitude = 0;
    let longitude = 0;
    try {
      await Geolocation.getCurrentPosition(
        (info) => {
          latitude = info.coords.latitude;
          longitude = info.coords.longitude;

          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => console.log(error),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 10000,
        },
      );
    } catch (e) {
      console.log(e);
    }
  };
  const requestLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permiss??o de acesso ?? localiza????o',
        message: 'Este aplicativo precisa acessar sua localiza????o.',
        buttonNeutral: 'Pergunte-me depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      await getLocation();
    } else {
      Alert.alert('Permiss??o de localiza????o negada');
    }
  };
  const handleSelectMap = async (latitude: number, longitude: number) => {
    await setSelectMapPosition({latitude, longitude});
  };

  const handleSelectImage = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permiss??o',
          message: '?? necessario o acesso a galeria de imagens',
          buttonNeutral: 'Pergunte-me depois',
          buttonNegative: 'N??o permitir',
          buttonPositive: 'OK',
        },
      );
     
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await launchImageLibrary({}, async (data: any) => {
        
          if (data.assets[0].didCancel) {
           
            return;
          }
          
          if (!data.assets[0].uri) {
           
            return;
          }

          const size = data.assets[0].fileSize / 1024 / 1024;
          if (size > 2) {
            Alert.alert('A imagem n??o pode possuir um tamanho maior que 2Mb');

            return;
          }
      
         
          setImage({
              fileUri: data.assets[0].uri,
              fileName: data.assets[0].fileName,
              type: data.assets[0].type,
            });
        });
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const onConfirm = async () => {
    const data = new FormData();
    let file;
    data.append('file', {
      name: image.fileName,
      type: image.type,
      uri: image.fileUri,
    });   
    try {
      setButtonLoading(true);
      if (
        (image.fileName &&
          image.type &&
          image.fileUri &&
          name && description) !== '' &&
        (image.fileName &&
          image.type &&
          image.fileUri) !== undefined &&
        (selectMapPosition.latitude &&
          selectMapPosition.longitude) !== 0
      ) {
        const response = await api
          .post('/files', data, {
            headers: {
              'Content-Type': 'multipart/form-data;',
            },
          })
          .catch((err) => {
            console.log(err);
          });
          file = response.data;
      }
      if (
        (name && description) !== '' &&
        (selectMapPosition.latitude &&
          selectMapPosition.longitude) !== 0
      ) {
        let latitude = parseFloat(selectMapPosition.latitude);
        let longitude = parseFloat(selectMapPosition.longitude);
        
        const payload = {
          name, description, latitude, longitude, avatar_id: file.id
        };
        const bearerToken = await getData('token');
        await api.post('/Tree', payload, {
          headers: {
            Authorization: `Bearer ${bearerToken}`
          }
        });
        setButtonLoading(false);
        notification.success('Cadastro efetuado com sucesso')
        Alert.alert('Cadastro efetuado com sucesso')
        navigation.navigate('Home', {
          shouldFetch: true
        });
      } else {
        Alert.alert(
          'Dados inv??lidos',
          'Por favor, preencha todos os campos obrigat??rios.',
          [
            {
              text: 'OK',
              onPress: () => null,
              style: 'OK',
            },
          ],
          {cancelable: false},
        );
        setButtonLoading(false);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro ao cadastrar, tente novamente mais tarde');
      setButtonLoading(false);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
          {selectMap ? (
            <View style={{height, width}}>
              <MapView
                style={{flex: 1}}
                provider={PROVIDER_GOOGLE}
                region={{
                  latitude: selectMapPosition.latitude,
                  longitude: selectMapPosition.longitude,
                  latitudeDelta: 0.0093,
                  longitudeDelta: 0.0084,
                }}
                loadingEnabled
                showsUserLocation
                onPress={(event) => {
                  handleSelectMap(
                    event.nativeEvent.coordinate.latitude,
                    event.nativeEvent.coordinate.longitude,
                  );
                }}>
                {selectMapPosition.latitude !== 0 && (
                  <Marker
                    coordinate={{
                      latitude: selectMapPosition.latitude,
                      longitude: selectMapPosition.longitude,
                    }}
                  />
                )}
              </MapView>
              <View style={styles.viewSearch}>
                {selectMapPosition.latitude !== 0 && (
                  <Button onPress={() => setSelectMap(!selectMap)}>Utilizar este endere??o</Button>
                )}
              </View>
            </View>
          ) : (
            <SafeAreaView style={styles.container}>
              <Appbar.Header
                dark
                style={{
                  backgroundColor: Colors.CAMBRIDGE_BLUE,
                  justifyContent: 'space-between',
                }}>
                <Appbar.BackAction
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
                <Appbar.Content
                  title="Cadastrar ??rvore"
                  titleStyle={{
                    fontFamily: 'Inter',
                    fontSize: 18,
                  }}
                />
              </Appbar.Header>
              <ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}>
                <Headline
                  style={{
                    fontSize: 20,
                    paddingLeft: 22,
                    marginTop: 20,
                    marginBottom: 10,
                    color: '#000',
                    fontFamily: 'Inter',
                  }}>
                  Cadastre uma nova ??rvore
                </Headline>

                  <View style={{paddingLeft: 16, paddingRight: 16, paddingBottom: 16}}>
                    <Input placeholder="Nome" value={name} onChange={(text) => setName(text)} />
                    <Input placeholder="Descri????o" value={description} onChange={(text) => setDescription(text)} />
                  </View>

                <Headline
                  style={{
                    fontSize: 20,
                    paddingLeft: 22,
                    marginBottom: 10,
                    color: '#000',
                    fontFamily: 'Inter',
                  }}>
                  Selecione o local:
                </Headline>
                {selectMapPosition.latitude === 0 ? (
                  <GroupButton>
                    <ButtonGroup
                      first
                      onPress={() => {
                        handleSelectMap(
                          latitude,
                          longitude,
                        );
                      }}>
                      <TextButtonLocale>Usar minha localiza????o</TextButtonLocale>
                    </ButtonGroup>
                    <ButtonGroup
                      onPress={() => {
                        setSelectMap(!selectMap);
                        setSelectMapPosition({latitude, longitude});
                      }}>
                      <TextButtonLocale>Escolher no mapa</TextButtonLocale>
                    </ButtonGroup>
                  </GroupButton>
                ) : (
                  <View style={{marginBottom: 20}}>
                    <MapView
                      style={styles.mapGoogle}
                      provider={PROVIDER_GOOGLE}
                      region={{
                        latitude: selectMapPosition.latitude,
                        longitude: selectMapPosition.longitude,
                        latitudeDelta: 0.0093,
                        longitudeDelta: 0.0084,
                      }}
                      loadingEnabled
                      scrollEnabled={false}>
                      {selectMapPosition.latitude !== 0 && (
                        <Marker
                          coordinate={{
                            latitude: selectMapPosition.latitude,
                            longitude: selectMapPosition.longitude,
                          }}
                        />
                      )}
                    </MapView>

                    <View style={{paddingLeft: 16, paddingRight: 16}}>
                      <Button onPress={() => handleSelectMap(0, 0)}>Alterar localiza????o</Button>
                    </View>
                    
                  </View>
                )}
                {image.fileUri === '' ? (
                  <View>
                    <Headline
                      style={{
                        fontSize: 20,
                        paddingLeft: 22,
                        marginBottom: 10,
                        color: '#000',
                        fontFamily: 'Inter',
                      }}>
                      Escolha uma imagem
                    </Headline>
                    <View style={styles.inputView}>
                      <TouchableOpacity
                        style={styles.imagesInput}
                        onPress={() => {
                          handleSelectImage();
                        }}>
                        <Plus name="plus" color="#2e2e2e" size={24} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View style={styles.inputImage}>
                    <Headline
                      style={{
                        fontSize: 20,

                        marginBottom: 10,
                        color: '#000',
                        fontFamily: 'Inter',
                      }}>
                      Imagem selecionada
                    </Headline>
                    <Image
                      style={{flex: 1}}
                      source={{uri: image.fileUri}}
                      resizeMode="contain"
                    />
                    <Button onPress={() => {
                        setImage({fileName: '', fileUri: '', type: ''});
                      }}>Remover imagem</Button>
                  </View>
                )}
                <View style={{padding: 16}}>
                    <Button loading={buttonLoading} disabled={!name || !description || latitude === 0 || !latitude || longitude === 0 || !longitude || !image.fileUri} onPress={onConfirm}>
                    Cadastrar
                  </Button>
                </View>
                
              </ScrollView>
            </SafeAreaView>
          )}
    </SafeAreaView>
  );
}

export default TreeCadaster;