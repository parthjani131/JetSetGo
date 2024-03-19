import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';

import colors from '../config/colors';

const PrimaryButton = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={props.onPress}
      style={styles.primaryButtonView}>
      {props.isLoading ? (
        <ActivityIndicator size="small" color={colors.white} />
      ) : (
        <Text style={styles.primaryButtonText}>{props.children}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButtonView: {
    height: 50,
    width: '100%',
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  primaryButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default PrimaryButton;
