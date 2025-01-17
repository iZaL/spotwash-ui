/**
 * @flow
 */
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import colors from 'assets/theme/colors';
import CompanyImage from 'company/components/CompanyImage';
import I18n from 'utils/locale';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Avatar from 'components/Avatar';

const CompanyCard = ({company, amount, style, showConfirmed = false}) => {
  return (
    <View style={[styles.container, style]} key={company.id}>
      {company.logo && <Avatar image={company.logo} size={80} />}
      <Text style={styles.companyName}>
        {company.name ? company.name : company.user.name}
      </Text>
      <View style={{paddingHorizontal: 5, alignItems: 'center'}}>
        <Text style={styles.price}>{amount}</Text>
        <Text style={styles.currency}>{I18n.t('kd')}</Text>

        {showConfirmed && (
          <View style={styles.confirmedContainer}>
            <Text style={styles.statusValue}>{I18n.t('confirmed')}</Text>
            <Ionicons
              name="ios-checkmark-circle"
              color={colors.success}
              size={24}
            />
          </View>
        )}
      </View>
    </View>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
  amount: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
  },
  price: {
    fontSize: 18,
    color: colors.primary,
    paddingRight: 10,
  },
  companyName: {
    flex: 1,
    fontSize: 20,
    paddingHorizontal: 5,
  },
  itemContentContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  currency: {
    fontSize: 13,
    color: colors.primary,
    paddingRight: 10,
  },
  statusValue: {
    paddingHorizontal: 5,
    fontWeight: '500',
  },
  confirmedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});
export default CompanyCard;
