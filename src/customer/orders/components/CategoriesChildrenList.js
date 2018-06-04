import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import Divider from 'components/Divider';
import PackagesList from 'customer/orders/components/PackagesList';

export default class CategoriesChildrenList extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.items !== this.props.items ||
      nextProps.activePackageIds !== this.props.activePackageIds
    );
  }

  render() {
    const {items, onItemPress, activePackageIds} = this.props;
    return (
      <View style={styles.container}>
        {items.map(item => (
          <View key={item.id}>
            <View style={[styles.listContainer]}>
              <Text style={styles.sectionTitle}>{item.name}</Text>
              <PackagesList
                items={item.packages || []}
                onItemPress={onItemPress}
                activeItemIDs={activePackageIds}
              />
            </View>

            <Divider
              style={{backgroundColor: colors.mediumGrey, marginVertical: 10}}
            />
          </View>
        ))}
      </View>
    );
  }
}

CategoriesChildrenList.propTypes = {
  items: PropTypes.array.isRequired,
  onItemPress: PropTypes.func.isRequired,
  activePackageIds: PropTypes.array,
};

const styles = StyleSheet.create({
  container: {},
  listContainer: {},
  sectionTitle: {
    textAlign: 'left',
    fontSize: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    // color: colors.fadedBlack
  },
});
