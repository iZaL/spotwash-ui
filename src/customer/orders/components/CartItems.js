import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import Separator from 'components/Separator';

export default class CartItems extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items;
  }

  renderItem = ({item}) => {
    const {onItemPress} = this.props;
    const {category, services} = item;
    return (
      <Touchable onPress={() => onItemPress(item)} key={item.id}>
        <View style={styles.itemContainer}>
          <Text style={styles.categoryTitle}>{category.name}</Text>
          <View style={styles.packageItemContainer}>
            <Text style={styles.categoryTitle}>{item.package.name}</Text>

            <Text style={styles.packagePrice}>{item.package.price}</Text>
          </View>
          {item.services.map(service => (
            <View style={{flex: 1}} key={service.id}>
              <View style={styles.serviceListContainer}>
                <Text style={styles.serviceTitle}>{service.name}</Text>
                <Text style={styles.servicePrice}>{service.price} </Text>
              </View>
              <Separator style={{flex: 1, marginVertical: 5}} />
            </View>
          ))}
        </View>
      </Touchable>
    );
  };

  render() {
    const {items, activeItemID} = this.props;
    return (
      <FlatList
        data={items}
        renderItem={this.renderItem}
        style={styles.listContainer}
        keyExtractor={(item, index) => index}
        extraData={activeItemID}
      />
    );
  }
}

CartItems.propTypes = {
  items: PropTypes.array.isRequired,
  onItemPress: PropTypes.func.isRequired,
  // activeItemID: PropTypes.number,
};

const styles = StyleSheet.create({
  listContainer: {},
  itemContainer: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: 'white',
  },
  categoryTitle: {
    fontSize: 18,
    color: '#aa2d29',
    fontWeight: 'bold',
  },
  packageItemContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  packageTitle: {
    flex: 4,
    fontSize: 16,
    color: colors.darkGrey,
    fontWeight: 'bold',
  },
  packagePrice: {
    flex: 1,
    color: colors.darkGrey,
    fontSize: 15,
    textAlign: 'right',
  },
  serviceListContainer: {
    flexDirection: 'row',
  },
  serviceTitle: {
    flex: 4,
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  servicePrice: {
    flex: 1,
    color: colors.darkGrey,
    fontSize: 15,
    textAlign: 'right',
  },
});
