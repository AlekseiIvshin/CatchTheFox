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
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
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
      isFoxСaught: false,
      isReady: false
    };
  }

  componentDidMount() {
    const { uuid, major, minor } = this.props;
    AsyncStorage.getItem('caughtFoxes')
      .then(req => JSON.parse(req))
      .then(caughtFoxes => {
        if (!caughtFoxes) {
          return false;
        }
        let foxIndex = _.findIndex(caughtFoxes, (beacon) => {
          return beacon.uuid === uuid && major === beacon.major && minor === beacon.minor;
        });
        return foxIndex >= 0;
      })
      .then(isFoxСaught => {
        this.setState({
          isReady: true,
          isFoxСaught
        })
      })
      .catch(error => console.log('error!'))
  }

  handleFoxCatch() {
    const { uuid, major, minor } = this.props;
    this.setState({
      isFoxСaught: true
    });

    AsyncStorage.getItem('caughtFoxes')
      .then(req => JSON.parse(req))
      .then(caughtFoxes => {
        if (!caughtFoxes) {
          return [];
        }
        caughtFoxes.push({ uuid, major, minor });
        return caughtFoxes;
      })
      .then(caughtFoxes => {
        AsyncStorage.setItem('caughtFoxes', JSON.stringify(caughtFoxes))
      })
      .catch(error => console.log('error!'));
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
        <View style={styles.content}>
          <Text style={styles.foxInfo}>Лиса {this.props.beacons.aliases[`${uuid}|${major}|${minor}`]}</Text>
          {this.renderCongratulation()}
          {this.renderDistance(fox)}
          {this.renderFoxCatch(fox)}
        </View>
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
        <Text style={styles.foxInfo}>Расстояние: <Text style={styles.distance}>{fox.distance.toFixed(2)} м</Text></Text>
      );
    }
  }

  renderFoxCatch(fox) {
    if (this.state.isReady && !this.state.isFoxСaught && fox && fox.distance < 1) {
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
    if (this.state.isReady && this.state.isFoxСaught) {
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
  content: {
    flex: 1,
    padding: 16
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
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    padding: 16
  },
  congratulation: {
    fontSize: 25,
    color: '#FFFFFF'
  },
  foxInfo: {
    fontSize: 20,
    paddingBottom: 16
  },
  catchFox: {
    fontSize: 25,
    color: '#FFFFFF'
  },
  distance: {
    fontWeight: 'bold',
    fontSize: 24
  }
});

const mapStateToProps = (state) => {
  return {
    beacons: state.beacons
  };
};

export default connect(mapStateToProps)(Details);
