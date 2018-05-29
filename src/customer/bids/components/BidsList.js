import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet} from 'react-native';
import colors from 'assets/theme/colors';
import CompanyCard from "company/components/CompanyCard";
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
    return (
      <Touchable onPress={() => onItemPress(item)} key={item.id}>
        <CompanyCard
          company={item.company}
          amount={item.amount}
          showConfirmed={!!item.accepted}
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
        keyExtractor={item => item.id}
      />
    );
  }
}


const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 5,
    paddingVertical: 5,
  },
  price: {
    fontSize: 18,
    color: colors.primary,
    paddingRight: 10,
  },
  companyName: {
    fontSize: 20,
  },
  itemContentContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  currency: {
    fontSize: 13,
    color: colors.primary,
    paddingRight: 10,
  }
});
