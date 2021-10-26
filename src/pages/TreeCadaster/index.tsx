import React, {useState, useEffect} from 'react';
import { View, SafeAreaView, Dimensions, PermissionsAndroid, Alert, ScrollView, TouchableOpacity, Image } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Plus from 'react-native-vector-icons/Entypo';
import {launchImageLibrary} from 'react-native-image-picker';
import {Headline, Appbar} from 'react-native-paper';
// import { Container } from './styles';
import {
  TextButton,
  GroupButton,
  ButtonGroup,
  TextButtonLocale,
  styles,
  TextInput,
} from './styles';

// INTERFACES
import { Navigation } from '../../interfaces/Navigation';

// COMPONENTS
import Input from '../../components/atoms/Inputs/Base';
import Button from '../../components/atoms/Button';

// HOOKS
import {useTrees} from '../../hooks/useTrees';

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
  const {requestUploadImageLoading, postRequestImage, requestCreateTreeLoading, postRequestCreateTree} = useTrees();

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
        title: 'Permissão de acesso à localização',
        message: 'Este aplicativo precisa acessar sua localização.',
        buttonNeutral: 'Pergunte-me depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      await getLocation();
    } else {
      Alert.alert('Permissão de localização negada');
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
          title: 'Permissão',
          message: 'É necessario o acesso a galeria de imagens',
          buttonNeutral: 'Pergunte-me depois',
          buttonNegative: 'Não permitir',
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
            Alert.alert('A imagem não pode possuir um tamanho maior que 2Mb');

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
        file = await postRequestImage(data);
      }
      
      if (file) {
        setAvatarId(file.id);
      } else {
        setAvatarId(null);
      }

      if (
        (name && description) !== '' &&
        (selectMapPosition.latitude &&
          selectMapPosition.longitude) !== 0
      ) {
        let latitude = parseFloat(selectMapPosition.latitude);
        let longitude = parseFloat(selectMapPosition.longitude);

        await postRequestCreateTree(name, description, latitude, longitude, avatarId);
        navigation.navigate('Home', {
          shouldFetch: true
        });
      } else {
        Alert.alert(
          'Dados inválidos',
          'Por favor, preencha todos os campos obrigatórios.',
          [
            {
              text: 'OK',
              onPress: () => null,
              style: 'OK',
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error) {
    
      Alert.alert('Erro ao cadastrar nova àrvore, tente novamente mais tarde');
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
                  <Button onPress={() => setSelectMap(!selectMap)}>Utilizar este endereço</Button>
                )}
              </View>
            </View>
          ) : (
            <SafeAreaView style={styles.container}>
              <Appbar.Header
                dark
                style={{
                  backgroundColor: '#505050',
                  justifyContent: 'space-between',
                }}>
                <Appbar.BackAction
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
                <Appbar.Content
                  title="Cadastrar árvore"
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
                    color: '#fff',
                    fontFamily: 'Inter',
                  }}>
                  Cadastre uma nova árvore
                </Headline>

                  <Input placeholder="Nome" value={name} onChange={(text) => setName(text)} />
                  <Input placeholder="Descrição" value={description} onChange={(text) => setDescription(text)} />

                <Headline
                  style={{
                    fontSize: 20,
                    paddingLeft: 22,
                    marginBottom: 10,
                    color: '#fff',
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
                      <TextButtonLocale>Usar minha localização</TextButtonLocale>
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

                    <Button onPress={() => handleSelectMap(0, 0)}>Alterar localização</Button>
                  </View>
                )}
                {image.fileUri === '' ? (
                  <View>
                    <Headline
                      style={{
                        fontSize: 20,
                        paddingLeft: 22,
                        marginBottom: 10,
                        color: '#fff',
                        fontFamily: 'Inter',
                      }}>
                      Escolha uma Imagem
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
                        color: '#fff',
                        fontFamily: 'Inter',
                      }}>
                      Imagem Selecionada
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
                <Button disabled={!name || !description || latitude === 0 || !latitude || longitude === 0 || !longitude || !image.fileUri} onPress={onConfirm}>
                  Cadastrar
                </Button>
              </ScrollView>
            </SafeAreaView>
          )}
    </SafeAreaView>
  );
}

export default TreeCadaster;