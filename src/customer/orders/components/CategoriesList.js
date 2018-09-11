import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import I18n from 'utils/locale';
import IconFactory from 'components/IconFactory';

export default class CategoriesList extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.items !== this.props.items ||
      nextProps.activeItemID !== this.props.activeItemID
    );
  }

  renderItem = ({item}) => {
    const {onItemPress, activeItemID} = this.props;

    return (
      <Touchable onPress={() => onItemPress(item)} key={item.id}>
        <View
          style={[
            styles.itemContainer,
            activeItemID === item.id && {
              backgroundColor: colors.primary,
            },
          ]}>
          <IconFactory
            type="MaterialCommunityIcons"
            name="car-hatchback"
            color={activeItemID === item.id ? 'white' : 'black'}
          />
          <Text
            style={[
              styles.title,
              activeItemID === item.id && {
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
    const {items, activeItemID} = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={items}
          renderItem={this.renderItem}
          style={styles.listContainer}
          keyExtractor={item => item.id}
          extraData={activeItemID}
          numColumns={2}
        />
      </View>
    );
  }
}

CategoriesList.propTypes = {
  items: PropTypes.array.isRequired,
  onItemPress: PropTypes.func.isRequired,
  activeItemID: PropTypes.oneOfType([PropTypes.number]),
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
    // marginRight: 10,
    width: Dimensions.get('window').width / 2 - 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: colors.mediumGrey,
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
    fontSize: 20,
    paddingHorizontal: 10,
    // color: colors.fadedBlack
  },
});
