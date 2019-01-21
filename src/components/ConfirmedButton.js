/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Dialog from 'components/Dialog';
import Button from 'components/Button';
import I18n from 'utils/locale';

export default class ConfirmedButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
  };

  state = {
    visible: false,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.visible !== this.state.visible ||
      nextProps.title !== this.props.title
    );
  }

  static defaultProps = {
    leftText: I18n.t('cancel'),
    rightText: I18n.t('yes'),
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  hideImageModal = () => {
    this.setState({
      visible: false,
    });
  };

  onConfirm = () => {
    this.hideImageModal();
    this.props.onPress();
  };

  render() {
    let {visible} = this.state;
    let {rightText, ...rest} = this.props;
    return (
      <View style={{flex: 1}}>
        <Button
          underlayColor="transparent"
          {...rest}
          onPress={this.showModal}
        />
        <Dialog
          {...rest}
          visible={visible}
          leftPress={this.hideImageModal}
          rightPress={this.onConfirm}
          rightText={rightText}
          style={{zIndex: 1000}}
        />
      </View>
    );
  }
}
