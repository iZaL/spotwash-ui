import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet} from 'react-native';
import colors from 'assets/theme/colors';
import CompanyCard from 'company/components/CompanyCard';
import Touchable from 'react-native-platform-touchable';
export default class BidsList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.items !== this.props.items;
  }

  renderItem = ({item}) => {
    const {onItemPress} = this.props;
    console.log('item', item);
    return (
      <Touchable onPress={() => onItemPress(item)} key={item.id}>
        <CompanyCard
          company={item.company || {user: {}}}
          amount={item.amount}
          showConfirmed={item.accepted}
        />
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
        keyExtractor={item => `${item.id}`}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 5,
  },
});
