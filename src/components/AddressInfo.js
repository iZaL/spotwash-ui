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

  static defaultProps = {
    border: true,
  };

  render() {
    let {style, textStyle, border} = this.props;
    const {area, block, street, avenue, building} = this.props.address;

    return (
      <Text style={[styles.value, style]}>
        {area && <Text style={{textAlign: 'left'}}>{area.name + ', '}</Text>}

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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  text: {
    color: colors.primary,
  },
});
