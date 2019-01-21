import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dialog, Button, Paragraph, Colors, Portal} from 'react-native-paper';
import I18n from 'utils/locale';
import {View} from 'react-native';

export default class extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    leftPress: PropTypes.func,
    rightPress: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func,
    dismissable: PropTypes.bool,
  };

  static defaultProps = {
    rightText: I18n.t('yes'),
    dismissable: false,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.visible !== this.props.visible;
  }

  render() {
    let {
      title,
      description,
      visible,
      leftPress,
      rightPress,
      leftText,
      rightText,
      dismissable,
      onDismiss,
    } = this.props;
    return (
      <Portal>
        <Dialog
          visible={visible}
          dismissable={dismissable}
          onDismiss={onDismiss}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Content>
            <View>
              <Paragraph>{description}</Paragraph>
              {this.props.children}
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            {leftText && (
              <Button color={Colors.teal500} onPress={leftPress}>
                {leftText}
              </Button>
            )}
            <Button primary onPress={rightPress}>
              {rightText}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}
