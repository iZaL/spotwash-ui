/**
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, StyleSheet} from 'react-native';
import Divider from 'components/Divider';
import colors from 'assets/theme/colors';
import CheckedListItem from 'components/CheckedListItem';

export default class Listing extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
    activeIDs: PropTypes.array,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  };

  shouldComponentUpdate(nextProps) {
    return (
      this.props.activeIDs !== nextProps.activeIDs ||
      this.props.items !== nextProps.items
    );
  }

  static defaultProps = {
    activeIDs:[]
  };

  renderItem = ({item}) => {
    let {onItemPress, activeIDs, title, description} = this.props;

    return (
      <CheckedListItem
        onPress={() => onItemPress(item)}
        checked={activeIDs.includes(item.id)}
        disabled={item.disabled}
        title={title ? title(item) : item.name}
        description={description ? description(item) : null}
      />
    );
  };

  render() {
    let {items, style} = this.props;
    return (
      <FlatList
        data={items}
        style={[styles.listContainer, style]}
        renderItem={this.renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Divider style={{marginVertical: 10}} />}
        keyExtractor={(item, index) => `${index}`}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    // backgroundColor:'blue',
    paddingTop: 10,
  },
  itemRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetails: {
    flex: 1,
    fontSize: 18,
    color: colors.darkBlue,
    fontWeight: '500',
  },
  headline: {
    textAlign: 'center',
  },
  itemTitle: {
    flex: 1,
  },
});
