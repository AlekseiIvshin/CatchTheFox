/**
 * Foxes list component.
 */

import React, {PropTypes, Component} from 'react';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-manager'
import _ from 'lodash';
import * as BeaconActions from '../actions/BeaconActions';
import Navigation from '../components/Navigation';

class Main extends Component {

  static propTypes = {
    startRanging: PropTypes.func.isRequired,
    stopRanging: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.startRanging(null);
  }

  componentWillUnmount() {
    this.props.stopRanging(null);
  }

  handleFoxSelected(foxData) {
    const {uuid, minor, major} = foxData;
    Actions.details({uuid, minor, major});
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigation
          title="CatchTheFox"/>
        {this.renderProgress()}
        {this.renderFoxes()}
      </View>
    );
  }

  renderProgress() {
    if (this.props.beacons.isSearching && this.props.beacons) {
      return (
        <ActivityIndicator
          animating={true}
          style={styles.progress}
        />
      );
    }
  }

  renderFoxes() {
    return _.map(this.props.beacons.items, (beacon) => {
      return this.renderFox(beacon);
    });
  }

  renderFox(fox) {
    return (
        <TouchableHighlight
          key={`${fox.uuid}-${fox.major}-${fox.minor}`}
          underlayColor='#E0E0E0'
          style={styles.foxItemContainer}
          onPress={this.handleFoxSelected.bind(this, fox)}>
          <View>
            <Text style={styles.foxName}>Лиса:</Text>
            <Text style={styles.foxInfo}>uuid {fox.uuid}</Text>
            <Text style={styles.foxInfo}>major {fox.major}</Text>
            <Text style={styles.foxInfo}>minor {fox.minor}</Text>
          </View>
        </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  foxItemContainer: {
    padding: 16,
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: 1
  },
  foxName: {
    fontSize: 20
  },
  foxInfo: {
    fontSize: 18,
    paddingLeft: 8
  },
  toolbar: {
    height: 48,
    backgroundColor: '#E0E0E0'
  },
  progress: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16
  }
});

const mapStateToProps = (state) => {
  return {
    beacons: state.beacons
  };
};

export default connect(mapStateToProps, {...BeaconActions})(Main);
