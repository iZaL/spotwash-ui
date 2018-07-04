import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import Divider from 'components/Divider';
import PackagesList from 'customer/orders/components/PackagesList';
import SectionTitle from '../../../components/SectionTitle';

export default class CategoriesChildrenList extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.items !== this.props.items ||
      nextProps.activePackageIDs !== this.props.activePackageIDs
    );
  }

  render() {
    const {items, onItemPress, activePackageIDs} = this.props;
    return (
      <View style={styles.container}>
        {items.map(item => (
          <View key={item.id}>
            <View style={[styles.listContainer]}>
              <SectionTitle title={item.name} style={{paddingHorizontal: 10}} />
              <PackagesList
                items={item.packages || []}
                onItemPress={onItemPress}
                activeItemIDs={activePackageIDs || []}
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
  activePackageIDs: PropTypes.array,
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
