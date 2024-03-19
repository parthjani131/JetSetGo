import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

import colors from '../config/colors';

const Header = props => {
  return (
    <View style={styles.headerView}>
      <Text style={styles.headerText}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    height: 50,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.black,
  },
});

export default Header;
