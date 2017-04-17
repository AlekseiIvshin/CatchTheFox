/**
 * Fox details component.
 */
 
import React, {PropTypes, Component} from 'react';
import { bindActionCreators } from 'redux';
import {View, Text, StyleSheet, ToolbarAndroid } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import nativeImageSource from 'nativeImageSource';

class Details extends Component {

  static propTypes = {
    foxData: PropTypes.any.isRequired
  }; 
  
  render() {
    return (
      <View style={styles.container}>
	    <ToolbarAndroid 
		  title='CatchTheFox'
		  style={styles.toolbar}
		  navIcon={nativeImageSource({
            android: 'ic_menu_black_24dp',
            width: 48,
            height: 48
          })}
		  onIconClicked={() => Actions.back()}/>
	    <Text>{this.props.foxData}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  toolbar: {
    height: 48,
	backgroundColor: '#E0E0E0'
  }
});

export default connect()(Details);
