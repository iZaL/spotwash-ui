/**
 * @flow
 */
import React from 'react';
import Touchable from 'react-native-platform-touchable';
import PropTypes from 'prop-types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from 'assets/theme/colors';

const DrawerIcon = ({onPress}) => {
  return (
    <Touchable
      onPress={onPress}
      hitSlop={{top: 20, left: 20, right: 20, bottom: 20}}>
      <FontAwesome
        name="bars"
        size={28}
        style={{paddingLeft: 10}}
        color={colors.primary}
      />
    </Touchable>
  );
};

DrawerIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default DrawerIcon;
