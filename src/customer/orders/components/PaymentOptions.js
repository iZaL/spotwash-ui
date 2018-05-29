import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';

export default class PaymentOptions extends Component {
  // shouldComponentUpdate(nextProps) {
  //   return nextProps.activeItemID !== this.props.activeItemID;
  // }

  renderItem = ({item}) => {
    const {onItemPress} = this.props;
    const {category, services} = item;
    return (
      <Touchable
        style={styles.itemContainer}
        onPress={() => onItemPress(item)}
        key={item.id}>
        <View>
          <Text>{category.name}</Text>
          <Text>{item.package.name}</Text>
          <Text>{item.package.price}</Text>
          {item.services.map(service => (
            <View>
              <Text>{service.name_en}</Text>
              <Text>{service.price} </Text>
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

PaymentOptions.propTypes = {
  items: PropTypes.array.isRequired,
  onItemPress: PropTypes.func.isRequired,
  // activeItemID: PropTypes.number,
};

const styles = StyleSheet.create({
  listContainer: {},
  itemContainer: {
    padding: 10,
    marginHorizontal: 5,
  },
});
