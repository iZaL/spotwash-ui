/**
 * @flow
 */
import React, {Component} from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from 'assets/theme/colors';
import IconFactory from "./IconFactory";
import {TouchableHighlight} from "react-native";

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
      <TouchableHighlight
        onPress={()=>onPress()}
        hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}
        style={{paddingLeft:10}}
      >
        {/*<FontAwesome*/}
          {/*name="bars"*/}
          {/*size={28}*/}
          {/*style={{paddingLeft: 10}}*/}
          {/*color={colors.primary}*/}
        {/*/>*/}
        <IconFactory type="FontAwesome" name="bars"/>

      </TouchableHighlight>
    );
  }
}
