/**
 * Foxes list component.
 */

import React, {PropTypes, Component} from 'react';
import { bindActionCreators } from 'redux';
import {
  StyleSheet,
  View,
  Text,
  ToolbarAndroid,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { Actions as Router } from 'react-native-router-flux';
import { DeviceEventEmitter } from 'react-native'
import Beacons from 'react-native-beacons-manager'
import _ from 'lodash';
import * as BeaconActions from '../actions/BeaconActions';

class Main extends Component {

  static propTypes = {
    startRanging: PropTypes.func.isRequired,
    stopRanging: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.startRanging();
  }

  componentWillUnmount() {
    this.props.stopRanging();
  }

  handleFoxSelected(foxData) {
    Router.details({foxData});
  }

  render() {
    return (
      <View style={styles.container}>
        <ToolbarAndroid
          title='CatchTheFox'
          style={styles.toolbar}/>
        {this.renderFoxes()}
      </View>
    );
  }

  renderFoxes() {
    const foxes = ['Fox 1', 'Fox 2', 'Fox 3'];
    return _.map(foxes, (fox) => {
      return this.renderFox(fox);
    });
  }

  renderFox(fox) {
    return (
      <TouchableHighlight
        key={fox}
        underlayColor='#E0E0E0'
        style={styles.foxItemContainer}
        onPress={this.handleFoxSelected.bind(this, fox.item)}>
        <Text style={styles.foxName}>{fox.item}</Text>
      </TouchableHighlight>
    );
  }

  renderSeparator() {
    return (
      <View style={styles.rowSeparator}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  foxItemContainer: {
    padding: 8
  },
  foxName: {
    fontSize: 20
  },
  rowSeparator: {
    height: 0.5,
    backgroundColor: '#BDBDBD'
  },
  toolbar: {
    height: 48,
    backgroundColor: '#E0E0E0'
  }
});

const mapStateToProps = (state) => {
  return {
    foxes: state.foxes
  };
};

export default connect(mapStateToProps, {...BeaconActions})(Main);
