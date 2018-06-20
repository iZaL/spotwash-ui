import React, {Component} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'theme/colors';
import Touchable from 'react-native-platform-touchable';
import I18n from 'utils/locale';

export default class AddressInfo extends Component {

  // shouldComponentUpdate(nextProps) {
  //   return nextProps.address !== this.props.address;
  // }

  static propTypes = {
    address: PropTypes.object.isRequired,
  };

  render() {
    let {style,textStyle} = this.props;
    const {area, block, street, avenue, building} = this.props.address;

    return (
      <View style={[styles.container,style]}>
        <Text style={[styles.text, textStyle ]}>
          {area && <Text>{area.name + ', '}</Text>}
          <Text>
            {I18n.t('block')} {block},{' '}
          </Text>
          <Text>
            {I18n.t('street')} {street},{' '}
          </Text>
          {avenue && (
            <Text>
              {I18n.t('avenue')} {avenue},{' '}
            </Text>
          )}
          {building && (
            <Text>
              {I18n.t('building')} {building}
            </Text>
          )}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    padding:10,
    margin:10,
    borderRadius:5,
    borderColor:colors.mediumGrey,
    borderWidth:1,
  },
  text: {
    color: colors.primary,
  },
});
