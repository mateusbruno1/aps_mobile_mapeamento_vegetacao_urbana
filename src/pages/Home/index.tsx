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

import {GREEN_100, GRAY_100} from '../../styles/colors';

// HOOKS
import {useTrees} from '../../hooks/useTrees';

// import { Container } from './styles';

// INTERFACES
import {Navigation} from '../../interfaces/Navigation';

interface Props {
  navigation: Navigation;
}

const Home: React.FC<Props> = ({navigation}) => {
  // STATES
  const [coordinates, setCoordinates] = useState({
    latitude: -21.2092857,
    longitude: -50.4010365
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
    let newData = trees.filter((item) => {
      const itemData = `${item?.name.toUpperCase()}
      ${item?.name.toUpperCase()}`;

      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    if (newData.length === 0) {
      newData = trees.filter((item) => {
        const itemData = `${item?.description.toUpperCase()}
        ${item?.description.toUpperCase()}`;
  
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
    }
    setArrayholder(newData);
    if (newData.length > 0) {
      console.log('newData: ', newData);
      
      setCoordinates({longitude: parseFloat(newData[0]?.longitude), latitude: parseFloat(newData[0]?.latitude)});
    } else {
      getLocation();
    }
  };

  // HOOKS
  const {getRequestTrees, requestTreesLoading} = useTrees();

  const getTrees = async () => {
    try {
      const requestData = await getRequestTrees();
      setTrees(requestData);
    } catch (error) {
      // err
      console.log(error);
    }
  }

  useEffect(() => {
    getTrees();
  }, [])
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'transparent'}}>
        {!requestTreesLoading ? (
          <>
            {query !== '' && arrayholder.length !== 0 ? (
              <FlatList
                style={{
                  width: width,
                  backgroundColor: GREEN_100,
                  elevation: 2,
                  maxHeight: width * (1 / 2.5),
                  position: 'absolute',
                  zIndex: 100,
                }}
                data={arrayholder}
                renderItem={({item}) => (
                  <List.Item
                    onPress={() => handleCellNavigation(item.id)}
                    title={`${item.name}`}
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
                        color={GRAY_100}
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
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              showsUserLocation
              loadingEnabled>
              {trees && !requestTreesLoading && trees.map((tree) => {
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
                placeholderTextColor={GRAY_100}
                onChangeText={(text) => searchFilterFunction(text)}
                autoCorrect={false}
                value={query}
                style={{
                  margin: 8,
                  elevation: 2,
                  backgroundColor: GREEN_100,
                }}
                inputStyle={{
                  fontFamily: 'Inter',
                  color: '#fff',
                }}
                icon={() => {
                  return <Icon name="search" size={24} color={GRAY_100} />;
                }}
                clearIcon={() => {
                  return <Icon name="x" size={24} color={GRAY_100} />;
                }}
              />
            </View>
          </>
        ) : null}
      </SafeAreaView>
  );
};

export default Home;
