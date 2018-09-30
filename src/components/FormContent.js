import React, {Component} from 'react';
import {View} from 'react-native';

export default class FormContent extends Component {
  // shouldComponentUpdate(nextProps) {
  //   return false;
  // }

  render() {
    const {style, children} = this.props;

    return (
      <View
        style={[
          {
            margin: 10,
            padding: 10,
            borderRadius: 5,
            backgroundColor: 'white',
          },
          style,
        ]}>
        {children}
      </View>
    );
  }
}
