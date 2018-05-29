import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, View, Text, Image} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from 'utils/locale';

export default class OrdersList extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
    activeItemID: PropTypes.number,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items;
  }

  renderItem = ({item}) => {
    const {onItemPress, activeItemID} = this.props;
    return (
      <Touchable onPress={() => onItemPress(item)} key={item.id}>
        <View
          style={[
            styles.itemContainer,
            item.id === activeItemID && {backgroundColor: colors.white},
          ]}>
          <View style={styles.itemContentContainer}>
            <Text style={styles.categoryName}>{item.category.name}</Text>
            {item.packages.map(packageItem => (
              <Text key={packageItem.id} style={styles.categoryName}>
                {`, ${packageItem.name}`}
              </Text>
            ))}
          </View>

          <View style={styles.itemContentContainer}>
            <Text style={styles.dateTime}>{item.date}</Text>
            <Text style={styles.dateTime}>{item.time.name}</Text>
          </View>

          {
            item.confirmed &&
            <View style={styles.confirmedContainer}>
              <Text style={styles.statusValue}>{I18n.t('confirmed')}</Text>
              <Ionicons name="ios-checkmark-circle" color={colors.success} size={24} />
            </View>
          }

        </View>
      </Touchable>
    );
  };

  render() {
    const {items} = this.props;
    return (

      <FlatList
        data={items}
        renderItem={this.renderItem}
        style={styles.listContainer}
        keyExtractor={item => item.id}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    paddingHorizontal:10,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 5,
    paddingVertical: 5,
  },
  image: {
    width: 80,
    height: 60,
    marginBottom: 10,
  },
  dateTime: {
    fontSize: 20,
    color: colors.primary,
    paddingRight: 10,
  },
  categoryName: {
    fontSize: 20,
  },
  itemContentContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  confirmedContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginHorizontal:10
  },
});
