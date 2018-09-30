import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Button} from 'react-native-paper';

export default class extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.disabled !== this.props.disabled ||
      nextProps.title !== this.props.title
    );
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    raised: PropTypes.bool,
    primary: PropTypes.bool,
  };

  static defaultProps = {
    raised: true,
    primary: true,
  };

  render() {
    const {
      style,
      title,
      titleStyle,
      disabled,
      raised,
      primary,
      ...rest
    } = this.props;

    return (
      <Button
        disabled={disabled}
        mode="contained"
        compact
        style={[ styles.button,style,disabled && {opacity: 0.4}]}
        {...rest}>
        <Text style={[styles.buttonText, titleStyle]}>{title}</Text>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 5,
    marginVertical:5,
  },
  buttonText: {},
});
