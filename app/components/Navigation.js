/**
 * Created by Aleksei_Ivshin on 4/19/17.
 */
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableWithoutFeedback
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class ActionField extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    isBackShown: PropTypes.bool,
    onBack: PropTypes.func
  };

  static defaultProps = {
    isBackShown: false
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          {this.renderLeft()}
        </View>
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
    );
  }

  renderLeft() {
    if (this.props.isBackShown && this.props.onBack) {
      return (
        <TouchableWithoutFeedback onPress={this.props.onBack} style={styles.left}>
          <Image
            style={styles.iconBack}
            source={require('../images/ic_arrow_left.png')}
          />
        </TouchableWithoutFeedback>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    backgroundColor: '#FFC107',
    alignItems: 'center'
  },
  left: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconBack: {
    width: 24,
    height: 24
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff'
  }
});