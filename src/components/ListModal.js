/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal';
import Listing from 'components/Listing';
import Button from "components/Button";
import I18n from 'utils/locale';

export default class ListModal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onItemPress: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    header: PropTypes.any,
    activeIDs: PropTypes.array,
    buttonDisabled:PropTypes.bool,
    buttonText:PropTypes.string
  };

  shouldComponentUpdate(nextProps) {
    return (
      this.props.visible !== nextProps.visible ||
      this.props.activeIDs !== nextProps.activeIDs ||
      this.props.items !== nextProps.items ||
      this.props.buttonDisabled !== nextProps.buttonDisabled
    );
  }

  static defaultProps = {
    activeIDs:[],
    buttonText:I18n.t('save'),
    buttonDisabled:false
  };


  render() {

    let {
      onItemPress,
      children,
      items,
      activeIDs,
      description,
      title,
      buttonText,
      onSave,
      buttonDisabled,
      ...rest,
    } = this.props;
    return (
      <Modal {...rest}>
        <Listing
          onItemPress={onItemPress}
          items={items}
          activeIDs={activeIDs}
          title={title}
          description={description}
        />
        {children}
        <Button onPress={onSave} raised primary dark title={buttonText} disabled={buttonDisabled} />
      </Modal>
    );
  }
}
