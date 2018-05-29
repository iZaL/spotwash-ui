import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'assets/theme/colors';
import Touchable from 'react-native-platform-touchable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from 'utils/locale';

export default class HomeActionButtons extends Component {
  static propTypes = {
    onCreateOrderPress: PropTypes.func.isRequired,
    onFindNearByCompaniesPress: PropTypes.func.isRequired,
  };

  render() {
    const {onCreateOrderPress, onFindNearByCompaniesPress} = this.props;

    return (
      <View style={styles.container}>
        <Touchable
          style={styles.buttonContainer}
          onPress={() => onCreateOrderPress()}>
          <View style={styles.content}>
            <Ionicons name="ios-hand" size={40} color={colors.primary} />
            <Text style={[styles.buttonText]}>{I18n.t('create_order')}</Text>
          </View>
        </Touchable>

        <View style={styles.separator} />

        <Touchable
          style={styles.buttonContainer}
          onPress={() => onFindNearByCompaniesPress()}>
          <View style={styles.content}>
            <MaterialCommunityIcons
              name="truck-fast"
              size={40}
              color={colors.primary}
            />
            <Text style={[styles.buttonText]}>
              {I18n.t('nearby_companies')}
            </Text>
          </View>
        </Touchable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    // backgroundColor: 'yellow',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  content: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    padding: 10,
    height: 40,
    width: 200,
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
