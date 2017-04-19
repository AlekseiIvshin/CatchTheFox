/**
 * Fox details component.
 */

import React, {PropTypes, Component} from 'react';
import { bindActionCreators } from 'redux';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import nativeImageSource from 'nativeImageSource';
import Navigation from '../components/Navigation';

class Details extends Component {

  static propTypes = {
    uuid: PropTypes.string.isRequired,
    major: PropTypes.number.isRequired,
    minor: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isFoxСaught: false
    };
  }

  handleFoxCatch() {
    this.setState({
      isFoxСaught: true
    });
  }

  render() {
    const { uuid, major, minor } = this.props;
    const fox = _.find(this.props.beacons.items, (beacon) => {
      return beacon.uuid === uuid && major === beacon.major && minor === beacon.minor;
    });
    return (
      <View style={styles.container}>
        <Navigation
          title="CatchTheFox"
          isBackShown
          onBack={() => Actions.pop()}
        />
        <Text style={styles.foxInfo}>uuid {uuid}</Text>
        <Text style={styles.foxInfo}>major {major}</Text>
        <Text style={styles.foxInfo}>minor {minor}</Text>
        {this.renderCongratulation()}
        {this.renderDistance(fox)}
        {this.renderFoxCatch(fox)}

      </View>
    );
  }

  renderDistance(fox) {
    if (this.state.isFoxСaught) {
      return null;
    }
    if (!fox) {
      return (
        <Text style={styles.foxInfo}>Лиса куда-то убежала :(</Text>
      );
    } else {
      return (
        <Text style={styles.foxInfo}>Расстояние: {fox.distance.toFixed(2)} м</Text>
      );
    }
  }

  renderFoxCatch(fox) {
    if (!this.state.isFoxСaught && fox && fox.distance < 1) {
      return (
        <View
          style={styles.catchContainer}>
          <TouchableHighlight
            underlayColor='#E0E0E0'
            onPress={this.handleFoxCatch.bind(this)}>
            <Image
              source={require('../images/ic_fox.png')}/>
          </TouchableHighlight>
        </View>
      );
    }
  }

  renderCongratulation() {
    if (this.state.isFoxСaught) {
      return (
        <View style={styles.congratulationContainer}>
          <Text style={styles.congratulation}>Лиса поймана!</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  toolbar: {
    height: 48,
    backgroundColor: '#E0E0E0'
  },
  catchContainer: {
    alignItems: 'center',
    margin: 16
  },
  congratulationContainer: {
    height: 48,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    margin: 16
  },
  foxInfo: {
    fontSize: 20,
    padding: 16
  },
  catchFox: {
    fontSize: 25,
    color: '#FFFFFF'
  },
  congratulation: {
    fontSize: 25,
    color: '#FFFFFF'
  }
});

const mapStateToProps = (state) => {
  return {
    beacons: state.beacons
  };
};

export default connect(mapStateToProps)(Details);
