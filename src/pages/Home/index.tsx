import React, { useState, useEffect } from 'react';
import {
  View,
  PermissionsAndroid,
  Alert,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import MapView, {Marker, PROVIDER_GOOGLE, Callout} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {Button, TextButton, styles} from './styles';
import {Appbar, Searchbar, List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

// HOOKS
import {useTrees} from '../../hooks/useTrees';

// import { Container } from './styles';

// INTERFACES
import {Navigation} from '../../interfaces/Navigation';

interface Props {
  navigation: Navigation;
}

const MapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#181818',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1b1b1b',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#2c2c2c',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8a8a8a',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#373737',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3c3c3c',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#4e4e4e',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d3d3d',
      },
    ],
  },
];

const Home: React.FC<Props> = ({navigation}) => {
  // STATES
  const [coordinates, setCoordinates] = useState({
    latitude: -21.1419838,
    longitude: -51.1045257
  });
  const [query, setQuery] = useState('');
  const [trees, setTrees] = useState([]);
  const [arrayholder, setArrayholder] = useState([]);

  const {width} = Dimensions.get('window');

  const getLocation = async () => {
    Geolocation.getCurrentPosition((info) => {
      let latitude = info.coords.latitude;
      let longitude = info.coords.longitude;
      setCoordinates({latitude, longitude});
    });
  };

  const handleCellNavigation = (id: number | string) => {
    navigation.navigate('TreeInfo', {id});
  };

  const searchFilterFunction = async (text: string) => {
    setQuery(text);
    const newData = arrayholder.filter((item) => {
      const itemData = `${item?.name.toUpperCase()}   
      ${item?.name.toUpperCase()}`;

      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setTrees(newData);
    if (!(newData.length < 1)) {
      setCoordinates({longitude: parseFloat(newData[0]?.longitude), latitude: parseFloat(newData[0]?.latitude)});
    } else {
      getLocation();
    }
  };

  // HOOKS
  const {getRequestTrees, requestTrees, requestTreesLoading} = useTrees();

  useEffect(() => {
    getRequestTrees();
    setTrees(requestTrees);
  }, [getRequestTrees])
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
        {!requestTreesLoading ? (
          <>
            {query !== '' && trees.length !== 0 ? (
              <FlatList
                style={{
                  width: width,
                  backgroundColor: '#505050',
                  elevation: 2,
                  maxHeight: width * (1 / 2.5),
                  position: 'absolute',
                  zIndex: 100,
                }}
                data={trees}
                renderItem={({item}) => (
                  <List.Item
                    onPress={() => handleCellNavigation(item.id)}
                    title={`Célula ${item.name}`}
                    description={item.description}
                    titleNumberOfLines={1}
                    titleStyle={{
                      color: '#fff',
                      fontFamily: 'Inter',
                    }}
                    descriptionNumberOfLines={1}
                    descriptionStyle={{
                      color: '#fff',
                      fontFamily: 'Inter',
                    }}
                    right={(props) => (
                      <Icon
                        {...props}
                        color="#979dac"
                        size={24}
                        style={{
                          alignSelf: 'center',
                        }}
                        name="chevron-right"
                      />
                    )}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
              />
            ) : null}
            <MapView
              style={{flex: 1}}
              provider={PROVIDER_GOOGLE}
              region={{
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                latitudeDelta: 0.0143,
                longitudeDelta: 0.0134,
              }}
              showsUserLocation
              loadingEnabled
              customMapStyle={MapStyle}>
              {trees.map((tree) => {
                const latitude = parseFloat(tree?.latitude);
                const longitude = parseFloat(tree?.longitude);
                return (
                  <Marker
                    key={tree?.id}
                    coordinate={{
                      latitude: latitude,
                      longitude: longitude,
                    }}
                    calloutAnchor={{
                      x: 4.5,
                      y: 0.8,
                    }}>
                    <Callout
                      tooltip
                      onPress={() => handleCellNavigation(tree?.id)}>
                      <Button>
                        <TextButton>{tree?.name}</TextButton>
                        <TextButton>(clique para abrir)</TextButton>
                      </Button>
                    </Callout>
                  </Marker>
                );
              })}
            </MapView>
            <View style={styles.viewSearch}>
              <Searchbar
                placeholder="Buscar"
                placeholderTextColor="#979dac"
                onChangeText={(text) => searchFilterFunction(text)}
                autoCorrect={false}
                value={query}
                style={{
                  margin: 8,
                  elevation: 2,
                  backgroundColor: '#505050',
                }}
                inputStyle={{
                  fontFamily: 'Inter',
                  color: '#fff',
                }}
                icon={() => {
                  return <Icon name="search" size={24} color="#979dac" />;
                }}
                clearIcon={() => {
                  return <Icon name="x" size={24} color="#979dac" />;
                }}
              />
            </View>
          </>
        ) : null}
      </SafeAreaView>
  );
};

export default Home;
