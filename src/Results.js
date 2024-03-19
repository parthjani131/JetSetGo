import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../config/colors';
import Card from '../components/Card';
import Header from '../components/Header';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Logo from '../components/Logo';

const Results = props => {
  const [flightData, setFlightData] = useState([]);
  const [airlineData, setAirlineData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortMode, setSortMode] = useState(true);
  const [selectedAirline, setSelectedAirline] = useState(null);

  const {data} = useSelector(state => state.fetchSlice);
  const {originParam, destinationParam} = props.route.params;

  useEffect(() => {
    if (originParam && destinationParam) {
      setFlightData(
        data.filter(
          flights =>
            flights.origin == originParam &&
            flights.destination == destinationParam,
        ),
      );
    } else {
      setFlightData(data);
    }
    setAirlineData(Array.from(new Set(data.map(flight => flight.airline))));
  }, [data]);

  const FlightCard = ({item, index}) => {
    return (
      <Card style={styles.flightCardView}>
        <TouchableOpacity activeOpacity={0.75}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text style={styles.airlineText}>{item.airline}</Text>
            <Logo airline={item.airline} />
          </View>
          <View style={styles.rowViewMarginTop}>
            <View
              style={{
                width: '30%',
              }}>
              <Text style={styles.primaryBoldText}>{item.origin}</Text>
              <Text style={styles.blackBold14Text}>
                {moment(item.departureTime).format('LT')}
              </Text>
              <Text style={styles.blackBold12Text}>
                {moment(item.departureTime).format('ll')}
              </Text>
            </View>
            <Image
              style={{height: 30, width: '40%'}}
              source={require('../assets/flight-route.png')}
            />
            <View
              style={{
                width: '30%',
              }}>
              <Text style={styles.primaryBoldText}>{item.destination}</Text>
              <Text style={styles.blackBold14Text}>
                {moment(item.arrivalTime).format('LT')}
              </Text>
              <Text style={styles.blackBold12Text}>
                {moment(item.arrivalTime).format('ll')}
              </Text>
            </View>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={styles.blackBold12Text1}>{item.duration}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.blackBold14Text}>{item.aircraft}</Text>
            <Text style={styles.blackBold14Text}>{item.flightNumber}</Text>
            <Text style={styles.blackBold14Text}>Gate - {item.gate}</Text>
          </View>
          <View style={{height: 1, overflow: 'hidden'}}>
            <View style={styles.dottedLine}></View>
          </View>

          <View style={styles.rowViewMarginTop1}>
            <Text style={styles.blackBold14Text}>
              {item.seatsAvailable} seats available
            </Text>
            <Text style={styles.primaryPriceBoldText}>
              {'\u20B9'}
              {item.price}
            </Text>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <View style={styles.root}>
      <Header title="Search Results" />
      <View style={styles.sortFilterView}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => {
            setSortMode(true);
            setModalVisible(true);
          }}
          style={styles.sortFilterButton}>
          <Icon
            name="filter-variant"
            size={26}
            color={colors.white}
            style={{marginRight: 10}}
          />
          <Text style={styles.whiteBoldText}>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => {
            setSortMode(false);
            setModalVisible(true);
          }}
          style={styles.sortFilterButton}>
          <Icon
            name="filter"
            size={26}
            color={colors.white}
            style={{marginRight: 10}}
          />
          <Text style={styles.whiteBoldText}>Filter</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={flightData}
        renderItem={FlightCard}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={styles.blackBold16Text}>No Results</Text>
            </View>
          );
        }}
      />
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalRoot}>
          <View style={styles.modalContainer}>
            <View style={styles.modalTitle}>
              <Text style={styles.whiteBoldText1}>
                {sortMode == true ? 'Sort' : 'Filter'}
              </Text>
            </View>
            {sortMode == true ? (
              <View style={styles.modalListContainer}>
                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={() => {
                    setFlightData(
                      flightData.slice().sort((a, b) => a.price - b.price),
                    );
                    setModalVisible(false);
                  }}
                  style={styles.modalListItemView}>
                  <Icon
                    name="sort-ascending"
                    size={26}
                    color={colors.black}
                    style={{marginRight: 10}}
                  />
                  <Text style={styles.blackBold16Text}>
                    Price - Low to High
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={() => {
                    setFlightData(
                      flightData.slice().sort((a, b) => b.price - a.price),
                    );
                    setModalVisible(false);
                  }}
                  style={styles.modalListItemView}>
                  <Icon
                    name="sort-descending"
                    size={26}
                    color={colors.black}
                    style={{marginRight: 10}}
                  />
                  <Text style={styles.blackBold16Text}>
                    Price - High to Low
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <FlatList
                  data={airlineData}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={() => {
                          setSelectedAirline(index);
                        }}
                        style={styles.modalListItemView}>
                        <Text
                          style={
                            selectedAirline == index
                              ? styles.primaryBold16Text
                              : styles.blackBold16Text
                          }>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  showsHorizontalScrollIndicator={false}
                  ListEmptyComponent={() => {
                    return (
                      <View>
                        <Text style={styles.blackBold16Text}>No Results</Text>
                      </View>
                    );
                  }}
                />
                <View style={styles.modalButtonContainer}>
                  <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={() => {
                      if (originParam && destinationParam) {
                        setFlightData(
                          data.filter(
                            flights =>
                              flights.origin == originParam &&
                              flights.destination == destinationParam,
                          ),
                        );
                      } else {
                        setFlightData(data);
                      }
                      setSelectedAirline(null);
                      setModalVisible(false);
                    }}
                    style={styles.modalSimpleButton}>
                    <Text style={styles.blackBold16Text}>Clear</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={() => {
                      if (originParam && destinationParam) {
                        setFlightData(
                          data
                            .filter(
                              flights =>
                                flights.origin == originParam &&
                                flights.destination == destinationParam,
                            )
                            .slice()
                            .filter(
                              flight =>
                                flight.airline == airlineData[selectedAirline],
                            ),
                        );
                      } else {
                        setFlightData(
                          flightData
                            .slice()
                            .filter(
                              flight =>
                                flight.airline == airlineData[selectedAirline],
                            ),
                        );
                      }
                      setModalVisible(false);
                    }}
                    style={styles.modalPrimaryButton}>
                    <Text style={styles.whiteBoldText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sortFilterView: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  sortFilterButton: {
    width: '42%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  rowViewMarginTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  rowViewMarginTop1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  flightCardView: {
    backgroundColor: colors.white,
    marginTop: 5,
    marginBottom: 20,
    marginHorizontal: 20,
    padding: 20,
    overflow: 'hidden',
  },
  airlineText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  primaryBoldText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  primaryPriceBoldText: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  primaryBold16Text: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  blackBold16Text: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  blackBold14Text: {
    color: colors.black,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  blackBold12Text: {
    color: colors.black,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  blackBold12Text1: {
    color: colors.black,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    bottom: 10,
  },
  whiteBoldText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  whiteBoldText1: {
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dottedLine: {
    height: 2,
    borderWidth: 1,
    borderColor: colors.black50,
    borderStyle: 'dashed',
  },
  modalRoot: {
    flex: 1,
    backgroundColor: colors.background50,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
    overflow: 'hidden',
  },
  modalTitle: {
    height: 50,
    width: '100%',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalListContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 10,
  },
  modalListItemView: {
    flexDirection: 'row',
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSimpleButton: {
    height: 50,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.black,
  },
  modalPrimaryButton: {
    height: 50,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 50,
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
});

export default Results;
