import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, StatusBar, ScrollView, Image, TouchableOpacity, Text, ActivityIndicator, Linking, Alert, PermissionsAndroid, } from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {Appbar, Headline, Subheading} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Feather';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {showLocation} from 'react-native-map-link';

// import { Container } from './styles';

// STYLES
import {CAMBRIDGE_BLUE, PEWTER_BLUE} from '../../styles/colors';

// COMPONENTS
import Button from '../../components/atoms/Button';

// HOOKS
import {useTrees} from '../../hooks/useTrees';

// INTERFACES
import { Navigation } from '../../interfaces/Navigation';

interface RouteProps {
  params: any
}

interface Props {
  route: RouteProps,
  navigation: Navigation
}

const {width, height} = Dimensions.get('window');

const TreeInfo: React.FC<Props> = ({
  route,
  navigation
}) => {
  const { id } = route.params;
  // STATES
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();
  
  const getLocation = async () => {
    Geolocation.getCurrentPosition((info) => {
      let longitude = info.coords.latitude;
      let latitude = info.coords.longitude;

      setLatitude(latitude);
      setLongitude(longitude);
    });
  };
  const requestLocationPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permissão de Acesso à Localização',
        message: 'Este aplicativo precisa acessar sua localização.',
        buttonNeutral: 'Pergunte-me depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getLocation();
    } else {
      Alert.alert('Permissão de Localização negada');
    }
  };
  const openMapGoogle = async () => {
    showLocation({
      latitude: parseFloat(requestTree?.latitude),
      longitude: parseFloat(requestTree?.longitude),
      dialogTitle: 'Abrir rota',
      dialogMessage: 'Deseja exibir a rota em qual aplicativo?',
      cancelText: 'Cancelar',
    });
  };
  // HOOKS
  const {getRequestTree,requestTree,requestTreeLoading} = useTrees();

  useEffect(() => {
    const getTree = async () => {
      await getRequestTree(id);
    }

    requestLocationPermission();
    getTree();
  }, [])


  return <View style={styles.container}>
  <StatusBar backgroundColor={PEWTER_BLUE} barStyle="light-content" />
  <Appbar.Header
    dark
    style={{backgroundColor: PEWTER_BLUE, justifyContent: 'space-between'}}>
    <Appbar.BackAction
      onPress={() => {
        navigation.goBack();
      }}
    />
    <Appbar.Content
      title={requestTree?.name}
      titleStyle={{
        fontFamily: 'Inter',
        fontSize: 18,
      }}
    />
  </Appbar.Header>
  {!requestTreeLoading ? (
    <>
      <ScrollView style={{
        paddingLeft: 16,
        paddingRight: 16
      }}>
        <Image
          style={{width: width, height: 150, resizeMode: 'contain'}}
          source={{
            uri: `${requestTree?.tree_image?.url}`,
          }}
        />

        <Subheading
          style={{
            color: '#fff',
            fontFamily: 'Montserrat-Regular',
          }}>
          {requestTree?.description}
        </Subheading>

        {requestTree?.latitude && (
          <View style={{alignItems: 'center'}}>
            <MapView
              style={styles.mapGoogle}
              provider={PROVIDER_GOOGLE}
              region={{
                latitude: parseFloat(requestTree?.latitude),
                longitude: parseFloat(requestTree?.longitude),
                latitudeDelta: 0.0023,
                longitudeDelta: 0.0024,
              }}
              loadingEnabled
              scrollEnabled={false}
              zoomEnabled={false}>
              <Marker
                coordinate={{
                  latitude: parseFloat(requestTree?.latitude),
                  longitude: parseFloat(requestTree?.longitude),
                }}
              />
            </MapView>
            <Button onPress={openMapGoogle}>Ver rotas</Button>
          </View>
        )}
      </ScrollView>
    </>
  ) : (
    <ActivityIndicator
      color="#000"
      size="large"
      style={{alignSelf: 'center', paddingTop: 72}}
    />
  )}
</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CAMBRIDGE_BLUE,
    flex: 1,
    position: 'relative',
  },
  mapbox: {
    alignSelf: 'center',
    width: width - 30,
    height: 128,
    borderRadius: 15,
  },
  mapGoogle: {
    alignSelf: 'center',
    width: width - 30,
    height: 128,
    borderRadius: 15,
  },
  abrirMapa: {
    width: width - 30,
    height: 40,
    marginTop: 5,
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFF04',
  },
  mapaText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    color: '#000',
  },
  background: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  whatsText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#fff',
  },
  horarioText: {
    fontFamily: 'Montserrat-Regular',
    paddingTop: 16,
    fontSize: 16,
    color: '#000',
  },
});

export default TreeInfo;