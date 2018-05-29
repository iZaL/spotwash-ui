import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Separator from 'components/Separator';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';

export default class DriversList extends Component {

  static propTypes = {
    items: PropTypes.array,
    onItemPress: PropTypes.func.isRequired,
    activeItemID: PropTypes.number.isRequired,
  };

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
          <Text style={[styles.title,
            activeItemID === item.id && {
              backgroundColor: colors.white,
            },
          ]}>{item.user.name}</Text>
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
          keyExtractor={item => item.id}
          extraData={activeItemID}
        />
    );
  }
}


const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#efefef',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexDirection:'row',
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  image: {
    width: 80,
    height: 60,
    marginBottom: 10,
  },
  title: {},
});
