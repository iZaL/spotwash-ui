/**
 * @flow
 */
import React from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from 'assets/theme/colors';
import {Text, View, StyleSheet} from "react-native";

const Card = ({onPress,content}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

Card.propTypes = {
  onPress: PropTypes.func,
  content:PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    borderRadius: 5,
    margin:20,
    padding:20
  },
  content: {
    textAlign:'center',
    fontSize:20,
  }
});
export default Card;
