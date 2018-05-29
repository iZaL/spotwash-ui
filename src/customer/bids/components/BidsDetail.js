//@flow
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import CompanyCard from "../../../company/components/CompanyCard";
import Button from "../../../components/Button";
import I18n from 'utils/locale';
import colors from "../../../assets/theme/colors";

export default class BidsDetail extends Component {
  static propTypes = {
    bid: PropTypes.object.isRequired,
  };

  render() {

    let {bid} = this.props;

    return (
      <View style={styles.container}>

        {bid.company.image &&
        <Image source={{uri: bid.company.image}} style={styles.companyImage} resizeMode="cover"/>
        }
        <View style={{flex: 1, marginHorizontal: 20, marginTop: -100}}>
          <CompanyCard company={bid.company} amount={bid.amount}
                       showConfirmed={!!(bid.order.confirmed && bid.order.company && bid.order.company.id === bid.company.id)}
          />
        </View>

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
    backgroundColor: colors.lightGrey
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0
  }

});
