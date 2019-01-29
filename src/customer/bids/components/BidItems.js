//@flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import Listing from 'components/Listing';

export default class BidItems extends Component {
  static propTypes = {
    bid: PropTypes.object.isRequired,
  };

  renderDescription = item => {
    return (
      <Text style={styles.descriptionContainer}>
        <Text>
          <Text style={{marginHorizontal: 10}}>{`${item.category.name} - ${
            item.name
          }    `}</Text>
          {!!item.has_deducted && (
            <Text style={styles.textLine}>{item.actual_price} KD</Text>
          )}
          <Text style={{paddingHorizontal: 10}}> {item.price} KD</Text>
        </Text>
      </Text>
    );
  };

  render() {
    let {bid} = this.props;

    return (
      <View
        style={{
          backgroundColor: 'white',
        }}>
        <Listing
          items={bid.packages}
          title={item => `${item.category.parent.name}`}
          description={item => this.renderDescription(item)}
          onItemPress={() => {}}
          // onItemPress={this.onPackageBidListItemPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  companyImage: {
    height: 220,
    backgroundColor: colors.lightGrey,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
  },
  descriptionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  textLine: {
    textDecorationLine: 'line-through',
    color: 'red',
    paddingHorizontal: 10,
  },
});
