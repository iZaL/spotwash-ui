import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, View, Text, Modal} from 'react-native';
import LocalizedText from 'components/LocalizedText';
import Touchable from 'react-native-platform-touchable';
import colors from 'assets/theme/colors';
import Separator from 'components/Separator';
import Button from 'components/Button';
import I18n from 'utils/locale';
import DriversList from "driver/components/DriversList";

export default class DriverAssign extends Component {

  shouldComponentUpdate(nextProps,nextState) {
    return nextProps.order !== this.props.order || nextState.showModal !== this.state.showModal;
  }

  state = {
    showModal:true
  };

  static  propTypes = {
    order: PropTypes.object.isRequired,
    drivers: PropTypes.array.isRequired,
    onDriversListItemPress:PropTypes.func.isRequired,
  };

  showModal = (value:boolean) => {
    this.setState({
      showModal:value
    });
  };

  selectDriver = () => {
    console.log('select driver');
  };

  render() {
    const {order,drivers,onDriversListItemPress} = this.props;
    const {showModal} = this.state;

    return (
      <View style={styles.container}>
        <Text
          style={styles.categoryTitle}
        >Assign Driver</Text>

        {
          order.jobs && order.jobs.length > 0 ?
            <Text>Driver</Text>
            :
            <Text onPress={() => this.showModal(true)}>{I18n.t('select_driver')}</Text>
        }

        <Modal
          animationType="slide"
          visible={showModal}
          presentationStyle="fullScreen">

          <View style={styles.container}>


            <DriversList items={drivers} onItemPress={onDriversListItemPress}
              activeItemID={0}
            />

            <View style={styles.buttonsContainer}>

              <Button
                title="Save"
                onPress={this.selectDriver}
                style={styles.button}
              />

              <Button
                title={I18n.t('close')}
                onPress={()=>this.showModal(false)}
                style={styles.button}
              />

            </View>
          </View>
        </Modal>

      </View>
    );
  };

}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginVertical: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  categoryTitle: {
    fontSize: 18,
    color: colors.darkGrey,
    fontWeight: 'bold',
  },
});
