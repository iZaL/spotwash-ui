/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Image, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import ImageViewer from 'components/ImageViewer';

export default class Avatar extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    onPress: PropTypes.func,
  };

  state = {
    imageModalVisible: false,
    images: [],
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.image !== this.props.image ||
      nextState.imageModalVisible !== this.state.imageModalVisible
    );
  }

  static defaultProps = {
    size: 100,
  };

  onPress = image => {
    this.setState({
      imageModalVisible: true,
      images: [{url: image}],
    });
  };

  hideImageModal = () => {
    this.setState({
      imageModalVisible: false,
      images: [],
    });
  };

  render() {
    let {images, imageModalVisible} = this.state;
    let {image, size, style} = this.props;
    return (
      <View>
        <TouchableRipple
          onPress={() => this.onPress(image)}
          underlayColor="transparent">
          <Image
            source={{uri: image}}
            style={[{width: size, height: size, borderRadius: size / 2}, style]}
            resizeMode="contain"
          />
        </TouchableRipple>
        <ImageViewer
          visible={imageModalVisible}
          images={images}
          onClose={this.hideImageModal}
        />
      </View>
    );
  }
}
