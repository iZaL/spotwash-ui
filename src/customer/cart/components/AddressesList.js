import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet} from 'react-native';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import Divider from 'components/Divider';
import CheckedListItem from 'components/CheckedListItem';
import AddressInfo from 'components/AddressInfo';
import {TouchableRipple} from 'react-native-paper';

export default class AddressesList extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.items !== this.props.items ||
      nextProps.activeItemID !== this.props.activeItemID
    );
  }

  renderItem = ({item}) => {
    const {onItemPress, activeItemID} = this.props;

    return (
      <TouchableRipple onPress={() => onItemPress(item)}>
        <AddressInfo
          style={[styles.itemContainer,activeItemID === item.id && {backgroundColor: colors.primary}]}
          textStyle={activeItemID === item.id && {color: colors.white}}
          address={item}
        />
      </TouchableRipple>
    );
  };

  render() {
    const {items, activeItemID} = this.props;
    return (
      <FlatList
        data={items.filter(item => item.area !== null || undefined)}
        renderItem={this.renderItem}
        style={styles.listContainer}
        keyExtractor={(item, index) => `${index}`}
        extraData={activeItemID}
        ItemSeparatorComponent={() => <Divider />}
      />
    );
  }
}

AddressesList.propTypes = {
  items: PropTypes.array.isRequired,
  onItemPress: PropTypes.func.isRequired,
  activeItemID: PropTypes.number,
};

const styles = StyleSheet.create({
  listContainer: {},
  itemContainer: {
    flexDirection: 'row',
    padding: 5,
    marginHorizontal: 5,
    backgroundColor: colors.lightGrey,
    borderRadius: 5,
    marginVertical: 5,
  },
  addressField: {
    color: colors.darkGrey,
    fontWeight: '500',
  },
  itemContainerActive: {
    backgroundColor: colors.primary,
  },
  addressFieldActive: {
    color: colors.white,
  },
});
