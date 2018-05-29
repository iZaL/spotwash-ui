import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, View, Text} from 'react-native';
import LocalizedText from 'components/LocalizedText';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import Separator from 'components/Separator';

export default class OrderItems extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.order !== this.props.order;
  }

  static propTypes = {
    order: PropTypes.object.isRequired,
  };

  render() {
    const {order} = this.props;
    const {category,packages} = order;
    return (
      <View >
        <View style={styles.itemContainer}>
          <Text
            style={styles.categoryTitle}
          >{category.name}</Text>

          {packages.map((packageModel, index) => (
            <View style={{flex: 1}} key={index}>

              <View style={styles.packageItemContainer}>
                <Text
                  style={styles.packageTitle}
                >{packageModel.category.name}</Text>
              </View>

              <View style={styles.serviceListContainer}>

                <Text
                  style={styles.serviceTitle}
                >{packageModel.name}</Text>
                {
                  packageModel.pivot.price &&
                  <Text style={styles.servicePrice}>{packageModel.pivot.price} KD</Text>
                }
              </View>
              <Separator style={{flex: 1, marginVertical: 5}} />
            </View>
          ))}
        </View>
      </View>
    );
  };

}


const styles = StyleSheet.create({
  listContainer: {},
  itemContainer: {
    padding: 5,
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
