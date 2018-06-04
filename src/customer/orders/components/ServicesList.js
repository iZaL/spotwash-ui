import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import Touchable from 'react-native-platform-touchable';
import Divider from 'components/Divider';
import I18n from 'utils/locale';
import colors from 'assets/theme/colors';

export default class ServicesList extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.items !== this.props.items ||
      nextProps.activeItemIDs !== this.props.activeItemIDs
    );
  }

  renderItem = ({item}) => {
    const {onItemPress, activeItemIDs} = this.props;

    return (
      <Touchable onPress={() => onItemPress(item)} key={item.id}>
        <View
          style={[
            styles.itemContainer,
            activeItemIDs.indexOf(item.id) > -1 && {
              backgroundColor: colors.white,
            },
          ]}>
          <Image source={{uri: item.image}} style={styles.image} />
          <Text style={styles.title}>{item.name}</Text>
        </View>
      </Touchable>
    );
  };

  render() {
    const {items, activeItemIDs} = this.props;

    return (
      <View>
        <Divider style={{marginVertical: 10}} />

        <Text style={styles.sectionTitle}>{I18n.t('addons')}</Text>

        <FlatList
          data={items}
          renderItem={this.renderItem}
          style={styles.listContainer}
          keyExtractor={item => item.id}
          horizontal={true}
          extraData={activeItemIDs}
        />
      </View>
    );
  }
}

ServicesList.propTypes = {
  items: PropTypes.array,
  onItemPress: PropTypes.func.isRequired,
  activeItemIDs: PropTypes.array.isRequired,
};

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
