import React from 'react';
import {View, StyleSheet} from 'react-native';

import colors from '../config/colors';

const Card = props => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    elevation: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
});

export default Card;
