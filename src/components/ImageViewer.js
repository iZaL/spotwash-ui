/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

export default class extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    onClose: PropTypes.func,
    visible: PropTypes.bool.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.visible !== this.props.visible;
  }

  render() {
    let {visible, images, onClose} = this.props;
    return (
      <Modal visible={visible} transparent={true} onRequestClose={onClose}>
        <ImageViewer imageUrls={images} onSwipeDown={onClose} />
      </Modal>
    );
  }
}
