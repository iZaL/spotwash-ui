/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconFactory from "components/IconFactory";
import {TouchableRipple} from "react-native-paper";
import {Text} from "react-native";

export default class DrawerIcon extends Component {

  static propTypes = {
    onPress: PropTypes.func.isRequired,
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    let {onPress} = this.props;
    return (
      <TouchableRipple
        onPress={onPress}
        hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
        style={{paddingLeft:10}}
      >
        <Text>wa</Text>
        {/*<IconFactory type="FontAwesome" name="bars"/>*/}
      </TouchableRipple>
    );
  }
}
