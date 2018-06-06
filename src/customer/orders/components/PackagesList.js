import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';

export default class PackagesList extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.items !== this.props.items ||
      nextProps.activeItemIDs !== this.props.activeItemIDs
    );
  }

  renderItem = ({item}) => {
    const {onItemPress, activeItemIDs, items} = this.props;

    let itemsIds = items.map(item => item.id);
    return (
      <Touchable onPress={() => onItemPress(item, itemsIds)} key={item.id}>
        <View
          style={[
            styles.itemContainer,
            activeItemIDs.indexOf(item.id) > -1 && {
              backgroundColor: colors.primary,
            },
          ]}>
          {/*<Image source={{uri: item.image}} style={styles.image} />*/}
          <Text
            style={[
              styles.title,
              activeItemIDs.indexOf(item.id) > -1 && {
                color: colors.white,
              },
            ]}>
            {item.name}
          </Text>
        </View>
      </Touchable>
    );
  };

  render() {
    const {items, activeItemIDs} = this.props;
    return (
      <FlatList
        data={items}
        renderItem={this.renderItem}
        style={styles.listContainer}
        keyExtractor={item => item.id}
        extraData={activeItemIDs}
        numColumns={2}
      />
    );
  }
}

PackagesList.propTypes = {
  items: PropTypes.array.isRequired,
  onItemPress: PropTypes.func.isRequired,
  activeItemIDs: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  container: {paddingVertical: 10},
  listContainer: {},
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingVertical: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    width: Dimensions.get('window').width / 2 - 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 25,
    height: 17,
  },
  title: {
    fontSize: 18,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    textAlign: 'left',
    fontSize: 20,
    paddingHorizontal: 10,
    // color: colors.fadedBlack
  },
});
