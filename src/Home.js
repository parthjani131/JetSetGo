import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  Keyboard,
} from 'react-native';
import {useSelector} from 'react-redux';
import fetchData from '../config/ApiCall';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PrimaryButton from '../components/PrimaryButton';
import Header from '../components/Header';
import {TextInput} from 'react-native-gesture-handler';

const Home = props => {
  const [cityData, setCityData] = useState([]);
  const [origin, setOrigin] = useState('');
  const [showOriginList, setShowOriginList] = useState(true);
  const [destination, setDestination] = useState('');
  const [showDestinationList, setShowDestinationList] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const {data} = useSelector(state => state.fetchSlice);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCityData(
      Array.from(
        new Set(data.map(flight => flight.origin || flight.destination)),
      ),
    );
  }, [data]);

  return (
    <View style={styles.root}>
      <Header title="Flight Search" />
      <View style={styles.mainView}>
        <View style={styles.inputView}>
          <View
            style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.inputIconView}>
              <Icon name="airplane-takeoff" size={35} color={colors.white} />
            </View>
            <TextInput
              style={styles.inputField}
              value={origin}
              onChangeText={text => {
                setOrigin(text);
                setShowOriginList(true);
              }}
              placeholder="Origin"
              placeholderTextColor={colors.black50}
            />
          </View>
          {origin !== '' && showOriginList == true ? (
            <>
              <View style={{height: 1, overflow: 'hidden'}}>
                <View style={styles.dottedLine}></View>
              </View>
              <View style={{marginTop: 10}}>
                <FlatList
                  data={cityData.filter(city =>
                    city.toLowerCase().includes(origin.toLowerCase()),
                  )}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={() => {
                          setOrigin(item);
                          setShowOriginList(false);
                          Keyboard.dismiss();
                        }}>
                        <Text style={styles.listText}>{item}</Text>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  keyboardShouldPersistTaps={'handled'}
                  ListEmptyComponent={() => {
                    return (
                      <View>
                        <Text style={styles.listText}>No Results</Text>
                      </View>
                    );
                  }}
                />
              </View>
            </>
          ) : null}
        </View>
        <View style={styles.inputView}>
          <View
            style={{width: '100%', flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.inputIconView}>
              <Icon name="airplane-landing" size={35} color={colors.white} />
            </View>
            <TextInput
              style={styles.inputField}
              value={destination}
              onChangeText={text => {
                setDestination(text);
                setShowDestinationList(true);
              }}
              placeholder="Destination"
              placeholderTextColor={colors.black50}
            />
          </View>
          {destination !== '' && showDestinationList == true ? (
            <>
              <View style={{height: 1, overflow: 'hidden'}}>
                <View style={styles.dottedLine}></View>
              </View>
              <View style={{marginTop: 10}}>
                <FlatList
                  data={cityData.filter(city =>
                    city.toLowerCase().includes(destination.toLowerCase()),
                  )}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={() => {
                          setDestination(item);
                          setShowDestinationList(false);
                          Keyboard.dismiss();
                        }}>
                        <Text style={styles.listText}>{item}</Text>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  keyboardShouldPersistTaps={'handled'}
                  ListEmptyComponent={() => {
                    return (
                      <View>
                        <Text style={styles.listText}>No Results</Text>
                      </View>
                    );
                  }}
                />
              </View>
            </>
          ) : null}
        </View>

        <View style={styles.primaryButtonContainer}>
          <PrimaryButton
            isLoading={isLoading}
            onPress={() => {
              setIsLoading(true);
              Keyboard.dismiss();
              setTimeout(() => {
                const includesOrigin = cityData.includes(origin);
                const includesDestination = cityData.includes(destination);

                if (includesOrigin) {
                  if (includesDestination) {
                    if (origin == destination) {
                      Alert.alert(
                        'Invalid Input',
                        'Origin and destination city cannot be same',
                      );
                    } else {
                      props.navigation.navigate('Results', {
                        originParam: origin,
                        destinationParam: destination,
                      });
                    }
                  } else {
                    Alert.alert(
                      'Invalid Input',
                      'Entered destionation city is invalid',
                    );
                  }
                } else {
                  Alert.alert(
                    'Invalid Input',
                    'Entered origin city is invalid',
                  );
                }
                setIsLoading(false);
              }, 1000);
            }}>
            Search Flights
          </PrimaryButton>
        </View>

        <View style={styles.primaryButtonContainer1}>
          <PrimaryButton
            onPress={() => {
              props.navigation.navigate('Results', {
                originParam: '',
                destinationParam: '',
              });
            }}>
            Show All Flights
          </PrimaryButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  inputView: {
    width: '100%',
    backgroundColor: colors.white,
    marginHorizontal: 30,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
  },
  inputIconView: {
    height: 50,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 15,
  },
  inputField: {
    height: 50,
    width: '82%',
    marginLeft: 10,
    fontSize: 20,
    color: colors.black,
  },
  listText: {
    fontSize: 16,
    color: colors.black,
    marginLeft: '20%',
  },
  dottedLine: {
    height: 2,
    borderWidth: 1,
    borderColor: colors.black50,
    borderStyle: 'dashed',
    marginLeft: '20%',
  },
  primaryButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  primaryButtonContainer1: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default Home;
