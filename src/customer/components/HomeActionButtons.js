import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'assets/theme/colors';
import Touchable from 'react-native-platform-touchable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from 'utils/locale';
import IconFactory from "../../components/IconFactory";
import {Title, TouchableRipple} from "react-native-paper";

export default class HomeActionButtons extends Component {
  static propTypes = {
    onCreateOrderPress: PropTypes.func.isRequired,
  };

  render() {
    const {onCreateOrderPress} = this.props;

    return (
      <View style={styles.container}>
        <TouchableRipple
          style={styles.buttonContainer}
          onPress={onCreateOrderPress}>
          <View style={styles.content}>
            <IconFactory type="Ionicons" name="ios-hand" size={40} color={colors.primary} />
            <Title>{I18n.t('create_order')}</Title>
          </View>
        </TouchableRipple>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    padding: 10,
    backgroundColor:'white',
    borderRadius:10,
    margin:15,
  },
  content: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    padding: 10,
    height: 40,
    alignSelf: 'center',
  },
  buttonText: {
    color: colors.fadedBlack,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    paddingTop: 3,
  },
  separator: {
    height: 50,
    width: 0.5,
    backgroundColor: colors.mediumGrey,
  },
});
