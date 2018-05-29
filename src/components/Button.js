import React, {Component} from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';
import colors from 'theme/colors';

export default class Button extends Component {

  // shouldComponentUpdate(nextProps) {
  //   return nextProps.disabled !== this.props.disabled;
  // }

  static propTypes = {
    title: PropTypes.string.isRequired,
    background: PropTypes.string,
  };

  static defaultProps = {
    background: 'primary',
    underlayColor: 'transparent',
  };

  render() {
    const {
      style,
      background,
      title,
      titleStyle,
      disabled,
      underlayColor,
      ...rest
    } = this.props;

    return (
      <TouchableHighlight
        {...rest}
        disabled={disabled}
        underlayColor={underlayColor}
        style={[
          styles.button,
          disabled && {opacity: 0.4},
          background !== 'primary' && {backgroundColor: colors[background]},
          style,
        ]}>
        <Text style={[styles.buttonText, titleStyle]}>{title}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    padding: 10,
    height: 40,
    width: 200,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
});
