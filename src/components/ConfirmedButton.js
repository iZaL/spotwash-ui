/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import Dialog from "components/Dialog";
import Button from "components/Button";
import I18n from 'utils/locale';

export default class Avatar extends Component {
  static propTypes = {
    onPress: PropTypes.func,
  };

  state = {
    dialogVisible: false,
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextState.dialogVisible !== this.state.dialogVisible
  //   );
  // }

  static defaultProps = {
    dialogTitle:I18n.t('confirm')
  };

  showModal = () => {
    this.setState({
      dialogVisible: true,
    });
  };

  hideImageModal = () => {
    this.setState({
      dialogVisible: false,
    });
  };

  onConfirm = () => {
    this.hideImageModal();
    this.props.onPress();
  };

  render() {
    let {dialogVisible} = this.state;
    let {dialogTitle,...rest} = this.props;
    return (
      <View>
        <Button
          underlayColor="transparent"
          {...rest}
          onPress={this.showModal}
        />
        <Dialog
          visible={dialogVisible}
          leftPress={this.hideImageModal}
          rightPress={this.onConfirm}
          leftText={I18n.t('cancel')}
          title={dialogTitle}
        />
      </View>
    );
  }
}
