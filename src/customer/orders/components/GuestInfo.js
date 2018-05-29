import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from 'theme/colors';
import I18n from 'utils/locale';
import FormLabel from 'components/FormLabel';
import FormTextInput from 'components/FormTextInput';

export default class GuestInfo extends Component {
  static propTypes = {
    onFieldChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
  };

  render() {
    const {onFieldChange, name, mobile} = this.props;

    return (
      <View style={styles.container}>
        <FormLabel title={I18n.t('name')} />
        <FormTextInput
          onChangeText={value => onFieldChange('name', value)}
          value={name}
          maxLength={40}
        />

        <FormLabel title={I18n.t('mobile')} />
        <FormTextInput
          onChangeText={value => onFieldChange('mobile', value)}
          value={mobile}
          maxLength={40}
          secureTextEntry={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: 'white',
    padding: 10,
    // paddingTop: 64,
  },
  link: {
    marginTop: 20,
    color: colors.blue,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonSecondary: {
    backgroundColor: colors.mediumGrey,
  },
});
